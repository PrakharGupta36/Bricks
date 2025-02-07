import { Html } from "@react-three/drei";
import useStore from "./State";
import { useEffect } from "react";

export default function CountDown() {
  const { start, countDown, setCountDown } = useStore();

  useEffect(() => {
    if (!start || countDown <= 0) return;

    const intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(intervalId);
  }, [countDown, start, setCountDown]);

  return (
    <Html center className='overlay_container'>
      <div className='overlay'>{countDown}</div>
    </Html>
  );
}
