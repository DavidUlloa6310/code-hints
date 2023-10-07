import { useState } from "react";
import Image from "next/image";
import { useProblemDataContext } from "@/hooks/useProblemData";
import { useUserDataContext } from "@/hooks/useUserData";

export default function Footer() {
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
      const response = (await request.json()) as string;
      setCodeOutput("");
    }

    console.log(response);
  }

  return (
    <div className="absolute bottom-0 col-span-7 col-start-6 flex w-full items-center justify-between bg-darkBlue px-6 py-3 font-bold text-nonWhite">
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
            <div className="flex items-center justify-start gap-4 text-sm">
              {problemData?.topicTags.map(({ name }) => (
                <h2 key={name}>{name}</h2>
              ))}
            </div>
          </>
        ) : (
          <button
            type="button"
            className="items-centerr flex justify-center gap-3"
            onClick={() => setShowTags(true)}
          >
            <Image
              src="/images/Hidden Eye Icon.svg"
              alt="Show tags"
              width={40}
              height={40}
            />{" "}
            <h3 className="mt-2 font-titan">Problem Type</h3>
          </button>
        )}
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          className="whitespace-nowrap rounded-xl border-lightGrayText bg-lightGrayText px-8 py-2 font-titan"
          type="button"
        >
          Test Cases
        </button>
        <button
          className="rounded-xl border-4 border-yellowAlert px-10 py-1 text-lg text-yellowAlert"
          type="button"
          onClick={submitCode}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
