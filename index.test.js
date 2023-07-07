import {readFileSync} from "node:fs";
import svg from "./fixtures/test.svg";
import md from "./fixtures/test.md";

test("svg", () => {
  expect(svg).toEqual(readFileSync(new URL("fixtures/test.svg", import.meta.url), "utf8"));
});

test("md", () => {
  expect(md).toEqual(readFileSync(new URL("fixtures/test.md", import.meta.url), "utf8"));
});
