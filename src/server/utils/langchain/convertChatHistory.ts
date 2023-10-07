import type { MessageHistory } from "@/schemas/chatSchemas";
import { HumanMessage, AIMessage } from "langchain/schema"; /*

 * Method to turn the MessageHistory object returned by the frontend into a ChatHistory object
 * Reference: https://js.langchain.com/docs/modules/memory/how_to/buffer
 */
export const convertChatHistory = (messages: MessageHistory) => {
  return messages.map((message) => {
    if (message.agent == "bot") {
      return new AIMessage(message.message);
    } else {
      return new HumanMessage(message.message);
    }
  });
};
