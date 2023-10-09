import { type ProblemSchema } from "@/schemas/problemSchema";
import React, { type ReactNode, useContext, useState, useEffect } from "react";

interface ProblemDataProviderValues {
  problemData: ProblemSchema[] | null;
  setCurrentProblemById: (problemId: string) => null | undefined;
  currentProblem: ProblemSchema | null;
  setCurrentProblem: React.Dispatch<React.SetStateAction<ProblemSchema | null>>;
}

const ProblemDataContext = React.createContext<ProblemDataProviderValues>({
  problemData: null,
  setCurrentProblemById: () => {
    return null;
  },
  currentProblem: null,
  setCurrentProblem: () => {
    return null;
  },
});

export function useProblemDataContext() {
  return useContext(ProblemDataContext);
}

function ProblemDataProvider({ children }: { children: ReactNode }) {
  const [problemData, setProblemData] = useState<ProblemSchema[] | null>(null);
  const [currentProblem, setCurrentProblem] = useState<ProblemSchema | null>(
    null,
  );

  useEffect(() => {
    async function getProblemData() {
      if (problemData !== null) {
        return;
      }

      const response = await fetch("/problem_set.json");
      const data: unknown = await response.json();
      setProblemData(data as ProblemSchema[]);
    }

    void getProblemData();
  }, [problemData]);

  function setCurrentProblemById(problemId: string) {
    if (problemId == null || problemData == null) {
      return null;
    }

    const problem: ProblemSchema | undefined = problemData.find(
      (problem: ProblemSchema) => {
        if (problem.frontendQuestionId === problemId) {
          return problem;
        }
      },
    );

    if (problem === undefined) {
      return undefined;
    }

    setCurrentProblem(problem);
  }

  return (
    <ProblemDataContext.Provider
      value={{
        problemData,
        setCurrentProblemById,
        currentProblem,
        setCurrentProblem,
      }}
    >
      {children}
    </ProblemDataContext.Provider>
  );
}

export default ProblemDataProvider;
