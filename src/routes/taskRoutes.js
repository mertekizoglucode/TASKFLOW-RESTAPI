const express = require("express");

const router = express.Router();

const {
    getAllTasks,
    searchTasks,
    getTasksByAssignee,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getCompletedTasks,
    getPendingTasks,
    getTaskSummary
} = require("../controllers/taskController");

const validateTask = require("../middleware/validateTask");

router.get("/search", searchTasks);

router.get("/assignee/:assignee", getTasksByAssignee);

router.get("/reports/completed", getCompletedTasks);

router.get("/reports/pending", getPendingTasks);

router.get("/reports/summary", getTaskSummary);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.post("/", validateTask, createTask);

router.put("/:id", validateTask, updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
