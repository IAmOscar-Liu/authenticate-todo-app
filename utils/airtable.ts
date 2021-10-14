import * as dotenv from "dotenv-safe";
import Airtable from "airtable";
import { Record } from "../types";
dotenv.config({
  allowEmptyValues: true,
});
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = (record: any) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  } as Record;
};

const minifyRecords = (records: any): Record[] => {
  return records.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecord, minifyRecords };
