import React, { useEffect } from "react";
import { Paperclip, Image, Send } from "lucide-react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000", {
    transports: ["websocket", "polling"]
});

const MessageInput = ({ message, selectedChat, setMessage, handleFileAttachment }) => {
    
    useEffect(() => {
        socket.on("message", (data) => {
            console.log("New message received:", data);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const currentuserid = localStorage.getItem("currentUserName");

        const messageData = {
            message,
            selectedChat,
            currentuserid,
        };

        try {
            // Send via Socket.io
            socket.emit("sendMessage", messageData);

            // Also send via API for redundancy
            await axios.post("http://localhost:4000/api/chats/sendMessage", messageData);

            setMessage(""); // Clear input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-0 bg-gray-800">
            <div className="flex bg-transparent gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input input-bordered text-gray-50 flex-1 bg-transparent"
                />
                <button onClick={handleSendMessage} className="text-white">
                    <Send className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
