import express from "express";
import { Task } from "./taskSchema.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// All routes here are protected
router.use(protect);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task by id
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ task });
  } catch (error) {
    console.error("Get task error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});





// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;

    // Allowed fields to update
    const allowedUpdates = ["title", "description", "completed"];

    // Filter only allowed fields
    const filteredUpdates = {};
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined && updates[key] !== "") {
        filteredUpdates[key] = updates[key];
      }
    }

    // Find task belonging to logged-in user
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Apply allowed updates only
    Object.assign(task, filteredUpdates);

    const updatedTask = await task.save();

    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Delete task error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
