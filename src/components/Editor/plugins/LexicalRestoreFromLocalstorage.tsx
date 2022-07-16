import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { EditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useRenderState } from '../../../global_state/render_state';

export function RestoreFromLocalStoragePlugin() {
  const isFirstRender = useRenderState((state) => state.isFirstRender);

  const [editor] = useLexicalComposerContext();
  const [serializedEditorState, setSerializedEditorState] = useLocalStorage<string | null>(
    'instant-blog-post-contents',
    null,
  );

  useEffect(() => {
    if (!isFirstRender) {
      return;
    }

    if (serializedEditorState) {
      const initialEditorState = editor.parseEditorState(serializedEditorState);
      editor.setEditorState(initialEditorState);
    }
  }, [isFirstRender, serializedEditorState, editor]);

  const onChange = useCallback(
    (editorState: EditorState) => {
      setSerializedEditorState(JSON.stringify(editorState.toJSON()));
    },
    [setSerializedEditorState],
  );

  return <OnChangePlugin onChange={onChange} />;
}
