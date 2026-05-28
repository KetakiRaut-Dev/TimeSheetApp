const express = require("express");
const cors = require("cors");
const db = require("./db"); // ✅ important

const app = express();

app.use(cors());
app.use(express.json());
app.use("/iterations", require("./routes/iterationRoutes"));
app.use("/stories", require("./routes/storyRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/timesheet", require("./routes/timesheetRoutes"));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});