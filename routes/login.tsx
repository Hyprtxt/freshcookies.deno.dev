/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import LoginForm from "../components/LoginForm.jsx";

export const handler = {
  POST: async (req, ctx) => {
    const body = await req.formData()
    // console.log( Object.fromEntries(body) )
    const data = await fetch('http://localhost:8000/api/login', {
      method: 'POST', 
      body
    })
    .then(async (res) => await res.json())
    const state = Object.assign(ctx.state, { ...data })
    localStorage.setItem(ctx.state.uuid, JSON.stringify(state))
    // Redirect. Next request will get the session from it's cookie
    const res = new Response(null, {
      status: 302,
      headers: new Headers({
        location: new URL(req.url).origin + `/`,
      }),
    })
    return res;
    // return ctx.render({ ...ctx.state, ...data })
  },
  GET: (req, ctx) => {
    return ctx.render({ ...ctx.state })
  },
};

export default function Home({ data }) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      {data?.user ? <p>{`Hello, ${data.user.username}`}</p> :
      <Fragment>
        <p>Please Login</p>
        <p>You could try "admin" and "password"</p>
        <LoginForm />
      </Fragment>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data right now</p>}
    </div>
  );
}

