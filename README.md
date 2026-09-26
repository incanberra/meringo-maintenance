# 🌿 Meringo Homestead — Property Maintenance Tracker

A dedicated, mobile-friendly personal web application designed specifically for a **2-acre coastal-rural property at Meringo, NSW** (Eurobodalla Shire).

Hosted directly on **GitHub Pages**, it runs **local-first** with zero initial configuration, provides one-click JSON backup & restore, and includes optional **Supabase cloud sync** for real-time synchronization between your phone while out on the property and your home computer.

---

## ✨ Features Tailored for Meringo Acreage

1. **Dashboard (Due vs Done)**
   - Clear KPI cards: Overdue items, Due This Week, Due Next 30 Days, Completed logs.
   - Visual urgency alerts (e.g. overdue chlorine tablet checks, pre-fire-season gutter clearance).
   - Instant "Mark Done" action that records who completed it, duration, costs, and automatically calculates the next due date based on frequency.
   - Quick "Snooze" actions (+1 week or +1 month).

2. **Pre-Configured Property Systems & Appliances**
   - **Water & Pumps**: Rainwater tanks (45,000L), inlet leaf strainers, first-flush diverters, household pressure pump, and whole-house 20" jumbo sediment/carbon filters.
   - **Wastewater**: Aerated Wastewater Treatment System (AWTS - Taylex/Fuji Clean) with quarterly council compliance inspection routines, monthly chlorine tablet dispenser checks, and paddock irrigation line inspections.
   - **Bushfire Readiness**: Dedicated Honda GX160 petrol fire pump (monthly test-run & 6-month fuel turnover), fire hose reels & Storz couplings, roof gutter & ember guard cleaning, and 20m Asset Protection Zone (APZ) slashing.
   - **Heating & Cooling**: Slow-combustion wood heater (autumn chimney flue sweeping, door rope seal test), and Daikin reverse-cycle air conditioner filter washing and outdoor coil salt-washdown.
   - **Hot Water**: Heat pump hot water system (6-monthly PTR pressure relief valve ease test, air filter and evaporator fin cleaning, sacrificial anode inspection).
   - **Machinery & Grounds**: 42" Ride-on lawn mower / slasher (engine oil, deck scraping, blade sharpening), Stihl brushcutter & chainsaw maintenance.
   - **House & Decks**: Spotted gum hardwood timber veranda oiling/staining, annual termite barrier inspection (AS 3660), and quarterly coastal salt spray washdown.
   - **Garden & Orchard**: Fruit orchard winter pruning & Queensland fruit fly lures, chicken coop deep clean & predator wire checks.

3. **Asset & Appliance Dossier**
   - Make, model, serial numbers, warranty dates, location on property, and detailed specifications (e.g., filter cartridge sizes, engine oil grades, spark plug codes, fuel mix ratios).

4. **Maintenance Logbook & Cost Audit**
   - Complete chronological history of all completed maintenance.
   - Total maintenance spend tracker in AUD ($) and estimated effort in hours.
   - One-click **Export to CSV** for spreadsheets and record keeping.
   - "Record Ad-hoc Work" button to log emergency repairs or unscheduled chores.

5. **Local Trades & Service Directory**
   - Quick-dial and email directory for local contractors servicing the Moruya / Meringo / Eurobodalla area (AWTS accredited technicians, pump plumbers, small engine mechanics, chimney sweeps, pest inspectors, and Council OSSM authority).

---

## 🚀 How to Host on GitHub Pages

This repository is already configured with an automated GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) and relative asset paths (`./` in `vite.config.js`).

### Steps to publish:
1. Push this repository to your GitHub account (e.g., `github.com/<your-username>/meringo-maintenance`).
2. On GitHub, navigate to **Settings** > **Pages** (under Code and automation).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! Every time you push changes to `master` (or `main`), GitHub Actions will automatically build and publish the website to:
   ```
   https://<your-username>.github.io/meringo-maintenance/
   ```

---

## 💾 Data Storage & Optional Supabase Sync

### 1. Local-First by Default
- All your tasks, assets, logs, and contacts are stored directly in your web browser (localStorage / IndexedDB).
- Works offline even down in the paddocks where mobile reception drops.
- **Backup & Restore**: Go to **Settings** (top right cog icon) and click **Export Backup (JSON)**. You can save this backup file to your computer or Google Drive and import it on any device.

### 2. Optional Supabase Cloud Sync (Multi-Device Sync)
If you want automatic synchronization between your phone while walking around the property and your laptop:
1. Create a free account and project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and run the SQL setup script (available directly inside the app under **Settings** > **View Supabase SQL Setup Script**):
   ```sql
   create table if not exists meringo_assets (id text primary key, data jsonb not null, updated_at timestamptz default now());
   create table if not exists meringo_tasks (id text primary key, data jsonb not null, updated_at timestamptz default now());
   create table if not exists meringo_logs (id text primary key, data jsonb not null, updated_at timestamptz default now());
   create table if not exists meringo_contacts (id text primary key, data jsonb not null, updated_at timestamptz default now());

   alter table meringo_assets enable row level security;
   alter table meringo_tasks enable row level security;
   alter table meringo_logs enable row level security;
   alter table meringo_contacts enable row level security;

   create policy "Allow all on meringo_assets" on meringo_assets for all using (true) with check (true);
   create policy "Allow all on meringo_tasks" on meringo_tasks for all using (true) with check (true);
   create policy "Allow all on meringo_logs" on meringo_logs for all using (true) with check (true);
   create policy "Allow all on meringo_contacts" on meringo_contacts for all using (true) with check (true);
   ```
3. In the website, click **Settings** > Enable **Supabase Cloud Synchronization**.
4. Paste your **Supabase Project URL** and **Anon Public Key**.
5. Click **Push to Supabase** to upload your initial property catalogue, and **Pull from Supabase** on any other device to sync!

---

## 🛠️ Local Development

To run or modify the website locally on your computer:

```bash
# Install dependencies
npm install

# Start local development server with hot-reload
npm run dev

# Build production static bundle for GitHub Pages
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for GitHub Pages
├── public/
│   └── favicon.svg             # Property homestead SVG icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header, navigation tabs, overdue badge
│   │   ├── QuickStats.jsx      # Summary metrics (Overdue, Due Week/Month, Logs)
│   │   ├── TaskCard.jsx        # Task card with checklist, urgency & snooze
│   │   ├── TaskModal.jsx       # Modal to create or edit maintenance tasks
│   │   ├── AssetCard.jsx       # Equipment & appliance card with specs
│   │   ├── AssetModal.jsx      # Modal to register equipment and appliances
│   │   ├── LogModal.jsx        # Completion modal with date, cost, and notes
│   │   ├── SyncSettingsModal.jsx # Cloud sync & JSON backup/restore
│   │   └── FilterBar.jsx       # Search, category, urgency, and season filters
│   ├── data/
│   │   ├── defaultAssets.js    # Pre-seeded Meringo 2-acre assets
│   │   ├── defaultTasks.js     # Pre-seeded scheduled maintenance tasks
│   │   └── defaultContacts.js  # Eurobodalla / South Coast trade contacts
│   ├── services/
│   │   ├── storage.js          # Local storage engine with auto-seeding
│   │   ├── supabaseSync.js     # Lightweight Supabase REST client
│   │   └── dateUtils.js        # Recurrence calculation and seasonal logic
│   ├── views/
│   │   ├── DashboardView.jsx   # Overview: Due Now, Due Soon, History
│   │   ├── ScheduleView.jsx    # Recurring frequencies & timeline
│   │   ├── AssetsView.jsx      # Appliance dossier & specifications
│   │   ├── LogbookView.jsx     # Chronological log & cost audit
│   │   └── ContactsView.jsx    # Local trades directory
│   ├── App.jsx                 # Application state coordinator
│   ├── index.css               # Tailwind CSS styles
│   └── main.jsx                # React mount entrypoint
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```
