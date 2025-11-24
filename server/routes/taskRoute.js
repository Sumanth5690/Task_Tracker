const express = require("express");
const Task = require("../models/task.js");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { assigneeId, status } = req.query;
    const filter = {};
    if (assigneeId) filter.assigneeId = assigneeId;
    if (status) filter.status = status;

    const tasks = await Task.find(filter).populate("assigneeId", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, assigneeId, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      assigneeId: assigneeId || null,
      status: status || "todo",
      dueDate
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assigneeId",
      "name email"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task", error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
});


module.exports = router;
