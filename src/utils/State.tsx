import { create } from "zustand";

type BrickObject = {
  id: number;
  position: [number, number, number];
};

interface useStoreTypes {
  start: boolean;
  countDown: number;
  setStart: () => void;
  setCountDown: (updater: number | ((prev: number) => number)) => void;

  bricks: BrickObject[];
  setBricks: (bricks: BrickObject[]) => void;
  handleCollision: (brickId: number) => void;

  canvasRef: { current: HTMLCanvasElement | null }; // ✅ Store canvasRef as an object
  setCanvasRef: (ref: HTMLCanvasElement | null) => void; // ✅ Setter function
}

const useStore = create<useStoreTypes>((set) => ({
  start: false,
  countDown: 3,
  setStart: () => set({ start: true }),
  setCountDown: (updater) =>
    set((state) => ({
      countDown:
        typeof updater === "function" ? updater(state.countDown) : updater,
    })),

  bricks: [],
  setBricks: (bricks: BrickObject[]) => set(() => ({ bricks: bricks })),

  handleCollision: (brickId: number) =>
    set((state) => ({
      bricks: state.bricks.filter((brick) => brick.id !== brickId),
    })),

  canvasRef: { current: null }, // ✅ Initialize as an object
  setCanvasRef: (ref) =>
    set((state) => ({ canvasRef: { ...state.canvasRef, current: ref } })), // ✅ Update ref properly
}));

export default useStore;
