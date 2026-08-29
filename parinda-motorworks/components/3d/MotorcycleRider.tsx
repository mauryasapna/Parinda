import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getTrackState, TrackState } from './trackPath';

interface MotorcycleRiderProps {
  progress: number;
  onStateUpdate?: (state: TrackState) => void;
}

export function MotorcycleRider({ progress, onStateUpdate }: MotorcycleRiderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const frontWheelRef = useRef<THREE.Mesh>(null);
  const rearWheelRef = useRef<THREE.Mesh>(null);
  const riderBodyRef = useRef<THREE.Group>(null);

  const prevPos = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const state = getTrackState(progress, 38);
    if (onStateUpdate) {
      onStateUpdate(state);
    }

    const { position, tangent } = state;

    // Position vehicle
    groupRef.current.position.copy(position);

    // Calculate forward orientation
    const forward = tangent.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(forward, up).normalize();

    // Look at target point ahead
    const targetPoint = position.clone().add(forward.clone().multiplyScalar(4));
    groupRef.current.lookAt(targetPoint);

    // Dynamic bank / lean angle into turns
    const curvature = forward.x * right.z - forward.z * right.x;
    const leanAngle = THREE.MathUtils.clamp(curvature * 0.8, -0.4, 0.4);
    groupRef.current.rotation.z = -leanAngle;

    // Suspension bounce and subtle engine vibration
    const bounce = Math.sin(progress * 150) * (state.isWater ? 0.08 : state.isRock ? 0.12 : 0.03);
    groupRef.current.position.y += bounce;

    // Rider standing dynamics
    if (riderBodyRef.current) {
      riderBodyRef.current.rotation.x = -state.inclineAngle * 0.015;
      riderBodyRef.current.rotation.z = leanAngle * 0.5;
    }

    // Wheel rotation
    const wheelRotSpeed = delta * (state.speedKmh * 0.8);
    if (frontWheelRef.current) frontWheelRef.current.rotation.x += wheelRotSpeed;
    if (rearWheelRef.current) rearWheelRef.current.rotation.x += wheelRotSpeed;

    prevPos.current.copy(position);
  });

  return (
    <group ref={groupRef}>
      {/* ================= MOTORCYCLE CHASSIS ================= */}
      {/* Main Frame & Engine Block */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.35, 0.45, 1.1]} />
        <meshStandardMaterial color="#1a1c18" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Engine Crankcase (Silver Metallic) */}
      <mesh position={[0, 0.35, -0.05]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.38, 12]} />
        <meshStandardMaterial color="#4a4c48" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Parinda Accent Fuel Tank (Copper/Orange) */}
      <mesh position={[0, 0.82, 0.2]} castShadow>
        <boxGeometry args={[0.42, 0.32, 0.65]} />
        <meshStandardMaterial color="#c47c43" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Rally Windscreen & Fairing */}
      <mesh position={[0, 1.1, 0.58]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.38, 0.05]} />
        <meshStandardMaterial color="#2a2c28" transparent opacity={0.85} roughness={0.1} />
      </mesh>

      {/* Dual LED Headlight */}
      <mesh position={[0, 0.95, 0.65]}>
        <boxGeometry args={[0.22, 0.12, 0.06]} />
        <meshStandardMaterial color="#fff" emissive="#ffeecc" emissiveIntensity={2.5} />
      </mesh>
      <pointLight position={[0, 0.95, 1.2]} color="#fff0d0" intensity={3} distance={12} />

      {/* Front Fork Suspension */}
      <mesh position={[0.14, 0.6, 0.6]} rotation={[-0.35, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.9, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.14, 0.6, 0.6]} rotation={[-0.35, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.9, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Front Spoked Wheel */}
      <group position={[0, 0.38, 0.85]}>
        <mesh ref={frontWheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.38, 0.09, 12, 24]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        {/* Rim & Hub */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.08, 16]} />
          <meshStandardMaterial color="#666" metalness={0.8} wireframe />
        </mesh>
      </group>

      {/* Rear Spoked Wheel */}
      <group position={[0, 0.35, -0.75]}>
        <mesh ref={rearWheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.35, 0.11, 12, 24]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.1, 16]} />
          <meshStandardMaterial color="#666" metalness={0.8} wireframe />
        </mesh>
      </group>

      {/* Exhaust Pipe & Silencer */}
      <mesh position={[0.22, 0.55, -0.35]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.065, 0.65, 8]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0, 1.05, 0.38]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.75, 8]} />
        <meshStandardMaterial color="#333" metalness={0.8} />
      </mesh>

      {/* ADV Hard Panniers (Luggage Boxes on Rear) */}
      <mesh position={[0.28, 0.7, -0.65]} castShadow>
        <boxGeometry args={[0.18, 0.3, 0.4]} />
        <meshStandardMaterial color="#silver" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-0.28, 0.7, -0.65]} castShadow>
        <boxGeometry args={[0.18, 0.3, 0.4]} />
        <meshStandardMaterial color="#silver" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* ================= STANDING ADV RIDER ================= */}
      <group ref={riderBodyRef} position={[0, 0.75, 0]}>
        {/* Boots on Footpegs */}
        <mesh position={[0.16, -0.15, -0.1]} castShadow>
          <boxGeometry args={[0.12, 0.18, 0.22]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[-0.16, -0.15, -0.1]} castShadow>
          <boxGeometry args={[0.12, 0.18, 0.22]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        {/* Legs / Armored Pants (Standing Off-Road Stance with bent knees) */}
        <mesh position={[0.14, 0.18, -0.05]} rotation={[-0.2, 0, 0.08]} castShadow>
          <capsuleGeometry args={[0.08, 0.38, 4, 8]} />
          <meshStandardMaterial color="#2b2d28" roughness={0.7} />
        </mesh>
        <mesh position={[-0.14, 0.18, -0.05]} rotation={[-0.2, 0, -0.08]} castShadow>
          <capsuleGeometry args={[0.08, 0.38, 4, 8]} />
          <meshStandardMaterial color="#2b2d28" roughness={0.7} />
        </mesh>

        {/* Torso & Armored Adventure Jacket */}
        <mesh position={[0, 0.6, 0.02]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.34, 0.46, 0.24]} />
          <meshStandardMaterial color="#c47c43" roughness={0.6} />
        </mesh>

        {/* Armored Shoulders / Chest Plate */}
        <mesh position={[0, 0.72, 0.03]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.42, 0.14, 0.26]} />
          <meshStandardMaterial color="#20221e" roughness={0.5} />
        </mesh>

        {/* Arms Reaching to Handlebars */}
        <mesh position={[0.22, 0.52, 0.18]} rotation={[0.65, 0.15, -0.25]} castShadow>
          <capsuleGeometry args={[0.06, 0.38, 4, 8]} />
          <meshStandardMaterial color="#2b2d28" roughness={0.7} />
        </mesh>
        <mesh position={[-0.22, 0.52, 0.18]} rotation={[0.65, -0.15, 0.25]} castShadow>
          <capsuleGeometry args={[0.06, 0.38, 4, 8]} />
          <meshStandardMaterial color="#2b2d28" roughness={0.7} />
        </mesh>

        {/* Helmet (Adventure Helmet with Sun Peak & Visor) */}
        <group position={[0, 0.95, 0.08]} rotation={[0.1, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#1a1c18" metalness={0.3} roughness={0.4} />
          </mesh>
          {/* Visor */}
          <mesh position={[0, 0.02, 0.12]}>
            <boxGeometry args={[0.18, 0.08, 0.06]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Sun Peak / Peak Visor */}
          <mesh position={[0, 0.1, 0.14]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.16, 0.02, 0.14]} />
            <meshStandardMaterial color="#c47c43" roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
