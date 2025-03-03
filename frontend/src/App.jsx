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
        return <p>Select a process to begin.</p>;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Image Analysis</h1>
      
      {/* Buttons to select different processes */}
      <div>
        <button onClick={() => setSelectedProcess("awsExtraction")}>
          AWS Text Extraction
        </button>
      </div>

      {/* Render the selected process */}
      <div style={{ marginTop: "20px" }}>{renderProcessComponent()}</div>
    </div>
  );
}

export default App;
