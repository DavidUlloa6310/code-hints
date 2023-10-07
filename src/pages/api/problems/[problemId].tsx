/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import { getLeetcodeProblemFromId } from "@/server/utils/leetcode";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const problem = getLeetcodeProblemFromId(req.query.problemId as string);
  res.status(200).json({ ...problem });
}
