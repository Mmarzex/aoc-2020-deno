import Day from "./day.ts";
import { Combination } from "https://cdn.skypack.dev/js-combinatorics";

class Day9 extends Day {
  parseInput() {
    const nums = this.input.split("\n").map((s) => parseInt(s));
    const preamble = nums.slice(0, 25);
    const rest = nums.slice(25);
    return { preamble, rest };
  }

  private partOneAnswer = 0;

  partOne(): string {
    const input = this.parseInput();
    const preamble = [...input.preamble];
    let preambleCombo = new Combination(preamble, 2);
    let sums = [...preambleCombo].reduce((p, v: number[]) => {
      p.add(v[0] + v[1]);
      return p;
    }, new Set<number>());
    for (const num of input.rest) {
      if (!sums.has(num)) {
        this.partOneAnswer = num;
        return `${num}`;
      }
      preamble.shift();
      preamble.push(num);
      preambleCombo = new Combination(preamble, 2);
      sums = [...preambleCombo].reduce((p, v: number[]) => {
        p.add(v[0] + v[1]);
        return p;
      }, new Set<number>());
    }
    return "";
  }
  partTwo(): string {
    const input = this.parseInput();
    const foundNumber = this.partOneAnswer;
    let startingPoint = 0;
    let i = 0;
    let found: number[] = [];
    let sum = 0;
    while (i < input.rest.length) {
      sum += input.rest[i];
      found.push(input.rest[i]);
      i++;
      if (sum > foundNumber) {
        startingPoint += 1;
        i = startingPoint;
        found = [];
        sum = 0;
        continue;
      } else if (sum === foundNumber) {
        const foundSorted = found.sort((a, b) => a - b);
        return `${foundSorted[0] + foundSorted[foundSorted.length - 1]}`;
      }
    }
    return "";
  }
}

export default Day9;
