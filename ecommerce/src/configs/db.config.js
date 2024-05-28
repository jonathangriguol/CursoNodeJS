import dotenv from 'dotenv';
dotenv.config();

const config = {
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME
};

export default config;