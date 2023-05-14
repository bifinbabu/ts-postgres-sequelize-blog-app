import nodemailer from "nodemailer";

const sendMail = async (email: string, name: string, token: string) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const link = `${process.env.APP_URL}/verify?token=${token}`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BlogSpot" <bifinbabu5@gmail.com>',
    to: email,
    subject: "Hello ✔",
    html: `<div><h1>Hi ${name}</h1><br/><p>Click the button to verify your Email <a href="${link}" >Click here</a></p></div>`,
  });

  console.log("mail info", info);
};

export default sendMail;
