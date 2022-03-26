import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const { token } = request.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  if (!exists) return response.status(404).end();
  request.session.user = {
    id: exists?.userId,
  };
  await request.session.save();
  await client.token.deleteMany({
    where: {
      userId: exists.userId,
    },
  });
  response.json({ ok: true });
}

export default withApiSession(
  withHandler({
    method: "POST",
    handler,
    isPrivate: false,
  })
);
