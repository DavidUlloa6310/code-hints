/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type ProblemSchema } from "@/schemas/problemSchema";
import path from "path";
import fs from "fs";

export const getProblemById = (problemId: string): ProblemSchema | null => {
  const filePath = path.join(process.cwd(), "problem_set.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const problemSet: ProblemSchema[] = JSON.parse(fileContent);
  const problem = problemSet.find((problem) => {
    return problem.frontendQuestionId === problemId;
  });

  if (problem == null) {
    return null;
  }
  return problem;
};
