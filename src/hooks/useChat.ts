import type { AgentMessage } from "@/schemas/chatSchemas";
import { useState } from "react";
import { useUserDataContext } from "./useUserData";
import { useProblemDataContext } from "./useProblemData";

const INITIAL_CHAT: AgentMessage[] = [
  {
    agent: "bot",
    format: "text",
    content: "Hello, I'm the CodeHints bot! How can I help you today?",
  },
];

export const useChat = () => {
  const [chat, setChat] = useState<AgentMessage[]>(INITIAL_CHAT);
  const [isLoading, setIsLoading] = useState(false);
  const { userCode, codeOutput } = useUserDataContext();
  const { problemData } = useProblemDataContext();

  const sendChat = async (message: string) => {
    setIsLoading(true);

    // Optimistically update the chat with the user's message
    setChat((prevChat) => [
      ...prevChat,
      {
        agent: "human",
        format: "text",
        content: message,
      },
    ]);

    // Submit the message + context to the backend and update with agent response
    const apiResponse = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageHistory: chat, // Use the current chat state
        currentMessage: message,
        userCode: userCode,
        userCodeOutput: codeOutput ?? "",
        problemId: problemData!.frontendQuestionId,
      }),
    });

    const res = (await apiResponse.json()) as unknown as AgentMessage;

    const botResponse: AgentMessage = {
      agent: "bot",
      format: res.format,
      content: res.content,
    };

    // Update the chat with the agent's response
    setChat((prevChat) => [...prevChat, botResponse]);
    setIsLoading(false);
  };

  return { chat, sendChat, isLoading };
};
