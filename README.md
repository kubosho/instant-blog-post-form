# Instant blog post form

Blog post form for blog.kubosho.com.

![Page screenshot](https://cdn.jsdelivr.net/gh/kubosho/instant-blog-post-form@master/screenshot/v1.0.0.png?version=1.0.0)

## Config

Required write environment variables in `.env` file when submit articles to [microCMS](https://microcms.io/).


| key | value |
| --- | --- |
| X_MICROCMS_API_KEY | Authentication key for microCMS API requests. |
| X_MICROCMS_HOST_NAME | Host name of microCMS. The format is `<service-id>.microcms.io`. |
| X_MICROCMS_API_PATH | API path of microCMS. The format is `api/v1/<endpoint>`. |

`.env` Example:

```
X_MICROCMS_API_KEY=abcdefg
X_MICROCMS_HOST_NAME=example.microcms.io
X_MICROCMS_API_PATH=api/v1/example
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
