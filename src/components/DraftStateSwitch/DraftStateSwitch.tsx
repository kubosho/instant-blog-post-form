import { Switch } from '@headlessui/react';

import { retrieveTranslation } from '../../locales/i18n';
import { useEntryState } from '../../global_state/entry_state';

import './DraftStateSwitch.css';

export function DraftStateSwitch(): JSX.Element {
  const isDraft = useEntryState((state) => state.isDraft);
  const setDraft = useEntryState((state) => state.setDraft);

  return (
    <>
      <Switch
        checked={!isDraft}
        onChange={setDraft}
        className={`${
          isDraft ? 'entry-publication-state-switch--off' : 'entry-publication-state-switch--on'
        } entry-publication-state-switch`}
      >
        <span className="sr-only">{isDraft ? retrieveTranslation('publish') : retrieveTranslation('draft')}</span>
        <span
          className={`${
            isDraft ? 'entry-publication-state-switch__rounded--off' : 'entry-publication-state-switch__rounded--on'
          } entry-publication-state-switch__rounded`}
        />
      </Switch>
      {retrieveTranslation('publish')}
    </>
  );
}
