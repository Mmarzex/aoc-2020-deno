import Day from "./day.ts";

enum Tile {
  tree = "#",
  open = ".",
  hit = "X",
  clear = "0",
}

class Day3 extends Day {
  private parseInput() {
    const splitLines = this.input.split("\n");
    const width = splitLines[0].length;
    const height = splitLines.length;
    const numberOfListsNeeded = height * 3;
    const res: Tile[][] = this.input.split("\n")
      .map((s) => s.split("").map((x) => x as Tile));
    return res;
  }
  partOne(): string {
    const slope = this.parseInput();
    const treesHit = this.calculateHitTrees(slope, 3, 1);
    return `${treesHit}`;
  }

  private calculateHitTrees(slope: Tile[][], dx: number, dy: number): number {
    const width = slope[0].length;
    let x = 0;
    let y = 0;
    let treesHit = 0;
    while (y < slope.length - 1) {
      if (x + dx >= width) {
        x = (x + dx) - width;
      } else {
        x += dx;
      }

      y += dy;
      const tile = slope[y][x];
      if (tile === Tile.tree) treesHit += 1;
    }
    return treesHit;
  }

  partTwo(): string {
    const slope = this.parseInput();
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    const results = slopes.map((s) => this.calculateHitTrees(slope, s[0], s[1]))
      .reduce((p, v) => p * v, 1);
    return `${results}`;
  }
}

export default Day3;
