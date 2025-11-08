const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID v4

const dashboardSchema = mongoose.Schema({
    dashboard_id: {
        type: String,
        default: uuidv4, // Auto-generate token_id using UUID v4
        required: true
    },
    dashboard_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Dashboard", dashboardSchema);