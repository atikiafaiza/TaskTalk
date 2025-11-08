import React from 'react';
import { UserPlus, LayoutDashboard } from 'lucide-react';

const TaskHeader = ({ onGroupInfoOpen, onAddMemberOpen }) => {
    return (
        <div className="p-3 border-b border-gray-200 bg-indigo-950 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Tasks</h2>
            <div className="flex gap-3">
                <div className="relative group">
                    <button
                        onClick={onAddMemberOpen}
                        className="p-2 rounded-lg text-white hover:bg-indigo-800 transition-colors"
                    >
                        <UserPlus className="h-5 w-5 text-blue-600 hover:text-white transition-colors" />
                    </button>

                </div>
                <div className="relative group">
                    <button
                        onClick={onGroupInfoOpen}
                        className="p-2 rounded-lg bg-white hover:bg-blue-600 transition-colors"
                    >
                        <LayoutDashboard
                            className="h-5 w-5 text-blue-600 hover:text-white transition-colors"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskHeader;