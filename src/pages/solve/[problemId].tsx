import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Editor, useMonaco } from "@monaco-editor/react";
import { ProblemSchema } from "@/schemas/problemSchema";

const Solve = () => {
  const [problemData, setProblemData] = useState<ProblemSchema | null>(null);
  const router = useRouter();
  const { problemId } = router.query;

  const monaco = useMonaco();

  function getStarterCode() {
    // DEBUG THIS FUNCTION
    return problemData?.starterCodes.filter(
      (problem) => problem.lang === "Python",
    )[0];
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
      <div className=" col-span-4 h-screen bg-red-500">
        <h1>{problemId}</h1>
      </div>
      <div className=" relative col-span-8 col-start-5 h-screen bg-blue-500">
        <Editor
          className="absolute left-0 top-0 h-full w-full"
          defaultLanguage="python"
          defaultValue={getStarterCode()}
        />
      </div>
    </main>
  );
};

export default Solve;
