import nodemailer from "nodemailer";

const env = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "apukumar180@gmail.com",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendMail = async ({
  email,
  subject,
  text,
}: {
  email: string;
  subject: string;
  text: string;
}) => {
  const res = await transporter.sendMail({
    from: '"ECOM" <apukumar180@gmail.com>',
    to: email,
    subject,
    text,
  });

  console.log("MESSAGE SENT:", res);
};

export default sendMail;