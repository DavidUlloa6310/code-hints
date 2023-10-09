/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from "react";
import { useProblemDataContext } from "@/hooks/useProblemData";
import LogoHeader from "./LogoHeader";
import ScrapedDescription from "./ScrapedDescription";

import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/router";

interface DifficultyLabel {
  difficulty: string;
  color: string;
}

function DifficultyLabel({ difficulty, color }: DifficultyLabel) {
  return (
    <div className="absolute right-0 flex select-none flex-row items-center justify-center rounded-lg bg-darkBlue px-2 py-1 shadow-lg drop-shadow-lg">
      <GoDotFill className={color} />
      <p className={`pl-2 font-roboto ${color}`}>{difficulty}</p>
    </div>
  );
}

function ProblemDescription() {
  const { currentProblem, setCurrentProblemById } = useProblemDataContext()!;
  const router = useRouter();
  const { problemId } = router.query;

  useEffect(() => {
    if (problemId == null) {
      return;
    }
    setCurrentProblemById(problemId as string);
  }, [problemId, setCurrentProblemById]);

  const difficultyColor: Record<string, string> = {
    Easy: "text-lightGreen",
    Medium: "text-yellowAlert",
    Hard: "text-red",
  };

  return (
    <section className="col-span-5 flex h-screen flex-col items-center justify-center bg-babyBlue">
      <LogoHeader />
      <article className="h-[80vh] w-[90%] overflow-y-scroll rounded-md bg-white bg-opacity-90 p-5 shadow-md">
        <header className="relative flex w-full flex-row items-center justify-between">
          <h3 className="font-titan">{`Question #${(
            Number(currentProblem?.frontendQuestionId) + 1
          )?.toString()}`}</h3>
          <DifficultyLabel
            difficulty={currentProblem?.difficulty as string}
            color={difficultyColor[currentProblem?.difficulty!] ?? ""}
          />
        </header>
        <h2 className="mt-4 font-roboto text-2xl font-bold">
          {currentProblem?.title}
        </h2>
        <hr className="my-3 h-1 w-full rounded bg-gray-300" />
        <ScrapedDescription content={currentProblem?.content} />
      </article>
    </section>
  );
}

export default ProblemDescription;
