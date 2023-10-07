import type { NextApiRequest, NextApiResponse } from "next";
import { sendChatMessage } from "@/server/utils/langchain/sendChatMessage";
import { chatSchema } from "@/schemas/chatSchemas";
import z from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  } else {
    try {
      const message = chatSchema.parse(req.body);
      const result = await sendChatMessage(message);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      }

      res.status(500).json({ error });
    }
  }
}
