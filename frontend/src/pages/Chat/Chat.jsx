import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import axios from 'axios'; // Import Axios
import '../../App.css';

// const socket = io.connect('http://localhost:5002');

const Chat = () => {
  const [user, setUser] = useState(null); // Initialize with null
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const clientRecruiterChat = async () => {
    try {
      const response = await axios.get('http://localhost:5002/clientRecruiterChat', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
        },
      });
      const result = response.data;
      if (!result.error) {
        console.log(result);
        setUser(result.user);

        socket.emit('join_room', { id: result.user.id, role: result.user.role, name: result.user.name });
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    clientRecruiterChat();
  }, []);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('receive_message', (data) => {
      console.log(data.message);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    const newMessage = {
      message: inputMessage,
      sender: user.id, // Use user.id as the sender identifier
      name: user.name,
      senderRole: user.role, // Use user.role to indicate the sender's role
    };
  
    socket.emit('send_message', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  // Conditional rendering based on the user data
  if (user === null) {
    // Loading state or you can show a loading spinner
    return <div>Loading user data...</div>;
  }

  return (
    <div className="chat-container">
      <h1>Real-Time Chat</h1>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`message ${message.sender === user.id ? 'sender' : 'receiver'}`}
            >
              <span className="message-name">{message.name}</span>
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
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
