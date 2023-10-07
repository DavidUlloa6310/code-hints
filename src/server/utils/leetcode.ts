/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import getConfig from "next/config";
import fs from "fs";
import type { ProblemSchema } from "@/schemas/problemSchema";

const { publicRuntimeConfig } = getConfig();
let json: ProblemSchema[];

export const getLeetcodeProblemFromId = (problemId: string) => {
  const filePath = publicRuntimeConfig.problemSetPath;
  const data: string = fs.readFileSync(`public${filePath}`).toString();
  if (json == null) {
    json = JSON.parse(data);
  }

  const problem: ProblemSchema | undefined = json.filter(
    (problem: ProblemSchema) => problem.frontendQuestionId == problemId,
  )[0];

  if (problem == undefined) {
    throw new Error(`Problem ${problemId} not found`);
  }

  return problem;
};
