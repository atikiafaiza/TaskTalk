const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID v4

const taskSchema = mongoose.Schema({
    task_id: {
        type: String,
        default: uuidv4, // Auto-generate token_id using UUID v4
        required: true
    },
    task_name: {
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
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dashboard_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);