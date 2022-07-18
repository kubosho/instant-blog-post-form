import { FormEvent, useCallback } from 'react';

import { useEntryState } from '../../global_state/entry_state';
import { retrieveTranslation } from '../../locales/i18n';

export function TitleInputForm(): JSX.Element {
  const title = useEntryState((state) => state.title);
  const setTitle = useEntryState((state) => state.setTitle);

  const onInputTitle = useCallback((event: FormEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setTitle(event.target.value);
    }
  }, []);

  return (
    <>
      <label htmlFor="title">{retrieveTranslation('title')}</label>
      <input type="text" name="title" id="title" onInput={onInputTitle} value={title} required />
    </>
  );
}
