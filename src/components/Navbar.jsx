import React from 'react';
import { 
  Home, 
  Calendar, 
  Wrench, 
  ClipboardList, 
  PhoneCall, 
  Settings, 
  PlusCircle, 
  AlertTriangle,
  Cloud,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenNewTask, 
  onOpenSettings,
  overdueCount,
  isCloudSynced 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'assets', label: 'Assets & Appliances', icon: Wrench },
    { id: 'logs', label: 'Logbook & History', icon: ClipboardList },
    { id: 'contacts', label: 'Local Trades', icon: PhoneCall },
  ];

  return (
    <header className="bg-meringo-900 text-white border-b border-meringo-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Property Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-meringo-700 flex items-center justify-center border border-meringo-600 shadow-inner">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">Meringo Homestead</span>
                <span className="text-[11px] bg-meringo-800 text-meringo-200 px-2 py-0.5 rounded-full border border-meringo-700/60 font-medium">
                  2-Acre Maintenance
                </span>
              </div>
              <p className="text-xs text-meringo-300 hidden sm:block">Eurobodalla Coast • Water, AWTS, Fire & Grounds</p>
            </div>
          </div>

          {/* Quick Actions (Desktop & Tablet) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {overdueCount > 0 && (
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-rose-500/20 text-rose-200 border border-rose-500/40 rounded-full hover:bg-rose-500/30 transition-colors"
                title={`${overdueCount} task(s) overdue`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>{overdueCount} Overdue</span>
              </button>
            )}

            <button
              onClick={onOpenNewTask}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 bg-meringo-800 hover:bg-meringo-700 text-meringo-200 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors border border-meringo-700"
              title="Cloud Sync, Backup & Restore"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 border-t border-meringo-800/80 no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-meringo-700 text-white shadow-sm'
                    : 'text-meringo-300 hover:text-white hover:bg-meringo-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-meringo-400'}`} />
                <span>{item.label}</span>
                {item.id === 'dashboard' && overdueCount > 0 && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-rose-400"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
