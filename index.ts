import {readFile} from "node:fs/promises";
import type {Plugin} from "vite";

export type ViteStringPluginOpts = {
  /** regex to match on the file path. Default: `/\.(svg|md|xml|txt)$/i` */
  match?: RegExp;
};

/** Vite plugin to import files as string */
export const stringPlugin = ({match = /\.(svg|md|xml|txt)$/i}: ViteStringPluginOpts = {}): Plugin => ({
  name: "vite-string-plugin",
  enforce: "pre",
  load: {
    filter: {
      id: match,
    },
    handler: async (id) => ({
      code: `export default ${JSON.stringify(await readFile(id.split("?")[0], "utf8")).replace(
        /[\u2028\u2029]/g, c => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`
      )};`,
      map: {mappings: ""},
    }),
  },
});
