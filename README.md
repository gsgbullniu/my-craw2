# My Crawler v2

- known issue for ts-node + node 20
  - workaround: `node --loader ts-node/esm src/main.ts`
  - [javascript - ts-node and ESM: unknown file extension '.ts' - Stack Overflow](https://stackoverflow.com/questions/76725253/ts-node-and-esm-unknown-file-extension-ts)
  - https://github.com/TypeStrong/ts-node/issues/1997
