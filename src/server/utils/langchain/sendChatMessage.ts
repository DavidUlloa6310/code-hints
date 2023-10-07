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

const _DEFAULT_TEMPLATE = `Your job is to help users solve leetcode questions. You are a chat bot, so limit your messages to 100 characters for explinations, more for mermaid diagrams. VERY IMPORTANT: Make sure your answer is formatted exactly like this: {format_instructions}. Only output your response as the format permits, no other text. Any incorrect output formats will get a bad grade.
Problem description:
{leetcode_problem_description}\n
Users' code:
{user_code}\n
Users' code output:
{user_code_output}\n
 Chat history:
 {chat_history}\n
 User's input:
  {input}\n
 Make sure you answer in the format specified at the beginning! it should start with a leading '{', no text before it, and end with a trailing '}'`;

// define the output schema
const outputParser = StructuredOutputParser.fromZodSchema(
  z
    .object({
      format: z
        .enum(["text", "mermaid"])
        .describe(
          "the format of the output. do not mix the two types. if you are going to give mermaid, make sure the type is 'mermaid' and not 'text'",
        ),
      content: z.string().describe(
        `the content of the output. If mermaid, make sure the format is correct and be careful of escaping characters, if using brackets inside the nodes, make sure they're wrapped in quotes (eg. A[Input: nums = [2,7,11,15]] won't run, must be A["Input: nums = [2,7,11,15]"]).
        Here's an example of proper syntax:
        graph TD
        A["Input: nums = [2,7,11,15], target = 9"] --> B["Check nums[0] + nums[1] == target"]
        B -->|Yes| C["Output: [0,1]"]
        B -->|No| D{Check next pair}
        D --> BB`,
      ),
    })
    .describe("ONLY OUTPUT THIS FORMAT"),
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

    // initialize the BufferMemory context, convert the chat history to the correct format
    const bufferMemory = new BufferMemory({
      memoryKey: "chat_history",
      inputKey: "input",
      // returnMessages: true, //not sure exacrly what this does?
      chatHistory:
        data.messageHistory &&
        new ChatMessageHistory(convertChatHistory(data.messageHistory)),
    });

    // create the ConversationChain context
    const chain = new LLMChain({
      llm: model,
      memory: bufferMemory,
      prompt: PROMPT,
      outputKey: "record",
      verbose: true,
    });

    const { record: output } = await chain.call({
      input: data.currentMessage,
      user_code: data.userCode,
      user_code_output: data.userCodeOutput,
      leetcode_problem_description: problemDescription,
      outputParser: outputFixingParser,
    });

    return JSON.parse(output as string) as unknown;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
