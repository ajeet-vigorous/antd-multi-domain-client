import { useEffect, useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { LuThumbsUp } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { PiArrowElbowDownRight } from "react-icons/pi";
import "./chatBox.css"

function ChatBox({ messages, handleMessagesToggle }) {
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    const handleInputChange = (e) => setNewMessage(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage) return;

        const reqData = {
            message_to_textbox: trimmedMessage,
        };
        // dispatch(sendNewMessage(reqData)).then((data) => {
        //   if (!data.error) {
        //     setNewMessage("");
        //   }
        // });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    function formatUsername(username) {

        if (typeof username !== "string") {
            return "";
        }


        const parts = username.includes(" ") ? username.split(" ") : [username];

        const formattedParts = parts.map((part) => {
            if (part.length <= 2) {
                return part;
            }
            const firstChar = part[0];
            const lastChar = part[part.length - 1];
            const hiddenChars = "*".repeat(part.length - 2);
            return `${firstChar}${hiddenChars}${lastChar}`;
        });

        return formattedParts.join(" ");
    }

    return (
        <div className="chatbox-container">
            <header className="chatbox-header">
                <div></div>
                <div>Live Chat</div>
                <RxCross1 className="chatbox-close-icon" onClick={handleMessagesToggle} />
            </header>

            <div className="chatbox-messages">
                {message?.map((msg, index) => (
                    <div key={index} className="chat-message gx-py-2">
                        <div className="chat-message-content">
                            <img src={`https://i.pravatar.cc/45/${index}`} alt="img" className="chat-avatar" />
                            <strong>{formatUsername(msg.username)}</strong>: {msg.message}
                            {/* <div className="chat-message-meta">
                                <small>{msg.username} on {new Date(msg.timestamp).toLocaleString()}</small>
                            </div> */}
                        </div>
                    </div>
                ))}

                {/* Static Data Card */}
                <div className="chat-card">
                    <div className="chat-card-header">
                        <img src={`https://i.pravatar.cc/45/${1}`} alt="img" className="chat-avatar" />
                        <div className="chat-card-text">
                            <strong>Card Name</strong>: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                        <LuThumbsUp className="chat-message-icon" />
                    </div>

                    <div className="chat-card-body">
                        <div className="chat-card-user">
                            <img src={`https://i.pravatar.cc/45/${99}`} alt="img" className="chat-avatar" />
                            <div className="chat-user-id">******</div>
                            <div className="chat-verified-icon">
                                <HiOutlineShieldCheck />
                            </div>
                        </div>

                        <div className="chat-stats">
                            <div className="chat-stats-column">
                                <div className="chat-stat-label">Cashed Out:</div>
                                <div className="chat-stat-value">12547.33x</div>
                                <div className="chat-stat-label mt-3">Round:</div>
                                <div className="chat-stat-value">12547.33x</div>
                            </div>
                            <div className="chat-stats-column">
                                <div className="chat-stat-label">Win:</div>
                                <div className="chat-stat-value">12547.33x</div>
                                <div className="chat-stat-label mt-3">Bet:</div>
                                <div className="chat-stat-value">12547.33x</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={messagesEndRef} />
            </div>

            <div className="chatbox-input-container">
                <div className="chatbox-input-top">
                    <form onSubmit={handleSubmit} className="chatbox-form">
                        <input
                            type="text"
                            className="chatbox-input"
                            placeholder="Reply"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                    <div onClick={handleSubmit} className="chatbox-send-icon">
                        <PiArrowElbowDownRight />
                    </div>
                </div>

                {/* <div className="chatbox-input-bottom">
                    <div className="chatbox-attachments">
                        <label className="chatbox-attachment-icon">
                            <input type="file" accept="image/*" className="hidden" />
                            <FaImages />
                        </label>
                        <label className="chatbox-attachment-gif">
                            <input type="file" accept="image/gif" className="hidden" />
                            GIF
                        </label>
                    </div>
                    <div className="chatbox-char-count">160</div>
                </div> */}
            </div>
        </div>

    );
}

export default ChatBox;


const message = [
    {
        "id": 1,
        "username": "user1",
        "message": "Hey there!",
        "timestamp": "2025-05-19T10:01:00Z"
    },
    {
        "id": 2,
        "username": "user2",
        "message": "Hello, how are you?",
        "timestamp": "2025-05-19T10:02:00Z"
    },
    {
        "id": 3,
        "username": "user3",
        "message": "Doing great, thanks!",
        "timestamp": "2025-05-19T10:03:00Z"
    },
    {
        "id": 4,
        "username": "user4",
        "message": "Did you see the match yesterday?",
        "timestamp": "2025-05-19T10:04:00Z"
    },
    {
        "id": 5,
        "username": "user1",
        "message": "Yes! It was amazing.",
        "timestamp": "2025-05-19T10:05:00Z"
    },
    {
        "id": 6,
        "username": "user5",
        "message": "What's up folks?",
        "timestamp": "2025-05-19T10:06:00Z"
    },
    {
        "id": 7,
        "username": "user2",
        "message": "Working on a new project!",
        "timestamp": "2025-05-19T10:07:00Z"
    },
    {
        "id": 8,
        "username": "user3",
        "message": "Can I get some help with React?",
        "timestamp": "2025-05-19T10:08:00Z"
    },
    {
        "id": 9,
        "username": "user4",
        "message": "Sure, what’s the issue?",
        "timestamp": "2025-05-19T10:09:00Z"
    },
    {
        "id": 10,
        "username": "user3",
        "message": "State updates not reflecting in UI.",
        "timestamp": "2025-05-19T10:10:00Z"
    },
    {
        "id": 11,
        "username": "user5",
        "message": "Try checking useEffect or setState delay.",
        "timestamp": "2025-05-19T10:11:00Z"
    },
    {
        "id": 12,
        "username": "user1",
        "message": "Also, make sure you're not mutating state directly.",
        "timestamp": "2025-05-19T10:12:00Z"
    },
    {
        "id": 13,
        "username": "user2",
        "message": "Great tips. This chat is awesome!",
        "timestamp": "2025-05-19T10:13:00Z"
    },
    {
        "id": 14,
        "username": "user3",
        "message": "Thanks everyone!",
        "timestamp": "2025-05-19T10:14:00Z"
    },
    {
        "id": 15,
        "username": "user4",
        "message": "Any weekend plans?",
        "timestamp": "2025-05-19T10:15:00Z"
    },
    {
        "id": 16,
        "username": "user5",
        "message": "Going hiking 🏞️",
        "timestamp": "2025-05-19T10:16:00Z"
    },
    {
        "id": 17,
        "username": "user1",
        "message": "That sounds fun!",
        "timestamp": "2025-05-19T10:17:00Z"
    },

]
