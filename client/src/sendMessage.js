import { useContext, useState } from "react";
import AdminContext from "./contextApi";

const SendMessage=()=>{
    const adminContext=useContext(AdminContext)
    const{userName,room,socket}=(adminContext)
    const[message,setMessage]=useState('');

    const messageFunc=()=>{
        if(message!==''){
            const createdtime=Date.now()
            socket.emit('sendMessage',{userName,room,createdtime,message});
            setMessage('')
        }
    }
    return (
        <div className="sendmessage">
            <input placeholder="Enter message" onChange={(e)=>{setMessage(e.target.value)}} className="messageinput" type="text"/>
            <br></br>
            <button onClick={messageFunc} className="sendbutton" >Send Message</button>
        </div>
    )
}
export default SendMessage;