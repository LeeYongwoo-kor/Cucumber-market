import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = request;
  const items = await client.items.create({
    data: {
      name,
      price,
      description,
      image: "",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  response.json({
    ok: true,
    items,
  });
  const profile = await client.user.findUnique({
    where: { id: request.session.user?.id },
  });
  response.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    method: "POST",
    handler,
  })
);
