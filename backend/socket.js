const { Server } = require("socket.io");
const Chat = require("./models/chat.model");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("sendMessage", async (messageData) => {
            try {
                console.log("Received message:", messageData);

                const { message, selectedChat, currentuserid } = messageData;

                // Validate input
                if (!message || !selectedChat || !currentuserid) {
                    return socket.emit("error", { message: "All fields are required" });
                }

                // Save message to the database
                const newChat = new Chat({
                    content: message,
                    user_id: currentuserid,
                    task_id: selectedChat,
                });

                await newChat.save();

                // Emit message to all clients
                io.emit("message", newChat);
            } catch (error) {
                console.error("Error sending message:", error);
                socket.emit("error", { message: "Internal server error" });
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};
