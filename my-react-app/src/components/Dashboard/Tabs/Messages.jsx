import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Tabs.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/messages/', {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
            setMessages(response.data);
        } catch (error) {
            toast.error('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="messages-container">
            {messages.length === 0 ? (
                <div className="no-messages">
                    <h3>No messages yet</h3>
                    <p>Your conversations with hosts will appear here</p>
                </div>
            ) : (
                <div className="messages-list">
                    {messages.map(message => (
                        <div key={message.id} className="message-card">
                            <div className="message-header">
                                <h3>{message.sender.username}</h3>
                                <span className="message-date">
                                    {new Date(message.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="message-content">{message.content}</p>
                            <button className="reply-btn">Reply</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;