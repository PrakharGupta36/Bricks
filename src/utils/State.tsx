import { create } from "zustand";

interface useStoreTypes {
  start: boolean;
  countDown: number;
  setStart: () => void;
  setCountDown: (updater: number | ((prev: number) => number)) => void;
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
}));

export default useStore;
