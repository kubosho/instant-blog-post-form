import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useEditorState } from '../../../global_state/editor_state';

export function LexicalComposerContextSetPlugin(): null {
  const [editor] = useLexicalComposerContext();

  const setEditor = useEditorState((state) => state.setEditor);

  useEffect(() => {
    setEditor(editor);
  }, [editor]);

  return null;
}
