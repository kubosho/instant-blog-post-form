import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { useEntryState } from '../global_state/entry_state';
import { useRenderState } from '../global_state/render_state';

export const useSerializeMetadata = (): void => {
  const title = useEntryState((state) => state.title);
  const slug = useEntryState((state) => state.slug);
  const setTitle = useEntryState((state) => state.setTitle);
  const setSlug = useEntryState((state) => state.setSlug);
  const isFirstRender = useRenderState((state) => state.isFirstRender);
  const [serializedMetadata, setSerializedMetadata] = useLocalStorage<string | null>(
    'instant-blog-post-metadata',
    null,
  );

  useEffect(() => {
    const rawData = { title, slug };
    setSerializedMetadata(JSON.stringify(rawData));
  }, [title, slug]);

  useEffect(() => {
    if (!isFirstRender) {
      return;
    }

    if (serializedMetadata) {
      const { title, slug } = JSON.parse(serializedMetadata);
      setTitle(title);
      setSlug(slug);
    }
  }, [isFirstRender, serializedMetadata]);
};
