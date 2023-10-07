/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import fs from "fs";
import { getLeetcodeProblemFromId } from "@/server/utils/leetcode";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const problem = getLeetcodeProblemFromId(req.query.problemId as string);
    res.status(200).json({ ...problem });
  } catch (error) {
    res.status(404).json({
      message: "The problem does not exist in the JSON file",
    });
  }
}
