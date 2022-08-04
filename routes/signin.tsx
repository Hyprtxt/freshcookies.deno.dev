export const handler = {
  GET: (req, ctx) => new Response(null, {
    status: 301,
    headers: new Headers({
      location: new URL(req.url).origin + `/login`,
    }),
  }),
};