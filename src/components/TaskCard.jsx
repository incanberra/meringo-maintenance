import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2, 
  Wrench, 
  Flame, 
  Droplets, 
  Waves, 
  Thermometer, 
  Wind, 
  TreePine, 
  Home, 
  CheckSquare, 
  Square,
  FastForward
} from 'lucide-react';
import { formatFriendlyDate, formatDisplayDate, getTaskUrgency } from '../services/dateUtils.js';

export const CATEGORY_META = {
  water: { label: 'Rainwater & Pumps', color: 'bg-sky-100 text-sky-800 border-sky-200', icon: Droplets },
  wastewater: { label: 'AWTS & Septic', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Waves },
  bushfire: { label: 'Bushfire Readiness', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: Flame },
  heating: { label: 'Wood Heating & Flue', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Flame },
  cooling: { label: 'Air Conditioning', color: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: Wind },
  hotwater: { label: 'Heat Pump Hot Water', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: Thermometer },
  machinery: { label: 'Mower & Machinery', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Wrench },
  house: { label: 'House & Timber Decks', color: 'bg-stone-100 text-stone-800 border-stone-200', icon: Home },
  garden: { label: 'Orchard & Garden', color: 'bg-lime-100 text-lime-800 border-lime-200', icon: TreePine },
};

export default function TaskCard({ 
  task, 
  asset, 
  onMarkDone, 
  onEdit, 
  onDelete, 
  onSnooze 
}) {
  const [expanded, setExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const urgency = getTaskUrgency(task.dueDate);
  const catMeta = CATEGORY_META[task.category] || { 
    label: task.category, 
    color: 'bg-slate-100 text-slate-800 border-slate-200', 
    icon: Wrench 
  };
  const CategoryIcon = catMeta.icon;

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Determine urgency styling
  let urgencyBadge = (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
      <Calendar className="w-3 h-3" />
      {formatFriendlyDate(task.dueDate)}
    </span>
  );

  if (urgency === 'overdue') {
    urgencyBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
        <AlertCircle className="w-3 h-3 text-rose-600 animate-pulse" />
        {formatFriendlyDate(task.dueDate)}
      </span>
    );
  } else if (urgency === 'today' || urgency === 'due-soon') {
    urgencyBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-600" />
        {formatFriendlyDate(task.dueDate)}
      </span>
    );
  }

  return (
    <div className={`bg-white rounded-xl border shadow-sm transition-all hover:shadow-md ${
      urgency === 'overdue' ? 'border-rose-300 ring-1 ring-rose-200/50' : 'border-slate-200'
    }`}>
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          {/* Category Badge */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${catMeta.color}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            {catMeta.label}
          </span>

          {/* Due date urgency badge */}
          {urgencyBadge}
        </div>

        {/* Task Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
          {task.title}
        </h3>

        {/* Asset link & Frequency meta */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-2 text-xs text-slate-500">
          {asset && (
            <span className="flex items-center gap-1 text-meringo-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-meringo-600"></span>
              {asset.name}
            </span>
          )}

          <span className="capitalize">
            • {task.frequency} {task.seasonalTiming && task.seasonalTiming !== 'all-year' ? `(${task.seasonalTiming})` : ''}
          </span>

          {task.estimatedMinutes && (
            <span>• ~{task.estimatedMinutes} mins</span>
          )}

          {task.difficulty && (
            <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
              task.difficulty === 'professional' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
              task.difficulty === 'moderate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {task.difficulty === 'professional' ? 'Licensed Trade' : task.difficulty === 'moderate' ? 'DIY Moderate' : 'DIY Easy'}
            </span>
          )}
        </div>

        {/* Notes preview */}
        {task.notes && (
          <p className="mt-2 text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
            💡 {task.notes}
          </p>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onMarkDone(task)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Done</span>
            </button>

            {/* Snooze Options */}
            <button
              onClick={() => onSnooze(task, 7)}
              title="Snooze 7 days"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <FastForward className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">+1 Wk</span>
            </button>

            <button
              onClick={() => onSnooze(task, 30)}
              title="Snooze 30 days"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <FastForward className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">+1 Mo</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {task.checklist && task.checklist.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
              >
                <span>{task.checklist.length} steps</span>
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Edit Task"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable Step-by-Step Checklist */}
        {expanded && task.checklist && task.checklist.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Step-by-Step Instructions:
            </h4>
            <div className="space-y-1.5">
              {task.checklist.map((step, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none"
                  >
                    <span className="mt-0.5 text-slate-400">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </span>
                    <span className={isChecked ? 'line-through text-slate-400' : ''}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
