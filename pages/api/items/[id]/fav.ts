import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = request;
  const alreadyExists = await client.fav.findFirst({
    where: {
      itemId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
      item: {
        user: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  response.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
