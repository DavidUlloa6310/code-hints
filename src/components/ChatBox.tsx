import { useState } from "react";
import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import Draggable from "react-draggable";
import SuggestionChips from "./SuggestionChips";
import MermaidGraph from "./MermaidGraph";

interface ChatBoxProps {
  problemId: string;
  userCode: string;
  userCodeOutput: string;
  setIsVisible: (isVisible: boolean) => void;
}

export function ChatBox({
  problemId,
  userCode,
  userCodeOutput,
  setIsVisible,
}: ChatBoxProps) {
  const { chat, sendChat, isLoading } = useChat({
    problemId,
    userCode,
    userCodeOutput,
  });
  const [message, setMessage] = useState("");

  const handleSend = () => {
    setMessage("");
    void sendChat(message);
  };

  return (
    <Draggable>
      <div className="absolute z-10 flex min-h-[350px] min-w-[500px] flex-col-reverse rounded-md bg-darkBlue p-4 shadow-lg">
        {/* Action buttons */}
        <div className="absolute right-2 top-2 flex flex-row-reverse">
          <div
            onClick={() => setIsVisible(false)}
            className="m-1 h-4 w-4 rounded-full bg-rose-700 active:bg-rose-900"
          ></div>
          <div
            onClick={() => setIsVisible(false)}
            className="m-1 h-4 w-4 rounded-full bg-yellow-400 active:bg-yellow-600"
          ></div>
        </div>

        <div className="m-2">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`rounded-md ${
                msg.agent === "human" ? "bg-blue" : "bg-gray-400"
              }`}
            >
              {msg.format === "mermaid" ? (
                <MermaidGraph graph={msg.content} />
              ) : (
                <span>{msg.content}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col place-items-end">
          <SuggestionChips />
          <div className="relative flex w-full flex-row">
            <input
              type="text"
              className="txt-black relative z-40 flex-grow self-end overflow-x-scroll rounded-xl bg-slate-200 p-2"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className="absolute bottom-0 right-0 z-40 ml-2 h-min overflow-hidden rounded-xl p-2"
              onClick={handleSend}
              disabled={isLoading}
            >
              <Image
                src="/images/send.svg"
                className="overflow-hidden fill-slate-500"
                alt="Send"
                width={25}
                height={25}
              />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
