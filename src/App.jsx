import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import DashboardView from './views/DashboardView.jsx';
import ScheduleView from './views/ScheduleView.jsx';
import AssetsView from './views/AssetsView.jsx';
import LogbookView from './views/LogbookView.jsx';
import ContactsView from './views/ContactsView.jsx';
import TaskModal from './components/TaskModal.jsx';
import LogModal from './components/LogModal.jsx';
import AssetModal from './components/AssetModal.jsx';
import SyncSettingsModal from './components/SyncSettingsModal.jsx';
import { storage } from './services/storage.js';
import { getTaskUrgency } from './services/dateUtils.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // App data state
  const [tasks, setTasks] = useState(() => storage.getTasks());
  const [assets, setAssets] = useState(() => storage.getAssets());
  const [logs, setLogs] = useState(() => storage.getLogs());
  const [contacts, setContacts] = useState(() => storage.getContacts());

  // Modal visibility state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [taskToLog, setTaskToLog] = useState(null);

  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Reload data from storage
  const refreshData = () => {
    setTasks(storage.getTasks());
    setAssets(storage.getAssets());
    setLogs(storage.getLogs());
    setContacts(storage.getContacts());
  };

  useEffect(() => {
    // Subscribe to storage changes
    const unsubscribe = storage.subscribe(() => {
      refreshData();
    });
    return unsubscribe;
  }, []);

  // Calculate overdue count
  const overdueCount = tasks.filter(t => getTaskUrgency(t.dueDate) === 'overdue').length;

  // --- Task Handlers ---
  const handleOpenNewTask = (preselectedAssetId = '') => {
    setTaskToEdit(preselectedAssetId ? { assetId: preselectedAssetId } : null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      storage.updateTask(taskData);
    } else {
      storage.addTask(taskData);
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this maintenance task?")) {
      storage.deleteTask(id);
    }
  };

  const handleSnoozeTask = (task, days) => {
    const current = new Date(task.dueDate || new Date());
    current.setDate(current.getDate() + days);
    const updated = {
      ...task,
      dueDate: current.toISOString().split('T')[0]
    };
    storage.updateTask(updated);
  };

  // --- Log / Completion Handlers ---
  const handleMarkDone = (task) => {
    setTaskToLog(task);
    setIsLogModalOpen(true);
  };

  const handleConfirmLog = (taskId, logDetails) => {
    storage.completeTask(taskId, logDetails);
  };

  const handleDeleteLog = (id) => {
    if (window.confirm("Remove this log entry?")) {
      storage.deleteLog(id);
    }
  };

  const handleRecordAdhoc = () => {
    // Virtual task for unprompted work
    setTaskToLog({
      id: `adhoc-${Date.now()}`,
      title: 'Ad-hoc Property Maintenance / Emergency Repair',
      category: 'house',
      frequency: 'custom',
      intervalMonths: 0,
      dueDate: new Date().toISOString().split('T')[0],
      estimatedMinutes: 30,
      preferredTrade: 'Self'
    });
    setIsLogModalOpen(true);
  };

  // --- Asset Handlers ---
  const handleOpenNewAsset = () => {
    setAssetToEdit(null);
    setIsAssetModalOpen(true);
  };

  const handleEditAsset = (asset) => {
    setAssetToEdit(asset);
    setIsAssetModalOpen(true);
  };

  const handleSaveAsset = (assetData) => {
    if (assetData.id) {
      storage.updateAsset(assetData);
    } else {
      storage.addAsset(assetData);
    }
  };

  const handleDeleteAsset = (id) => {
    if (window.confirm("Delete this asset and appliance profile? Linked tasks will remain.")) {
      storage.deleteAsset(id);
    }
  };

  const handleAddTaskForAsset = (asset) => {
    handleOpenNewTask(asset.id);
  };

  // --- Contact Handlers ---
  const handleAddContact = (contact) => {
    storage.addContact(contact);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm("Delete this contact from the trade directory?")) {
      storage.deleteContact(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTask={() => handleOpenNewTask()}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        overdueCount={overdueCount}
        isCloudSynced={false}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            tasks={tasks}
            assets={assets}
            logs={logs}
            onMarkDone={handleMarkDone}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onSnoozeTask={handleSnoozeTask}
            onOpenNewTask={() => handleOpenNewTask()}
            onViewAllLogs={() => setActiveTab('logs')}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            tasks={tasks}
            assets={assets}
            onMarkDone={handleMarkDone}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onSnoozeTask={handleSnoozeTask}
            onOpenNewTask={() => handleOpenNewTask()}
          />
        )}

        {activeTab === 'assets' && (
          <AssetsView
            assets={assets}
            tasks={tasks}
            onAddAsset={handleOpenNewAsset}
            onEditAsset={handleEditAsset}
            onDeleteAsset={handleDeleteAsset}
            onAddTaskForAsset={handleAddTaskForAsset}
            onViewTasks={() => setActiveTab('schedule')}
          />
        )}

        {activeTab === 'logs' && (
          <LogbookView
            logs={logs}
            tasks={tasks}
            assets={assets}
            onDeleteLog={handleDeleteLog}
            onRecordAdhoc={handleRecordAdhoc}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactsView
            contacts={contacts}
            onAddContact={handleAddContact}
            onDeleteContact={handleDeleteContact}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🌿 Meringo Homestead Maintenance • 2 Acres NSW South Coast</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="text-meringo-700 hover:underline font-medium"
            >
              Backup & Cloud Sync
            </button>
            <span>•</span>
            <span>Local-First & GitHub Pages Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        assets={assets}
      />

      <LogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onConfirm={handleConfirmLog}
        task={taskToLog}
      />

      <AssetModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onSave={handleSaveAsset}
        assetToEdit={assetToEdit}
      />

      <SyncSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDataResetOrImport={refreshData}
      />
    </div>
  );
}
