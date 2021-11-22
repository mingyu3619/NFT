import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Load_block from './load_block';

export default function Test() {

    const [account, contract, totalSupply, colors, balanceOf, ownedTokens] = Load_block();
    console.log("Test!!!!!!!!! ")
    return (

        <div>
            <div>Test</div>
            <div>{account}</div>
            {/* <div>{Jcontract}</div> */}
            <div>{totalSupply}</div>
            <div>{colors}</div>
            <div>{balanceOf}</div>
            <div>{ownedTokens}</div>

        </div>


    );


}