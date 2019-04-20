## Less Longer

### Usage

Ensure required environment variables are defined, then run:

```shell
npm run start
```

For local development `./development.env`/`./test.env` files are recommended for secret configuration (`DATABASE_URL`), but feel free to populate the environment however you like. You may also copy from `sample.env` if you like.

Use the `roarr` CLI tool to tame the output. Next dumps a bunch of "friendly" unstructured text, which any of these commands will filter out. Also Next makes a many background requests, so those are logged at a lower level to make it easier to cut through the noise.

```shell
npm run start | npx roarr filter --context 0 --exclude-orphans '{ "context.logLevel": { gt: 10 } }' | npx roarr pretty-print
npm run start | npx roarr filter --context 0 --exclude-orphans '{ "context.request.path": "/_next", _not: true, _start: true }' | npx roarr pretty-print
npm run start | npx roarr augment --exclude-orphans | npx roarr pretty-print
```

For production you likely want to run something similar to the command below:

```shell
npm run start | npx roarr augment --append-hostname --exclude-orphans
```

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
