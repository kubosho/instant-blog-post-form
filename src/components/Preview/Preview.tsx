import { useEffect, useState } from 'react';

import { useEntryState } from '../../global_state/entry_state';
import { convertMarkdownToHtmlString } from '../../markdown/markdown_to_html_converter';

import './Preview.css';

export const Preview = () => {
  const contents = useEntryState((state) => state.contents);
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    convertMarkdownToHtmlString(contents).then((htmlString) => {
      setHtmlString(htmlString);
    });
  }, [contents]);

  return (
    <output dangerouslySetInnerHTML={{ __html: htmlString }} ref={(node) => node && node.setAttribute('inert', '')} />
  );
};
