import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export const DashboardCard = ({ dashboard }) => {
  const navigate = useNavigate();
  
  if (!dashboard) return null;

  const date = new Date(dashboard.creation_date);
  const formatted = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
  }).replace(",", ""); 

  return (
    <div
      className="p-4 bg-orange-500 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/taskchat/${dashboard.dashboard_id}`)}
    >
      <div className="flex items-center space-x-4">
        <Calendar size={32} />
        <div>
          <h3 className="text-lg font-semibold">{dashboard.dashboard_name}</h3>
          <p className="text-white">{dashboard.description}</p>
          <p className="text-sm text-gray-700">📅 Created on: {formatted}</p>
        </div>
      </div>
    </div>
  );
};
