import { NextApiRequest } from "next";

export type Fields = {
  description: string;
  completed?: boolean;
  userId?: string;
};

export type Record = {
  id: string;
  fields: Fields;
};

export type CustomNextApiRequest = NextApiRequest & { record: Record };
