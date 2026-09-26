export const DEFAULT_ASSETS = [
  {
    id: "asset-water-tanks",
    name: "Rainwater Tanks (4x 22,500L) & Pressure Pump",
    category: "water",
    location: "House Perimeter / Tank Pad",
    makeModel: "Four Poly 22,500L Tanks (90,000L Total Capacity) + Pressure Pump",
    serialNumber: "PMP-84920-X",
    installationDate: "2026-04-28",
    warrantyExpiry: "2036-04-28",
    manualUrl: "",
    specs: {
      "Capacity": "4x 22,500L Poly Tanks (90,000L Total Storage)",
      "Filtration": "None installed yet (Direct tank-to-pump supply)",
      "Plumbing Contractor": "Anthony Good Plumbing (Tony Good, Moruya)",
      "Equalization": "Bottom manifold balancing valves between all 4 tanks",
      "Pump Type": "Constant Pressure Variable Speed Pump with Controller",
      "First Flush": "Dual downpipe first-flush diverters connected to pit"
    },
    notes: "Four interconnected 22,500L poly tanks (90,000L total capacity) plumbed by Tony Good Plumbing (Invoices INV-1541 & INV-1561). Currently operating without in-line filtration. Check inlet leaf strainers across all four tanks and ensure bottom balancing valves remain open."
  },
  {
    id: "asset-awts",
    name: "Aerated Wastewater Treatment System (AWTS)",
    category: "wastewater",
    location: "Lower Acreage / Effluent Irrigation Zone",
    makeModel: "Secondary Aerated Wastewater Treatment System",
    serialNumber: "AWTS-77291-C",
    installationDate: "2024-02-10",
    warrantyExpiry: "2039-02-10",
    manualUrl: "https://www.bluengrey.com.au",
    specs: {
      "Service Contractor": "BluenGrey Water & Septic Solutions (10 Page St, Moruya)",
      "Service Phone": "1300 764 558 / service@bluengrey.com.au",
      "Service Frequency": "Quarterly (Every 3 months)",
      "Typical Service Cost": "$125.00 AUD per quarter",
      "Disinfection": "Calcium Hypochlorite chlorine tablets in feeder tube",
      "Council Compliance": "Reports submitted directly to Eurobodalla Shire Council"
    },
    notes: "Maintained under scheduled contract by BluenGrey Water & Septic Solutions. They perform quarterly inspections, test chlorine levels, check aeration blower/pumps, and submit reports to Eurobodalla Shire Council."
  },
  {
    id: "asset-fire-pump",
    name: "Dedicated Petrol Bushfire Pump & Hoses",
    category: "bushfire",
    location: "Water Tank Pad / Fire Station",
    makeModel: "Davey Honda GX160 5.5HP Twin Impeller Firefighter",
    serialNumber: "HON-GX160-5592",
    installationDate: "2024-04-01",
    warrantyExpiry: "2027-04-01",
    manualUrl: "",
    specs: {
      "Engine": "Honda GX160 4-stroke petrol",
      "Oil Type": "SAE 10W-30 (0.6L capacity)",
      "Fuel": "Unleaded 91 with fuel stabilizer (turnover 6-monthly)",
      "Fittings": "65mm Storz suction coupling + dual 25mm delivery outlets",
      "Hoses": "2x 30m canvas fire hoses with brass fog/jet nozzles"
    },
    notes: "Crucial bushfire defence asset at Meringo. Servicing and spark plugs supported locally by Moruya Mowers. Test run monthly."
  },
  {
    id: "asset-wood-fire",
    name: "Slow Combustion Wood Fireplace & Flue",
    category: "heating",
    location: "Living Room",
    makeModel: "Cast Iron Slow Combustion Wood Heater",
    serialNumber: "WOD-33918-B",
    installationDate: "2026-07-15",
    warrantyExpiry: "2036-07-15",
    manualUrl: "",
    specs: {
      "Installed By": "M J Smith Carpentry Services (Michael Smith)",
      "Flue Type": "6-inch triple skin stainless steel flue kit through roof",
      "Door Seal": "12mm high-temp ceramic glass rope seal",
      "Fuel": "Seasoned Australian hardwood (spotted gum, ironbark, box)"
    },
    notes: "Installed during renovation by Michael Smith. Sweep chimney flue annually in Autumn before winter lighting."
  },
  {
    id: "asset-ac-splits",
    name: "Reverse-Cycle Air Conditioning (Split Systems)",
    category: "cooling",
    location: "Main Living & Master Bedroom",
    makeModel: "Daikin Inverter Reverse Cycle Systems",
    serialNumber: "DAIK-CORA-9812",
    installationDate: "2026-02-25",
    warrantyExpiry: "2031-02-25",
    manualUrl: "",
    specs: {
      "Service Contractor": "South Coast Heating and Cooling (Moruya)",
      "Refrigerant": "R32 Eco-Friendly Refrigerant",
      "Filters": "Washable air purifying mesh filters",
      "Outdoor Units": "Anti-corrosion treated fin coils (coastal protection)"
    },
    notes: "Roughed in and serviced by South Coast Heating and Cooling (INV-0472). Wash indoor filters quarterly; rinse outdoor compressor coils of salt spray."
  },
  {
    id: "asset-heat-pump-hw",
    name: "Heat Pump Hot Water System",
    category: "hotwater",
    location: "Southern Exterior Wall",
    makeModel: "High-Efficiency CO2 Heat Pump Hot Water System",
    serialNumber: "HP-315L-4482",
    installationDate: "2025-06-24",
    warrantyExpiry: "2035-06-24",
    manualUrl: "",
    specs: {
      "Installer": "O'Brien Plumbing Batemans Bay (Invoice 38994)",
      "Capacity": "315L Marine-Grade Stainless Steel Cylinder",
      "Relief Valve": "1400 kPa PTR Valve (AS 3500)",
      "Controller": "Smart timer set for off-peak / solar generation window"
    },
    notes: "Installed by O'Brien Plumbing. Ease pressure relief valve every 6 months. Clean evaporator air filter."
  },
  {
    id: "asset-ride-on-mower",
    name: "Ride-On Lawn Mower / Slasher",
    category: "machinery",
    location: "Main Machinery Shed",
    makeModel: "Husqvarna / John Deere 42\" Hydrostatic Ride-On",
    serialNumber: "MOW-42H-6712",
    installationDate: "2024-05-10",
    warrantyExpiry: "2027-05-10",
    manualUrl: "",
    specs: {
      "Engine": "Briggs & Stratton / Kohler 22HP V-Twin",
      "Oil Capacity": "1.8L (10W-30 Synthetic)",
      "Deck": "42-inch reinforced stamped steel cutting deck",
      "Local Dealer": "Moruya Mowers & Power Equipment"
    },
    notes: "Essential for managing 2-acre lawn and bushfire asset protection zone. Service engine every 25-50 hours."
  },
  {
    id: "asset-brushcutter-chainsaw",
    name: "Stihl Brushcutter & Chainsaw Kit",
    category: "machinery",
    location: "Machinery Shed Workshop",
    makeModel: "Stihl FS 91 Brushcutter & MS 251 Wood Chainsaw",
    serialNumber: "STIHL-FS91-MS251",
    installationDate: "2024-06-01",
    warrantyExpiry: "2026-06-01",
    manualUrl: "",
    specs: {
      "Fuel Mix": "50:1 2-Stroke Premix (Stihl HP Ultra Synthetic Oil)",
      "Chainsaw Bar": "18-inch bar, .325\" pitch chain",
      "Local Dealer": "Moruya Mowers (Stihl Dealer)"
    },
    notes: "Keep chains sharp with 4.8mm file. Always use fresh 2-stroke fuel."
  },
  {
    id: "asset-front-deck",
    name: "Front Deck (Merbau)",
    category: "house",
    location: "Front Entrance & North Veranda",
    makeModel: "Merbau Hardwood Decking on Substructure",
    serialNumber: "N/A",
    installationDate: "2024-01-01",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Timber Type": "Merbau Hardwood (Kwila)",
      "Finish": "Cutek CD50 / Intergrain Merbau penetrating decking oil",
      "Fasteners": "Stainless steel decking screws"
    },
    notes: "Front deck is Merbau hardwood. Wash down coastal salt spray quarterly; apply fresh penetrating Merbau oil coat every 12 to 18 months."
  },
  {
    id: "asset-rear-deck",
    name: "Rear Deck (Deteriorating Blackbutt)",
    category: "house",
    location: "Rear Veranda & House Access",
    makeModel: "Blackbutt Hardwood Decking (Aging / Deteriorating)",
    serialNumber: "N/A",
    installationDate: "Provisional",
    warrantyExpiry: "Requires Restoration",
    manualUrl: "",
    specs: {
      "Timber Type": "Blackbutt Hardwood",
      "Current Condition": "Deteriorating — inspect for rot, soft spots, and loose boards",
      "Builder Contact": "M J Smith Carpentry Services (Michael Smith, 0452 483 487)",
      "Action Required": "Regular structural checks; evaluate board replacement vs rebuilding"
    },
    notes: "Rear Blackbutt deck is showing signs of deterioration. Conduct 6-monthly inspections for soft rot and board safety. Plan restorative treatment or rebuild with Michael Smith."
  },
  {
    id: "asset-pest-barrier",
    name: "Termite & Pest Barrier System",
    category: "house",
    location: "Subfloor & House Perimeter",
    makeModel: "Perimeter Termite Barrier & Subfloor Bait Stations",
    serialNumber: "JOB-02168",
    installationDate: "2025-07-28",
    warrantyExpiry: "Annual Inspection Required",
    manualUrl: "",
    specs: {
      "Pest Inspector": "Bates Pest Control (Myrle Payne, 0428 711 701)",
      "Location": "Batehaven NSW 2536",
      "Standard": "Australian Standard AS 3660.2 Timber Pest Inspection"
    },
    notes: "Annual inspection and monitoring by Bates Pest Control (Invoice 02168). Inspect ant capping, subfloor weepholes, and roof void."
  },
  {
    id: "asset-citrus-veggie",
    name: "Citrus Trees (Lemon & Mandarin) & Vegetable Garden",
    category: "garden",
    location: "Garden & House Surrounds",
    makeModel: "Productive Lemon & Mandarin Trees + Vegetable Garden Beds",
    serialNumber: "N/A",
    installationDate: "Established",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Fruit Trees": "Lemon and Mandarin citrus varieties",
      "Garden Beds": "Vegetable garden beds on drip irrigation",
      "Fertiliser & Supplies": "Moruya Ag Horse & Pet (organic citrus food, compost, mulch)"
    },
    notes: "Regular citrus fertilising in Spring and late Summer with organic citrus food; fruit fly monitoring lures; seasonal vegetable planting."
  },
  {
    id: "asset-gutters-ember",
    name: "Roof Gutters, Valleys & Ember Guards",
    category: "bushfire",
    location: "House & Shed Rooflines",
    makeModel: "Colorbond Quad Gutters + Aluminium Leaf Stopper 2mm Ember Mesh",
    serialNumber: "N/A",
    installationDate: "2026-06-26",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Material": "CSIRO fire-tested non-combustible aluminium ember mesh",
      "Downpipe Outlets": "Leaf deflector diverters connected to rainwater tanks"
    },
    notes: "Crucial bushfire maintenance. Keep all roof valleys, gutters, and downpipes clear of gum leaves before bushfire season."
  }
];
