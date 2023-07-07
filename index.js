import {readFile} from "node:fs/promises";

export function stringPlugin({match = /\.(svg|md)/i} = {}) {
  return {
    name: "vite-string-plugin",
    enforce: "pre",
    async load(id) {
      const path = id.split("?")[0];
      if (!match.test(path)) return null;
      const data = await readFile(path, "utf8");

      // https://github.com/rollup/plugins/blob/master/packages/pluginutils/src/dataToEsm.ts
      const str = JSON.stringify(data).replace(/[\u2028\u2029]/g,
        char => `\\u${`000${char.charCodeAt(0).toString(16)}`.slice(-4)}`
      );
      return `export default ${str};`;
    }
  };
}
