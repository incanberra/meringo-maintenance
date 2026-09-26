import React, { useState } from 'react';
import AssetCard from '../components/AssetCard.jsx';
import { Wrench, PlusCircle, Search, Filter } from 'lucide-react';
import { CATEGORY_META } from '../components/TaskCard.jsx';

export default function AssetsView({ 
  assets, 
  tasks, 
  onAddAsset, 
  onEditAsset, 
  onDeleteAsset, 
  onAddTaskForAsset,
  onViewTasks 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAssets = assets.filter(asset => {
    if (selectedCategory !== 'all' && asset.category !== selectedCategory) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = asset.name.toLowerCase().includes(q);
      const matchModel = (asset.makeModel || '').toLowerCase().includes(q);
      const matchSerial = (asset.serialNumber || '').toLowerCase().includes(q);
      const matchLocation = (asset.location || '').toLowerCase().includes(q);
      const matchNotes = (asset.notes || '').toLowerCase().includes(q);
      if (!matchName && !matchModel && !matchSerial && !matchLocation && !matchNotes) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-meringo-700" />
            <span>Asset & Appliance Dossier</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain make, model, filter sizes, and service records for all property systems
          </p>
        </div>

        <button
          onClick={onAddAsset}
          className="flex items-center gap-1.5 bg-meringo-700 hover:bg-meringo-600 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Asset</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search equipment, models, serial numbers, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-meringo-500 text-slate-900"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-meringo-500"
        >
          <option value="all">All Categories ({assets.length})</option>
          {Object.entries(CATEGORY_META).map(([key, meta]) => {
            const count = assets.filter(a => a.category === key).length;
            if (count === 0) return null;
            return (
              <option key={key} value={key}>{meta.label} ({count})</option>
            );
          })}
        </select>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">No assets found</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or register a new piece of equipment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssets.map(asset => {
            const linked = tasks.filter(t => t.assetId === asset.id);
            return (
              <AssetCard
                key={asset.id}
                asset={asset}
                linkedTasks={linked}
                onEdit={onEditAsset}
                onDelete={onDeleteAsset}
                onAddTaskForAsset={onAddTaskForAsset}
                onViewTasks={onViewTasks}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
