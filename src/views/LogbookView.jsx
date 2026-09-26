import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  DollarSign, 
  Clock, 
  User, 
  Trash2, 
  PlusCircle, 
  Calendar, 
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { formatDisplayDate } from '../services/dateUtils.js';

export default function LogbookView({ 
  logs, 
  tasks, 
  assets, 
  onDeleteLog,
  onRecordAdhoc 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWho, setFilterWho] = useState('all');

  // Asset lookup
  const assetMap = {};
  assets.forEach(a => {
    assetMap[a.id] = a;
  });

  const filteredLogs = logs.filter(log => {
    if (filterWho === 'self' && log.completedBy !== 'Self') return false;
    if (filterWho === 'trade' && log.completedBy === 'Self') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (log.taskTitle || '').toLowerCase().includes(q);
      const matchNotes = (log.notes || '').toLowerCase().includes(q);
      const matchWho = (log.completedBy || '').toLowerCase().includes(q);
      const asset = assetMap[log.assetId];
      const matchAsset = asset ? asset.name.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchNotes && !matchWho && !matchAsset) return false;
    }

    return true;
  });

  // Calculate totals
  const totalCost = filteredLogs.reduce((sum, log) => sum + (Number(log.cost) || 0), 0);
  const totalHours = filteredLogs.reduce((sum, log) => sum + (Number(log.durationMinutes) || 0), 0) / 60;

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Task', 'Asset', 'Completed By', 'Cost (AUD)', 'Duration (Mins)', 'Notes', 'Next Due Date'];
    const rows = filteredLogs.map(l => [
      l.completedDate,
      `"${(l.taskTitle || '').replace(/"/g, '""')}"`,
      `"${assetMap[l.assetId] ? assetMap[l.assetId].name.replace(/"/g, '""') : ''}"`,
      `"${(l.completedBy || '').replace(/"/g, '""')}"`,
      l.cost || 0,
      l.durationMinutes || 0,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      l.nextDueDate || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `meringo-maintenance-log-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-meringo-700" />
            <span>Maintenance Logbook & History</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete chronological audit trail of all completed servicing, repairs, and compliance inspections
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onRecordAdhoc}
            className="flex items-center gap-1.5 bg-meringo-700 hover:bg-meringo-600 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Ad-hoc Work</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Logs</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{filteredLogs.length}</p>
          <span className="text-[11px] text-slate-400">Total logged entries</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recorded Spend</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">${totalCost.toFixed(2)} AUD</p>
          <span className="text-[11px] text-slate-400">Parts, filters & contractors</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Effort</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalHours.toFixed(1)} Hours</p>
          <span className="text-[11px] text-slate-400">Time invested in homestead</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search completed logs, notes, contractor names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-meringo-500 text-slate-900"
          />
        </div>

        <select
          value={filterWho}
          onChange={(e) => setFilterWho(e.target.value)}
          className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-meringo-500"
        >
          <option value="all">All Service Providers</option>
          <option value="self">DIY / Self Only</option>
          <option value="trade">Contractor / Trade Only</option>
        </select>
      </div>

      {/* Log Entries Table / List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <ClipboardList className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No maintenance records match</p>
            <p className="text-xs text-slate-400 mt-1">Mark a scheduled task as done or log ad-hoc repair work.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLogs.map(log => {
              const linkedAsset = assetMap[log.assetId];
              return (
                <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {formatDisplayDate(log.completedDate)}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {log.taskTitle}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                        {linkedAsset && (
                          <span className="text-meringo-700 font-medium">
                            Asset: {linkedAsset.name}
                          </span>
                        )}
                        <span>Completed by: <strong className="text-slate-700">{log.completedBy}</strong></span>
                        {log.cost > 0 && (
                          <span className="font-semibold text-emerald-700">Cost: ${log.cost.toFixed(2)} AUD</span>
                        )}
                        {log.durationMinutes > 0 && (
                          <span>Duration: {log.durationMinutes} mins</span>
                        )}
                        {log.nextDueDate && (
                          <span className="text-slate-400">Next due: {formatDisplayDate(log.nextDueDate)}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors self-end sm:self-center"
                      title="Delete log record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {log.notes && (
                    <div className="mt-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700">
                      <p className="italic">"{log.notes}"</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
