import React, { useState } from "react";
import { useRouter } from "next/router";
import ProblemDescription from "@/components/ProblemDescription";
import ProblemDataProvider from "@/hooks/useProblemData";
import TextEditor from "@/components/TextEditor";
import { ChatBox } from "@/components/ChatBox";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import { UserDataProvider } from "@/hooks/useUserData";

function Solve() {
  const [isChatVisible, setIsChatVisible] = useState<boolean>(true);
  const router = useRouter();
  const { problemId } = router.query;

  return (
    <ProblemDataProvider>
      <UserDataProvider>
        {isChatVisible && (
          <ChatBox
            setIsVisible={setIsChatVisible}
            problemId={problemId as string}
            userCode=""
            userCodeOutput=""
          />
        )}

        <main className="relative grid grid-cols-12">
          <ProblemDescription />
          <TextEditor setChatVisible={setIsChatVisible} />
          <Footer />
        </main>
      </UserDataProvider>
    </ProblemDataProvider>
  );
}

export default Solve;
