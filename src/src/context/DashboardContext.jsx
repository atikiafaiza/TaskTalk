import React, { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [dashboards, setDashboards] = useState([]);
  const [currentUser] = useState({
    id: '1',
    name: 'Current User',
    email: 'user@example.com'
  });

  const createDashboard = (dashboard) => {
    setDashboards([...dashboards, {
      ...dashboard,
      id: Date.now().toString(),
      creator: currentUser,
      members: [currentUser],
      tasks: [],
      messages: []
    }]);
  };

  const addTask = (dashboardId, task) => {
    setDashboards(dashboards.map(dashboard => {
      if (dashboard.id === dashboardId) {
        return {
          ...dashboard,
          tasks: [...dashboard.tasks, { ...task, id: Date.now().toString(), status: 'pending' }]
        };
      }
      return dashboard;
    }));
  };

  const toggleTaskStatus = (dashboardId, taskId) => {
    setDashboards(dashboards.map(dashboard => {
      if (dashboard.id === dashboardId) {
        return {
          ...dashboard,
          tasks: dashboard.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, status: task.status === 'pending' ? 'completed' : 'pending' };
            }
            return task;
          })
        };
      }
      return dashboard;
    }));
  };

  const deleteTask = (dashboardId, taskId) => {
    setDashboards(dashboards.map(dashboard => {
      if (dashboard.id === dashboardId) {
        return {
          ...dashboard,
          tasks: dashboard.tasks.filter(task => task.id !== taskId)
        };
      }
      return dashboard;
    }));
  };

  const addMember = (dashboardId, member) => {
    setDashboards(dashboards.map(dashboard => {
      if (dashboard.id === dashboardId) {
        return {
          ...dashboard,
          members: [...dashboard.members, member]
        };
      }
      return dashboard;
    }));
  };

  const addMessage = (dashboardId, message) => {
    setDashboards(dashboards.map(dashboard => {
      if (dashboard.id === dashboardId) {
        return {
          ...dashboard,
          messages: [...dashboard.messages, {
            id: Date.now().toString(),
            sender: currentUser,
            content: message,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return dashboard;
    }));
  };

  return (
    <DashboardContext.Provider value={{
      dashboards,
      currentUser,
      createDashboard,
      addTask,
      toggleTaskStatus,
      deleteTask,
      addMember,
      addMessage
    }}>
      {children}
    </DashboardContext.Provider>
  );
};