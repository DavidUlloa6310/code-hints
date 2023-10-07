import { useContext } from "react";

import { Editor } from "@monaco-editor/react";
import { useProblemDataContext } from "@/hooks/useProblemData";
import { ProblemSchema } from "@/schemas/problemSchema";

function getStarterCode(problemData: ProblemSchema): string {
  const starterCode: string | undefined = problemData?.starterCodes.filter(
    (problem) => problem?.lang === "Python",
  )[0]?.code;

  if (starterCode == null) {
    return "";
  }
  return starterCode;
}

function TextEditor() {
  const { problemData } = useProblemDataContext()!;
  return (
    <div className=" relative col-span-7 col-start-6 min-h-screen bg-blue-500">
      <Editor
        className="absolute left-0 top-0 h-full w-full"
        defaultLanguage="python"
        defaultValue={getStarterCode(problemData!)}
      />
    </div>
  );
}

export default TextEditor;
