import { readFile } from "fs/promises";
import * as path from "path";

const main = async (filename: string): Promise<void> => {
  const input = (
    await readFile(path.resolve("src", "d03", filename), "utf-8")
  ).split("\n");

  const compartments = input.map((line) => {
    const half = line.length / 2;
    return [line.slice(0, half), line.slice(half)];
  });

  const leftCompartments = compartments.reduce((prev, curr) => {
    return [...prev, curr[0]];
  }, []);

  const dupes = leftCompartments.map((comp, idx) => {
    const dupe = comp.split("").reduce<string | null>((prev, curr) => {
      const rightCompartment = compartments[idx][1];
      if (prev !== null) {
        return prev;
      }
      if (rightCompartment.includes(curr)) {
        return curr;
      }
      return null;
    }, null);
    if (dupe === null) throw new Error("oops");
    return dupe;
  });

  const dupesAsValues = dupes.map((d) =>
    d.charCodeAt(0) - 96 < 0 ? d.charCodeAt(0) - 38 : d.charCodeAt(0) - 96
  );

  const sumOfPriorities = dupesAsValues.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  // console.log(compartments);
  // console.log(leftCompartments);
  // console.log(dupes);
  // console.log(dupesAsValues);
  console.log(filename, sumOfPriorities);
};

main("example.txt");
main("input.txt");
