import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Paddle() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const meshRef = useRef<Mesh | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x =
        ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 10;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = mousePosition.current.x; // ✅ No more TS error
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -3, 0]}>
      <boxGeometry args={[1.5, 0.25 / 2, 0.35]} />
      <meshNormalMaterial />
    </mesh>
  );
}
