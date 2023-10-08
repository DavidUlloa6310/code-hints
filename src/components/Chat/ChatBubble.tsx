/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useState } from "react";
import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import Draggable from "react-draggable";
import GraphvizGraph from "../GraphvizGraph";
import type { AgentMessage } from "@/schemas/chatSchemas";

export const ChatBubble = ({
  content,
  agent,
  format,
  isLoading,
}: AgentMessage & { isLoading: boolean }) => {
  return (
    <div
      className={`z-[100] my-2 flex ${
        agent === "human" ? "justify-end" : "justify-start"
      }`}
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
          className={`rounded-md border-2 p-3 shadow-md ${
            agent !== "human"
              ? "max-w-[75%] border-[#5F5858] bg-black text-white"
              : "min-w-[25%] border-[#FEC800] bg-[#8BA8B5] text-black shadow-md"
          } ${
            format === "graphviz" ? "overflow-hidden; w-full; p-0; h-full" : ""
          }`}
        >
          {format === "graphviz" ? (
            <GraphvizGraph content={content} />
          ) : isLoading ? (
            <div className="justify-content-center left-0 flex items-center gap-3 px-3">
              <div className="animate-delay-100 h-4 w-4 animate-bounce rounded-full bg-yellowAlert"></div>
              <div className="animate-delay-200 h-4 w-4 animate-bounce rounded-full bg-yellowAlert"></div>
              <div className="animate-delay-300 h-4 w-4 animate-bounce rounded-full bg-yellowAlert"></div>
            </div>
          ) : (
            <span>{content}</span>
          )}
        </div>
      </div>
    </div>
  );
};
