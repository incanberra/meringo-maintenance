import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar, CheckSquare } from 'lucide-react';

const CATEGORIES = [
  { id: 'water', label: 'Rainwater & Pumps' },
  { id: 'wastewater', label: 'AWTS & Septic' },
  { id: 'bushfire', label: 'Bushfire Readiness' },
  { id: 'heating', label: 'Wood Heating & Flue' },
  { id: 'cooling', label: 'Air Conditioning' },
  { id: 'hotwater', label: 'Heat Pump Hot Water' },
  { id: 'machinery', label: 'Mower & Machinery' },
  { id: 'house', label: 'House & Timber Decks' },
  { id: 'garden', label: 'Orchard & Garden' },
];

export default function TaskModal({ 
  isOpen, 
  onClose, 
  onSave, 
  taskToEdit, 
  assets = [] 
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'water',
    assetId: '',
    frequency: 'monthly',
    intervalMonths: 1,
    dueDate: new Date().toISOString().split('T')[0],
    seasonalTiming: 'all-year',
    estimatedMinutes: 30,
    difficulty: 'easy',
    preferredTrade: 'DIY',
    notes: '',
    checklist: ['']
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        category: taskToEdit.category || 'water',
        assetId: taskToEdit.assetId || '',
        frequency: taskToEdit.frequency || 'monthly',
        intervalMonths: taskToEdit.intervalMonths || 1,
        dueDate: taskToEdit.dueDate || new Date().toISOString().split('T')[0],
        seasonalTiming: taskToEdit.seasonalTiming || 'all-year',
        estimatedMinutes: taskToEdit.estimatedMinutes || 30,
        difficulty: taskToEdit.difficulty || 'easy',
        preferredTrade: taskToEdit.preferredTrade || 'DIY',
        notes: taskToEdit.notes || '',
        checklist: taskToEdit.checklist && taskToEdit.checklist.length > 0 
          ? [...taskToEdit.checklist] 
          : ['']
      });
    } else {
      setFormData({
        title: '',
        category: 'water',
        assetId: assets.length > 0 ? assets[0].id : '',
        frequency: 'monthly',
        intervalMonths: 1,
        dueDate: new Date().toISOString().split('T')[0],
        seasonalTiming: 'all-year',
        estimatedMinutes: 30,
        difficulty: 'easy',
        preferredTrade: 'DIY',
        notes: '',
        checklist: ['']
      });
    }
  }, [taskToEdit, isOpen, assets]);

  if (!isOpen) return null;

  const handleChecklistChange = (index, value) => {
    const updated = [...formData.checklist];
    updated[index] = value;
    setFormData(prev => ({ ...prev, checklist: updated }));
  };

  const addChecklistStep = () => {
    setFormData(prev => ({ ...prev, checklist: [...prev.checklist, ''] }));
  };

  const removeChecklistStep = (index) => {
    const updated = formData.checklist.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, checklist: updated.length ? updated : [''] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Filter out blank checklist items
    const cleanedChecklist = formData.checklist.map(s => s.trim()).filter(Boolean);

    onSave({
      ...(taskToEdit ? taskToEdit : {}),
      ...formData,
      checklist: cleanedChecklist
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {taskToEdit ? 'Edit Maintenance Task' : 'Schedule New Maintenance Task'}
            </h2>
            <p className="text-xs text-slate-500">Configure recurring schedule, checklist steps, and asset link</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Task Name / Action *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Inspect first-flush diverters & clean sediment"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
            />
          </div>

          {/* Category & Asset Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900 bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Linked Asset / Appliance
              </label>
              <select
                value={formData.assetId}
                onChange={(e) => setFormData(prev => ({ ...prev, assetId: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900 bg-white"
              >
                <option value="">(None / General Property)</option>
                {assets.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Frequency & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Recurrence Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900 bg-white"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly (3 Months)</option>
                <option value="biannual">6-Monthly (Biannual)</option>
                <option value="annual">Annual (1 Year)</option>
                <option value="seasonal">Seasonal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Next Due Date *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Estimated Duration (mins)
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={formData.estimatedMinutes}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedMinutes: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>
          </div>

          {/* Difficulty & Preferred Trade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900 bg-white"
              >
                <option value="easy">DIY Easy</option>
                <option value="moderate">DIY Moderate</option>
                <option value="professional">Licensed Trade / Technician</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Trade / Service
              </label>
              <input
                type="text"
                placeholder="e.g. Self, Taylex Technician, Plumber"
                value={formData.preferredTrade}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredTrade: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>
          </div>

          {/* Step-by-Step Checklist */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Step-by-Step Instructions / Checklist
              </label>
              <button
                type="button"
                onClick={addChecklistStep}
                className="text-xs text-meringo-700 hover:text-meringo-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>
            <div className="space-y-2">
              {formData.checklist.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-4 font-mono">{idx + 1}.</span>
                  <input
                    type="text"
                    placeholder={`Step ${idx + 1} instructions...`}
                    value={step}
                    onChange={(e) => handleChecklistChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500"
                  />
                  {formData.checklist.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChecklistStep(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Important Notes / Specs / Part Numbers
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Filter size: 20x4.5 inch 5-micron pleated. Spare O-rings in shed drawer 3."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
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
              className="px-5 py-2 bg-meringo-700 hover:bg-meringo-600 text-white rounded-lg font-semibold shadow-sm transition-colors"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
