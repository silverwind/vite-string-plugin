import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {build, type Rolldown} from "vite";
import {stringPlugin} from "./index.ts";
import svg from "./fixtures/test.svg";
import md from "./fixtures/test.md";
import txt from "./fixtures/test.txt";
import pdf from "./fixtures/test.pdf";

test("exists", () => {
  expect(stringPlugin).toBeFunction();
});

test.each([
  ["svg", svg, () => import("./fixtures/test.svg")],
  ["md", md, () => import("./fixtures/test.md")],
  ["txt", txt, () => import("./fixtures/test.txt")],
  ["pdf", pdf, () => import("./fixtures/test.pdf")],
])("%s", async (ext, value, importFixture) => {
  const url = new URL(`fixtures/test.${ext}`, import.meta.url);
  const expected = readFileSync(url, "utf8");
  expect(value).toEqual(expected);
  expect((await importFixture()).default).toEqual(expected);
  const [{output: [chunk]}] = await build({
    configFile: false,
    logLevel: "silent",
    plugins: [stringPlugin({match: /\.(svg|md|txt|pdf)$/i})],
    build: {write: false, lib: {entry: fileURLToPath(url), formats: ["es"]}},
  }) as Rolldown.RolldownOutput[];
  expect((await import(`data:text/javascript,${encodeURIComponent(chunk.code)}`)).default).toEqual(expected);
});
