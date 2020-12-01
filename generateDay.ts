import { parse } from "https://deno.land/std@0.77.0/flags/mod.ts";

const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("./aoc_cookie");

const args = parse(Deno.args);

const generateDay = async (day: number) => {
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  const dayTemplateData = await Deno.readFile(
    `${Deno.cwd()}/templates/day.ts.template`,
  );
  const dayTestTemplateData = await Deno.readFile(
    `${Deno.cwd()}/templates/day.test.ts.template`,
  );
  const dayTemplate = decoder.decode(dayTemplateData)
    .replaceAll("%DAY%", day.toString());
  const dayTestTemplate = decoder.decode(dayTestTemplateData)
    .replaceAll("%DAY%", day.toString());
  const encodedDay = encoder.encode(dayTemplate);
  const encodedDayTest = encoder.encode(dayTestTemplate);
  await Deno.writeFile(
    `${Deno.cwd()}/days/day${day}.ts`,
    encodedDay,
  );
  await Deno.writeFile(
    `${Deno.cwd()}/days/day${day}.test.ts`,
    encodedDayTest,
  );
};

generateDay(args["day"]).then(() => console.log("Generated Day"))
  .catch((e) => console.error(e));
