// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IDeadmanVault.sol";

contract DeadmanVault is IDeadmanVault, ReentrancyGuard {
    
    error NotOwner();
    error NotBeneficiary();
    error TimeoutNotReached();
    error ZeroAddress();
    error InvalidTimeout();
    error InsufficientBalance();
    error TransferFailed();
    
    address private _owner;
    address private _beneficiary;
    uint256 private _lastPing;
    uint256 private _timeout;
    bool private _hasClaimed;
    
    uint256 public constant MIN_TIMEOUT = 1 hours;
    uint256 public constant MAX_TIMEOUT = 10 * 365 days;
    uint256 public constant DEFAULT_TIMEOUT = 30 days;
    
    modifier onlyOwner() {
        if (msg.sender != _owner) revert NotOwner();
        _;
    }
    
    modifier onlyBeneficiary() {
        if (msg.sender != _beneficiary) revert NotBeneficiary();
        _;
    }
    
    constructor(address owner_, address beneficiary_, uint256 timeout_) {
        if (owner_ == address(0)) revert ZeroAddress();
        if (beneficiary_ == address(0)) revert ZeroAddress();
        if (timeout_ < MIN_TIMEOUT || timeout_ > MAX_TIMEOUT) revert InvalidTimeout();
        
        _owner = owner_;
        _beneficiary = beneficiary_;
        _timeout = timeout_;
        _lastPing = block.timestamp;
        _hasClaimed = false;
    }
    
    function deposit() external payable override {
        if (msg.value == 0) revert InsufficientBalance();
        emit Deposited(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external override onlyOwner nonReentrant {
        if (amount == 0) revert InsufficientBalance();
        if (address(this).balance < amount) revert InsufficientBalance();
        
        _lastPing = block.timestamp;
        
        (bool success, ) = payable(_owner).call{value: amount}("");
        if (!success) revert TransferFailed();
        
        emit Withdrawn(_owner, amount);
    }
    
    function setBeneficiary(address beneficiary_) external override onlyOwner {
        if (beneficiary_ == address(0)) revert ZeroAddress();
        _beneficiary = beneficiary_;
        emit BeneficiarySet(beneficiary_);
    }
    
    function setTimeout(uint256 timeout_) external override onlyOwner {
        if (timeout_ < MIN_TIMEOUT || timeout_ > MAX_TIMEOUT) revert InvalidTimeout();
        _timeout = timeout_;
        emit TimeoutSet(timeout_);
    }
    
    function ping() external override onlyOwner {
        _lastPing = block.timestamp;
        emit Pinged(_owner, block.timestamp);
    }
    
    function claimAll() external override onlyBeneficiary nonReentrant {
        if (!isTimeoutReached()) revert TimeoutNotReached();
        
        uint256 vaultBalance = address(this).balance;
        
        _owner = _beneficiary;
        _lastPing = block.timestamp;
        _hasClaimed = true;
        
        if (vaultBalance > 0) {
            (bool success, ) = payable(_beneficiary).call{value: vaultBalance}("");
            if (!success) revert TransferFailed();
        }
        
        emit Claimed(_beneficiary, vaultBalance);
    }
    
    function getVaultState() external view override returns (VaultState memory) {
        return VaultState({
            owner: _owner,
            beneficiary: _beneficiary,
            lastPing: _lastPing,
            timeout: _timeout,
            hasClaimed: _hasClaimed,
            balance: address(this).balance
        });
    }
    
    function isTimeoutReached() public view override returns (bool) {
        return (block.timestamp - _lastPing) >= _timeout;
    }
    
    function getBalance() external view override returns (uint256) {
        return address(this).balance;
    }
    
    function owner() external view override returns (address) {
        return _owner;
    }
    
    function beneficiary() external view override returns (address) {
        return _beneficiary;
    }
    
    function lastPing() external view override returns (uint256) {
        return _lastPing;
    }
    
    function timeout() external view override returns (uint256) {
        return _timeout;
    }
    
    function hasClaimed() external view override returns (bool) {
        return _hasClaimed;
    }
    
    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }
}
