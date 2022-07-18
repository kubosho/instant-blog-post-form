import { useCallback, useRef } from 'react';
import { $createParagraphNode, $getRoot, EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';

import { useEntryState } from '../../global_state/entry_state';

import { RestoreFromLocalStoragePlugin } from './plugins/LexicalRestoreFromLocalstorage';
import { LexicalComposerContextSetPlugin } from './plugins/LexicalComposerContextSetPlugin';

import './Editor.css';

const editorTheme = {
  paragraph: 'editor-contents',
};

function onEditorError(error: Error): void {
  console.error(error);
}

export function Editor(): JSX.Element {
  const editorWithScrollRef = useRef(null);
  const setContents = useEntryState((state) => state.setContents);

  const setEditorState = useEntryState((state) => state.setEditorState);

  const onChange = useCallback((editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const contents = root.getTextContent();
      const serializedEditorState = editorState.toJSON();

      setContents(contents);
      setEditorState(serializedEditorState);
    });
  }, []);

  const initialConfig = {
    namespace: 'InstantBlogPostForm',
    theme: editorTheme,
    onError: onEditorError,
  };

  return (
    <div className="editor" ref={editorWithScrollRef}>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin contentEditable={<ContentEditable className="editor__content-editable" />} placeholder="" />
        <OnChangePlugin onChange={onChange} />
        <AutoScrollPlugin scrollRef={editorWithScrollRef} />
        <HistoryPlugin />
        <ClearEditorPlugin />
        <LexicalComposerContextSetPlugin />
        <RestoreFromLocalStoragePlugin />
      </LexicalComposer>
    </div>
  );
}
