// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DeadmanVault.sol";

contract DeadmanVaultFactory {
    
    error ZeroAddress();
    error InvalidTimeout();
    
    mapping(address => address[]) private userVaults;
    mapping(address => address) private vaultOwners;
    uint256 public totalVaults;
    
    uint256 public constant MIN_TIMEOUT = 1 hours;
    uint256 public constant MAX_TIMEOUT = 10 * 365 days;
    
    event VaultCreated(
        address indexed owner,
        address indexed vault,
        address indexed beneficiary,
        uint256 timeout,
        uint256 timestamp
    );
    
    function createVault(address beneficiary, uint256 timeout) external returns (address vault) {
        if (beneficiary == address(0)) revert ZeroAddress();
        if (timeout < MIN_TIMEOUT || timeout > MAX_TIMEOUT) revert InvalidTimeout();
        
        DeadmanVault newVault = new DeadmanVault(msg.sender, beneficiary, timeout);
        vault = address(newVault);
        
        userVaults[msg.sender].push(vault);
        vaultOwners[vault] = msg.sender;
        totalVaults++;
        
        emit VaultCreated(msg.sender, vault, beneficiary, timeout, block.timestamp);
    }
    
    function getUserVaults(address user) external view returns (address[] memory) {
        return userVaults[user];
    }
    
    function getVaultOwner(address vault) external view returns (address) {
        return vaultOwners[vault];
    }
    
    function getTotalVaults() external view returns (uint256) {
        return totalVaults;
    }
    
    function getUserVaultCount(address user) external view returns (uint256) {
        return userVaults[user].length;
    }
}
