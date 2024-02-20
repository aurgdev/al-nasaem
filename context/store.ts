import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STORE_FAVORITE_KEY } from "../utils/storage";

interface BearState {
  bears: number;
  increase: () => void;
}

export interface DhikrProps {
  id: number;
  arabic_text?: string;
  lang_arabic_text?: string;
  english_text?: string;
  repeat: number;
  audio: string;
}
export interface DhikrState {
  favorites: DhikrProps[];
  addDhikr: (input: DhikrProps) => void;
  removeDhikr: (id: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 3,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

export const useFavoriteStore = create<DhikrState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addDhikr: (input) => set({ favorites: [...get().favorites, input] }),
      removeDhikr(id) {
        set({ favorites: get().favorites.filter((dhikr) => dhikr.id !== id) });
      },
    }),
    {
      name: STORE_FAVORITE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
