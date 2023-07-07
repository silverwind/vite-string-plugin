import {readFile} from "node:fs/promises";

export function stringPlugin({match = /\.svg|md/i} = {}) {
  return {
    name: "vite-string-plugin",
    enforce: "pre",
    async load(id) {
      const path = id.split("?")[0];
      if (!match.test(path)) return null;
      return `export default \`${await readFile(path, "utf8")}\``;
    }
  };
}
