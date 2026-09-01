export interface ExperienceItem {
  title: string;
  category: string;
  text: string;
  image: string;
  tag?: string;
}

export interface ParkLocationItem {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  text: string;
  image: string;
  features: string[];
  specs?: { label: string; value: string }[];
  pinCoords: { top: string; left: string };
}

export interface FacilityItem {
  name: string;
  image: string;
  desc: string;
  tag?: string;
}

export interface MenuItem {
  name: string;
  type: 'veg' | 'non-veg';
  desc: string;
  tag: string;
  kitchen: string;
}

export interface CampingOption {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  icon: string;
  image: string;
}

export interface PassPackage {
  id: string;
  title: string;
  badge: string;
  price: string;
  period: string;
  duration: string;
  popular?: boolean;
  desc: string;
  features: string[];
  highlights: { icon: string; text: string }[];
}

// Community Booking Packages & Passes (Official Pricing & Track Access)
export const bookingPackages: PassPackage[] = [
  {
    id: 'day-pass-moto',
    title: 'Day Pass (Motorcycle)',
    badge: 'DAY PASS • 2-WHEELER',
    price: '₹1,000',
    period: 'per rider',
    duration: '8:00 AM – 8:00 PM (6 Hours Track Access)',
    popular: false,
    desc: '6 hours total track access (Ride anytime between 8:00 AM – 8:00 PM) for adventure motorcycles and dual-sports.',
    features: [
      '6 Hours total track access (8:00 AM – 8:00 PM)',
      'Natural stream water crossing & rockbed trails',
      'Entry to The Nest Eco-Café view terrace deck',
      'Access to Workshop wash & checkup bay',
      'Clean hygiene hub access (3 Toilets + 3 Showers)'
    ],
    highlights: [
      { icon: '🏍️', text: 'Motorcycle' },
      { icon: '⏱️', text: '6h Track Access' },
      { icon: '🌊', text: 'Water Crossing' }
    ]
  },
  {
    id: 'day-pass-car',
    title: 'Day Pass (Car / 4×4)',
    badge: 'DAY PASS • 4X4 VEHICLE',
    price: '₹1,500',
    period: 'per vehicle',
    duration: '8:00 AM – 8:00 PM (6 Hours Track Access)',
    popular: false,
    desc: '6 hours total track access (Ride anytime between 8:00 AM – 8:00 PM) for 4x4 SUVs, Gypsy, Thar, and off-road vehicles.',
    features: [
      '6 Hours total track access (8:00 AM – 8:00 PM)',
      'Water crossing & off-road track arena',
      '4x4 standby winch recovery support on site',
      'Entry to The Nest Eco-Café view terrace deck',
      'Clean hygiene hub access (Private Washrooms & Showers)'
    ],
    highlights: [
      { icon: '🚙', text: 'Car / 4×4' },
      { icon: '⏱️', text: '6h Track Access' },
      { icon: '🛡️', text: 'Winch Standby' }
    ]
  },
  {
    id: '24h-pass-moto',
    title: '24-Hour Pass (Motorcycle)',
    badge: 'OVERNIGHT • 2-WHEELER',
    price: '₹1,500',
    period: 'per rider',
    duration: '24 Hours (8h Track Access + Overnight)',
    popular: false,
    desc: '8 hours total track access (6 hours regular daytime + exclusive early morning session ~5:00 AM – 8:00 AM). Includes overnight access.',
    features: [
      '8 Hours total track access (6h daytime + 2h dawn session)',
      'Exclusive early morning track session (5:00 AM – 8:00 AM)',
      'Overnight sanctuary access & campfire gathering',
      'Park your motorcycle in front of your camping pitch',
      'Full hygiene hub access with clean toilets & hot showers'
    ],
    highlights: [
      { icon: '🏍️', text: 'Motorcycle' },
      { icon: '🌅', text: 'Dawn Session 5AM' },
      { icon: '🏕️', text: 'Overnight Access' }
    ]
  },
  {
    id: '24h-pass-car',
    title: '24-Hour Pass (Car / 4×4)',
    badge: 'OVERNIGHT • 4X4 VEHICLE',
    price: '₹2,500',
    period: 'per vehicle',
    duration: '24 Hours (8h Track Access + Overnight)',
    popular: true,
    desc: '8 hours total track access (6 hours regular daytime + exclusive early morning session ~5:00 AM – 8:00 AM). Includes overnight access.',
    features: [
      '8 Hours total track access (6h daytime + 2h dawn session)',
      'Exclusive early morning track session (5:00 AM – 8:00 AM)',
      'Overnight sanctuary access & campfire gathering',
      'Direct vehicle parking alongside camping pitch',
      '4x4 recovery crew standby & full workshop access'
    ],
    highlights: [
      { icon: '🚙', text: 'Car / 4×4' },
      { icon: '🌅', text: 'Dawn Session 5AM' },
      { icon: '★', text: 'Most Popular' }
    ]
  },
  {
    id: 'rent-parinda-tent',
    title: 'Rent a Parinda Tent',
    badge: 'CAMPING STAY',
    price: '₹500',
    period: 'per night (Up to 2 people)',
    duration: 'Overnight Stay (Check-in 2:00 PM)',
    popular: false,
    desc: 'Includes Tent, Bedding, Bedsheet, Blanket, and Pillow. (Capacity: Up to 2 people).',
    features: [
      'Pitched high-grade waterproof tent setup',
      'Full Bedding, Clean Bedsheet, Blanket & 2 Pillows',
      'Capacity: Up to 2 guests',
      'Quiet terraced campsite with parking space in front',
      '24/7 Access to 3 clean private toilets & 3 hot showers'
    ],
    highlights: [
      { icon: '🏕️', text: 'Tent + Bedding' },
      { icon: '👥', text: 'Up to 2 People' },
      { icon: '🚿', text: 'Toilets & Showers' }
    ]
  },
  {
    id: 'bring-own-tent',
    title: 'Bring Your Own Tent (BYOT)',
    badge: 'CAMPING STAY',
    price: '₹250',
    period: 'per night',
    duration: 'Overnight Stay (Check-in 2:00 PM)',
    popular: false,
    desc: 'Guests may pitch and use their own tent in the designated camping area.',
    features: [
      'Pitch your own tent in the designated camping zone',
      'Park your vehicle quietly directly in front of your pitch',
      'Campfire deck and evening community gatherings',
      '24/7 Access to 3 clean private toilets & 3 hot showers',
      'Workshop tool assistance for gear/tent setup'
    ],
    highlights: [
      { icon: '🎒', text: 'Pitch Own Tent' },
      { icon: '📍', text: 'Designated Area' },
      { icon: '🚿', text: 'Toilets & Showers' }
    ]
  }
];

// Camping Tier Options (Forest, Family, Friends)
export const campingOptions: CampingOption[] = [
  {
    id: 'forest-wilderness',
    title: 'Forest Wilderness Camp',
    tagline: 'Deep Natural Woods & Serenity',
    desc: 'Nestled directly under the forest canopy. Listen to the wind through the trees and immerse yourself in pristine untouched nature.',
    features: [
      'Pure forest serenity with natural shade',
      'Park your vehicle quietly outside your tent',
      'Zero-honking strict quiet zone policy',
      'Direct access to natural hiking & walking trails'
    ],
    icon: '🌲',
    image: '/images/forest-camping-real.jpg'
  },
  {
    id: 'family-getaway',
    title: 'Family Adventure Camp',
    tagline: 'Safe, Spacious & Rejuvenating',
    desc: 'Spacious terraced camping zones designed for families to unwind, stargaze, and introduce kids to the wonders of the great outdoors.',
    features: [
      'Spacious pitched tents with comfortable bedding',
      'Dedicated family bonfire seating circles',
      'Close proximity to 3 clean private toilets & 3 showers',
      'Safe, serene environment for all ages'
    ],
    icon: '👨‍👩‍👧‍👦',
    image: '/images/forest-camping-real.jpg'
  },
  {
    id: 'friends-riders',
    title: 'Friends & Community Basecamp',
    tagline: 'Camaraderie Under The Open Sky',
    desc: 'The ultimate weekend group basecamp. Gather around the crackling campfire, recount the day’s trail drives, and stargaze with your crew.',
    features: [
      'Group cluster camping layout around central fire pit',
      'Quiet vehicle parking beside each pitch',
      'Acoustic campfire storytelling & BBQ ready',
      'Fast access to morning trail departure'
    ],
    icon: '🚙',
    image: '/images/forest-camping-real.jpg'
  }
];

// The Nest Cafe: 6 Curated Items (Strictly Separate Veg & Non-Veg Kitchens)
export const nestMenuItems: MenuItem[] = [
  {
    name: 'Smoked Woodfire Margherita / Paneer Crisp',
    type: 'veg',
    desc: 'Handmade thin crust baked in an outdoor clay oven with garden herbs and fresh mozzarella.',
    tag: 'Woodfire Oven',
    kitchen: 'Dedicated 100% Pure Veg Kitchen'
  },
  {
    name: 'High-Altitude Himalayan Lentil & Rice Bowl',
    type: 'veg',
    desc: 'Nutritious mountain grains, slow-cooked spiced pulses, ghee drizzle, and fresh forest greens.',
    tag: 'Mountain Fuel',
    kitchen: 'Dedicated 100% Pure Veg Kitchen'
  },
  {
    name: 'Artisanal Mountain Forest Salad & Hummus Toast',
    type: 'veg',
    desc: 'Crisp seasonal vegetables, wild herbs, sourdough toast with stone-ground tahini hummus.',
    tag: 'Fresh & Light',
    kitchen: 'Dedicated 100% Pure Veg Kitchen'
  },
  {
    name: 'Slow-Smoked Country Chicken Skewers',
    type: 'non-veg',
    desc: 'Tender chicken marinated in mountain spices, smoked over oak wood embers with mint glaze.',
    tag: 'Oak Smoked',
    kitchen: 'Dedicated Separate Non-Veg Prep & Grill'
  },
  {
    name: 'Overlander Braised Mutton Pot',
    type: 'non-veg',
    desc: 'Slow-simmered campfire mutton with rustic spices, served with fresh tandoor flatbread.',
    tag: 'Campfire Specialty',
    kitchen: 'Dedicated Separate Non-Veg Prep & Grill'
  },
  {
    name: 'Grilled Stream Fish with Herb Butter',
    type: 'non-veg',
    desc: 'Freshly seasoned fish fillet seared on iron cast griddle with roasted garlic & mountain herb butter.',
    tag: 'Fresh Catch',
    kitchen: 'Dedicated Separate Non-Veg Prep & Grill'
  }
];

// Curated Experiences
export const experiences: ExperienceItem[] = [
  {
    title: 'STARRY NIGHT CAMPING',
    category: 'STAY & SERENITY',
    text: 'Terraced forest camping with personal vehicle parking outside your tent, zero-honk serenity, bonfire circles, and 3 separate clean toilets & 3 showers.',
    image: '/images/camping-under-stars.jpg',
    tag: 'Priority 01'
  },
  {
    title: 'THE NEST (ECO-CAFÉ)',
    category: 'SUSTAINABLE DINING',
    text: 'Sustainable wood & stone retreat overlooking the valley. Featuring 6 curated dishes prepared in 100% strictly separated Veg & Non-Veg kitchens.',
    image: '/images/the-nest-sunset-deck.jpg',
    tag: 'Priority 02'
  },
  {
    title: 'WORKSHOP & CARE',
    category: 'SOLID TECH BAY',
    text: 'Heavy-duty solid construction equipped with pro tools, tire machines, vehicle bays, and on-site mechanics on duty.',
    image: '/images/parinda-workshop-real.jpg',
    tag: 'Priority 03'
  },
  {
    title: 'WATER CROSSING & TRACKS',
    category: 'COMMUNITY TRACKS',
    text: 'Water stream crossing over rockbeds, gravel, and mud tracks built with sustainable timber and natural architecture.',
    image: '/images/parinda-exp-water-splash.jpg',
    tag: 'Priority 04'
  },
  {
    title: 'TRAINING & SKILL SESSIONS',
    category: 'SKILL EDUCATION',
    text: 'Precision dirt mounds, obstacle courses, sand pits, and off-road technique coaching for adventure machines and 4x4 vehicles.',
    image: '/images/bike-skill-mound.jpg',
    tag: 'Guided Coaching'
  },
  {
    title: 'PARINDA STORE & RECEPTION',
    category: 'ARRIVAL & GEAR-UP',
    text: 'Briefing counter featuring a full gear display closet with dressing mirror, showcasing jackets, gloves, and helmets.',
    image: '/images/parinda-store-reception.jpg',
    tag: 'Gear Display'
  },
  {
    title: 'OVERLAND TRAILS & CONVOYS',
    category: '4X4 EXPLORATION',
    text: 'Scenic forest trails and ridge climbs through lush woodland terrain with zero tree cutting and sustainable routes.',
    image: '/images/4x4-convoy-trail.jpg',
    tag: 'Forest Route'
  },
  {
    title: 'BRAND LAUNCHES & MEETS',
    category: 'MOBILITY CENTRE',
    text: 'A signature venue for automotive brand launches, media drives, community gatherings, and weekend getaways.',
    image: '/images/motoring-community-gathering.jpg',
    tag: 'Brand Events'
  }
];

// Park Facilities
export const facilities: FacilityItem[] = [
  { name: 'Base (Camping Area)', image: '/images/fac-camping.jpg', desc: 'Forest pitches with in-front The Yard vehicle parking & campfire circles', tag: 'Stay #01' },
  { name: 'The Nest (Cafe and enjoy view place)', image: '/images/the-nest-pavilion-sunset.jpg', desc: 'Open-deck natural timber pavilion with central bonfire & mountain valley view', tag: 'Dining #02' },
  { name: 'Solid Workshop Bay', image: '/images/parinda-workshop-real.jpg', desc: 'Built of solid materials with full tools, machine stalls & mechanics on duty', tag: 'Service #03' },
  { name: 'Water Crossing', image: '/images/parinda-exp-water-splash.jpg', desc: 'Water stream with rockbed & mud crossing for adventure enthusiasts', tag: 'Tracks #04' },
  { name: 'Reception & Gear Closet', image: '/images/parinda-store-reception.jpg', desc: 'Welcome lounge with gear closet (jackets, helmets, gloves) & mirror', tag: 'Gear Hub #05' },
  { name: 'Our Toilets', image: '/images/hygiene-toilets-hallway.jpg', desc: '' },
  { name: 'Our Showers', image: '/images/hygiene-private-shower.jpg', desc: '' },
  { name: '4x4 Standby Recovery', image: '/images/4x4-convoy-trail.jpg', desc: 'Dedicated 4x4 heavy-duty winch & recovery equipment on active standby', tag: 'Recovery #08' },
  { name: 'On-Site Dedicated First Aid Kit', image: '/images/fac-firstaid.jpg', desc: 'On-site dedicated first aid equipment on standby', tag: 'Safety #09' }
];

// Master Blueprint Locations
export const parkLocations: ParkLocationItem[] = [
  {
    id: 'camping',
    name: 'Base • Camping Under The Stars',
    shortName: '1. Base (Camping)',
    subtitle: 'Forest Canopy, Family & Friends',
    text: 'Camping at Base. Park your motorcycle directly outside your tent.',
    image: '/images/camping-tents-forest.jpg',
    features: [
      'Forest, Family, & Friends camp options',
      'Park vehicle quietly in The Yard outside your tent',
      'Strict zero-honking quiet zone rule',
      'Our Toilets & Our Showers'
    ],
    specs: [
      { label: 'Camp Types', value: 'Forest / Family / Friends' },
      { label: 'The Yard Parking', value: 'Direct In-Front Pitch' },
      { label: 'Hygiene Hub', value: 'Private Washrooms & Showers' },
      { label: 'Rule', value: 'No Honking • Pure Serenity' }
    ],
    pinCoords: { top: '18%', left: '78%' }
  },
  {
    id: 'nest',
    name: 'The Nest - Sustainable Eco-Café',
    shortName: '2. The Nest Café',
    subtitle: 'Pure Wood & Stone Architecture',
    text: 'An open-deck café built predominantly of natural timber, logs, and stone boulders with minimal metal use. Perched above the valley to observe trail tracks, gather around central bonfires, and refuel.',
    image: '/images/the-nest-sunset-deck.jpg',
    features: [
      '100% Wood & Stone sustainable architecture',
      'Open timber deck lounge & valley views',
      'Central bonfire deck & social gathering lounge',
      'Zero artificial hotel or resort structures'
    ],
    specs: [
      { label: 'Architecture', value: 'Natural Wood & Stone' },
      { label: 'View', value: 'Open Timber Mountain Deck' },
      { label: 'Atmosphere', value: 'Central Bonfire & Gathering' },
      { label: 'Structure', value: 'Sustainable Eco-Pavilion' }
    ],
    pinCoords: { top: '22%', left: '72%' }
  },
  {
    id: 'workshop',
    name: 'Parinda Workshop & Tech Bay',
    shortName: '3. Machine Workshop',
    subtitle: 'Heavy-Duty Build & On-Site Mechanics',
    text: 'Built with solid, reinforced construction to handle heavy trail machines. Equipped with diagnostic tools, tire machines, specialized fabrication gear, dedicated parking stalls, and mechanics on duty.',
    image: '/images/parinda-workshop-real.jpg',
    features: [
      'Solid heavy-duty construction & machine stalls',
      'Complete vehicle repair tools & tire equipment',
      'Dedicated off-road machine stalls & parking',
      'Mechanics on active duty'
    ],
    specs: [
      { label: 'Build Quality', value: 'Solid Reinforced Material' },
      { label: 'Staffing', value: 'On-Site Mechanics' },
      { label: 'Tooling', value: 'Tire Changer, Lift & Diagnostics' },
      { label: 'Capacity', value: 'Dedicated Multi-Vehicle Bays' }
    ],
    pinCoords: { top: '42%', left: '20%' }
  },
  {
    id: 'watercrossing',
    name: 'Water Crossing & Trail',
    shortName: '4. Water Crossing',
    subtitle: 'Water Stream for Adventure Enthusiasts',
    text: 'A real stream crossing over authentic stones, mud, and gravel. Engineered with natural timber structures to blend completely into the surrounding forest.',
    image: '/images/parinda-exp-water-splash.jpg',
    features: [
      'Authentic rockbed & gravel crossing',
      'Sustainable timber & natural materials',
      'Calibrated for adventure bikes & 4x4 vehicles',
      'Zero artificial resort pool elements'
    ],
    specs: [
      { label: 'Pondbed Surface', value: 'Natural Stone & Gravel' },
      { label: 'Architecture', value: 'Timber & Stone' },
      { label: 'Vehicles', value: 'ADV Bikes & 4x4 SUVs' },
      { label: 'Recovery', value: '4x4 Standby Winch' }
    ],
    pinCoords: { top: '35%', left: '42%' }
  },
  {
    id: 'reception',
    name: 'Parinda Store & Reception Lounge',
    shortName: '5. Store & Reception',
    subtitle: 'Check-In, Gear Display & Dressing Mirror',
    text: 'The sanctuary check-in and briefing area. Features a prominent open gear closet with full-length mirror, showcasing adventure jackets, riding gloves, and branded helmets.',
    image: '/images/parinda-store-reception.jpg',
    features: [
      'Open gear closet with jackets, helmets & gloves',
      'Full-length dressing mirror for gear fitting',
      'Visitor check-in & digital track pass validation',
      'Parinda official stickers, caps & apparel store'
    ],
    specs: [
      { label: 'Gear Display', value: 'Helmets, Jackets & Gloves' },
      { label: 'Fitting', value: 'Full-Length Mirror' },
      { label: 'Pass Check', value: 'Digital RFID / QR Check-In' },
      { label: 'Store', value: 'Apparel & Trail Gear' }
    ],
    pinCoords: { top: '50%', left: '12%' }
  },
  {
    id: 'nesling',
    name: 'Nesling Kids Park',
    shortName: '6. Nesling Kids Park',
    subtitle: 'Explore. Play. Grow.',
    text: 'A dedicated natural forest space for little adventurers to play, learn, create and connect with nature. Safe, engaging, and inspiring with wooden climbing towers, bridges, teepee tent, cycle path, and guided nature activities.',
    image: '/images/nesling-kids-zone.jpg',
    features: [
      'Explore, Create, Play, Learn & Respect Nature',
      'Natural wooden climbing tower, bridge & slide',
      'Teepee tent camp & outdoor activity benches',
      'Daily activities: Nature Walk, Leaf Art, Story Time, Puzzle Hour'
    ],
    specs: [
      { label: 'Target Age', value: 'Young Explorers & Families' },
      { label: 'Safety', value: 'Enclosed Safe Natural Play Area' },
      { label: 'Daily Activities', value: 'Nature Walk, Leaf Art, Puzzles' },
      { label: 'Materials', value: '100% Natural Timber & Logs' }
    ],
    pinCoords: { top: '15%', left: '55%' }
  }
];

export const galleryImages = [
  {
    title: 'Forest Camping & Pitch Bays with In-Front Parking',
    category: 'Camping',
    src: '/images/forest-camping-real.jpg',
    span: 'wide'
  },
  {
    title: 'The Nest Eco-Café Sunset Deck & Bonfire Pit',
    category: 'The Nest Café',
    src: '/images/the-nest-sunset-deck.jpg',
    span: 'tall'
  },
  {
    title: 'Parinda Reception Desk & Open Gear Closet Lounge',
    category: 'Reception',
    src: '/images/parinda-reception-lounge.jpg',
    span: 'wide'
  },
  {
    title: 'Sunrise Lakeside Adventure Bike Staging',
    category: 'Sanctuary',
    src: '/images/lake-sunrise-bike.jpg',
    span: 'tall'
  },
  {
    title: 'Ayush Raj • Founder Exploring Pristine Horizons',
    category: 'Founder',
    src: '/images/ayush-raj-founder.jpg',
    span: 'normal'
  },
  {
    title: 'Natural River Water Crossing 4x4 Splash',
    category: 'Water Crossing',
    src: '/images/parinda-exp-water-splash.jpg',
    span: 'normal'
  },
  {
    title: 'Solid Material Workshop & Certified Mechanics',
    category: 'Workshop',
    src: '/images/parinda-workshop-real.jpg',
    span: 'normal'
  },
  {
    title: 'ADV Motorcycle Skill Training Clinic',
    category: 'Skill Zone',
    src: '/images/bike-skill-mound.jpg',
    span: 'normal'
  },
  {
    title: 'Forest Convoy Expedition Trail',
    category: 'Overland',
    src: '/images/4x4-convoy-trail.jpg',
    span: 'wide'
  }
];

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rohan Deshmukh',
    role: 'Adventure Tourer',
    vehicle: 'Royal Enfield Himalayan 450',
    rating: 5,
    date: 'August 2026',
    comment: 'The natural stream water crossing is authentic and challenging! No gimmicks, pure trail craft. Camped overnight under full moon and had direct motorcycle parking outside my tent.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Vikram Singh & Convoy',
    role: 'Overland Explorer',
    vehicle: 'Mahindra Thar 4x4',
    rating: 5,
    date: 'July 2026',
    comment: 'Parinda is exactly what Indian 4x4 enthusiasts were missing. Testing the articulation ramp and rockbed trail with guidance from local marshals was brilliant. The Nest food is top notch!',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Ananya & Sahil Sharma',
    role: 'Weekend Camper',
    vehicle: 'KTM 390 Adventure',
    rating: 5,
    date: 'August 2026',
    comment: 'Clean washrooms, hot water showers, and zero-honking quiet forest vibes. Loved the local Jharkhand hospitality and bonfire evening around The Nest terrace.',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Harpreet Sandhu',
    role: 'Machine Builder & Rider',
    vehicle: 'BMW R1250GS',
    rating: 5,
    date: 'June 2026',
    comment: 'The workshop bay is well equipped with high-pressure air and essential tools. Great place for bike prep before heading out on long highway stints.',
    verified: true
  }
];
