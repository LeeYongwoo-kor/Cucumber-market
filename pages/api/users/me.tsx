import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
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
    method: ["GET"],
    handler,
  })
);
