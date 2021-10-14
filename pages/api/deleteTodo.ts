import { table, minifyRecords } from "../../utils/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import OwnsRecord from "./middleware/OwnsRecord";
import Auth0 from "../../utils/auth0";
import { Record, CustomNextApiRequest } from "../../types";

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    const deletedRecords: Record[] = await table.destroy([id]);
    res.statusCode = 200;
    res.json(minifyRecords(deletedRecords));
  } catch (error) {
    res.statusCode = 500;
    console.log(error.message);
    res.json({ msg: "Something went wrong" });
  }
};

export default Auth0.requireAuthentication(OwnsRecord(handler));
