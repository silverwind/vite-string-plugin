import {readFile} from "node:fs/promises";
import type {Plugin} from "vite";

const defaultMatch = /\.(svg|md|xml)$/i;

type Opts = {
  /** regex to match on the file path. Default: /\.(svg|md|xml)$/i */
  match: RegExp;
}

export const stringPlugin = ({match = defaultMatch}: Opts = {match: defaultMatch}): Plugin => ({
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
