import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './LiveChat.css';
import ScrollToBottom from "react-scroll-to-bottom";


const VisitorsChat = () => {
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

    return (
        <>
            <button ref={chatbotToggleRef} className="chatbot__button">
                <span class="material-symbols-outlined">chat</span>
                <div className='message--count'>5</div>
                <h6>Chat</h6>
                <span className="material-symbols-outlined">close</span>
            </button>

            <div className="chatbot">
                <div className="chatbot__header">
                    <span class="material-symbols-outlined back__btn">arrow_back_ios</span>
                    <h3 className="chatbox__title"><img src="../assets/img/logo/skillety-favicon.png" alt="" /> Live Chat</h3>
                    <span className="material-symbols-outlined close__btn" ref={chatbotCloseBtnRef}>close</span>
                </div>

                {/* recent chats here */}
                {/* <div className="visitors-chats-area">
                    <div className="visitors-chat-container">
                        <div className='visitor--profile'>
                            <i class="bi bi-person-circle vi-pro-icon"></i>
                            <h6>Visitor 1</h6>
                        </div>
                        <div className="ct-count">1</div>
                        <i class="bi bi-chevron-right right-icon"></i>
                    </div>

                    <div className="visitors-chat-container">
                        <div className='visitor--profile'>
                            <i class="bi bi-person-circle vi-pro-icon"></i>
                            <h6>Visitor 2</h6>
                        </div>
                        <div className="ct-count">5</div>
                        <i class="bi bi-chevron-right right-icon"></i>
                    </div>

                    <div className="visitors-chat-container">
                        <div className='visitor--profile'>
                            <i class="bi bi-person-circle vi-pro-icon"></i>
                            <h6>Visitor 3</h6>
                        </div>
                        <div className="ct-count">10</div>
                        <i class="bi bi-chevron-right right-icon"></i>
                    </div>
                </div> */}
                {/*  */}

                <>
                    <ScrollToBottom className="visitor-chat-card-body">
                        <ul className="chatbot__box">

                            {/* chat welcome screen */}
                            {/* <div className='chat-welcome'>
                            <img src="../assets/img/logo/skillety-logo-icon.png" className='chat-welcome-img' alt="" />
                            <div className='chat-welcome-text'>
                                Welcome to <span>Skillety</span>
                            </div>
                            <p>👋 Hi, message us with any questions. We're happy to help!</p>
                            </div> */}
                            {/*  */}

                            {/* sender message */}
                            <li className="chatbot__chat incoming">
                                <div className="sender-avatar-container">
                                    <img src="../assets/img/logo/skillety-favicon.png" alt="" />
                                </div>
                                <p>Hi there. How can I help you today?</p>
                            </li>
                            {/*  */}

                            {/* receiver message */}
                            <li className="chatbot__chat outgoing">
                                <p>I help you today</p>
                            </li>
                            {/*  */}

                            <li className="chatbot__chat incoming">
                                <div className="sender-avatar-container">
                                    <img src="../assets/img/logo/skillety-favicon.png" alt="" />
                                </div>
                                <p>Hi there. How can I help you today?</p>
                            </li>

                            <li className="chatbot__chat outgoing">
                                <p>I help you today</p>
                            </li>

                            <li className="chatbot__chat incoming">
                                <div className="sender-avatar-container">
                                    <img src="../assets/img/logo/skillety-favicon.png" alt="" />
                                </div>
                                <p>Hi there. How can I help you today?</p>
                            </li>

                            <li className="chatbot__chat outgoing">
                                <p>I help you today</p>
                            </li>

                            <li className="chatbot__chat incoming">
                                <div className="sender-avatar-container">
                                    <img src="../assets/img/logo/skillety-favicon.png" alt="" />
                                </div>
                                <p>Hi there. How can I help you today?</p>
                            </li>

                            <li className="chatbot__chat outgoing">
                                <p>I help you today</p>
                            </li>
                        </ul>
                    </ScrollToBottom>

                    <div className="chatbot__input-box">
                        <textarea
                            className="chatbot__textarea"
                            placeholder="Enter a message..."
                            required
                        ></textarea>
                        <span id="send-btn" className="material-symbols-outlined">send</span>
                    </div>
                </>

            </div>
        </>
    )
}

export default VisitorsChat;