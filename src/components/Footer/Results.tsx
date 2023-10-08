import { useProblemDataContext } from "@/hooks/useProblemData";
import { useUserDataContext } from "@/hooks/useUserData";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";

interface ResultsProps {
  showResults: boolean;
}

interface OutputText {
  children: ReactNode;
  passed: boolean;
}

function OutputText({ children, passed }: OutputText) {
  return (
    <p
      className={`my-1 h-10 w-52 rounded-md border ${
        passed ? "border-white" : "border-red border-opacity-40"
      } bg-white bg-opacity-30 py-2 text-center text-nonWhite`}
    >
      {children}
    </p>
  );
}

export default function Results({ showResults }: ResultsProps) {
  const { codeOutput, setCodeOutput } = useUserDataContext();
  const { problemData } = useProblemDataContext();

  useEffect(() => {
    setCodeOutput(null);
  }, [problemData]);

  return (
    <div
      className={`${
        showResults ? "h-full" : "h-0"
      } overflow-hidden transition-[height] duration-500 ease-in-out`}
    >
      {codeOutput ? (
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-center gap-3">
            <BsFillCircleFill
              className={`${
                codeOutput.solution?.passedAllCases
                  ? "text-green-500"
                  : "text-red"
              } mt-2 text-2xl`}
            />
            {codeOutput.solution?.passedAllCases ? (
              <div className="">
                <h1 className="text-4xl text-green-500">Success</h1>
                <h4 className="w-80">All test cases passed!</h4>
              </div>
            ) : (
              <div>
                <h1 className="text-4xl text-red">Failure</h1>
                <h4 className="w-80 rounded-md border border-white border-opacity-50 bg-white bg-opacity-20 px-5 py-1 font-thin">
                  {codeOutput.error}
                </h4>
              </div>
            )}
          </div>
          <div>
            {codeOutput.solution?.outputs.map(
              ({ testCase, output, passed }) => (
                <div
                  className="flex w-[32rem] items-center justify-between"
                  key={testCase}
                >
                  <OutputText passed>{testCase}</OutputText>
                  <HiArrowLongRight className="text-5xl" />
                  <OutputText passed>{output}</OutputText>
                  <BsFillCircleFill
                    className={`${passed ? "text-green-500" : "text-red"}`}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        <h3 className="text-center">You must run Your code first</h3>
      )}
    </div>
  );
}
