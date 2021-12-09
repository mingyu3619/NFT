import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Load_block from './load_block';
import moment from 'moment'
import { Button } from 'antd';
import web3 from 'web3'

export default function Board_content() {
  const [account, contract, totalSupply, Ideas, balanceOf, ownedTokens, tokenPrices] = Load_block();
  console.log("Board_content")

  //  const onclick_buy = useCallback(async (key) =>{
  //     const owner = await contract.methods.ownerOf(key);
  //     console.log("owner:",owner)
  //     console.log("tokenPrices[key]:",typeof tokenPrices[key])
  //     console.log("tokenPrices[key]:", tokenPrices[key])
  //     await contract.methods.buy(key).send({value:web3.utils.toWei(tokenPrices[key])});

  //  })
  //  const onclick_buy =() =>{

  //  }
  return (
    <div>
      <div>
        <h1>전체 토큰</h1>
        <h2>totalSupply:{totalSupply} </h2>


        <table className="table" style={{ margin: 50 }}>
          {/* <caption>전체 토큰 둘</caption> */}
          <thead>
            <tr>
              <th>토큰 ID</th>
              <th>IPFS</th>
              <th>제목</th>
              <th>카테고리</th>
              <th>본문</th>
              <th>발행일</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {Ideas.map((idea, key) =>
              <tr key={key}>
                <td>{idea['0']}</td>
                <td><a href={'https://ipfs.io/ipfs/' + idea['1']} >{idea['1']}</a></td>
                <td>{idea['2']}</td>
                <td>{idea['3']}</td>
                <td>{idea['4']}</td>
                <td>{moment.unix((idea['5'])).format("MM/DD/YYYY")}</td>
                <td>{tokenPrices[key] / 1000000000000000000}eth </td>
                <td>    <Button type="primary"
                  onClick={() => {                   
                    contract.methods.buy(idea['0']).send({
                      from: account,
                      value: web3.utils.toWei(web3.utils.toBN(tokenPrices[idea['0']-1] / 1000000000000000000)),
                      gas: 0x00,
                      gasPrice: 0x00

                    }).then((error) => {
                      console.log("error:", error)
                    })
                  }} >Buy</Button></td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      <Link to="/user">user</Link><br />
      <Link to="/test">test</Link>
      <div className="row text-center">
      </div>
    </div>


  );

}


//   export default Home;