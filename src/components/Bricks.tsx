import { RigidBody } from "@react-three/rapier";
import useStore from "../utils/State";
import { useEffect } from "react";
import * as THREE from "three";

export default function Bricks() {
  const { bricks, setBricks, handleCollision } = useStore();

  const height = 3;

  useEffect(() => {
    setBricks([
      // Row - 1
      {
        id: 1,
        position: [-4, height, 0],
      },
      {
        id: 2,
        position: [-2, height, 0],
      },
      {
        id: 3,
        position: [0, height, 0],
      },
      {
        id: 4,
        position: [2, height, 0],
      },
      {
        id: 5,
        position: [4, height, 0],
      },
      // Row - 2

      {
        id: 6,
        position: [-4, height - 0.5, 0],
      },
      {
        id: 7,
        position: [-2, height - 0.5, 0],
      },
      {
        id: 8,
        position: [0, height - 0.5, 0],
      },
      {
        id: 9,
        position: [2, height - 0.5, 0],
      },
      {
        id: 10,
        position: [4, height - 0.5, 0],
      },

      // Row - 3

      {
        id: 11,
        position: [-4, height - 1, 0],
      },
      {
        id: 12,
        position: [-2, height - 1, 0],
      },
      {
        id: 13,
        position: [0, height - 1, 0],
      },
      {
        id: 14,
        position: [2, height - 1, 0],
      },
      {
        id: 15,
        position: [4, height - 1, 0],
      },
    ]);
  }, [setBricks]);

  return (
    <>
      {bricks.map((brick) => {
        return (
          <RigidBody
            key={brick.id}
            colliders='cuboid'
            type='fixed'
            restitution={1.5}
            name={`brick-${brick.id}`}
            onContactForce={(e) => {
              const ballRigidBody = e.rigidBody;
              if (!ballRigidBody) return;

              // Slow down the ball by reducing its velocity
              const currentVelocity = ballRigidBody.linvel(); // Get current velocity
              const slowFactor = 0.5; // Adjust this to control how much it slows down

              const newVelocity = new THREE.Vector3(
                currentVelocity.x * slowFactor,
                currentVelocity.y * slowFactor,
                currentVelocity.z * slowFactor
              );

              ballRigidBody.setLinvel(newVelocity, true);

              // Apply a small impulse to bricks
              const randomImpulse = new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                0,
                0
              );

              ballRigidBody.applyImpulse(randomImpulse, true);

              handleCollision(brick.id);
            }}
          >
            <mesh position={brick.position}>
              <boxGeometry args={[1.75, 0.2, 0.3]} />
              <meshNormalMaterial />
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
}
