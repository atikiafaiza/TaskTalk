import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './Component/Home/Home';
import Login from './Component/Rashu/Login/Login';
import Registration from './Component/Rashu/Registration/Registration';
import Chatbox from './Component/Rashu/TaskChat/Chatbox';
import { DashboardProvider } from './context/DashboardContext';
import { CurrentDashboard } from './Component/Shawrin/CurrentDashboard';
import { CreateDashboard } from './Component/Shawrin/CreateDashboard';
import { MyDashboard } from './Component/Shawrin/MyDashboard';
import { Layout } from './Component/Shawrin/Layout';
import Profile from './Component/Shawrin/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('current');

  const renderContent = () => {
    switch (activeTab) {
      case 'current':
        return <CurrentDashboard />;
      case 'create':
        return <CreateDashboard />;
      case 'my':
        return <MyDashboard />;
      case 'profile':
        return <Profile />;
      default:
        return <CurrentDashboard />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route 
          path="/dashboard" 
          element={
            <DashboardProvider>
              <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                {renderContent()}
              </Layout>
            </DashboardProvider>
          } 
        />
        <Route path="/taskchat/:dashboard_id" element={<Chatbox />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
