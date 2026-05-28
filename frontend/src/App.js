import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Iteration from "./components/Iteration";
import Story from "./components/Story";
import Task from "./components/Task";
import Timesheet from "./components/Timesheet";
import Quality from "./components/Quality"
import Reports from "./components/Reports";

function App() {
  return (
    <Router>
      <div>

        {/* 🔥 TOP NAVBAR */}
        <div style={styles.navbar}>
          <h2 style={styles.logo}>Dev Team</h2>

          <div style={styles.navLinks}>
            <NavLink to="/" style={styles.topLink}>Home</NavLink>
            <NavLink to="/plan" style={styles.topLink}>Plan</NavLink>
            <NavLink to="/track" style={styles.topLink}>Track</NavLink>
            <NavLink to="/quality" style={styles.topLink}>Quality</NavLink>
            <NavLink to="/reports" style={styles.topLink}>Reports</NavLink>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div style={styles.app}>

          {/* SIDEBAR */}
          <div style={styles.sidebar}>
            <h3 style={{ marginBottom: "10px" }}>Agile Tool</h3>

            <NavLink to="/" style={styles.link}>
              📅 Iterations
            </NavLink>

            <NavLink to="/stories" style={styles.link}>
              📘 Stories
            </NavLink>

            <NavLink to="/tasks" style={styles.link}>
              🛠 Tasks
            </NavLink>

            <NavLink to="/timesheet" style={styles.link}>
              📊 Timesheet
            </NavLink>
          </div>

          {/* CONTENT */}
          <div style={styles.content}>
            <Routes>
              {/* MAIN */}
              <Route path="/" element={<Iteration />} />

              {/* NAVBAR ROUTES */}
              <Route path="/plan" element={<Iteration />} />
              <Route path="/track" element={<Timesheet />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/reports" element={<Reports />} />

              {/* SIDEBAR ROUTES */}
              <Route path="/stories" element={<Story />} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/timesheet" element={<Timesheet />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    background: "#ffffff",
    padding: "12px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  logo: {
    margin: 0,
    color: "#1f2d3d"
  },

  navLinks: {
    display: "flex",
    gap: "25px"
  },

  topLink: {
    textDecoration: "none",
    color: "#444",
    fontWeight: "500"
  },

  app: {
    display: "flex"
  },

  sidebar: {
    width: "230px",
    background: "#1f2d3d",
    color: "#fff",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "15px"
  },

  content: {
    flex: 1,
    padding: "25px",
    background: "#f4f6f8"
  }
};

export default App;