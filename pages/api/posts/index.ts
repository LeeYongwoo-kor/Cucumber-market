import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    body: { question },
    session: { user },
  } = request;
  const post = await client.post.create({
    data: {
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  response.json({
    ok: true,
    post,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
