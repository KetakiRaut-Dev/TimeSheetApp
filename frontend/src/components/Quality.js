import React from "react";

function Quality() {
  const data = [
    { title: "Total Test Cases", value: 120 },
    { title: "Passed", value: 95 },
    { title: "Failed", value: 25 },
    { title: "Bugs Reported", value: 18 },
    { title: "Bugs Resolved", value: 12 },
    { title: "Code Coverage", value: "82%" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Quality Dashboard</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px"
      }}>
        {data.map((item, index) => (
          <div key={index} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h3>{item.title}</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "20px",
        background: "#fff",
        padding: "15px",
        borderRadius: "10px"
      }}>
        <h3>Overall Status</h3>
        <p style={{ color: "green", fontWeight: "bold" }}>
          ✔ Stable Build
        </p>
      </div>
    </div>
  );
}

export default Quality;