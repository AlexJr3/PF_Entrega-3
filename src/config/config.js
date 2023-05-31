import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_KEY = process.env.JWT_KEY;
const MAILER_PW = process.env.MAILER_PW;

export const config = {
  server: {
    dbUrl: MONGO_URL,
    port: PORT,
  },
  jwt: {
    key: JWT_KEY,
  },
  mailer: {
    pw: MAILER_PW,
  },
};
