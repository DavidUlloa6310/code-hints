/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useState } from "react";
import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import Draggable from "react-draggable";
import SuggestionChips from "../SuggestionChips";
import type { AgentMessage } from "@/schemas/chatSchemas";
import { ChatBubble } from "./ChatBubble";

interface ChatBoxProps {
  setIsVisible: (isVisible: boolean) => void;
}

export function ChatBox({ setIsVisible }: ChatBoxProps) {
  const { chat, sendChat, isLoading } = useChat();
  const [message, setMessage] = useState("");

  const handleSend = async (e?: React.FormEvent<HTMLFormElement | null>) => {
    e?.preventDefault();
    const msg = message.trim();
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
      <div className="absolute z-20 flex max-h-[700px] min-h-[350px] min-w-[500px] max-w-[600px] flex-col rounded-md border-2 border-nonWhite bg-darkBlue px-4 py-0 shadow-lg">
        <div className="handle flex flex-row items-center justify-between">
          <div className="flex items-center">
            <div
              onClick={() => setIsVisible(false)}
              className="m-1 h-4 w-4 rounded-full bg-red active:bg-rose-900"
            ></div>
            <div
              onClick={() => setIsVisible(false)}
              className="m-1 h-4 w-4 rounded-full bg-yellowAlert active:bg-yellow-600"
            ></div>
          </div>

          <div className="justify-left flex items-center">
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
