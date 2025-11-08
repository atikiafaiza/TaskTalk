const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID v4

const resourceSchema = mongoose.Schema({
    resource_id: {
        type: String,
        default: uuidv4, // Auto-generate token_id using UUID v4
        required: true
    },
    content: {
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
    },
    task_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Resource", resourceSchema);