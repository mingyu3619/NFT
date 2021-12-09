import React, { useEffect, useState, useCallback } from 'react'
import IpfsApi from "ipfs-api";
import Load_block from './load_block';
//https://steemit.com/blockchain/@minhokim/react-dapp-2-2 참고

export default function Upload() {

    const [account, contract, totalSupply, colors, balanceOf, ownedTokens] = Load_block();//web3를 이용해 블록정보 Load;
    const [IpfsHash, setIpfsHash] = useState('');
    const [buffer, setBuffer] = useState(null);
    const [minting_value, setMinting_value] = useState({
        category: "",
        title: "",
        paragraph: ""
    });                                       //토큰 전송 버튼 관리
    const { category, title, paragraph } = minting_value; //토큰 전송 비구조 할당

    const file_onChange = (event) => {

        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
            console.log("buffer:", buffer);

        }
    }

    const mint = (category, title, paragraph, ipfs) => {    //토큰 발행
        console.log("contract:", contract)
        contract.methods.mint(category, title, paragraph, ipfs).send({ from: account }).then(() => {
            // submit ? setSubmit(false) : setSubmit(true);
            // console.log("submit", submit)
        })
    }
    async function fileSubmit() {
        // event.preventDefault();
        const ipfsApi = new IpfsApi('ipfs.infura.io', 5001, 'https', '/ipfs/api/v0');
        console.log("ipfsApi:", ipfsApi);
        console.log("fileSubmit_buffer:", buffer);
        let ipfs_hash = ""
        const hi =await ipfsApi.files.add(buffer, (err, IpfsHash) => {
            if (err) { console.log("err:", err); }
            console.log("err:", err, "IpfsHash:", IpfsHash[0].hash);
            ipfs_hash = IpfsHash[0].hash;
            console.log("category_in :", category, "title:", title, "paragraph:", paragraph, "ipfs_hash:", IpfsHash);
            
            setIpfsHash(ipfs_hash);
            mint(category, title, paragraph, ipfs_hash);

        })
        console.log("hi:",hi)
        return Promise.resolve(ipfs_hash);

        // let ipfs = await getIpfs();


    }

    //카테고리,타이틀,본문 다루는 InputChange
    const onChange_safeTransferFrom = (e) => {
        const { value, name } = e.target;
        console.log("e.target:", e.target);
        setMinting_value({
            ...minting_value,
            [name]: value
        })
    }


    return (


        <div style={{   border: '1px solid'  ,textAlign:"center"}}>

            <div>파일 업로드<br/>
                IpfsHash:{IpfsHash}<br />
                
                <form onSubmit={(event) => {
                    event.preventDefault();
                    // fileSubmit();
                    fileSubmit();
                    console.log("submit!!");
                }}>

                    <input type='file'

                        onChange={file_onChange}
                    />
                    <input
                        type="text"
                        name="category"
                        value={category}
                        onChange={onChange_safeTransferFrom}
                        placeholder="category"
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={onChange_safeTransferFrom}

                    />
                    <input
                        type="text"
                        name="paragraph"
                        placeholder="paragraph"
                        value={paragraph}
                        onChange={onChange_safeTransferFrom}

                    />
                    <button type="submit">등록</button>

                </form>
            </div>
            <br />
        </div>

    );



}