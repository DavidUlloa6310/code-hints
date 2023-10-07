import z from "zod";

//export the messageHistory type
export type MessageHistory = z.infer<typeof messageHistory>;
export type ChatSchema = z.infer<typeof chatSchema>;

export const messageHistory = z.array(
  z.object({
    agent: z.enum(["human", "bot"]),
    message: z.string(),
  }),
);

export const chatSchema = z.object({
  messageHistory: messageHistory.optional(),
  currentMessage: z.string(),
  userCode: z.string(),
  userCodeOutput: z.string().optional(),
  problemId: z.string(),
});
