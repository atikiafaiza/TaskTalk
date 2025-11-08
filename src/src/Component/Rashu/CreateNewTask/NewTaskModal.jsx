import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const NewTaskModal = ({ isOpen, onClose, onCreateTask, dashboardId }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDateTime: '', // New field for due date and time
  });

  const [error, setError] = useState(''); // State to manage validation error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any previous errors when input changes
    if (name === 'dueDateTime') {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate due date is not in the past
    if (newTask.dueDateTime) {
      const selectedDateTime = new Date(newTask.dueDateTime);
      const currentDateTime = new Date();
  
      if (selectedDateTime <= currentDateTime) {
        setError('Due date and time must be in the future');
        return;
      }
    }
  
    // Clear any previous errors
    setError('');
  
    // Prepare task data
    const taskData = {
      dashboard_id: dashboardId, // Replace with actual dashboard ID
      title: newTask.title,
      description: newTask.description,
      dueDateTime: newTask.dueDateTime,
      status: 'pending',
    };
  
    try {
      // Send data to backend
      await axios.post('http://localhost:4000/api/tasks/createNewTask', taskData);
  
      // Reload the page after successful creation
      window.location.reload();
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-96 p-6 rounded-xl shadow-2xl relative transform transition-all duration-300 scale-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-200">Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200">Due Date and Time</label>
              <input
                type="datetime-local"
                name="dueDateTime"
                value={newTask.dueDateTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    
  );
};

export default NewTaskModal;