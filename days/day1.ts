import Day from "./day.ts";

class Day1 extends Day {
  partOne(): string {
    const expenses = this.input.trimRight().split("\n").map((d) => parseInt(d));
    for (let i = 0; i < expenses.length; i++) {
      for (let j = i + 1; j < expenses.length; j++) {
        if (expenses[i] + expenses[j] === 2020) {
          return `${expenses[i] * expenses[j]}`;
        }
      }
    }
    return "";
  }
  partTwo(): string {
    const expenses = this.input.trimRight().split("\n").map((d) => parseInt(d));
    for (let i = 0; i < expenses.length; i++) {
      for (let j = i + 1; j < expenses.length; j++) {
        for (let z = j + 1; z < expenses.length; z++) {
          if (expenses[i] + expenses[j] + expenses[z] === 2020) {
            return `${expenses[i] * expenses[j] * expenses[z]}`;
          }
        }
      }
    }
    return "";
  }
}

export default Day1;
