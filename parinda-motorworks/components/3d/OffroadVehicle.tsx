import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getTrackState } from './trackPath';

interface OffroadVehicleProps {
  progress: number;
}

export function OffroadVehicle({ progress }: OffroadVehicleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Follow slightly behind the lead bike (offset by -0.06 in track progress)
    const carProgress = (progress - 0.07 + 1) % 1;
    const state = getTrackState(carProgress, 35);
    const { position, tangent } = state;

    // Position vehicle (with slight lateral offset to show staggered formation)
    const forward = tangent.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(forward, up).normalize();

    const carPos = position.clone().add(right.clone().multiplyScalar(0.6));
    groupRef.current.position.copy(carPos);

    // Look at next point ahead
    const targetPoint = carPos.clone().add(forward.clone().multiplyScalar(5));
    groupRef.current.lookAt(targetPoint);

    // Suspension articulation & body roll
    const roll = (forward.x * right.z - forward.z * right.x) * 0.4;
    groupRef.current.rotation.z = -roll;

    const rockBounce = Math.sin(carProgress * 120) * (state.isRock ? 0.15 : state.isWater ? 0.07 : 0.02);
    groupRef.current.position.y += rockBounce;

    // Rotate 4 wheels
    const rotSpeed = delta * (state.speedKmh * 0.6);
    wheelsRef.current.forEach(w => {
      if (w) w.rotation.x += rotSpeed;
    });
  });

  return (
    <group ref={groupRef}>
      {/* ================= 4X4 CHASSIS & BODY ================= */}
      {/* Main Lower Body Hull (Military Olive / Dark Green) */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.7, 0.65, 3.2]} />
        <meshStandardMaterial color="#2d3225" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Cabin / Hardtop (Matte Charcoal) */}
      <mesh position={[0, 1.35, -0.2]} castShadow>
        <boxGeometry args={[1.55, 0.65, 2.0]} />
        <meshStandardMaterial color="#1a1c18" roughness={0.5} />
      </mesh>

      {/* Front Windshield (Tinted Dark Glass) */}
      <mesh position={[0, 1.35, 0.82]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[1.4, 0.55, 0.05]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[0.79, 1.35, -0.2]}>
        <boxGeometry args={[0.02, 0.45, 1.6]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-0.79, 1.35, -0.2]}>
        <boxGeometry args={[0.02, 0.45, 1.6]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Front Hood & Grille */}
      <mesh position={[0, 0.95, 1.1]} castShadow>
        <boxGeometry args={[1.5, 0.25, 0.95]} />
        <meshStandardMaterial color="#2d3225" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Heavy-Duty Winch Front Bumper */}
      <mesh position={[0, 0.5, 1.68]} castShadow>
        <boxGeometry args={[1.8, 0.35, 0.3]} />
        <meshStandardMaterial color="#141512" roughness={0.7} />
      </mesh>
      {/* Front Winch & Fairlead */}
      <mesh position={[0, 0.58, 1.84]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 12]} />
        <meshStandardMaterial color="#888" metalness={0.9} />
      </mesh>

      {/* Snorkel Intake on Driver Pillar */}
      <group position={[0.82, 1.25, 0.7]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.8, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.42, 0.06]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.12, 0.14, 0.14]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* Round Off-Road Headlights */}
      <mesh position={[0.55, 0.82, 1.62]}>
        <cylinderGeometry args={[0.13, 0.13, 0.05, 16]} />
        <meshStandardMaterial color="#fff" emissive="#ffeecc" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-0.55, 0.82, 1.62]}>
        <cylinderGeometry args={[0.13, 0.13, 0.05, 16]} />
        <meshStandardMaterial color="#fff" emissive="#ffeecc" emissiveIntensity={3} />
      </mesh>
      <pointLight position={[0, 0.9, 2.5]} color="#fff5dd" intensity={4} distance={16} />

      {/* Roof Expedition Rack with LED Lightbar */}
      <group position={[0, 1.75, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[1.45, 0.12, 1.9]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
        {/* Spare Tire on Roof */}
        <mesh position={[0, 0.22, -0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.36, 0.16, 12, 24]} />
          <meshStandardMaterial color="#181818" roughness={0.9} />
        </mesh>
        {/* LED Lightbar at front of Roof Rack */}
        <mesh position={[0, 0.05, 0.98]}>
          <boxGeometry args={[1.3, 0.08, 0.08]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={4} />
        </mesh>
      </group>

      {/* Rear Mounted Spare Wheel / Jerry Cans */}
      <mesh position={[0, 0.95, -1.75]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.42, 0.18, 12, 24]} />
        <meshStandardMaterial color="#181818" roughness={0.9} />
      </mesh>

      {/* ================= 4X MUD-TERRAIN WHEELS ================= */}
      {/* Front Left Wheel */}
      <group position={[0.88, 0.45, 1.0]}>
        <group ref={(el) => { if (el) wheelsRef.current[0] = el; }}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.18, 12, 24]} />
            <meshStandardMaterial color="#141414" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.22, 16]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Front Right Wheel */}
      <group position={[-0.88, 0.45, 1.0]}>
        <group ref={(el) => { if (el) wheelsRef.current[1] = el; }}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.18, 12, 24]} />
            <meshStandardMaterial color="#141414" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.22, 16]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Rear Left Wheel */}
      <group position={[0.88, 0.45, -1.0]}>
        <group ref={(el) => { if (el) wheelsRef.current[2] = el; }}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.18, 12, 24]} />
            <meshStandardMaterial color="#141414" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.22, 16]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Rear Right Wheel */}
      <group position={[-0.88, 0.45, -1.0]}>
        <group ref={(el) => { if (el) wheelsRef.current[3] = el; }}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.42, 0.18, 12, 24]} />
            <meshStandardMaterial color="#141414" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.22, 16]} />
            <meshStandardMaterial color="#2d2d2d" metalness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
