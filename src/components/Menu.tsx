import useStore from "../utils/State";
import { Html } from "@react-three/drei";

export default function Menu() {
  const { setStart } = useStore();

  const btnAudio = new Audio("/btnAudio.mp3");

  return (
    <Html center>
      <div className='menu_container'>
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
            <a href='/store'>
              <button
                className='start_btn'
                onClick={() => {
                  btnAudio.volume = 1;
                  btnAudio.play();
                }}
              >
                Store
              </button>
            </a>
          </div>
          <div>
            <ul>
              <li> Move the paddle using your mouse </li>
              <li> A new set of bricks will come down every 5 seconds </li>
              <li> Destroy as many bricks in 40 seconds </li>
              <li>
                Obviously the game ends if the ball touches the bottom floor
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Html>
  );
}
