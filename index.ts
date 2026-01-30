import {readFile} from "node:fs/promises";
import type {Plugin} from "vite";

export type ViteStringPluginOpts = {
  /** regex to match on the file path. Default: `/\.(svg|md|xml|txt)$/i` */
  match?: RegExp;
};

/** Vite plugin to import files as string */
export const stringPlugin: (opts?: ViteStringPluginOpts) => Plugin = ({match = /\.(svg|md|xml|txt)$/i}: ViteStringPluginOpts = {}): Plugin => ({
  name: "vite-string-plugin",
  enforce: "pre",
  async transform(_code, id) {
    const path = id.split("?")[0];
    if (!match.test(path)) {
      return;
    }
    return {
      code: `export default ${JSON.stringify(await readFile(path, "utf8")).replace(
        /[\u2028\u2029]/g, c => `\\u${`000${c.charCodeAt(0).toString(16)}`.slice(-4)}`
      )};`,
      map: {mappings: ""},
    };
  }
});
