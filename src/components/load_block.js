import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json'

export default function Load_block () {
    const [account, setAccount] = useState('');       //계좌  
    const [contract, setContract] = useState();       //스마트 컨트랙트 정보 기록
    const [totalSupply, setTotalSupply] = useState(0);//발행된 총 토큰 수
    const [colors, setColors] = useState([]);        //발행 된 토큰 속성들
    const [balanceOf, setBalanceOf] = useState(0);   //사용자의 잔고
    const [ownedTokens, setOwnedTokens] = useState([]);//사용자의 보유 TokenID   
  
    const loadWeb3 = useCallback(async () => {          //Web3 객체 생성 후,이더리움 접속
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  
    })
    const loadBlockchainData = useCallback(async () => {        //계좌와  network 정보를 기반으로 블록체인 네트워크 정보 get
  
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      console.log("accounts:", accounts)
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId()
      const networkData = Color.networks[networkId]
      console.log("networkId:", networkId)
      console.log("networkData:", networkData)
  
      if (networkData) {
        const abi = Color.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, "0xAad196efa3e4cD46F4003acBD47eE772fcBca89f")
        // const contract = new web3.eth.Contract(ContractABI, address)    
        setContract(contract)
  
        const totalSupply = await contract.methods.totalSupply().call() // 토큰 총 량
        setTotalSupply(totalSupply)
  
        for (var i = 1; i <= totalSupply; i++) {                        //등록된 색깔들 불러오기
          const color = await contract.methods.colors(i - 1).call()
          setColors(colors => [...colors, color]);
          console.log(color)
        }
  
        const balanceOf = await contract.methods.balanceOf(accounts[0]).call()    //해당 계정의 보유 토큰 수 
        setBalanceOf(balanceOf);
        console.log("balanceOf:", balanceOf);
  
        const ownedTokens = await contract.methods.findOwnTokens(accounts[0]).call(); //보유 토큰의 TokenID 불러오기
        console.log(ownedTokens);
        setOwnedTokens(ownedTokens);
  
      }
      else {
        window.alert('Smart contract not deployed to detected network.')
      }
  
  
    })
    useEffect(() => {
  
      loadWeb3().then(() => loadBlockchainData());
  
    }, []
    )
  



return [account,contract,totalSupply,colors,balanceOf,ownedTokens]


}