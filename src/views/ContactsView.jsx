import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, PlusCircle, Trash2, Edit3, User, Wrench } from 'lucide-react';

export default function ContactsView({ 
  contacts, 
  onAddContact, 
  onDeleteContact 
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    trade: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newContact.name.trim()) return;
    onAddContact(newContact);
    setNewContact({ name: '', trade: '', phone: '', email: '', address: '', notes: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-meringo-700" />
            <span>Local Trades & Service Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Trusted contractors and technicians servicing Meringo, Moruya, and the Eurobodalla area
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-meringo-700 hover:bg-meringo-600 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Contact</span>
        </button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contacts.map(contact => (
          <div
            key={contact.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-meringo-50 text-meringo-800 px-2 py-0.5 rounded border border-meringo-200/60">
                  {contact.trade}
                </span>
                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors"
                  title="Delete contact"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {contact.name}
              </h3>

              <div className="mt-3 space-y-2 text-xs">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 text-meringo-700 hover:text-meringo-900 font-medium"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{contact.phone}</span>
                  </a>
                )}

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                )}

                {contact.address && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{contact.address}</span>
                  </div>
                )}
              </div>

              {contact.notes && (
                <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {contact.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-base font-bold text-slate-900">Add Service Contractor</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company / Contractor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Coast AWTS Specialist"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Trade Specialty *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWTS Technician, Pump Plumber, Chimney Sweep"
                  value={newContact.trade}
                  onChange={(e) => setNewContact(prev => ({ ...prev, trade: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="0400 123 456"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="service@example.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Town / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Moruya NSW 2537"
                  value={newContact.address}
                  onChange={(e) => setNewContact(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Notes</label>
                <textarea
                  rows={2}
                  placeholder="Notes, hourly rate, emergency availability..."
                  value={newContact.notes}
                  onChange={(e) => setNewContact(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-meringo-700 text-white rounded-lg font-semibold hover:bg-meringo-600"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
