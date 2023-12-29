import React, { useEffect, useRef, useState } from 'react';
import './LiveChat.css';
import axios from 'axios';
// import { io } from 'socket.io-client';

const LiveChat = () => {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    // const socket = useRef(io("ws://localhost:5002"))
    const id = "1"
    console.log(messages);

    

    useEffect(()=>{
        const getConversation = async ()=>{
            try{
                const res = await axios.get("https://skillety-n6r1.onrender.com/conversation/"+id);
                setConversation(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getConversation();
    },[])
    
    useEffect(()=>{
        const getMessages  = async ()=>{
            try{
                const res = await axios.get("https://skillety-n6r1.onrender.com/messages/"+currentChat?._id);
                setMessages(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getMessages();
    },[currentChat])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const  message = {
            sender: id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        try{
            const res = await axios.post("https://skillety-n6r1.onrender.com/messages", message);
            setMessages((prevMessages) => [...prevMessages, res.data]);
            setNewMessage("");
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='livechat'>
        <div className='chatMenu'>
            <div className='chatMenuWrapper'>
            {conversation.map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                    {c.members[1]}
                </div>
            ))}
            </div>
        </div>
        <div className='chatBox'>
            <div className='chatBoxWrapper'>
                <div className="chat-container">
                    {messages.map((message) => (
                        <div
                        key={message._id}
                        className={`message ${message.sender === id ? 'right' : 'left'}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
            </div>
            <textarea 
                className="form-control" 
                rows="3"
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                placeholder="Write something..."
            ></textarea>
            <button type="button" className="btn btn-outline-info my-3" onClick={handleSubmit}>Send</button>
        </div>
    </div>
  )
}

export default LiveChat