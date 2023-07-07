# vite-string-plugin
[![](https://img.shields.io/npm/v/vite-string-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-string-plugin) [![](https://img.shields.io/npm/dm/vite-string-plugin.svg)](https://www.npmjs.org/package/vite-string-plugin) [![](https://packagephobia.com/badge?p=vite-string-plugin)](https://packagephobia.com/result?p=vite-string-plugin)

Vite plugin to load files as string

## Usage

```js
import {defineConfig, loadEnv} from "vite";
import {stringPlugin} from "vite-string-plugin";

export default defineConfig(() => {
  return {
    plugins: [
      stringPlugin({match: /\.(svg|md)/i}),
    ],
  };
});
```

## Options

- `match` *RegExp*: Regex to match File path against. Default: `/\.(svg|md)/i`.
