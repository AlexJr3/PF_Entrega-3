import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export const transport = nodemailer.createTransport({
  service: "email",
  port: 587,
  auth: {
    user: "alexisjrbwork@gmail.com",
    pass: config.mailer.pw,
  },
});

export const result = async (ticket) =>
  transport.sendMail({
    from: "alexisjrbwork@gmail.com",
    to: "maildeprueba@mail.com",
    subject: "correo de pruebad",
    html: `
    <div>
        <h1>Esto es un test</h1>
        <p>AGREGAR LOS DATOS DE TICKET</p>
    </div>`,
  });
