import { getLeetcodeProblems } from "@/server/utils/leetcode";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res
      .status(403)
      .json({ message: "Forbidden from using that method on this route." });
  }

  return res.status(200).json({ data: [...getLeetcodeProblems()] });
}
