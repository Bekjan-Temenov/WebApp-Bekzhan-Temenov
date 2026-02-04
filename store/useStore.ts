
import { create } from 'zustand';

interface UIState {
  isHeroComplete: boolean;
  setHeroComplete: (val: boolean) => void;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export const useStore = create<UIState>((set) => ({
  isHeroComplete: false,
  setHeroComplete: (val) => set({ isHeroComplete: val }),
  activeProject: null,
  setActiveProject: (id) => set({ activeProject: id }),
}));
