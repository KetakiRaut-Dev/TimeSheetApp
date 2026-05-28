const express = require("express");
const router = express.Router();
const db = require("../db");

// 👉 Create User Story
router.post("/", (req, res) => {
  const { title, description, iteration_id } = req.body;

  // ✅ Validation
  if (!title || !description || !iteration_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const sql =
    "INSERT INTO user_stories (title, description, iteration_id) VALUES (?, ?, ?)";

  db.query(sql, [title, description, iteration_id], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(201).json({
      success: true,
      message: "User Story Created ✅",
      id: result.insertId
    });
  });
});

// 👉 Get Stories by Iteration
router.get("/:iterationId", (req, res) => {
  const { iterationId } = req.params;

  const sql =
    "SELECT * FROM user_stories WHERE iteration_id = ? ORDER BY id DESC";

  db.query(sql, [iterationId], (err, result) => {
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

// 👉 Delete Story (BONUS 🔥)
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM user_stories WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Delete failed"
      });
    }

    res.json({
      success: true,
      message: "Story Deleted 🗑️"
    });
  });
});

module.exports = router;