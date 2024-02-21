import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from './ATSLayout';
import Footer from './Footer';
import './Chat.css';
import './Chat-responsive.css';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ScrollToBottom from "react-scroll-to-bottom";
import io from 'socket.io-client';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// const socket = io.connect('https://skillety-n6r1.onrender.com');

const RandomUserChat = () => {
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

  useEffect(() => {
    //close chat
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setRoomId(null);
      }
    };

    //focus seacrh input
    const handleSearchKeyDown = (event) => {
      if (event.altKey && event.key === 's') {
        inputRef.current.focus();
      }
    };

    //focus message input
    const handleChatKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/' && roomId !== null && chatInputRef.current) {
        chatInputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleSearchKeyDown);
    document.addEventListener('keydown', handleChatKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleSearchKeyDown);
      document.removeEventListener('keydown', handleChatKeyDown);
    };
  }, []);

  useEffect(() => {
    // Function to handle scrolling to the target
    const handleScroll = (event) => {
      const target = $($(event.currentTarget).attr('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 800);
      }
    };

    $('.navigate-to-chat').on('click', handleScroll);

    return () => {
      $('.navigate-to-chat').off('click', handleScroll);
    };
  }, [staffToken, roomId]);

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

  return (
    <div>
      <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>

        <ATSLayout />

        <div class="main-content">
          <section class="section">
            <div className="my-app-section">

              {/* <div className="chat-container" >
                <div >
                  {candidatesWantedChat.length > 0 && <table className="table table-hover">
                    <tbody>
                      {candidatesWantedChat.map((candidate) => {
                        return <tr key={candidate.roomId} onClick={() => {
                          setRoomId(candidate.roomId);
                        }}>
                          <th scope="row">{candidate.userName}</th>
                          {candidate.newMessage && <th scope="col"><span className="badge rounded-pill bg-dark">New msg</span></th>}
                        </tr>
                      })}
                    </tbody>
                  </table>}
                </div>
                {roomId && <div >

                  <div className="chat-window">
                    <div className="chat-header">
                      <p>Real-Time Chat </p>
                    </div>
                    <div className="chat-body">
                      {(disableMode) && <p>This candidate attended by {connectedRecruiterName}</p>}
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
                  <button type="button" className="btn btn-outline-info" onClick={() => {
                    setRoomId("");
                    setMessages([]);
                    setDisableMode(false);
                  }}>Back</button>
                </div>}
              </div> */}

              {/* /////////////////////////////////// */}

              <div className="chat-section">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-4">
                    <div className="card chat--card left">
                      <div className="card-header chat--card-header">
                        <div className="chat-search-container">
                          <input type="search"
                            className='form-control chat-search-input'
                            placeholder='Seach here...'
                            ref={inputRef}
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                          <i class="bi bi-search"></i>
                          <div className="search-short-cut">
                            <span className="search-short-cut-key">Alt + S</span>
                          </div>
                        </div>
                      </div>
                      <div className="card-body chat--card-body">
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
                        ) : (
                        <div className="recent-chat-container">
                          {filteredUsers.length > 0 ?
                            <>
                              {filteredUsers.map((user) => {
                                
                                const imgSrc = "../assets/img/talents-images/avatar.jpg";

                                return <a href='#chat_window' className={`recent-chat-area ${window.innerWidth <= 991 ? 'navigate-to-chat' : ''} ${user.senderId == roomId ? 'active' : ''}`}
                                  key={user.senderId}
                                  onClick={() => {
                                    setRoomId(user.senderId);
                                    setChattingPersonName(user.senderName)
                                    setChattingPersonImg(imgSrc)
                                    setMessages([]);
                                    setMsgLoading(true);
                                  }}>
                                  <div className="chat-person-info-area">
                                    <img src={imgSrc} className="chat-person-image" />
                                    <div className="chat-person-name">
                                      {user.senderName}
                                    </div>
                                  </div>
                                  {/* {candidate.lastMessage &&
                                    <small>
                                      {candidate.lastMessage}
                                    </small>
                                  } */}
                                  {/* {candidate.newMessageCount > 0 &&
                                    <div className="chat-msg-badge">
                                      {candidate.newMessageCount}
                                    </div>
                                  } */}
                                  
                                    <div className="chat-msg-badge">
                                      {user.numOfMsg < 100 ?
                                      <span>{user.numOfMsg}</span>
                                      : 
                                      <span>99+</span>
                                      }
                                    </div>
                                  
                                </a>
                              })}

                                {/* <div className="recent-chat-area">
                                  <div className="chat-person-info-area">
                                    <img src='../assets/img/user/user.png' className="chat-person-image"></img>
                                    <div className="chat-person-name">
                                      Name
                                    </div>
                                  </div>
                                  <div className="chat-msg-badge">
                                    New Msg
                                  </div>
                                </div> */}
                              </>
                              :
                              <div className="no-result-found-area">
                                <i class="bi bi-exclamation-circle"></i>
                                <div className="no-result-text">
                                  No results..!
                                </div>
                              </div>
                            }
                          </div>
                        )}

                      </div>
                      <div className="card-footer chat--card-footer"></div>
                    </div>
                  </div>

                  <div className="col-12 col-md-12 col-lg-8">
                    {roomId ?
                      <div className="card chat--card right" id={`${window.innerWidth <= 991 ? 'chat_window' : ''}`}>
                        <div className="card-header chatting-card-header">
                          <img src={chattingPersonImg} className="chatting-person-image" />
                          <div className="chatting-person-name">
                            {chattingPersonName}
                          </div>
                        </div>

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
                        ) : (
                        <ScrollToBottom className="card-body chatting-card-body">
                          {messages.map((messageContent, index) => {
                            return (
                              <div className={`chat--message-container ${userId === messageContent.userId ? 'send' : 'receive'}`}
                                key={index}>
                                <div className="chat--message-area">
                                  <div className="chat-message-info">
                                    <p id="date">{messageContent.date}</p>
                                  </div>
                                  <div className="chat-message-content">
                                    <p>
                                      {messageContent.message}</p>
                                  </div>
                                  <div className="chat-message-info">
                                    <p id="time">{messageContent.time}</p>
                                  </div>
                                </div>
                                <img src={userId === messageContent.userId ? '../assets/img/user/skillety-logo.png' : chattingPersonImg} className='chat-avatar' />
                              </div>
                            );
                          })}
                          </ScrollToBottom>
                        )}

                        <div className="card-footer chatting-card-footer">
                          <input type="text"
                            value={inputMessage}
                            className='form-control message-input'
                            placeholder='Enter the message here...'
                            onChange={(event) => {
                              setInputMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                              event.key === "Enter" && sendMessage();
                            }}
                            ref={chatInputRef}
                          />

                          <button className='btn msg-send-btn'
                            onClick={sendMessage}>
                            <i class="bi bi-send"></i>
                          </button>

                          <div className="chat-short-cut">
                            <span className="chat-short-cut-key">Ctrl + /</span>
                          </div>

                        </div>
                      </div>
                      :
                      <div className="card chat--card start">
                        <div className='chat-welcome'>
                          <img src="../assets/img/logo/skillety-logo-icon.png" className='chat-welcome-img' alt="" />
                          <div className='chat-welcome-text'>
                            Welcome to <span>Skillety's</span> <br />visitor chat.
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        <Footer />
      </div >
    </div >
  )
}

export default RandomUserChat
