/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import LoginForm from "../components/LoginForm.jsx";

export const handler = {
  GET: (req, ctx) => {
    delete ctx.state.user
    localStorage.setItem(ctx.state.uuid, JSON.stringify(ctx.state))
    const res = new Response(null, {
      status: 302,
      headers: new Headers({
        location: new URL(req.url).origin + `/`,
      }),
    })
    return res
    // return ctx.render({ ...ctx.state })
  },
};