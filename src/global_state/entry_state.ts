import create from 'zustand';

type State = {
  title: string;
  slug: string;
  rawContents: string;
  htmlStringContents: string;
  isDraft: boolean;
  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setRawContents: (contents: string) => void;
  setHtmlStringContents: (contents: string) => void;
  setDraft: () => void;
  reset: () => void;
};

export const useEntryState = create<State>((set) => ({
  title: '',
  slug: '',
  rawContents: '',
  htmlStringContents: '',
  isDraft: true,
  setTitle: (title: string) => set(() => ({ title })),
  setSlug: (slug: string) => set(() => ({ slug })),
  setRawContents: (contents: string) => set(() => ({ rawContents: contents })),
  setHtmlStringContents: (contents: string) => set(() => ({ htmlStringContents: contents })),
  setDraft: () => set((state) => ({ isDraft: !state.isDraft })),
  reset: () =>
    set(() => ({
      title: '',
      slug: '',
      rawContents: '',
      htmlStringContents: '',
      isDraft: true,
    })),
}));
