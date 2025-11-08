const Dashboard = require("../models/dashboard.model");
const DashboardAccess = require("../models/dashboardAccess.model");
const { getOneUser } = require("./user.controller")
const { v4: uuidv4 } = require("uuid");

// create new dashboard
const createNewDashboard = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, currentUserName} = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await getOneUser(currentUserName);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create new Dashboard object
        const newDashboard = new Dashboard({
            dashboard_name: name,
            description: description,
            user_id: currentUserName,
        });        

        // Save to the database
        await newDashboard.save();

        res.status(201).json({ message: "Dashboard created successfully!" });
    } catch (error) {
        console.error("Error creating dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getMyDashboards = async (req, res) => {
    try {
        console.log(req.params);
        const user_id = req.params.id;
        if (!user_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }
        const dashboard = await Dashboard.find({user_id});
        console.log(dashboard);
        return res.status(200).json(dashboard);
    } catch (error) {
        console.error("Error getting dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOtherDashboards = async (req, res) => {
    try {
        const user_id = req.params.id;
        if (!user_id) return res.status(400).json({ message: "Invalid Request" });

        // Fetch dashboard IDs where user has access (status: true)
        const dashboardAccessList = await DashboardAccess.find({ user_id, status: true }).select('dashboard_id');

        if (!dashboardAccessList.length) return res.status(200).json([]); // Return empty array if no access

        // Extract dashboard IDs
        const dashboardIds = dashboardAccessList.map(access => access.dashboard_id);

        // Fetch dashboards using the extracted IDs
        const dashboards = await Dashboard.find({ dashboard_id: { $in: dashboardIds } });

        return res.status(200).json(dashboards);
    } catch (error) {
        console.error("Error getting dashboards:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getInvitations = async (req, res) => {
    try {
        console.log(req.params);
        const user_id = req.params.id;
        if (!user_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        // Fetch all invitations for the user
        const dashboardInvitationList = await DashboardAccess.find({ user_id, status: false });

        console.log("Invitations:", dashboardInvitationList);

        if (dashboardInvitationList.length === 0) {
            return res.status(200).json([]); // Return empty array if no invitations
        }

        // Fetch dashboard details for each invitation
        const invitationsWithDetails = await Promise.all(dashboardInvitationList.map(async (invitation) => {
            const dashboard = await Dashboard.findOne({ dashboard_id: invitation.dashboard_id });

            return {
                ...invitation.toObject(), // Convert Mongoose document to plain object
                dashboardDetails: dashboard || null, // Attach dashboard details (or null if not found)
            };
        }));

        console.log("Invitations with dashboard details:", invitationsWithDetails);
        return res.status(200).json(invitationsWithDetails);
    } catch (error) {
        console.error("Error getting invitations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const acceptInvitation = async (req, res) => {
    try {
        console.log(req.params);
        const dashboard_access_id = req.params.id;
        if (!dashboard_access_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        // Assuming `DashboardAccess` is your Mongoose model
        const updatedInvitation = await DashboardAccess.findOneAndUpdate(
            {dashboard_access_id},
            { status: true }, // ✅ Set status to true
            { new: true } // Return updated document
        );

        if (!updatedInvitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }

        res.status(200).json({ message: "Invitation accepted successfully", updatedInvitation });

    } catch (error) {
        console.error("Error updating invitation status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const rejectInvitation = async (req, res) => {
    try {
        console.log(req.params);
        const dashboard_access_id = req.params.id;
        if (!dashboard_access_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        const rejectedInvitation = await DashboardAccess.findOneAndDelete({dashboard_access_id});

        if (!rejectedInvitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }

        res.status(200).json({ message: "Invitation rejected" });

    } catch (error) {
        console.error("Error rejecting invitation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDashboardInfoForTaskchat = async (req, res) => {
    try {
        console.log(req.params);
        const dashboard_id = req.params.id;

        if (!dashboard_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        // Get dashboard details
        const dashboard = await Dashboard.findOne({ dashboard_id });

        if (!dashboard) {
            return res.status(404).json({ message: "Dashboard not found" });
        }

        // Get members and extract user_id
        const members = await DashboardAccess.find({ dashboard_id, status: true });
        const memberIds = members.map(member => member.user_id);

        return res.status(200).json({
            message: "Dashboard data retrieved successfully",
            dashboard,
            members: memberIds
        });

    } catch (error) {
        console.error("Error fetching dashboard info:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addNewMember = async (req, res) => {
  try {
    console.log(req.body);
    const { dashboard_id, user_id, admin_id} = req.body;

    if (!dashboard_id || !user_id || !admin_id ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const dashboard = await Dashboard.findOne({dashboard_id});
    if (!dashboard) {
        return res.status(404).json({ message: "dashboard not found" });
    }

    // Create new DashboardAccess object
    const newDashboardAccess = new DashboardAccess({
        dashboard_id: dashboard_id,
        user_id: user_id,
        admin_id: admin_id
    });        

    // Save to the database
    await newDashboardAccess.save();

    res.status(201).json({ message: "request sent successfully!" });
    } catch (error) {
        console.error("Error adding member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    };



module.exports = { createNewDashboard, getMyDashboards, getOtherDashboards, getInvitations, acceptInvitation, rejectInvitation, getDashboardInfoForTaskchat, addNewMember };