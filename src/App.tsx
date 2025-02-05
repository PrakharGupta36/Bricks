import { Canvas } from "@react-three/fiber";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

export default function App() {
  return (
    <Canvas style={{ background: "black" }}>
      <Paddle />
      <Ball />
    </Canvas>
  );
}
