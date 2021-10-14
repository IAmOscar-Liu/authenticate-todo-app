import auth0 from "../../utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleCallback(req, res, { redirectUri: "/" });
  } catch (error) {
    console.error(error);
    res.status(res.statusCode || 400).end(error.message);
  }
};
