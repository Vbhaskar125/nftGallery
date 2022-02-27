
import React from 'react';
import './components/style.css'
import { useState,useEffect } from 'react';
import ConnectButton from './components/ConnectButton';
import Network from './components/Network';
import Web3 from 'web3/dist/web3.min';
import playGround from './components/playGround.json'


const web3 = new Web3(window.ethereum);




  function App() {
  const [connectionStatus, setconnectionStatus] = useState("Not Connected");
  const [walletAddress, setWalletAddress] = useState(0);
  const[isConnected, setIsConnected] = useState(false)
   const [nftMetadata,setNftMetadata] = useState([]); // 
  // const [contractSelected,setContractSelected] = useState(); //contract address
  var nftArray;


  let myEtherscanApiKey = "";
  let abi_= playGround.abi;

  useEffect(()=>{ 
    if(isConnected){
// further imporovement

  }},[nftMetadata]);


const displayOnConnection ={
    display: isConnected? "flex" : "none",
  }


const getNftUrlArray = (async(tokencount, contract)=>{
  let nftArr = [];

  for(let i =0; i<=tokencount ; i++){
    let bal = await contract.methods.balanceOf(walletAddress,i).call()
    if(bal > 0){
      //fetch json and add it to return array
      let fetchedData = await contract.methods.uri(i).call();
      let urlarr=fetchedData.split('{id}');
      urlarr = urlarr[0]+i+urlarr[1];
      nftArr.push(urlarr);
    }

  }
  return nftArr;

});




const submitreqhandler =(async()=>{
  const contract = new web3.eth.Contract(abi_, "0x223CFDf2E5CB5f9b3bD0A50CFb766468835ff884"); // change the contract address to your deployed address
  const addressArr = await window.ethereum.request({method: "eth_requestAccounts",});
  contract.defaultAccount = addressArr[0];
  const totalNumberOfTokens= await contract.methods.getTokenCount().call();
  
nftArray= await getNftUrlArray(totalNumberOfTokens, contract);
let metaObj = await getMetadata(nftArray);
console.log(metaObj)
  setNftMetadata(metaObj);

  

});

const getMetadata = (async(nftarr)=>{
  let str=[];
  for(let link_ of nftarr){
    // console.log(link_ +"  metadata func");
     let jsn_ = await fetch(link_.toString());
    jsn_= await jsn_.json();
   str.push(jsn_);
  }

 return str;

})



  const connectWallet =(async()=>{
    if(window.ethereum){
      try{
        const addressArr = await window.ethereum.request({method: "eth_requestAccounts",});
        if(addressArr.length>0){
          setWalletAddress(addressArr[0])
          setconnectionStatus("connected : "+ addressArr[0] )
          setIsConnected(true)
        }else{
          setWalletAddress(0)
          setconnectionStatus("try connecting manually");
        }
      }catch(err){
        setconnectionStatus(err.message);
      }

    }else{
      setconnectionStatus("install Metamask/ wallet")
    }
  });

  

    return (
      <div >
        <div style={displayOnConnection} className='inputBox'>
        
            <div className='network'>
              <Network submitreqhandler={submitreqhandler}/>
            </div>   
          
            
        </div>
       
        
       

        <div style={{display:"flex", justifyContent:"center"}}>
        {nftMetadata.map((element,index)=>{
          return (<div style={{border:"1px solid black",display:"flex", flexDirection:"column", width:"14rem"} } key={index}>
            <div>{element.name}</div>
            <div style={{display:"flex", justifyContent:"center"}} >
              <img src={element.image} style={{height:"8rem", width:"8rem", }}></img>
            </div>
            <div>{element.description}</div>
          </div>)
        })}

        </div>
  
      
  

      <div style={{backgroundColor:"red", display:"inline"}}>
          <ConnectButton callback={connectWallet} iswalletconnected={isConnected}/>
        </div>
        <div  style={displayOnConnection} style={{display:"flex",float:"right", position:"absolute",right:"0",bottom:"0"}}>
          <p style={{backgroundColor:"peachpuff"}}>{connectionStatus}</p>
        </div>

        </div>
    );
}

export default App;
