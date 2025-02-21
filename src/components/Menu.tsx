import useStore from "../utils/State";
import { Html } from "@react-three/drei";

export default function Menu() {
  const { setStart } = useStore();
  return (
    <Html center>
      <div className='menu_container'>
        <div className='start_menu'>
          <button className='start_btn' onClick={() => setStart()}>
            Start
          </button>
          <div>
            <ul>
              <li> Move the paddle using mouse </li>
              <li> New bricks will come down every 10 seconds </li>
              <li> Destroy as many bricks in 60 seconds </li>
              <li>
                Obviously the game get's over if the ball touches the bottom floor
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Html>
  );
}
