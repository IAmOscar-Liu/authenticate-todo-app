import { table, getMinifiedRecord, minifyRecords } from "../../utils/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0 from "../../utils/auth0";
import OwnsRecord from "./middleware/OwnsRecord";
import { Record, CustomNextApiRequest } from "../../types";

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { id, fields } = req.body;
  const { user } = await Auth0.getSession(req);

  try {
    const newFields = { ...fields, userId: user.sub };
    const updatedRecords: Record[] = await table.update([
      {
        id,
        fields: newFields,
      },
    ]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(updatedRecords[0]));
  } catch (error) {
    res.statusCode = 500;
    console.log(error.message);
    res.json({ msg: "Something went wrong" });
  }
};

export default Auth0.requireAuthentication(OwnsRecord(handler));
// OwnsRecord((req, res) => {...})