import {readFile} from "node:fs/promises";

export function stringPlugin({match = /\.(svg|md)/i} = {}) {
  return {
    name: "vite-string-plugin",
    enforce: "pre",
    async load(id) {
      const path = id.split("?")[0];
      if (!match.test(path)) return null;
      const str = (await readFile(path, "utf8"))
        .replaceAll("`", "\\`")
        .replaceAll("${", "\\${");

      return `export default \`${str}\`;`;
    }
  };
}
