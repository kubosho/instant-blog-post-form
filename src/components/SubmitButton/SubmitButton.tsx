import { MutableRefObject } from 'react';

import './SubmitButton.css';

type Props = {
  children: string;
  onSubmit: () => void;
  ref?: MutableRefObject<HTMLButtonElement | null>;
};

export function SubmitButton({ children, onSubmit, ref }: Props): JSX.Element {
  return (
    <button type="submit" ref={ref} onClick={onSubmit} className="submit-button">
      {children}
    </button>
  );
}
