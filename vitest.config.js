import {defineConfig} from "vitest/config";
import {backendTest} from "vitest-config-silverwind";
import {stringPlugin} from "./index.js";

export default defineConfig({
  test: backendTest({url: import.meta.url}),
  plugins: [stringPlugin({match: /\.(svg|md|txt|pdf)$/i})],
});
