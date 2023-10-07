import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Editor } from "@monaco-editor/react";
import { ProblemSchema } from "@/schemas/problemSchema";
import { GoDotFill } from "react-icons/go";
import LogoHeader from "@/components/LogoHeader";
import ScrapedDescription from "@/components/ScrapedDescription";
import { ChatBox } from "@/components/ChatBox";
import ProblemDescription from "@/components/ProblemDescription";
import ProblemDataProvider from "@/hooks/useProblemData";
import TextEditor from "@/components/TextEditor";

function Solve() {
  const [problemData, setProblemData] = useState<ProblemSchema | null>(null);
  const router = useRouter();
  const { problemId } = router.query;

  return (
    <ProblemDataProvider>
      <main className="grid grid-cols-12">
        <ProblemDescription />
        <TextEditor />
      </main>
    </ProblemDataProvider>
  );
}

export default Solve;
