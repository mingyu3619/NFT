// SPDX-License-Identifier: MIT    
pragma solidity ^0.8.0;
    
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract Color is ERC721, ERC721Enumerable{
  
  string[] public colors;
  mapping(string => bool) _colorExists;

  constructor ()   ERC721("Color", "COLORS") {}

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function mint(string memory _color) public{
    colors.push(_color);
    uint _id = colors.length-1;
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
    console.log("TokenID:%s   Color:%s",_id,_color);
  }
  
  function burn(uint256 tokenID) public{
    
    _colorExists[colors[tokenID]] = false;
    delete colors[tokenID];    
    _burn(tokenID);
  }

  function findOwnTokens() public returns(uint256[] memory) {
      
    uint balance = balanceOf(msg.sender);
    address account = msg.sender;
    console.log("msg.sender1:%s",msg.sender);
    console.log("balance:",balance);
    uint256[] memory ownedTokens = new uint256[](balance);
  
    
    for(uint i=0; i<balance; i++){
    ownedTokens[i] = tokenOfOwnerByIndex(account,i);
        }
   
    return ownedTokens;
  }
}
