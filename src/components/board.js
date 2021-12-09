import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Layout_base  from './layout';
import Load_block from './load_block';
import 'antd/dist/antd.css';
import Board_content from './Board_content';

export default function Board() {

    const [account, contract, totalSupply, colors, balanceOf, ownedTokens] = Load_block();
    
    return (

        <div>
            <Layout_base content={Board_content()}>                
            </Layout_base>                 
        </div>


    );


}