import { create } from "zustand";

interface Part {
    id: number;
    name: string;
    description: string;
}

interface Option {
    id: number;
    name: string;
    price: number;
}

interface ConfiguratorState {
    currentStep: number;
    parts: Part[];
    selectedOptions: Record<number, { id: number; name: string }>;

    setParts: (parts: Part[]) => void;
    selectOption: (partId: number, optionId: number, optionName: string) => void;
    nextStep: () => void;
    previousStep: () => void;
    validateOption: (optionId: number, validateFn: () => Promise<string | null>) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
    currentStep: 0,
    parts: [],
    selectedOptions: {},

    setParts: (parts) => set({ parts }),

    selectOption: (partId, optionId, optionName) => {
        const { selectedOptions } = get();
        set({
            selectedOptions: {
                ...selectedOptions,
                [partId]: { id: optionId, name: optionName },
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
