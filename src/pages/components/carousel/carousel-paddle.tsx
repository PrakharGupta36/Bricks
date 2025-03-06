import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "../../../css/carousel.css";
import { toast } from "../../../utils/Toast";
import useStore, {
  PaddleMaterialComponent,
  type PaddleType,
} from "../../../utils/State";

const CarouselItem: React.FC<PaddleType> = (paddle: PaddleType) => {
  const { setPaddles, brixels, setBrixels, purchasePaddle } = useStore();
  const { id, color, label, material, selected, price, purchased } = paddle;


  const storeAudio = React.useMemo(() => new Audio("/storeAudio.mp3"), []);
  const storeAudioError = React.useMemo(
    () => new Audio("/storeAudioError.mp3"),
    []
  );

  React.useEffect(() => {
    storeAudio.preload = "auto";
    storeAudioError.preload = "auto";
  }, [storeAudio, storeAudioError]);

  return (
    <div className='carousel-item'>
      <Canvas camera={{ zoom: 10 }}>
        <mesh rotation={[0.4, 0.5, 0]}>
          <boxGeometry args={[1.5, 0.125, 0.35]} />
          {PaddleMaterialComponent(color, material)}
        </mesh>
        <Html center>
          <div className='info-container'>
            <button
              className='btn'
              disabled={selected}
              onClick={() => {
                if (brixels >= price && !purchased && !selected) {
                  setPaddles(id);
                  purchasePaddle(id);
                  setBrixels(brixels - price);
                  toast({
                    title: `Selected ${label} Paddle`,
                    duration: 3000,
                    variant: "success",
                    open: true,
                  });
                  storeAudio.play();
                } else if (purchased && !selected) {
                  setPaddles(id);
                  toast({
                    title: `Selected ${label} Paddle`,
                    duration: 3000,
                    variant: "success",
                    open: true,
                  });
                  storeAudio.play();
                } else {
                  toast({
                    title: `Don't have enough Brixels`,
                    duration: 3000,
                    variant: "destructive",
                    open: true,
                  });
                  storeAudioError.play();
                }
              }}
            >
              {selected ? "Selected" : label}
            </button>
            <span className='price'>
              {" "}
              {purchased ? "Purchased" : `${price} Brixels`}{" "}
            </span>
          </div>
        </Html>
        <ambientLight intensity={0.3} />
        <pointLight intensity={10} position={[1, 1, 1]} />
      </Canvas>
    </div>
  );
};

export default function CarouselPaddle() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { paddles } = useStore();

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  

  return (
    <div className='carousel'>
      <div ref={emblaRef} className='carousel-viewport'>
        <div className='carousel-content'>
          {paddles.map((item, index) => (
            <CarouselItem key={index} {...item} />
          ))}
        </div>
      </div>
      <button
        className='carousel-button carousel-prev'
        onClick={scrollPrev}
        aria-label='Previous slide'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className='carousel-button carousel-next'
        onClick={scrollNext}
        aria-label='Next slide'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
