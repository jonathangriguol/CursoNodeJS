import nodemailer from "nodemailer";
import { messaging } from "../configs/app.config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: messaging.EMAIL_USER,
    pass: messaging.EMAIL_PASSWORD,
  },
});

export const mailingController = async (req, res) => {
  let result = await transport.sendMail({
    from: "coder test <messaging.EMAIL_USER>",
    to: req.user.email,
    subject: "Correo de prueba",
    html: `
        <div>
            <h1>Has iniciado sesion en coder App!</h1>
        </div>
        `,
    attachments: [],
  });
};
