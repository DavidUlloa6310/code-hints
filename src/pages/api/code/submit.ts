import type { NextApiRequest, NextApiResponse } from "next";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

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

  const supportedLanguages = ["python3"];

  try {
    ({ problemId, language, code: userCode } = req.body as RequestBdoy);
  } catch {
    return res.status(400);
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

  problemId = parseInt(problemId as unknown as string);

  // fetch the problem to pass to the execution script
  const problemReq = await fetch(
    `http://${req.headers.host}/api/problems/${problemId}`,
  );

  const problem = JSON.stringify(await problemReq.json());
  let solutionRunner: Buffer;

  try {
    // execute the python file that checks the user solution
    solutionRunner = execSync(
      `python3 ${SOLUTION_RUNNER_SCRIPT} ${btoa(problem)} ${btoa(userCode)}`,
    );
  } catch (e) {
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    const message = e.toString("utf8") as string;
    return res.status(200).json({ error: message });
  }
  // capture the output from the solutions script
  const solution = JSON.parse(solutionRunner.toString("utf8")) as unknown;

  return res.status(200).json({ solution });
}
