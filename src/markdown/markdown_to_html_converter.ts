import { markdownProcessor } from './markdown_processor';

export async function convertMarkdownToHtmlString(contents: string): Promise<string> {
  const body = await markdownProcessor().process(contents);
  return body.value.toString();
}
