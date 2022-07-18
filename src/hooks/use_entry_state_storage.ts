import { useCallback } from 'react';
import { useLocalStorage } from 'react-use';

import { EntryState, useEntryState } from '../global_state/entry_state';

type ReturnValues = {
  entryState: Omit<EntryState, 'isDraft'> | null | undefined;
  save: (state: Partial<EntryState>) => void;
  restore: () => void;
};

export const useEntryStateStorage = (): ReturnValues => {
  const title = useEntryState((state) => state.title);
  const slug = useEntryState((state) => state.slug);
  const contents = useEntryState((state) => state.contents);
  const editorState = useEntryState((state) => state.editorState);

  const setTitle = useEntryState((state) => state.setTitle);
  const setSlug = useEntryState((state) => state.setSlug);
  const setContents = useEntryState((state) => state.setContents);
  const setEditorState = useEntryState((state) => state.setEditorState);

  const [entryState, setEntryState] = useLocalStorage<Omit<EntryState, 'isDraft'> | null>(
    'instant-blog-post-entry-state',
    null,
  );

  const save = useCallback((state: Partial<EntryState>) => {
    const newState = {
      title: state.title ?? title,
      slug: state.slug ?? slug,
      contents: state.contents ?? contents,
      editorState: state.editorState ?? editorState,
    };

    setEntryState(newState);
  }, []);

  const restore = useCallback(() => {
    if (!entryState) {
      return;
    }

    setTitle(entryState.title);
    setSlug(entryState.slug);
    setContents(entryState.contents);

    if (entryState.editorState !== null) {
      setEditorState(entryState.editorState);
    }
  }, [entryState]);

  return { entryState, save, restore };
};
