import { FormEvent, useCallback } from 'react';

import { useEntryState } from '../../global_state/entry_state';
import { retrieveTranslation } from '../../locales/i18n';

export function SlugInputForm(): JSX.Element {
  const slug = useEntryState((state) => state.slug);
  const setSlug = useEntryState((state) => state.setSlug);

  const onInputSlug = useCallback((event: FormEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setSlug(event.target.value);
    }
  }, []);

  return (
    <>
      <label htmlFor="slug">{retrieveTranslation('slug')}</label>
      <input type="text" name="slug" id="slug" onInput={onInputSlug} value={slug} required />
    </>
  );
}
