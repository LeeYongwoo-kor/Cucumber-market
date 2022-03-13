import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await client.user.create({
    data: {
      email: "admin@cucumber.com",
      name: "admin",
    },
  });

  response.json({
    ok: true,
  });
}
