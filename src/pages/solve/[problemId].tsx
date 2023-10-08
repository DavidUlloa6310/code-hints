import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProblemDescription from "@/components/ProblemDescription";
import ProblemDataProvider from "@/hooks/useProblemData";
import TextEditor from "@/components/TextEditor";
import { ChatBox } from "@/components/ChatBox";
import Footer from "@/components/Footer";
import { UserDataProvider } from "@/hooks/useUserData";
import Welcome from "@/components/Welcome";

function Solve() {
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const router = useRouter();
  const { problemId } = router.query;

  return (
    <ProblemDataProvider>
      {problemId === "0" && <Welcome />}
      <UserDataProvider>
        {isChatVisible && <ChatBox setIsVisible={setIsChatVisible} />}

        <main className="grid-rows-12 grid h-screen grid-cols-12">
          <div className="col-span-4">
            <ProblemDescription />
          </div>
          <div className="grid-rows-12 col-span-8 grid h-screen">
            <div className="row-span-11 h-full">
              <TextEditor
                setChatVisible={setIsChatVisible}
                isChatVisible={isChatVisible}
              />
            </div>
            <div
              className="relative row-span-1 w-full"
              style={{ marginBottom: -2 }}
            >
              <Footer />
            </div>
          </div>
        </main>
      </UserDataProvider>
    </ProblemDataProvider>
  );
}

export default Solve;
