import { Physics } from "@react-three/rapier";
import Ball from "./Ball";
import Paddle from "./Paddle";
import CountDown from "../utils/CountDown";
import useStore from "../utils/State";
import Bricks from "./Bricks";
import Boundary from "./Boundary";
import { Html } from "@react-three/drei";

export default function Game() {
  const { countDown, hitBricks, bricks } = useStore();

  return (
    <>
      {countDown ? (
        <CountDown />
      ) : (
        <Html center position={[0, -4.1, 0]}>
          <div className='score'>
            <p className='text'>
              <span> Score:</span> <span> {hitBricks.length}</span>
            </p>
            <hr />
            <p className='text'>
              <span> Rows: </span>{" "}
              <span> {(bricks.length + hitBricks.length) / 5} </span>
            </p>
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
