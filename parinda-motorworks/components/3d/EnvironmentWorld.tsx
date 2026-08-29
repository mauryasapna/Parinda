import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnvironmentWorldProps {
  progress: number;
}

export function EnvironmentWorld({ progress }: EnvironmentWorldProps) {
  const waterRef = useRef<THREE.Mesh>(null);
  const splashParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);

  // Generate trees in the valley
  const trees = useMemo(() => {
    const arr = [];
    // Perimeter and mountain slopes
    for (let i = 0; i < 45; i++) {
      const angle = (i / 45) * Math.PI * 2;
      const radius = 55 + Math.sin(i * 3) * 15;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.8 + (i % 5) * 0.25;
      arr.push({ x, z, scale });
    }
    // Lakeside trees
    for (let j = 0; j < 12; j++) {
      const x = 35 + Math.sin(j * 2) * 12;
      const z = -25 + Math.cos(j * 3) * 15;
      arr.push({ x, z, scale: 0.9 + (j % 3) * 0.2 });
    }
    return arr;
  }, []);

  // Generate boulders and rocks
  const rocks = useMemo(() => {
    const arr = [];
    // Lake entry and rock crawl zone
    for (let i = 0; i < 28; i++) {
      const x = 12 + Math.sin(i * 1.5) * 16;
      const z = 8 + Math.cos(i * 1.2) * 18;
      const scale = 0.6 + (i % 4) * 0.4;
      const rot = (i * 0.7);
      arr.push({ x, z, scale, rot });
    }
    // Ridge rocks
    for (let j = 0; j < 15; j++) {
      const x = -5 + Math.cos(j) * 18;
      const z = -26 + Math.sin(j) * 8;
      const scale = 0.8 + (j % 3) * 0.5;
      arr.push({ x, z, scale, rot: j });
    }
    return arr;
  }, []);

  // Dust and Water splash particle positions
  const splashPoints = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 2.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Water shader wave ripple animation
    if (waterRef.current) {
      waterRef.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
    }

    // Splash animation in water zone (progress 0.38 - 0.62)
    if (splashParticlesRef.current) {
      const inWater = progress > 0.36 && progress < 0.64;
      splashParticlesRef.current.visible = inWater;
      if (inWater) {
        splashParticlesRef.current.rotation.y += delta * 2;
      }
    }
  });

  return (
    <group>
      {/* ================= TERRAIN & DIRT GROUND ================= */}
      {/* Main Arena Floor with Natural Dirt / Grass Blend */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[180, 180, 48, 48]} />
        <meshStandardMaterial color="#2d291e" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Dirt Track Course Ribbon (Dark compact earth & tire ruts) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, -0.18, -10]} receiveShadow>
        <ringGeometry args={[16, 42, 64]} />
        <meshStandardMaterial color="#3a3020" roughness={0.95} />
      </mesh>

      {/* ================= PARINDA LAKE ================= */}
      {/* Lake Bed Depression */}
      <group position={[24, 0, 8]}>
        {/* Animated Water Surface */}
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[42, 38, 32, 32]} />
          <meshStandardMaterial
            color="#2a5a5e"
            roughness={0.08}
            metalness={0.8}
            transparent
            opacity={0.82}
          />
        </mesh>
        {/* Water Foam Splash Particles */}
        <points ref={splashParticlesRef} position={[0, 0.4, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[splashPoints, 3]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.25} color="#e0f4f7" transparent opacity={0.7} />
        </points>

        {/* Submerged Lake Pebble Bed */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
          <planeGeometry args={[44, 40]} />
          <meshStandardMaterial color="#1a2e30" roughness={0.9} />
        </mesh>

        {/* Lake Edge Reeds & Timber Posts */}
        {[-14, -8, 0, 8, 14].map((px, idx) => (
          <group key={px} position={[px, 0.2, 18]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.12, 0.12, 1.2, 8]} />
              <meshStandardMaterial color="#554433" />
            </mesh>
            {/* Guide Rope */}
            {idx < 4 && (
              <mesh position={[3, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 6, 6]} />
                <meshStandardMaterial color="#887766" />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* ================= DIRT MOUNDS & ELEVATED RAMPS ================= */}
      {/* Skill Zone Dirt Mound (Ride Stage) */}
      <group position={[-14, 0, -2]}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.5, 9, 2.2, 16]} />
          <meshStandardMaterial color="#51402a" roughness={0.95} />
        </mesh>
        {/* Safety cones on mound */}
        <mesh position={[1.8, 2.2, 0.5]} castShadow>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial color="#ff5500" />
        </mesh>
        <mesh position={[-1.8, 2.2, -0.5]} castShadow>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial color="#ff5500" />
        </mesh>
      </group>

      {/* ================= WOODEN SUSPENSION OBSTACLE BRIDGE ================= */}
      <group position={[-10, 0, -31]}>
        {/* Bridge Wooden Deck */}
        <mesh position={[0, 2.2, 0]} rotation={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.25, 18]} />
          <meshStandardMaterial color="#5a452e" roughness={0.8} />
        </mesh>
        {/* Bridge Timber Support Columns */}
        {[-8, -4, 0, 4, 8].map((bz) => (
          <group key={bz} position={[0, 0, bz]}>
            <mesh position={[1.9, 1.1, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.22, 2.4, 8]} />
              <meshStandardMaterial color="#3a2818" />
            </mesh>
            <mesh position={[-1.9, 1.1, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.22, 2.4, 8]} />
              <meshStandardMaterial color="#3a2818" />
            </mesh>
          </group>
        ))}
        {/* Bridge Side Railings */}
        <mesh position={[1.9, 2.7, 0]} rotation={[0, 0.25, 0]}>
          <boxGeometry args={[0.08, 0.6, 18]} />
          <meshStandardMaterial color="#4a3520" />
        </mesh>
        <mesh position={[-1.9, 2.7, 0]} rotation={[0, 0.25, 0]}>
          <boxGeometry args={[0.08, 0.6, 18]} />
          <meshStandardMaterial color="#4a3520" />
        </mesh>
      </group>

      {/* ================= ROCK RAMP & BOULDERS ================= */}
      {rocks.map((r, i) => (
        <mesh
          key={i}
          position={[r.x, r.scale * 0.5 - 0.1, r.z]}
          rotation={[r.rot, r.rot * 1.5, 0]}
          scale={[r.scale * 1.2, r.scale * 0.8, r.scale]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#4a4842" roughness={0.85} metalness={0.15} />
        </mesh>
      ))}

      {/* ================= SPECTATOR VIEWING DECK & CAFE ================= */}
      <group position={[-38, 0, -36]}>
        {/* Elevated Timber Platform */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[16, 1.2, 12]} />
          <meshStandardMaterial color="#3c3426" roughness={0.7} />
        </mesh>
        {/* Glass & Steel Railing */}
        <mesh position={[0, 1.6, 5.8]}>
          <boxGeometry args={[15.6, 0.9, 0.08]} />
          <meshStandardMaterial color="#111" transparent opacity={0.6} />
        </mesh>

        {/* Parinda Umbrellas (Signature Orange) */}
        {[-4, 4].map((ux) => (
          <group key={ux} position={[ux, 1.2, 0]}>
            {/* Pole */}
            <mesh position={[0, 1.4, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            {/* Umbrella Canopy */}
            <mesh position={[0, 2.6, 0]} castShadow>
              <coneGeometry args={[2.2, 0.8, 8]} />
              <meshStandardMaterial color="#c47c43" roughness={0.5} />
            </mesh>
            {/* Wooden Table & Chairs */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.75, 0.75, 0.08, 16]} />
              <meshStandardMaterial color="#554433" />
            </mesh>
          </group>
        ))}

        {/* Parinda Motorworks Signboard on Deck */}
        <mesh position={[0, 2.8, 5.8]} castShadow>
          <boxGeometry args={[6, 0.8, 0.1]} />
          <meshStandardMaterial color="#141512" roughness={0.4} />
        </mesh>
      </group>

      {/* ================= PARINDA TRACK SIGNAGE & BANNERS ================= */}
      {/* Victory Arch / Start Gate */}
      <group position={[-46, 0, -38]}>
        <mesh position={[3.5, 2.5, 0]} castShadow>
          <boxGeometry args={[0.4, 5, 0.4]} />
          <meshStandardMaterial color="#c47c43" />
        </mesh>
        <mesh position={[-3.5, 2.5, 0]} castShadow>
          <boxGeometry args={[0.4, 5, 0.4]} />
          <meshStandardMaterial color="#c47c43" />
        </mesh>
        {/* Overhead Banner */}
        <mesh position={[0, 4.6, 0]} castShadow>
          <boxGeometry args={[7.4, 1.2, 0.15]} />
          <meshStandardMaterial color="#141512" roughness={0.3} />
        </mesh>
      </group>

      {/* ================= PINE TREES & VALLEY FOLIAGE ================= */}
      {trees.map((t, idx) => (
        <group key={idx} position={[t.x, 0, t.z]} scale={[t.scale, t.scale, t.scale]}>
          {/* Tree Trunk */}
          <mesh position={[0, 1.6, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.45, 3.2, 8]} />
            <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
          </mesh>
          {/* Pine Foliage Cone 1 */}
          <mesh position={[0, 3.8, 0]} castShadow>
            <coneGeometry args={[2.2, 3.2, 8]} />
            <meshStandardMaterial color="#21321d" roughness={0.8} />
          </mesh>
          {/* Pine Foliage Cone 2 */}
          <mesh position={[0, 5.4, 0]} castShadow>
            <coneGeometry args={[1.7, 2.6, 8]} />
            <meshStandardMaterial color="#2d4227" roughness={0.8} />
          </mesh>
          {/* Pine Foliage Cone 3 */}
          <mesh position={[0, 6.8, 0]} castShadow>
            <coneGeometry args={[1.1, 2.0, 8]} />
            <meshStandardMaterial color="#3a5433" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Background Distant Mountain Silhouettes */}
      <mesh position={[0, 12, -95]}>
        <coneGeometry args={[90, 45, 6]} />
        <meshStandardMaterial color="#181a15" roughness={0.95} />
      </mesh>
      <mesh position={[85, 15, -60]}>
        <coneGeometry args={[80, 50, 6]} />
        <meshStandardMaterial color="#141612" roughness={0.95} />
      </mesh>
      <mesh position={[-85, 14, 40]}>
        <coneGeometry args={[75, 42, 6]} />
        <meshStandardMaterial color="#161814" roughness={0.95} />
      </mesh>
    </group>
  );
}
