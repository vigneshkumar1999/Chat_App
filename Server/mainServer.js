const express=require('express');
const app=express();
const cors=require('cors')
const http=require('http')
const {Server}=require('socket.io')
const harper=require('./harper')
const harperGet=require('./harperGet')
const leaveFunc=require('./leaveFunc')
require('dotenv').config();
console.log(process.env.HARPERDB_URL);

app.use(cors());

const server=http.createServer(app);

app.get('/',(req,res)=>{
    res.send('Welcome Server page')
})

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

let chatRoom='';
let users=[];
io.on('connection',(socket)=>{
    console.log(`user connected ${socket.id}`)

    socket.on('joinRoom',(data)=>{
        const{userName,room}=data;
        socket.join(room);

        let createdtime = Date.now();

        socket.to(room).emit('receivedMessage',{
            message:`${userName} has joined the chat room`,
            userName:userName,
            createdtime
        })
        socket.emit('receivedMessage',{
            message:`welcome ${userName}`,
            userName:userName,
            createdtime
        })
        chatRoom=room;
        users.push({id:socket.id,userName,room});
        chatRoomUsers = users.filter((user) => user.room === room);
        console.log(chatRoomUsers)
        // broadcast to all except the sender
        socket.to(room).emit('ChatRoomUsers',chatRoomUsers);    
        // only to sender
        socket.emit('ChatRoomUsers',chatRoomUsers)

        socket.on('sendMessage',(data)=>{
            // console.log(data)
            const{userName,room,message}=data;
            harper(message, userName, room)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
            // broadcast to both sender and all users in that room
            io.in(room).emit('receivedMessage', data);
        })

        harperGet(room)
        .then((last10Messages)=>{
            // console.log(last10Messages);
            socket.emit('last10Messages',last10Messages)
        })
        .catch(err=>{
            console.log(err);
        })
    })
    socket.on('leaveUser',(data)=>{
        let createdtime = Date.now();
        const{userName,room}=data;
        users=leaveFunc(socket.id,users);
        socket.to(room).emit('ChatRoomUsers',users);
        socket.to(room).emit('receivedMessage',{
            message:`${userName} has left the chat`,
            userName:userName,
            createdtime
        })
        console.log(`${userName} has left the chat`);
    })
})
server.listen(4000,()=>{console.log('Server is running on port 4000')})