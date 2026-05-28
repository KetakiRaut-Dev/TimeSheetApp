import React, { useState, useEffect } from "react";
import axios from "axios";

function Timesheet() {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    fetchTasks();
    fetchEntries();
  }, []);

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks/1");

      const list = res.data.data || res.data; // FIX

      setTasks(Array.isArray(list) ? list : []);
    } catch (err) {
      console.log(err);
      setTasks([]);
    }
  };

  // ✅ FETCH TIMESHEET
  const fetchEntries = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/timesheet");

      const list = res.data.data || res.data; // FIX

      const formatted = {};

      list.forEach((e) => {
        const date = new Date(e.date);
        const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;

        if (!formatted[e.task_id]) {
          formatted[e.task_id] = {};
        }

        formatted[e.task_id][dayIndex] =
          Number(formatted[e.task_id][dayIndex] || 0) +
          Number(e.hours_worked);
      });

      setData(formatted);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // ✅ GET DATE FROM WEEK
  const getDateFromDay = (dayIndex) => {
    if (!startDate) return null;

    const base = new Date(startDate);
    base.setDate(base.getDate() + dayIndex);

    return base;
  };

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (taskId, dayIndex, value) => {
    setData((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [dayIndex]: value
      }
    }));
  };

  // ✅ SAVE ENTRY
  const saveEntry = async (taskId, dayIndex) => {
    const hours = data[taskId]?.[dayIndex];
    const dateObj = getDateFromDay(dayIndex);

    if (!hours || !dateObj) return;

    try {
      await axios.post("http://localhost:5000/timesheet", {
        task_id: taskId,
        date: dateObj.toISOString(), // ✅ FIXED
        hours_worked: Number(hours)
      });

      fetchEntries(); // ✅ REFRESH UI
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ WEEKLY TOTAL
  const getWeeklyTotal = () => {
    return Object.values(data).reduce((sum, task) => {
      return (
        sum +
        Object.values(task).reduce((a, b) => a + Number(b || 0), 0)
      );
    }, 0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📊 Timesheet (Rally Style)</h2>

        {/* DATE */}
        <input
          style={styles.input}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <h3>Week Starting: {startDate || "Select date"}</h3>

        {/* EMPTY */}
        {tasks.length === 0 && !loading && <p>No tasks found</p>}

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Task</th>
                {days.map((d) => (
                  <th key={d} style={styles.th}>{d}</th>
                ))}
                <th style={styles.th}>Total</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t) => {
                let total = 0;

                return (
                  <tr key={t.id}>
                    <td style={styles.td}>{t.title}</td>

                    {days.map((d, i) => {
                      const val = data[t.id]?.[i] || "";
                      total += Number(val) || 0;

                      return (
                        <td
                          key={i}
                          style={{
                            ...styles.td,
                            backgroundColor: i >= 5 ? "#f0f0f0" : "white"
                          }}
                        >
                          <input
                            style={styles.cellInput}
                            value={val}
                            disabled={!startDate}
                            onChange={(e) =>
                              handleChange(t.id, i, e.target.value)
                            }
                            onBlur={() => {
                              if (data[t.id]?.[i]) {
                                saveEntry(t.id, i);
                              }
                            }}
                          />
                        </td>
                      );
                    })}

                    <td style={styles.td}>
                      <b>{total}</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* TOTAL */}
        <h3>Weekly Total: {getWeeklyTotal()} hrs</h3>
      </div>
    </div>
  );
}

// ✅ STYLES
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
  input: {
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
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
  cellInput: {
    width: "50px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px"
  }
};

export default Timesheet;