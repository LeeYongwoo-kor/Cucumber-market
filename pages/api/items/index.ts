import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  if (request.method === "GET") {
    const items = await client.item.findMany({
      include: {
        _count: {
          select: {
            records: true,
          },
        },
      },
    });
    response.json({
      ok: true,
      items,
    });
  }
  if (request.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = request;
    const item = await client.item.create({
      data: {
        name,
        price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    response.json({
      ok: true,
      item,
    });
    const profile = await client.user.findUnique({
      where: { id: request.session.user?.id },
    });
    response.json({
      ok: true,
      profile,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
