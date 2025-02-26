import { useNavigate } from "react-router";
import useStore from "../utils/State";
import { Html } from "@react-three/drei";
import Brixels from "../utils/Brixels";

export default function Menu() {
  const { setStart } = useStore();
  const btnAudio = new Audio("/btnAudio.mp3");
  const navigate = useNavigate();

  return (
    <Html center>
      <div className='menu_container'>
        <Brixels />
        <div className='start_menu'>
          <div className='start_menu_btns'>
            <button
              className='start_btn'
              onClick={() => {
                setStart();
                btnAudio.volume = 1;
                btnAudio.play();
              }}
            >
              Start
            </button>
            <button
              className='store_btn'
              onClick={() => {
                navigate("/store");
                btnAudio.volume = 1;
                btnAudio.play();
              }}
            >
              Store
            </button>
          </div>
          <div>
            <ul>
              <li> Move the paddle using your mouse </li>
              <li> A new set of bricks will come down every 5 seconds </li>
              <li> Destroy as many bricks in 40 seconds </li>
              <li>
                Obviously the game ends if the ball touches the bottom floor
              </li>
              <li>Earn "Brixels" to purchase upgrades in the store</li>
            </ul>
          </div>
        </div>
      </div>
    </Html>
  );
}
