import { X } from "lucide-react";
import "../css/store.css";
import CarouselBall from "./components/carousel/carousel-ball";
import CarouselPaddle from "./components/carousel/carousel-paddle";
import { useNavigate } from "react-router";
import Brixels from "../utils/Brixels";


export default function Store() {
  const btnAudio = new Audio("/btnAudio.mp3");
  const navigate = useNavigate();

  return (
    <div className='store'>
      <X
        className='icon'
        onClick={() => {
          navigate("/");
          btnAudio.volume = 1;
          btnAudio.play();
        }}
      />
      <Brixels />
      <div className='store-carousels'>
        <p className='info_text'>
          *Click on the button of the object to select
        </p>
        <div className='store-carousels-item'>
          <CarouselPaddle />
          <p> Select Paddle </p>
        </div>
        <div className='store-carousels-item'>
          <CarouselBall />
          <p> Select Ball </p>
        </div>
      </div>
    </div>
  );
}
