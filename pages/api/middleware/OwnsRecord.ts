import Auth0 from "../../../utils/auth0";
import { table } from "../../../utils/airtable";
import { Record, CustomNextApiRequest } from "../../../types";
import { NextApiRequest, NextApiResponse } from "next";

const ownsRecord = (
  handler: (
    req: CustomNextApiRequest,
    res: NextApiResponse<any>
  ) => Promise<void>
) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { user } = await Auth0.getSession(req);

  const { id } = req.body;

  try {
    console.log("run middleware!!!");
    const existingRecord: Record = await table.find(id);

    if (!existingRecord || user.sub !== existingRecord.fields.userId) {
      res.statusCode = 404;
      return res.json({ msg: "Record not found" });
    }
    req.record = existingRecord;
    return handler(req, res);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return res.json({ msg: "Something went wrong" });
  }
};

export default ownsRecord;
