import { Processor, unified } from 'unified';
import gfm from 'remark-gfm';
import markdown from 'remark-parse';
import breaks from 'remark-breaks';
import remarkToRehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypePrism from '@mapbox/rehype-prism';

export const markdownProcessor = (): Processor =>
  unified()
    .use(markdown)
    .use(gfm)
    .use(breaks)
    .use(remarkToRehype, { allowDangerousHtml: true })
    .use(rehypePrism, { ignoreMissing: true })
    .use(html, { allowDangerousHtml: true });
