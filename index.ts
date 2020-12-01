import { parse } from "https://deno.land/std@0.79.0/flags/mod.ts";
import Day from "./days/day.ts";

const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("./aoc_cookie");
const cookie = decoder.decode(data);

const args = parse(Deno.args);

const runDaysFromInput = async (day: number | number[]) => {
  if (!Array.isArray(day)) {
    await runDay(day);
  } else {
    for (let i = 0; i < day.length; i++) {
      await runDay(day[i]);
    }
  }
};

const runDay = async (day: number) => {
  const dayModule = await import(`./days/day${day}.ts`);
  const d = new dayModule.default(day, cookie) as Day;
  await d.fetchInput();
  d.run();
};

let input: number | number[];

if (args["run-all"]) {
  input = [...Array(26).keys()].slice(1);
} else {
  input = args["day"];
}

console.log("🎄🎄Advent of Code🎄🎄");
runDaysFromInput(input).then(() => console.log("finised")).catch(
  (e) => console.log(e),
);
