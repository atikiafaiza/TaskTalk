const { tr } = require("date-fns/locale");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID v4

// relation between dashboard and user
const dashboardAccessSchema = mongoose.Schema({
    dashboard_access_id: {
        type: String,
        default: uuidv4, // Auto-generate token_id using UUID v4
        required: true
    },
    dashboard_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    request_time: {
        type: Date,
        default: Date.now
    },
    admin_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("DashboardAccess", dashboardAccessSchema);