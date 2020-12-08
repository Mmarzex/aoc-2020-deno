import Day from "./day.ts";

interface Instruction {
  op: string;
  param: number;
  executed: boolean;
}

class Day8 extends Day {
  private parseInput(): Instruction[] {
    return this.input.split("\n")
      .map((s) => {
        const x = s.split(" ");
        return { op: x[0], param: parseInt(x[1]), executed: false };
      });
  }
  partOne(): string {
    const program = this.parseInput();
    let position = 0;
    let acc = 0;
    while (true) {
      if (program[position].executed) {
        return `${acc}`;
      }
      program[position].executed = true;
      switch (program[position].op) {
        case "nop":
          position += 1;
          break;
        case "acc":
          acc += program[position].param;
          position += 1;
          break;
        case "jmp":
          position += program[position].param;
          break;
      }
    }
  }
  partTwo(): string {
    let program = this.parseInput();
    let position = 0;
    let acc = 0;
    const nopIndexes: number[] = [];
    const jmpIndexes: number[] = [];
    program.forEach((v, i) => {
      if (v.op === "nop") {
        nopIndexes.push(i);
      } else if (v.op === "jmp") {
        jmpIndexes.push(i);
      }
    });
    while (true) {
      if (position >= program.length) {
        return `${acc}`;
      }
      if (program[position].executed) {
        program = this.parseInput();
        position = 0;
        acc = 0;
        if (nopIndexes.length > 0) {
          const nopIndex = nopIndexes.shift()!;
          program[nopIndex].op = "jmp";
        } else if (jmpIndexes.length > 0) {
          const jmpIndex = jmpIndexes.shift()!;
          program[jmpIndex].op = "nop";
        }
      }
      program[position].executed = true;
      switch (program[position].op) {
        case "nop":
          position += 1;
          break;
        case "acc":
          acc += program[position].param;
          position += 1;
          break;
        case "jmp":
          position += program[position].param;
          break;
      }
    }
  }
}

export default Day8;
