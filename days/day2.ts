import Day from "./day.ts";

interface PasswordEntry {
  password: string;
  lowerBound: number;
  upperBound: number;
  character: string;
}

class Day2 extends Day {
  private parseInput(): PasswordEntry[] {
    return this.input.split("\n")
      .map((p) => {
        const splitPass = p.split(" ");
        const pwdChar = splitPass[1];
        const password = splitPass[2];
        const bounds = splitPass[0].split("-");
        return {
          password,
          lowerBound: parseInt(bounds[0]),
          upperBound: parseInt(bounds[1]),
          character: pwdChar.slice(0, pwdChar.length - 1),
        };
      });
  }

  partOne(): string {
    const passwords: PasswordEntry[] = this.parseInput().filter((entry) => {
      const characterCount = entry.password.split("").filter((s) => {
        return s === entry.character;
      }).length;
      return characterCount >= entry.lowerBound &&
        characterCount <= entry.upperBound;
    });
    return `${passwords.length}`;
  }
  partTwo(): string {
    const passwords: PasswordEntry[] = this.parseInput().filter((entry) => {
      const charAtLower = entry.password.charAt(entry.lowerBound - 1);
      const charAtUpper = entry.password.charAt(entry.upperBound - 1);
      return (charAtLower === entry.character &&
        charAtUpper !== entry.character) ||
        (charAtLower !== entry.character && charAtUpper === entry.character);
    });
    return `${passwords.length}`;
  }
}

export default Day2;
