import useStore from "../utils/State";
import { Html } from "@react-three/drei";

export default function Menu() {
  const { setStart } = useStore();

  const btnAudio = new Audio("/btnAudio.mp3");

  return (
    <Html center>
      <div className='menu_container'>
        <div className='start_menu'>
          <button
            className='start_btn'
            onClick={() => {
              setStart();
              btnAudio.play();
            }}
          >
            Start
          </button>
          <div>
            <ul>
              <li> Move the paddle using mouse </li>
              <li> A new set of bricks will come down every 5 seconds </li>
              <li> Destroy as many bricks in 60 seconds </li>
              <li>
                Obviously the game get's over if the ball touches the bottom
                floor
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Html>
  );
}
