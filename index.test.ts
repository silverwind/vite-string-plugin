import {readFileSync, writeFileSync, mkdirSync} from "node:fs";
import {join} from "node:path";
import {createServer} from "vite";
import {stringPlugin} from "./index.ts";
import svg from "./fixtures/test.svg";
import md from "./fixtures/test.md";
import txt from "./fixtures/test.txt";
import pdf from "./fixtures/test.pdf";

test("exists", () => {
  expect(stringPlugin).toBeFunction();
});

test("svg", async () => {
  const expected = readFileSync(new URL("fixtures/test.svg", import.meta.url), "utf8");
  expect(svg).toEqual(expected);
  expect((await import("./fixtures/test.svg")).default).toEqual(expected);
});

test("md", async () => {
  const expected = readFileSync(new URL("fixtures/test.md", import.meta.url), "utf8");
  expect(md).toEqual(expected);
  expect((await import("./fixtures/test.md")).default).toEqual(expected);
});

test("txt", async () => {
  const expected = readFileSync(new URL("fixtures/test.txt", import.meta.url), "utf8");
  expect(txt).toEqual(expected);
  expect((await import("./fixtures/test.txt")).default).toEqual(expected);
});

test("pdf", async () => {
  const expected = readFileSync(new URL("fixtures/test.pdf", import.meta.url), "utf8");
  expect(pdf).toEqual(expected);
  expect((await import("./fixtures/test.pdf")).default).toEqual(expected);
});

test("hmr simulation", async () => {
  // Create a temporary test file
  const tmpDir = "/tmp/vite-string-plugin-test";
  mkdirSync(tmpDir, {recursive: true});
  const testFile = join(tmpDir, "hmr-test.txt");
  const initialContent = "Initial content";
  writeFileSync(testFile, initialContent);

  // Create a Vite dev server with the plugin
  const server = await createServer({
    root: tmpDir,
    logLevel: "silent",
    plugins: [stringPlugin()],
    server: {
      hmr: false, // Disable HMR websocket
    },
  });

  try {
    // Load the module
    const mod1 = await server.ssrLoadModule(testFile);
    expect(mod1.default).toEqual(initialContent);

    // Modify the file
    const updatedContent = "Updated content";
    writeFileSync(testFile, updatedContent);

    // Get the module node and invalidate it
    const moduleNode = server.moduleGraph.getModuleById(testFile);
    if (moduleNode) {
      // Invalidate the module and all its importers
      server.moduleGraph.invalidateModule(moduleNode, new Set(), Date.now(), true);
    }

    // Force Vite to re-evaluate by restarting the module
    await server.restart();
    // Reload the module after restart
    const mod2 = await server.ssrLoadModule(testFile);
    expect(mod2.default).toEqual(updatedContent);
  } finally {
    await server.close();
  }
});
