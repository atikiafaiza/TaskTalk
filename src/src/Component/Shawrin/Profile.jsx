import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Check, X } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  const formattedTime = (dateString) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUserName = localStorage.getItem("currentUserName");
  
      if (!currentUserName) {
        setError("No user found in local storage.");
        setLoading(false);
        alert("You are not signed in");
        navigate("/");
        return;
      }
  
      try {
        const [userRes, invitationsRes] = await Promise.all([
          axios.get(`http://localhost:4000/api/users/${currentUserName}`),
          axios.get(`http://localhost:4000/api/dashboards/getInvitations/${currentUserName}`)
        ]);
  
        if (userRes.status === 200) {
          setUser(userRes.data);
        } else {
          throw new Error("User not found");
        }

        // sort by `creation_date` in descending order (most recent first)
        const sortedInvitations = invitationsRes.data.sort(
          (a, b) => new Date(b.request_time) - new Date(a.request_time)
        );
  
        setInvitations(sortedInvitations || []);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);
  

  const handleAccept = async (dashboard_access_id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/dashboards/acceptInvitation/${dashboard_access_id}`
      );

      if (response.status === 200) {
        alert("Invitation accepted successfully!");
        setInvitations((prev) =>
          prev.filter((inv) => inv.dashboard_access_id !== dashboard_access_id)
        );
      }
    } catch (error) {
      alert("Failed to accept invitation.");
    }
  };

  const handleReject = async (dashboard_access_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/dashboards/rejectInvitation/${dashboard_access_id}`
      );

      if (response.status === 200) {
        alert("Invitation rejected.");
        setInvitations((prev) =>
          prev.filter((inv) => inv.dashboard_access_id !== dashboard_access_id)
        );
      }
    } catch (error) {
      alert("Failed to reject invitation.");
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info Section */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-400">@{user.user_name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="text-blue-500" size={20} />
                  <span>{user.mail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-blue-500" size={20} />
                  <span>{user.contact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invitations Section */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6">Pending Invitations</h2>
          <div className="space-y-4">
            {invitations.length > 0 ? (
              invitations.map((invitation) => (
                <div
                  key={invitation.dashboard_access_id}
                  className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{invitation.admin_id}</h3>
                    <p className="text-gray-500">{invitation.dashboardDetails.dashboard_name}</p>
                    <p className="text-gray-400">{invitation.dashboardDetails.description}</p>
                    <p className="text-sm text-gray-500">{formattedTime(invitation.request_time)}</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      className="flex-1 md:flex-initial bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      onClick={() => handleAccept(invitation.dashboard_access_id)}
                    >
                      <Check size={16} />
                      Accept
                    </button>
                    <button
                      className="flex-1 md:flex-initial bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      onClick={() => handleReject(invitation.dashboard_access_id)}
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No pending invitations</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
