import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";

export default function Paddle() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const rigidBodyRef = useRef<RapierRigidBody | null>(null); // ✅ Correct type

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x =
        ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 10;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(
        { x: mousePosition.current.x, y: -3, z: 0 },
        true // Wake up physics to apply changes
      );
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type='kinematicPosition'
      colliders='cuboid'
      restitution={2.5}
    >
      <mesh>
        <boxGeometry args={[1.5, 0.25 / 2, 0.35]} />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  );
}
