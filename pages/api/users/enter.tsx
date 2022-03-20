import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const twilioClienct = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>
) {
  const { phone, email } = request.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return response.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    await twilioClienct.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Welcome to Cucumber Market! Sending you a message from the Cucumber Market. Enter 6 digits of the token received from message. Your login token is ${payload}.`,
    });
  }
  // to: phone -> Theoeretically, This code is correct

  return response.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
