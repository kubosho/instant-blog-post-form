import { createPortal } from 'react-dom';
import { Dialog } from '@headlessui/react';

import { retrieveTranslation } from '../../locales/i18n';

import './EntryPostConfirm.css';

type Props = {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export function EntryPostConfirm({ isOpen, onSubmit, onClose }: Props) {
  return createPortal(
    <Dialog open={isOpen} onClose={onClose} className="entry-post-confirm">
      <div className="entry-post-confirm__panel">
        <Dialog.Panel className="entry-post-confirm__contents">
          <Dialog.Title>{retrieveTranslation('confirm.title')}</Dialog.Title>
          <Dialog.Description>{retrieveTranslation('confirm.description')}</Dialog.Description>
          <button onClick={onSubmit}>{retrieveTranslation('submit')}</button>
          <button onClick={onClose}>{retrieveTranslation('cancel')}</button>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.body,
  );
}
