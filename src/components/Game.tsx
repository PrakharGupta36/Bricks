import { Physics } from "@react-three/rapier";
import Ball from "./Ball";
import Paddle from "./Paddle";
import CountDown from "../utils/CountDown";
import useStore from "../utils/State";

export default function Game() {
  const { countDown } = useStore();

  return (
    <>
      {countDown && <CountDown />}
      <Physics>
        <Ball />
        <Paddle />
      </Physics>
    </>
  );
}
