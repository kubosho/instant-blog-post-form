import { useEntryState } from '../../global_state/entry_state';

import './Preview.css';

export const Preview = () => {
  const htmlString = useEntryState((state) => state.htmlStringContents);

  return (
    <output dangerouslySetInnerHTML={{ __html: htmlString }} ref={(node) => node && node.setAttribute('inert', '')} />
  );
};
