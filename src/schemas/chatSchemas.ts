import z from "zod";

//export the messageHistory type
export type AgentMessage = z.infer<typeof agentMessage>;
export type ChatSchema = z.infer<typeof chatSchema>;

export const agentMessage = z.object({
  agent: z.enum(["human", "bot"]),
  format: z.enum(["text", "graphviz"]),
  content: z.string(),
});

export const chatSchema = z.object({
  messageHistory: z.array(agentMessage).optional(),
  currentMessage: z.string(),
  userCode: z.string(),
  userCodeOutput: z.string().optional(),
  problemId: z.string(),
});
