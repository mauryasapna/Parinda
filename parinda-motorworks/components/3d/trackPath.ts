import * as THREE from 'three';

// 3D Spline Path for the Parinda Off-Road & Lake Crossing Circuit
export const trackControlPoints = [
  new THREE.Vector3(-48, 0.4, -38),  // 0: Arrive / Staging Paddock
  new THREE.Vector3(-32, 0.5, -22),  // 1: Gravel Trail Entry
  new THREE.Vector3(-14, 2.0, -2),   // 2: Dirt Mound Incline (Ride)
  new THREE.Vector3(4, 0.8, 14),     // 3: Banking Corner
  new THREE.Vector3(18, -0.3, 20),   // 4: Lake Water Entry (Cross)
  new THREE.Vector3(30, -0.45, 6),   // 5: Deep Lake Wading Trench
  new THREE.Vector3(22, 0.2, -10),   // 6: River Pebble Exit
  new THREE.Vector3(8, 2.6, -24),    // 7: Rock Boulder Ramp (Conquer)
  new THREE.Vector3(-12, 2.3, -32),  // 8: Wooden Bridge Crest
  new THREE.Vector3(-30, 0.5, -36),  // 9: Spectator Deck Straight (Exit)
  new THREE.Vector3(-48, 0.4, -38)   // 10: Loop back to Staging
];

export const trackCurve = new THREE.CatmullRomCurve3(trackControlPoints, true, 'catmullrom', 0.5);

export interface TrackState {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  stageName: 'ARRIVE' | 'RIDE' | 'CROSS' | 'CONQUER' | 'EXIT';
  stageIndex: number;
  stageProgress: number;
  inclineAngle: number;
  waterDepth: number; // in mm
  speedKmh: number;
  isWater: boolean;
  isRock: boolean;
}

export function getTrackState(progress: number, baseSpeed: number = 38): TrackState {
  const t = (progress % 1 + 1) % 1;
  const position = trackCurve.getPointAt(t);
  const tangent = trackCurve.getTangentAt(t).normalize();

  // Incline calculation from tangent Y
  const inclineAngle = Math.round(tangent.y * 45);

  let stageName: 'ARRIVE' | 'RIDE' | 'CROSS' | 'CONQUER' | 'EXIT' = 'ARRIVE';
  let stageIndex = 0;
  let stageProgress = 0;
  let waterDepth = 0;
  let speedKmh = baseSpeed;
  let isWater = false;
  let isRock = false;

  if (t < 0.18) {
    stageName = 'ARRIVE';
    stageIndex = 0;
    stageProgress = t / 0.18;
    speedKmh = Math.round(25 + stageProgress * 15);
  } else if (t < 0.38) {
    stageName = 'RIDE';
    stageIndex = 1;
    stageProgress = (t - 0.18) / 0.20;
    speedKmh = Math.round(42 - Math.abs(inclineAngle) * 0.4);
  } else if (t < 0.62) {
    stageName = 'CROSS';
    stageIndex = 2;
    stageProgress = (t - 0.38) / 0.24;
    isWater = true;
    waterDepth = Math.round(450 + Math.sin(stageProgress * Math.PI) * 220);
    speedKmh = Math.round(18 + Math.sin(stageProgress * Math.PI) * 6);
  } else if (t < 0.82) {
    stageName = 'CONQUER';
    stageIndex = 3;
    stageProgress = (t - 0.62) / 0.20;
    isRock = true;
    speedKmh = Math.round(22 + (1 - stageProgress) * 8);
  } else {
    stageName = 'EXIT';
    stageIndex = 4;
    stageProgress = (t - 0.82) / 0.18;
    speedKmh = Math.round(35 + stageProgress * 10);
  }

  return {
    position,
    tangent,
    stageName,
    stageIndex,
    stageProgress,
    inclineAngle,
    waterDepth,
    speedKmh,
    isWater,
    isRock
  };
}
