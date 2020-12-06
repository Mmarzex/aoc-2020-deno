import Day from "./day.ts";

interface BoardingPass {
  row: string[];
  seat: string[];
}

const ROW_MAX = 127;
const SEAT_MAX = 7;

class Day5 extends Day {
  private parseInput(): BoardingPass[] {
    return this.input
      .split("\n")
      .map((s) => {
        const row = s.slice(0, 7).split("");
        const seat = s.slice(7).split("");
        return { row, seat };
      });
  }

  private getRowNumber(row: string[]): number {
    let lower = 0;
    let upper = ROW_MAX;
    for (let i = 0; i < 6; i++) {
      const diff = (upper - lower) / 2;
      if (row[i] === "F") {
        upper -= Math.ceil(diff);
      } else if (row[i] === "B") {
        lower += Math.ceil(diff);
      }
    }
    if (row[6] === "F") {
      return lower;
    }
    return upper;
  }

  private getSeatNumber(seat: string[]): number {
    let lower = 0;
    let upper = SEAT_MAX;
    for (let i = 0; i < 2; i++) {
      const diff = (upper - lower) / 2;
      if (seat[i] === "L") {
        upper -= Math.ceil(diff);
      } else if (seat[i] === "R") {
        lower += Math.ceil(diff);
      }
    }
    if (seat[2] === "L") {
      return lower;
    }
    return upper;
  }

  partOne(): string {
    const boardingPasses = this.parseInput().map((
      pass,
    ) => this.getRowNumber(pass.row) * 8 + this.getSeatNumber(pass.seat))
      .reduce((p, v) => v > p ? v : p, 0);
    return `${boardingPasses}`;
  }
  partTwo(): string {
    const boardingPasses = this.parseInput().map((
      pass,
    ) => this.getRowNumber(pass.row) * 8 + this.getSeatNumber(pass.seat))
      .sort((a, b) => a - b);
    for (let i = 1; i < boardingPasses.length; i++) {
      const l = boardingPasses[i - 1];
      const c = boardingPasses[i];
      if (l === boardingPasses[i] - 2) {
        console.log(`l: ${l} mine: ${l + 1} u: ${c}`);
      }
    }
    return "";
  }
}

export default Day5;
