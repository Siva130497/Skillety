import React, { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import './LiveChat.css';
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import io from 'socket.io-client';

const VisitorsChat = () => {
    const chatbotToggleRef = useRef(null);
    const chatbotCloseBtnRef = useRef(null);

    const navigate = useNavigate();
    const { getProtectedData } = useContext(AuthContext);

    const [staffToken, setStaffToken] = useState("");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [roomId, setRoomId] = useState("");
    const inputRef = useRef(null);
    const chatInputRef = useRef(null);
    const [chattingPersonName, setChattingPersonName] = useState("");
    const [chattingPersonImg, setChattingPersonImg] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [contentloading, setContentLoading] = useState(true);
    const [msgloading, setMsgLoading] = useState(true);

    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [randomUniqueUserContent, setRandomUniqueUserContent] = useState([]);

    useEffect(()=>{
        setSocket(io("http://localhost:5002"));
    },[]);

    useEffect(()=>{
        socket?.emit("newUser", userName)
    },[socket, userName])

    useEffect(() => {

    socket?.on("getNotification", data => {
        console.log(data)
        setNotifications(prev => [...prev, data]);

    })

    }, [socket]);

    useEffect(() => {
    if(notifications.length>0){
        setContentLoading(true);
        filterUniqueNotifications();
    }else{
        setContentLoading(false);
    }
    }, [notifications]);

    const filterUniqueNotifications = () => {
    const uniqueIds = {};
    const filteredNotifications = [];

    // Iterate through the objects array in reverse order to find the last occurrence of each unique ID
    for (let i = notifications.length - 1; i >= 0; i--) {
        const notificationobj = notifications[i];
        if (!(notificationobj.senderId in uniqueIds)) {
        // If the ID is not already in the uniqueIds object, add it with the current index
        uniqueIds[notificationobj.senderId] = { lastIndex: i, count: 1 };
        }else {
        // If the ID is already in the uniqueIds object, update the count
        uniqueIds[notificationobj.senderId].count++;
        }
    }

    // Iterate through the uniqueIds object to get the last occurrence of each unique ID
    Object.values(uniqueIds).forEach(({ lastIndex, count }) => {
        const obj = notifications[lastIndex];
        // Add a new property 'numOfObjects' to each object indicating the count of objects with the same ID
        const newObj = { ...obj, numOfMsg: count };
        filteredNotifications.push(newObj);
    });

    // Update state with the filtered unique objects
    setRandomUniqueUserContent(filteredNotifications);
    setFilteredUsers(filteredNotifications)
    setContentLoading(false);
    };

    useEffect(() => {
        setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
    }, [staffToken])

    useEffect(() => {
        if (staffToken) {
        const fetchData = async () => {
            try {
            

            const user = await getProtectedData(staffToken);
            console.log(user);
            setUserId(user.id);
            setUserName(user.name)

            } catch (error) {
            console.log(error);
            navigate("/")
            
            }
        };

        fetchData();
        }
    }, [staffToken]);

    useEffect(() => {
        if (userName && roomId) {
        socket.emit('join_room', roomId)
        }
    }, [userName, roomId])

    useEffect(() => {
        if (roomId) {
        const roomIdMsgs = notifications
            .filter(notific => notific.senderId === roomId)
            .map(notic => {
            return {
                roomId: notic.senderId,
                userName: notic.senderName,
                userId: notic.senderId,
                message: notic.content,
                time: notic.time,
                date: notic.date
            };
            });
        setMessages(roomIdMsgs)
        setMsgLoading(false);
        }
    }, [roomId])

    useEffect(() => {
        socket?.on('receive_message', (data) => {
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
    
          }
        } catch (error) {
          console.error(error);
        }
      }
    
      const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        const filtered = randomUniqueUserContent.filter(
          (user) =>
            user.senderName.toLowerCase().includes(query.toLowerCase()) ||
            (user.content &&
              user.content.toLowerCase().includes(query.toLowerCase()))
        );
    
        setFilteredUsers(filtered);
      };

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

    return (
        <>
            <button ref={chatbotToggleRef} className="chatbot__button">
                <span class="material-symbols-outlined">chat</span>
                <div className='message--count'>{filteredUsers.length}</div>
                <h6>Chat</h6>
                <span className="material-symbols-outlined">close</span>
            </button>

            <div className="chatbot">
                <div className="chatbot__header">
                    {roomId && <span class="material-symbols-outlined back__btn"
                    onClick={()=>{
                      setRoomId("")
                      setMsgLoading(false);
                    }}>arrow_back_ios</span>}
                    <h3 className="chatbox__title"><img src="../assets/img/logo/skillety-favicon.png" alt="" /> Live Chat</h3>
                    <span className="material-symbols-outlined close__btn" ref={chatbotCloseBtnRef}>close</span>
                </div>
                  {!roomId &&
                    <>
                   
                      {contentloading ? (
                                <div className="recent-chat-container-skeleton">
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                  <div className="recent-chat-area-skeleton">
                                    <div className="chat-person-info-area-skeleton">
                                      <Skeleton circle={true} height={50} width={50} />
                                      <div>
                                        <Skeleton height={16} width={150} />
                                        <Skeleton className='pt-2' height={10} width={100} />
                                      </div>
                                    </div>
                                    <Skeleton circle={true} height={20} width={20} />
                                  </div>
                                </div>
                              ) :
                              (
                                  <div className="visitors-chats-area">
                                    {filteredUsers.length > 0 ?
                                      <>
                                        {filteredUsers.map((user) => (
                                            <div className="visitors-chat-container"
                                                key={user.senderId}
                                                onClick={() => {
                                                    setRoomId(user.senderId);
                                                    setChattingPersonName(user.senderName);
                                                    setMessages([]);
                                                    setMsgLoading(true);
                                                }}>
                                                <div className='visitor--profile'>
                                                    <i className="bi bi-person-circle vi-pro-icon"></i>
                                                    <h6>{user.senderName}</h6>
                                                </div>
                                                <div className="ct-count">{user.numOfMsg}</div>
                                                <i className="bi bi-chevron-right right-icon"></i>
                                            </div>
                                        ))}
                                      </>
                                    :
                                    <div className="no-result-found-area">
                                      <i class="bi bi-exclamation-circle"></i>
                                      <div className="no-result-text">
                                        No results..!
                                      </div>
                                    </div>}
                                  </div>
                              )
                      }
                     </>
                  }
                {roomId && 
                <>
                    <ScrollToBottom className="visitor-chat-card-body">
                        <ul className="chatbot__box">
                        {msgloading ? (
                          <div className="chatting-card-body-skeloton">
                            <div className="chat-info-loading-skeleton">
                              <Skeleton circle={true} height={10} width={10} />
                              <Skeleton circle={true} height={10} width={10} />
                              <Skeleton circle={true} height={10} width={10} />
                              <Skeleton circle={true} height={10} width={10} />
                              <Skeleton circle={true} height={10} width={10} />
                            </div>
                          </div>
                        ) :(
                          <>
                          
                                {messages.map((messageContent, index) => {
                                        return (
                                            <li
                                                key={index} 
                                                className={userId == messageContent.userId ? "chatbot__chat outgoing" : "chatbot__chat incoming"}
                                            >
                                                {userId == messageContent.userId ? (
                                                    <div className="sender-avatar-container">
                                                        <img src="../assets/img/logo/skillety-favicon.png" alt="" />
                                                    </div>
                                                ) : null}
                                                <p>{messageContent.message}</p>
                                            </li>
                                        );
                                    })}
                            </>
                        )
                      }
                            
                        </ul>
                    </ScrollToBottom>

                    <div className="chatbot__input-box">
                      <textarea
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
                      ></textarea>
                      <span id="send-btn" className="material-symbols-outlined"
                      onClick={sendMessage}
                      >send</span>
                    </div>
                </>}
            </div>
        </>
    )
}

export default VisitorsChat;