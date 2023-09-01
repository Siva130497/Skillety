import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../../App.css'; 


const socket = io.connect('http://localhost:5002'); 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    const newMessage = { message: inputMessage, sender: true };
    socket.emit('send_message', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data.message);
      data.sender = false;
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      <div>
        <h1>Real-Time Chat</h1>
        <div>
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className={`message ${message.sender ? 'sender' : 'receiver'}`}
              >
                {message.message}
              </li>
            ))}
          </ul>
        </div>
        <div>
            <input className="form-control form-control-lg" type="text" placeholder="Enter the message..." value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)} />
            <button  onClick={sendMessage}>Send</button> 
        </div>
      </div>
    </div>
  );
}

export default Chat;
