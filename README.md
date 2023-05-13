# Instant blog post form

Blog post form for blog.kubosho.com.

![Page screenshot](https://cdn.jsdelivr.net/gh/kubosho/instant-blog-post-form@master/screenshot/v1.0.0.png?version=1.0.0)

## Config

Required write environment variables in `.env` file when submit articles to [microCMS](https://microcms.io/).


| key | value |
| --- | --- |
| X_MICROCMS_API_KEY | Authentication key for microCMS API requests. |
| X_MICROCMS_API_SUB_DOMAIN | Sub domain of microCMS. `X_MICROCMS_API_SUB_DOMAIN` is the `<service-id>` part of `<service-id>.microcms.io`. |
| X_MICROCMS_API_NAME | API name of microCMS. `X_MICROCMS_API_NAME` is the `<endpoint>` part of `api/v1/<endpoint>`. |

`.env` Example:

```
X_MICROCMS_API_KEY=abcdefg
X_MICROCMS_API_SUB_DOMAIN=example-sub-domain
X_MICROCMS_API_NAME=example
```

## API Schema

The format of microCMS API schema for this blog:

```typescript
export type ApiSchema = {
  title: string;
  body: string;
  slug: string;
  categories?: string[];
  tags?: string[];
  excerpt?: string;
  heroImage?: {
    url: string;
    width: number;
    height: number;
  };
};
```

## Development

Launch development server:

```
npm run dev
```

Execute build:

```
npm run build
```

Run test runner:

```
npm test
```
