import React,{useContext}from 'react'
//import '../components/button.css'


function ConnectButton({callback, iswalletconnected}) {

  const buttonStyle ={
    display: iswalletconnected ? "none" : "flex",
    justifyContent:"center",

  }

  return (
    <><span>
      <div style={buttonStyle}>
        <button className=' btn btn-primary btn-lg align-middle' onClick={callback}> Connect</button>
        </div>
        </span>
    </>

  )
}

export default ConnectButton