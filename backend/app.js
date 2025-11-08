const express = require("express");
const cors = require("cors"); 
require("./config/db");

const userRouter = require("./routes/user.route");
const loginRouter = require("./routes/login.route");
const dashboardRouter = require("./routes/dashboard.route");
const taskRouter = require("./routes/task.route");
const chatRouter = require("./routes/chat.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/dashboards", dashboardRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/chats", chatRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Handling server errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something broke" });
});

// Route not found error
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
