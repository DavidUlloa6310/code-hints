/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from "react";
import { useProblemDataContext } from "@/hooks/useProblemData";
import LogoHeader from "./LogoHeader";
import { problemValidation, type ProblemSchema } from "@/schemas/problemSchema";
import ScrapedDescription from "./ScrapedDescription";

import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/router";

function DifficultyLabel({ difficulty }: { difficulty: string }) {
  return (
    <div className="flex flex-row items-center justify-center rounded-lg px-2 py-1 shadow-lg">
      <GoDotFill fill="#DE2A2A" />
      <p className="font-roboto text-lg text-red">{difficulty}</p>
    </div>
  );
}

function ProblemDescription() {
  const { problemData, setProblemData } = useProblemDataContext()!;
  const router = useRouter();
  const { problemId } = router.query;

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
    <section className="col-span-5 flex min-h-screen flex-col items-center justify-center bg-babyBlue">
      <LogoHeader />
      <article className="h-full w-[90%] rounded-md bg-white p-5">
        <div className="flex w-full flex-row items-center justify-between">
          <h3 className=" font-titan">{`Question #${problemData?.frontendQuestionId}`}</h3>
          <DifficultyLabel difficulty={problemData?.difficulty as string} />
        </div>
        <h2 className=" font-roboto text-3xl">{problemData?.title}</h2>
        <div className=" my-3 h-1 w-full rounded bg-gray-300" />
        <ScrapedDescription content={problemData?.content} />
      </article>
    </section>
  );
}

export default ProblemDescription;
