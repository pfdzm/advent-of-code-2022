import { readFile } from "fs/promises";
import * as path from "path";

// 1 = Rock = A
// 2 = Paper = B
// 3 = Scissors = C

const scoreMap: Record<string, number> = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
};

const rps = (p1: "A" | "B" | "C", p2: "X" | "Y" | "Z") => {
  switch (p1) {
    case "A":
      if (p2 === "Z") return 0;
      if (p2 === "X") return 2;
      return 1;
    case "B":
      if (p2 === "X") return 0;
      if (p2 === "Y") return 2;
      return 1;
    case "C":
      if (p2 === "Y") return 0;
      if (p2 === "Z") return 2;
      return 1;
  }
};

const main = async (filename: string): Promise<void> => {
  const input = (
    await readFile(path.resolve("src", "d02", filename), "utf-8")
  ).split("\n");

  const rounds = input.map((round) => {
    const oppInput = round.split(" ")[0];
    if (oppInput !== "A" && oppInput !== "B" && oppInput !== "C") {
      throw new Error("unexpected");
    }
    const opp = scoreMap[oppInput] ?? null;
    const youInput = round.split(" ")[1];
    if (youInput !== "X" && youInput !== "Y" && youInput !== "Z") {
      throw new Error("unexpected");
    }
    const you = scoreMap[youInput] ?? null;

    if (opp === null || you === null) {
      throw new Error("unexpected");
    }

    const winner = rps(oppInput, youInput);
    if (winner === 2) {
      return you + 3;
    }

    if (winner === 1) {
      return winner * you + 6;
    }

    return you;
  });

  const score = rounds.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  console.log(score);
};

await main("example.txt");
await main("input.txt");

// part 2
const rules = {
  A: {
    X: 3, // lose
    Y: 1, // draw
    Z: 2, // win
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
  },
};

const part2 = async (filename: string): Promise<void> => {
  console.log("\npart 2\n");
  const input = (
    await readFile(path.resolve("src", "d02", filename), "utf-8")
  ).split("\n");

  const rounds = input.map((round) => {
    const oppInput = round.split(" ")[0];
    if (oppInput !== "A" && oppInput !== "B" && oppInput !== "C") {
      throw new Error("unexpected");
    }
    const youInput = round.split(" ")[1];
    if (youInput !== "X" && youInput !== "Y" && youInput !== "Z") {
      throw new Error("unexpected");
    }
    const you = rules[oppInput][youInput];
    if (youInput === "X") {
      return you;
    }
    if (youInput === "Y") {
      return you + 3;
    }
    return you + 6;
  });

  const score = rounds.reduce((prev, curr) => prev + curr, 0);
  console.log(score);
};

await part2("example.txt");
await part2("input.txt");
