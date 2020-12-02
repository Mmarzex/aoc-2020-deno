import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import Day2 from "./day2.ts";

const testInput = "1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc";

Deno.test("Day 2 Part One", () => {
  const day = new Day2(2, "");
  day.setPuzzleInput(testInput);
  const res = day.partOne();
  assertEquals(res, "2");
});

Deno.test("Day 2 Part Two", () => {
  const day = new Day2(2, "");
  day.setPuzzleInput(testInput);
  const res = day.partTwo();
  assertEquals(res, "1");
});
