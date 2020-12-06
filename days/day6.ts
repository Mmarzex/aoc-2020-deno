import Day from "./day.ts";

const intersection = (setA: Set<string>, setB: Set<string>): Set<string> => {
  const _intersection: Set<string> = new Set();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
};

class Day6 extends Day {
  parseInput() {
    return this.input.split("\n\n")
      .map((s) => s.split("\n"));
  }
  partOne(): string {
    const groups = this.parseInput().map((s) => s.flatMap((v) => v.split("")))
      .map((s) => new Set(s));
    return `${groups.reduce((p, v) => p + v.size, 0)}`;
  }
  partTwo(): string {
    const groups = this.parseInput().map((group) => {
      let a = new Set(group[0].split(""));
      if (group.length === 1) {
        return a.size;
      }
      for (let i = 1; i < group.length; i++) {
        const b = new Set(group[i].split(""));
        a = intersection(a, b);
      }
      return a.size;
    }).reduce((p, v) => p + v, 0);
    return `${groups}`;
  }
}

export default Day6;
