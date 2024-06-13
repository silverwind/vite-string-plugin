# vite-string-plugin
[![](https://img.shields.io/npm/v/vite-string-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-string-plugin) [![](https://img.shields.io/npm/dm/vite-string-plugin.svg)](https://www.npmjs.org/package/vite-string-plugin) [![](https://packagephobia.com/badge?p=vite-string-plugin)](https://packagephobia.com/result?p=vite-string-plugin)

Vite plugin to import files as string, with zero dependencies

## Usage

#### vitest.config.js

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

- `match`: Regex to match the path against. Default: `/\.(svg|md|xml)$/i`.

## Typescript

Add these to your project-specific type declarations:

```ts
declare module "*.pdf" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const value: string;
  export default value;
}
declare module "*.md" {
  const value: string;
  export default value;
}
```
