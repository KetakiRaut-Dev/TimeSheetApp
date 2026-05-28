const express = require("express");
const router = express.Router();
const db = require("../db");

// 👉 Create Task
router.post("/", (req, res) => {
  const { title, status, estimated_hours, story_id } = req.body;

  // ✅ Validation
  if (!title || !status || !estimated_hours || !story_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const sql =
    "INSERT INTO tasks (title, status, estimated_hours, story_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, status, estimated_hours, story_id], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(201).json({
      success: true,
      message: "Task Created ✅",
      id: result.insertId
    });
  });
});

// 👉 Get Tasks by Story
router.get("/:storyId", (req, res) => {
  const { storyId } = req.params;

  const sql =
    "SELECT * FROM tasks WHERE story_id = ? ORDER BY id DESC";

  db.query(sql, [storyId], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
});

// 👉 Update Task Status (BONUS 🔥)
router.put("/:id", (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required"
    });
  }

  const sql = "UPDATE tasks SET status = ? WHERE id = ?";

  db.query(sql, [status, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Update failed"
      });
    }

    res.json({
      success: true,
      message: "Task Updated ✅"
    });
  });
});

// 👉 Delete Task (BONUS 🔥)
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM tasks WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Delete failed"
      });
    }

    res.json({
      success: true,
      message: "Task Deleted 🗑️"
    });
  });
});

module.exports = router;