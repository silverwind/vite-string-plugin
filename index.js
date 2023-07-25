import {readFile} from "node:fs/promises";

export function stringPlugin({match = /\.(svg|md)$/i} = {}) {
  return {
    name: "vite-string-plugin",
    enforce: "pre",
    load: async id => {
      const path = id.split("?")[0];
      if (!match.test(path)) return null;
      return `export default ${JSON.stringify(await readFile(path, "utf8")).replace(
        /[\u2028\u2029]/g, c => `\\u${`000${c.charCodeAt(0).toString(16)}`.slice(-4)}`
      )};`;
    }
  };
}
