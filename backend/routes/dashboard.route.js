const express = require('express');
const router = express.Router();

const { createNewDashboard, getMyDashboards, getOtherDashboards, getInvitations, acceptInvitation, rejectInvitation, getDashboardInfoForTaskchat, addNewMember}= require("../controllers/dashboard.controller");

router.post("/createNewDashboard", createNewDashboard);
router.get("/getMyDashboards/:id", getMyDashboards);
router.get("/getOtherDashboards/:id", getOtherDashboards);
router.get("/getInvitations/:id", getInvitations);
router.put("/acceptInvitation/:id", acceptInvitation);
router.delete("/rejectInvitation/:id", rejectInvitation);
router.get("/getDashboardInfoForTaskchat/:id", getDashboardInfoForTaskchat);
router.post("/addNewMember", addNewMember);

module.exports = router;

