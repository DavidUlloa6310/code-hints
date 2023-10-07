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
  if (!(problemId && language && userCode)) {
    return res.status(400).end();
    // if the language from the request is not supported
  } else if (!supportedLanguages.includes(language.toLowerCase())) {
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

  // execute the python file that checks the user solution
  const solutionRunner = execSync(
    `python3 ${SOLUTION_RUNNER_SCRIPT} ${btoa(problem)} ${userCode}`,
  );

  // capture the output from the solutions script
  const solutionRunnerOutput = JSON.parse(
    solutionRunner.toString("utf8"),
  ) as Record<string, string>;

  return res.status(200).json({ problemId, language, ...solutionRunnerOutput });
}
