import { Physics } from "@react-three/rapier";
import Ball from "./Ball";
import Paddle from "./Paddle";
import CountDown from "../utils/CountDown";
import useStore from "../utils/State";
import Bricks from "./Bricks";
import Boundary from "./Boundary";

export default function Game() {
  const { countDown } = useStore();

  return (
    <>
      {countDown && <CountDown />}
      <Physics gravity={[0, -9.8, 0]}>
        <Bricks />
        <Ball />
        <Paddle />
        <Boundary />
      </Physics>
    </>
  );
}
