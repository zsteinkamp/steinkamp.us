This is a [Markdoc](https://markdoc.dev/) / [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
cd dev && docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit files in the `pages/` directory. Posts are in Markdoc format in `pages/posts/`.

## Production Mode

Bringing up the service in the project root directory will start it in
production mode, which listens on port 3125.

```bash
# in the project root directory
docker compose build && docker compose up -d --force-recreate
```

## Makefile targets

If your system has `make` installed, you can use that to speed running some
commands:

- `make devup` - Start the development mode server and tail the logs
- `make devdown` - Stop the development mode server
- `make prod` - Build and start/restart the production server then tail the logs. Can be safely interrupted (`Ctrl-C`) without stopping the server.
