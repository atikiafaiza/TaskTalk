import React from 'react';
import { LayoutDashboard, PlusCircle, Folders, UserCircle, LogOut, HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Layout = ({ children, activeTab, setActiveTab, handleLogout }) => {
  const navItems = [
    { id: 'current', label: 'Current Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create Dashboard', icon: PlusCircle },
    { id: 'my', label: 'My Dashboard', icon: Folders },
  ];
  const navigate = useNavigate();

  const handleLogOut = (navigate) => {
    // Remove user details from local storage
    localStorage.removeItem("currentUserName");  
    // Redirect to the login page
    navigate("/");
  };

  const navigateToHome = (navigate) => {
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LayoutDashboard className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-white">TaskTalk</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`${
                      activeTab === id
                        ? 'border-indigo-500 text-white'
                        : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Right Side - Profile Icon & Logout */}
            <div className="flex items-center space-x-4">
              {/* Home Icon */}
              <HomeIcon
                className="h-8 w-8 text-white cursor-pointer hover:text-gray-300"
                onClick={() => navigateToHome(navigate)}
              />
              {/* Profile Icon */}
              <UserCircle
                className="h-8 w-8 text-white cursor-pointer hover:text-gray-300"
                onClick={() => setActiveTab('profile')}
              />
              {/* Logout Icon */}
              <LogOut
                className="h-8 w-8 text-white cursor-pointer hover:text-red-500"
                onClick={() => handleLogOut(navigate)} // Call the logout function when clicked
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
