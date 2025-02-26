"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import "../../../css/carousel.css";
import { Canvas } from "@react-three/fiber";
import { Html, MeshDistortMaterial } from "@react-three/drei";

interface BallConfig {
  material: JSX.Element;
  label: string;
}

const ballConfigs: BallConfig[] = [
  {
    material: <MeshDistortMaterial distort={0.2} speed={10} color='red' />,
    label: "Bounce",
  },
  {
    material: <meshStandardMaterial wireframe />,
    label: "Skeleton",
  },
  {
    material: <meshPhysicalMaterial color='#FFD700' />,
    label: "Gold",
  },
];

interface BallCanvasProps {
  material: JSX.Element;
  label: string;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ material, label }) => (
  <Canvas camera={{ zoom: 3.5 }}>
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      {material}
    </mesh>
    <Html center>
      <span className='info'>{label}</span>
    </Html>
    <ambientLight intensity={0.3} />
    <pointLight intensity={10} position={[1, 1, 1]} />
  </Canvas>
);

export default function CarouselBall() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScroll, setCanScroll] = React.useState<{
    prev: boolean;
    next: boolean;
  }>({ prev: false, next: false });

  const updateScrollState = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScroll({
      prev: emblaApi.canScrollPrev(),
      next: emblaApi.canScrollNext(),
    });
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    updateScrollState();
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
  }, [emblaApi, updateScrollState]);

  return (
    <div className='carousel'>
      <div ref={emblaRef} className='carousel-viewport'>
        <div className='carousel-content'>
          {ballConfigs.map(({ material, label }, index) => (
            <div key={index} className='carousel-item'>
              <BallCanvas material={material} label={label} />
            </div>
          ))}
        </div>
      </div>
      <button
        className='carousel-button carousel-prev'
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScroll.prev}
        aria-label='Previous slide'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className='carousel-next carousel-button'
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScroll.next}
        aria-label='Next slide'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
