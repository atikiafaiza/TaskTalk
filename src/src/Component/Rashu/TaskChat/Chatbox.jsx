import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import NewTaskModal from '../CreateNewTask/NewTaskModal';
import GroupInfoModal from '../GroupInfo/GroupInfoModal';
import TaskHeader from '../SubComponents/TaskHeader';
import TaskList from '../SubComponents/TaskList';
import ChatHeader from '../SubComponents/ChatHeader';
import MessagesArea from '../SubComponents/MessagesArea';
import MessageInput from '../SubComponents/MessageInput';
import AddNewMember from '../Add New Member/AddNewMember';
import '../rashu-styles.css';

const Chatbox = () => {
    const { dashboard_id } = useParams(); // Accessing dashboard_id from URL parameters
    const [currentUser, setCurrentUser] = useState(1);
    const [selectedChat, setSelectedChat] = useState(1);
    const [attachments, setAttachments] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
    const [isAddMemberOpen, setAddMemberOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);

    // Assuming you want to fetch the group data, tasks, and chats based on dashboard_id
    const [groupData, setGroupData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [chats, setChats] = useState({});

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                // Fetch data for the specific dashboard using dashboard_id
                const groupResponse = await fetch(`http://localhost:4000/api/dashboards/getDashboardInfoForTaskchat/${dashboard_id}`);
                const groupData = await groupResponse.json();
                console.log(groupData);
                setGroupData(groupData);

                // Fetch tasks for the specific dashboard
                const tasksResponse = await fetch(`http://localhost:4000/api/tasks/getTasksForTaskchat/${dashboard_id}`);
                const tasksData = await tasksResponse.json();
                console.log(tasksData);

                // sort by `creation_date` in descending order (most recent first)
                const sortedTasksData = tasksData.sort(
                    (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
                );
                setTasks(sortedTasksData);

                // // Fetch chat messages for the specific dashboard
                // const chatResponse = await fetch(`http://localhost:4000/api/chats/${dashboard_id}`);
                // const chatData = await chatResponse.json();
                // setChats(chatData);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };

        const storedUserName = localStorage.getItem("currentUserName"); // Get current user from localStorage
        setCurrentUser(storedUserName);
        fetchGroupData();
    }, [dashboard_id]); // Re-fetch when dashboard_id changes

    const handleSendMessage = () => {
        // Handle send message logic here
        console.log('Message:', message);
        setMessage('');
    };

    const handleAddMember = (newMember) => {
        console.log('New member to be added:', newMember);
        setIsAddMemberModalOpen(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'in-progress':
                return <Clock className="w-4 h-4 text-blue-500" />;
            case 'pending':
                return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            default:
                return null;
        }
    };

    const handleAttachmentClick = (attachment) => {
        window.open(attachment.url, '_blank');
    };

    const handleFileAttachment = (event) => {
        const files = Array.from(event.target.files);
        setAttachments([...attachments, ...files.map(file => ({
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            type: file.type.startsWith('image/') ? 'image' : 'file'
        }))]);
    };

    const convertTime = (message) => {
        const formattedTime = new Date(Number(message.timestamp)).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });
        return formattedTime;
    };

    const getAllAttachments = () => {
        const currentChat = chats[selectedChat] || [];
        return currentChat.reduce((acc, message) => {
            if (message.attachments && message.attachments.length > 0) {
                return [...acc, ...message.attachments.map(attachment => ({
                    ...attachment,
                    sender: message.sender,
                    timestamp: convertTime(message)
                }))];
            }
            return acc;
        }, []);
    };

    const handleCreateTask = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="tailwind-scope">
            <div className="flex h-screen bg-gray-100">
                {/* Task list left side part */}
                <div className="w-1/3 bg-teal-950 border-r border-gray-200 overflow-y-auto shadow-lg relative">
                    <TaskHeader
                        onAddMemberOpen={() => setIsAddMemberModalOpen(true)}
                        onGroupInfoOpen={() => setIsGroupInfoOpen(true)}
                    />
                    <TaskList
                        tasks={tasks}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        getStatusIcon={getStatusIcon}
                    />

                    {/* Floating Action Button */}
                    {groupData?.dashboard?.user_id && currentUser === groupData.dashboard.user_id && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="absolute bottom-4 right-4 p-2 rounded-lg bg-white hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="h-5 w-5 text-blue-600 hover:text-white transition-colors" />
                        </button>
                    )}


                    {/* Modals */}
                    <NewTaskModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCreateTask={handleCreateTask}
                        dashboardId={groupData?.dashboard?.dashboard_id} // Pass the ID
                    />

                    <GroupInfoModal
                        isOpen={isGroupInfoOpen}
                        onClose={() => setIsGroupInfoOpen(false)}
                        groupData={groupData}
                    />

                    {groupData?.dashboard?.user_id && currentUser === groupData.dashboard.user_id && (
                    <AddNewMember
                        isOpen={isAddMemberModalOpen}
                        onClose={() => setIsAddMemberModalOpen(false)}
                        onAddMember={handleAddMember}
                        dashboardId={groupData?.dashboard?.dashboard_id}
                        admin_id= {currentUser}
                    />)}
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-gray-50">
                    <ChatHeader
                        tasks={tasks}
                        admin_id_CH = {groupData?.dashboard?.user_id}
                        selectedChat={selectedChat}
                        showAttachments={showAttachments}
                        setShowAttachments={setShowAttachments}
                        getAllAttachments={getAllAttachments}
                        handleAttachmentClick={handleAttachmentClick}
                    />

                    <MessagesArea
                        chats={chats}
                        currentUser={currentUser}
                        selectedChat={selectedChat}
                    />

                    <MessageInput
                        message={message}
                        selectedChat={selectedChat}
                        setMessage={setMessage}
                        handleFileAttachment={handleFileAttachment}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
