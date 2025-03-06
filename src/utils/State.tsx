/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Type Definitions
export type BrickObject = {
  id: number;
  position: [number, number, number];
};

type PaddleMaterialType =
  | "meshPhongMaterial"
  | "meshPhysicalMaterial"
  | "meshStandardMaterial"
  | "meshNormalMaterial";

type BallMaterialType =
  | "meshToonMaterial"
  | "meshStandardMaterial"
  | "meshLambertMaterial"
  | "meshNormalMaterial";

export type PaddleType = {
  id: number;
  color: string;
  label: string;
  material: PaddleMaterialType;
  selected: boolean;
  purchased: boolean;
  price: number;
};

export type BallType = {
  id: number;
  color: string;
  label: string;
  material: BallMaterialType;
  selected: boolean;
  purchased: boolean;
  price: number;
};

export const PaddleMaterialComponent = (
  color: string,
  material: PaddleMaterialType
) => {
  const materials = {
    meshPhongMaterial: <meshPhongMaterial color={color} />,
    meshPhysicalMaterial: <meshPhysicalMaterial color={color} />,
    meshStandardMaterial: <meshStandardMaterial color={color} />,
    meshNormalMaterial: <meshNormalMaterial />,
  };

  return materials[material] || <meshBasicMaterial color={color} />;
};

export const BallMaterialComponent = (
  color: string,
  material: BallMaterialType
) => {
  const materials = {
    meshToonMaterial: <meshToonMaterial color={color} />,
    meshLambertMaterial: <meshLambertMaterial color={color} />,
    meshStandardMaterial: <meshStandardMaterial wireframe />,
    meshNormalMaterial: <meshNormalMaterial />,
  };

  return materials[material] || <meshBasicMaterial color={color} />;
};

interface UseStoreTypes {
  start: boolean;
  countDown: number;
  setStart: (value: boolean) => void;
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

  paddles: {
    id: number;
    color: string;
    label: string;
    material: PaddleMaterialType;
    selected: boolean;
    purchased: boolean;
    price: number;
  }[];

  setPaddles: (id: number) => void;

  balls: {
    id: number;
    color: string;
    label: string;
    material: BallMaterialType;
    selected: boolean;
    purchased: boolean;
    price: number;
  }[];

  setBalls: (id: number) => void;

  // New functions for purchasing
  purchasePaddle: (id: number) => boolean;
  purchaseBall: (id: number) => boolean;

  // sfx
  sound: boolean;

  setSound: (value: boolean) => void;
}

// Initial values for the store
const initialPaddles = [
  {
    id: 1,
    color: "",
    label: "Default",
    material: "meshNormalMaterial" as PaddleMaterialType,
    selected: true,
    purchased: true,
    price: 0,
  },
  {
    id: 2,
    color: "#49db46",
    label: "Leaf",
    material: "meshPhongMaterial" as PaddleMaterialType,
    selected: false,
    purchased: false,
    price: 320,
  },
  {
    id: 3,
    color: "#CF1020",
    label: "Lava",
    material: "meshPhysicalMaterial" as PaddleMaterialType,
    selected: false,
    purchased: false,
    price: 690,
  },
  {
    id: 4,
    color: "#4582e6",
    label: "Sky",
    material: "meshStandardMaterial" as PaddleMaterialType,
    selected: false,
    purchased: false,
    price: 420,
  },
];

const initialBalls = [
  {
    id: 1,
    color: "",
    label: "Default",
    material: "meshNormalMaterial" as BallMaterialType,
    selected: true,
    purchased: true,
    price: 0,
  },
  {
    id: 2,
    color: "red",
    label: "Bounce",
    material: "meshToonMaterial" as BallMaterialType,
    selected: false,
    purchased: false,
    price: 600,
  },
  {
    id: 3,
    color: "",
    label: "Skeleton",
    material: "meshStandardMaterial" as BallMaterialType,
    selected: false,
    purchased: false,
    price: 900,
  },
  {
    id: 4,
    color: "black",
    label: "Void",
    material: "meshLambertMaterial" as BallMaterialType,
    selected: false,
    purchased: false,
    price: 400,
  },
];

const useStore = create<UseStoreTypes>()(
  persist(
    (set, get) => ({
      start: false,
      countDown: 3,
      setStart: (value: boolean) => set({ start: value }),
      setCountDown: (updater) =>
        set((state) => ({
          countDown:
            typeof updater === "function" ? updater(state.countDown) : updater,
        })),

      bricks: [],
      setBricks: (updater) =>
        set((state) => ({
          bricks:
            typeof updater === "function" ? updater(state.bricks) : updater,
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
          brixels:
            typeof updater === "function" ? updater(state.brixels) : updater,
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
      setIsTouchedFloor: (value: boolean) =>
        set(() => ({ isTouchedFloor: value })),

      paddles: initialPaddles,
      setPaddles: (id: number) =>
        set((state) => ({
          paddles: state.paddles.map((paddle) => ({
            ...paddle,
            selected: paddle.id === id, // Only the clicked paddle is selected
          })),
        })),

      balls: initialBalls,
      setBalls: (id: number) =>
        set((state) => ({
          balls: state.balls.map((e) => ({
            ...e,
            selected: e.id === id,
          })),
        })),

      // New function to purchase a paddle
      purchasePaddle: (id: number) => {
        const state = get();

        set({
          paddles: state.paddles.map((paddle) =>
            paddle.id === id ? { ...paddle, purchased: true } : paddle
          ),
        });

        return true;
      },

      // New function to purchase a ball
      purchaseBall: (id: number) => {
        const state = get();

        // Purchase the ball
        set({
          balls: state.balls.map((ball) =>
            ball.id === id ? { ...ball, purchased: true } : ball
          ),
        });

        return true;
      },

      // sfx
      sound: true,

      setSound: (value: boolean) => set(() => ({ sound: value })),
    }),

    { 
      name: "brixels-game-storage", // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields to localStorage
        brixels: state.brixels,
        paddles: state.paddles,
        balls: state.balls,
        sound: state.sound,
      }),
    }
  )
);

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
