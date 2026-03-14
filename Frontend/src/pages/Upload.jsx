import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [area, setArea] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  // validate file and create preview
  const handleFileChange = (e) => {
    setError("");
    setSuccessMsg("");
    const f = e.target.files[0];
    if (!f) return;

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(f.type)) {
      setError("Only PNG/JPEG/JPG/WEBP images allowed");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File too large. Max 5MB allowed");
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!area.trim()) {
      setError("Area name is required");
      return;
    }
    if (!file) {
      setError("Please choose an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("area", area);
    formData.append("image", file);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post(
        "http://localhost:4000/users/upload", // backend route (example)
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // include cookies if you use auth
          onUploadProgress: (progressEvent) => {
            const p = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(p);
          },
        }
      );

      setSuccessMsg("Upload successful");
      setArea("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Upload failed. Check server or CORS configuration."
      );
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Image & Area</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <label className="block mb-2 font-medium">Area Name</label>
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full border-gray-300 border px-3 py-2 rounded mb-4"
          placeholder="Enter area name (e.g., Sector 12)"
        />

        <label className="block mb-2 font-medium">Choose Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {preview && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={preview}
              alt="preview"
              className="w-full max-h-64 object-contain rounded"
            />
          </div>
        )}

        {uploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                style={{ width: `${progress}%` }}
                className="h-3 rounded bg-green-500 transition-all"
              />
            </div>
            <p className="text-sm mt-1">{progress}%</p>
          </div>
        )}

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
