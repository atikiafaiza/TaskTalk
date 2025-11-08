const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/chat.controller");

router.post("/sendMessage", sendMessage);
router.get("/getMessages/:id", getMessages);

module.exports = router;
