import { MutableRefObject } from 'react';

import './CancelButton.css';

type Props = {
  children: string;
  onSubmit: () => void;
  ref?: MutableRefObject<HTMLButtonElement | null>;
};

export function CancelButton({ children, onSubmit, ref }: Props): JSX.Element {
  return (
    <button type="button" ref={ref} onClick={onSubmit} className="cancel-button">
      {children}
    </button>
  );
}
