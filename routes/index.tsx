/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export const handler = {
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
      <Counter start={3} />
      {data?.user ? <p><a href="/logout">Logout Here</a></p> : <p><a href="/login">Please Login Here</a></p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data right now</p>}
    </div>
  );
}

