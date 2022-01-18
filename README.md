# 블록체인 기반 아이디어 공유 플랫폼 DApp (Decentralized applications)

블록체인 기반 아이디어 공유 플랫폼 DApp (Decentralized applications) 입니다.

블록체인에 아이디어를 공유하여 아이디어의 소유권을 인정받아 

- 개인<->스타트업 <-> 대기업 간에 발생하는 소유권 분쟁 문제
- 개인 및 스타트업의 아이디어 실현 가능성 Up
- 특허 출원 및 등록 부담 Down

## 프로젝트 개요

![image](https://user-images.githubusercontent.com/86222639/149949157-fb82db2a-f6d9-446d-b2f4-75551a2cd10f.png)

## 설치
+ 프로젝트 설치
```
git clone https://github.com/mingyu3619/NFT.git
npm install
```

+ 메타마스크 설치
  + https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko


## 실행

+ remix를 통해 코드 수정 및 Web3 provider 실행
  + https://remix.ethereum.org/ 

+ metamask와 remix web3 provider 연동

+ Deployed Contracts 의 배포된 컨트랙트 주소 복사

![image](https://user-images.githubusercontent.com/86222639/149972408-225dd0d5-40e1-4531-8446-4754bc6f35b8.png)

+ contract 주소 수정
  + src > components > load_block.js 내의 contract 주소 수정
  
``
const contract = new web3.eth.Contract(ContractABI, "your contract address")   <-- fix contract
`` 
+ react 실행 
``
npm run start
``
## Smart contract

+ Openzeppelin ERC721 

|함수|기능|
|---|---|
|mint()| Idea struct 생성 및  TokenID 부여|
|findOwnTokens()| 개인 별 소유토큰 확인|
|buy()| Eth 지불 + 토큰 전송|
|allowBuy()| 구매 허용|
|disallowBuy() | 구매 불가 설정|

## front end

+ User page
  - Mint : 파일 업로드,카테고리,제목,본문 가능
  - allowBuy: 토큰 판매 설정
  - 계좌 및 보유 토큰 확인 
  - 토큰 전송
  - 보유 토큰 정보 확인 가능
![image](https://user-images.githubusercontent.com/86222639/149951794-49dedd6e-63a0-4216-9dad-404260a5efa4.png)


+ Main page
  - 전체 토큰 조회
  - 토큰 정보 확인
  - 토큰 구매
![image](https://user-images.githubusercontent.com/86222639/149952646-7acbb0a6-312d-4271-bd15-aa397fdd2106.png)


##tech stack

+ remix
+ solidity
+ react
+ web3

