import { X } from "lucide-react";
import "../css/store.css";
import CarouselBall from "./components/carousel/carousel-ball";
import CarouselBricks from "./components/carousel/carousel-bricks";

export default function Store() {
  return (
    <div className='store'>
      <a href='/' className='close-icon'>
        <X className='icon' />
      </a>
      <div className='store-carousels'>
        <div className='store-carousels-item'>
          <CarouselBricks />
          <p> Select Brick </p>
        </div>
        <div className='store-carousels-item'>
          <CarouselBall />
          <p> Select Ball </p>
        </div>
      </div>
    </div>
  );
}
