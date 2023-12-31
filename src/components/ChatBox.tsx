/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useState } from "react";
import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import Draggable from "react-draggable";
import SuggestionChips from "./SuggestionChips";
// import MermaidGraph from "./MermaidGraph";
import GraphvizGraph from "./GraphvizGraph";
import type { AgentMessage } from "@/schemas/chatSchemas";

interface ChatBoxProps {
  setIsVisible: (isVisible: boolean) => void;
}

const ChatBubble = ({
  content,
  agent,
  format,
  isLoading,
}: AgentMessage & { isLoading: boolean }) => {
  //really shouldnt be needed

  return (
    <div
      className={`z-[100] my-2 flex ${agent === "human" ? "justify-end" : ""}`}
    >
      <div
        className={`flex max-w-[100%] items-end gap-2 ${
          agent === "human" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Image
          src={`/images/${agent === "human" ? "person_icon" : "ai_icon"}.svg`}
          width={40}
          height={40}
          alt="Icon"
        />
        <div
          className={`overflow-scroll rounded-md border-2 p-3 shadow-md ${
            agent !== "human"
              ? "max-w-[75%] border-[#5F5858] bg-black text-white"
              : "min-w-[25%] border-[#FEC800] bg-[#8BA8B5] text-black shadow-md"
          }`}
        >
          {format === "graphviz" ? (
            <GraphvizGraph content={content} />
          ) : isLoading ? (
            <div className="justify-content-center left-0 flex items-center gap-3 px-3">
              <div className="animate-delay-100 h-2 w-2 animate-bounce rounded-full bg-yellowAlert"></div>
              <div className="animate-delay-200 h-2 w-2 animate-bounce rounded-full bg-yellowAlert"></div>
              <div className="animate-delay-300 h-2 w-2 animate-bounce rounded-full bg-yellowAlert"></div>
            </div>
          ) : (
            <span>{content}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export function ChatBox({ setIsVisible }: ChatBoxProps) {
  //   const [graph, setGraph] = useState<string>(`
  //   graph TD
  // A["Input: nums = [2,7,11,15], target = 9"] --> B["Check nums[0] + nums[1] == target"]
  // B -->|Yes| C["Output: [0,1]"]
  // B -->|No| D{Check next pair}
  // D --> B
  //   `);

  const { chat, sendChat, isLoading } = useChat();
  const [message, setMessage] = useState("");

  const handleSend = async (e?: React.FormEvent<HTMLFormElement | null>) => {
    e?.preventDefault();
    const msg = message.trim();
    console.log(message);
    setMessage("");
    await sendChat(msg);
  };

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{
        x: 20,
        y: 435,
      }}
    >
      <div className="absolute z-20 flex max-h-[700px] min-h-[350px] min-w-[500px] max-w-[600px] flex-col rounded-md border-2 border-nonWhite bg-darkBlue p-4 shadow-lg">
        <div className="handle m-0 flex flex-row-reverse justify-between">
          <div className="flex">
            <div
              onClick={() => setIsVisible(false)}
              className="m-1 h-4 w-4 rounded-full bg-red active:bg-rose-900"
            ></div>
            <div
              onClick={() => setIsVisible(false)}
              className="m-1 h-4 w-4 rounded-full bg-yellowAlert active:bg-yellow-600"
            ></div>
          </div>

          <div className="justify-left mb-1 flex items-center gap-2">
            <h1 className="font-titan text-2xl text-lightGreen">Chat</h1>
            <Image
              src="/images/chat.svg"
              height={25}
              width={25}
              alt="Chat Feature"
            ></Image>
          </div>
        </div>
        <div className="h-1 w-full rounded-full bg-slate-500"></div>

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
        </div>

        <div className="flex flex-col place-items-end">
          <SuggestionChips sendChat={sendChat} />
          <form onSubmit={handleSend} className="relative flex w-full flex-row">
            <input
              type="text"
              className="txt-black flex-grow overflow-x-scroll rounded-xl bg-slate-200 p-2"
              value={message}
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
