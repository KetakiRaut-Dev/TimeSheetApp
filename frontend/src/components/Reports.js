import React from "react";

function Reports() {
  const reports = [
    { title: "Total Hours Logged", value: "42 hrs" },
    { title: "Most Active Task", value: "Login API" },
    { title: "Tasks Completed", value: 8 },
    { title: "Pending Tasks", value: 3 }
  ];

  return (
    <div style={styles.container}>
      <h2>📈 Reports Dashboard</h2>

      {/* CARDS */}
      <div style={styles.grid}>
        {reports.map((item, index) => (
          <div key={index} style={styles.card}>
            <h3>{item.title}</h3>
            <p style={styles.value}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <h3>Weekly Summary</h3>
        <p>
          This week, the team has shown consistent progress. Most effort was
          focused on backend API development and bug fixing.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f4f6f8",
    minHeight: "100vh"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "20px"
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  value: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1f2d3d"
  },

  summary: {
    marginTop: "30px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }
};

export default Reports;