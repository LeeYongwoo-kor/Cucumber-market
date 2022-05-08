import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = request;
  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: { createBy: { select: { id: true, name: true, avatar: true } } },
  });
  response.json({
    ok: true,
    reviews,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
