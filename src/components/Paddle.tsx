import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import useStore, {
  PaddleMaterialComponent,
  useMouseTracker,
} from "../utils/State";

export default function Paddle() {
  useMouseTracker(); // ✅ Ensures mouse tracking starts

  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const mousePosition = useStore((state) => state.mousePosition);

  const { paddles } = useStore();

  const paddle = paddles.find((e) => e.selected);

  useFrame(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(
        { x: mousePosition.x, y: -3, z: 0 },
        true
      );
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type='kinematicPosition'
      colliders='cuboid'
      restitution={2.55}
      onContactForce={(e) => {
        const ballRigidBody = e.rigidBody;
        if (!ballRigidBody) return;

        // Determine impulse direction based on mouse position
        const impulseX =
          mousePosition.x > 0
            ? -0.5 // Move left when x > 0
            : 0.5; // Move right when x < 0

        const randomImpulse = new THREE.Vector3(impulseX, 0, 0);
        ballRigidBody.applyImpulse(randomImpulse, true);
      }}
    >
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1.5, 0.125, 0.35]} />
        {paddle?.material.length ? (
          PaddleMaterialComponent(paddle?.color, paddle?.material)
        ) : (
          <meshNormalMaterial />
        )}
      </mesh>
    </RigidBody>
  );
}
