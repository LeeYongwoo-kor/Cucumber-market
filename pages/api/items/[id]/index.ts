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
  const item = await client.item.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = item?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedItems = await client.item.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: item?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        itemId: item?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  response.json({ ok: true, item, relatedItems });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
