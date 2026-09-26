import { DEFAULT_ASSETS } from '../data/defaultAssets.js';
import { DEFAULT_TASKS } from '../data/defaultTasks.js';
import { DEFAULT_CONTACTS } from '../data/defaultContacts.js';
import { calculateNextDueDate } from './dateUtils.js';

const STORAGE_KEYS = {
  ASSETS: 'meringo_assets_v1',
  TASKS: 'meringo_tasks_v1',
  LOGS: 'meringo_logs_v1',
  CONTACTS: 'meringo_contacts_v1',
  SETTINGS: 'meringo_settings_v1',
};

const DATA_CHANGED_EVENT = 'meringo-data-changed';

function emitChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_CHANGED_EVENT));
  }
}

// Initial mock logs to show history
const DEFAULT_LOGS = [
  {
    id: "log-seed-1",
    taskId: "task-water-strainer",
    taskTitle: "Inspect Rainwater Tank Inlet Strainers & Clean Leaves",
    assetId: "asset-water-tanks",
    completedDate: new Date(Date.now() - 27 * 86400000).toISOString().split('T')[0],
    completedBy: "Self",
    cost: 0,
    durationMinutes: 20,
    notes: "Cleared a handful of spotted gum leaves from both tank baskets. Mesh in excellent condition.",
    nextDueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  },
  {
    id: "log-seed-2",
    taskId: "task-awts-quarterly-service",
    taskTitle: "AWTS Quarterly Certified Compliance Service",
    assetId: "asset-awts",
    completedDate: new Date(Date.now() - 72 * 86400000).toISOString().split('T')[0],
    completedBy: "South Coast Wastewater",
    cost: 110,
    durationMinutes: 45,
    notes: "Quarterly inspection passed. Residual chlorine 1.2 ppm. Blower running smooth. Certificate sent to Council.",
    nextDueDate: new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0]
  },
  {
    id: "log-seed-3",
    taskId: "task-fire-pump-run-test",
    taskTitle: "Petrol Fire Pump Monthly Test-Run & Fuel Check",
    assetId: "asset-fire-pump",
    completedDate: new Date(Date.now() - 29 * 86400000).toISOString().split('T')[0],
    completedBy: "Self",
    cost: 0,
    durationMinutes: 15,
    notes: "Started on second pull. Tested 25mm fire nozzle on jet and fog patterns. Re-topped fuel tank.",
    nextDueDate: new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0]
  }
];

export const storage = {
  // Listen for data updates across tabs or components
  subscribe(callback) {
    const handler = () => callback();
    window.addEventListener(DATA_CHANGED_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(DATA_CHANGED_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  },

  // --- ASSETS ---
  getAssets() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ASSETS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(DEFAULT_ASSETS));
        return DEFAULT_ASSETS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to get assets from storage', e);
      return DEFAULT_ASSETS;
    }
  },

  saveAssets(assets) {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
    emitChange();
  },

  addAsset(asset) {
    const assets = this.getAssets();
    const newAsset = { ...asset, id: asset.id || `asset-${Date.now()}` };
    assets.unshift(newAsset);
    this.saveAssets(assets);
    return newAsset;
  },

  updateAsset(updatedAsset) {
    const assets = this.getAssets().map(a => a.id === updatedAsset.id ? updatedAsset : a);
    this.saveAssets(assets);
  },

  deleteAsset(id) {
    const assets = this.getAssets().filter(a => a.id !== id);
    this.saveAssets(assets);
  },

  // --- TASKS ---
  getTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEFAULT_TASKS));
        return DEFAULT_TASKS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to get tasks from storage', e);
      return DEFAULT_TASKS;
    }
  },

  saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    emitChange();
  },

  addTask(task) {
    const tasks = this.getTasks();
    const newTask = {
      ...task,
      id: task.id || `task-${Date.now()}`,
      checklist: task.checklist || []
    };
    tasks.unshift(newTask);
    this.saveTasks(tasks);
    return newTask;
  },

  updateTask(updatedTask) {
    const tasks = this.getTasks().map(t => t.id === updatedTask.id ? updatedTask : t);
    this.saveTasks(tasks);
  },

  deleteTask(id) {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  },

  completeTask(taskId, logDetails = {}) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return null;

    const task = tasks[taskIndex];
    const completedDate = logDetails.completedDate || new Date().toISOString().split('T')[0];
    const nextDueDate = calculateNextDueDate(completedDate, task.frequency, task.intervalMonths);

    // Update task with new due date
    const updatedTask = {
      ...task,
      lastCompletedDate: completedDate,
      dueDate: nextDueDate,
    };
    tasks[taskIndex] = updatedTask;
    this.saveTasks(tasks);

    // Create log record
    const logEntry = {
      id: `log-${Date.now()}`,
      taskId: task.id,
      taskTitle: task.title,
      assetId: task.assetId || null,
      completedDate,
      completedBy: logDetails.completedBy || "Self",
      cost: Number(logDetails.cost) || 0,
      durationMinutes: Number(logDetails.durationMinutes) || task.estimatedMinutes || 0,
      notes: logDetails.notes || "Completed as scheduled.",
      nextDueDate
    };

    this.addLog(logEntry);
    return { task: updatedTask, log: logEntry };
  },

  // --- LOGS ---
  getLogs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(DEFAULT_LOGS));
        return DEFAULT_LOGS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to get logs from storage', e);
      return DEFAULT_LOGS;
    }
  },

  saveLogs(logs) {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    emitChange();
  },

  addLog(logEntry) {
    const logs = this.getLogs();
    const newLog = { ...logEntry, id: logEntry.id || `log-${Date.now()}` };
    logs.unshift(newLog);
    this.saveLogs(logs);
    return newLog;
  },

  deleteLog(id) {
    const logs = this.getLogs().filter(l => l.id !== id);
    this.saveLogs(logs);
  },

  // --- CONTACTS ---
  getContacts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(DEFAULT_CONTACTS));
        return DEFAULT_CONTACTS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to get contacts', e);
      return DEFAULT_CONTACTS;
    }
  },

  saveContacts(contacts) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    emitChange();
  },

  addContact(contact) {
    const contacts = this.getContacts();
    const newContact = { ...contact, id: contact.id || `contact-${Date.now()}` };
    contacts.unshift(newContact);
    this.saveContacts(contacts);
    return newContact;
  },

  deleteContact(id) {
    const contacts = this.getContacts().filter(c => c.id !== id);
    this.saveContacts(contacts);
  },

  // --- SETTINGS ---
  getSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return raw ? JSON.parse(raw) : {
        supabaseUrl: '',
        supabaseAnonKey: '',
        enableCloudSync: false,
        lastSyncTimestamp: null,
      };
    } catch (e) {
      return { supabaseUrl: '', supabaseAnonKey: '', enableCloudSync: false };
    }
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    emitChange();
  },

  // --- BACKUP & RESTORE ---
  exportAllDataJSON() {
    const data = {
      version: "1.0",
      property: "2-Acre Coastal Homestead, Meringo NSW",
      exportedAt: new Date().toISOString(),
      assets: this.getAssets(),
      tasks: this.getTasks(),
      logs: this.getLogs(),
      contacts: this.getContacts(),
      settings: this.getSettings()
    };
    return JSON.stringify(data, null, 2);
  },

  importAllDataJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.tasks || !parsed.assets) {
        throw new Error("Invalid backup format: missing tasks or assets.");
      }
      if (parsed.assets) localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(parsed.assets));
      if (parsed.tasks) localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(parsed.tasks));
      if (parsed.logs) localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(parsed.logs));
      if (parsed.contacts) localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(parsed.contacts));
      if (parsed.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
      emitChange();
      return { success: true, count: { tasks: parsed.tasks.length, assets: parsed.assets.length } };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(DEFAULT_ASSETS));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEFAULT_TASKS));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(DEFAULT_LOGS));
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(DEFAULT_CONTACTS));
    emitChange();
  }
};
