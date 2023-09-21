import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "./contextApi";
import './styles/home.css'
const Home=()=>{
    const adminContext=useContext(AdminContext)
    const{userName,room,setUserName,setRoom,socket}=(adminContext);
    const navigate=useNavigate();
    const joinRoom=()=>{
        if(room!==''&&userName!==''){
            socket.emit('joinRoom',{userName,room})
            navigate('/chat')
        }
       
    }
    return (
        <div className="home">
            <div className="homeform">
            <h1 className="heading">CHAT APPLICATION</h1>
            <input type="text" className="username" placeholder="user name" onChange={(e)=>{setUserName(e.target.value)}}/>
            <br></br>
            <select className="rooms" onChange={(e)=>{setRoom(e.target.value)}}>
                <option>---Select Room---</option>
                <option value="Room1" className="option">Room1</option>
                <option value="Room2" className="option">Room2</option>
                <option value="Room3" className="option">Room3</option>
            </select>
            <br></br>
            <button className="button" onClick={joinRoom}>Join Room</button>
            </div>
            
        </div>
    )
}
export default Home;