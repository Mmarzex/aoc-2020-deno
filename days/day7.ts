import Day from "./day.ts";

interface Bag {
  bag: string;
  contains: BagContents[];
  distinctContains: Set<string>;
}

interface BagContents {
  color: string;
  quantity: number;
}

interface BagLookup {
  [bag: string]: Set<string>;
}

interface BagLookupV2 {
  [bag: string]: BagContents[];
}

class Day7 extends Day {
  private parseBagContents(v: string): BagContents[] {
    if (v.includes("no other bags")) {
      return [];
    }
    return v.replace(".", "").split(",").map((v) => {
      const vv = v.trim();
      const q = vv[0];
      return {
        quantity: parseInt(q),
        color: vv.slice(2).replace("bags", "").replace("bag", "").trim(),
      };
    });
  }
  private parseInput(): Bag[] {
    return this.input.split("\n").map((s) => {
      const x = s.split("contain");
      const contents = this.parseBagContents(x[1]);
      const uniqueBags = new Set(contents.map((v) => v.color));
      return {
        bag: x[0].replace("bags", "").replace("bag", "").trim(),
        contains: contents,
        distinctContains: uniqueBags,
      };
    });
  }

  partOne(): string {
    const input: BagLookup = this.parseInput().map((b) => ({
      bag: b.bag,
      contains: b.distinctContains,
    })).reduce((p: BagLookup, v) => {
      p[v.bag] = v.contains;
      return p;
    }, {});
    const res = this.findBagsThatCanHold("shiny gold", input);
    return `${res}`;
  }

  findBagsThatCanHold(key: string, lookup: BagLookup) {
    let keysToCheck = [key];
    const possibleBags = new Set<string>();
    let emptyFilter = false;
    while (!emptyFilter) {
      const filtered = keysToCheck.flatMap((k) =>
        Object.keys(lookup).filter((s) => lookup[s].has(k))
      );
      if (filtered.length === 0) {
        emptyFilter = true;
      } else {
        keysToCheck = filtered;
        filtered.forEach((s) => possibleBags.add(s));
      }
    }
    return possibleBags.size;
  }

  private bagValues: { [key: string]: number } = {};

  private populateBagValue(key: string, bags: BagLookupV2): number {
    const children = bags[key];
    let acc = 0;
    if (children.length === 0) {
      return acc;
    }

    for (let i = 0; i < children.length; i++) {
      acc += children[i].quantity + (children[i].quantity *
        this.populateBagValue(children[i].color, bags));
    }
    this.bagValues[key] = acc;
    return acc;
  }

  partTwo(): string {
    const input = this.parseInput().reduce((p: BagLookupV2, v) => {
      p[v.bag] = v.contains;
      return p;
    }, {});
    return `${this.populateBagValue("shiny gold", input)}`;
  }
}

export default Day7;
