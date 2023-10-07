import z from "zod";

export const errorValidation = z.object({
  message: z.string().min(1),
});
