# vite-string-plugin
[![](https://img.shields.io/npm/v/vite-string-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-string-plugin) [![](https://img.shields.io/npm/dm/vite-string-plugin.svg)](https://www.npmjs.org/package/vite-string-plugin) [![](https://packagephobia.com/badge?p=vite-string-plugin)](https://packagephobia.com/result?p=vite-string-plugin)

Vite plugin to import files as string, with zero dependencies

## Usage

#### vite.config.js

```js
import {defineConfig} from "vite";
import {stringPlugin} from "vite-string-plugin";

export default defineConfig({
  plugins: [
    stringPlugin(),
  ],
});
```
#### file.js

```js
import foo from "./foo.svg";
```

## Options

- `match`: Regex to match the path against. Default: `/\.(svg|md|xml|txt)$/i`.

## Typescript

If the default types cover your needs, add `vite-string-plugin/types` to your `types` in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "vite-string-plugin/types"
    ]
  }
}
```

Alternatively, you can add ambient type declarations for each file extension:

```ts
declare module "*.svg" {
  const value: string;
  export default value;
}
declare module "*.md" {
  const value: string;
  export default value;
}
declare module "*.xml" {
  const value: string;
  export default value;
}
declare module "*.txt" {
  const value: string;
  export default value;
}
```

## Related

- [`vite-yaml-plugin`](https://github.com/silverwind/vite-yaml-plugin)
