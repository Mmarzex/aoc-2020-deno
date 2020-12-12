import Day from "./day.ts";

interface Instruction {
  direction: string;
  value: number;
}
class Day12 extends Day {
  private parseInput(): Instruction[] {
    return this.input.split("\n").map((v) => {
      const d = v[0];
      const va = parseInt(v.slice(1));
      return { direction: d, value: va };
    });
  }

  findDirection(current: string, increment: number, d: string) {
    let i = increment / 90;
    let direction = current;
    while (i > 0) {
      if (d === "L") {
        switch (direction) {
          case "E":
            direction = "N";
            break;
          case "N":
            direction = "W";
            break;
          case "W":
            direction = "S";
            break;
          case "S":
            direction = "E";
            break;
          default:
            break;
        }
      } else {
        switch (direction) {
          case "E":
            direction = "S";
            break;
          case "S":
            direction = "W";
            break;
          case "W":
            direction = "N";
            break;
          case "N":
            direction = "E";
            break;
          default:
            break;
        }
      }
      i--;
    }
    return direction;
  }

  private updateWaypointAngle(
    wx: number,
    wy: number,
    increment: number,
  ) {
    let i = increment;
    while (i > 360) i -= 360;
    while (i < 0) i += 360;

    switch (i) {
      case 0:
      case 360:
        return { wx, wy };
      case 90:
        return { wx: wy, wy: -1 * wx };
      case 180:
        return { wx: -1 * wx, wy: -1 * wy };
      case 270:
        return { wx: -1 * wy, wy: wx };
      default:
        break;
    }
  }

  partOne(): string {
    const input = this.parseInput();
    let x = 0;
    let y = 0;
    let direction = "E";
    for (const instruction of input) {
      switch (instruction.direction) {
        case "N":
          y += instruction.value;
          break;
        case "S":
          y -= instruction.value;
          break;
        case "E":
          x += instruction.value;
          break;
        case "W":
          x -= instruction.value;
          break;
        default:
          break;
      }
      if (instruction.direction === "F") {
        switch (direction) {
          case "N":
            y += instruction.value;
            break;
          case "S":
            y -= instruction.value;
            break;
          case "E":
            x += instruction.value;
            break;
          case "W":
            x -= instruction.value;
            break;
          default:
            break;
        }
      }
      if (instruction.direction === "R") {
        direction = this.findDirection(direction, instruction.value, "R");
      } else if (instruction.direction === "L") {
        direction = this.findDirection(direction, instruction.value, "L");
      }
    }
    return `${Math.abs(x) + Math.abs(y)}`;
  }

  partTwo(): string {
    const input = this.parseInput();
    let x = 0;
    let y = 0;
    let wx = 10;
    let wy = 1;
    for (const instruction of input) {
      switch (instruction.direction) {
        case "N":
          wy += instruction.value;
          break;
        case "S":
          wy -= instruction.value;
          break;
        case "E":
          wx += instruction.value;
          break;
        case "W":
          wx -= instruction.value;
          break;
        default:
          break;
      }
      if (instruction.direction === "F") {
        x += wx * instruction.value;
        y += wy * instruction.value;
      }
      if (instruction.direction === "R") {
        const res = this.updateWaypointAngle(wx, wy, instruction.value);
        wx = res!.wx;
        wy = res!.wy;
      } else if (instruction.direction === "L") {
        const res = this.updateWaypointAngle(wx, wy, -1 * instruction.value);
        wx = res!.wx;
        wy = res!.wy;
      }
    }
    return `${Math.abs(x) + Math.abs(y)}`;
  }
}

export default Day12;
