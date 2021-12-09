import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import Layout_base  from './layout';
import Load_block from './load_block';
import 'antd/dist/antd.css';
import User_content from './user_content';

export default function User() {

    const [account, contract, totalSupply, colors, balanceOf, ownedTokens] = Load_block();
    
    return (

        <div>
            <Layout_base content={User_content()}>                
            </Layout_base>                 
        </div>


    );


}