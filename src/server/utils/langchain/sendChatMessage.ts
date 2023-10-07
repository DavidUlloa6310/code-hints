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

// const _DEFAULT_TEMPLATE = `Your job is to help users solve leetcode questions. You are a chat bot, so limit your messages to 100 characters for explinations, more for mermaid diagrams. VERY IMPORTANT: Make sure your answer is formatted exactly like this: {format_instructions}. Only output your response as the format permits, no other text. Any incorrect output formats will get a bad grade.
// Problem description:
// {leetcode_problem_description}\n
// Users' code:
// {user_code}\n
// Users' code output:
// {user_code_output}\n
//  Chat history:
//  {chat_history}\n
//  User's input:
//   {input}\n
//  Make sure you answer in the format specified at the beginning! Start with a opening curly brace, and end with a closing one. No leading/trailing characters!`;

const _DEFAULT_TEMPLATE = `
# Your job is to help users study for leetcode questions by guiding them through their practice problems. You will be supplied by the user's code, the correct solution to the problem, and the result of the user's code being run.
  * You are a chat bot, with a teachin personality. 
  * Limit your messages to 100 characters for explanation, more for Graphviz diagrams.
  * VERY IMPORTANT: Make sure your answer is formatted like this: {format_instructions}. 
  * You will be asked for your help to these interview-like questions, but are not allowed to give the exact solution to the overall problem.
## Problem Information
  * You will be asked for your help to these interview-like questions, but are not allowed to give the exact solution to the overall problem.
  {leetcode_problem_description}
## User's Code Output
  * {user_code_output}
  * {chat_history}
## User Input
  * {input}
  * Make sure you answer in the format specified at the beginning! Start with opening curly brace, and end with a closing one. No leading / trailing character!
## Correct Solution
  * Here's the correct solution for the problem for which you should base your graphiz diagrams:
  {correct_solution}
<!endofprompt!>`;

// define the output schema
const outputParser = StructuredOutputParser.fromZodSchema(
  z
    .object({
      format: z
        .enum(["text", "graphviz"])
        .describe(
          "the format of the output. do not mix the two types. if you are going to give Graphviz, make sure the type is 'graphviz' and not 'text'",
        ),
      content: z.string().describe(
        `Here's an example of proper syntax:
        Given the code to the technical problem Two Sum:

        def twoSum (arr, target):
	        res = []
	        sums = set()

	        for val in arr:
		        if target - val in sums:
			        res.append([val, target - val])
		          sums.add(val)
	        return res

        Generate the graph of the logic followed to solve the problem and specify the steps in the labels for the nodes.

        digraph G {
          fontname="Helvetica,Arial,sans-serif"
          node [fontname="Helvetica,Arial,sans-serif"]
          edge [fontname="Helvetica,Arial,sans-serif"]
        
          digraph G {
            rankdir=TB;
            node [shape=rect, style=filled, color=lightblue];
            edge [dir=none];
        
            start [label="Start"];
            array [label="Input Array: [2, 7, 11, 15]\nTarget: 9"];
            createHashTable [label="Create Empty Hash Table"];
            iterate [label="Iterate Through Array"];
            check [label="Check If Complement Exists in Hash Table"];
            add [label="Add Current Element to Hash Table"];
            found [label="Complement Found"];
            end [label="Return Indices"];
        
            start -> array;
            array -> createHashTable;
            createHashTable -> iterate;
            iterate -> check;
            check -> found [label="Yes"];
            check -> add [label="No"];
            add -> iterate;
            found -> end;
          }
        `,
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
    "correct_solution",
  ],
  partialVariables: {
    format_instructions: outputFixingParser.getFormatInstructions(),
  },
  template: _DEFAULT_TEMPLATE,
});

export const sendChatMessage = async (data: ChatSchema) => {
  try {
    // fetch the problem description from leetcode
    const { content: problemDescription, solution } = getLeetcodeProblemFromId(
      data.problemId,
    );

    const pythonCode = solution.implementations[0]?.find(
      (language: { code?: string; langSlug: string }) =>
        language.langSlug === "python3",
    )?.code;

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
      correct_solution: pythonCode,
    });

    return JSON.parse(output as string) as unknown;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
