import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import useStore from "../utils/State";

export default function Boundary() {
  function Wall({
    position,
    rotation,
    scale,
    bottom,
    side,
  }: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number];
    bottom?: boolean;
    side?: boolean; // Left or Right walls
  }) {
    const { setTime } = useStore();

    return (
      <RigidBody
        type='fixed'
        onCollisionEnter={({ target }) => {
          if (!target) return;
          const ballRigidBody = target.rigidBody;
          if (!ballRigidBody) return;

          // Get current velocity
          const currentVelocity = ballRigidBody.linvel();
          const speed = Math.sqrt(
            currentVelocity.x ** 0.5 +
              currentVelocity.y ** 8 +
              currentVelocity.z ** 0.5
          ); // Calculate speed

          const newVelocity = new THREE.Vector3(
            currentVelocity.x,
            currentVelocity.y,
            currentVelocity.z
          );

          if (bottom) {
            setTime(0);
          }

          if (side) {
            // Reflect X direction (Left & Right walls)
            newVelocity.x *= -1;
          }

          // Normalize and maintain speed
          newVelocity.normalize().multiplyScalar(speed);

          // Apply new velocity
          ballRigidBody.setLinvel(newVelocity, true);
        }}
        restitution={1} // Ensures perfect bounce
      >
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
        bottom={true} // Bottom (Can be used for game over)
      />
      <Wall
        position={[5, 0.37, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[10, 7]}
        side={true} // Right (Reflects X direction)
      />
      <Wall
        position={[-5, 0.37, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[10, 7]}
        side={true} // Left (Reflects X direction)
      />
      <Wall
        position={[0, 3.85, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10]}
        // Top (Reflects Y direction)
      />
      <Wall
        position={[0, 0.37, 5]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[7, 10]}
      />
      <Wall
        position={[0, 0.37, -5]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[7, 10]}
      />
    </>
  );
}
