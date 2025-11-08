import { useState } from "react";
import { CreateDashboard } from './CreateDashboard';
import { MyDashboard } from './MyDashboard';
import { Layout } from './Layout';
import { CurrentDashboard } from './CurrentDashboard';
//import "Sstyle.css"
const NavBar = ({ setPage }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="nav-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
        <span>TaskTalk</span>
      </div>
      <div className="nav-links">
        <button onClick={() => setPage("current")}>Current Dashboardzz</button>
        <button onClick={() => setPage("create")}>Create Dashboard</button>
        <button onClick={() => setPage("my")}>My Dashboard</button>
      </div>
    </nav>
  );
};

const DashboardCard = () => {
 
    <div className="dashboard-card">
      <div className="dashboard-header">
        <h3 className="dashboard-title">Dashboard Title</h3>
        <p className="dashboard-description">Dashboard Description</p>
      </div>
      <div className="dashboard-content">
        <div className="tasks-section">
          <h4>Tasks</h4>
          <div className="tasks-list"></div>
          <form className="add-task-form">
            <input type="text" placeholder="Task title" required />
            <input type="text" placeholder="Assignee" required />
            <div className="datetime-inputs">
              <input type="date" required />
              <input type="time" required />
            </div>
            <button type="submit" className="btn-primary">Add Task</button>
          </form>
        </div>
        <div className="members-section">
          <h4>Members</h4>
          <div className="members-list"></div>
          <form className="add-member-form">
            <input type="text" placeholder="Member name" required />
            <input type="email" placeholder="Member email" required />
            <button type="submit" className="btn-primary">Add Member</button>
          </form>
        </div>
        <div className="chat-section">
          <button className="toggle-chat btn-secondary">Show Chat</button>
          <div className="chat-container hidden">
            <div className="chat-messages"></div>
            <form className="chat-form">
              <input type="text" placeholder="Type a message..." required />
              <button type="submit" className="btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
 
};

// const CurrentDashboard = () => (
//   <div>
//     <h2>Connected Dashboards</h2>
//     <div className="dashboard-grid"></div>
//   </div>
// );

// const CreateDashboard = () => (
//   <div>
//     <h2>Create New Dashboard</h2>
//     <form className="dashboard-form">
//       <div className="form-group">
//         <label>Dashboard Name</label>
//         <input type="text" required />
//       </div>
//       <div className="form-group">
//         <label>Description</label>
//         <textarea required></textarea>
//       </div>
//       <button type="submit" className="btn-primary">Create Dashboard</button>
//     </form>
//   </div>
// );



const Dashboard = () => {
  const [page, setPage] = useState("current");
 
  const [activeTab, setActiveTab] = useState('current');

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'current':
  //       return <CurrentDashboard />;
  //     case 'create':
  //       return <CreateDashboard />;
  //     case 'my':
  //       return <MyDashboard />;
  //     default:
  //       return <CurrentDashboard />;
  //   }
  // };
  return (
    <div>
      {/* <NavBar setPage={setPage} /> */}
      <main>
        {/* {page === "current" && <CurrentDashboard />}
        {page === "create" && <CreateDashboard />}
        {page === "my" && <MyDashboard />} */}
        
        {/* <DashboardProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </DashboardProvider> */}
      </main>



      
    </div>


  );
};

export default Dashboard;
