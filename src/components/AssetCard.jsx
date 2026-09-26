import React from 'react';
import { 
  Wrench, 
  MapPin, 
  Calendar, 
  Tag, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  ExternalLink,
  ClipboardList
} from 'lucide-react';
import { CATEGORY_META } from './TaskCard.jsx';

export default function AssetCard({ 
  asset, 
  linkedTasks = [], 
  onEdit, 
  onDelete, 
  onAddTaskForAsset,
  onViewTasks
}) {
  const catMeta = CATEGORY_META[asset.category] || { 
    label: asset.category, 
    color: 'bg-slate-100 text-slate-800 border-slate-200', 
    icon: Wrench 
  };
  const CategoryIcon = catMeta.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div className="p-5">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${catMeta.color}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            {catMeta.label}
          </span>

          {asset.location && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
              <MapPin className="w-3 h-3 text-slate-400" />
              {asset.location}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          {asset.name}
        </h3>

        {/* Make & Model */}
        {asset.makeModel && (
          <p className="text-xs font-medium text-meringo-700 mt-0.5">
            {asset.makeModel}
          </p>
        )}

        {/* Serial Number & Dates */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          {asset.serialNumber && (
            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
              S/N: {asset.serialNumber}
            </span>
          )}
          {asset.installationDate && (
            <span>Installed: {asset.installationDate}</span>
          )}
          {asset.warrantyExpiry && (
            <span>Warranty: {asset.warrantyExpiry}</span>
          )}
        </div>

        {/* Key Specs Key-Value Table */}
        {asset.specs && Object.keys(asset.specs).length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Specifications & Part Numbers
            </h4>
            <dl className="grid grid-cols-1 gap-1 text-xs">
              {Object.entries(asset.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-0.5 border-b border-slate-50">
                  <dt className="text-slate-500 font-medium">{key}:</dt>
                  <dd className="text-slate-800 text-right font-medium max-w-[65%] truncate" title={value}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Notes */}
        {asset.notes && (
          <p className="mt-3 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
            {asset.notes}
          </p>
        )}
      </div>

      {/* Footer & Action Bar */}
      <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs">
        <button
          onClick={() => onViewTasks && onViewTasks(asset.id)}
          className="flex items-center gap-1 font-semibold text-meringo-700 hover:text-meringo-800"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>{linkedTasks.length} {linkedTasks.length === 1 ? 'Task' : 'Tasks'} Scheduled</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onAddTaskForAsset(asset)}
            className="p-1.5 text-slate-500 hover:text-meringo-700 hover:bg-slate-200/60 rounded"
            title="Add task for this asset"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(asset)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded"
            title="Edit Asset"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(asset.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
            title="Delete Asset"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
