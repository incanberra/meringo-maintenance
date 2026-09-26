import React, { useState } from 'react';
import TaskCard from '../components/TaskCard.jsx';
import { Calendar, Layers, Clock, Filter, PlusCircle } from 'lucide-react';
import { getTaskUrgency, formatDisplayDate } from '../services/dateUtils.js';

export default function ScheduleView({ 
  tasks, 
  assets, 
  onMarkDone, 
  onEditTask, 
  onDeleteTask, 
  onSnoozeTask,
  onOpenNewTask 
}) {
  const [viewMode, setViewMode] = useState('frequency'); // 'frequency' | 'timeline'
  const [filterCategory, setFilterCategory] = useState('all');

  const assetMap = {};
  assets.forEach(a => {
    assetMap[a.id] = a;
  });

  const filteredTasks = tasks.filter(task => {
    if (filterCategory !== 'all' && task.category !== filterCategory) {
      return false;
    }
    return true;
  });

  // Group by frequency
  const frequencyGroups = {
    weekly: { label: 'Weekly Chores', tasks: [] },
    monthly: { label: 'Monthly Routines', tasks: [] },
    quarterly: { label: 'Quarterly Maintenance (3 Months)', tasks: [] },
    biannual: { label: '6-Monthly Servicing (Biannual)', tasks: [] },
    annual: { label: 'Annual Major Works & Compliance', tasks: [] },
    seasonal: { label: 'Seasonal Tasks (Fire / Pruning / Garden)', tasks: [] },
  };

  filteredTasks.forEach(task => {
    const freq = task.frequency || 'monthly';
    if (frequencyGroups[freq]) {
      frequencyGroups[freq].tasks.push(task);
    } else {
      frequencyGroups.monthly.tasks.push(task);
    }
  });

  // Sort tasks in each group by due date
  Object.values(frequencyGroups).forEach(group => {
    group.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  });

  // Timeline grouping (Overdue, Due this month, Due in 1-3 months, Due later)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timelineGroups = {
    overdue: { label: '🚨 Overdue (Action Needed)', tasks: [] },
    dueThisMonth: { label: '📅 Due in Next 30 Days', tasks: [] },
    dueNextQuarter: { label: '⏳ Due in 1 to 3 Months', tasks: [] },
    dueLater: { label: '📆 Scheduled Later This Year', tasks: [] },
  };

  filteredTasks.forEach(task => {
    const target = new Date(task.dueDate);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      timelineGroups.overdue.tasks.push(task);
    } else if (diffDays <= 30) {
      timelineGroups.dueThisMonth.tasks.push(task);
    } else if (diffDays <= 90) {
      timelineGroups.dueNextQuarter.tasks.push(task);
    } else {
      timelineGroups.dueLater.tasks.push(task);
    }
  });

  Object.values(timelineGroups).forEach(group => {
    group.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-meringo-700" />
            <span>Master Maintenance Schedule</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organized recurring routines and projected timeline for your 2-acre property
          </p>
        </div>

        {/* View Mode Toggle & Add Button */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('frequency')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'frequency'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>By Frequency</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>

          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-1.5 bg-meringo-700 hover:bg-meringo-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Render View Mode: By Frequency */}
      {viewMode === 'frequency' && (
        <div className="space-y-8">
          {Object.entries(frequencyGroups).map(([freqKey, group]) => {
            if (group.tasks.length === 0) return null;
            return (
              <div key={freqKey} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <h2 className="text-base font-bold text-slate-800">
                    {group.label}
                  </h2>
                  <span className="text-xs bg-meringo-100 text-meringo-800 font-semibold px-2 py-0.5 rounded-full">
                    {group.tasks.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.tasks.map(task => (
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
              </div>
            );
          })}
        </div>
      )}

      {/* Render View Mode: Timeline */}
      {viewMode === 'timeline' && (
        <div className="space-y-8">
          {Object.entries(timelineGroups).map(([timelineKey, group]) => {
            if (group.tasks.length === 0) return null;
            return (
              <div key={timelineKey} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <h2 className="text-base font-bold text-slate-800">
                    {group.label}
                  </h2>
                  <span className="text-xs bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded-full">
                    {group.tasks.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.tasks.map(task => (
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
