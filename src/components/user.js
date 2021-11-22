import React, { useEffect, useState, useCallback } from 'react'
import Load_block from './load_block';
export default function User() {  
    
    const [account, contract, totalSupply, colors, balanceOf, ownedTokens] = Load_block();

    const [submit, setSubmit] = useState(false);
    const [input, setinput] = useState("");  //토큰 Mint 버튼 관리
    const [input_safeTransferFrom, setInput_safeTransferFrom] = useState({
        address_from: "",
        address_to: "",
        tokenID: ""
    });                                       //토큰 전송 버튼 관리
    const { address_from, address_to, tokenID } = input_safeTransferFrom; //토큰 전송 비구조 할당
   
   
  
    const mint = (color) => {    //토큰 발행
        contract.methods.mint(color).send({ from: account }).then(() => {
            submit ? setSubmit(false) : setSubmit(true);
            console.log("submit", submit)
        })
    }
  
    //토큰 전송
    const safeTransferFrom = (from_address, to_address, tokenID) => {
        console.log("safeTrasnferFrom:", from_address, "\n", to_address, tokenID);
        contract.methods.safeTransferFrom(from_address, to_address, tokenID).send({ from: from_address }).then((receipt) => console.log("receipt:", receipt))
    } 

    // 토큰 전송 시 Input 값 바꾸기                                     
    const onChange_safeTransferFrom = (e) => {
        const { value, name } = e.target;

        setInput_safeTransferFrom({
            ...input_safeTransferFrom,
            [name]: value
        })
    }                                           

    return (

        <div>  <div className="row text-center">

            <div style={{ padding: 5 }}>
                <div >Owner: {account}</div>
                <div >bbalanceOf: {balanceOf}</div>
                <div >ownedToekns: {ownedTokens}</div>
            </div>
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

            <table className="table" style={{ margin: 50 }}>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>내용</th>
                        <th>소유자</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {ownedTokens.map((color, key
                    ) =>
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{colors[color]}</td>
                            <td>{color}</td>
                            <td>{color}</td>
                        </tr>
                    )}
                </tbody>


            </table>
      
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log("input_safeTransferFrom:", input_safeTransferFrom);
                    safeTransferFrom(address_from, address_to, tokenID);
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



        </div>

    );
}

