import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { CountKind } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = request;
  const post = await client.post.findUnique({
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
      counts: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          counts: true,
        },
      },
    },
  });
  const isWondering = await client.count.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id,
      countKind: CountKind.Wondering,
    },
  });
  response.json({
    ok: true,
    post,
    isWondering,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
