import { Physics } from "@react-three/rapier";
import Ball from "./Ball";
import Paddle from "./Paddle";
import CountDown from "../utils/CountDown";
import useStore from "../utils/State";
import Bricks from "./Bricks";
import Boundary from "./Boundary";
import { Html } from "@react-three/drei";

export default function Game() {
  const { countDown, hitBricks } = useStore();

  return (
    <>
      {countDown ? (
        <CountDown />
      ) : (
        <Html>
          <div className='score'>
            <p> Score: {hitBricks.length} </p>
          </div>
        </Html>
      )}
      <Physics gravity={[0, -9.8, 0]}>
        <Bricks />
        <Ball />
        <Paddle />
        <Boundary />
      </Physics>
    </>
  );
}
