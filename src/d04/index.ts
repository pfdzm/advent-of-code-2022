import { readFile } from "fs/promises";
import * as path from "path";

const main = async (filename: string): Promise<void> => {
  const input = (
    await readFile(path.resolve("src", "d04", filename), "utf-8")
  ).split("\n");

  const pairs = input.map((line) => line.split(","));

  // console.log(input);
  // console.log(pairs);

  const overlaps = pairs.reduce((prev, [left, right]) => {
    const [leftL, leftR] = left.split("-").map(Number);
    const [rightL, rightR] = right.split("-").map(Number);

    if (
      (leftL <= rightL && leftR >= rightR) ||
      (leftL >= rightL && leftR <= rightR)
    ) {
      return prev + 1;
    }
    return prev;
  }, 0);

  console.log(overlaps)
};

main("example.txt");
main("input.txt");
