import { Option, Part } from "@/types/apiTypes";
import { create } from "zustand";



interface ConfiguratorState {
    currentStep: number;
    parts: Part[];
    selectedOptions: Record<number, Option>;
    currentProduct: number;
    setParts: (parts: Part[]) => void;
    selectOption: (partId: number, option: Option) => void;
    nextStep: () => void;
    previousStep: () => void;
    validateOption: (optionId: number, validateFn: () => Promise<string | null>) => void;
    reset: () => void;
    setCurrentProduct: (productId: number) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
    currentStep: 0,
    parts: [],
    selectedOptions: {},
    currentProduct: 0,

    setCurrentProduct: (productId: number) => set({ currentProduct: productId }),

    reset: () =>
        set({
            currentStep: 0,
            parts: [],
            selectedOptions: {},
            currentProduct: 0,
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

    validateOption: (optionId, validateFn) => validateFn(),
}));
