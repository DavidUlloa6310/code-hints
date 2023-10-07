import { useEffect } from "react";
import { useUserDataContext } from "@/hooks/useUserData";

import { useMonaco } from "@monaco-editor/react";
import { NavBar } from "@/components/NavBar";
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

function TextEditor({
  setChatVisible,
}: {
  setChatVisible: (visible: boolean) => void;
}) {
  const { problemData } = useProblemDataContext()!;
  const { setUserCode } = useUserDataContext();
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco == null) {
      return;
    }

    monaco.editor.defineTheme("CodeHintsTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "#5FCEFA" },
        { token: "string", foreground: "#FED004" },
        {
          token: "identifier",
          foreground: "#B2EF92",
          fontStyle: "bold",
        },
      ],
      colors: {
        "editor.background": "#333D44",
      },
    });

    monaco.editor.setTheme("CodeHintsTheme");
  }, [monaco]);

  return (
    <div className="col-span-7 col-start-6 h-[88vh] bg-blue-500">
      <NavBar setChatVisible={setChatVisible} />
      <div className="block flex h-10 justify-center bg-grayBlue"></div>
      <Editor
        onChange={(value, event) => {
          setUserCode(value ?? "");
        }}
        theme="CodeHintsTheme"
        className="absolute left-0 top-0 h-full w-full"
        defaultLanguage="python"
        defaultValue={getStarterCode(problemData!)}
      />
    </div>
  );
}

export default TextEditor;
