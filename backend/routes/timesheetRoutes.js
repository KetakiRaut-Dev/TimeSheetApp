const express = require("express");
const router = express.Router();
const db = require("../db");

// 👉 Add / Update Entry (SMART SAVE 🔥)
router.post("/", (req, res) => {
  const { task_id, date, hours_worked } = req.body;

  // ✅ Validation
  if (!task_id || !date || !hours_worked) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  // 🔥 Check if entry already exists (same task + date)
  const checkSql =
    "SELECT * FROM timesheets WHERE task_id = ? AND date = ?";

  db.query(checkSql, [task_id, date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    if (result.length > 0) {
      // 👉 UPDATE
      const updateSql =
        "UPDATE timesheets SET hours_worked = ? WHERE task_id = ? AND date = ?";

      db.query(updateSql, [hours_worked, task_id, date], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Update failed"
          });
        }

        return res.json({
          success: true,
          message: "Timesheet Updated 🔄"
        });
      });
    } else {
      // 👉 INSERT
      const insertSql =
        "INSERT INTO timesheets (task_id, date, hours_worked) VALUES (?, ?, ?)";

      db.query(insertSql, [task_id, date, hours_worked], (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Insert failed"
          });
        }

        res.status(201).json({
          success: true,
          message: "Timesheet Entry Added ✅",
          id: result.insertId
        });
      });
    }
  });
});

// 👉 Get All Entries (JOIN 🔥)
router.get("/", (req, res) => {
  const sql = `
    SELECT ts.*, t.title 
    FROM timesheets ts
    JOIN tasks t ON ts.task_id = t.id
    ORDER BY ts.date DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
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

// 👉 Delete Entry (BONUS 🔥)
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM timesheets WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Delete failed"
      });
    }

    res.json({
      success: true,
      message: "Entry Deleted 🗑️"
    });
  });
});

module.exports = router;