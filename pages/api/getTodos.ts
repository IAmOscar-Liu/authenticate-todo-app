import { table, minifyRecords } from "../../utils/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0 from "../../utils/auth0";

export default Auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = await Auth0.getSession(req);
    try {
      const records = await table
        .select({
          filterByFormula: `userId = '${user.sub}'`,
        })
        .firstPage();
      const minifiedRecords = minifyRecords(records);

      res.statusCode = 200;
      res.json(minifiedRecords);
    } catch (error) {
      res.statusCode = 500;
      res.json({ msg: "Something went wrong" });
    }
  }
);
