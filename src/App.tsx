import { Canvas } from "@react-three/fiber";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";
import useStore from "./utils/State";
import { Html } from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";

export default function App() {
  const { start, setStart } = useStore();

  const [countDown, setCountDown] = useState<number>(5);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (start && countDown > 0) {
      intervalId = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 900);
    }

    // Cleanup function to clear the interval
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [countDown, start, setCountDown]);

  useGSAP(
    () => {
      if (start) {
        gsap.to(".canvas", {
          width: "97dvw",
          height: "96.5dvh",
          borderRadius: "0.85rem",
          duration: 0.175,
        });
        gsap.fromTo(
          "main",
          {
            backgroundColor: "black",
          },
          { backgroundColor: "white", duration: 0.25 }
        );
      }
    },
    { dependencies: [start] }
  );

  return (
    <main>
      <Canvas className='canvas'>
        {start ? (
          <>
            {countDown > 0 && (
              <Html center className='overlay_container'>
                <div className='overlay'> {countDown} </div>
              </Html>
            )}
            <Paddle />
            <Ball />
          </>
        ) : (
          <Html center>
            <div className='start_menu'>
              <button className='start_btn' onClick={() => setStart()}>
                Start
              </button>
              <p> // Move the paddle with the mouse // </p>
            </div>
          </Html>
        )}
      </Canvas>
    </main>
  );
}
