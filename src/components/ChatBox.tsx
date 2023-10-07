import { useState } from "react";
import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import Draggable from "react-draggable";
import SuggestionChips from "./SuggestionChips";
import MermaidGraph from "./MermaidGraph";
import type { AgentMessage } from "@/schemas/chatSchemas";
// import { useEffect } from "react";
import dynamic from "next/dynamic";
// import mermaid from "mermaid";

interface ChatBoxProps {
  problemId: string;
  userCode: string;
  userCodeOutput: string;
  setIsVisible: (isVisible: boolean) => void;
}

const testGraph = `
      graph TD
      Start --> Check_Sign
      Check_Sign --> |Positive| Calculate_Integer_Part
      Check_Sign --> |Negative| Add_Negative_Sign
      Calculate_Integer_Part --> Calculate_Remainder
      Calculate_Remainder --> |Remainder=0| Construct_Result
      Calculate_Remainder --> |Remainder>0| Initialize_Variables
      Initialize_Variables --> Calculate_Next_Digit
      Calculate_Next_Digit --> Update_Fractional_Part
      Update_Fractional_Part --> Calculate_Remainder
      Construct_Result --> Add_Repeating_Parentheses
      Add_Negative_Sign --> Calculate_Integer_Part
      Add_Repeating_Parentheses --> Return_Result
      Calculate_Integer_Part --> Return_Result
      `;

const ChatBubble = ({
  content,
  agent,
  format,
  isLoading,
}: AgentMessage & { isLoading: boolean }) => (
  <div className={`my-2 flex ${agent === "human" ? "justify-end" : ""}`}>
    {isLoading ? (
      <div className="flex h-32 max-w-[75%] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-300"></div>
      </div>
    ) : (
      <div
        className={`"items-bottom flex gap-2 ${
          agent === "human"
        }?"flex-row-reverse":flex-row`}
      >
        <Image
          src={`/images/${agent === "human" ? "person_icon" : "ai_icon"}.svg`}
          width={40}
          height={40}
          alt="Icon"
        />
        <div
          className={`rounded-md border-2 p-3 shadow-md ${
            agent === "human"
              ? "border-yellow-500 bg-blue-500 text-white"
              : "border-gray-400 bg-gray-300 text-black shadow-md"
          }`}
        >
          {format === "mermaid" ? (
            <p>Mermaid</p>
          ) : (
            // <MermaidGraph graph={content} />
            <span>{content}</span>
          )}
        </div>
      </div>
    )}
  </div>
);

export function ChatBox({
  problemId,
  userCode,
  userCodeOutput,
  setIsVisible,
}: ChatBoxProps) {
  const DynamicMermaidGraph = dynamic(
    () => import("../components/MermaidGraph"),
    {
      ssr: false, // Disable server-side rendering for this component
    },
  );

  const { chat, sendChat, isLoading } = useChat({
    problemId,
    userCode,
    userCodeOutput,
  });
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   mermaid.initialize({ startOnLoad: true });

  //   mermaid.setParseErrorHandler((err, hash) => {
  //     console.log(err);
  //     console.log(hash);
  //   });
  // }, []);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = message.trim();
    setMessage("");
    await sendChat(msg);
  };

  return (
    <Draggable handle=".handle">
      <div className="absolute z-10 flex min-h-[350px] min-w-[500px] max-w-[500] flex-col rounded-md bg-darkBlue p-4 shadow-lg">
        <div className="handle m-0 flex flex-row-reverse justify-between">
          <div className="flex">
            <div
              onClick={() => setIsVisible(false)}
              className="m-1 h-4 w-4 rounded-full bg-rose-700 active:bg-rose-900"
            ></div>
            <div
              onClick={() => setIsVisible(false)}
              className="m-1 h-4 w-4 rounded-full bg-yellow-400 active:bg-yellow-600"
            ></div>
          </div>

          <div className="justify-left mb-1 flex items-center gap-2">
            <h1 className="font-titan text-2xl text-lightGreen">Chat</h1>
            <Image
              src="/images/chat.svg"
              height={18}
              width={18}
              alt="Chat Feature"
            ></Image>
          </div>
        </div>
        <div className="h-1 w-full rounded-full bg-slate-200"></div>

        {/* Action buttons */}

        <div className="my-3 flex-grow overflow-y-auto">
          {chat.map((msg, i) => (
            <ChatBubble key={i} {...msg} isLoading={false} />
          ))}

          {isLoading && (
            <ChatBubble
              content="Loading..."
              agent="bot"
              format="text"
              isLoading={true}
            />
          )}

          <DynamicMermaidGraph graph={testGraph} />

          {isLoading && (
            <div className="flex justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col place-items-end">
          <SuggestionChips />
          <form onSubmit={handleSend} className="relative flex w-full flex-row">
            <input
              type="text"
              className="txt-black flex-grow overflow-x-scroll rounded-xl bg-slate-200 p-2"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              type="submit"
              className="ml-2 h-min overflow-hidden rounded-xl bg-slate-500 p-2 text-white hover:bg-slate-600 focus:outline-none active:bg-slate-700"
              disabled={isLoading}
            >
              <Image
                src="/images/send.svg"
                className="fill-white"
                alt="Send"
                width={25}
                height={25}
              />
            </button>
          </form>
        </div>
      </div>
    </Draggable>
  );
}
