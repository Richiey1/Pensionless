// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProofOfClaimNFT is ERC721, Ownable {
    using Strings for uint256;
    
    error NotAuthorized();
    error TokenDoesNotExist();
    
    struct ClaimData {
        address beneficiary;
        uint256 claimedAt;
        address vaultAddress;
        uint256 amount;
    }
    
    uint256 private _tokenIdCounter;
    mapping(address => bool) private _authorizedMinters;
    mapping(uint256 => ClaimData) private _tokenData;
    
    event MinterAuthorized(address indexed minter, bool authorized);
    event CertificateMinted(address indexed beneficiary, uint256 indexed tokenId, address indexed vault, uint256 amount);
    
    constructor() ERC721("Proof of Claim Certificate", "PROOF") Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }
    
    function setAuthorizedMinter(address minter, bool authorized) external onlyOwner {
        _authorizedMinters[minter] = authorized;
        emit MinterAuthorized(minter, authorized);
    }
    
    function mint(address beneficiary, address vaultAddress, uint256 amount) external returns (uint256 tokenId) {
        if (!_authorizedMinters[msg.sender] && msg.sender != owner()) revert NotAuthorized();
        
        _tokenIdCounter++;
        tokenId = _tokenIdCounter;
        
        _safeMint(beneficiary, tokenId);
        
        _tokenData[tokenId] = ClaimData({
            beneficiary: beneficiary,
            claimedAt: block.timestamp,
            vaultAddress: vaultAddress,
            amount: amount
        });
        
        emit CertificateMinted(beneficiary, tokenId, vaultAddress, amount);
    }
    
    function getClaimData(uint256 tokenId) external view returns (ClaimData memory) {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();
        return _tokenData[tokenId];
    }
    
    function isAuthorizedMinter(address minter) external view returns (bool) {
        return _authorizedMinters[minter];
    }
    
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();
        
        ClaimData memory data = _tokenData[tokenId];
        
        string memory svg = _generateSVG(data);
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"Proof of Claim Certificate #',
                        tokenId.toString(),
                        '","description":"This NFT certifies that the beneficiary has claimed funds from a deadman vault","image":"data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '","attributes":[',
                        '{"trait_type":"Beneficiary","value":"',
                        _addressToString(data.beneficiary),
                        '"},',
                        '{"trait_type":"Claimed At","value":"',
                        data.claimedAt.toString(),
                        '"},',
                        '{"trait_type":"Vault","value":"',
                        _addressToString(data.vaultAddress),
                        '"},',
                        '{"trait_type":"Amount","value":"',
                        data.amount.toString(),
                        '"}',
                        ']}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }
    
    function _generateSVG(ClaimData memory data) private pure returns (string memory) {
        return string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">',
                '<rect width="400" height="400" fill="#111"/>',
                '<rect x="20" y="20" width="360" height="360" fill="none" stroke="#FFD700" stroke-width="4"/>',
                '<text x="200" y="80" text-anchor="middle" fill="#FFD700" font-size="24" font-weight="bold">PROOF OF CLAIM</text>',
                '<text x="200" y="140" text-anchor="middle" fill="#FFF" font-size="14">This certificate confirms that</text>',
                '<text x="200" y="170" text-anchor="middle" fill="#FFF" font-size="14">the beneficiary has successfully</text>',
                '<text x="200" y="200" text-anchor="middle" fill="#FFF" font-size="14">claimed funds from a</text>',
                '<text x="200" y="230" text-anchor="middle" fill="#FFF" font-size="14">Deadman Vault</text>',
                '<text x="200" y="280" text-anchor="middle" fill="#FFD700" font-size="16">Amount: ',
                _formatAmount(data.amount),
                ' ETH</text>',
                '<text x="200" y="310" text-anchor="middle" fill="#888" font-size="10">',
                _addressToString(data.vaultAddress),
                '</text>',
                '<circle cx="200" cy="350" r="25" fill="none" stroke="#FFD700" stroke-width="3"/>',
                '<text x="200" y="358" text-anchor="middle" fill="#FFD700" font-size="16" font-weight="bold">OK</text>',
                '</svg>'
            )
        );
    }
    
    function _addressToString(address addr) private pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes20 value = bytes20(addr);
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i] & 0x0f)];
        }
        return string(str);
    }
    
    function _formatAmount(uint256 amount) private pure returns (string memory) {
        uint256 eth = amount / 1e18;
        uint256 decimals = (amount % 1e18) / 1e14;
        return string(abi.encodePacked(eth.toString(), ".", decimals.toString()));
    }
    
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) revert NotAuthorized();
        return super._update(to, tokenId, auth);
    }
}
