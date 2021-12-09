import React, { useEffect, useState, useCallback } from 'react'
import Load_block from './load_block';
import Upload from './upload';
import moment from 'moment';
import { Button } from 'antd';
import web3 from 'web3'
export default function User_content() {

    const [account, contract, totalSupply, Ideas, balanceOf, ownedTokens, tokenIdToPrice] = Load_block();

    const [input_sale, setInput_sale] = useState("");
    const [input_safeTransferFrom, setInput_safeTransferFrom] = useState({
        address_to: "",
        tokenID: ""
    });                                       //토큰 전송 버튼 관리
    const { address_to, tokenID } = input_safeTransferFrom; //토큰 전송 비구조 할당

    
    
    //토큰 전송
    const safeTransferFrom = (to_address, tokenID) => {
        console.log("to:", to_address, "tokenID:", tokenID);
        contract.methods.safeTransferFrom(account, to_address, tokenID).send({ from: account }).then((receipt) => console.log("receipt:", receipt))
    }

    // 토큰 전송 시 Input 값 바꾸기                                     
    const onChange_safeTransferFrom = (e) => {
        const { value, name } = e.target;
        console.log("e.target:", e.target);
        setInput_safeTransferFrom({
            ...input_safeTransferFrom,
            [name]: value
        })
    }

    return (

        <div style={{ alignItems: "center", alignContent: "center", justifyItems: "cnter" }}>

            <Upload />
            <div style={{ padding: 5 }}>
                <div >Owner address: {account}</div>
                <div >보유 토큰 수: {balanceOf}</div>
                {/* <div >ownedToekns: {ownedTokens}</div> */}
            </div>

            <table className="table" style={{ margin: 50 }}>

                <thead>
                    <tr>
                        <th>토큰 ID</th>
                        <th>IPFS</th>
                        <th>제목</th>
                        <th>카테고리</th>
                        <th>본문</th>
                        <th>발행일</th>
                        <th>가격</th>
                        <th>판매 활성/비활성</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("Ideas_in user:", Ideas)}
                    {console.log("ownedTokens:", ownedTokens)}
                    {ownedTokens.map((idea, key) =>
                        <tr key={key}>
                            <td>{Ideas[idea - 1]['0']}</td>
                            <td><a href={'https://ipfs.io/ipfs/' + Ideas[idea - 1]['1']} >{Ideas[idea - 1]['1']}</a></td>
                            <td>{Ideas[idea - 1]['2']}</td>
                            <td>{Ideas[idea - 1]['3']}</td>
                            <td>{Ideas[idea - 1]['4']}</td>
                            <td>{moment.unix((Ideas[idea - 1]['5'])).format("MM/DD/YYYY")}</td>
                            <td>{tokenIdToPrice[Ideas[idea - 1]['0'] - 1]/ 1000000000000000000} eth</td>
                            <td >
                                <form                               
                                    onSubmit={(event) => {
                                        event.preventDefault();      
                                        console.log("input_sale:",input_sale)                                  
                                        contract.methods.allowBuy(Ideas[idea - 1]['0'],web3.utils.toWei(input_sale)).send({from:account}).then((error) =>
                                        console.log("error:", error))
                                        
                                    }}
                                >
                                    {input_sale}
                                    <input
                                        placeholder="단위:eth"
                                        type="text"
                                        name="sale_value"
                                        value={input_sale}
                                        onChange={(e)=> setInput_sale(e.target.value)}

                                    />
                                   <button type="submit">NFT 보내기</button>
                                </form>

                                <Button type="primary"

                                    onClick={() => {
                                        console.log("Ideas[idea - 1]['0']:", Ideas[idea - 1]['0'])
                                        contract.methods.disallowBuy(Ideas[idea - 1]['0']).send({ from: account }).then((error) =>
                                            console.log("error:", error))
                                    }}
                                >
                                    판매 불가 설정
                                </Button>
                            </td>
                        </tr>
                    )}

                </tbody>


            </table>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log("input_safeTransferFrom:", input_safeTransferFrom);
                    safeTransferFrom(address_to, tokenID);
                }}
            >

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





    );
}

