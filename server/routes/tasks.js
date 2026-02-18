const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// @route   POST api/tasks
// @desc    Create a task (Admin/Manager only, or Workers for self?) -> "Aluth task ekak thamantama add karaganimata haki weema" (Workers can add for themselves)
//          "Hama user kenektama tasks assign kirima" (Admin)
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let { title, description, assignedTo, priority, deadlineDate, deadlineTime } = req.body;

        // If worker creates a task, it's assigned to themselves
        if (user.role === 'Worker') {
            assignedTo = user.email;
        }

        const newTask = new Task({
            title,
            description,
            assignedTo, // Email
            priority,
            deadlineDate,
            deadlineTime,
            createdBy: user.email,
            status: 'Pending'
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/tasks
// @desc    Get all tasks (Admin) or My Tasks (Worker)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let tasks;
        if (user.role === 'Admin') {
            // Admin sees all. Optional filters: ?worker=email&status=Pending
            const { worker, status } = req.query;
            let query = {};
            if (worker) query.assignedTo = worker;
            if (status) query.status = status;

            tasks = await Task.find(query).sort({ deadlineDate: 1 });
        } else {
            // Worker sees only their tasks
            tasks = await Task.find({ assignedTo: user.email }).sort({ deadlineDate: 1 });
        }

        res.json(tasks);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/tasks/:id/status
// @desc    Update status (Pending -> Ongoing -> Completed)
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Check authorization (Admin or Assignee)
        const user = await User.findById(req.user.id);
        if (user.role !== 'Admin' && task.assignedTo !== user.email) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        task.status = status;
        await task.save();
        res.json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/tasks/:id/proof
// @desc    Upload proof of work
// @access  Private
router.post('/:id/proof', [auth, upload.single('proof')], async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        const user = await User.findById(req.user.id);
        if (user.role !== 'Admin' && task.assignedTo !== user.email) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Generate URL (for local dev, simple path) 
        // In production, upload to S3/Cloudinary and save URL
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (fileUrl) {
            task.proofImageURL = fileUrl;
            task.status = 'Completed'; // Auto-complete on proof upload? Or user sets explicitly. 
            // "Task eka iwara karama 'Proof of Work' (Image/File) upload kirima" implies upload happens at completion.
            await task.save();
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
