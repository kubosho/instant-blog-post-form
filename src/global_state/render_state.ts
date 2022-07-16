import create from 'zustand';

type State = {
  isFirstRender: boolean;
  setRendered: () => void;
};

export const useRenderState = create<State>((set) => ({
  isFirstRender: true,
  setRendered: () => set(() => ({ isFirstRender: false })),
}));
