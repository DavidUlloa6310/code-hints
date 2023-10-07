import z from "zod";

export const problemValidation = z.object({
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  frontendQuestionId: z.string().min(1),
  status: z.null(),
  title: z.string().min(1),
  titleSlug: z.string().min(1),
  topicTags: z.array(
    z.object({
      name: z.string().min(1),
      id: z.string().min(1),
      slug: z.string().min(1),
    }),
  ),
  solution: z.array(
    z.object({
      explanation: z.string().min(1),
      implementations: z.array(
        z.object({
          code: z.string().min(1),
          langSlug: z.string().min(1),
        }),
      ),
    }),
  ),
  content: z.string().min(1),
  testCases: z.array(z.string().min(1)).min(1),
  starterCodes: z.array(
    z.object({
      lang: z.string().min(1),
      langSlug: z.string().min(1),
      code: z.string().min(1),
    }),
  ),
  hints: z.array(z.string().min(1)),
  similarQuestions: z.array(
    z.object({
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
      titleSlug: z.string().min(1),
      title: z.string().min(1),
      translatedTitle: z.string().nullable(),
      isPaidOnly: z.boolean(),
    }),
  ),
});

export type ProblemSchema = z.infer<typeof problemValidation>;
