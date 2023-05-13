import { getRequestObject } from './get_request_object';

type Param = {
  body: string;
  isDraft: boolean;
};

const MICROCMS_HOST_NAME = `${import.meta.env.X_MICROCMS_API_SUB_DOMAIN}.microcms.io` as const;

export async function postEntry({ body, isDraft }: Param) {
  const urlSearchParams = new URLSearchParams();
  let urlQuery = '';

  if (isDraft) {
    urlSearchParams.append('status', 'draft');
    urlQuery = urlSearchParams.toString();
  }

  if (urlQuery.length > 0) {
    urlQuery = `?${urlQuery}`;
  }

  const request = getRequestObject({
    path: `https://${MICROCMS_HOST_NAME}/${import.meta.env.X_MICROCMS_API_PATH}${urlQuery}`,
    method: 'POST',
    body,
  });

  try {
    await fetch(request);
  } catch (error) {
    console.error(error);
  }
}
