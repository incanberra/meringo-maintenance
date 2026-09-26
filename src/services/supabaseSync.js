/**
 * Lightweight Supabase Client and Sync Engine using native fetch
 * Eliminates large client dependencies while providing seamless REST sync
 */

export const SUPABASE_SQL_SCHEMA = `-- Supabase SQL Setup for Meringo Property Maintenance
-- Run this in your Supabase project's SQL Editor (https://app.supabase.com)

create table if not exists meringo_assets (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists meringo_tasks (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists meringo_logs (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists meringo_contacts (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table meringo_assets enable row level security;
alter table meringo_tasks enable row level security;
alter table meringo_logs enable row level security;
alter table meringo_contacts enable row level security;

-- Allow public access with project anon key
create policy "Allow all on meringo_assets" on meringo_assets for all using (true) with check (true);
create policy "Allow all on meringo_tasks" on meringo_tasks for all using (true) with check (true);
create policy "Allow all on meringo_logs" on meringo_logs for all using (true) with check (true);
create policy "Allow all on meringo_contacts" on meringo_contacts for all using (true) with check (true);
`;

export const supabaseSync = {
  // Test connection to Supabase instance
  async testConnection(url, anonKey) {
    if (!url || !anonKey) {
      return { success: false, error: 'URL and Anon Key are required.' };
    }

    const cleanUrl = url.trim().replace(/\/$/, '');
    try {
      const response = await fetch(`${cleanUrl}/rest/v1/meringo_tasks?select=count`, {
        method: 'HEAD',
        headers: {
          'apikey': anonKey.trim(),
          'Authorization': `Bearer ${anonKey.trim()}`
        }
      });

      if (response.ok || response.status === 200 || response.status === 206) {
        return { success: true };
      }

      if (response.status === 404 || response.status === 401) {
        // May mean table doesn't exist yet or auth issue
        const errText = await response.text();
        return {
          success: false,
          error: `Connected to Supabase, but received status ${response.status}. Have you executed the SQL schema script in Supabase? Details: ${errText || 'Unauthorized or table missing'}`
        };
      }

      return { success: false, error: `Connection returned HTTP ${response.status}: ${response.statusText}` };
    } catch (err) {
      return { success: false, error: `Network error: ${err.message}. Check that the URL is correct.` };
    }
  },

  // Push all local data to Supabase
  async pushData(url, anonKey, { assets, tasks, logs, contacts }) {
    const cleanUrl = url.trim().replace(/\/$/, '');
    const headers = {
      'apikey': anonKey.trim(),
      'Authorization': `Bearer ${anonKey.trim()}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    };

    try {
      // Upsert assets
      if (assets && assets.length > 0) {
        const payload = assets.map(a => ({ id: a.id, data: a, updated_at: new Date().toISOString() }));
        await fetch(`${cleanUrl}/rest/v1/meringo_assets`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }

      // Upsert tasks
      if (tasks && tasks.length > 0) {
        const payload = tasks.map(t => ({ id: t.id, data: t, updated_at: new Date().toISOString() }));
        await fetch(`${cleanUrl}/rest/v1/meringo_tasks`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }

      // Upsert logs
      if (logs && logs.length > 0) {
        const payload = logs.map(l => ({ id: l.id, data: l, updated_at: new Date().toISOString() }));
        await fetch(`${cleanUrl}/rest/v1/meringo_logs`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }

      // Upsert contacts
      if (contacts && contacts.length > 0) {
        const payload = contacts.map(c => ({ id: c.id, data: c, updated_at: new Date().toISOString() }));
        await fetch(`${cleanUrl}/rest/v1/meringo_contacts`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Pull all data from Supabase
  async pullData(url, anonKey) {
    const cleanUrl = url.trim().replace(/\/$/, '');
    const headers = {
      'apikey': anonKey.trim(),
      'Authorization': `Bearer ${anonKey.trim()}`
    };

    try {
      const [assetsRes, tasksRes, logsRes, contactsRes] = await Promise.all([
        fetch(`${cleanUrl}/rest/v1/meringo_assets?select=*`, { headers }),
        fetch(`${cleanUrl}/rest/v1/meringo_tasks?select=*`, { headers }),
        fetch(`${cleanUrl}/rest/v1/meringo_logs?select=*`, { headers }),
        fetch(`${cleanUrl}/rest/v1/meringo_contacts?select=*`, { headers })
      ]);

      const [assetsRaw, tasksRaw, logsRaw, contactsRaw] = await Promise.all([
        assetsRes.ok ? assetsRes.json() : [],
        tasksRes.ok ? tasksRes.json() : [],
        logsRes.ok ? logsRes.json() : [],
        contactsRes.ok ? contactsRes.json() : []
      ]);

      return {
        success: true,
        data: {
          assets: assetsRaw.map(item => item.data),
          tasks: tasksRaw.map(item => item.data),
          logs: logsRaw.map(item => item.data),
          contacts: contactsRaw.map(item => item.data)
        }
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
