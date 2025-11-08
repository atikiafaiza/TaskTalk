import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const AddNewMember = ({ isOpen, onClose, onAddMember, dashboardId, admin_id }) => {
    // If modal is not open, don't render anything
    if (!isOpen) return null;

    const [newMember, setNewMember] = useState({
        username: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!newMember.username || !newMember.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Prepare member data
        const memberData = {
            dashboard_id: dashboardId, // Replace with actual dashboard ID
            user_id: newMember.username,
            admin_id: admin_id,
        };
        
        try {
            // Send data to backend
            await axios.post('http://localhost:4000/api/dashboards/addNewMember', memberData);
        
            // Reload the page after successful creation
            window.location.reload();
        } catch (error) {
            console.error('Error adding member:', error);
            setError('Failed to create task. Please try again.');
        }

        // Call the onAddMember prop with the new member
        onAddMember(newMember);

        // Reset form
        setNewMember({
            username: '',
            email: '',
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-md relative w-96">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Member</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={newMember.username}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter member's username"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={newMember.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter member's email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-400">Role</label>
                        <select
                            name="role"
                            value={newMember.role}
                            onChange={handleInputChange}
                            className="mt-1 ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                            
                        </select>
                    </div> */}
                    
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                    Add Member
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewMember;