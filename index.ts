import {readFile} from "node:fs/promises";
import type {Plugin} from "vite";

type ViteStringPluginOpts = {
  /** regex to match on the file path. Default: `/\.(svg|md|xml)$/i` */
  match?: RegExp;
}

/** Vite plugin to import files as string */
type StringPlugin = (opts: ViteStringPluginOpts) => Plugin;

export const stringPlugin: StringPlugin = ({match = /\.(svg|md|xml)$/i}: ViteStringPluginOpts = {}): Plugin => ({
  name: "vite-string-plugin",
  enforce: "pre",
  async load(id) {
    const path = id.split("?")[0];
    if (!match.test(path)) return null;
    return `export default ${JSON.stringify(await readFile(path, "utf8")).replace(
      /[\u2028\u2029]/g, c => `\\u${`000${c.charCodeAt(0).toString(16)}`.slice(-4)}`
    )};`;
  }
});
