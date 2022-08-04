
export const handler = {
  POST: async (req, ctx) => {
    const body = await req.formData()
    console.log('FORM DATA', body)
    if ( body.get("identifier") === "admin" ) {
      if ( body.get("password") === "password" ) {
        return new Response(JSON.stringify({ user: { id: 1, username: "admin" } }), {
          headers: {
            "Content-Type": 'application/json'
          }
        });
      } else {
      return new Response(JSON.stringify({ error: { message: "the password is wrong" } }), {
        status: 403,
        headers: {
          "Content-Type": 'application/json'
        }
      });
    }
    } else {
      return new Response(JSON.stringify({ error: { message: "the username is wrong" } }), {
        status: 403,
        headers: {
          "Content-Type": 'application/json'
        }
      });
    }
  },
}
