import Day from "./day.ts";

interface Day10Input {
  adapters: number[];
  builtInJoltage: number;
}

// deno-lint-ignore no-explicit-any
function defaultDict(createValue: any) {
  return new Proxy(Object.create(null), {
    get(storage, property) {
      if (!(property in storage)) {
        storage[property] = createValue(property);
      }
      return storage[property];
    },
  });
}

class Day10 extends Day {
  private parseInput(): Day10Input {
    const adapters = this.input.split("\n").map((s) => parseInt(s)).sort((
      a,
      b,
    ) => a - b);
    const maxJoltage = adapters.reduce((p, v) => v > p ? v : p, 0);
    return { adapters, builtInJoltage: maxJoltage + 3 };
  }
  partOne(): string {
    const input = this.parseInput();
    const adapters = [...input.adapters];
    let currentJoltage = 0;
    let oneDifferences = 0;
    let threeDifferences = 0;
    while (currentJoltage < input.builtInJoltage - 3) {
      const oneDiff = adapters.find((s) => s === currentJoltage + 1);
      const threeDiff = adapters.find((s) => s === currentJoltage + 3);
      if (oneDiff !== undefined) {
        currentJoltage = oneDiff;
        oneDifferences++;
      } else if (threeDiff !== undefined) {
        currentJoltage = threeDiff;
        threeDifferences++;
      }
    }
    threeDifferences++;
    return `${oneDifferences * threeDifferences}`;
  }
  partTwo(): string {
    const input = this.parseInput();
    const adapters = [...input.adapters];
    const res = defaultDict(() => 0);
    res[0] = 1;
    let current = adapters[0];
    for (const adapter of adapters) {
      res[adapter] = res[adapter - 3] + res[adapter - 2] +
        res[adapter - 1];
      current = adapter;
    }
    return `${res[current]}`;
  }
}

export default Day10;
