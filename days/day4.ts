import Day from "./day.ts";

interface YearFieldMatcher {
  min: number;
  max: number;
}

interface YearFieldMatchers {
  [key: string]: YearFieldMatcher;
}

class Day4 extends Day {
  private expectedFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    "cid",
  ];

  private yearFieldMatchers: YearFieldMatchers = {
    byr: { min: 1920, max: 2002 },
    iyr: { min: 2010, max: 2020 },
    eyr: { min: 2020, max: 2030 },
  };

  private heightMatcher: YearFieldMatchers = {
    cm: { min: 150, max: 193 },
    in: { min: 59, max: 76 },
  };

  private eyeColorMatcher = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  private hairColorMatcher = /^#([0-9a-f]{6})$/;
  private passportNumberMatcher = /^(\d{9})$/;

  private parseInput() {
    return this.input.split("\n\n")
      .map((s) => s.split("\n").flatMap((v) => v.split(" ")))
      .map((s) => s.map((v) => v.split(":")))
      .map((s) => Object.fromEntries(s));
  }
  partOne(): string {
    const entries = this.parseInput()
      .filter((e) => {
        const keys = Object.keys(e);
        const missingKeys = this.expectedFields.filter((k) =>
          !keys.includes(k)
        );
        if (missingKeys.length > 1) return false;
        if (missingKeys.length === 0) return true;
        if (missingKeys[0] === "cid") return true;
      });
    return `${entries.length}`;
  }

  private validateYear(key: string, value: number): boolean {
    const bounds = this.yearFieldMatchers[key];
    return value >= bounds.min && value <= bounds.max;
  }

  private validateHgt(value: string): boolean {
    const unit = value.slice(value.length - 2);
    if (unit !== "in" && unit !== "cm") return false;
    const v = parseInt(value.slice(0, value.length - 2));
    const bounds = this.heightMatcher[unit];
    return v >= bounds.min && v <= bounds.max;
  }

  partTwo(): string {
    const passports = this.parseInput().filter((e) => {
      const keys = Object.keys(e);
      const missingKeys = this.expectedFields.filter((k) => !keys.includes(k));
      if (missingKeys.length > 1) return false;
      if (missingKeys.length === 0) return true;
      if (missingKeys[0] === "cid") return true;
    }).filter((e) => {
      const res = Object.keys(e).reduce((p, v) => {
        switch (v) {
          case "byr":
          case "iyr":
          case "eyr":
            return this.validateYear(v, parseInt(e[v])) && p;
          case "hgt":
            return this.validateHgt(e[v]) && p;
          case "hcl":
            return (e[v] as string).match(this.hairColorMatcher) !== null && p;
          case "ecl":
            return this.eyeColorMatcher.includes(e[v]) && p;
          case "pid":
            return (e[v] as string).match(this.passportNumberMatcher) !==
                null && p;
          default:
            break;
        }
        return p;
      }, true);
      return res;
    });
    return `${passports.length}`;
  }
}

export default Day4;
