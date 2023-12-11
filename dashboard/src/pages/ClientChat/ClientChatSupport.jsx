import React, { useState, useEffect, useRef } from 'react';
import ClientLayout from '../../components/ClientLayout';
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

const socket = io.connect('https://skillety.onrender.com');

const ClientChatSupport = () => {
  const { getProtectedData } = useContext(AuthContext);

  const [clientToken, setclientToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [roomId, setRoomId] = useState("");
  const inputRef = useRef(null);
  const chatInputRef = useRef(null);
  const [clientImg, setClientImg] = useState();
  const [clientImgUrl, setClientImgUrl] = useState("");
  const [loginClientDetail, setLoginClientDetail] = useState();
  const [contentloading, setContentLoading] = useState(true);

  useEffect(() => {
    setclientToken(JSON.parse(localStorage.getItem('clientToken')))
  }, [clientToken])

  useEffect(() => {
    if (clientToken) {
      const fetchData = async () => {
        try {

          const user = await getProtectedData(clientToken);
          console.log(user);
          setUserId(user.id);
          setRoomId(user.id);
          setUserName(user.name)
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
      
    }
  }, [clientToken]);

  const getLoginClientDetail = async () => {
    try {
        const res = await axios.get(`https://skillety.onrender.com/client/${userId}`, {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                Accept: 'application/json'
            }
        });
        const result = res.data;
        if (!result.error) {
            console.log(result);
            setLoginClientDetail(result);
        } else {
            console.log(result);
        }
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
  if (userId) {
      getLoginClientDetail();
  }
}, [userId]);

useEffect(() => {
  if (loginClientDetail?.companyId) {
      axios.get(`https://skillety.onrender.com/client-image/${loginClientDetail?.companyId}`)
          .then(res => setClientImg(res.data))
          .catch(err => console.log(err))

  }
}, [loginClientDetail?.companyId]);

useEffect(() => {
  if (clientImg) {
      setClientImgUrl(`https://skillety.onrender.com/client_profile/${clientImg.image}`)
  }

}, [clientImg]);


  useEffect(() => {
    if (userName && roomId) {
      socket.emit('join_room', roomId)
      axios.get(`https://skillety.onrender.com/roomId-chat-client/${roomId}`, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          const result = res.data;
          console.log(result.nonMatchingUserId, result.allChatDetailOfRoomId);
          
            if (result.allChatDetailOfRoomId.length > 0) {
              setContentLoading(false);
              setMessages(result.allChatDetailOfRoomId);
            }
          
        })
        .catch(err => console.log(err));
        setContentLoading(false);
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
  }, [clientToken, roomId]);

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
          date: formattedDate,
          companyId:loginClientDetail?.companyId,
        };

        await socket.emit('send_message', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputMessage("");

        const res = await axios.post(`https://skillety.onrender.com/roomId-chat-client`, messageData, {
          headers: {
            Authorization: `Bearer ${clientToken}`,
            Accept: 'application/json'
          }
        });

        console.log(res.data);

        if(clientToken){
          const clientData = {
            roomId,
            userName,
            companyId:loginClientDetail?.companyId,
          }
          const response = await axios.post(`https://skillety.onrender.com/client-chat`, clientData, {
          headers: {
            Authorization: `Bearer ${clientToken}`,
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
    <div>
      <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>

        <ClientLayout />

        <div class="main-content">
          <section class="section">
            <div className="my-app-section">

              
              {/* /////////////////////////////////// */}

              <div className="chat-section">
                <div className="row">
                  <div className="col-12">
                  {roomId ?
                      <div className="card chat--card right" id={`${window.innerWidth <= 991 ? 'chat_window' : ''}`}>
                        <div className="card-header chatting-card-header">
                          <img src={clientImgUrl} className="chatting-person-image" />
                          <div className="chatting-person-name">
                            {userName}
                          </div>
                        </div>

                        {contentloading ? (
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
                          messages.length>0 ? (
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
                                <img src={userId === messageContent.userId ? clientImgUrl : '../assets/img/user/skillety-logo.png'} className='chat-avatar' />
                              </div>
                            );
                          })}

                          </ScrollToBottom>
                          ) : 
                          (
                          
                          <div >
                            No messages..!
                          </div>
                        )
                        
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

export default ClientChatSupport
