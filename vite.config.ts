import {defineConfig} from "vite";
import {fileURLToPath} from "node:url";
import dtsPlugin from "vite-plugin-dts";
import {builtinModules} from "node:module";
import {stringPlugin} from "./index.ts";

export default defineConfig({
  build: {
    outDir: fileURLToPath(new URL("dist", import.meta.url)),
    minify: false,
    sourcemap: false,
    target: "modules",
    emptyOutDir: true,
    chunkSizeWarningLimit: Infinity,
    assetsInlineLimit: 32768,
    reportCompressedSize: false,
    lib: {
      entry: [fileURLToPath(new URL("index.ts", import.meta.url))],
      formats: ["es"],
    },
    rollupOptions: {
      external: builtinModules.map(module => `node:${module}`),
    }
  },
  plugins: [
    dtsPlugin({exclude: [
      "*.config.*",
      "*.test.*",
    ]}),
    stringPlugin(),
  ],
});
