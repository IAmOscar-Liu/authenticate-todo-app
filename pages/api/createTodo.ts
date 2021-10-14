import { table } from "../../utils/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { Record } from "../../types";
import Auth0 from "../../utils/auth0";

export default Auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { description } = req.body;
    const { user } = await Auth0.getSession(req);
    try {
      const createdRecords = await table.create([
        {
          fields: { description, userId: user.sub },
        },
      ]);
      const createdRecord: Record = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      };
      res.statusCode = 200;
      res.json(createdRecord);
    } catch (error) {
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
);
