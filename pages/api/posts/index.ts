import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  if (request.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = request;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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
  if (request.method === "GET") {
    const {
      query: { latitude, longitude },
    } = request;
    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLongitude = parseFloat(longitude.toString());
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            counts: true,
          },
        },
      },
      where: {
        latitude: {
          gte: parsedLatitude - 0.02,
          lte: parsedLatitude + 0.02,
        },
        longitude: {
          gte: parsedLongitude - 0.02,
          lte: parsedLongitude + 0.02,
        },
      },
    });
    response.json({
      ok: true,
      posts,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
