import {readFile} from "node:fs/promises";

export function stringPlugin({match = /\.(svg|md)/i} = {}) {
  return {
    name: "vite-string-plugin",
    enforce: "pre",
    async load(id) {
      const path = id.split("?")[0];
      if (!match.test(path)) return null;

      // based on https://github.com/joliss/js-string-escape
      const str = (await readFile(path, "utf8"))
        .replace(/["'\\\n\r\u2028\u2029]/g, char => {
          switch (char) {
            case '"':
            case "'":
            case "\\":
              return `\\${char}`;
            case "\n":
              return "\\n";
            case "\r":
              return "\\r";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
          }
        });

      return `export default "${str}";`;
    }
  };
}
