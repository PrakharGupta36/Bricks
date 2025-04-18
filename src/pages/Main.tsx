import { Canvas } from "@react-three/fiber";
import useStore from "../utils/State";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Game from "../components/Game";
import Menu from "../components/Menu";

export default function Main() {
  const { start, canvasRef } = useStore();

  useGSAP(
    () => {
      if (start) {
        gsap.fromTo(
          "main",
          {
            backgroundColor: "black",
          },
          { backgroundColor: "white", duration: 0.75 }
        );
      } else {
        gsap.fromTo(
          "main",
          {
            backgroundColor: "white",
          },
          { backgroundColor: "black", duration: 0.75 }
        );
      }
    },
    { dependencies: [start] }
  );

  return (
    <Canvas className='canvas' ref={canvasRef}>
      {start ? <Game /> : <Menu />}
    </Canvas>
  );
}
