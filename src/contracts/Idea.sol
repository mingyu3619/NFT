// SPDX-License-Identifier: MIT    
pragma solidity ^0.8.0;
    
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract Idea is ERC721, ERC721Enumerable{
  

  event Mint(string ipfs_hash ,string  title, string  category, string  paragraph,uint256 timestamp); 
  event NftBought(address _seller, address _buyer, uint256 _price);
  
    mapping (uint256 => Idea) private IdeaList;
    mapping (uint256 => uint256) public tokenIdToPrice;


  struct Idea{
      uint256 tokenID;  //토큰아이디
      string ipfs_hash;
      string category;  //
      string title;
      string paragraph;
      uint256 timestamp;
  }
  
  constructor ()   ERC721("IdeaName", "IdeaSymbol") {}
  
  //check before transfer in ERC721
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  //mint token
  function mint(string memory category ,string memory title, string memory paragraph ,string memory ipfs_hash ) public{
    uint256 tokenID = totalSupply() +1;  
    _mint(msg.sender,tokenID);
    
    Idea memory newIdea = Idea({
        tokenID : tokenID,
        category:category,
        ipfs_hash:ipfs_hash,
        title: title,
        paragraph:paragraph,
        timestamp : block.timestamp
    });
     
    IdeaList[tokenID]=newIdea;
    emit  Mint(ipfs_hash,title,category,paragraph,block.timestamp); 
    
    console.log("tokenID:",tokenID,"category:",category);
    console.log("title:",title,"timestamp:",newIdea.timestamp);
  }
  
  function burn(uint256 tokenID) public{
    
    delete IdeaList[tokenID];    
    delete tokenIdToPrice[tokenID];
    _burn(tokenID);
  }
  
  //가격 설정 
    function allowBuy(uint256 _tokenId, uint256 _price) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        require(_price > 0, 'Price zero');
        tokenIdToPrice[_tokenId] = _price;
        console.log("tokenIdToPrice[_tokenId]:",tokenIdToPrice[_tokenId]);
    }
    
    //판매 불가능 설정 
     function disallowBuy(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        tokenIdToPrice[_tokenId] = 0;
        console.log("tokenIdToPrice[_tokenId]_disallowBuy:",tokenIdToPrice[_tokenId]);
    }    
    
    //설정된 가격으로 사기
     function buy(uint256 _tokenId) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, 'This token is not for sale');
        console.log("msg.value:",msg.value,"price:",price);
        require(msg.value == price, 'Incorrect value');
        
        address seller = ownerOf(_tokenId);
        console.log("seller");
        _transfer(seller, msg.sender, _tokenId);
        console.log("_transfer");
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        payable(seller).transfer(msg.value); // send the ETH to the seller
        console.log("seller:",seller,"msg.sender:",msg.sender);
        emit NftBought(seller, msg.sender, msg.value);

    }

  //find ownedTokens using address and tokenOfOwnerByIndex function in ERC721Enumerable
  function findOwnTokens(address from) public returns(uint256[] memory) {
      
    uint balance = balanceOf(from);
    address account = from;
    console.log("msg.sender1:%s",from);
    console.log("balance:",balance);
    uint256[] memory ownedTokens = new uint256[](balance);
    
    for(uint i=0; i<balance; i++){
    ownedTokens[i] = tokenOfOwnerByIndex(account,i);
    console.log("ownedTokens[i]:",ownedTokens[i]);
        }
    return ownedTokens;
  }
  
  //retrun Idea  
  function getIdea(uint tokenID)public returns(uint256, string memory, string memory, string memory, string memory, uint256){
      console.log("IdeaList[tokenID].tokenID:",IdeaList[tokenID].tokenID,"IdeaList[tokenID].title:",IdeaList[tokenID].title);
      console.log("IdeaList[tokenID].category:",IdeaList[tokenID].category,"IdeaList[tokenID].paragraph:",IdeaList[tokenID].paragraph);
      return(
          IdeaList[tokenID].tokenID,
          IdeaList[tokenID].ipfs_hash,
          IdeaList[tokenID].title,
          IdeaList[tokenID].category,
          IdeaList[tokenID].paragraph,
          IdeaList[tokenID].timestamp
          );
          
  }
  
  
  
  
  
  
}
