import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

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

export default function AssetModal({ 
  isOpen, 
  onClose, 
  onSave, 
  assetToEdit 
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'water',
    location: '',
    makeModel: '',
    serialNumber: '',
    installationDate: '',
    warrantyExpiry: '',
    notes: '',
  });

  const [specsList, setSpecsList] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    if (assetToEdit) {
      setFormData({
        name: assetToEdit.name || '',
        category: assetToEdit.category || 'water',
        location: assetToEdit.location || '',
        makeModel: assetToEdit.makeModel || '',
        serialNumber: assetToEdit.serialNumber || '',
        installationDate: assetToEdit.installationDate || '',
        warrantyExpiry: assetToEdit.warrantyExpiry || '',
        notes: assetToEdit.notes || '',
      });

      if (assetToEdit.specs && Object.keys(assetToEdit.specs).length > 0) {
        setSpecsList(
          Object.entries(assetToEdit.specs).map(([k, v]) => ({ key: k, value: v }))
        );
      } else {
        setSpecsList([{ key: '', value: '' }]);
      }
    } else {
      setFormData({
        name: '',
        category: 'water',
        location: '',
        makeModel: '',
        serialNumber: '',
        installationDate: '',
        warrantyExpiry: '',
        notes: '',
      });
      setSpecsList([{ key: '', value: '' }]);
    }
  }, [assetToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSpecChange = (index, field, val) => {
    const updated = [...specsList];
    updated[index][field] = val;
    setSpecsList(updated);
  };

  const addSpecRow = () => {
    setSpecsList(prev => [...prev, { key: '', value: '' }]);
  };

  const removeSpecRow = (index) => {
    const updated = specsList.filter((_, i) => i !== index);
    setSpecsList(updated.length ? updated : [{ key: '', value: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Convert specs list to object
    const specsObj = {};
    specsList.forEach(item => {
      if (item.key.trim() && item.value.trim()) {
        specsObj[item.key.trim()] = item.value.trim();
      }
    });

    onSave({
      ...(assetToEdit ? assetToEdit : {}),
      ...formData,
      specs: specsObj
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {assetToEdit ? 'Edit Asset & Appliance' : 'Register New Asset or Appliance'}
            </h2>
            <p className="text-xs text-slate-500">Record specs, model numbers, warranty, and location</p>
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
          {/* Asset Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Asset / Appliance Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Honda Petrol Bushfire Pump, Taylex AWTS, Daikin AC"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
            />
          </div>

          {/* Category & Location */}
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
                Location on Property
              </label>
              <input
                type="text"
                placeholder="e.g. Shed Workshop, Tank Pad, Living Room"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>
          </div>

          {/* Make/Model & Serial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Make & Model
              </label>
              <input
                type="text"
                placeholder="e.g. Davey Honda GX160 Twin Impeller"
                value={formData.makeModel}
                onChange={(e) => setFormData(prev => ({ ...prev, makeModel: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Serial Number / Asset Tag
              </label>
              <input
                type="text"
                placeholder="e.g. SN-8492049"
                value={formData.serialNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Installation / Purchase Date
              </label>
              <input
                type="date"
                value={formData.installationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, installationDate: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Warranty Expiry Date
              </label>
              <input
                type="date"
                value={formData.warrantyExpiry}
                onChange={(e) => setFormData(prev => ({ ...prev, warrantyExpiry: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
              />
            </div>
          </div>

          {/* Specs Key-Value Table */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Specifications, Filter Sizes & Part Codes
              </label>
              <button
                type="button"
                onClick={addSpecRow}
                className="text-xs text-meringo-700 hover:text-meringo-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Spec
              </button>
            </div>
            <div className="space-y-2">
              {specsList.map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Specification (e.g. Oil Type, Filter Size)"
                    value={row.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    className="w-1/2 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 10W-30 Synthetic, 20x4.5 inch)"
                    value={row.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    className="w-1/2 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500"
                  />
                  {specsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecRow(idx)}
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
              General Maintenance Notes / Manual Link
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Replacement parts stocked at Moruya Mowers. Keep fuel petcock turned off when not running."
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
              {assetToEdit ? 'Save Asset' : 'Register Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
