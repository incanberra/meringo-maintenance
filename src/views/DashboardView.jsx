import React, { useState } from 'react';
import QuickStats from '../components/QuickStats.jsx';
import FilterBar from '../components/FilterBar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { 
  AlertTriangle, 
  CalendarCheck, 
  PlusCircle, 
  Sparkles, 
  ArrowRight, 
  History,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { getTaskUrgency, formatDisplayDate } from '../services/dateUtils.js';

export default function DashboardView({ 
  tasks, 
  assets, 
  logs, 
  onMarkDone, 
  onEditTask, 
  onDeleteTask, 
  onSnoozeTask,
  onOpenNewTask,
  onViewAllLogs
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  // Asset lookup map
  const assetMap = {};
  assets.forEach(a => {
    assetMap[a.id] = a;
  });

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Search match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const asset = assetMap[task.assetId];
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchNotes = (task.notes || '').toLowerCase().includes(q);
      const matchTrade = (task.preferredTrade || '').toLowerCase().includes(q);
      const matchAsset = asset ? asset.name.toLowerCase().includes(q) : false;
      const matchChecklist = (task.checklist || []).some(step => step.toLowerCase().includes(q));
      if (!matchTitle && !matchNotes && !matchTrade && !matchAsset && !matchChecklist) {
        return false;
      }
    }

    // Category match
    if (selectedCategory !== 'all' && task.category !== selectedCategory) {
      return false;
    }

    // Urgency match
    const urgency = getTaskUrgency(task.dueDate);
    if (selectedUrgency === 'overdue' && urgency !== 'overdue') return false;
    if (selectedUrgency === 'due-week' && urgency !== 'today' && urgency !== 'due-soon' && urgency !== 'overdue') return false;
    if (selectedUrgency === 'due-month' && urgency === 'future') return false;

    // Season match
    if (selectedSeason !== 'all') {
      if (task.seasonalTiming && task.seasonalTiming !== 'all-year' && task.seasonalTiming !== selectedSeason) {
        return false;
      }
    }

    return true;
  });

  // Sort tasks: Overdue first, then by dueDate ascending
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const urgencyA = getTaskUrgency(a.dueDate);
    const urgencyB = getTaskUrgency(b.dueDate);
    if (urgencyA === 'overdue' && urgencyB !== 'overdue') return -1;
    if (urgencyB === 'overdue' && urgencyA !== 'overdue') return 1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const overdueList = sortedTasks.filter(t => getTaskUrgency(t.dueDate) === 'overdue');
  const upcomingList = sortedTasks.filter(t => getTaskUrgency(t.dueDate) !== 'overdue');

  // Quick stat filter click handler
  const handleStatFilter = (filterKey) => {
    if (filterKey === 'overdue') setSelectedUrgency('overdue');
    else if (filterKey === 'due-week') setSelectedUrgency('due-week');
    else if (filterKey === 'due-month') setSelectedUrgency('due-month');
    else if (filterKey === 'completed' && onViewAllLogs) onViewAllLogs();
  };

  return (
    <div className="space-y-6">
      {/* Property Welcome & Quick Season Context */}
      <div className="bg-gradient-to-r from-meringo-900 via-meringo-800 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-meringo-700/80 text-emerald-200 text-xs font-semibold mb-3 border border-meringo-600/50">
            <span>🌿 Meringo Coastal Homestead (2 Acres)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Property Maintenance Tracker
          </h1>
          <p className="text-sm text-meringo-200 mt-2 leading-relaxed">
            Stay ahead of seasonal bushfire prep, AWTS council compliance, rainwater filtration, and acreage machinery maintenance on the South Coast.
          </p>
        </div>
      </div>

      {/* KPI Counters */}
      <QuickStats
        tasks={tasks}
        logs={logs}
        assets={assets}
        onFilterSelect={handleStatFilter}
      />

      {/* Overdue Urgent Alert Banner */}
      {overdueList.length > 0 && selectedUrgency !== 'overdue' && (
        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl shadow-sm flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-rose-900">
                {overdueList.length} Maintenance {overdueList.length === 1 ? 'Item is' : 'Items are'} Overdue
              </h3>
              <p className="text-xs text-rose-700 mt-0.5">
                {overdueList.map(t => t.title).slice(0, 2).join(', ')}
                {overdueList.length > 2 && ` and ${overdueList.length - 2} more`}.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedUrgency('overdue')}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap shadow-sm"
          >
            Review Overdue
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedUrgency={selectedUrgency}
        setSelectedUrgency={setSelectedUrgency}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />

      {/* Main Grid: Tasks Column + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scheduled Tasks (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-meringo-700" />
              <span>Due & Scheduled Maintenance</span>
              <span className="text-xs bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                {sortedTasks.length}
              </span>
            </h2>

            <button
              onClick={onOpenNewTask}
              className="text-xs font-semibold text-meringo-700 hover:text-meringo-800 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Schedule Custom Task</span>
            </button>
          </div>

          {sortedTasks.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No tasks match your filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                All filtered maintenance items are up to date! Clear your filters or schedule a new task.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {sortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  asset={assetMap[task.assetId]}
                  onMarkDone={onMarkDone}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onSnooze={onSnoozeTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Maintenance Log Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <span>Recently Completed</span>
            </h2>

            {onViewAllLogs && (
              <button
                onClick={onViewAllLogs}
                className="text-xs font-semibold text-meringo-700 hover:text-meringo-800 flex items-center gap-0.5"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm divide-y divide-slate-100">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No completed maintenance records logged yet.
              </p>
            ) : (
              logs.slice(0, 5).map(log => (
                <div key={log.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {log.taskTitle}
                    </p>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {formatDisplayDate(log.completedDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="font-medium text-emerald-700">✓ {log.completedBy}</span>
                    {log.cost > 0 && (
                      <span>• ${log.cost.toFixed(2)} AUD</span>
                    )}
                    {log.durationMinutes > 0 && (
                      <span>• {log.durationMinutes} mins</span>
                    )}
                  </div>

                  {log.notes && (
                    <p className="text-[11px] text-slate-600 mt-1 italic line-clamp-2">
                      "{log.notes}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Quick Property Factsheet Callout */}
          <div className="bg-meringo-50/70 rounded-xl p-4 border border-meringo-200/60 text-xs space-y-2">
            <h4 className="font-bold text-meringo-900 flex items-center gap-1.5">
              <span>📍 Meringo Acreage Checklist</span>
            </h4>
            <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
              <li>Check petrol bushfire pump fuel turnover every 6 months.</li>
              <li>Keep AWTS council compliance records on file.</li>
              <li>Wash coastal salt spray from window frames quarterly.</li>
              <li>Keep grass in Asset Protection Zone under 100mm.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
