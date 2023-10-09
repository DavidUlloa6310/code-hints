import { useState, type SetStateAction, type Dispatch } from "react";
import Image from "next/image";
import { useProblemDataContext } from "@/hooks/useProblemData";
import { useUserDataContext } from "@/hooks/useUserData";
import { useEffect } from "react";
import TestCases from "@/components/TestCases";

interface ControlsProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

export default function Controls({
  showResults,
  setShowResults,
}: ControlsProps) {
  const [showTags, setShowTags] = useState(false);
  const { currentProblem } = useProblemDataContext()!;
  const { userCode, codeOutput, setCodeOutput } = useUserDataContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitCode() {
    setIsSubmitting(true);
    const request = await fetch("/api/code/submit", {
      method: "POST",
      body: JSON.stringify({
        problemId: currentProblem?.frontendQuestionId,
        language: "python3",
        code: userCode,
      }),
    });

    if (request.ok) {
      const response = (await request.json()) as typeof codeOutput;
      setCodeOutput(response);
    }

    setIsSubmitting(false);
    setShowResults(true);
  }

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
              {currentProblem?.topicTags.map(({ name }) => (
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
        <TestCases />
        <button
          className="whitespace-nowrap rounded-xl border-4 border-lightGrayText bg-darkGray px-8 py-2 font-titan active:bg-lightGrayText active:text-darkGray"
          type="button"
        >
          Test Cases
        </button>
        <button
          className="act whitespace-nowrap rounded-xl border-4 border-yellowAlert px-8 py-2 font-titan text-yellowAlert active:border-yellow-500 active:text-yellow-500"
          type="button"
          onClick={submitCode}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
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
            width={18}
            className={`mr-4 ${
              showResults ? "rotate-180" : ""
            } transition-all duration-1000 ease-in-out`}
            height={18}
          />
        </button>
      </div>
    </div>
  );
}
