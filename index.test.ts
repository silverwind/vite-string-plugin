import {readFileSync} from "node:fs";
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
  const expected = readFileSync(new URL(`fixtures/test.${ext}`, import.meta.url), "utf8");
  expect(value).toEqual(expected);
  expect((await importFixture()).default).toEqual(expected);
});
