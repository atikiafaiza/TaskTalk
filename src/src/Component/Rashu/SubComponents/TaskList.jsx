import React from 'react';

const TaskList = ({ 
    tasks, 
    selectedChat, 
    setSelectedChat, 
    getStatusIcon 
}) => {
    const handleTaskSelect = (taskId) => {
        console.log('Selected Task ID:', taskId);
        console.log('Current Selected Chat:', selectedChat);
        
        // Log all tasks for reference
        console.log('All Tasks:', tasks);
       
        setSelectedChat(taskId);
    };

    return (
        <div className="divide-y divide-gray-300">
            {tasks.map((task) => (
                <div
                    key={task.task_id}
                    onClick={() => handleTaskSelect(task.task_id)}
                    className={`p-5  shadow-md transition-all duration-300 cursor-pointer ${
                        selectedChat === task.task_id
                            ? 'bg-black text-white border-l-4 border-gray-700 shadow-lg'
                            : 'bg-slate-700 text-white hover:bg-gray-100 hover:shadow-lg hover:text-gray-950'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <h3 className=" text-base">{task.task_name}</h3>
                        {getStatusIcon(task.status)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;