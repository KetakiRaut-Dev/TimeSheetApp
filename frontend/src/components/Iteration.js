import React, { useState, useEffect } from "react";
import axios from "axios";

function Iteration() {
  const [iterations, setIterations] = useState([]);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editingId, setEditingId] = useState(null); // 🔥 for update
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIterations();
  }, []);

  // ✅ FETCH
  const fetchIterations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/iterations");
      setIterations(res.data.data || []);
    } catch (err) {
      console.log(err);
      setIterations([]);
    }
    setLoading(false);
  };

  // ✅ ADD / UPDATE
  const handleSubmit = async () => {
    if (!name || !start || !end) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editingId) {
        // ✏️ UPDATE
        await axios.put(
          `http://localhost:5000/iterations/${editingId}`,
          {
            name,
            start_date: start,
            end_date: end
          }
        );
        alert("Updated ✅");
      } else {
        // ➕ ADD
        await axios.post("http://localhost:5000/iterations", {
          name,
          start_date: start,
          end_date: end
        });
        alert("Added ✅");
      }

      // reset
      setName("");
      setStart("");
      setEnd("");
      setEditingId(null);

      fetchIterations();
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 DELETE
  const deleteIteration = async (id) => {
    if (!window.confirm("Delete this iteration?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/iterations/${id}`
      );
      fetchIterations();
    } catch (err) {
      console.log(err);
    }
  };

  // ✏️ EDIT
  const editIteration = (it) => {
    setName(it.name);
    setStart(it.start_date);
    setEnd(it.end_date);
    setEditingId(it.id);
  };

  // 📅 DATE FORMAT
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return "-";
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2>📅 Iterations</h2>

        {/* FORM */}
        <div style={styles.formRow}>
          <input
            style={styles.input}
            placeholder="Iteration Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            style={styles.input}
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <button style={styles.button} onClick={handleSubmit}>
            {editingId ? "✏️ Update" : "➕ Add"}
          </button>
        </div>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Iteration</th>
                <th style={styles.th}>Start</th>
                <th style={styles.th}>End</th>
                <th style={styles.th}>Days</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {(iterations || []).length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.empty}>
                    No data
                  </td>
                </tr>
              ) : (
                (iterations || []).map((it) => {
                  const startDate = new Date(it.start_date);
                  const endDate = new Date(it.end_date);

                  const duration =
                    !isNaN(startDate) && !isNaN(endDate)
                      ? Math.ceil(
                          (endDate - startDate) /
                            (1000 * 60 * 60 * 24)
                        ) + 1
                      : "-";

                  return (
                    <tr key={it.id}>
                      <td style={styles.td}>{it.name}</td>
                      <td style={styles.td}>
                        {formatDate(it.start_date)}
                      </td>
                      <td style={styles.td}>
                        {formatDate(it.end_date)}
                      </td>
                      <td style={styles.td}>{duration}</td>

                      <td style={styles.td}>
                        <button
                          style={styles.editBtn}
                          onClick={() => editIteration(it)}
                        >
                          ✏️
                        </button>

                        <button
                          style={styles.deleteBtn}
                          onClick={() => deleteIteration(it.id)}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Iteration;

//
// 🎨 STYLES
//
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
    border: "1px solid #ccc"
  },

  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
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

  editBtn: {
    marginRight: "5px",
    background: "#ffc107",
    border: "none",
    padding: "5px 8px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 8px",
    cursor: "pointer"
  },

  empty: {
    textAlign: "center",
    padding: "20px"
  }
};