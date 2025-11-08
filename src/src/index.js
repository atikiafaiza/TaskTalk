import React from 'react';

const element = <h1>helloooooo</h1>
console.log(element);


// Store data in localStorage
const STORAGE_KEY = 'taskHub';
let data = {
  currentUser: {
    id: '1',
    name: 'Current User',
    email: 'user@example.com'
  },
  dashboards: []
};

// Load data from localStorage
function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    data = JSON.parse(stored);
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetPage = link.dataset.page;
      
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      
      link.classList.add('active');
      document.getElementById(`${targetPage}-dashboard`).classList.add('active');
      
      renderDashboards();
    });
  });
}

// Create Dashboard
function initCreateDashboard() {
  const form = document.getElementById('create-dashboard-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dashboard = {
      id: Date.now().toString(),
      name: form.elements['dashboard-name'].value,
      description: form.elements['dashboard-description'].value,
      creator: data.currentUser,
      members: [data.currentUser],
      tasks: [],
      messages: []
    };
    
    data.dashboards.push(dashboard);
    saveData();
    form.reset();
    
    // Switch to My Dashboard view
    document.querySelector('[data-page="my"]').click();
  });
}

// Render Dashboards
function renderDashboards() {
  const connectedDashboards = document.getElementById('connected-dashboards');
  const myDashboards = document.getElementById('my-dashboards');
  const template = document.getElementById('dashboard-template');
  
  // Clear existing content
  connectedDashboards.innerHTML = '';
  myDashboards.innerHTML = '';
  
  data.dashboards.forEach(dashboard => {
    const isConnected = dashboard.members.some(m => m.id === data.currentUser.id);
    const isMine = dashboard.creator.id === data.currentUser.id;
    
    if (isConnected || isMine) {
      const clone = template.content.cloneNode(true);
      const card = clone.querySelector('.dashboard-card');
      
      // Set dashboard info
      card.querySelector('.dashboard-title').textContent = dashboard.name;
      card.querySelector('.dashboard-description').textContent = dashboard.description;
      
      // Setup task management
      setupTaskManagement(card, dashboard);
      
      // Setup member management
      setupMemberManagement(card, dashboard);
      
      // Setup chat
      setupChat(card, dashboard);
      
      if (isConnected) {
        connectedDashboards.appendChild(card);
      }
      if (isMine) {
        myDashboards.appendChild(card);
      }
    }
  });
}

// Task Management
function setupTaskManagement(card, dashboard) {
  const tasksList = card.querySelector('.tasks-list');
  const addTaskForm = card.querySelector('.add-task-form');
  
  // Render existing tasks
  renderTasks();
  
  // Add new task
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const task = {
      id: Date.now().toString(),
      title: e.target.elements[0].value,
      assignee: e.target.elements[1].value,
      dueDate: e.target.elements[2].value,
      dueTime: e.target.elements[3].value,
      status: 'pending'
    };
    
    dashboard.tasks.push(task);
    saveData();
    renderTasks();
    e.target.reset();
  });
  
  function renderTasks() {
    tasksList.innerHTML = '';
    dashboard.tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = `task-item ${task.status}`;
      taskElement.innerHTML = `
        <div>
          <span class="task-title">${task.title}</span>
          <small>(${task.assignee})</small>
          <small>${task.dueDate} ${task.dueTime}</small>
        </div>
        <div class="task-actions">
          <button class="btn-secondary toggle-status">
            ${task.status === 'completed' ? '↩️' : '✓'}
          </button>
          <button class="btn-secondary delete-task">🗑️</button>
        </div>
      `;
      
      // Toggle status
      taskElement.querySelector('.toggle-status').addEventListener('click', () => {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        saveData();
        renderTasks();
      });
      
      // Delete task
      taskElement.querySelector('.delete-task').addEventListener('click', () => {
        dashboard.tasks = dashboard.tasks.filter(t => t.id !== task.id);
        saveData();
        renderTasks();
      });
      
      tasksList.appendChild(taskElement);
    });
  }
}

// Member Management
function setupMemberManagement(card, dashboard) {
  const membersList = card.querySelector('.members-list');
  const addMemberForm = card.querySelector('.add-member-form');
  
  // Render existing members
  renderMembers();
  
  // Add new member
  addMemberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const member = {
      id: Date.now().toString(),
      name: e.target.elements[0].value,
      email: e.target.elements[1].value
    };
    
    dashboard.members.push(member);
    saveData();
    renderMembers();
    e.target.reset();
  });
  
  function renderMembers() {
    membersList.innerHTML = '';
    dashboard.members.forEach(member => {
      const memberElement = document.createElement('div');
      memberElement.className = 'member-item';
      memberElement.innerHTML = `
        <span>${member.name}</span>
        <small>(${member.email})</small>
      `;
      membersList.appendChild(memberElement);
    });
  }
}

// Chat System
function setupChat(card, dashboard) {
  const toggleChat = card.querySelector('.toggle-chat');
  const chatContainer = card.querySelector('.chat-container');
  const chatMessages = card.querySelector('.chat-messages');
  const chatForm = card.querySelector('.chat-form');
  
  // Toggle chat visibility
  toggleChat.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
    toggleChat.textContent = chatContainer.classList.contains('hidden') ? 'Show Chat' : 'Hide Chat';
    if (!chatContainer.classList.contains('hidden')) {
      renderMessages();
    }
  });
  
  // Send message
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = {
      id: Date.now().toString(),
      content: e.target.elements[0].value,
      sender: data.currentUser,
      timestamp: new Date().toISOString()
    };
    
    dashboard.messages.push(message);
    saveData();
    renderMessages();
    e.target.reset();
  });
  
  function renderMessages() {
    chatMessages.innerHTML = '';
    dashboard.messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.innerHTML = `
        <strong>${message.sender.name}:</strong>
        ${message.content}
        <small>${new Date(message.timestamp).toLocaleTimeString()}</small>
      `;
      chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Initialize the application
function init() {
  loadData();
  initNavigation();
  initCreateDashboard();
  renderDashboards();
}

init();
