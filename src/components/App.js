import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json'


function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState();
  const [totalSupply, setTotalSupply] = useState(0);
  const [colors, setColors] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [input, setinput] = useState("");
  const [input_safeTransferFrom, setInput_safeTransferFrom] = useState({
  address_from:"",
  address_to:"",
  tokenID:""
  });
  const {address_from,address_to,tokenID}=input_safeTransferFrom;
  const [balanceOf, setBalanceOf] = useState(0);
  const [ownedTokens, setOwnedTokens] = useState([]);


  const loadWeb3 = useCallback(async () => {
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
  const loadBlockchainData = useCallback(async () => {

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
      const contract = new web3.eth.Contract(abi, "0x008C665521450bEb7aE4DF2e0D58886D6552C2C9")
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

      const ownedTokens = await contract.methods.findOwnTokens().call();
      console.log(ownedTokens);
      setOwnedTokens(ownedTokens);

    }
    else {
      window.alert('Smart contract not deployed to detected network.')
    }


  })
  useEffect(() => {

    loadWeb3().then(() => loadBlockchainData());

  }, [submit]
  )

  const mint = (color) => {
    contract.methods.mint(color).send({ from: account }).once('receipt', (receipt) => { setColors([]) }).then(() => {
      submit ? setSubmit(false) : setSubmit(true);
      console.log("submit", submit)
    })


  }
  const safeTransferFrom = (from_address, to_address, tokenID) => {
    console.log("safeTrasnferFrom:",from_address ,"\n",to_address,tokenID);
    contract.methods.safeTransferFrom(from_address, to_address, tokenID).send({from:from_address}).then((receipt)=>console.log("receipt:",receipt))
  }
const onChange_safeTransferFrom =(e) =>{
  const {value,name} = e.target;
  
setInput_safeTransferFrom({
  ...input_safeTransferFrom,
  [name]:value
})
}
  

  return (

    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Color Tokens
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{account}</span></small>
          </li>
        </ul>
      </nav>


      <main role="main" className="col-lg-12 d-flex text-center">
        <div className="content mr-auto ml-auto">
          <h1>Issue Token</h1>
          <form onSubmit={(event) => {
            event.preventDefault()
            // const color = this.color.value
            console.log(input)
            mint(input)
          }}>
            <input
              type='text'
              className='form-control mb-1'
              placeholder='e.g. #FFFFFF'
              value={input}
              onChange={(e) => {
                setinput(e.target.value)
                console.log(e.target.value)
              }}
            />
            <input
              type='submit'
              className='btn btn-block btn-primary'
              value='MINT'
            />
          </form>

          <form
          onSubmit = {(event)=>{
            event.preventDefault();
            console.log("input_safeTransferFrom:",input_safeTransferFrom);
            safeTransferFrom(address_from,address_to,tokenID);
          }}
          >
            <input
              type="text"
              name="address_from"
              value={address_from}
              onChange={onChange_safeTransferFrom}
                         
            />
                <input
              type="text"
              name="address_to"
              value={address_to}
              onChange={onChange_safeTransferFrom}
                         
            />
                <input
              type="text"
              name="tokenID"
              value={tokenID}
              onChange={onChange_safeTransferFrom}
                         
            />
          <button type="submit">NFT 보내기</button>
          </form>
        </div>
      </main>

      <h1>totalSupply:{totalSupply}</h1>
      <h2>balanceOf: {balanceOf}</h2>
      <h2>ownedToekns: {ownedTokens}</h2>
      <div className="row text-center">


        {colors.map((color, key) => {
          return (
            <div key={key} className="col-md-3 mb-3">
              <div className="token" style={{ backgroundColor: color }}></div>
              <div>{color}</div>
            </div>
          )
        })}
      </div>


    </div>


  );

}

export default App;
