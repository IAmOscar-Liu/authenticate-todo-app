declare namespace NodeJS {
  interface ProcessEnv {
    AIRTABLE_API_KEY: string;
    AIRTABLE_BASE_ID: string;
    AIRTABLE_TABLE_NAME: string;
    AUTH0_DOMAIN: string;
    AUTH0_SECRET: string;
    AUTH0_CLIENT_ID: string;
    COOKIE_SECRET: string;
  }
}