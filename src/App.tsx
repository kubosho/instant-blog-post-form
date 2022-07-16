import { useCallback, useEffect } from 'react';

import { DraftStateSwitch } from './components/DraftStateSwitch';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { TitleInputForm } from './components/TitleInputForm';
import { SlugInputForm } from './components/SlugInputForm';
import { activateI18n, retrieveTranslation, setLocale } from './locales/i18n';
import { postEntry } from './microcms_api/post_entry';
import { useEntryState } from './global_state/entry_state';
import { useRenderState } from './global_state/render_state';

import './App.css';

function App() {
  activateI18n();
  setLocale('ja');

  const title = useEntryState((state) => state.title);
  const slug = useEntryState((state) => state.slug);
  const rawContents = useEntryState((state) => state.rawContents);
  const isDraft = useEntryState((state) => state.isDraft);

  const setRendered = useRenderState((state) => state.setRendered);
  useEffect(() => {
    setRendered();
  }, []);

  const onSubmitEntry = useCallback(() => {
    const body = JSON.stringify({
      title,
      slug,
      body: rawContents,
    });
    postEntry({ body, isDraft });
  }, [title, slug, rawContents, isDraft]);

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
          <button type="button" onClick={onSubmitEntry}>
            {retrieveTranslation('submit')}
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
