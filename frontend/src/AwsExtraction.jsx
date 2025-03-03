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
      const apiUrl = import.meta.env.VITE_API_URL;
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

  return (
    <div>
      <h2>Aws Extraction</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Extract Text</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {ocrResult && (
        <div>
          <h3>AWS Extracted Result</h3>
          <p>Extracted Text: {ocrResult.ocr_text}</p>
        </div>
      )}
    </div>
  );
}

export default AwsExtraction;
