export const DEFAULT_ASSETS = [
  {
    id: "asset-water-tanks",
    name: "Rainwater Tanks & Pressure Pump",
    category: "water",
    location: "House Perimeter / Tank Pad",
    makeModel: "Poly 22,500L Tank(s) + Davey / Grundfos Pressure Pump",
    serialNumber: "PMP-84920-X",
    installationDate: "2024-03-15",
    warrantyExpiry: "2029-03-15",
    manualUrl: "",
    specs: {
      "Capacity": "Dual 22,500L Tanks (45,000L Total)",
      "Pump Type": "Variable Speed Constant Pressure Pump with Torrium Controller",
      "Filtration": "Dual Jumbo 20\" Housings (20µm Pleated + 5µm Carbon/Sediment)",
      "UV Unit": "Sterilight 45 LPM UV Chamber"
    },
    notes: "Main drinking water source. Water is harvested from main roof. Ensure first flush is checked after heavy rain."
  },
  {
    id: "asset-awts",
    name: "Aerated Wastewater Treatment System (AWTS)",
    category: "wastewater",
    location: "Lower Yard / Effluent Zone",
    makeModel: "Taylex / Fuji Clean Secondary Treatment System",
    serialNumber: "AWTS-77291-C",
    installationDate: "2024-02-10",
    warrantyExpiry: "2039-02-10",
    manualUrl: "",
    specs: {
      "Treatment Type": "Continuous Aerobic Secondary Treatment + Chlorination",
      "Disinfection": "Slow-dissolving Calcium Hypochlorite Chlorine Tablets",
      "Disposal Area": "Subsurface / dedicated surface drip irrigation line in lower acreage buffer",
      "Council Req": "Eurobodalla Shire Council quarterly compliance report required"
    },
    notes: "Never pour bleach, harsh chemicals, or oils down drains. Accredited technician conducts quarterly inspection."
  },
  {
    id: "asset-fire-pump",
    name: "Dedicated Petrol Bushfire Pump & Hoses",
    category: "bushfire",
    location: "Water Tank Pad / Fire Station",
    makeModel: "Davey 5.5HP Honda GX160 Twin Impeller Firefighter",
    serialNumber: "HON-GX160-5592",
    installationDate: "2024-04-01",
    warrantyExpiry: "2027-04-01",
    manualUrl: "",
    specs: {
      "Engine": "Honda GX160 4-stroke petrol",
      "Oil Type": "SAE 10W-30 (0.6L capacity)",
      "Fuel": "Unleaded 91 with fuel stabilizer",
      "Fittings": "65mm Storz suction coupling + dual 25mm delivery outlets with brass fire nozzles",
      "Hoses": "2x 30m canvas fire hoses with fire nozzles"
    },
    notes: "Critical bushfire defence asset. Keep fuel fresh (turnover every 6 months). Test run every month on the first weekend."
  },
  {
    id: "asset-wood-fire",
    name: "Slow Combustion Wood Fireplace & Flue",
    category: "heating",
    location: "Living Room",
    makeModel: "Nectre / Scandia Cast Iron Wood Heater",
    serialNumber: "WOD-33918-B",
    installationDate: "2023-06-20",
    warrantyExpiry: "2033-06-20",
    manualUrl: "",
    specs: {
      "Flue Type": "6-inch triple skin stainless steel flue kit",
      "Door Seal": "12mm high-temp ceramic glass rope seal",
      "Baffle Plate": "Heavy duty 6mm steel baffle plate",
      "Fuel Type": "Seasoned Australian hardwood (ironbark, spotted gum, boxwood)"
    },
    notes: "Sweep chimney flue every autumn before winter lighting. Check door seal with paper/dollar bill test."
  },
  {
    id: "asset-ac-splits",
    name: "Reverse-Cycle Air Conditioning (Split Systems)",
    category: "cooling",
    location: "Main Living & Master Bedroom",
    makeModel: "Daikin Cora Inverter Reverse Cycle (7.1kW Living, 2.5kW Bed)",
    serialNumber: "DAIK-CORA-9812",
    installationDate: "2024-01-15",
    warrantyExpiry: "2029-01-15",
    manualUrl: "",
    specs: {
      "Refrigerant": "R32 Eco-Friendly Refrigerant",
      "Filters": "Washable Catechin Air Purifying Filters",
      "Outdoor Units": "Anti-corrosion treated fin coils (coastal protection)"
    },
    notes: "Wash filters in warm soapy water every quarter. Keep garden vegetation 1 metre clear around outdoor compressor units."
  },
  {
    id: "asset-heat-pump-hw",
    name: "Heat Pump Hot Water System",
    category: "hotwater",
    location: "Southern Exterior Wall",
    makeModel: "Reclaim Energy / Sanden CO2 Heat Pump (315L Stainless Tank)",
    serialNumber: "HP-315L-4482",
    installationDate: "2024-03-01",
    warrantyExpiry: "2034-03-01",
    manualUrl: "",
    specs: {
      "Refrigerant": "Natural R744 (CO2) - high efficiency in winter",
      "Tank Material": "Marine-grade 316 Stainless Steel Cylinder",
      "Relief Valve": "1400 kPa PTR Valve (Expansion control 1200 kPa)",
      "Controller": "Smart Wi-Fi timer configured for off-peak / solar hours"
    },
    notes: "Ease pressure relief valve gently every 6 months. Clean evaporator fins with soft brush or hose."
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
      "Cutting Deck": "42-inch reinforced stamped steel deck with mulch plug",
      "Blades": "High-lift mulching/slashing blades (Set of 2)"
    },
    notes: "Essential for managing 2-acre lawn and asset protection zone. Wash deck after every use to prevent coastal rust."
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
      "Fuel": "50:1 2-Stroke Premix (Stihl HP Ultra Synthetic Oil)",
      "Chainsaw Chain": ".325\" pitch, 0.050\" gauge, 18-inch bar",
      "Brushcutter Head": "Autocut 25-2 with 2.7mm quiet line + 3-tooth metal grass blade"
    },
    notes: "Keep chains sharp with 4.8mm file. Empty fuel or use stabilizer if stored for more than 2 months."
  },
  {
    id: "asset-decks-verandas",
    name: "Hardwood Timber Decks & Verandas",
    category: "house",
    location: "North & East Verandas",
    makeModel: "Spotted Gum 140x25mm Decking on Galvanised / Hardwood Substructure",
    serialNumber: "N/A",
    installationDate: "2023-11-01",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Area": "Approximately 85 square metres of undercover & exposed decking",
      "Finish": "Intergrain UltraDeck / Cutek CD50 High-Durability Timber Oil",
      "Fasteners": "Grade 316 Marine Stainless Steel Screws"
    },
    notes: "Coastal salt and UV degrade timber quickly. Wash down salt spray quarterly; apply fresh oil coat every 12 to 18 months."
  },
  {
    id: "asset-orchard-veggie",
    name: "Fruit Orchard & Raised Veggie Beds",
    category: "garden",
    location: "Northern Garden Enclosure",
    makeModel: "Enclosed Orchard (Citrus, Stone Fruit, Apples) & 4x Colourbond Raised Beds",
    serialNumber: "N/A",
    installationDate: "2024-07-01",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Trees": "Meyer Lemon, Tahitian Lime, Eureka Lemon, Fuyu Persimmon, Hass Avocado, 2x Apples",
      "Irrigation": "Netafim pressure-compensating drip line on digital tap timer",
      "Netting": "Wildlife-safe 2mm exclusion netting for fruit fly & bird protection"
    },
    notes: "Winter fruit tree pruning, spring fertilising with organic citrus food, regular fruit fly baiting."
  },
  {
    id: "asset-chicken-coop",
    name: "Chicken Coop & Run",
    category: "garden",
    location: "Orchard Rear",
    makeModel: "Heavy Duty Predator-Proof Timber & Fox-Wire Hen House",
    serialNumber: "N/A",
    installationDate: "2024-08-15",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Flock": "6x Isa Brown / Australorp laying hens",
      "Wire": "1.2mm galvanised fox wire with 450mm buried apron skirt",
      "Door": "Automatic light-sensor predator security door"
    },
    notes: "Clean out pine shavings/straw to compost monthly; check predator wire perimeter."
  },
  {
    id: "asset-gutters-ember",
    name: "Roof Gutters, Valleys & Ember Guards",
    category: "bushfire",
    location: "House & Shed Rooflines",
    makeModel: "Colorbond Quad Gutters + Aluminium Leaf Stopper 2mm Ember Mesh",
    serialNumber: "N/A",
    installationDate: "2023-10-01",
    warrantyExpiry: "N/A",
    manualUrl: "",
    specs: {
      "Mesh Material": "Non-combustible aluminium ember mesh (CSIRO fire tested)",
      "Downpipe Outlets": "Leaf deflector diverters on all 6 downpipes"
    },
    notes: "Crucial bushfire maintenance. Keep all roof valleys, gutters, and downpipe screens clear of gum leaves."
  }
];
