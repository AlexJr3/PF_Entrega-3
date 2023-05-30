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

export const result = (ticket) =>
  transport.sendMail({
    from: "alexisjrbwork@gmail.com",
    to: ticket.purchase,
    subject: "correo de pruebad",
    html: `
    <div>
        <h1>HCompra en el ecommerce</h1>
        <ul>
          <li>Codigo de compra: ${ticket.code}</li>
          <li>Fecha: ${ticket.purchase_datatime}</li>
          <li>Total: ${ticket.total}</li>
        </ul>
    </div>`,
  });
