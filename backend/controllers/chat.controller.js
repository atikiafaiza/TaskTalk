const Chat = require("../models/chat.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

exports.sendMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { message, selectedChat, currentuserid } = req.body;

    if (!message || !selectedChat || !currentuserid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate task
    const task = await Task.findOne({ task_id: selectedChat });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Validate user
    const user = await User.findOne({ user_name: currentuserid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save to database
    const newChat = new Chat({
      content: message,
      user_id: currentuserid,
      task_id: selectedChat,
    });

    await newChat.save();

    res.status(201).json({ message: "Message sent successfully!", newChat });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getMessages = async (req, res) => {
    try {
        console.log(req.params);
        const task_id = req.params.id;
        if (!task_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }
        const messages = await Chat.find({task_id});
        console.log(messages);
         return res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};