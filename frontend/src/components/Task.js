import React, { useState, useEffect } from "react";
import axios from "axios";

function Task() {
  const [stories, setStories] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [hours, setHours] = useState("");

  // 👉 Fetch stories (default iteration = 1 for simplicity)
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/stories/1");

      // ✅ FIXED
      setStories(res.data.data || []);
    } catch (err) {
      console.error(err);
      setStories([]);
    }
  };

  // 👉 Fetch tasks based on selected story
  const fetchTasks = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${id}`);

      // ✅ FIXED
      setTasks(res.data.data || []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  // 👉 When story selected
  const handleStoryChange = (e) => {
    const id = e.target.value;
    setStoryId(id);
    fetchTasks(id);
  };

  // 👉 Add task
  const addTask = async () => {
    if (!title || !status || !hours || !storyId) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/tasks", {
        title,
        status,
        estimated_hours: hours,
        story_id: storyId
      });

      setTitle("");
      setStatus("");
      setHours("");

      fetchTasks(storyId);
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    }
  };

  return (
    <div>
      <h2>🛠 Tasks</h2>

      {/* 🔥 STORY DROPDOWN */}
      <select value={storyId} onChange={handleStoryChange}>
        <option value="">Select Story</option>
        {(stories || []).map((s) => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))}
      </select>

      <br /><br />

      {/* INPUTS */}
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <input
        placeholder="Estimated Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <button onClick={addTask}>➕ Add Task</button>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>
          {(tasks || []).length === 0 ? (
            <tr>
              <td colSpan="3">No tasks found</td>
            </tr>
          ) : (
            (tasks || []).map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.status}</td>
                <td>{t.estimated_hours}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}




const styles = {
  container: {
    background: "#f4f6f8",
    padding: "20px",
    minHeight: "100vh"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
  },

  formRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minWidth: "140px"
  },

  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  button2: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#1f2d3d",
    color: "#fff",
    padding: "10px",
    border: "1px solid #ddd"
  },

  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  },

  empty: {
    textAlign: "center",
    padding: "20px",
    color: "#777"
  },

  // 🔥 Status Styles
  done: {
    color: "green",
    fontWeight: "bold"
  },

  progress: {
    color: "orange",
    fontWeight: "bold"
  },

  todo: {
    color: "gray",
    fontWeight: "bold"
  }
};
export default Task;