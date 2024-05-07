import dotenv from "dotenv";
dotenv.config();

const environment = process.env.ENVIRONMENT;

const messaging = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

export { environment, messaging };
