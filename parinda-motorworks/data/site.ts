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
      'Clean hygiene hub access (Our Toilets & Shower Rooms)'
    ],
    highlights: [
      { icon: '🏍️', text: 'Motorcycle' },
      { icon: '⏱️', text: '6 Hours Track Access' },
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
      'Clean hygiene hub access (Our Toilets & Shower Rooms)'
    ],
    highlights: [
      { icon: '🚙', text: 'Car / 4×4' },
      { icon: '⏱️', text: '6 Hours Track Access' },
      { icon: '🛡️', text: 'Winch Standby' }
    ]
  },
  {
    id: '24h-pass-moto',
    title: '24-Hours Pass (Motorcycle)',
    badge: 'OVERNIGHT • 2-WHEELER',
    price: '₹1,500',
    period: 'per rider',
    duration: '24 Hours (8 Hours Track Access + Overnight)',
    popular: false,
    desc: '8 hours total track access (6 hours regular daytime + exclusive early morning session ~5:00 AM – 8:00 AM). Includes overnight access.',
    features: [
      '8 Hours total track access (6 Hours daytime + 2 Hours dawn session)',
      'Exclusive early morning track session (5:00 AM – 8:00 AM)',
      'Overnight sanctuary access & campfire gathering',
      'Park your motorcycle in front of your camping pitch',
      'Full hygiene hub access with Our Toilets & Shower Rooms'
    ],
    highlights: [
      { icon: '🏍️', text: 'Motorcycle' },
      { icon: '🌅', text: 'Dawn Session 5AM' },
      { icon: '🏕️', text: 'Overnight Access' }
    ]
  },
  {
    id: '24h-pass-car',
    title: '24-Hours Pass (Car / 4×4)',
    badge: 'OVERNIGHT • 4X4 VEHICLE',
    price: '₹2,500',
    period: 'per vehicle',
    duration: '24 Hours (8 Hours Track Access + Overnight)',
    popular: true,
    desc: '8 hours total track access (6 hours regular daytime + exclusive early morning session ~5:00 AM – 8:00 AM). Includes overnight access.',
    features: [
      '8 Hours total track access (6 Hours daytime + 2 Hours dawn session)',
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
      '24/7 Access to Our Toilets & Shower Rooms'
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
    desc: 'Guests may pitch and use their own tent in the designated camping area. Please bring your own bedsheet & pillow.',
    features: [
      'Pitch your own tent in designated zone (Please bring bedsheet & pillow)',
      'Park your vehicle quietly directly in front of your pitch',
      'Campfire deck and evening community gatherings',
      '24/7 Access to Our Toilets & Shower Rooms',
      'Workshop tool assistance for gear/tent setup'
    ],
    highlights: [
      { icon: '🎒', text: 'Pitch Own Tent' },
      { icon: '🛏️', text: 'Bring Bedsheet & Pillow' },
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
      'Close proximity to Our Toilets & Shower Rooms',
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
    text: 'Terraced forest camping with personal vehicle parking outside your tent, zero-honk serenity, bonfire circles, and Our Toilets & Shower Rooms.',
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
    text: 'Reception counter featuring a full gear display closet with dressing mirror, showcasing jackets, gloves, and helmets.',
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
  { name: 'Base (Camping Area)', image: '/images/fac-camping.jpg', desc: 'Forest pitches with vehicle parking outside tent & campfire circles', tag: 'Stay #01' },
  { name: 'The Nest & View Point', image: '/images/the-nest-pavilion-sunset.jpg', desc: 'Open-deck natural timber pavilion with central bonfire & mountain valley view', tag: 'Dining #02' },
  { name: 'Solid Workshop Bay', image: '/images/parinda-workshop-real.jpg', desc: 'Built of solid materials with tools, machine stalls & mechanics on duty', tag: 'Service #03' },
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
      'Park vehicle quietly outside your tent',
      'Strict zero-honking quiet zone rule',
      'Our Toilets & Our Showers'
    ],
    specs: [
      { label: 'Camp Types', value: 'Forest / Family / Friends' },
      { label: 'In-Front Pitch', value: 'Direct Vehicle Parking' },
      { label: 'Hygiene Hub', value: 'Private Washrooms & Showers' },
      { label: 'Rule', value: 'No Honking • Pure Serenity' }
    ],
    pinCoords: { top: '18%', left: '78%' }
  },
  {
    id: 'nest',
    name: 'The Nest & View Point',
    shortName: '2. The Nest Café',
    subtitle: 'Pure Wood & Stone Architecture',
    text: 'An open-deck café built predominantly of natural timber, logs, and stone boulders with minimal metal use. Perched above the valley to observe trail tracks, gather around central bonfires, and refuel.',
    image: '/images/the-nest-sunset-deck.jpg',
    features: [
      '100% Wood & Stone sustainable architecture',
      'Valley views and scenic vantage',
      'Central bonfire deck & social gathering lounge'
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
      'Calibrated for adventure bikes & 4x4 vehicles'
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
    text: 'The sanctuary check-in lounge. Features a prominent open gear closet with full-length mirror, showcasing adventure jackets, riding gloves, and branded helmets.',
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
    subtitle: 'Safe Outdoor Play with Wooden Swings',
    text: 'A safe, dedicated play arena made entirely with natural wooden swings, small obstacle mounds, and shaded family seating.',
    image: '/images/fac-nesling.jpg',
    features: [
      'Natural log swings & balance timber logs',
      'Small grass mounds & safe play area',
      'Adjacent shaded seating for parents & guardians'
    ],
    specs: [
      { label: 'Material', value: '100% Natural Timber & Logs' },
      { label: 'Safety', value: 'Enclosed & Soft Ground' },
      { label: 'Age Group', value: 'Kids & Families' },
      { label: 'Supervision', value: 'Parent Seating Provided' }
    ],
    pinCoords: { top: '28%', left: '60%' }
  }
];

export interface TrackFeatureItem {
  name: string;
  category: string;
  image: string;
  desc: string;
}

export const trackFeatures: TrackFeatureItem[] = [
  { name: 'Water Crossing Stream', category: 'Water Dynamics', image: '/images/track-stream-crossing.jpg', desc: 'Real stream crossing with boulder riverbed and authentic water splash.' },
  { name: 'Articulation Twister Ramp', category: 'Suspension Test', image: '/images/track-articulation-ramp.jpg', desc: 'Cross-axle moguls and offset ruts to test wheel travel, lockers, and traction.' },
  { name: 'Steep Incline Ridge Climb', category: 'Approach & Departure', image: '/images/track-steep-incline.jpg', desc: 'Engineered steep dirt & gravel slope with 40-degree gradient challenge.' },
  { name: 'Rockbed Crawler Garden', category: 'Underbody & Ground Clearance', image: '/images/track-rock-garden.jpg', desc: 'Dense basalt rock field demanding precise wheel placement and high clearance.' },
  { name: 'Sand & Loose Gravel Trap', category: 'Momentum & Float', image: '/images/track-sand-pit.jpg', desc: 'Deep soft sand trench testing tire momentum, deflation control, and throttle craft.' },
  { name: 'Forest Ridge Loop Trail', category: 'High-Speed Flow', image: '/images/track-side-slope.jpg', desc: 'Winding woodland single-track trail under deep forest canopy.' }
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

export const initialReviews: ReviewItem[] = [];

export interface GalleryItem {
  src: string;
  title: string;
  category: string;
  span?: 'wide' | 'tall' | 'normal';
}

export const galleryImages: GalleryItem[] = [
  { src: '/images/the-nest-pavilion-sunset.jpg', title: 'The Nest & View Point Pavilion', category: 'The Nest Café', span: 'wide' },
  { src: '/images/camping-bikers-vantage.jpg', title: "The Biker's Edge • Stargazing Camp", category: 'Camping', span: 'normal' },
  { src: '/images/parinda-exp-water-splash.jpg', title: 'Water Crossing Stream & Splash', category: 'Water Crossing', span: 'tall' },
  { src: '/images/parinda-workshop-real.jpg', title: 'Solid Heavy-Duty Machine Bay', category: 'Workshop', span: 'normal' },
  { src: '/images/camping-tents-forest.jpg', title: 'Forest Canopy Pitches', category: 'Camping', span: 'normal' },
  { src: '/images/parinda-store-reception.jpg', title: 'Reception & Gear Display', category: 'Sanctuary', span: 'wide' },
  { src: '/images/4x4-convoy-trail.jpg', title: '4x4 Forest Overland Convoy', category: 'Overland', span: 'normal' },
  { src: '/images/ayush-raj-founder.jpg', title: 'Ayush Raj • Founder Vision', category: 'Founder', span: 'normal' },
  { src: '/images/bike-skill-mound.jpg', title: 'Off-Road Obstacle & Skills', category: 'Sanctuary', span: 'normal' },
  { src: '/images/the-nest-sunset-deck.jpg', title: 'Sunset Terrace & Mountain Vista', category: 'The Nest Café', span: 'normal' }
];
