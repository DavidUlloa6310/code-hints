/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { getProblemById } from "@/server/utils/leetcode";

interface RequestBdoy {
  problemId: number;
  language: string;
  code: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOLUTION_RUNNER_SCRIPT = path.join(__dirname, "solution_runner.py");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let problemId: RequestBdoy["problemId"],
    language: RequestBdoy["language"],
    userCode: RequestBdoy["code"];

  const supportedLanguages = ["python3", "python"];

  try {
    if (typeof req.body == "string") {
      ({
        problemId,
        language,
        code: userCode,
      } = JSON.parse(req.body) as RequestBdoy);
    } else {
      ({ problemId, language, code: userCode } = req.body as RequestBdoy);
    }
  } catch {
    return res.status(400).end();
  }

  // if the request did not include the problemId, language or code
  const requiredParams = [problemId, language, userCode];
  for (const param of requiredParams) {
    if (param === null || param === undefined) {
      return res.status(400).end();
    }
  }

  // if the language from the request is not supported
  if (!supportedLanguages.includes(language.toLowerCase())) {
    return res
      .status(400)
      .send(
        `"${language}" is not a supported language at this moment!\nValid languages: ${supportedLanguages.join(
          ", ",
        )}`,
      );
  }

  // fetch the problem to pass to the execution script
  const problem = await getProblemById(String(problemId));
  if (problem == null) {
    return res
      .status(404)
      .json({ message: "Could not find problem by passed in id" });
  }

  let solutionRunner: Buffer;

  const encoded_problem = btoa(JSON.stringify(problem));
  const encoded_user_code = btoa(userCode);

  try {
    // execute the python file that checks the user solution
    solutionRunner = execSync(
      `python3 ${SOLUTION_RUNNER_SCRIPT} ${encoded_problem} ${encoded_user_code}`,
    );
  } catch (e) {
    let message = e.toString("utf8") as string;
    message = message.replace(encoded_problem, "");
    message = message.replace(encoded_user_code, "");

    return res.status(200).json({ error: message });
  }
  // capture the output from the solutions script
  const solution = JSON.parse(solutionRunner.toString("utf8")) as Record<
    string,
    string
  >;

  return res.status(200).json({ solution });
}
