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

export interface ThreeDScene {
  id: string;
  title: string;
  vehicle: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  hotspots: { title: string; subtitle: string; top: string; left: string; icon: string }[];
}

export const threeDScenes: ThreeDScene[] = [
  {
    id: 'lake-crossing',
    title: 'Parinda Lake & Off-Road Crossing Arena',
    vehicle: 'Mahindra Thar 4x4 & ADV Motorbikes',
    image: '/images/parinda-lake-offroad-park.jpg',
    description: 'Dynamic natural water crossing where 4x4 SUVs and dual-sport dirt bikes navigate rock beds, water splashes, and spectator vantage decks.',
    specs: [
      { label: 'Water Depth', value: '450mm - 700mm' },
      { label: 'Surface', value: 'Natural Stone & River Gravel' },
      { label: 'Obstacle Rating', value: 'Level 4 Technical' },
      { label: 'Recovery Crew', value: '4x4 Winch on Standby' }
    ],
    hotspots: [
      { title: '4x4 Water Wading', subtitle: 'Mahindra Thar 4-Low crossing', top: '72%', left: '42%', icon: '🚙' },
      { title: 'ADV Bike Route', subtitle: 'Off-road dirt bikes on pebble bed', top: '75%', left: '80%', icon: '🏍️' },
      { title: 'Parinda Cafe & Deck', subtitle: 'Outdoor spectators & bonfire seating', top: '78%', left: '16%', icon: '☕' },
      { title: 'Hillside Trail Incline', subtitle: 'Rock climb trail to the upper ridges', top: '32%', left: '50%', icon: '⛰️' }
    ]
  },
  {
    id: 'water-wading-pit',
    title: 'Engineered Water Obstacle Trench',
    vehicle: 'Toyota Hilux 4x4 Pickup',
    image: '/images/hilux-water-wading.jpg',
    description: 'Controlled concrete ramp entry into a calibrated deep-water tank for testing approach angles, differential locks, and snorkel air-intake.',
    specs: [
      { label: 'Entry Angle', value: '31° Steep Incline' },
      { label: 'Trench Depth', value: '700mm Tested' },
      { label: 'Drive Mode', value: '4-Low + Rear Diff Lock' },
      { label: 'Inspection', value: 'Axle Breather & Waterproofing' }
    ],
    hotspots: [
      { title: 'Steep Entry Ramp', subtitle: '31° Concrete descent', top: '18%', left: '48%', icon: '📐' },
      { title: 'Water Level Marker', subtitle: 'Calibrated wading depth sensor', top: '55%', left: '50%', icon: '🌊' },
      { title: 'Wheel Articulation Zone', subtitle: 'Suspension flex check', top: '22%', left: '58%', icon: '⚙️' }
    ]
  },
  {
    id: 'convoy-trail',
    title: 'Overland Ridge & Forest Trail',
    vehicle: '4x4 Convoy (Defender, Thar, Jimny)',
    image: '/images/4x4-convoy-trail.jpg',
    description: 'Lush green mountain ridge trail for group overland expeditions, side-slope navigation, and technical hill climbs.',
    specs: [
      { label: 'Trail Length', value: '4.2 km Loop' },
      { label: 'Elevation Gain', value: '+240 Meters' },
      { label: 'Terrain', value: 'Mud, Grass, Rutted Dirt' },
      { label: 'Convoy Size', value: '8 - 12 Vehicles' }
    ],
    hotspots: [
      { title: 'Lead Vehicle Point', subtitle: 'Scout radio coordination', top: '75%', left: '72%', icon: '📻' },
      { title: 'Side-Slope Ridge', subtitle: 'Off-camber 18° banking', top: '65%', left: '45%', icon: '🌲' },
      { title: 'Valley Vista Point', subtitle: 'Panoramic mountain backdrop', top: '30%', left: '52%', icon: '🏔️' }
    ]
  },
  {
    id: 'bike-skill-mound',
    title: 'ADV Dirt Mound & Obstacle Arena',
    vehicle: 'Adventure Motorbikes (BMW GS / KTM / Himalayan)',
    image: '/images/bike-skill-mound.jpg',
    description: 'Dedicated dirt mounds, steep crests, log barriers and gravel inclines engineered for rider coaching, balance and throttle control.',
    specs: [
      { label: 'Mound Height', value: '4.5 Meters Crest' },
      { label: 'Crest Incline', value: '38° Loose Dirt' },
      { label: 'Focus', value: 'Body Positioning & Clutch Slip' },
      { label: 'Instructors', value: 'Certified ADV Coaches' }
    ],
    hotspots: [
      { title: 'Apex Peak Crest', subtitle: 'Rider balance & lookout point', top: '22%', left: '50%', icon: '🏆' },
      { title: 'Approach Climb', subtitle: 'Standing peg posture technique', top: '25%', left: '40%', icon: '🏍️' },
      { title: 'Safety Cone Perimeter', subtitle: 'Runoff safety area', top: '35%', left: '11%', icon: '🚩' }
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    title: 'OFF-ROAD TRACKS',
    category: '4X4 & MOTO',
    text: 'Push your limits across purpose-built terrain including water pits, rock crawls, mud ruts and slope inclines.',
    image: '/images/parinda-lake-offroad-park.jpg',
    tag: 'Signature Track'
  },
  {
    title: 'SKILL ZONE',
    category: 'TRAINING',
    text: 'Learn, train and master off-road riding on mounds, obstacle courses and sand traps.',
    image: '/images/bike-skill-mound.jpg',
    tag: 'Guided Coaching'
  },
  {
    title: 'THE NEST',
    category: 'PANORAMIC RETREAT',
    text: 'Sloped roof open-deck pavilion overlooking the track and valley for dining and relaxation.',
    image: '/images/the-nest-main-render.jpg',
    tag: '180° Valley View'
  },
  {
    title: 'CAMPING UNDER STARS',
    category: 'OVERNIGHT',
    text: 'Terraced camping grounds with bonfire circles, fairy lights, and starry night skies.',
    image: '/images/camping-under-stars.jpg',
    tag: 'Night Stays'
  },
  {
    title: 'CAFÉ & RESTAURANT',
    category: 'FOOD & BEVERAGE',
    text: 'Fresh food, specialty coffee and hearty dining with panoramic track views.',
    image: '/images/the-nest-evening.jpg',
    tag: 'All-day Dining'
  },
  {
    title: 'WORKSHOP & CARE',
    category: 'SERVICE & WASH',
    text: 'Professional high-pressure wash bays, diagnostics, tire maintenance and support.',
    image: '/images/thumb-workshop.jpg',
    tag: 'Pro Tech Bay'
  },
  {
    title: 'COMMUNITY & RALLIES',
    category: 'MOTORING CULTURE',
    text: 'Large-scale group rideouts, off-road rallies, community meetups and overland expos.',
    image: '/images/motoring-community-gathering.jpg',
    tag: 'Weekend Meets'
  },
  {
    title: 'OVERLAND TRAILS',
    category: '4X4 CONVOY',
    text: 'Scenic hillside convoys and technical trails through lush forest landscapes.',
    image: '/images/4x4-convoy-trail.jpg',
    tag: 'Guided Trails'
  },
  {
    title: 'NESLING KIDS EXPLORER',
    category: 'FAMILY ZONE',
    text: 'Nature-inspired playground with treehouses, sand sensory play, and adventure trails.',
    image: '/images/nesling-kids-render.jpg',
    tag: 'Safe & Engaging'
  },
  {
    title: 'ECO JUNGLE LAGOON',
    category: 'RELAXATION',
    text: 'Natural fresh water pool with wooden slides, rock waterfalls and tropical greenery.',
    image: '/images/jungle-pool-lagoon.jpg',
    tag: 'Natural Springs'
  }
];

export const facilities: FacilityItem[] = [
  { name: 'Reception', image: '/images/fac-reception.jpg', desc: 'Welcome counter, briefing & orientation lounge', tag: 'Arrival' },
  { name: 'Café', image: '/images/fac-cafe.jpg', desc: 'Fresh coffee, artisanal food & social deck', tag: 'Dining' },
  { name: 'Wash Bay', image: '/images/fac-washbay.jpg', desc: 'High-pressure mud removal & vehicle cleanup', tag: 'Maintenance' },
  { name: 'Workshop', image: '/images/fac-workshop.jpg', desc: 'Professional tools, tire maintenance & emergency repairs', tag: 'Service' },
  { name: 'Parking', image: '/images/fac-parking.jpg', desc: 'Terrain-inspired shaded bays for 4x4s & adventure bikes', tag: 'Parking' },
  { name: 'Camping', image: '/images/fac-camping.jpg', desc: 'Terraced grounds, bonfire circles & overnight setups', tag: 'Stay' },
  { name: 'Toilets & Showers', image: '/images/fac-toilets.jpg', desc: 'Clean, sanitized, high-spec modern restrooms & showers', tag: 'Hygiene' },
  { name: 'First Aid', image: '/images/fac-firstaid.jpg', desc: 'Certified emergency medical room, kits & responders', tag: 'Safety' }
];

export const parkLocations: ParkLocationItem[] = [
  {
    id: 'offroad',
    name: 'Off-Road Tracks & Lake Crossing',
    shortName: 'Off-Road Tracks',
    subtitle: 'Heart of the Adventure',
    text: 'Multi-terrain tracks featuring water wading pools, rock obstacles, muddy ruts and technical hill ascents.',
    image: '/images/parinda-lake-offroad-park.jpg',
    features: ['Lake water crossing', '4x4 technical obstacle arena', 'Dirt bike & quad tracks', 'Marshals & recovery support'],
    specs: [
      { label: 'Terrain Types', value: 'Rock, Mud, Water, Sand' },
      { label: 'Difficulty', value: 'Novice to Extreme' },
      { label: 'Vehicle Types', value: '4x4 SUVs & ADV Bikes' },
      { label: 'Recovery', value: 'Active Winch Standby' }
    ],
    pinCoords: { top: '35%', left: '42%' }
  },
  {
    id: 'reception',
    name: 'Reception & Waiting Lounge',
    shortName: 'Reception',
    subtitle: 'Entry & Safety Briefing Hub',
    text: 'Dedicated reception counter, comfortable industrial-styled waiting lounge, track rule display screens, luggage and helmet storage.',
    image: '/images/reception-interior-render.jpg',
    features: ['Dedicated check-in counter', 'Luggage & helmet lockers', 'Track rules & video briefing', 'Drinking water & device charging'],
    specs: [
      { label: 'Capacity', value: '12 - 15 people' },
      { label: 'Material', value: 'Concrete, Wood, Metal' },
      { label: 'Security', value: 'CCTV & Keyed Lockers' }
    ],
    pinCoords: { top: '65%', left: '16%' }
  },
  {
    id: 'nest',
    name: 'The Nest - Panoramic Overlook',
    shortName: 'The Nest',
    subtitle: 'Heart & Soul of Parinda',
    text: 'Sloped timber roof structure designed for pause, connection and observing track action with 180° panoramic valley views.',
    image: '/images/the-nest-main-render.jpg',
    features: ['180° Panoramic track view', 'Open-deck & indoor seating', 'Café & refreshment counter', 'Bonfire circle & sunset viewpoint'],
    specs: [
      { label: 'Structure', value: 'Steel & Natural Wood' },
      { label: 'Roof', value: 'Sloped Rain/Heat Shield' },
      { label: 'Deck View', value: '180° Valley Amphitheatre' }
    ],
    pinCoords: { top: '22%', left: '72%' }
  },
  {
    id: 'camping',
    name: 'Camping Under The Stars',
    shortName: 'Camping Ground',
    subtitle: 'Overnight Adventure Stays',
    text: 'Spacious terraced campsite nestled in nature, equipped with bonfire pit, warm fairy lighting and dedicated amenities.',
    image: '/images/camping-under-stars.jpg',
    features: ['Pitched tent setups', 'Central bonfire gatherings', 'Stargazing vantage point', 'Clean shower & toilet access'],
    specs: [
      { label: 'Night Access', value: 'Secure Gated Perimeter' },
      { label: 'Vibe', value: 'Acoustic & Campfire' },
      { label: 'Power', value: 'Charging Outlets at Bays' }
    ],
    pinCoords: { top: '18%', left: '78%' }
  },
  {
    id: 'skill',
    name: 'Skill Zone & Training Arena',
    shortName: 'Skill Arena',
    subtitle: 'Rider & Driver Education',
    text: 'Dedicated dirt mounds, balance beams, log barriers and gravel inclines for off-road rider coaching and precision clinics.',
    image: '/images/bike-skill-mound.jpg',
    features: ['Mound climbs & descents', 'Off-camber turn tracks', 'Certified off-road instructors', 'Beginner to advanced courses'],
    specs: [
      { label: 'Vehicle Types', value: 'ADV Bikes & 4x4 SUVs' },
      { label: 'Obstacles', value: 'Logs, Mounds, Ruts, Pits' },
      { label: 'Coaching', value: 'Certified Instructors' }
    ],
    pinCoords: { top: '15%', left: '55%' }
  },
  {
    id: 'parking',
    name: 'Adventure Parking',
    shortName: 'Adventure Parking',
    subtitle: 'Terrain-Inspired Arrival Zone',
    text: 'Not just parking — an experiential entrance blending stone gravel, rock hurdles, log barriers and dedicated motorcycle docks.',
    image: '/images/adventure-parking-overview.jpg',
    features: ['20+ Car / SUV capacity', '10+ Dedicated bike bays', 'One-way smooth flow', 'Terraced parking levels'],
    specs: [
      { label: 'Surface', value: 'Compacted Gravel & Stone' },
      { label: 'Capacity', value: '20+ Cars / 10+ Bikes' },
      { label: 'Flow', value: 'One-Way Circular Entry' }
    ],
    pinCoords: { top: '75%', left: '60%' }
  },
  {
    id: 'nesling',
    name: 'Nesling - Kids Explorer Zone',
    shortName: 'Nesling Kids',
    subtitle: 'Play, Learn & Grow in Nature',
    text: 'A safe, engaging nature-inspired play space with climbing treehouses, balance logs, sand sensory pits, and creative art corners.',
    image: '/images/nesling-kids-render.jpg',
    features: ['Treehouse & climbing elements', 'Sand & mud sensory play', 'Creative arts & crafts tables', 'Shaded seating for parents'],
    specs: [
      { label: 'Safety', value: 'Safe & Secure Boundary' },
      { label: 'Activities', value: 'Art, Sand, Climbing, Trail' },
      { label: 'Comfort', value: 'Parent Shaded Lounge' }
    ],
    pinCoords: { top: '48%', left: '80%' }
  },
  {
    id: 'lagoon',
    name: 'Eco Jungle Lagoon & Pool',
    shortName: 'Eco Lagoon',
    subtitle: 'Tropical Natural Oasis',
    text: 'Fresh mountain water pool with a carved rock waterslide, wooden relaxation cabanas and lush rainforest landscaping.',
    image: '/images/jungle-pool-lagoon.jpg',
    features: ['Natural rock pool waters', 'Integrated waterslides', 'Sun loungers & jungle huts', 'Surrounded by tropical flora'],
    specs: [
      { label: 'Setting', value: 'Tropical Rainforest' },
      { label: 'Water Source', value: 'Natural Mountain Spring' },
      { label: 'Amenities', value: 'Cabanas & Slide' }
    ],
    pinCoords: { top: '52%', left: '30%' }
  }
];

export const galleryImages = [
  {
    title: 'Parinda Off-Road Lake & Arena',
    category: 'Tracks & 4x4',
    src: '/images/parinda-lake-offroad-park.jpg',
    span: 'tall'
  },
  {
    title: 'Night Camping Under The Stars',
    category: 'Camping',
    src: '/images/camping-under-stars.jpg',
    span: 'wide'
  },
  {
    title: 'Toyota Hilux Water Obstacle Test',
    category: 'Water Crossing',
    src: '/images/hilux-water-wading.jpg',
    span: 'normal'
  },
  {
    title: 'The Nest Sunset & Evening Glow',
    category: 'Architecture',
    src: '/images/the-nest-evening.jpg',
    span: 'normal'
  },
  {
    title: '4x4 Overland Convoy Trail',
    category: 'Expedition',
    src: '/images/4x4-convoy-trail.jpg',
    span: 'wide'
  },
  {
    title: 'ADV Motorcycle Dirt Mound Training',
    category: 'Skill Zone',
    src: '/images/bike-skill-mound.jpg',
    span: 'normal'
  },
  {
    title: 'Motoring Community Gathering',
    category: 'Community',
    src: '/images/motoring-community-gathering.jpg',
    span: 'normal'
  },
  {
    title: 'Natural Eco Lagoon & Pool',
    category: 'Oasis',
    src: '/images/jungle-pool-lagoon.jpg',
    span: 'tall'
  },
  {
    title: 'Hilux Travo Overland Concept',
    category: 'Machines',
    src: '/images/hilux-travo-overland.jpg',
    span: 'normal'
  },
  {
    title: 'The Nest Panoramic View & Deck',
    category: 'Retreat',
    src: '/images/the-nest-main-render.jpg',
    span: 'normal'
  },
  {
    title: 'Reception & Briefing Lounge Interior',
    category: 'Interiors',
    src: '/images/reception-interior-render.jpg',
    span: 'normal'
  },
  {
    title: 'Nesling Kids Adventure Zone',
    category: 'Family',
    src: '/images/nesling-kids-render.jpg',
    span: 'wide'
  }
];
