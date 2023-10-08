import { useUserDataContext } from "@/hooks/useUserData";
import { useState, Dispatch, SetStateAction } from "react";
import { GoDot } from "react-icons/go";

interface ResultsProps {
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

export default function Results({ showResults, setShowResults }: ResultsProps) {
  const { codeOutput } = useUserDataContext();

  const [allTestCasesPass] = useState<boolean>(() => {
    if (!codeOutput || codeOutput.error || !codeOutput.solution) {
      return false;
    }

    for (const { expected, output } of codeOutput.solution) {
      if (expected !== output) {
        return false;
      }
    }

    return true;
  });

  return (
    <div
      className={`${
        showResults ? "h-full" : "h-0"
      } overflow-hidden transition-all duration-500 ease-in-out`}
    >
      {codeOutput ? (
        <div className="grid grid-cols-3">
          <div>
            <GoDot />
            {allTestCasesPass ? (
              <>
                <h1>Success</h1>
                <h4>All test cases passed!</h4>
              </>
            ) : (
              <>
                <h1>Failure</h1>
                <h4>
                  Code failed to compile or test cases didn&apos;t run
                  successfully
                </h4>
              </>
            )}
          </div>
        </div>
      ) : (
        <h3 className="text-center">You must run Your code first</h3>
      )}
    </div>
  );
}
