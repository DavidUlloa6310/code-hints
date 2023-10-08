import { useUserDataContext } from "@/hooks/useUserData";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { GoCircle } from "react-icons/go";

interface ResultsProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

export default function Results({ showResults, setShowResults }: ResultsProps) {
  const { codeOutput } = useUserDataContext();

  return (
    <div
      className={`${
        showResults ? "h-full" : "h-0"
      } overflow-hidden transition-all duration-500 ease-in-out`}
    >
      {codeOutput ? (
        <div className="grid grid-cols-3">
          <div className="col-span-1 flex items-start justify-center gap-3">
            <GoCircle
              className={`${
                codeOutput.solution?.passedAllCases
                  ? "text-green-500"
                  : "text-red"
              } mb-2 text-5xl`}
            />
            {codeOutput.solution?.passedAllCases ? (
              <div>
                <h1 className="text-2xl text-green-500">Success</h1>
                <h4 className="">All test cases passed!</h4>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl text-red">Failure</h1>
                <h4>
                  Code failed to compile or test cases didn&apos;t run
                  successfully
                </h4>
              </div>
            )}
          </div>
          <div className="col-span-2">{}</div>
        </div>
      ) : (
        <h3 className="text-center">You must run Your code first</h3>
      )}
    </div>
  );
}
