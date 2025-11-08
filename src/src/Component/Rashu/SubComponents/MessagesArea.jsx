import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paperclip } from 'lucide-react';

const MessagesArea = ({ 
    currentUser, 
    selectedChat,
    taskID
}) => {
    const [messages, setMessages] = useState([]);  // Store fetched messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch messages
    const fetchMessages = async (taskID) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/chats/getMessages/${taskID}`);
            // Ensure response.data.messages is an array, even if it's empty
            setMessages(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError('Failed to fetch messages');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch messages when taskID or selectedChat changes
    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat);
        }
    }, [taskID, selectedChat]);

    // Combine and sort messages
    const combinedMessages = [...messages].sort((a, b) => Number(a.creation_date) - Number(b.creation_date));

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
            {loading && <div className="text-white">Loading messages...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && combinedMessages.length === 0 && (
                <div className="text-white">No messages available</div>
            )}
            {!loading && !error && combinedMessages.map((message) => {
                const formattedTime = new Date(Number(message.creation_date)).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                });

                return (
                    <div
                        key={message.chat_id || Math.random()}
                        className={`flex ${message.user_id == currentUser  ? 'chat chat-end' : 'chat chat-start'}`}
                    >
                        <div
                            className={`max-w-[70%] chat-bubble p-4 ${
                                message.user_id == currentUser 
                                    ? 'bg-blue-700 ml-auto' 
                                    : 'bg-orange-700 mr-auto'
                            }`}
                        >
                            <div className="font-medium text-sm mb-1 text-white">
                                {message.user_id}
                            </div>

                            {message.content && (
                                <div className="text-sm text-white">
                                    {message.content}
                                </div>
                            )}

                            <div className={`text-xs mt-2 ${message.user_id == currentUser ? 'text-blue-200' : 'text-orange-200'}`}>
                                {formattedTime}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessagesArea;
