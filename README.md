## Less Longer

### Usage

Ensure required environment variables are defined, then run:

```bash
npm run start
```

For local development `./.env-development`/`./.env-test` files are recommended for secret configuration (`DATABASE_URL`), but feel free to populate the environment however you like. You may also copy from `.env-sample` if you like.

### Development

Linter should pass without errors or warnings on each commit:

```shell
npm run lint
```

Create migration:

```shell
npm run migrate -- create <name-of-migration>
```

Run migrations:

```shell
npm run migrate -- up
```
