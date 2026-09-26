import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, DollarSign, Clock, User, ArrowRight } from 'lucide-react';
import { calculateNextDueDate } from '../services/dateUtils.js';

export default function LogModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  task 
}) {
  const [completedDate, setCompletedDate] = useState(new Date().toISOString().split('T')[0]);
  const [completedBy, setCompletedBy] = useState('Self');
  const [cost, setCost] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [notes, setNotes] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');

  useEffect(() => {
    if (task) {
      const today = new Date().toISOString().split('T')[0];
      setCompletedDate(today);
      setCompletedBy(task.preferredTrade === 'DIY' ? 'Self' : (task.preferredTrade || 'Self'));
      setCost('');
      setDurationMinutes(task.estimatedMinutes || 30);
      setNotes('');
      // Compute projected next due date
      const next = calculateNextDueDate(today, task.frequency, task.intervalMonths);
      setNextDueDate(next);
    }
  }, [task, isOpen]);

  // Recalculate next due date if user alters completion date
  const handleDateChange = (newDate) => {
    setCompletedDate(newDate);
    if (task) {
      const next = calculateNextDueDate(newDate, task.frequency, task.intervalMonths);
      setNextDueDate(next);
    }
  };

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(task.id, {
      completedDate,
      completedBy,
      cost: cost ? parseFloat(cost) : 0,
      durationMinutes: parseInt(durationMinutes, 10) || 0,
      notes: notes.trim() || 'Completed as scheduled.',
      nextDueDate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base sm:text-lg font-bold">
              Record Completed Maintenance
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Summary Banner */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Task</p>
          <p className="text-sm font-bold text-slate-900 mt-0.5">{task.title}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
            <span className="capitalize">Frequency: {task.frequency}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              Next scheduled: <ArrowRight className="w-3 h-3" /> {nextDueDate}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          {/* Date & Who Completed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Completed Date *
              </label>
              <input
                type="date"
                required
                value={completedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Completed By
              </label>
              <input
                type="text"
                placeholder="Self or Contractor Name"
                value={completedBy}
                onChange={(e) => setCompletedBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
              />
            </div>
          </div>

          {/* Cost & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Cost (AUD $)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00 (parts or service)"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
              />
            </div>
          </div>

          {/* Notes & Observations */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Service Notes, Readings or Observations
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Pump started immediately on 2nd pull. Cleaned leaf basket. Checked chlorine tablets (2 added)."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Log Work</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
