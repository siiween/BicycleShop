import { create } from 'zustand';

import { Option, Part } from '@/types/apiTypes';

interface ConfiguratorState {
  currentStep: number;
  parts: Part[];
  selectedOptions: Record<number, Option>;
  currentProduct: number | null;
  setParts: (parts: Part[]) => void;
  selectOption: (partId: number, option: Option) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  setCurrentProduct: (productId: number | null) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 0,
  parts: [],
  selectedOptions: {},
  currentProduct: null,

  setCurrentProduct: (productId: number | null) => set({ currentProduct: productId }),

  reset: () =>
    set({
      currentStep: 0,
      parts: [],
      selectedOptions: {},
      currentProduct: null,
    }),

  setParts: (parts) => set({ parts }),

  selectOption: (partId, option) => {
    const { selectedOptions } = get();
    set({
      selectedOptions: {
        ...selectedOptions,
        [partId]: option,
      },
    });
  },

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.parts.length - 1),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

}));
