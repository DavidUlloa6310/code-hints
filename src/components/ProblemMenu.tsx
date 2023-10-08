/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  allProblemsValidation,
  type ProblemSchema,
} from "@/schemas/problemSchema";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProblemDataContext } from "@/hooks/useProblemData";
import { useUserDataContext } from "@/hooks/useUserData";

function ProblemMenu(): JSX.Element {
  const [problems, setProblems] = useState<ProblemSchema[]>([]);
  const { setProblemData } = useProblemDataContext();
  const { setUserCode } = useUserDataContext();

  const difficulty_to_color = {
    Easy: "lightGreen",
    Medium: "yellowAlert",
    Hard: "[#DE2A2A]",
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("/api/problems/");
        const data: unknown[] = await response.json();
        const validatedProblems = allProblemsValidation.parse(data);
        setProblems(validatedProblems.data);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchProblems();
  }, []);

  if (problems === null) {
    <div />;
  }

  return (
    <div className="mb-5 flex h-[50vh] flex-wrap overflow-y-scroll">
      {problems.map((problem) => (
        <Link
          key={problem.frontendQuestionId}
          href={`/solve/${problem.frontendQuestionId}/`}
          onClick={() => {
            setUserCode(
              problem.starterCodes.find(
                (starterCodes) => starterCodes.lang === "Python3",
              )?.code!,
            );
            setProblemData!(problem);
          }}
        >
          <li
            className={`text-1xl list-none border-2 ${
              problem.difficulty.toLowerCase() == "hard"
                ? "border-[#DE2A2A]"
                : problem.difficulty.toLowerCase() == "medium"
                ? "border-yellowAlert"
                : "border-lightGreen"
            }  m-2 cursor-pointer rounded-md p-1 px-2 font-roboto font-bold text-nonWhite underline hover:text-white`}
          >
            {`#${(Number(problem.frontendQuestionId) + 1).toString()} - ${problem.title}`}
          </li>
        </Link>
      ))}
    </div>
  );
}

export default ProblemMenu;
