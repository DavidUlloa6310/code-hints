/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import getConfig from "next/config";
import fs from "fs";
import type { ProblemSchema } from "@/schemas/problemSchema";

const { publicRuntimeConfig } = getConfig();
let json: ProblemSchema[];

export const getLeetcodeProblems = (): ProblemSchema[] => {
  const filePath = publicRuntimeConfig.problemSetPath;
  const data: string = fs
    .readFileSync(`${process.env.PROBLEM_PATH}${filePath}`)
    .toString();
  if (json == null) {
    json = JSON.parse(data);
  }
  return json;
};

export const getLeetcodeProblemFromId = (problemId: string) => {
  const filePath = publicRuntimeConfig.problemSetPath;
  const data: string = fs
    .readFileSync(`${process.env.PROBLEMS_PATH}${filePath}`)
    .toString();
  if (json == null) {
    json = JSON.parse(data);
  }

  // console.log("problem id is...", problemId);

  const problem: ProblemSchema | undefined = json.find(
    (problem: ProblemSchema) => problem.frontendQuestionId === problemId,
  );

  if (problem == undefined) {
    throw new Error(`Problem ${problemId} not found`);
  }

  return problem;
};
