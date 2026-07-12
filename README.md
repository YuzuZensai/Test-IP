# IP Test

🌐 Minimal HTTP server that echoes your IP and request headers as HTML or JSON.

Built with [Elysia](https://elysiajs.com/) on [Bun](https://bun.sh/).

## Usage

Send a request to `/`:

- Browsers (`Accept: text/html` or `*/*`) get an HTML page listing the detected IP and all request headers.
- Anything requesting `Accept: application/json` gets a JSON body: `{ "ip": "...", "headers": { ... } }`.

```bash
curl -H "Accept: application/json" http://localhost:3000/
```

## Development

Requires [Bun](https://bun.sh/) 1.2+.

```bash
bun install
bun run dev      # hot-reload dev server
bun run start    # start the server
bun test         # run tests
bun run check    # typecheck + lint/format check + tests
```

## Docker

```bash
docker build -t ip-test .
docker run -p 3000:3000 ip-test
```

## License

[MIT](LICENSE)
