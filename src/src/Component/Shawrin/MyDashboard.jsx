import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DashboardCard } from './DashboardCard';

export const MyDashboard = () => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserName = localStorage.getItem('currentUserName');

    if (!currentUserName) {
      alert("You are not signed in.")
      navigate('/');
      return;
    }

    const fetchDashboards = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/dashboards/getMyDashboards/${currentUserName}`);
        console.log(response.data);

        // sort by `creation_date` in descending order (most recent first)
        const sortedDashboards = response.data.sort(
          (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
        );
        setDashboards(sortedDashboards);
      } catch (err) {
        setError('Failed to fetch dashboards.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [navigate]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Dashboards</h2>

      {dashboards.length === 0 ? (
        <p className="text-gray-300">You haven't created any dashboards yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dashboards.map(dashboard => (
            <DashboardCard key={dashboard.dashboard_id} dashboard={dashboard} />
          ))}
        </div>
      )}
    </div>
  );
};
