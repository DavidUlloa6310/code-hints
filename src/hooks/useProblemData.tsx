import { ProblemSchema } from "@/schemas/problemSchema";
import React, { ReactNode, useContext, useState } from "react";

interface ProblemDataProviderValues {
  problemData: ProblemSchema | null;
  setProblemData: React.Dispatch<
    React.SetStateAction<ProblemSchema | null>
  > | null;
}

const ProblemDataContext = React.createContext<ProblemDataProviderValues>({
  problemData: null,
  setProblemData: null,
});

export function useProblemDataContext() {
  return useContext(ProblemDataContext);
}

function ProblemDataProvider({ children }: { children: ReactNode }) {
  const [problemData, setProblemData] = useState<ProblemSchema | null>(null);

  return (
    <ProblemDataContext.Provider
      value={{ problemData: problemData, setProblemData: setProblemData }}
    >
      {children}
    </ProblemDataContext.Provider>
  );
}

export default ProblemDataProvider;
