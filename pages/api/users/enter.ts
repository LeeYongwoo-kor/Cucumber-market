import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

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
    /*     await twilioClienct.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Welcome to Cucumber Market! Sending you a message from the Cucumber Market. Enter 6 digits of the token received from message. Your login token is ${payload}.`,
    }); */
    // Uncomment if you want to waste your twilio's credit 🤔
  } else if (email) {
    /*     await mail.send({
      from: process.env.ADMIN_EMAIL!,
      to: email,
      subject: "Your Cucumber Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    }); */
  }
  // to: phone -> Theoeretically, This code is correct
  console.log(payload);

  return response.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
