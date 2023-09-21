import React,{ useState } from "react";
import io from 'socket.io-client';

const AdminContext=React.createContext();

export const Admin=(props)=>{
    const[userName,setUserName]=useState("");
    const[room,setRoom]=useState("")
    const socket = io.connect('http://localhost:4000');
    return(
        <AdminContext.Provider
        value={{
            userName,
            room,
            setUserName,
            setRoom,
            socket
        }}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContext;