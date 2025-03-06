import { Html } from "@react-three/drei";
import useStore from "../utils/State";
import { useEffect, useRef } from "react";

export default function UI() {
  const { hitBricks, bricks, time, setTime } = useStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => Math.max(0, prevTime - 1)); // Prevent time from going below 0
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [setTime]); // Depend only on `setTime` to avoid unnecessary re-renders

  return (
    <Html center position={[0, -4.05, 0]}>
      <div className='score'>
        <p className='text'>
          <span>Score:</span> <span>{hitBricks.length}</span>
        </p>
        <hr />
        <p className='text'>
          <span>Rows:</span>{" "}
          <span>{Math.trunc((bricks.length + hitBricks.length) / 5)}</span>
        </p>
        <hr />
        <p className='text'>
          <span>Time:</span>{" "}
          <span
            style={{
              color: time < 10 ? `red` : time < 20 ? `yellow` : `white`,
            }}
          >
            {time}
          </span>
        </p>
      </div>
    </Html>
  );
}
