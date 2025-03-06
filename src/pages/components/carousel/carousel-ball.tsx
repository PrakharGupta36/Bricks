import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import "../../../css/carousel.css";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { toast } from "../../../utils/Toast";
import type { BallType } from "../../../utils/State";
import useStore, { BallMaterialComponent } from "../../../utils/State";

const BallCanvas: React.FC<BallType> = (ball: BallType) => {
  const { id, color, material, label, selected, price, purchased } = ball;

  const { setBalls, brixels, setBrixels, purchaseBall, sound } = useStore();

  const storeAudio = React.useMemo(() => new Audio("/storeAudio.mp3"), []);
  const storeAudioError = React.useMemo(
    () => new Audio("/storeAudioError.mp3"),
    []
  );

  React.useEffect(() => {
    storeAudio.volume = sound ? 1 : 0;
    storeAudioError.volume = sound ? 1 : 0;

    storeAudio.preload = "auto";
    storeAudioError.preload = "auto";
  }, [storeAudio, storeAudioError, sound]);

  return (
    <Canvas camera={{ zoom: 3.5 }}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        {BallMaterialComponent(color, material)}
      </mesh>
      <Html center>
        <div className='info-container'>
          <button
            disabled={selected}
            className='btn'
            onClick={() => {
              if (brixels >= price && !purchased) {
                setBalls(id);
                purchaseBall(id);
                setBrixels(brixels - price);
                toast({
                  title: `Selected ${label} Paddle`,
                  duration: 3000,
                  variant: "success",
                  open: true,
                });
                storeAudio.play();
              } else if (purchased) {
                setBalls(id);
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
            {purchased ? "Purchased" : `${price} Brixels`}
          </span>
        </div>
      </Html>
      <ambientLight intensity={0.3} />
      <pointLight intensity={10} position={[1, 1, 1]} />
    </Canvas>
  );
};

export default function CarouselBall() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { balls } = useStore();

  return (
    <div className='carousel'>
      <div ref={emblaRef} className='carousel-viewport'>
        <div className='carousel-content'>
          {balls.map((ball, index) => (
            <div key={index} className='carousel-item'>
              <BallCanvas {...ball} />
            </div>
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
        className='carousel-next carousel-button'
        onClick={scrollNext}
        aria-label='Next slide'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
