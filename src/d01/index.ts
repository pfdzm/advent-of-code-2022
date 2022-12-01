import { readFile } from "fs/promises";
import path from "path";

const example = async (filename: string) => {
  console.log(filename);
  const input = await readFile(path.resolve("src", "d01", filename), {
    encoding: "utf-8",
  });

  const lines = input.split("\n");
  const result = lines.reduce<(number | null)[]>((prev, curr) => {
    if (curr === "") {
      return [...prev, null];
    }
    if (prev[prev.length - 1] === null) {
      return [...prev.slice(0, -1), Number(curr)];
    }
    return [
      ...prev.slice(0, -1),
      Number(prev[prev.length - 1] ?? 0) + Number(curr),
    ];
  }, []);

  const largest = result.filter(Boolean).reduce((prev, curr) => {
    if (curr === null || prev === null) {
      throw new Error("Unexpected null");
    }
    return Math.max(prev, curr);
  }, 0);

  const threeLargest = result
    .filter(Boolean)
    .sort((a, b) => (a ?? 0) - (b ?? 0))
    .slice(-3)
    .reduce((prev, curr) => {
      if (curr === null || prev === null) {
        throw new Error("Unexpected null");
      }
      return prev + curr;
    }, 0);

  console.log(largest);
  console.log(threeLargest);
};

await example("example.txt");
console.log();
await example("input.txt");
