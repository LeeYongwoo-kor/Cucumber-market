import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { RecordKind } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface RecordType {
  readonly [key: string]: RecordKind;
}

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = request;

  const recordKind = (kind: string | string[]): RecordKind | undefined => {
    if (Array.isArray(kind)) kind = kind[0];

    const records: RecordType = {
      Fav: RecordKind.Fav,
      Purchase: RecordKind.Purchase,
      Sale: RecordKind.Sale,
    };

    return records[kind];
  };

  const purchases = await client.record.findMany({
    where: {
      userId: user?.id,
      recordKind: recordKind(kind),
    },
    include: {
      item: {
        include: {
          _count: {
            select: {
              records: true,
            },
          },
        },
      },
    },
  });
  response.json({
    ok: true,
    purchases,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
