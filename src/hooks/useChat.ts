import type { AgentMessage } from "@/schemas/chatSchemas";
import { useState } from "react";

interface UseChatProps {
  problemId: string;
  userCode: string;
  userCodeOutput: string;
}

export const useChat = ({
  problemId,
  userCode,
  userCodeOutput,
}: UseChatProps) => {
  const [chat, setChat] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendChat = async (message: string) => {
    //The backend is expecting the previous chat messages and the current message to be separate
    //I know this isn't great design, but I tried fixing it and the whole thing broke :)
    const previousChat = chat;
    const newMessage: AgentMessage = {
      agent: "human",
      format: "text",
      content: message,
    };

    //DEV
    console.log("sending message", message);
    return;

    //optimistically update the chat
    setChat([...chat, newMessage]);
    setIsLoading(true);

    // Submit the message + context to the backend, update with agent response
    const apiResponse = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messsageHistory: previousChat,
        //todo: investigate removing this
        currentMessage: newMessage.content,
        userCode: userCode,
        userCodeOutput: userCodeOutput,
        problemId: problemId,
      }),
    });

    const res = (await apiResponse.json()) as unknown as AgentMessage;

    const botResponse: AgentMessage = {
      agent: "bot",
      format: res.format,
      content: res.content,
    };

    setChat([...chat, botResponse]);
    setIsLoading(false);
  };

  return {
    chat,
    sendChat,
    isLoading,
  };
};
