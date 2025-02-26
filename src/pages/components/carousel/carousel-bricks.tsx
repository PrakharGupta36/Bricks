"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "../../../css/carousel.css";

type MaterialType =
  | "meshPhongMaterial"
  | "meshPhysicalMaterial"
  | "meshStandardMaterial";

type CarouselItemProps = {
  color: string;
  label: string;
  material: MaterialType;
};

const items: CarouselItemProps[] = [
  { color: "#49db46", label: "Leaf", material: "meshPhongMaterial" },
  { color: "#CF1020", label: "Lava", material: "meshPhysicalMaterial" },
  { color: "#4582e6", label: "Sky", material: "meshStandardMaterial" },
];

const CarouselItem: React.FC<CarouselItemProps> = ({
  color,
  label,
  material,
}) => {
  const MaterialComponent = {
    meshPhongMaterial: <meshPhongMaterial color={color} />,
    meshPhysicalMaterial: <meshPhysicalMaterial color={color} />,
    meshStandardMaterial: <meshStandardMaterial color={color} />,
  }[material] || <meshBasicMaterial color={color} />;

  return (
    <div className='carousel-item'>
      <Canvas camera={{ zoom: 10 }}>
        <mesh rotation={[0.4, 0.5, 0]}>
          <boxGeometry args={[1.5, 0.125, 0.35]} />
          {MaterialComponent}
        </mesh>
        <Html center>
          <button className='info'>{label}</button>
        </Html>
        <ambientLight intensity={0.3} />
        <pointLight intensity={10} position={[1, 1, 1]} />
      </Canvas>
    </div>
  );
};

export default function CarouselBricks() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
          {items.map((item, index) => (
            <CarouselItem key={index} {...item} />
          ))}
        </div>
      </div>
      <button
        className='carousel-button carousel-prev'
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        aria-label='Previous slide'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className='carousel-button carousel-next'
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        aria-label='Next slide'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
