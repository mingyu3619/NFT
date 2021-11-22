import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Load_block from './load_block';
export default function Board() {
  const [account, contract, totalSupply, colors, balanceOf, ownedTokens] = Load_block();

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

      <div>
        <h2 style={{ margin: 50 }}>totalSupply:{totalSupply}</h2>
        <h2>전체 토큰들</h2>

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
            {colors.map((color, key) =>
              <tr key={key}>
                <td>{key}</td>
                <td>{color}</td>
                <td>{color}</td>
                <td>{color}</td>
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