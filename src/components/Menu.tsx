import useStore from "../utils/State";
import { Html } from "@react-three/drei";

export default function Menu() {
  const { setStart } = useStore();
  return (
    <Html center>
      <div className='start_menu'>
        <button className='start_btn' onClick={() => setStart()}>
          Start
        </button>
        <p> // Move the paddle using mouse // </p>
      </div>
    </Html>
  );
}
