import { useState, type SetStateAction, type Dispatch } from "react";
import Image from "next/image";
import { useProblemDataContext } from "@/hooks/useProblemData";
import { useUserDataContext } from "@/hooks/useUserData";
import { useEffect } from "react";

interface ControlsProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

export default function Controls({
  showResults,
  setShowResults,
}: ControlsProps) {
  const [showTags, setShowTags] = useState(false);
  const { problemData } = useProblemDataContext()!;
  const { userCode, codeOutput, setCodeOutput } = useUserDataContext();

  async function submitCode() {
    const request = await fetch("/api/code/submit", {
      method: "POST",
      body: JSON.stringify({
        problemId: problemData?.frontendQuestionId,
        language: "python3",
        code: userCode,
      }),
    });

    if (request.ok) {
      const response = (await request.json()) as typeof codeOutput;
      setCodeOutput(response);
    }
  }

  useEffect(() => {
    console.log("auto updated", codeOutput);
  }, [codeOutput]);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex justify-start overflow-hidden">
        {showTags ? (
          <>
            <Image
              src="/images/eye.svg"
              alt="Show tags"
              width={30}
              className="mr-4"
              height={30}
            />
            <div className="flex items-center justify-start gap-4 pr-10 text-center text-sm">
              {problemData?.topicTags.map(({ name }) => (
                <h2 key={name}>{name}</h2>
              ))}
            </div>
          </>
        ) : (
          <button
            type="button"
            className="flex items-center justify-center gap-3"
            onClick={() => setShowTags(true)}
          >
            <Image
              src="/images/Hidden Eye Icon.svg"
              alt="Show tags"
              width={40}
              height={40}
            />{" "}
            <h3 className="font-titan">Tags</h3>
          </button>
        )}
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          className="whitespace-nowrap rounded-xl border-lightGrayText bg-darkGray px-8 py-2 font-titan"
          type="button"
        >
          Test Cases
        </button>
        <button
          className="flex flex-row items-center justify-around gap-2 rounded-xl border-4 border-yellowAlert py-1 pl-5 pr-3 font-titan text-lg text-yellowAlert"
          type="button"
          onClick={submitCode}
        >
          Submit
          <button
            className="z-10 w-full"
            type="button"
            onClick={() => {
              setShowResults(!showResults);
            }}
          >
            <Image
              src="/images/yellow_arrow.svg"
              alt="Show/Hide results"
              width={20}
              className={`mr-4 ${
                showResults ? "rotate-180" : ""
              } transition-all duration-300 ease-in-out`}
              height={20}
            />
          </button>
        </button>
      </div>
    </div>
  );
}
