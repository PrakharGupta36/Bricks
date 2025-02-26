import { useState } from "react";
import useStore from "../utils/State";

export default function Brixels() {
  const { brixels } = useStore();
  const [onHover, setHover] = useState<boolean>(false);

  return (
    <div
      className='brixels'
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {onHover ? (
        <span className='text_brixels'> Brixels: </span>
      ) : (
        <img src='/brixels.png' />
      )}

      <span> {brixels}</span>
    </div>
  );
}
