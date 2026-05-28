const express = require("express");
const router = express.Router();
const db = require("../db");

// 👉 Create Iteration
router.post("/", (req, res) => {
  const { name, start_date, end_date } = req.body;

  // ✅ Validation
  if (!name || !start_date || !end_date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const sql =
    "INSERT INTO iterations (name, start_date, end_date) VALUES (?, ?, ?)";

  db.query(sql, [name, start_date, end_date], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(201).json({
      success: true,
      message: "Iteration Created ✅",
      id: result.insertId
    });
  });
});

// 👉 Get All Iterations
router.get("/", (req, res) => {
  const sql = "SELECT * FROM iterations ORDER BY id DESC";

  db.query(sql, (err, result) => {
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

// 👉 Delete Iteration (BONUS 🔥)
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM iterations WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Delete failed"
      });
    }

    res.json({
      success: true,
      message: "Iteration Deleted 🗑️"
    });
  });
});

module.exports = router;