// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDeadmanVault {
    struct VaultState {
        address owner;
        address beneficiary;
        uint256 lastPing;
        uint256 timeout;
        bool hasClaimed;
        uint256 balance;
    }
    
    event Deposited(address indexed owner, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);
    event BeneficiarySet(address indexed beneficiary);
    event TimeoutSet(uint256 timeout);
    event Pinged(address indexed owner, uint256 timestamp);
    event Claimed(address indexed beneficiary, uint256 amount);
    
    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function setBeneficiary(address _beneficiary) external;
    function setTimeout(uint256 _timeout) external;
    function ping() external;
    
    function claimAll() external;
    
    function getVaultState() external view returns (VaultState memory);
    function isTimeoutReached() external view returns (bool);
    function getBalance() external view returns (uint256);
    function owner() external view returns (address);
    function beneficiary() external view returns (address);
    function lastPing() external view returns (uint256);
    function timeout() external view returns (uint256);
    function hasClaimed() external view returns (bool);
}
