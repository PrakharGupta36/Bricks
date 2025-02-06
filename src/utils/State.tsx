import { create } from "zustand";

interface useStoreTypes {
  start: boolean;
  setStart: () => void;


}

const useStore = create<useStoreTypes>((set) => ({
  start: false,
  setStart: () => set(() => ({ start: true })),


}));

export default useStore;
