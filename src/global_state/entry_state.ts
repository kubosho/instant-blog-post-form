import { SerializedEditorState } from 'lexical';
import create from 'zustand';

export type EntryState = {
  title: string;
  slug: string;
  contents: string;
  editorState: SerializedEditorState | null;
  isDraft: boolean;
};

export type EntryStateActions = {
  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setContents: (contents: string) => void;
  setEditorState: (editorState: SerializedEditorState) => void;
  setDraft: () => void;
  reset: () => void;
};

export const useEntryState = create<EntryState & EntryStateActions>((set) => ({
  title: '',
  slug: '',
  contents: '',
  editorState: null,
  isDraft: true,

  setTitle: (title: string) => set(() => ({ title })),
  setSlug: (slug: string) => set(() => ({ slug })),
  setContents: (contents: string) => set(() => ({ contents })),
  setEditorState: (editorState: SerializedEditorState) => set(() => ({ editorState })),
  setDraft: () => set((state) => ({ isDraft: !state.isDraft })),
  reset: () =>
    set(() => ({
      title: '',
      slug: '',
      contents: '',
      editorState: null,
      isDraft: true,
    })),
}));
