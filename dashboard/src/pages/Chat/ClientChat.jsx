import React, { useState, useEffect, useRef } from 'react';
import ATSLayout from '../../components/ATSLayout';
import Footer from '../../components/Footer';
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
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const socket = io.connect('https://skillety-n6r1.onrender.com');

const ClientChat = () => {
  const { getProtectedData, getClientImg, clientImg } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [staffToken, setStaffToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [disableMode, setDisableMode] = useState(false);
  const [clientsWantedChat, setclientsWantedChat] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [connectedRecruiterName, setConnectedRecruiterName] = useState("");
  const inputRef = useRef(null);
  const chatInputRef = useRef(null);
  const [chattingPersonName, setChattingPersonName] = useState("");
  const [chattingPersonImg, setChattingPersonImg] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredclients, setFilteredclients] = useState([]);
  const [contentloading, setContentLoading] = useState(true);
  const [msgloading, setMsgLoading] = useState(true);

  useEffect(() => {
    setStaffToken(JSON.parse(localStorage.getItem('staffToken')))
  }, [staffToken])

  useEffect(() => {
    if (staffToken) {
      const fetchData = async () => {
        try {
          

          const user = await getProtectedData(staffToken);
          console.log(user);
          setUserId(user.id || user.uid);
          setUserName(user.name)

          
        } catch (error) {
          console.log(error);
          navigate("/")
          
        }
      };

      fetchData();
      getClientImg();
    }
  }, [staffToken]);

  useEffect(() => {
    if (staffToken) {
      axios.get("https://skillety-n6r1.onrender.com/client-chat", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          console.log(res.data);
          setContentLoading(false)
          setclientsWantedChat(res.data);
          setFilteredclients(res.data);
        })
        .catch(err => {
            console.log(err)
            setContentLoading(false)
        });
    }
  }, [staffToken])


  useEffect(() => {
    if (userName && roomId) {
      socket.emit('join_room', roomId)
      axios.get(`https://skillety-n6r1.onrender.com/roomId-chat-client/${roomId}`, {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          const result = res.data;
          console.log(result.nonMatchingUserId, result.allChatDetailOfRoomId);
          if (result.nonMatchingUserId.length > 0) {
            if (result.nonMatchingUserId[0].userId === userId) {
              setMsgLoading(false);
              setMessages(result.allChatDetailOfRoomId);
            } else {
              setMsgLoading(false);
              setDisableMode(true);
              axios.get(`https://skillety-n6r1.onrender.com/staff/${result.nonMatchingUserId[0].userId}`, {
                headers: {
                  Authorization: `Bearer ${staffToken}`,
                  Accept: 'application/json'
                }
              })
                .then(res => {
                  console.log(res.data?.name)
                  setConnectedRecruiterName(res.data?.name)
                })
                .catch(err => console.log(err))
            }
          } else {
            if (result.allChatDetailOfRoomId.length > 0) {
              setMsgLoading(false);
              setMessages(result.allChatDetailOfRoomId);
            }
          }
        })
        .catch(err => console.log(err));
    }
  }, [userName, roomId])

  useEffect(() => {
    socket.on('receive_message', (data) => {
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

        const res = await axios.post(`https://skillety-n6r1.onrender.com/roomId-chat-client`, messageData, {
          headers: {
            Authorization: `Bearer ${staffToken}`,
            Accept: 'application/json'
          }
        });

        console.log(res.data);

      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = clientsWantedChat.filter(
      (client) =>
        client.userName.toLowerCase().includes(query.toLowerCase()) ||
        (client.lastMessage &&
          client.lastMessage.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredclients(filtered);
  };

  return (
    <div>
      <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>

        <ATSLayout />

        <div class="main-content">
          <section class="section">
            <div className="my-app-section">

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
                          {filteredclients.length > 0 ?
                            <>
                              {filteredclients.map((client) => {
                                const matchingImg = clientImg ? clientImg.find(img => img.id === client.companyId) : null;
                                const imgSrc = matchingImg ? `https://skillety-n6r1.onrender.com/client_profile/${matchingImg.image}` : "../assets/img/talents-images/avatar.jpg";

                                return <a href='#chat_window' className={`recent-chat-area ${window.innerWidth <= 991 ? 'navigate-to-chat' : ''} ${client.roomId == roomId ? 'active' : ''}`}
                                  key={client.roomId}
                                  onClick={() => {
                                    setRoomId(client.roomId);
                                    setChattingPersonName(client.userName)
                                    setChattingPersonImg(imgSrc)
                                    setMessages([]);
                                    setDisableMode(false);
                                  }}>
                                  <div className="chat-person-info-area">
                                    <img src={imgSrc} className="chat-person-image" />
                                    <div className="chat-person-name">
                                      {client.userName}
                                    </div>
                                  </div>
                                  {/* {client.lastMessage &&
                                    <small>
                                      {client.lastMessage}
                                    </small>
                                  } */}
                                  {client.newMessageCount > 0 &&
                                    <div className="chat-msg-badge">
                                      {client.newMessageCount < 100 ?
                                      <span>{client.newMessageCount}</span>
                                      : 
                                      <span>99+</span>
                                      }
                                    </div>
                                  }
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

                            {disableMode &&
                              <div className='chat-not-available-area'>
                                <p>This client attended by <b className='text-capitalized'>{connectedRecruiterName}.</b></p>
                              </div>
                            }
                          </ScrollToBottom>
                        )}

                        <div className="card-footer chatting-card-footer">
                          <input type="text"
                            disabled={disableMode}
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
                            disabled={disableMode}
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
                            Welcome to <span>Skillety's</span> <br />exclusive chat.
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

export default ClientChat
