export interface Hotspot {
  id: string;
  title: string;
  subtitle?: string;
  position: [number, number, number]; // 3D coordinates on sphere inner surface (radius ~500)
  targetLocationId?: string; // If navigates to another panorama
  targetYaw?: number; // Target camera yaw in radians
  targetPitch?: number; // Target camera pitch in radians
  type: 'navigation' | 'info';
  description?: string;
}

export interface PanoramaLocation {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  thumbnail: string;
  description: string;
  category: string;
  defaultYaw?: number; // Initial horizontal angle in radians
  defaultPitch?: number; // Initial vertical angle in radians
  hotspots: Hotspot[];
}

export const PANORAMA_LOCATIONS: PanoramaLocation[] = [
  {
    id: 'reception',
    slug: 'reception',
    title: 'Parinda Reception',
    tagline: 'Adventure Meets Excellence',
    image: '/panoramas/reception-360.jpg',
    thumbnail: '/panoramas/reception-360.jpg',
    category: 'Welcome & Hub',
    defaultYaw: 0,
    defaultPitch: 0,
    description:
      'Premium Parinda reception and lounge with wooden interiors, black leather seating, reception desk, large glass windows, greenery and mountain views, connected to the service bay.',
    hotspots: [
      {
        id: 'rec-workshop',
        title: 'Service Bay',
        subtitle: 'Enter Workshop',
        position: [340, 20, -320],
        targetLocationId: 'workshop',
        type: 'navigation',
        description: 'Connect directly to the state-of-the-art Parinda service & customization workshop.'
      },
      {
        id: 'rec-lounge',
        title: 'VIP Lounge',
        subtitle: 'Executive Seating',
        position: [-380, -90, -180],
        type: 'info',
        description: 'Handcrafted leather armchairs and espresso bar overlooking the scenic Himalayan foothills.'
      },
      {
        id: 'rec-valley',
        title: 'Scenic Glass Wall',
        subtitle: 'Proving Ground View',
        position: [-420, 30, 240],
        targetLocationId: 'offroad',
        type: 'navigation',
        description: 'Direct view into our 4x4 testing grounds and outdoor training tracks.'
      }
    ]
  },
  {
    id: 'workshop',
    slug: 'workshop',
    title: 'Parinda Workshop',
    tagline: 'Precision Engineering & Custom Builds',
    image: '/panoramas/workshop-360.jpg',
    thumbnail: '/panoramas/workshop-360.jpg',
    category: 'Engineering Hub',
    defaultYaw: -0.4,
    defaultPitch: -0.1,
    description:
      'Professional motorcycle workshop with motorcycles, mechanics, tools, service equipment, welding area and industrial wooden/stone interior.',
    hotspots: [
      {
        id: 'work-bikes',
        title: 'Scrambler Rig',
        subtitle: 'Hydraulic Lift Bay',
        position: [-40, -40, -470],
        type: 'info',
        description: 'Custom all-terrain motorcycle fitted with heavy-duty suspension and bespoke exhausts.'
      },
      {
        id: 'work-welding',
        title: 'Welding & Fabrication',
        subtitle: 'Exhaust Bench',
        position: [390, -90, -250],
        type: 'info',
        description: 'TIG & MIG welding station where custom crash-guards and exhaust manifolds are fabricated.'
      },
      {
        id: 'work-reception',
        title: 'Reception Lobby',
        subtitle: 'Return to Hub',
        position: [-450, 20, 180],
        targetLocationId: 'reception',
        type: 'navigation',
        description: 'Walk back to the central Parinda greeting lounge and boutique store.'
      },
      {
        id: 'work-tools',
        title: 'Tool Matrix',
        subtitle: 'Precision Equipment',
        position: [-380, 50, -280],
        type: 'info',
        description: 'Calibrated diagnostic scanners, pneumatic wrenches, and precision torque tools.'
      }
    ]
  },
  {
    id: 'camping',
    slug: 'camping',
    title: 'Parinda Camping',
    tagline: 'Under the Milky Way Canopy',
    image: '/panoramas/camping-360.jpg',
    thumbnail: '/panoramas/camping-360.jpg',
    category: 'Stargazing & Wilderness',
    defaultYaw: 0,
    defaultPitch: 0.1,
    description:
      'Night camping experience with colorful tents, campfire circle, motorcycles, mountain valley, stars, moon and warm campsite lighting.',
    hotspots: [
      {
        id: 'camp-fire',
        title: 'Campfire Circle',
        subtitle: 'Community Gathering',
        position: [-20, -160, -440],
        type: 'info',
        description: 'Stone-encircled bonfire pit where riders and explorers exchange tales under the stars.'
      },
      {
        id: 'camp-tents',
        title: 'Glamping Grounds',
        subtitle: 'All-Weather Domes',
        position: [380, -90, -280],
        type: 'info',
        description: 'Insulated four-season geodesic tents equipped with memory foam mattresses and solar power.'
      },
      {
        id: 'camp-cafe',
        title: 'The Nest Cafe',
        subtitle: 'Ascend to Deck',
        position: [-420, 60, 220],
        targetLocationId: 'nest-cafe',
        type: 'navigation',
        description: 'Head up the winding stone steps to the warm terrace cafe for hot brew and dining.'
      }
    ]
  },
  {
    id: 'water-crossing',
    slug: 'water-crossing',
    title: 'Parinda Water Crossing',
    tagline: 'Hydraulic & Rocky Riverbed Run',
    image: '/panoramas/water-crossing-360.jpg',
    thumbnail: '/panoramas/water-crossing-360.jpg',
    category: 'Off-Road Obstacle',
    defaultYaw: 0,
    defaultPitch: -0.05,
    description:
      'Adventure water-crossing arena where a Jeep/SUV drives through a rocky shallow water track surrounded by nature.',
    hotspots: [
      {
        id: 'water-jeep',
        title: '4x4 Deep Wading',
        subtitle: 'Boulder Challenge',
        position: [-20, -80, -470],
        type: 'info',
        description: 'Snorkel-equipped 4x4 tackling submerged rocky ledges and running currents.'
      },
      {
        id: 'water-arena',
        title: 'Off-Road Proving Ground',
        subtitle: 'Drive Through',
        position: [420, 20, 220],
        targetLocationId: 'offroad',
        type: 'navigation',
        description: 'Continue onto the hill climbs, sand traps, and articulation axle twist arena.'
      },
      {
        id: 'water-pavilion',
        title: 'Riverside Veranda',
        subtitle: 'Spectator Deck',
        position: [-400, 60, -260],
        type: 'info',
        description: 'Elevated wooden deck providing panoramic views of vehicles navigating the splash zone.'
      }
    ]
  },
  {
    id: 'nest-cafe',
    slug: 'nest-cafe',
    title: 'Parinda Nest / Cafe',
    tagline: 'Sunset Ridge Deck & Fire Pit',
    image: '/panoramas/nest-cafe-360.jpg',
    thumbnail: '/panoramas/nest-cafe-360.jpg',
    category: 'Dining & Relaxation',
    defaultYaw: 0.1,
    defaultPitch: -0.05,
    description:
      'Scenic outdoor cafe surrounded by nature with seating, warm lighting, mountain/forest views and a premium adventure-resort atmosphere.',
    hotspots: [
      {
        id: 'nest-fire',
        title: 'Sunset Fire Table',
        subtitle: 'Central Lounge',
        position: [-90, -110, -460],
        type: 'info',
        description: 'Artisan stone fire pit offering 360-degree warmth during crisp Himalayan evenings.'
      },
      {
        id: 'nest-deck',
        title: 'Pergola Pavilion',
        subtitle: 'Artisan Dining',
        position: [-380, 20, -280],
        type: 'info',
        description: 'Reclaimed timber pergola serving farm-to-table cuisine, artisanal brews, and specialty coffees.'
      },
      {
        id: 'nest-camp',
        title: 'Campground Valley',
        subtitle: 'Look Below',
        position: [420, -40, 240],
        targetLocationId: 'camping',
        type: 'navigation',
        description: 'Look down onto the campfire lights and tents nestled in the forested clearing.'
      }
    ]
  },
  {
    id: 'offroad',
    slug: 'offroad',
    title: 'Parinda Off-Road Arena',
    tagline: 'Extreme Articulation & Proving Grounds',
    image: '/panoramas/offroad-360.jpg',
    thumbnail: '/panoramas/offroad-360.jpg',
    category: 'Proving Ground',
    defaultYaw: 0,
    defaultPitch: 0,
    description:
      'Adventure off-road track with bikes, cars, rocks, dirt terrain, obstacles and natural surroundings.',
    hotspots: [
      {
        id: 'off-mound',
        title: 'Hill Climb Mound',
        subtitle: '45° Incline',
        position: [-360, 40, -320],
        type: 'info',
        description: 'Engineered earth ramp testing approach angles, hill descent control, and traction.'
      },
      {
        id: 'off-water',
        title: 'Water Crossing Entry',
        subtitle: 'Splash Track',
        position: [380, -60, -290],
        targetLocationId: 'water-crossing',
        type: 'navigation',
        description: 'Drive straight down into the natural river crossing and boulder riverbed track.'
      },
      {
        id: 'off-valley',
        title: 'Spectator Ridge',
        subtitle: 'Command Vantage',
        position: [120, 110, 450],
        type: 'info',
        description: 'Overlook the complete multi-acre motorworks track with panoramic alpine mountain backdrop.'
      }
    ]
  }
];

export function getLocationById(id: string): PanoramaLocation | undefined {
  return PANORAMA_LOCATIONS.find((loc) => loc.id === id || loc.slug === id);
}
