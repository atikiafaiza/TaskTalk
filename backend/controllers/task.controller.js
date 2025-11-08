const Task = require('../models/task.model');
const Dashboard = require('../models/dashboard.model');

exports.createNewTask = async (req, res) => {
  try {
    console.log(req.body);
    const { dashboard_id, title, description, dueDateTime, status} = req.body;

    if (!dashboard_id || !title || !description || !dueDateTime || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const dashboard = await Dashboard.findOne({dashboard_id});
    if (!dashboard) {
        return res.status(404).json({ message: "dashboard not found" });
    }

    // Create new Dashboard object
    const newTask = new Task({
        task_name: title,
        description: description,
        due_date: dueDateTime,
        status: status,
        dashboard_id: dashboard_id
    });        

    // Save to the database
    await newTask.save();

    res.status(201).json({ message: "Task created successfully!" });
  } catch (error) {
      console.error("Error creating Task:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTasksForTaskchat = async (req, res) => {
    try {
        console.log(req.params);
        const dashboard_id = req.params.id;
        if (!dashboard_id) {
            return res.status(400).json({ message: "Invalid Request" });
        }
        const tasks = await Task.find({dashboard_id});
        console.log(tasks);
         return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error getting tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateStatus = async (req, res) => {
  try {
    const task = await Task.findOne(req.params.task_id);
    if (task) {
      task.status = req.body.status || task.status;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
};
