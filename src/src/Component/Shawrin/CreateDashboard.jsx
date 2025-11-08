import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserName = localStorage.getItem("currentUserName");

    if (!currentUserName) {
      alert("You have to log in.");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const currentUserName = localStorage.getItem("currentUserName");

      const requestData = {
        ...formData,
        currentUserName: currentUserName || "Guest",
      };

      const response = await axios.post(
        "http://localhost:4000/api/dashboards/createNewDashboard",
        requestData
      );

      console.log("Dashboard created:", response.data);
      setMessage("Dashboard created successfully!");
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating dashboard:", error);
      setMessage("Failed to create dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-orange-500 rounded-lg shadow p-6 w-1/2">
        <h2 className="text-2xl font-bold text-white mb-6">Create Your Dashboard</h2>

        {message && <p className="text-white bg-black p-2 rounded mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Dashboard Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 p-2 block w-full rounded-md border-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter dashboard name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter dashboard description"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`h-min p-2 rounded-md shadow-sm text-sm text-white ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating..." : "Create Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};
