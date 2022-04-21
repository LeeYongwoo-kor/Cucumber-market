import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { compileFunction } from "vm";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = request;
  const post = await client.answer.findFirst({
    where: {
      userId: user?.id,
      postId: +id.toString(),
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
  const newAnswer = await client.answer.create({
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
