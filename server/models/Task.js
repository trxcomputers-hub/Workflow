const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assignedTo: {
        type: String, // Email of the assignee
        required: true
    },
    // Optionally store helper reference
    assignedToId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    priority: {
        type: String,
        enum: ['Low', 'Med', 'High'],
        default: 'Med'
    },
    status: {
        type: String,
        enum: ['Pending', 'Ongoing', 'Completed'],
        default: 'Pending'
    },
    deadlineDate: {
        type: Date,
        required: true
    },
    deadlineTime: {
        type: String // e.g., "14:30"
    },
    proofImageURL: {
        type: String // URL or Path
    },
    createdBy: {
        // Admin who created the task (Email or ID)
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
