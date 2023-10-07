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

    // Update the chat with the agent's response
    setChat((prevChat) => [...prevChat, botResponse]);
    setIsLoading(false);
  };

  return { chat, sendChat, isLoading };
};
