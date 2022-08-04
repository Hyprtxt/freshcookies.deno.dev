// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { bold, cyan, green, yellow } from "https://deno.land/std@0.140.0/fmt/colors.ts";
import { getCookies, setCookie } from "https://deno.land/std@0.150.0/http/cookie.ts";

// import * as redis from "https://deno.land/x/redis@v0.26.0/mod.ts";
// const REDIS_PASS = Deno.env.get("REDIS_PASS");
// const REDIS_HOST = Deno.env.get("REDIS_HOST");
// const REDIS_PORT = Deno.env.get("REDIS_PORT");

// const store = await redis.connect({
//   password: REDIS_PASS,
//   hostname: REDIS_HOST,
//   port: REDIS_PORT,
// });

interface State {
  data: string;
}

// Session Tracker
const createSession = async () => {
  const session = {
    uuid: crypto.randomUUID(),
  };
  localStorage.setItem(session.uuid, JSON.stringify(session));
  // await store.set(session.uuid, JSON.stringify(session));
  // await store.expire(session.uuid, 7 * 24 * 60 * 60);
  return session;
};

const setupSession = async (req, ctx) => {
  // This is the session stuff
  const cookies = getCookies(req.headers);
  const tracker_id = cookies.sesh
  // console.log( 'sesh id', tracker_id )
  if (tracker_id) {
    const session = localStorage.getItem(tracker_id);
    if (session) {
      ctx.state = JSON.parse(session);
      ctx.state.url = req.url;
    } else {
      // Found cookie, but nothing in redis
      ctx.state = await createSession();
      ctx.state.url = req.url;
    }
  } else {
    // Didn't find a cookie
    // console.log("Brand New Visit")
    ctx.state = await createSession();
    ctx.state.url = req.url;
  }
  const resp = await ctx.next();
  setCookie(resp.headers, { name: "sesh", value: ctx.state.uuid });
  // End of session stuff
  return resp
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  // Logging
  const start = Date.now();
  const pathname = new URL(req.url).pathname
  const withSession = [
    "/",
    "/login",
    "/logout",
  ]
  let resp
  if ( withSession.includes(pathname) ) {
    resp = await setupSession(req, ctx);
  } else {
    resp = await ctx.next();
  }
  const ms = Date.now() - start;
  resp.headers.set("X-Response-Time", `${ms}ms`);
  const url = new URL( req.url );
  // console.log( ms, req )
  console.log(
    `${green(req.method)} ${cyan(url.pathname)} - ${yellow(String(ms) + "ms")}`,
  );
  return resp
  
  // return await ctx.next()
}