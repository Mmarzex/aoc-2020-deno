# Advent of Code Deno Starter

A Starter Project that can be used for Advent of Code. The project provides,
1. Auto Download of puzzle input when a day is run for the first time
2. Script for generating a file per day and a test file per day
3. Script for running single, multiple, and all days

## Prerequisites
1. Other than having Deno installed, you need to have [Velociraptor](https://deno.land/x/velociraptor) installed if you want to use the provided helper scripts.
2. You also need to place a file called `aoc_cookie` in the root of this project. It should contains the contents of your Advent of Code Session cookie. It is valid for at least a month so you should be good for the duration of the event.
3. Under `days/day.ts` make sure the year constant is set to the year you are currently working on.

**Note:** You do not need Velociraptor to use this, it is just to provide more conveniently written commands. The straight Deno cli commands are provided below as well.

## Getting Started

```
git clone https://github.com/Mmarzex/advent-of-code-deno-starter
cd advent-of-code-deno-starter
rm -rf .git
git init && git add . && git commit -m "initial"
```

## Provided Scripts

### Generate Day

Velociraptor:
```
vr run generate --day <DAY_NUMBER>
```

Deno:
```
deno run --allow-read --allow-write --allow-net --unstable generateDay.ts --day <DAY_NUMBER>
```

### Run Specific Day

Velociraptor:
```
vr run day --day <DAY_NUMBER>
```

Deno:
```
deno run --allow-read --allow-write --allow-net --unstable index.ts --day <DAY_NUMBER>
```

### Run All Days

Velociraptor:
```
vr run all
```

Deno:
```
deno run --allow-read --allow-write --allow-net --unstable index.ts --run-all
```

### Run Tests

Velociratpor:
```
vr run test
```

Deno:
```
deno test --unstable days/
```
