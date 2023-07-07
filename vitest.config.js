import {defineConfig} from "vitest/dist/config.js";
import {backendTest} from "vitest-config-silverwind";
import {stringPlugin} from "./index.js";

export default defineConfig({
  test: backendTest,
  plugins: [stringPlugin()],
});
