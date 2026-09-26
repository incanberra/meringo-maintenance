// Helper to calculate relative date strings YYYY-MM-DD
function getRelativeDate(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

export const DEFAULT_TASKS = [
  // --- WATER SYSTEM ---
  {
    id: "task-water-strainer",
    title: "Inspect Rainwater Tank Inlet Strainers & Clean Leaves",
    category: "water",
    assetId: "asset-water-tanks",
    frequency: "monthly",
    intervalMonths: 1,
    dueDate: getRelativeDate(3), // Due in 3 days
    lastCompletedDate: getRelativeDate(-27),
    seasonalTiming: "all-year",
    estimatedMinutes: 20,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Climb ladder safely to tank access hatch",
      "Remove stainless steel inlet leaf basket from each tank",
      "Empty accumulated eucalyptus leaves and debris into garden bin",
      "Rinse mesh thoroughly with hose water",
      "Inspect mosquito-proof mesh for tears or corrosion before reseating securely"
    ],
    notes: "Eucalyptus oils can taint rainwater taste if leaves decay in the strainer basket."
  },
  {
    id: "task-first-flush",
    title: "First-Flush Diverters Clean & Sediment Purge",
    category: "water",
    assetId: "asset-water-tanks",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(12),
    lastCompletedDate: getRelativeDate(-78),
    seasonalTiming: "all-year",
    estimatedMinutes: 30,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Locate the bottom screw-caps on each downpipe first-flush diverter pipe",
      "Unscrew caps slowly and discharge settled silt and muddy water into a bucket or garden",
      "Remove the internal floating sealing ball and wash away any grime",
      "Inspect the flow control washer / trickle outlet nozzle for blockages",
      "Screw caps back on securely (hand tight with silicone grease if needed)"
    ],
    notes: "Clean after major coastal rain events or dry windy spells."
  },
  {
    id: "task-water-filters",
    title: "Whole-House Sediment & Carbon Filter Replacement",
    category: "water",
    assetId: "asset-water-tanks",
    frequency: "biannual",
    intervalMonths: 6,
    dueDate: getRelativeDate(25),
    lastCompletedDate: getRelativeDate(-155),
    seasonalTiming: "all-year",
    estimatedMinutes: 45,
    difficulty: "moderate",
    preferredTrade: "DIY / Plumber",
    checklist: [
      "Turn off the power to the pressure pump and shut the main water supply valve",
      "Open nearest cold garden tap to relieve line pressure",
      "Use filter housing spanner wrench to unscrew Stage 1 (20µm) and Stage 2 (5µm) filter bowls",
      "Wash inside of filter housings with clean water and dilute food-grade hydrogen peroxide / mild soap",
      "Inspect black rubber O-rings, apply food-grade silicone lube",
      "Insert new 20\" jumbo replacement filter cartridges in correct direction",
      "Screw housings on tight by hand, turn water back on slowly, and bleed air purge valve until water flows smoothly"
    ],
    notes: "Replacement filters: 20\" x 4.5\" Jumbo Pleated 20 Micron + Carbon Block 5 Micron."
  },
  {
    id: "task-pressure-pump-check",
    title: "Household Pressure Pump Inspection & Prime Check",
    category: "water",
    assetId: "asset-water-tanks",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(45),
    lastCompletedDate: getRelativeDate(-45),
    seasonalTiming: "all-year",
    estimatedMinutes: 20,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Inspect pump housing, unions and isolation valves for weeping or leaks",
      "Listen for unusual bearing noise or rapid cycling when taps are turned off",
      "Check Torrium / electronic pressure controller LED status indicators (green healthy)",
      "Ensure weatherproof pump cover is well ventilated and free of spider webs/wasp nests"
    ],
    notes: "Keep spare Torrium controller or pump capacitor in shed for emergency."
  },

  // --- WASTEWATER (AWTS) ---
  {
    id: "task-awts-quarterly-service",
    title: "AWTS Quarterly Certified Compliance Service",
    category: "wastewater",
    assetId: "asset-awts",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(18),
    lastCompletedDate: getRelativeDate(-72),
    seasonalTiming: "all-year",
    estimatedMinutes: 60,
    difficulty: "professional",
    preferredTrade: "Taylex / Fuji Clean Certified Technician (South Coast)",
    checklist: [
      "Licensed technician inspects aeration blower motor and air filters",
      "Test dissolved oxygen levels and sludge blanket depth in clarifier",
      "Check submersible irrigation pump amp draw and float switch operation",
      "Test effluent residual chlorine ppm and clarity",
      "Technician submits quarterly compliance report to Eurobodalla Shire Council"
    ],
    notes: "Ensure technician emails a copy of the Council Service Report for home records."
  },
  {
    id: "task-awts-chlorine-dispenser",
    title: "AWTS Chlorine Disinfection Tablet Check",
    category: "wastewater",
    assetId: "asset-awts",
    frequency: "monthly",
    intervalMonths: 1,
    dueDate: getRelativeDate(-2), // OVERDUE by 2 days!
    lastCompletedDate: getRelativeDate(-32),
    seasonalTiming: "all-year",
    estimatedMinutes: 15,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Wear protective gloves and safety glasses",
      "Open disinfection chamber access lid carefully (avoid inhaling gas)",
      "Inspect chlorine tablet dispenser feeder tube",
      "Replenish with 2-3 approved slow-dissolving Calcium Hypochlorite tablets if depleted",
      "Ensure tablets slide down tube freely to make contact with treated water flow"
    ],
    notes: "Only use Calcium Hypochlorite tablets approved for AWTS. NEVER use swimming pool trichlor tablets!"
  },
  {
    id: "task-awts-irrigation-walk",
    title: "Walk Effluent Irrigation Line & Spray Heads",
    category: "wastewater",
    assetId: "asset-awts",
    frequency: "monthly",
    intervalMonths: 1,
    dueDate: getRelativeDate(8),
    lastCompletedDate: getRelativeDate(-22),
    seasonalTiming: "all-year",
    estimatedMinutes: 20,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Walk the designated effluent disposal area in lower acreage",
      "Check for surface pooling, excessive boggy ground or foul odours",
      "Inspect purple reclaimed-water warning signs along boundary fence line",
      "Clear any overgrown grass or blackberry encroaching on spray/drip heads"
    ],
    notes: "Council requires irrigation zone to remain signposted and free of grazing livestock."
  },

  // --- BUSHFIRE READINESS & DEFENCE ---
  {
    id: "task-fire-pump-run-test",
    title: "Petrol Fire Pump Monthly Test-Run & Fuel Check",
    category: "bushfire",
    assetId: "asset-fire-pump",
    frequency: "monthly",
    intervalMonths: 1,
    dueDate: getRelativeDate(1), // Due tomorrow
    lastCompletedDate: getRelativeDate(-29),
    seasonalTiming: "all-year",
    estimatedMinutes: 25,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Check engine oil dipstick (level must be between marks, clean amber color)",
      "Check petrol level; ensure fresh fuel with stabilizer",
      "Open suction valve to rainwater tank supply",
      "Connect delivery fire hose with closed nozzle",
      "Turn on fuel tap, set choke, set throttle to 1/3, switch ignition ON",
      "Pull start cord; once running smoothly, open choke and run for 5-10 minutes under pressure",
      "Test fire nozzle spray pattern (jet and wide fog)",
      "Shut down engine with kill switch, close fuel petcock, and top up tank with fresh petrol"
    ],
    notes: "Meringo bushfire safety requirement. Fuel should be cycled and refreshed every 6 months."
  },
  {
    id: "task-fire-hoses-storz",
    title: "Inspect Fire Hoses, Nozzles & Storz Couplings",
    category: "bushfire",
    assetId: "asset-fire-pump",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(35),
    lastCompletedDate: getRelativeDate(-55),
    seasonalTiming: "all-year",
    estimatedMinutes: 30,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Unroll both 30m canvas fire hoses completely",
      "Inspect jacket for rodent chew marks, mildew, or perishing",
      "Inspect Storz aluminum couplings; clean dirt and lubricate rubber gaskets with silicone spray",
      "Test brass fire nozzles for smooth rotation between solid stream, fog, and shut-off",
      "Drain water completely, roll tightly (female coupling outside), and store in UV-protected locker"
    ],
    notes: "Keep fittings matching RFS standard (65mm Storz to 25mm / 38mm hose)."
  },
  {
    id: "task-apz-slashing",
    title: "Asset Protection Zone (APZ) Slashing & Buffer Clearing",
    category: "bushfire",
    assetId: "asset-ride-on-mower",
    frequency: "seasonal",
    intervalMonths: 3,
    dueDate: getRelativeDate(14),
    lastCompletedDate: getRelativeDate(-76),
    seasonalTiming: "spring",
    estimatedMinutes: 180,
    difficulty: "moderate",
    preferredTrade: "DIY / Tractor Slasher",
    checklist: [
      "Slash grass within 20-30m of house to under 100mm height",
      "Rake and remove dried grass clippings and accumulated bark away from foundations",
      "Prune low-hanging tree branches under 2 metres from ground level (prevent flame laddering)",
      "Clear 5-metre zone around gas bottles, pump house, and woodpile"
    ],
    notes: "Priority during Spring leading into NSW South Coast bushfire season (October - March)."
  },
  {
    id: "task-gutters-valleys",
    title: "Clear Roof Gutters, Valleys & Ember Guards",
    category: "bushfire",
    assetId: "asset-gutters-ember",
    frequency: "monthly",
    intervalMonths: 1,
    dueDate: getRelativeDate(-5), // OVERDUE by 5 days!
    lastCompletedDate: getRelativeDate(-35),
    seasonalTiming: "all-year",
    estimatedMinutes: 60,
    difficulty: "moderate",
    preferredTrade: "DIY / Gutter Cleaning Service",
    checklist: [
      "Inspect roof valleys and gutters with sturdy ladder and fall arrest gear",
      "Blow or brush all dry eucalyptus leaves, gum nuts and pine needles off roof",
      "Check aluminium ember mesh seals tightly against roof corrugations with no gaps > 2mm",
      "Flush gutter downpipes and verify downpipe leaf guards are free-flowing"
    ],
    notes: "Eucalyptus leaf litter in gutters is the #1 ignition cause for houses in bushfires."
  },

  // --- HEATING & COOLING ---
  {
    id: "task-wood-flue-sweep",
    title: "Wood Fireplace Chimney Flue Sweep & Inspection",
    category: "heating",
    assetId: "asset-wood-fire",
    frequency: "annual",
    intervalMonths: 12,
    dueDate: getRelativeDate(180), // Due in Autumn
    lastCompletedDate: getRelativeDate(-185),
    seasonalTiming: "autumn",
    estimatedMinutes: 90,
    difficulty: "moderate",
    preferredTrade: "DIY / Professional Chimney Sweep",
    checklist: [
      "Seal firebox opening with plastic sheeting and duct tape to contain soot",
      "Climb roof to remove chimney cowl / bird guard",
      "Pass wire chimney brush down the stainless steel flue from top to bottom 3-4 times",
      "Check flue cowl for creosote buildup or damaged spark arrestor mesh",
      "Vacuum soot from firebox baffle plate and hearth",
      "Inspect firebricks for cracks and replace if crumbling"
    ],
    notes: "Annual sweep prevents dangerous chimney flue fires and improves winter heating efficiency."
  },
  {
    id: "task-wood-door-rope",
    title: "Wood Heater Door Rope Seal 'Dollar Bill' Test",
    category: "heating",
    assetId: "asset-wood-fire",
    frequency: "annual",
    intervalMonths: 12,
    dueDate: getRelativeDate(190),
    lastCompletedDate: getRelativeDate(-175),
    seasonalTiming: "autumn",
    estimatedMinutes: 20,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Insert a paper note / dollar bill between door glass seal and firebox frame",
      "Latch door closed firmly and try pulling the paper out",
      "Repeat around all four sides of the door perimeter",
      "If paper pulls out easily without friction, the ceramic rope seal is compressed and needs replacement",
      "Check door latch mechanism and adjust striker plate if necessary"
    ],
    notes: "A tight seal prevents uncontrolled air intake that burns through firewood too quickly."
  },
  {
    id: "task-ac-filter-clean",
    title: "Reverse-Cycle Air Con Indoor Filter Wash & Clean",
    category: "cooling",
    assetId: "asset-ac-splits",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(6),
    lastCompletedDate: getRelativeDate(-84),
    seasonalTiming: "all-year",
    estimatedMinutes: 30,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Pop open front grille of living room and bedroom indoor split units",
      "Slide out mesh dust filter screens",
      "Vacuum loose dust, then wash gently under warm running tap water with mild detergent",
      "Allow filters to air dry completely in shade before reinstalling",
      "Wipe indoor louvres and wipe dust sensor"
    ],
    notes: "Clean filters reduce power consumption by up to 15% and prevent dust mites."
  },
  {
    id: "task-ac-outdoor-coils",
    title: "Inspect Air Con Outdoor Compressor Fin Clearance & Salt Wash",
    category: "cooling",
    assetId: "asset-ac-splits",
    frequency: "biannual",
    intervalMonths: 6,
    dueDate: getRelativeDate(40),
    lastCompletedDate: getRelativeDate(-140),
    seasonalTiming: "all-year",
    estimatedMinutes: 30,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Check 1-metre perimeter around outdoor condenser units is clear of overgrown shrubs and tall grass",
      "Gently rinse exterior condenser aluminum heat exchanger coils with low pressure garden hose (never high pressure)",
      "Remove spider webs and check that condenser condensation drain pipe discharges cleanly away from building foundation"
    ],
    notes: "Coastal salt air can corrode aluminium condenser fins if not periodically rinsed."
  },

  // --- HOT WATER (HEAT PUMP) ---
  {
    id: "task-heatpump-ptr-valve",
    title: "Heat Pump Hot Water PTR Valve Ease Test",
    category: "hotwater",
    assetId: "asset-heat-pump-hw",
    frequency: "biannual",
    intervalMonths: 6,
    dueDate: getRelativeDate(10),
    lastCompletedDate: getRelativeDate(-170),
    seasonalTiming: "all-year",
    estimatedMinutes: 10,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Locate the brass Pressure Temperature Relief (PTR) valve near top of hot water cylinder",
      "Stand clear of the drain line outlet (water will be scalding hot)",
      "Gently lift the test lever for 5 seconds until hot water discharges freely through drain pipe",
      "Release the lever smoothly and confirm water stops flowing completely",
      "If valve drips continuously after release, contact a plumber for valve replacement"
    ],
    notes: "Prevents pressure buildup in cylinder. Australian Standard AS 3500 recommends 6-monthly test."
  },
  {
    id: "task-heatpump-fins-clean",
    title: "Heat Pump Evaporator Fins & Fan Air Intake Clean",
    category: "hotwater",
    assetId: "asset-heat-pump-hw",
    frequency: "biannual",
    intervalMonths: 6,
    dueDate: getRelativeDate(70),
    lastCompletedDate: getRelativeDate(-110),
    seasonalTiming: "all-year",
    estimatedMinutes: 20,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Switch off electrical isolator switch on heat pump unit before cleaning",
      "Inspect rear evaporator coil fins for leaf debris, cobwebs, or dirt",
      "Use a soft nylon brush or vacuum with brush attachment to gently clear debris (do not bend delicate fins)",
      "Check condensate drain tray and drain hose for blockages",
      "Turn isolator switch back ON and verify quiet fan startup"
    ],
    notes: "Maintains optimal coefficient of performance (COP) especially in cool winter temperatures."
  },

  // --- MACHINERY & GROUNDS ---
  {
    id: "task-mower-oil-service",
    title: "Ride-On Mower Engine Oil & Air Filter Service",
    category: "machinery",
    assetId: "asset-ride-on-mower",
    frequency: "biannual",
    intervalMonths: 6,
    dueDate: getRelativeDate(20),
    lastCompletedDate: getRelativeDate(-160),
    seasonalTiming: "spring",
    estimatedMinutes: 60,
    difficulty: "moderate",
    preferredTrade: "DIY / Small Engine Mechanic",
    checklist: [
      "Run mower engine for 3 minutes to warm oil for easier draining",
      "Place drain pan under engine drain hose, unclip plug, and drain warm oil completely",
      "Replace spin-on oil filter if fitted (lube rubber gasket with fresh oil)",
      "Refill with 1.8L SAE 10W-30 synthetic 4-stroke small engine oil to upper dipstick mark",
      "Remove air filter cartridge; tap out loose dust or replace paper element",
      "Check tire pressures: Front 14 PSI, Rear 10 PSI"
    ],
    notes: "Eurobodalla small engine mechanics recommend servicing every 50 operating hours or 6 months."
  },
  {
    id: "task-mower-deck-blades",
    title: "Ride-On Mower Deck Clean & Blade Sharpening",
    category: "machinery",
    assetId: "asset-ride-on-mower",
    frequency: "biannual",
    intervalMonths: 6,
    dueDate: getRelativeDate(50),
    lastCompletedDate: getRelativeDate(-130),
    seasonalTiming: "all-year",
    estimatedMinutes: 60,
    difficulty: "moderate",
    preferredTrade: "DIY / Mechanic",
    checklist: [
      "Disconnect spark plug lead for safety before touching cutting deck",
      "Use deck wash port or jack front of mower onto solid stands",
      "Scrape caked grass cuttings from underneath deck to prevent rust",
      "Inspect mower blades for nicks, bending, or excessive wear",
      "Sharpen blade cutting edge with angle grinder or file, and check balance on balancing cone"
    ],
    notes: "Sharp blades cut cleanly without tearing grass tips, promoting healthy pasture growth."
  },
  {
    id: "task-brushcutter-chainsaw-check",
    title: "Chainsaw Sharpening, Bar Oil & Brushcutter Maintenance",
    category: "machinery",
    assetId: "asset-brushcutter-chainsaw",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(15),
    lastCompletedDate: getRelativeDate(-75),
    seasonalTiming: "all-year",
    estimatedMinutes: 45,
    difficulty: "moderate",
    preferredTrade: "DIY",
    checklist: [
      "Sharpen chainsaw cutters with round 4.8mm file at 30-degree angle",
      "Flip guide bar upside down to ensure even groove wear, and clean bar rail groove",
      "Check chainsaw automatic chain oiler delivery against a piece of cardboard",
      "Reload brushcutter line head with 2.7mm commercial grade round line",
      "Clean spark arrestor screen in muffler with wire brush"
    ],
    notes: "Never use old or cloudy 2-stroke fuel; fresh fuel protects small 2-stroke carburettors."
  },

  // --- HOUSE & DECKS ---
  {
    id: "task-decks-oiling",
    title: "Spotted Gum Verandas & Decks Clean & Re-Oil",
    category: "house",
    assetId: "asset-decks-verandas",
    frequency: "annual",
    intervalMonths: 12,
    dueDate: getRelativeDate(90),
    lastCompletedDate: getRelativeDate(-275),
    seasonalTiming: "autumn",
    estimatedMinutes: 240,
    difficulty: "moderate",
    preferredTrade: "DIY / Painter",
    checklist: [
      "Move all outdoor furniture and BBQ off timber decks",
      "Clean decking boards with sodium percarbonate / deck cleaner to remove dirt, mildew, and salt residue",
      "Allow 48 hours for timber to dry thoroughly",
      "Apply 1-2 generous coats of penetrating decking oil (e.g. Cutek CD50 or Intergrain) with lamb's wool applicator",
      "Wipe off any excess unabsorbed oil after 30 minutes to prevent tacky finish"
    ],
    notes: "Vital in Meringo's coastal environment to prevent grey UV bleaching and wood splitting."
  },
  {
    id: "task-termite-inspection",
    title: "Annual Professional Pest & Termite Barrier Inspection",
    category: "house",
    assetId: "asset-decks-verandas",
    frequency: "annual",
    intervalMonths: 12,
    dueDate: getRelativeDate(60),
    lastCompletedDate: getRelativeDate(-305),
    seasonalTiming: "all-year",
    estimatedMinutes: 90,
    difficulty: "professional",
    preferredTrade: "Eurobodalla Pest Control / Licensed Inspector",
    checklist: [
      "Licensed pest inspector examines subfloor, perimeter weepholes, and ant capping",
      "Inspect roof void with thermal imaging / moisture meter for termite activity",
      "Check external garden mulch, timber sleepers, and boundary tree stumps within 50m of dwelling",
      "Receive written Australian Standard AS 3660.2 Timber Pest Inspection Report"
    ],
    notes: "High eucalyptus forest area has high subterranean termite pressure (Coptotermes acinaciformis)."
  },
  {
    id: "task-coastal-salt-washdown",
    title: "Exterior Cladding & Window Track Salt Spray Washdown",
    category: "house",
    assetId: "asset-decks-verandas",
    frequency: "quarterly",
    intervalMonths: 3,
    dueDate: getRelativeDate(5),
    lastCompletedDate: getRelativeDate(-85),
    seasonalTiming: "all-year",
    estimatedMinutes: 60,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Hose down exterior cladding, window screens, and soffits with fresh tank water",
      "Vacuum and wipe coastal grit out of aluminium sliding door and window tracks",
      "Lubricate window hinges and stainless door latches with dry PTFE spray (avoid sticky grease)"
    ],
    notes: "Extends life of powdercoated aluminium and prevents lock mechanisms jamming from salt air."
  },

  // --- GARDEN & VEGGIES ---
  {
    id: "task-orchard-fruit-fly",
    title: "Fruit Orchard Pruning, Feeding & Fruit Fly Traps",
    category: "garden",
    assetId: "asset-orchard-veggie",
    frequency: "seasonal",
    intervalMonths: 3,
    dueDate: getRelativeDate(11),
    lastCompletedDate: getRelativeDate(-79),
    seasonalTiming: "spring",
    estimatedMinutes: 90,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Feed citrus and deciduous trees with pelletized organic poultry manure and trace elements",
      "Hang fresh Queensland Fruit Fly (Qfly) pheromone lures in lemon, lime, and stone fruit trees",
      "Inspect drip irrigation line emitters; run manual 10-minute test cycle",
      "Top up compost / sugarcane mulch around drip-line (keep 10cm clear of tree trunks)"
    ],
    notes: "Hang fruit fly traps by early spring before fruit develops colour to break breeding cycle."
  },
  {
    id: "task-chicken-coop-clean",
    title: "Chicken Coop Deep Clean, Straw Refresh & Predator Check",
    category: "garden",
    assetId: "asset-chicken-coop",
    frequency: "monthly",
    intervalMonths: 1,
    dueDate: getRelativeDate(4),
    lastCompletedDate: getRelativeDate(-26),
    seasonalTiming: "all-year",
    estimatedMinutes: 45,
    difficulty: "easy",
    preferredTrade: "DIY",
    checklist: [
      "Shovel out soiled straw/bedding directly to vegetable garden compost heap",
      "Sprinkle diatomaceous earth on roosting perches and nesting boxes for mite prevention",
      "Add fresh sweet-smelling pine shavings or clean straw to nest boxes",
      "Inspect exterior predator wire skirt around coop perimeter for fox digging signs",
      "Test automatic light-sensor door battery and ensure smooth sliding track"
    ],
    notes: "Foxes are active along the Meringo coastal headland bush."
  }
];
