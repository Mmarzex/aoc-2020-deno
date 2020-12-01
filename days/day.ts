import { exists } from "https://deno.land/std@0.79.0/fs/mod.ts";

const AOC_YEAR = 2019;

class Day {
  protected input: string;
  protected dayNumber: number;
  protected cookie: string;

  constructor(day: number, cookie: string) {
    this.dayNumber = day;
    this.cookie = `session=${cookie}`;
    this.input = "";
  }

  setPuzzleInput(input: string) {
    this.input = input;
  }

  async fetchInput() {
    const inputPath = `${Deno.cwd()}/input/${this.dayNumber}.txt`;
    console.log(inputPath);
    const inputExists = await exists(inputPath);
    if (inputExists) {
      const decoder = new TextDecoder("utf-8");
      const data = await Deno.readFile(inputPath);
      this.input = decoder.decode(data);
    } else {
      const res = await fetch(
        `https://adventofcode.com/${AOC_YEAR}/day/${this.dayNumber}/input`,
        {
          headers: {
            cookie: this.cookie,
          },
        },
      );
      const data = (await res.text()).trimRight();
      this.input = data;
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
      await Deno.writeFile(inputPath, encodedData);
    }
  }

  partOne(): string {
    return "Not implemented yet";
  }

  partTwo(): string {
    return "Not implemented yet";
  }

  run() {
    console.log("#### PART ONE ####");
    console.log(this.partOne());
    console.log("#### PART TWO ####");
    console.log(this.partTwo());
  }
}

export default Day;
