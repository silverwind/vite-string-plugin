# vite-string-plugin
[![](https://img.shields.io/npm/v/vite-string-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-string-plugin) [![](https://img.shields.io/npm/dm/vite-string-plugin.svg)](https://www.npmjs.org/package/vite-string-plugin) [![](https://packagephobia.com/badge?p=vite-string-plugin)](https://packagephobia.com/result?p=vite-string-plugin)

Vite plugin to load files as string, with zero dependencies

## Usage

### vite
```js
import {defineConfig} from "vite";
import {stringPlugin} from "vite-string-plugin";

export default defineConfig({
  plugins: [
    stringPlugin(),
  ],
});
```

### vitest

```js
import {defineConfig} from "vitest/config";
import {stringPlugin} from "vite-string-plugin";

export default defineConfig({
  plugins: [
    stringPlugin(),
  ]
});
```

## Options

- `match`: Regex to match the path against. Default: `/\.(svg|md)$/i`.
