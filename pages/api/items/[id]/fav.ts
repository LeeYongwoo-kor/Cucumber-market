import { RecordKind } from "@prisma/client";
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
  const alreadyExists = await client.record.findFirst({
    where: {
      userId: user?.id,
      itemId: +id.toString(),
      recordKind: RecordKind.Fav,
    },
    select: {
      id: true,
    },
  });
  if (alreadyExists) {
    await client.record.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.record.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        item: {
          connect: {
            id: +id.toString(),
          },
        },
        recordKind: RecordKind.Fav,
      },
    });
  }

  response.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
