import React, { useState } from "react";

function AwsExtraction() {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]); // Log selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setOcrResult(null);

    if (!file) {
      setError("Please upload an image file.");
      console.log("No file uploaded"); // Log if no file is uploaded
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure key matches Flask's expected 'file'

    try {
      // Fetch API URL from .env
      const apiUrl = process.env.REACT_APP_TEXTRACT_URL;
      console.log("API URL:", apiUrl); // Log API URL for debugging

      const response = await fetch(`${apiUrl}/upload-textract`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError("Failed to communicate with the server.");
        console.error("Server returned an error:", response.statusText);
        return;
      }

      const result = await response.json();
      console.log("Response from server:", result); // Log the server response

      if (response.ok) {
        setOcrResult({ ocr_text: result.detected_text.join(", ") });
      } else {
        setError(result.error || "An unknown error occurred.");
        console.log("Error from server:", result.error); // Log any errors returned from the server
      }
    } catch (err) {
      setError("An error occurred while processing the request.");
      console.error("Error occurred:", err); // Log error if there's an exception
    }
  };

  // Inline Styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      color: "#333",
      fontSize: "24px",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "12px",
      backgroundColor: "#004D91",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#003c74",
    },
    error: {
      color: "red",
      textAlign: "center",
    },
    result: {
      marginTop: "20px",
      backgroundColor: "#f1f1f1",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AWS Extraction</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Extract Text
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {ocrResult && (
        <div style={styles.result}>
          <h3>AWS Extracted Result</h3>
          <p>Extracted Text: {ocrResult.ocr_text}</p>
        </div>
      )}
    </div>
  );
}

export default AwsExtraction;
