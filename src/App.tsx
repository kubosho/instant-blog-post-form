import { useCallback, useEffect, useState } from 'react';
import { CLEAR_EDITOR_COMMAND } from 'lexical';

import { DraftStateSwitch } from './components/DraftStateSwitch';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { TitleInputForm } from './components/TitleInputForm';
import { SlugInputForm } from './components/SlugInputForm';
import { EntryPostConfirm } from './components/EntryPostConfirm';
import { SubmitButton } from './components/SubmitButton';
import { useEntryStateStorage } from './hooks/use_entry_state_storage';
import { activateI18n, retrieveTranslation, setLocale } from './locales/i18n';
import { postEntry } from './microcms_api/post_entry';
import { useEditorState } from './global_state/editor_state';
import { useEntryState } from './global_state/entry_state';
import { useRestoreState } from './global_state/restore_state';

import './App.css';

function App() {
  activateI18n();
  setLocale('ja');

  const [isDisplayToConfirm, setIsDisplayToConfirm] = useState(false);

  const title = useEntryState((state) => state.title);
  const slug = useEntryState((state) => state.slug);
  const contents = useEntryState((state) => state.contents);
  const editorState = useEntryState((state) => state.editorState);
  const isDraft = useEntryState((state) => state.isDraft);
  const resetEntryState = useEntryState((state) => state.reset);

  const isRestored = useRestoreState((state) => state.isRestored);
  const setIsRestored = useRestoreState((state) => state.setIsRestored);

  const editor = useEditorState((state) => state.editor);

  const entryStateStorage = useEntryStateStorage();

  const onConfirmEntry = useCallback(() => {
    setIsDisplayToConfirm(true);
  }, []);

  const onClosePostConfirm = useCallback(() => {
    setIsDisplayToConfirm(false);
  }, []);

  const onSubmitEntry = useCallback(async () => {
    const body = JSON.stringify({
      title,
      slug,
      body: contents,
    });
    setIsDisplayToConfirm(false);

    try {
      await postEntry({ body, isDraft });
      resetEntryState();
      editor?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    } catch (error) {
      // TODO: Error handling
    }
  }, [title, slug, contents, isDraft, editor]);

  useEffect(() => {
    if (isRestored) {
      return;
    }

    entryStateStorage.restore();
    setIsRestored();
  }, []);

  useEffect(() => {
    if (!isRestored) {
      return;
    }

    entryStateStorage.save({ title, slug, contents, editorState });
  }, [title, slug, contents, editorState]);

  return (
    <main>
      <section className="entry-metadata-section">
        <div className="entry-title-area">
          <TitleInputForm />
          <span className="input-separator" />
        </div>
        <div className="entry-slug-area">
          <SlugInputForm />
          <span className="input-separator" />
        </div>
      </section>
      <section className="entry-contents-section">
        <div className="entry-editor-area">
          <Editor />
        </div>
        <div className="entry-preview-area">
          <Preview />
        </div>
      </section>
      <section className="entry-publication-section">
        <div className="entry-draft-state-area">
          <DraftStateSwitch />
        </div>
        <div className="entry-submit-area">
          <SubmitButton onSubmit={onConfirmEntry}>{retrieveTranslation('submit')}</SubmitButton>
        </div>
        <EntryPostConfirm isOpen={isDisplayToConfirm} onSubmit={onSubmitEntry} onClose={onClosePostConfirm} />
      </section>
    </main>
  );
}

export default App;
