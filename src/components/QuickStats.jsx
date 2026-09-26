import React from 'react';
import { AlertCircle, Clock, CalendarDays, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { getCurrentSeason } from '../services/dateUtils.js';

export default function QuickStats({ tasks, logs, assets, onFilterSelect }) {
  const currentSeason = getCurrentSeason();

  // Calculate statistics
  let overdue = 0;
  let dueThisWeek = 0;
  let dueThisMonth = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tasks.forEach(task => {
    if (!task.dueDate) return;
    const target = new Date(task.dueDate);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      overdue++;
    } else if (diffDays <= 7) {
      dueThisWeek++;
    } else if (diffDays <= 30) {
      dueThisMonth++;
    }
  });

  const cards = [
    {
      id: 'overdue',
      label: 'Overdue Items',
      value: overdue,
      icon: AlertCircle,
      color: overdue > 0 ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-slate-600 bg-slate-50 border-slate-200',
      badgeColor: overdue > 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700',
      description: overdue > 0 ? 'Requires immediate attention' : 'All up to date!',
      onClick: () => onFilterSelect && onFilterSelect('overdue')
    },
    {
      id: 'due-week',
      label: 'Due This Week',
      value: dueThisWeek,
      icon: Clock,
      color: dueThisWeek > 0 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-slate-600 bg-slate-50 border-slate-200',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Next 7 days',
      onClick: () => onFilterSelect && onFilterSelect('due-week')
    },
    {
      id: 'due-month',
      label: 'Due This Month',
      value: dueThisMonth,
      icon: CalendarDays,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      badgeColor: 'bg-sky-100 text-sky-800',
      description: 'Next 30 days',
      onClick: () => onFilterSelect && onFilterSelect('due-month')
    },
    {
      id: 'completed',
      label: 'Maintenance Done',
      value: logs.length,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Historical records logged',
      onClick: () => onFilterSelect && onFilterSelect('completed')
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {card.label}
              </span>
              <Icon className="w-5 h-5 opacity-80" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {card.value}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 truncate">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
