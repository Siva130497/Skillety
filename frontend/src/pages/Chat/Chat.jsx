import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'; // Import Axios
import '../../App.css';
import ScrollToBottom from "react-scroll-to-bottom";


const socket = io.connect('https://skillety.onrender.com');

const Chat = ({userName, userId, staffToken, candidateToken}) => {
  
  const [roomId, setRoomId] = useState("");
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [candidatesWantedChat, setCandidatesWantedChat] = useState([]);
  const [disableMode, setDisableMode] = useState(false);
  const [connectedRecruiterName, setConnectedRecruiterName] = useState("");
  

  useEffect(()=>{
    if(candidateToken){
      setRoomId(userId);
    }

  }, [candidateToken])

  useEffect(()=>{
    if(staffToken){
      axios.get("https://skillety.onrender.com/candidate-chat", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      })
      .then(res=>{
        console.log(res.data);
        setCandidatesWantedChat(res.data);
      })
      .catch(err=>console.log(err));
    }
  }, [staffToken])

  useEffect(()=>{
    if(userName && roomId){
      socket.emit('join_room', roomId)
      axios.get(`https://skillety.onrender.com/roomId-chat/${roomId}`, {
        headers: {
          Authorization: `Bearer ${candidateToken ? candidateToken : staffToken}`,
          Accept: 'application/json'
        }
        })
        .then(res=>{
          const result = res.data;
          console.log(result.nonMatchingUserId, result.allChatDetailOfRoomId);
          if(result.nonMatchingUserId.length > 0){
            if((result.nonMatchingUserId[0].userId === userId) || (candidateToken)){
                setMessages(result.allChatDetailOfRoomId);
            }else{
              setDisableMode(true);
              axios.get(`https://skillety.onrender.com/staff/${result.nonMatchingUserId[0].userId}`, {
                headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
                }
                })
              .then(res=>setConnectedRecruiterName(res.data.name));
            }
          }else{
            if(result.allChatDetailOfRoomId.length> 0){
              setMessages(result.allChatDetailOfRoomId);
            }
          }
        })
        .catch(err=>console.log(err));
    }
  },[userName, roomId])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    try {
      if (inputMessage !== '') {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

        const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${amPm}`;

        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;

        const messageData = {
          roomId,
          userName,
          userId,
          message: inputMessage,
          time: formattedTime,
          date: formattedDate
        };
        
        await socket.emit('send_message', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputMessage("");

        const res = await axios.post(`https://skillety.onrender.com/roomId-chat`, messageData, {
          headers: {
            Authorization: `Bearer ${candidateToken ? candidateToken : staffToken}`,
            Accept: 'application/json'
          }
          });
  
        console.log(res.data);
  
        if(candidateToken){
          const response = await axios.post(`https://skillety.onrender.com/candidate-chat`, {roomId, userName}, {
          headers: {
            Authorization: `Bearer ${candidateToken}`,
            Accept: 'application/json'
          }
          });
  
          console.log(response.data);
        }

      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="chat-container" >
      {!roomId && <div >
        {candidatesWantedChat.length > 0 && <table className="table table-hover">
          <tbody>
                            {candidatesWantedChat.map((candidate) => {
                                return <tr key={candidate.roomId} onClick={()=>{
                                          setRoomId(candidate.roomId);
                                        }}>
                                            <th scope="row">{candidate.userName}</th>
                                            {candidate.newMessage && <th scope="col"><span className="badge rounded-pill bg-dark">New msg</span></th>}
                                        </tr>
                                })}
          </tbody>
        </table>}
      </div>}
      {(candidateToken || roomId) && <div >
        {/* <h1>Real-Time Chat</h1>
        <div>
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                // className={`message ${message.userName === user.id ? 'sender' : 'receiver'}`}
              >
                <span className="message-name">{message.userName}</span>
                <span className="message-text">{message.message}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Enter the message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            // onKeyPress={(e)=> {e.key === "Enter" && sendMessage()}}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div> */}
        <div className="chat-window">
          <div className="chat-header">
             <p>Real-Time Chat </p>
          </div>
          <div className="chat-body">
            {disableMode && <p>This candidate attended by {connectedRecruiterName}</p>}
            <ScrollToBottom className="message-container">
              {messages.map((messageContent, index) => {
                return (
                  <div
                    className="message"
                    id={userId === messageContent.userId ? "you" : "other"}
                    key={index}
                  >
                    <div>
                    <div className="message-meta">
                      <p id="time">{messageContent.date}</p>
                    </div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.userName}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          {!disableMode && <div className="chat-footer">
            <input
              type="text"
              value={inputMessage}
              placeholder="Enter the message..."
              onChange={(event) => {
                setInputMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>}
        </div>
        {!candidateToken && <button type="button" className="btn btn-outline-info" onClick={()=>{
          setRoomId("");
          setMessages([]);
          setDisableMode(false);
          }}>Back</button>}
      </div>}
    </div>
  );
};

export default Chat;
