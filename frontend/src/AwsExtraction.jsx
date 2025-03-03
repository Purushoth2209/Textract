import React, { useState } from "react";
import './index.css'; // Ensure this is correctly imported

function AwsExtraction() {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setOcrResult(null);

    if (!file) {
      setError("Please upload an image file.");
      console.log("No file uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.REACT_APP_TEXTRACT_URL;
      console.log("API URL:", apiUrl);

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
      console.log("Response from server:", result);

      if (response.ok) {
        setOcrResult({ ocr_text: result.detected_text.join(", ") });
      } else {
        setError(result.error || "An unknown error occurred.");
        console.log("Error from server:", result.error);
      }
    } catch (err) {
      setError("An error occurred while processing the request.");
      console.error("Error occurred:", err);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white p-8 bg-pattern">
      <div className="absolute inset-0 bg-fixed bg-cover bg-opacity-40 animate__animated animate__fadeIn animate__delay-1s" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,code')" }}></div>
      
      <div className="relative z-10 max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-gray-800 animate__animated animate__fadeIn animate__delay-1s">
        {/* Title with 3D effect */}
        <h2 className="text-6xl font-semibold mb-6 text-center text-blue-400 transform hover:scale-110 transition-all duration-300 animate__animated animate__fadeIn animate__delay-1s">
          OCR Text Extraction
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="w-full p-6 bg-gray-700 text-white rounded-md cursor-pointer transition-all duration-300 transform hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
              <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i> {/* File upload icon */}
              <span className="text-lg font-medium">Click to Upload Image</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 bg-transparent text-white rounded-md cursor-pointer"
              />
            </label>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s"
          >
            Extract Text
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center animate__animated animate__fadeIn animate__delay-2s">{error}</p>}
        {ocrResult && (
          <section className="mt-6 p-6 bg-gray-700 rounded-md shadow-lg transform transition-all duration-500 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
            <h3 className="text-xl font-medium text-center animate__animated animate__fadeIn animate__delay-1s">AWS Extracted Result</h3>
            <p className="text-lg">{ocrResult.ocr_text}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default AwsExtraction;
