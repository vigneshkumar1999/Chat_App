import { useContext, useEffect, useState } from "react"
import  AdminContext from "./contextApi"
import { useNavigate } from "react-router-dom"


const RoomAndUsers=()=>{
    const adminContext=useContext(AdminContext)
    const{userName,room,socket}=(adminContext)
    const[roomUsers,setRoomUsers]=useState(
        JSON.parse(localStorage.getItem("roomUsers")) || []);
    const navigate=useNavigate();
    useEffect(()=>{
        socket.on('ChatRoomUsers',data=>{
            // console.log(data);
            setRoomUsers(data);
        },[socket])
    })
    const leaveFunc=()=>{
        const leaveTime=Date.now();
        socket.emit('leaveUser',{userName,room})
        navigate('/')
    }
    return(
        <div className="roomandusers">
            {localStorage.setItem(
            "roomUsers",
            JSON.stringify([
            ...roomUsers
             ])
      )}
            <h2 className="roomtitle">{room}</h2>
           <div>
           {roomUsers.length > 0 && <h4 className="userstitle">Users</h4>}
           {roomUsers&&roomUsers.map((user,i)=>(
                <div className="users">
                    <h5>{user.userName}</h5>
                </div>
            ))}
          
           </div>
            <button className="leavebutton" onClick={leaveFunc}>Leave</button>
        </div>
    )
}
export default RoomAndUsers;