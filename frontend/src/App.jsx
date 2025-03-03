import React, { useState } from "react";
import AwsExtraction from "./AwsExtraction";

function App() {
  const [selectedProcess, setSelectedProcess] = useState(null);

  // Function to render the selected process component
  const renderProcessComponent = () => {
    switch (selectedProcess) {
      case "awsExtraction":
        return <AwsExtraction />;
      default:
        return <p style={styles.instructionText}>Select a process to begin.</p>;
    }
  };

  // Inline styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f9",
      borderRadius: "8px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
      fontSize: "32px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "20px",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#004D91",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#003c74",
    },
    instructionText: {
      textAlign: "center",
      color: "#666",
      fontSize: "18px",
    },
    selectedProcess: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Image Analysis</h1>

      {/* Buttons to select different processes */}
      <div style={styles.buttonContainer}>
        <button
          onClick={() => setSelectedProcess("awsExtraction")}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          AWS Text Extraction
        </button>
      </div>

      {/* Render the selected process */}
      <div style={styles.selectedProcess}>{renderProcessComponent()}</div>
    </div>
  );
}

export default App;
