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
    body: { answer },
  } = request;
  const post = await client.count.findFirst({
    where: {
      userId: user?.id,
      postId: +id.toString(),
      countKind: CountKind.Answer,
    },
    select: {
      id: true,
    },
  });
  if (!post) {
    response.json({
      ok: false,
    });
  }
  const newAnswer = await client.count.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
      countKind: CountKind.Answer,
      answer,
    },
  });
  response.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
