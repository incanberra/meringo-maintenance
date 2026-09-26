import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Cloud, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Database,
  ArrowUpRight,
  RefreshCw,
  Code
} from 'lucide-react';
import { storage } from '../services/storage.js';
import { supabaseSync, SUPABASE_SQL_SCHEMA } from '../services/supabaseSync.js';

export default function SyncSettingsModal({ 
  isOpen, 
  onClose, 
  onDataResetOrImport 
}) {
  const [settings, setSettings] = useState(() => storage.getSettings());
  const [syncStatus, setSyncStatus] = useState({ state: 'idle', message: '' });
  const [showSql, setShowSql] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Handle Export
  const handleExportJSON = () => {
    const jsonStr = storage.exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `meringo-maintenance-backup-${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Import
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const res = storage.importAllDataJSON(content);
      if (res.success) {
        setSyncStatus({ state: 'success', message: `Imported successfully! Loaded ${res.count.tasks} tasks and ${res.count.assets} assets.` });
        if (onDataResetOrImport) onDataResetOrImport();
      } else {
        setSyncStatus({ state: 'error', message: `Import failed: ${res.error}` });
      }
    };
    reader.readAsText(file);
  };

  // Handle Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to restore the default Meringo property maintenance schedule and assets? This will replace your current items.")) {
      storage.resetToDefaults();
      setSyncStatus({ state: 'success', message: 'Restored default Meringo maintenance catalogue!' });
      if (onDataResetOrImport) onDataResetOrImport();
    }
  };

  // Save Settings
  const handleSaveSettings = (updated) => {
    setSettings(updated);
    storage.saveSettings(updated);
  };

  // Test Supabase Connection
  const handleTestSupabase = async () => {
    if (!settings.supabaseUrl || !settings.supabaseAnonKey) {
      setSyncStatus({ state: 'error', message: 'Please enter both your Supabase URL and Anon Key.' });
      return;
    }

    setIsProcessing(true);
    setSyncStatus({ state: 'loading', message: 'Connecting to Supabase...' });

    const res = await supabaseSync.testConnection(settings.supabaseUrl, settings.supabaseAnonKey);
    setIsProcessing(false);

    if (res.success) {
      setSyncStatus({ state: 'success', message: 'Connection successful! Supabase tables are accessible.' });
    } else {
      setSyncStatus({ state: 'error', message: res.error });
    }
  };

  // Push local to Supabase
  const handlePushToCloud = async () => {
    setIsProcessing(true);
    setSyncStatus({ state: 'loading', message: 'Pushing local records to Supabase...' });

    const payload = {
      assets: storage.getAssets(),
      tasks: storage.getTasks(),
      logs: storage.getLogs(),
      contacts: storage.getContacts()
    };

    const res = await supabaseSync.pushData(settings.supabaseUrl, settings.supabaseAnonKey, payload);
    setIsProcessing(false);

    if (res.success) {
      const updated = { ...settings, lastSyncTimestamp: new Date().toISOString() };
      handleSaveSettings(updated);
      setSyncStatus({ state: 'success', message: 'All local tasks, assets, and logs successfully saved to Supabase!' });
    } else {
      setSyncStatus({ state: 'error', message: `Push failed: ${res.error}` });
    }
  };

  // Pull from Supabase
  const handlePullFromCloud = async () => {
    setIsProcessing(true);
    setSyncStatus({ state: 'loading', message: 'Pulling records from Supabase...' });

    const res = await supabaseSync.pullData(settings.supabaseUrl, settings.supabaseAnonKey);
    setIsProcessing(false);

    if (res.success) {
      const data = res.data;
      if (data.assets && data.assets.length > 0) storage.saveAssets(data.assets);
      if (data.tasks && data.tasks.length > 0) storage.saveTasks(data.tasks);
      if (data.logs && data.logs.length > 0) storage.saveLogs(data.logs);
      if (data.contacts && data.contacts.length > 0) storage.saveContacts(data.contacts);

      const updated = { ...settings, lastSyncTimestamp: new Date().toISOString() };
      handleSaveSettings(updated);
      setSyncStatus({ state: 'success', message: 'Pulled latest records from Supabase!' });
      if (onDataResetOrImport) onDataResetOrImport();
    } else {
      setSyncStatus({ state: 'error', message: `Pull failed: ${res.error}` });
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-meringo-700" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Storage, Sync & Backup Settings
              </h2>
              <p className="text-xs text-slate-500">Local-first data management and optional Supabase cloud sync</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          {/* Status Alert Banner */}
          {syncStatus.message && (
            <div className={`p-3 rounded-xl flex items-start gap-2.5 text-xs ${
              syncStatus.state === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
              syncStatus.state === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
              'bg-sky-50 text-sky-800 border border-sky-200'
            }`}>
              {syncStatus.state === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />}
              {syncStatus.state === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5" />}
              {syncStatus.state === 'loading' && <RefreshCw className="w-4 h-4 text-sky-600 animate-spin mt-0.5" />}
              <span className="flex-1 font-medium">{syncStatus.message}</span>
            </div>
          )}

          {/* Section 1: Local Backup & Restore */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Download className="w-4 h-4 text-meringo-700" />
              Backup & Portability (JSON)
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Your maintenance records and schedules are saved directly in your web browser. You can export a full backup file at any time or restore it on any computer or phone.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-2 bg-meringo-700 hover:bg-meringo-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Backup (JSON)</span>
              </button>

              <label className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Import Backup</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleImportFile}
                />
              </label>

              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors ml-auto"
                title="Restore original Meringo property tasks"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>

          {/* Section 2: Supabase Cloud Database Sync */}
          <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-sky-600" />
                  Supabase Cloud Synchronization (Optional)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Link a free Supabase project to seamlessly sync tasks, photos, and log records between your phone while outside and your home computer.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={settings.enableCloudSync}
                  onChange={(e) => handleSaveSettings({ ...settings, enableCloudSync: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {settings.enableCloudSync && (
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-project.supabase.co"
                    value={settings.supabaseUrl}
                    onChange={(e) => handleSaveSettings({ ...settings, supabaseUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={settings.supabaseAnonKey}
                    onChange={(e) => handleSaveSettings({ ...settings, supabaseAnonKey: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 font-mono text-slate-900"
                  />
                </div>

                {settings.lastSyncTimestamp && (
                  <p className="text-[11px] text-slate-500">
                    Last synced: {new Date(settings.lastSyncTimestamp).toLocaleString('en-AU')}
                  </p>
                )}

                {/* Cloud Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleTestSupabase}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    Test Connection
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePushToCloud}
                    className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Push to Supabase</span>
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePullFromCloud}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Pull from Supabase</span>
                  </button>
                </div>

                {/* SQL Schema Expander */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowSql(!showSql)}
                    className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>{showSql ? 'Hide Supabase SQL Tables Script' : 'View Supabase SQL Setup Script (Click to Copy)'}</span>
                  </button>

                  {showSql && (
                    <div className="mt-2 bg-slate-900 rounded-lg p-3 text-slate-200 text-xs font-mono relative">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-800">
                        <span className="text-[11px] text-slate-400">Run in Supabase &gt; SQL Editor</span>
                        <button
                          type="button"
                          onClick={copySqlToClipboard}
                          className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-xs rounded text-white"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                        </button>
                      </div>
                      <pre className="max-h-40 overflow-y-auto text-[11px] leading-relaxed whitespace-pre-wrap">
                        {SUPABASE_SQL_SCHEMA}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
}
