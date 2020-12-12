import Day from "./day.ts";
import { clone } from "https://cdn.skypack.dev/ramda";

enum Direction {
  N = 0,
  S,
  W,
  E,
  NW,
  NE,
  SW,
  SE,
}

interface Point {
  x: number;
  y: number;
  val: string;
}

class Day11 extends Day {
  private parseInput() {
    return this.input.split("\n")
      .map((s) => s.split(""));
  }

  private printBoard(board: string[][]) {
    const x = board.map((y) => y.join("")).join("\n");
    console.log(x);
    console.log("\n\n");
  }

  private findVisibleSeats(
    board: string[][],
    x: number,
    y: number,
    direction: Direction,
  ): string | undefined {
    const validSpaces = ["L", "#"];
    if (direction === Direction.N) {
      let dy = y - 1;
      while (dy >= 0) {
        if (validSpaces.includes(board[dy][x])) {
          return board[dy][x];
        }
        dy--;
      }
    } else if (direction === Direction.S) {
      let dy = y + 1;
      while (dy < board.length) {
        if (validSpaces.includes(board[dy][x])) {
          return board[dy][x];
          // return { x, y: dy, val: board[dy][x] };
        }
        dy++;
      }
    } else if (direction === Direction.E) {
      let dx = x + 1;
      while (dx < board[y].length) {
        if (validSpaces.includes(board[y][dx])) {
          return board[y][dx];
          // return { x: dx, y, val: board[y][dx] };
        }
        dx++;
      }
    } else if (direction === Direction.W) {
      let dx = x - 1;
      while (dx >= 0) {
        if (validSpaces.includes(board[y][dx])) {
          return board[y][dx];
          // return { x: dx, y, val: board[y][dx] };
        }
        dx--;
      }
    } else if (direction === Direction.NE) {
      let dx = x + 1;
      let dy = y - 1;
      while (dy >= 0 && dx < board[y].length) {
        if (validSpaces.includes(board[dy][dx])) {
          return board[dy][dx];
          // return { x: dx, y: dy, val: board[dy][dx] };
        }
        dx++;
        dy--;
      }
    } else if (direction === Direction.NW) {
      let dx = x - 1;
      let dy = y - 1;
      while (dy >= 0 && dx >= 0) {
        if (validSpaces.includes(board[dy][dx])) {
          return board[dy][dx];
          // return { x: dx, y: dy, val: board[dy][dx] };
        }
        dx--;
        dy--;
      }
    } else if (direction === Direction.SE) {
      let dx = x + 1;
      let dy = y + 1;
      while (dy < board.length && dx < board[y].length) {
        if (validSpaces.includes(board[dy][dx])) {
          return board[dy][dx];
          // return { x: dx, y: dy, val: board[dy][dx] };
        }
        dx++;
        dy++;
      }
    } else if (direction === Direction.SW) {
      let dx = x - 1;
      let dy = y + 1;
      while (dy < board.length && dx >= 0) {
        if (validSpaces.includes(board[dy][dx])) {
          return board[dy][dx];
        }
        dx--;
        dy++;
      }
    }
  }

  private loopBoardPartTwo(board: string[][]): string[][] {
    const newBoard = clone(board);
    const validSpaces = ["L", "#"];

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (!validSpaces.includes(board[y][x])) continue;
        if (y === 0 && x === 0) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.S),
            this.findVisibleSeats(board, x, y, Direction.E),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (y === 0 && x === board[y].length - 1) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.S),
            this.findVisibleSeats(board, x, y, Direction.W),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (y === board.length - 1 && x === 0) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.N),
            this.findVisibleSeats(board, x, y, Direction.E),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (y === board.length - 1 && x === board[y].length - 1) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.N),
            this.findVisibleSeats(board, x, y, Direction.W),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (y === 0) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.S),
            this.findVisibleSeats(board, x, y, Direction.W),
            this.findVisibleSeats(board, x, y, Direction.E),
            this.findVisibleSeats(board, x, y, Direction.SW),
            this.findVisibleSeats(board, x, y, Direction.SE),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (x === 0) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.S),
            this.findVisibleSeats(board, x, y, Direction.N),
            this.findVisibleSeats(board, x, y, Direction.E),
            this.findVisibleSeats(board, x, y, Direction.NE),
            this.findVisibleSeats(board, x, y, Direction.SE),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (y === board.length - 1) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.N),
            this.findVisibleSeats(board, x, y, Direction.W),
            this.findVisibleSeats(board, x, y, Direction.E),
            this.findVisibleSeats(board, x, y, Direction.NE),
            this.findVisibleSeats(board, x, y, Direction.NW),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else if (x === board[y].length - 1) {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.N),
            this.findVisibleSeats(board, x, y, Direction.S),
            this.findVisibleSeats(board, x, y, Direction.W),
            this.findVisibleSeats(board, x, y, Direction.SW),
            this.findVisibleSeats(board, x, y, Direction.NW),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        } else {
          const spaces = [
            this.findVisibleSeats(board, x, y, Direction.N),
            this.findVisibleSeats(board, x, y, Direction.S),
            this.findVisibleSeats(board, x, y, Direction.W),
            this.findVisibleSeats(board, x, y, Direction.SW),
            this.findVisibleSeats(board, x, y, Direction.NW),
            this.findVisibleSeats(board, x, y, Direction.E),
            this.findVisibleSeats(board, x, y, Direction.NE),
            this.findVisibleSeats(board, x, y, Direction.SE),
          ];
          if (board[y][x] === "L" && !spaces.includes("#")) {
            newBoard[y][x] = "#";
          } else if (spaces.filter((s) => s === "#").length >= 5) {
            newBoard[y][x] = "L";
          }
        }
      }
    }
    return newBoard;
  }
  private loopBoard(board: string[][]): string[][] {
    const newBoard = clone(board);
    const empties = ["L", "."];
    const validSpaces = ["L", "#"];

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (y === 0 && x === 0) {
          if (validSpaces.includes(board[y][x])) {
            const spaces = [board[y + 1][x], board[y][x + 1]];
            if (
              board[y][x] === "L" &&
              spaces.filter((s) => empties.includes(s)).length === spaces.length
            ) {
              newBoard[y][x] = "#";
            }
          }
        } else if (y === 0 && x === board[y].length - 1) {
          if (
            board[y][x] === "L" && empties.includes(board[y + 1][x]) &&
            empties.includes(board[y][x - 1])
          ) {
            newBoard[y][x] = "#";
          }
        } else if (y === board.length - 1 && x === 0) {
          if (
            board[y][x] === "L" && empties.includes(board[y - 1][x]) &&
            empties.includes(board[y][x + 1])
          ) {
            newBoard[y][x] = "#";
          }
        } else if (y === board.length - 1 && x === board[y].length - 1) {
          if (
            board[y][x] === "L" && empties.includes(board[y - 1][x]) &&
            empties.includes(board[y][x - 1])
          ) {
            newBoard[y][x] = "#";
          }
        } else if (y === 0) {
          if (validSpaces.includes(board[y][x])) {
            const spaces = [
              board[y + 1][x],
              board[y][x - 1],
              board[y][x + 1],
              board[y + 1][x - 1],
              board[y + 1][x + 1],
            ];
            if (
              board[y][x] === "L" &&
              spaces.filter((s) => empties.includes(s)).length === spaces.length
            ) {
              newBoard[y][x] = "#";
            } else if (spaces.filter((s) => s === "#").length >= 4) {
              newBoard[y][x] = "L";
            }
          }
        } else if (x === 0) {
          if (validSpaces.includes(board[y][x])) {
            const spaces = [
              board[y + 1][x],
              board[y - 1][x],
              board[y][x + 1],
              board[y - 1][x + 1],
              board[y + 1][x + 1],
            ];
            if (
              board[y][x] === "L" &&
              spaces.filter((s) => empties.includes(s)).length === spaces.length
            ) {
              newBoard[y][x] = "#";
            } else if (spaces.filter((s) => s === "#").length >= 4) {
              newBoard[y][x] = "L";
            }
          }
        } else if (y === board.length - 1) {
          if (validSpaces.includes(board[y][x])) {
            const spaces = [
              board[y - 1][x],
              board[y][x - 1],
              board[y][x + 1],
              board[y - 1][x - 1],
              board[y - 1][x + 1],
            ];
            if (
              board[y][x] === "L" &&
              spaces.filter((s) => empties.includes(s)).length === spaces.length
            ) {
              newBoard[y][x] = "#";
            } else if (spaces.filter((s) => s === "#").length >= 4) {
              newBoard[y][x] = "L";
            }
          }
        } else if (x === board[y].length - 1) {
          if (validSpaces.includes(board[y][x])) {
            const spaces = [
              board[y + 1][x],
              board[y - 1][x],
              board[y][x - 1],
              board[y - 1][x - 1],
              board[y + 1][x - 1],
            ];
            if (
              board[y][x] === "L" &&
              spaces.filter((s) => empties.includes(s)).length === spaces.length
            ) {
              newBoard[y][x] = "#";
            } else if (spaces.filter((s) => s === "#").length >= 4) {
              newBoard[y][x] = "L";
            }
          }
        } else {
          if (validSpaces.includes(board[y][x])) {
            const spaces = [
              board[y][x + 1],
              board[y][x - 1],
              board[y + 1][x],
              board[y - 1][x],
              board[y + 1][x - 1],
              board[y + 1][x + 1],
              board[y - 1][x + 1],
              board[y - 1][x - 1],
            ];
            if (
              board[y][x] === "L" &&
              spaces.filter((s) => empties.includes(s)).length === spaces.length
            ) {
              newBoard[y][x] = "#";
            } else if (spaces.filter((s) => s === "#").length >= 4) {
              newBoard[y][x] = "L";
            }
          }
        }
      }
    }
    return newBoard;
  }

  private areBoardsEqual(a: string[][], b: string[][]): boolean {
    for (let y = 0; y < a.length; y++) {
      for (let x = 0; x < a[y].length; x++) {
        if (a[y][x] !== b[y][x]) {
          return false;
        }
      }
    }
    return true;
  }

  partOne(): string {
    const input = this.parseInput();

    let board = clone(input);
    let newBoard = this.loopBoard(board);

    while (!this.areBoardsEqual(board, newBoard)) {
      board = clone(newBoard);
      newBoard = this.loopBoard(board);
    }

    const numOfChairs = newBoard.reduce((p, v) => {
      const rowCount = v.reduce((p, v) => {
        return v === "#" ? p + 1 : p;
      }, 0);
      return p + rowCount;
    }, 0);
    return `${numOfChairs}`;
  }
  partTwo(): string {
    const input = this.parseInput();

    let board = clone(input);
    let newBoard = this.loopBoardPartTwo(board);

    while (!this.areBoardsEqual(board, newBoard)) {
      board = clone(newBoard);
      newBoard = this.loopBoardPartTwo(board);
    }

    const numOfChairs = newBoard.reduce((p, v) => {
      const rowCount = v.reduce((p, v) => {
        return v === "#" ? p + 1 : p;
      }, 0);
      return p + rowCount;
    }, 0);
    return `${numOfChairs}`;
  }
}

export default Day11;
