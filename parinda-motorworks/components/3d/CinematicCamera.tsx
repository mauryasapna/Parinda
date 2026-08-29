import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { getTrackState } from './trackPath';

export type CameraMode = 'intro' | 'cinematic' | 'follow-bike' | 'follow-car' | 'orbit';

interface CinematicCameraProps {
  mode: CameraMode;
  progress: number;
}

export function CinematicCamera({ mode, progress }: CinematicCameraProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(15, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(35, 48, 60));

  useFrame((state, delta) => {
    if (mode === 'orbit') return; // Handled by OrbitControls

    const bikeState = getTrackState(progress, 38);
    const carProgress = (progress - 0.07 + 1) % 1;
    const carState = getTrackState(carProgress, 35);

    const lerpFactor = Math.min(delta * 2.8, 1);

    if (mode === 'intro') {
      // Cinematic slow aerial sweep high above the lake and mountains
      const time = state.clock.elapsedTime * 0.12;
      const radius = 65;
      targetCamPos.current.set(
        20 + Math.sin(time) * radius,
        42 + Math.cos(time * 0.8) * 8,
        25 + Math.cos(time) * radius
      );
      currentLookAt.current.lerp(new THREE.Vector3(10, 0, 0), lerpFactor);
    } else if (mode === 'follow-bike') {
      // Third-person chase camera behind the motorcycle
      const forward = bikeState.tangent.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(forward, up).normalize();

      const camOffset = forward.clone().multiplyScalar(-7).add(up.clone().multiplyScalar(3.2)).add(right.clone().multiplyScalar(1.2));
      targetCamPos.current.copy(bikeState.position).add(camOffset);

      const lookTarget = bikeState.position.clone().add(forward.clone().multiplyScalar(4));
      currentLookAt.current.lerp(lookTarget, lerpFactor);
    } else if (mode === 'follow-car') {
      // Third-person chase camera behind the 4x4
      const forward = carState.tangent.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);

      const camOffset = forward.clone().multiplyScalar(-9).add(up.clone().multiplyScalar(4.0));
      targetCamPos.current.copy(carState.position).add(camOffset);

      const lookTarget = carState.position.clone().add(forward.clone().multiplyScalar(5));
      currentLookAt.current.lerp(lookTarget, lerpFactor);
    } else if (mode === 'cinematic') {
      // Dynamic Director angles based on the 5 narrative stages
      const { stageName, position, tangent } = bikeState;
      const forward = tangent.clone().normalize();

      if (stageName === 'ARRIVE') {
        // High paddock view
        targetCamPos.current.set(-58, 8, -50);
        currentLookAt.current.lerp(position, lerpFactor);
      } else if (stageName === 'RIDE') {
        // Dynamic side-angle panning with dirt mound in foreground
        targetCamPos.current.set(-2, 5, -18);
        currentLookAt.current.lerp(position.clone().add(forward.clone().multiplyScalar(2)), lerpFactor);
      } else if (stageName === 'CROSS') {
        // Low waterline camera capturing the dramatic water splashing
        targetCamPos.current.set(38, 2.5, 26);
        currentLookAt.current.lerp(position, lerpFactor);
      } else if (stageName === 'CONQUER') {
        // Front-on elevation shot looking up at the rock ramp & wooden bridge
        targetCamPos.current.set(-22, 5.5, -18);
        currentLookAt.current.lerp(position, lerpFactor);
      } else {
        // EXIT: Spectator deck view capturing the finish pass
        targetCamPos.current.set(-36, 4.5, -28);
        currentLookAt.current.lerp(position, lerpFactor);
      }
    }

    // Apply smooth position and orientation
    camera.position.lerp(targetCamPos.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <>
      {mode === 'orbit' && (
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={120}
          maxPolarAngle={Math.PI / 2 - 0.05}
          target={[10, 0, 0]}
        />
      )}
    </>
  );
}
