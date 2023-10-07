import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Editor, useMonaco } from "@monaco-editor/react";
import { ProblemSchema } from "@/schemas/problemSchema";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";

function Solve() {
  const [problemData, setProblemData] = useState<ProblemSchema | null>(null);
  const router = useRouter();
  const { problemId } = router.query;

  const monaco = useMonaco();

  function getStarterCode(): string {
    // DEBUG THIS FUNCTION
    const starterCode: string | undefined = problemData?.starterCodes.filter(
      (problem) => problem?.lang === "Python",
    )[0]?.code;

    if (starterCode == null) {
      return "";
    }
    return starterCode;
  }

  function DifficultyLabel() {
    return (
      <div className="flex flex-row items-center justify-center rounded-lg px-2 py-1 shadow-lg">
        <GoDotFill fill="#DE2A2A" />
        <p className="font-roboto text-lg text-red">
          {problemData?.difficulty}
        </p>
      </div>
    );
  }

  useEffect(() => {
    async function fetchData() {
      if (problemId == null) {
        return;
      }

      try {
        const response = await fetch(`/api/problems/${problemId as string}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: ProblemSchema = await response.json();
        setProblemData(data);
      } catch (error: unknown) {
        console.error("Error fetching problem data:", error);
      }
    }
    void fetchData();
  }, [problemId]);

  return (
    <main className="grid grid-cols-12">
      <div className=" col-span-5 flex min-h-screen flex-col items-center justify-center bg-babyBlue">
        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src="/images/logo.svg"
            height={100}
            width={100}
            alt="CodeHints Logo"
          />
          <div>
            <h1 className=" font-titan text-4xl">CodeHints</h1>
            <p className=" font-roboto text-gray-500">
              Your A.I. Interview Buddy
            </p>
          </div>
        </div>
        <article className="h-full w-[90%] rounded-md bg-white p-5">
          <div className="flex w-full flex-row items-center justify-between">
            <h3 className=" font-titan">{`Question #${problemData?.frontendQuestionId}`}</h3>
            <DifficultyLabel />
          </div>
          <h2 className=" font-roboto text-3xl">{problemData?.title}</h2>
          <div className=" my-3 h-1 w-full rounded bg-gray-300" />
          <div
            className="flex flex-col flex-wrap overflow-auto break-all"
            dangerouslySetInnerHTML={
              problemData?.content != null
                ? { __html: problemData?.content }
                : { __html: "" }
            }
          ></div>
        </article>
      </div>
      <div className=" relative col-span-7 col-start-5 min-h-screen bg-blue-500">
        <Editor
          className="absolute left-0 top-0 h-full w-full"
          defaultLanguage="python"
          defaultValue={getStarterCode()}
        />
      </div>
    </main>
  );
}

export default Solve;
