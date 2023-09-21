import { useContext, useEffect, useState } from "react";
import AdminContext from "./contextApi";

const Message = () => {
  const adminContext = useContext(AdminContext);
  const { userName, room, socket } = adminContext;

  // Initialize state with data from sessionStorage or an empty array
  const [messageReceived, setMessageReceived] = useState(
    JSON.parse(localStorage.getItem("messageReceived")) || []
  );
  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      setMessageReceived((state) => [
        ...state,
        {
          message: data.message,
          userName: data.userName,
          createdtime: data.createdtime,
        },
      ]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("last10Messages", (last10Messages) => {
      last10Messages = JSON.parse(last10Messages);
      sortMessagesByDate(last10Messages);
      setLastMessages((state) => [...state, ...last10Messages]);
    });
  }, [socket]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  return (
    <div className="message">
      {localStorage.setItem(
        "messageReceived",
        JSON.stringify([
          ...messageReceived
        ])
      )}
      {messageReceived.map((msg, i) => (
        <div className="messagecontent" key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="metadata">{msg.userName}</span>
            <span className="metadata">
              {new Date(msg.createdtime).toLocaleString()}
            </span>
          </div>
          <p className="messagetext">{msg.message}</p>
          {console.log(messageReceived)}
        </div>
      ))}
    </div>
  );
};

export default Message;
