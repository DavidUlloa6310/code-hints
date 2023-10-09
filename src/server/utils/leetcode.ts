/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type ProblemSchema } from "@/schemas/problemSchema";

export const getProblemById = async (
  problemId: string,
): Promise<ProblemSchema | null> => {
  const filePath = process.env.PROBLEM_PATH as string;
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error("Failed fetching problem_set.json");
  }
  const problemSet: ProblemSchema[] = await response.json();
  const problem = problemSet.find((problem) => {
    return problem.frontendQuestionId === problemId;
  });

  if (problem == null) {
    return null;
  }
  return problem;
};
