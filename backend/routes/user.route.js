const express = require('express');
const router = express.Router();

const { getAllUsers, getOneUsersByReq }= require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getOneUsersByReq);


module.exports = router;

