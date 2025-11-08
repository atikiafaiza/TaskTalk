// routes/taskRoutes.js
const express = require('express');
const router = express.Router();

const { createNewTask, getTasksForTaskchat, updateStatus } = require("../controllers/task.controller");

router.post("/createNewTask", createNewTask);
router.get("/getTasksForTaskchat/:id", getTasksForTaskchat);
router.post("/updateStatus", updateStatus);





// // Create Task
// // Create Task
// router.post('/', async (req, res) => {
//     try {
//         const newTask = new Task(req.body);
//         await newTask.save();
        
//         // Log the added task in the terminal
//         console.log("New Task Added:", newTask);
        
//         res.status(201).json(newTask);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// // Get All Tasks
// router.get('/', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Middleware to Check Admin (Simple Check, No Auth)
// const isAdmin = (req, res, next) => {
//     if (req.headers.admin === 'true') {
//         next();
//     } else {
//         res.status(403).json({ message: 'Access denied' });
//     }
// };

// // Update Task (Only Admin)
// router.put('/:id', isAdmin, async (req, res) => {
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedTask);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete Task (Only Admin)
// router.delete('/:id', isAdmin, async (req, res) => {
//     try {
//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Task deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
