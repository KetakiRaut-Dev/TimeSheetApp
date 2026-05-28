import React, { useState, useEffect } from "react";
import axios from "axios";

function Story() {
  const [iterations, setIterations] = useState([]);
  const [iterationId, setIterationId] = useState("");
  const [stories, setStories] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // 👉 Fetch iterations
  useEffect(() => {
    fetchIterations();
  }, []);

  const fetchIterations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/iterations");

      // ✅ FIX
      setIterations(res.data.data || []);
    } catch (err) {
      console.error(err);
      setIterations([]);
    }
  };

  // 👉 Fetch stories
  const fetchStories = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/stories/${id}`
      );

      // ✅ FIX
      setStories(res.data.data || []);
    } catch (err) {
      console.error(err);
      setStories([]);
    }
  };

  // 👉 Handle dropdown
  const handleIterationChange = (e) => {
    const id = e.target.value;
    setIterationId(id);
    fetchStories(id);
  };

  // 👉 Add story
  const addStory = async () => {
    if (!title || !desc || !iterationId) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/stories", {
        title,
        description: desc,
        iteration_id: iterationId
      });

      setTitle("");
      setDesc("");

      fetchStories(iterationId);
    } catch (err) {
      console.error(err);
      alert("Error adding story");
    }
  };

  return (
    <div>
      <h2>📘 User Stories</h2>

      {/* 🔥 ITERATION DROPDOWN */}
      <select value={iterationId} onChange={handleIterationChange}>
        <option value="">Select Iteration</option>
        {(iterations || []).map((it) => (
          <option key={it.id} value={it.id}>
            {it.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* INPUTS */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button onClick={addStory}>➕ Add Story</button>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {(stories || []).length === 0 ? (
            <tr>
              <td colSpan="2">No stories found</td>
            </tr>
          ) : (
            (stories || []).map((s) => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.description}</td>
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
    minWidth: "150px"
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
  }
};

export default Story;