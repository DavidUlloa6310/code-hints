import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { ConversationChain, LLMChain } from "langchain/chains";
import type { ChatSchema } from "@/schemas/chatSchemas";
import { convertChatHistory } from "./convertChatHistory";
import { getLeetcodeProblemFromId } from "../leetcode";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";
import z from "zod";

const _DEFAULT_TEMPLATE = `Your job is to help users solve leetcode questions. Below is the conversation between you and a user. Please help the user understand the problem and solve it. You are a chat bot, so try to limit your messages to 100 characters for explinations, more for diagrams. VERY IMPORTANT: Make sure your answer is formatted like this: {format_instructions}
 Current conversation:
 {chat_history}
Problem description:
{leetcode_problem_description}
Users' code:
{user_code}
Users' code output:
{user_code_output}
 User chat message: {input}
`;

// define the output schema
const outputParser = StructuredOutputParser.fromZodSchema(
  z
    .object({
      format: z
        .enum(["explination", "mermaid"])
        .describe(
          "the format of the output. do not mix the two types. if you are going to give mermaid, make sure the type is mermaid and not 'explination'",
        ),
      content: z.string().describe(
        `the content of the output. If mermaid, make sure all the nodes are wrapped in quotes. for example:flowchart LR
          markdown["\`This **is** _Markdown_\`"]
          newLines["\`Line1
          Line 2
          Line 3\`"]
          markdown --> newLines.`,
      ),
    })
    .describe(
      "if giving a visual, make sure the format is mermaid, and include only the mermaid code. if giving text, make sure the format is 'explination', and include only the text. do not mix the two types",
    ),
);

// initialize the ConversationChain context
const model = new ChatOpenAI({ modelName: "gpt-4", temperature: 0.1 });

// will call .parse on the output of the chain
const outputFixingParser = OutputFixingParser.fromLLM(model, outputParser);

const PROMPT = new PromptTemplate({
  inputVariables: [
    "input",
    "chat_history",
    "user_code",
    "user_code_output",
    "leetcode_problem_description",
    "format_instructions",
  ],
  partialVariables: {
    format_instructions: outputFixingParser.getFormatInstructions(),
  },
  template: _DEFAULT_TEMPLATE,
});

export const sendChatMessage = async (data: ChatSchema) => {
  try {
    // fetch the problem description from leetcode
    const { content: problemDescription } = getLeetcodeProblemFromId(
      data.problemId,
    );

    console.log("Message history: \n\n", data.messageHistory);
    throw new Error("test");
    return;

    // initialize the BufferMemory context, convert the chat history to the correct format
    // const bufferMemory = new BufferMemory({
    //   memoryKey: "chat_history",
    //   inputKey: "input",
    //   returnMessages: true, //not sure exacrly what this does?
    //   chatHistory: new ChatMessageHistory(
    //     convertChatHistory(data.messageHistory ?? []),
    //   ),
    // });

    // // create the ConversationChain context
    // const chain = new LLMChain({
    //   llm: model,
    //   memory: bufferMemory,
    //   prompt: PROMPT,
    //   outputKey: "records",
    //   verbose: true,
    // });

    // const { records: output } = await chain.call({
    //   input: data.currentMessage,
    //   user_code: data.userCode,
    //   user_code_output: data.userCodeOutput,
    //   leetcode_problem_description: problemDescription,
    //   outputParser: outputFixingParser,
    // });

    // return JSON.parse(output as string) as unknown;
  } catch (e) {
    throw e;
  }
};
