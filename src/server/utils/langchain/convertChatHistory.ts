import type { AgentMessage } from "@/schemas/chatSchemas";
import { HumanMessage, AIMessage } from "langchain/schema"; /*

 * Method to turn the MessageHistory object returned by the frontend into a ChatHistory object
 * Reference: https://js.langchain.com/docs/modules/memory/how_to/buffer
 */
export const convertChatHistory = (messages: AgentMessage[]) => {
  return messages.map((message) => {
    if (message.agent == "bot") {
      return new AIMessage(message.content);
    } else {
      return new HumanMessage(message.content);
    }
  });
};
