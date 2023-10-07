/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from "react";
import { useProblemDataContext } from "@/hooks/useProblemData";
import LogoHeader from "./LogoHeader";
import { problemValidation } from "@/schemas/problemSchema";
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
  const { problemData, setProblemData } = useProblemDataContext()!;
  const router = useRouter();
  const { problemId } = router.query;

  const difficultyColor: Record<string, string> = {
    Easy: "text-lightGreen",
    Medium: "text-yellowAlert",
    Hard: "text-red",
  };

  useEffect(() => {
    async function fetchData() {
      if (problemId == null) {
        return;
      }

      try {
        const response = await fetch(`/api/problems/${problemId as string}`);
        const data: unknown = await response.json();
        const problemData = problemValidation.safeParse(data);
        if (problemData.success) {
          setProblemData!(problemData.data);
        } else {
          console.error("Error parsing problem data:", problemData.error);
        }
      } catch (error: unknown) {
        console.error("Error fetching problem data:", error as Error);
      }
    }
    void fetchData();
  }, [problemId]);

  return (
    <section className="col-span-5 flex h-screen flex-col items-center justify-center bg-babyBlue">
      <LogoHeader />
      <article className="h-[80vh] w-[90%] overflow-y-scroll rounded-md bg-white bg-opacity-90 p-5 shadow-md">
        <header className="relative flex w-full flex-row items-center justify-between">
          <h3 className="font-titan">{`Question #${(
            Number(problemData?.frontendQuestionId) + 1
          )?.toString()}`}</h3>
          <DifficultyLabel
            difficulty={problemData?.difficulty as string}
            color={difficultyColor[problemData?.difficulty!] ?? ""}
          />
        </header>
        <h2 className="mt-4 font-titan text-3xl">{problemData?.title}</h2>
        <hr className="my-3 h-1 w-full rounded bg-gray-300" />
        <ScrapedDescription content={problemData?.content} />
      </article>
    </section>
  );
}

export default ProblemDescription;
