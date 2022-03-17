import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.status(400).end();
  }
  response.status(200).end();
}
