import React from 'react'
import { X, Users, Calendar, Folder } from 'lucide-react';

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

const GroupInfoModal = ({
    isOpen,
    onClose,
    groupData
}) => {
    if (!isOpen) return null;

    return (
       
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white w-[450px] p-6 rounded-xl shadow-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <h2 className="text-2xl font-bold mb-4">{groupData.dashboard.dashboard_name}</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Users className="h-5 w-5" /> Members
                            </h3>
                            <ul className="list-none pl-0 space-y-1">
                                {/* Display dashboard.user_id as the admin */}
                                <li className="flex justify-between text-gray-600">
                                    {groupData.dashboard.user_id}
                                    <span className="text-xs text-gray-500">admin</span>
                                </li>

                                {/* display other members */}
                                {groupData.members.map((member, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between text-gray-600"
                                    >
                                        {member}
                                        <span className="text-xs text-gray-500">
                                            {"member"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Dashboard Details
                            </h3>
                            <div className="text-gray-600">
                                <p>Created: {formattedTime(groupData.dashboard.creation_date)}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Folder className="h-5 w-5" /> Description
                            </h3>
                            <p className="text-gray-600">
                                {groupData.dashboard.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default GroupInfoModal;