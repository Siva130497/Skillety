import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
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
import { v4 as uuidv4 } from "uuid";

// const socket = io.connect('https://skillety-n6r1.onrender.com');

const CandidateChatSupport = () => {
  const { getProtectedData } = useContext(AuthContext);

  const [candidateToken, setcandidateToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [roomId, setRoomId] = useState("");
  const inputRef = useRef(null);
  const chatInputRef = useRef(null);
  const [candidateImg, setCandidateImg] = useState();
  const [candidateImgUrl, setCandidateImgUrl] = useState("");
  const [contentloading, setContentLoading] = useState(true);
  const [allEmployee, setAllEmployee] = useState([]);

  const [socket, setSocket] = useState(null);

    useEffect(()=>{
        setSocket(io("https://skillety-n6r1.onrender.com"));
    },[]);

    useEffect(()=>{
        socket?.emit("newUser", userName)
    },[socket, userName])

  useEffect(() => {
    setcandidateToken(JSON.parse(localStorage.getItem('candidateToken')))
  }, [candidateToken])

  useEffect(() => {
    if (candidateToken) {
      const fetchData = async () => {
        try {

          const user = await getProtectedData(candidateToken);
          console.log(user);
          setUserId(user.id || user.uid);
          setRoomId(user.id || user.uid);
          setUserName(user.name)
          axios.get(`https://skillety-n6r1.onrender.com/candidate-image/${user.id || user.uid}`)
            .then(res => setCandidateImg(res.data))
            .catch(err => console.log(err))
        } catch (error) {
          console.log(error);
          window.location.href = 'https://skillety-frontend-wcth.onrender.com/candidate-login'
        }
      };

      fetchData();

      axios.get("https://skillety-n6r1.onrender.com/all-employee")
      .then(res=>{
        console.log(res.data);
        setAllEmployee(res.data);
      })
      .catch(err=>console.log(err))
      
    }
  }, [candidateToken]);

  useEffect(() => {
    if (candidateImg) {
        setCandidateImgUrl(candidateImg.image.startsWith('https') ? candidateImg.image : `data:image/jpeg;base64,${candidateImg.image}`)
    }

}, [candidateImg]);

  useEffect(() => {
    if (userName && roomId) {
      socket.emit('join_room', roomId)
      axios.get(`https://skillety-n6r1.onrender.com/roomId-chat/${roomId}`, {
        headers: {
          Authorization: `Bearer ${candidateToken}`,
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
  }, [candidateToken, roomId]);

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
          content: `${userName} messaged you`,
          time: formattedTime,
          date: formattedDate,
          redirect:'/chat-candidate',
          id:uuidv4()
        }

        await socket.emit('send_message', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputMessage("");

        await socket.emit("sendNotification", notificationData)

        // API call 1
      const response1 = await axios.post(`https://skillety-n6r1.onrender.com/roomId-chat`, messageData, {
        headers: {
          Authorization: `Bearer ${candidateToken}`,
          Accept: 'application/json'
        }
      });

      console.log(response1.data);

      // API call 2
      const response2 = await axios.post(`https://skillety-n6r1.onrender.com/create-new-notification`, notificationData, {
        headers: {
          Authorization: `Bearer ${candidateToken}`,
          Accept: 'application/json'
        }
      });

      console.log(response2.data);

      if (candidateToken) {
        // API call 3
        const response3 = await axios.post(`https://skillety-n6r1.onrender.com/candidate-chat`, { roomId, userName }, {
          headers: {
            Authorization: `Bearer ${candidateToken}`,
            Accept: 'application/json'
          }
        });

        console.log(response3.data);
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

        <Layout />

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
                          <img src={candidateImgUrl} className="chatting-person-image" />
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
                                    <img src={userId === messageContent.userId ? candidateImgUrl : '../assets/img/user/skillety-logo.png'} className='chat-avatar' />
                                  </div>
                                );
                              })}

                            </ScrollToBottom>
                          ) : (
                          <div className='card-body chatting-card-body'>
                            <div className='chat-not-available-area'>
                              <p> No messages..!</p>
                            </div>
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

export default CandidateChatSupport
