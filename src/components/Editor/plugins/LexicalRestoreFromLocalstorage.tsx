import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useRestoreState } from '../../../global_state/restore_state';
import { useEntryStateStorage } from '../../../hooks/use_entry_state_storage';

export function RestoreFromLocalStoragePlugin(): null {
  const isRestored = useRestoreState((state) => state.isRestored);

  const [editor] = useLexicalComposerContext();
  const { entryState } = useEntryStateStorage();

  useEffect(() => {
    if (isRestored) {
      return;
    }

    if (entryState && entryState.editorState) {
      const initialEditorState = editor.parseEditorState(entryState.editorState);
      editor.setEditorState(initialEditorState);
    }
  }, [isRestored, entryState, editor]);

  return null;
}
