import { OrbitControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function Boundary() {
  function Wall({
    position,
    rotation,
    scale,
  }: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number];
  }) {
    return (
      <RigidBody type='fixed'>
        <mesh position={position} rotation={rotation}>
          <planeGeometry args={[scale[0], scale[1]]} />
          <meshBasicMaterial wireframe side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
    );
  }

  return (
    <>
      <Wall
        position={[0, -3.11, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10]}
        // Bottom
      />
      <Wall
        position={[5, 0.37, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[10, 7]}
        // Right
      />
      <Wall
        position={[-5, 0.37, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[10, 7]}
        // Left
      />
      <Wall
        position={[0, 3.85, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10]}
        // Top
      />
      <Wall
        position={[0, 0.37, 5]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[7, 10]}
        // Front
      />
      <Wall
        position={[0, 0.37, -5]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[7, 10]}
        // Back
      />
      <OrbitControls />
    </>
  );
}
