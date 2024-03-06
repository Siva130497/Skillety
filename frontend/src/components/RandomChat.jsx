import React from 'react';
import { useEffect, useState, useRef } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import './LiveChat.css';
import io from 'socket.io-client';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RandomChat = () => {

    const [userId, setUserId] = useState(uuidv4());
  const [userName, setUserName] = useState(`User_${userId}`);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [roomId, setRoomId] = useState(userId);
  const inputRef = useRef(null);
  const chatInputRef = useRef(null);
  const [contentloading, setContentLoading] = useState(true);
  const [allEmployee, setAllEmployee] = useState([]);
  const [incomingMsg, setInCommingMsg] = useState([]);

  const [socket, setSocket] = useState(null);

    useEffect(()=>{
        setSocket(io("https://skillety-n6r1.onrender.com"));
    },[]);

    useEffect(()=>{
        socket?.emit("newUser", userName)
    },[socket, userName])

    useEffect(() => {
    
        axios.get("https://skillety-n6r1.onrender.com/all-employee")
        .then(res=>{
          console.log(res.data);
          setAllEmployee(res.data);
        })
        .catch(err=>console.log(err))
        
      
    }, []);

    useEffect(() => {
        if (userName && roomId) {
          socket?.emit('join_room', roomId)
        }
      }, [userName, roomId, socket]);

      useEffect(() => {
        socket?.on('receive_message', (data) => {
          console.log(data);
          setInCommingMsg((prevMessages) => [...prevMessages, data]);
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      }, [socket]);

    const chatbotToggleRef = useRef(null);
  const chatbotCloseBtnRef = useRef(null);

  useEffect(() => {
    const handleToggleClick = () => {
      document.body.classList.toggle('show-chatbot');
    };

    const handleCloseClick = () => {
      document.body.classList.remove('show-chatbot');
    };

    chatbotToggleRef.current.addEventListener('click', handleToggleClick);
    chatbotCloseBtnRef.current.addEventListener('click', handleCloseClick);

    // return () => {
    //   chatbotToggleRef.current.removeEventListener('click', handleToggleClick);
    //   chatbotCloseBtnRef.current.removeEventListener('click', handleCloseClick);
    // };
  }, []);

  const receiverData = allEmployee.map(employee => ({
    receiverId: employee.id,
    receiverName: employee.name,
  }));

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

        const notificationData = {
          senderId: userId,
          senderName: userName,
          receiverId: receiverData.map(data => data.receiverId),
          receiverName: receiverData.map(data => data.receiverName),
          content: inputMessage,
          time: formattedTime,
          date: formattedDate,
          redirect:'/random-user-chat-ats'
        }

        await socket.emit("sendNotification", notificationData)

        await socket.emit('send_message', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputMessage("");

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <button ref={chatbotToggleRef} className="chatbot__button">
        {/* <span class="material-symbols-outlined chat--icon">chat</span> */}
        <div className='message--count'>
            {incomingMsg.length}
        </div>
        <h6 className='chat--text'>Chat With Us</h6>
        {/* <span className="material-symbols-outlined chat-close-icon">close</span> */}
      </button>

      <div className="chatbot">
        <div className="chatbot__header">
          <h3 className="chatbox__title">Chat with us.</h3>
          <span className="material-symbols-outlined" ref={chatbotCloseBtnRef}>close</span>
        </div>

        <ScrollToBottom className="chatting-card-body">
          <ul className="chatbot__box">
            {
                    messages.length >0 ? (
                            <>
                          
                                {messages.map((messageContent, index) => {
                                        return (
                                            <li
                                                key={index} 
                                                className={userId !== messageContent.userId ? "chatbot__chat incoming" : "chatbot__chat outgoing"}
                                            >
                                                {userId !== messageContent.userId ? (
                                                    <div className="sender-avatar-container">
                                                        <img src="../assets/img/logo/skillety-favicon.png" alt="" />
                                                    </div>
                                                ) : null}
                                                <p>{messageContent.message}</p>
                                            </li>
                                        );
                                    })}
                            </>
                          ) : (
                            <div className='chat-welcome'>
                                <img src="../assets/img/logo/skillety-logo-icon.png" className='chat-welcome-img' alt="" />
                                <div className='chat-welcome-text'>
                                Welcome to <span>Skillety</span>
                                </div>
                                <p>👋 Hi, message us with any questions. We're happy to help!</p>
                            </div>
                        )
            }
          </ul>
        </ScrollToBottom>

        <div className="chatbot__input-box">
          {/* <textarea
            value={inputMessage}
            onChange={(event) => {
                setInputMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            className="chatbot__textarea"
            placeholder="Enter a message..."
            required
          ></textarea> */}
          <input type="text" value={inputMessage}
            onChange={(event) => {
                setInputMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            className="chatbot__textarea"
            placeholder="Enter a message..."
            required />
          <span id="send-btn" className="material-symbols-outlined"
          onClick={sendMessage}
          >send</span>
        </div>
      </div>
    </>
  )
}

export default RandomChat