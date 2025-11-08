// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDateTime: { type: Date },
    dashboard_id: {type:String, required: true},
    // teamMembers: [
    //     {
    //       memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    //       role: { type: String, enum: ['member', 'admin'], default: 'member' }
    //     }
    //   ],
    //   attachments: [{ type: String }],
      createdDate: { type: Date, default: Date.now }
    });
module.exports = mongoose.model('Task', TaskSchema);