import Message from "./message"
import RoomAndUsers from "./roomAndUsers";
import SendMessage from "./sendMessage"
import './styles/chatpage.css'
const ChatPage=()=>{
    return(
        <div className="chatpage">
            <RoomAndUsers/>
            <div>
            <Message/>
            <SendMessage/>
            </div>
        </div>
    )
}
export default ChatPage;