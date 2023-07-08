import {readFileSync} from "node:fs";
import svg from "./fixtures/test.svg";
import md from "./fixtures/test.md";
import txt from "./fixtures/test.txt";
import pdf from "./fixtures/test.pdf";

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
