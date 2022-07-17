import { createPortal } from 'react-dom';
import { Dialog } from '@headlessui/react';

import { retrieveTranslation } from '../../locales/i18n';
import { SubmitButton } from '../SubmitButton';
import { CancelButton } from '../CancelButton';

import './EntryPostConfirm.css';
import { useRef } from 'react';

type Props = {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export function EntryPostConfirm({ isOpen, onSubmit, onClose }: Props) {
  const initialFocusedRef = useRef(null);

  return createPortal(
    <Dialog initialFocus={initialFocusedRef} open={isOpen} onClose={onClose} className="entry-post-confirm">
      <div className="entry-post-confirm__panel">
        <Dialog.Panel className="entry-post-confirm__contents">
          <Dialog.Title>{retrieveTranslation('confirm.title')}</Dialog.Title>
          <Dialog.Description>{retrieveTranslation('confirm.description')}</Dialog.Description>
          <div className="entry-post-confirm__actions">
            <CancelButton ref={initialFocusedRef} onSubmit={onClose}>
              {retrieveTranslation('cancel')}
            </CancelButton>
            <SubmitButton onSubmit={onSubmit}>{retrieveTranslation('submit')}</SubmitButton>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.body,
  );
}
