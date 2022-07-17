import { createPortal } from 'react-dom';
import { Dialog } from '@headlessui/react';

import { retrieveTranslation } from '../../locales/i18n';

import './EntryPostConfirm.css';
import { SubmitButton } from '../SubmitButton';
import { CancelButton } from '../CancelButton';

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
          <SubmitButton onSubmit={onSubmit}>{retrieveTranslation('submit')}</SubmitButton>
          <CancelButton onSubmit={onClose}>{retrieveTranslation('cancel')}</CancelButton>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.body,
  );
}
