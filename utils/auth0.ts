import { initAuth0 } from "@auth0/nextjs-auth0";
import * as dotenv from "dotenv-safe";
// import { DeepPartial, Config } from "@auth0/nextjs-auth0/dist/auth0-session";

dotenv.config({
  allowEmptyValues: true,
});

/*
domain=dev-fo311s2u.us.auth0.com
clientId=k18BA8ObU4eMFK2rG1X33J6Mh5HOvL7b
clientSecret=2b1Tt31fDuoIQ5si6Rvfok704ORFgHR-TWvSUImNuVUDBG7as0OZ0YwrOEuk9N5L
redirectUri=http://localhost:3000/api/callback
postLogoutRedirectUri=http://localhost:3000/
cookieSecret=addsfhdasfjdsakssppksssadfasdfjgkadshfgsjjasdkfyyasdfklsasfdalsfdskla
*/

export default initAuth0({ 
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_SECRET,
  scope: "openid profile",
  redirectUri: "http://localhost:3000/api/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
  session: {
    cookieSecret: process.env.COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8,
    storeIdToken: false,
    storeAccessToken: false,
    storeRefreshToken: false,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
});
