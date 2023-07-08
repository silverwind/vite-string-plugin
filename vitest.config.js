import {defineConfig} from "vitest/config";
import {backendTest} from "vitest-config-silverwind";
import {stringPlugin} from "./index.js";

export default defineConfig({
  test: backendTest,
  plugins: [stringPlugin({match: /\.(svg|md|txt|pdf)$/i})],
});
