import { useEffect } from "react";
import { useUserDataContext } from "@/hooks/useUserData";

import { useMonaco } from "@monaco-editor/react";
import { NavBar } from "@/components/NavBar";
import { Editor } from "@monaco-editor/react";
import { useProblemDataContext } from "@/hooks/useProblemData";
import type { ProblemSchema } from "@/schemas/problemSchema";

function getStarterCode(problemData: ProblemSchema | null): string {
  if (problemData == null) {
    return "";
  }

  for (const starterCode of problemData.starterCodes) {
    if (starterCode.lang.toLowerCase() === "python3") {
      return starterCode.code;
    }
  }
  return "";
}

function TextEditor({
  setChatVisible,
  isChatVisible,
}: {
  setChatVisible: (visible: boolean) => void;
  isChatVisible: boolean;
}) {
  const { currentProblem } = useProblemDataContext()!;
  const { userCode, setUserCode } = useUserDataContext();
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

  return currentProblem !== null ? (
    <div className="relative flex h-full w-full flex-col bg-darkBlue">
      <NavBar setChatVisible={setChatVisible} isChatVisible={isChatVisible} />
      <div className="h-14 justify-center bg-grayBlue"></div>
      <div className="h-[11*1rem] flex-grow overflow-auto">
        <Editor
          onChange={(value, event) => {
            console.log("User code", value);
            setUserCode(value ?? "");
          }}
          value={userCode}
          theme="CodeHintsTheme"
          className="h-full w-full"
          defaultLanguage="python"
          defaultValue={getStarterCode(currentProblem)}
        />
      </div>
    </div>
  ) : null;
}

export default TextEditor;
