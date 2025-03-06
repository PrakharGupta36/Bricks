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

  console.log(mousePosition.x)

  return (
    <RigidBody
      ref={rigidBodyRef}
      type='kinematicPosition'
      colliders='cuboid'
      restitution={2.55}
      onContactForce={(e) => {
        const ballRigidBody = e.rigidBody;
        if (!ballRigidBody) return;

        // Scale impulse based on mousePosition.x (-4 to 4)
        let impulseX = -mousePosition.x / 4; // Range from -1 to 1
        const minImpulse = 0.3; // Ensures at least some movement

        // If impulseX is too small, apply a minimum impulse in the same direction
        if (Math.abs(impulseX) < minImpulse) {
          impulseX = impulseX > 0 ? minImpulse : -minImpulse;
        }

        const finalImpulse = new THREE.Vector3(impulseX, 0, 0);
        ballRigidBody.applyImpulse(finalImpulse, true);
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
