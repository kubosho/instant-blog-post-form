type Params = {
  path: string;
  method: 'GET' | 'POST';
  body: string;
};

export function getRequestObject({ path, method, body }: Params): Request {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('X-MICROCMS-API-KEY', import.meta.env.X_MICROCMS_API_KEY ?? '');

  const options: RequestInit = {
    headers,
    method,
    body,
  };
  const request = new Request(path, options);

  return request;
}
