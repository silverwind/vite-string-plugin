import {defineConfig} from "vitest/config";
import {backend} from "vitest-config-silverwind";
import {stringPlugin} from "./index.ts";

export default defineConfig(backend({
  url: import.meta.url,
  plugins: [stringPlugin({match: /\.(svg|md|txt|pdf)$/i})],
}));
