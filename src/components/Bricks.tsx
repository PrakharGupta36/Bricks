import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import * as Tone from "tone";
import useStore from "../utils/State";

type BrickObject = {
  id: number;
  position: [number, number, number];
};

// Create a single synth for an arcade-style wall hit sound
const createWallHitSynth = () => {
  const synth = new Tone.MembraneSynth({
    pitchDecay: 0.05, // Quick pitch drop for a snappy effect
    octaves: 1, // Gives it that classic arcade feel
    envelope: {
      attack: 0.005,
      decay: 0.1, // Fast decay for a punchy sound
      sustain: 0,
      release: 0.05,
    },
  }).toDestination();

  return synth;
};

export default function Bricks() {
  const { bricks, setBricks, handleCollision } = useStore();

  // Ref for wall hit synth
  const wallHitSynth = useRef<Tone.MembraneSynth | null>(null);

  // Initialize synth
  useEffect(() => {
    wallHitSynth.current = createWallHitSynth();

    return () => {
      wallHitSynth.current?.dispose();
    };
  }, []);

  // Define brick layout
  const initialBricks = useMemo(() => {
    const height = 3;
    const columns = [-4, -2, 0, 2, 4];
    const rows = [height, height - 0.5, height - 1];

    return rows.flatMap((rowHeight, rowIndex) =>
      columns.map((x, colIndex) => ({
        id: rowIndex * columns.length + colIndex + 1,
        position: [x, rowHeight, 0] as [number, number, number],
      }))
    );
  }, []);

  // Set bricks on mount
  useEffect(() => {
    setBricks(initialBricks);
  }, [setBricks, initialBricks]);

  // Performance-optimized time tracking
  const lastLogTime = useRef(0);
  const heightGap = 0.5;

  // Memoized collision handler with arcade sound
  const handleBrickCollision = useCallback(
    (brick: BrickObject) => {
      if (wallHitSynth.current) {
        const notes = ["C5", "D5", "E5", "G5"]; // Classic arcade tones
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        wallHitSynth.current.triggerAttackRelease(randomNote, "8n");
      }

      handleCollision(brick.id);
    },
    [handleCollision]
  );

  // Auto-generate bricks over time
  useFrame((_state, delta) => {
    lastLogTime.current += delta;

    if (lastLogTime.current >= 5) {
      setBricks((prev: BrickObject[]) => {
        const lastBrick = prev[prev.length - 1];
        const newBricks: BrickObject[] = [
          {
            id: lastBrick.id + 1,
            position: [-4, lastBrick.position[1] - heightGap, 0],
          },
          {
            id: lastBrick.id + 2,
            position: [-2, lastBrick.position[1] - heightGap, 0],
          },
          {
            id: lastBrick.id + 3,
            position: [0, lastBrick.position[1] - heightGap, 0],
          },
          {
            id: lastBrick.id + 4,
            position: [2, lastBrick.position[1] - heightGap, 0],
          },
          {
            id: lastBrick.id + 5,
            position: [4, lastBrick.position[1] - heightGap, 0],
          },
        ];
        return [...prev, ...newBricks];
      });

      lastLogTime.current = 0;
    }
  });

  // Memoized brick rendering
  const renderedBricks = useMemo(() => {
    return bricks.map((brick) => (
      <RigidBody
        key={brick.id}
        colliders='cuboid'
        type='fixed'
        restitution={1.5}
        name={`brick-${brick.id}`}
        onContactForce={(e) => {
          const ballRigidBody = e.rigidBody;
          if (!ballRigidBody) return;

          // Apply velocity slowdown
          const currentVelocity = ballRigidBody.linvel();
          const slowFactor = 0.3;

          const newVelocity = new THREE.Vector3(
            currentVelocity.x * slowFactor,
            currentVelocity.y * slowFactor,
            currentVelocity.z * slowFactor
          );

          ballRigidBody.setLinvel(newVelocity, true);

          // Random impulse to make it dynamic
          const randomImpulse = new THREE.Vector3(
            (Math.random() - 0.5) * 0.9,
            0,
            0
          );

          ballRigidBody.applyImpulse(randomImpulse, true);

          // Play arcade sound
          handleBrickCollision(brick);
        }}
      >
        <mesh receiveShadow castShadow position={brick.position}>
          <boxGeometry args={[1.75, 0.2, 0.3]} />
          <meshStandardMaterial color='white' />
        </mesh>
      </RigidBody>
    ));
  }, [bricks, handleBrickCollision]);

  return <>{renderedBricks}</>;
}
