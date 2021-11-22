import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Board from './board';
import Test from "../components/test";
import User from './user';
function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Board />} />      
        <Route path="/user" element={<User />} />
        <Route path="/test" element={<Test />} />
        
        
      </Routes>

    </BrowserRouter>
  )


}
export default App;
