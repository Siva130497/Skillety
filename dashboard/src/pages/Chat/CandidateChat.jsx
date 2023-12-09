import React, { useState } from 'react';
import { useEffect } from 'react';
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

const socket = io.connect('https://skillety.onrender.com');

const CandidateChat = () => {
  const { getProtectedData } = useContext(AuthContext);

  const [staffToken, setStaffToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [disableMode, setDisableMode] = useState(false);
  const [candidatesWantedChat, setCandidatesWantedChat] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [connectedRecruiterName, setConnectedRecruiterName] = useState("");

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
        }
      };

      fetchData();
    }
  }, [staffToken]);

  useEffect(() => {
    if (staffToken) {
      axios.get("https://skillety.onrender.com/candidate-chat", {
        headers: {
          Authorization: `Bearer ${staffToken}`,
          Accept: 'application/json'
        }
      })
        .then(res => {
          console.log(res.data);
          setCandidatesWantedChat(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [staffToken])


  useEffect(() => {
    if (userName && roomId) {
      socket.emit('join_room', roomId)
      axios.get(`https://skillety.onrender.com/roomId-chat/${roomId}`, {
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
              setMessages(result.allChatDetailOfRoomId);
            } else {
              setDisableMode(true);
              axios.get(`https://skillety.onrender.com/staff/${result.nonMatchingUserId[0].userId}`, {
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

  return (
    <div>
      <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>

        <ATSLayout />

        <div class="main-content">
          <section class="section">
            <div className="my-app-section">

              <div className="chat-container" >
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
              </div>

              {/* /////////////////////////////////// */}

              <div className="chat-section">
                <div className="row">
                  <div className="col-12 col-md-4 col-lg-4">
                    <div className="card chat--card left">
                      <div className="card-header chat--card-header">
                        <div className="chat-search-container">
                          <input type="search"
                            className='form-control chat-search-input'
                            placeholder='Seach here...' />
                          <i class="bi bi-search"></i>
                        </div>
                      </div>
                      <div className="card-body chat--card-body">
                        <div className="recent-chat-container">
                          {candidatesWantedChat.length > 0 ?
                            <>
                              {candidatesWantedChat.map((candidate) => {
                                return <div className={`recent-chat-area ${candidate.roomId == roomId ? 'active' : ''}`}
                                  key={candidate.roomId}
                                  onClick={() => {
                                    setRoomId(candidate.roomId);
                                    setMessages([]);
                                    setDisableMode(false);
                                  }}>
                                  <div className="chat-person-info-area">
                                    <img src='../assets/img/user/user.png' className="chat-person-image" />
                                    <div className="chat-person-name">
                                      {candidate.userName}
                                    </div>
                                  </div>
                                  {candidate.newMessage &&
                                    <div className="chat-msg-badge">
                                      New Msg
                                    </div>
                                  }
                                </div>
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

                      </div>
                      <div className="card-footer chat--card-footer"></div>
                    </div>
                  </div>

                  <div className="col-12 col-md-8 col-lg-8">
                    {roomId ?
                      <div className="card chat--card right">
                        <div className="card-header chatting-card-header">
                          <img src='../assets/img/user/user.png' className="chatting-person-image" />
                          <div className="chatting-person-name">
                            Name
                          </div>
                        </div>

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
                                <img src='../assets/img/user/skillety-logo.png' className='chat-avatar' />
                              </div>
                            );
                          })}

                          {disableMode &&
                            <div className='chat-not-available-area'>
                              <p>This candidate attended by <b>{connectedRecruiterName}.</b></p>
                            </div>
                          }
                        </ScrollToBottom>

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
                          />

                          <button className='btn msg-send-btn'
                            disabled={disableMode}
                            onClick={sendMessage}>
                            <i class="bi bi-send"></i>
                          </button>

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

export default CandidateChat
