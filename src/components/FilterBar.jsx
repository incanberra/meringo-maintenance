import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CATEGORY_META } from './TaskCard.jsx';

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedUrgency,
  setSelectedUrgency,
  selectedSeason,
  setSelectedSeason
}) {
  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedUrgency !== 'all' || selectedSeason !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedUrgency('all');
    setSelectedSeason('all');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search maintenance tasks, filters, instructions, appliances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-meringo-500 focus:border-meringo-500 text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-meringo-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_META).map(([key, meta]) => (
              <option key={key} value={key}>{meta.label}</option>
            ))}
          </select>

          {/* Urgency Dropdown */}
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-meringo-500"
          >
            <option value="all">All Statuses</option>
            <option value="overdue">Overdue Only 🚨</option>
            <option value="due-week">Due Next 7 Days ⏳</option>
            <option value="due-month">Due Next 30 Days 📅</option>
          </select>

          {/* Season Filter */}
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-meringo-500"
          >
            <option value="all">All Seasons</option>
            <option value="spring">Spring (Bushfire Prep)</option>
            <option value="summer">Summer (Peak Bushfire)</option>
            <option value="autumn">Autumn (Flue & Decks)</option>
            <option value="winter">Winter (Pruning/Heaters)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
