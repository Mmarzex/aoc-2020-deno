import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import Day1 from "./day1.ts";

const testInput = "1721\n979\n366\n299\n675\n1456";

Deno.test("Day 1 Part One", () => {
  const day1 = new Day1(1, "");
  day1.setPuzzleInput(testInput);
  const res = day1.partOne();
  assertEquals(res, "514579");
});

Deno.test("Day 1 Part Two", () => {
  const day1 = new Day1(1, "");
  day1.setPuzzleInput(testInput);
  const res = day1.partTwo();
  assertEquals(res, "241861950");
});
