import { LexicalEditor } from 'lexical';
import create from 'zustand';

export type EditorState = {
  editor: LexicalEditor | null;
};

export type EditorStateActions = {
  setEditor: (editor: LexicalEditor) => void;
};

export const useEditorState = create<EditorState & EditorStateActions>((set) => ({
  editor: null,

  setEditor: (editor: LexicalEditor) => set(() => ({ editor })),
}));
