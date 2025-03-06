import { useNavigate } from "react-router";
import useStore from "../utils/State";
import { Html } from "@react-three/drei";
import Brixels from "../utils/Brixels";
import { Volume2, VolumeOff } from "lucide-react";

export default function Menu() {
  const { setStart, sound, setSound } = useStore();
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
                setStart(true);
                btnAudio.volume = sound ? 1 : 0;
                btnAudio.play();
              }}
            >
              Start
            </button>
            <button
              className='store_btn'
              onClick={() => {
                navigate("/store");
                btnAudio.volume = sound ? 1 : 0;
                btnAudio.play();
              }}
            >
              Store
            </button>
            <button onClick={() => setSound(!sound)} className='sound_btn'>
              {sound ? <Volume2 /> : <VolumeOff />}
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
