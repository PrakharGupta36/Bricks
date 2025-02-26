import { useEffect } from "react";
import { create } from "zustand";

// Type Definitions
export type BrickObject = {
  id: number;
  position: [number, number, number];
};

interface UseStoreTypes {
  start: boolean;
  countDown: number;
  setStart: () => void;
  setCountDown: (updater: number | ((prev: number) => number)) => void;

  bricks: BrickObject[];
  setBricks: (
    updater: BrickObject[] | ((prev: BrickObject[]) => BrickObject[])
  ) => void;

  hitBricks: BrickObject[];
  handleCollision: (brickId: number) => void;

  brixels: number;
  setBrixels: (updater: number | ((prev: number) => number)) => void;

  canvasRef: { current: HTMLCanvasElement | null };
  setCanvasRef: (ref: HTMLCanvasElement | null) => void;

  mousePosition: { x: number; y: number };
  setMousePosition: (x: number, y: number) => void;

  time: number;
  setTime: (updater: number | ((prev: number) => number)) => void;

  isTouchedFloor: boolean;
  setIsTouchedFloor: (value: boolean) => void;
}

const useStore = create<UseStoreTypes>((set) => ({
  start: false,
  countDown: 3,
  setStart: () => set({ start: true }),
  setCountDown: (updater) =>
    set((state) => ({
      countDown:
        typeof updater === "function" ? updater(state.countDown) : updater,
    })),

  bricks: [],
  setBricks: (updater) =>
    set((state) => ({
      bricks: typeof updater === "function" ? updater(state.bricks) : updater,
    })),

  hitBricks: [],
  handleCollision: (brickId) =>
    set((state) => {
      const hitBrick = state.bricks.find((brick) => brick.id === brickId);
      if (!hitBrick) return {};

      return {
        bricks: state.bricks.filter((brick) => brick.id !== brickId),
        hitBricks: [...state.hitBricks, hitBrick],
        brixels: state.brixels + 10, // 🎉 Award 10 Brixels per hit
      };
    }),

  brixels: 0, // Initial Brixels count
  setBrixels: (updater) =>
    set((state) => ({
      brixels: typeof updater === "function" ? updater(state.brixels) : updater,
    })),

  canvasRef: { current: null },
  setCanvasRef: (ref) =>
    set((state) => ({ canvasRef: { ...state.canvasRef, current: ref } })),

  mousePosition: { x: 0, y: 0 },
  setMousePosition: (x, y) => set(() => ({ mousePosition: { x, y } })),

  time: 40,
  setTime: (updater) =>
    set((state) => ({
      time: typeof updater === "function" ? updater(state.time) : updater,
    })),

  isTouchedFloor: false,
  setIsTouchedFloor: (value: boolean) => set(() => ({ isTouchedFloor: value })),
}));

export function useMouseTracker() {
  const setMousePosition = useStore((state) => state.setMousePosition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 8;
      setMousePosition(x, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMousePosition]);
}

export default useStore;
