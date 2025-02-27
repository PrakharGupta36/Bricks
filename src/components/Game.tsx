import { Physics } from "@react-three/rapier";
import Ball from "./Ball";
import Paddle from "./Paddle";
import CountDown from "../utils/CountDown";
import useStore from "../utils/State";
import Bricks from "./Bricks";
import Boundary from "./Boundary";
import UI from "./UI";
import { Html } from "@react-three/drei";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Lights from "./Lights";

function GameOver() {
  const { hitBricks, time } = useStore();
  const { width, height } = useWindowSize();

  return (
    <Html center className='game_over_container'>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={1000}
      />
      <div className='game_over'>
        <p>
          Congratrulations, your score was {hitBricks.length}
          <span>
            and also you have wasted {40 - time} seconds of your life in this
            game
          </span>
        </p>
        <button className='start_btn' onClick={() => window.location.reload()}>
          Play Again
        </button>

        <a href='https://x.com/___prakhar' className='credit' target='__blank'>
          ~ Made by Prakhar ❤️
        </a>
      </div>
    </Html>
  );
}

export default function Game() {
  const { time, countDown, isTouchedFloor } = useStore();

  return (
    <>
      {time === 0 || isTouchedFloor ? (
        <GameOver />
      ) : (
        <>
          <Lights />
          {countDown ? <CountDown /> : <UI />}
          <Physics gravity={[0, -9.8, 0]}>
            <Bricks />
            <Ball />
            <Paddle />
            <Boundary />
          </Physics>
        </>
      )}
    </>
  );
}
