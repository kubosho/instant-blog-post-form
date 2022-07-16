import { useCallback, useRef } from 'react';
import { $getRoot, EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { convertMarkdownToHtmlString } from '../../markdown/markdown_to_html_converter';
import { useEntryState } from '../../global_state/entry_state';

import { RestoreFromLocalStoragePlugin } from './plugins/LexicalRestoreFromLocalstorage';

import './Editor.css';

export const editorTheme = {
  paragraph: 'editor-contents',
};

function onError(error: Error): void {
  console.error(error);
}

export function Editor() {
  const editorWithScrollRef = useRef(null);
  const setRawContents = useEntryState((state) => state.setRawContents);
  const setHtmlString = useEntryState((state) => state.setHtmlStringContents);

  const onChange = useCallback((editorState: EditorState) => {
    editorState.read(async () => {
      const root = $getRoot();
      const text = root.getTextContent();
      const htmlString = await convertMarkdownToHtmlString(text);

      setRawContents(text);
      setHtmlString(htmlString);
    });
  }, []);

  const initialConfig = {
    namespace: 'MyEditor',
    theme: editorTheme,
    onError,
  };

  return (
    <div className="editor" ref={editorWithScrollRef}>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin contentEditable={<ContentEditable className="editor__content-editable" />} placeholder="" />
        <OnChangePlugin onChange={onChange} />
        <AutoScrollPlugin scrollRef={editorWithScrollRef} />
        <RestoreFromLocalStoragePlugin />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
}
