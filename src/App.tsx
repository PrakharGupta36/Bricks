import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Paddle from "./components/Paddle";

export default function App() {
  return (
    <Canvas style={{ background: "black" }}>
      <Paddle />
      <OrbitControls />
    </Canvas>
  );
}
