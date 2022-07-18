import create from 'zustand';

type State = {
  isRestored: boolean;
  setIsRestored: () => void;
};

export const useRestoreState = create<State>((set) => ({
  isRestored: false,
  setIsRestored: () => set(() => ({ isRestored: true })),
}));
