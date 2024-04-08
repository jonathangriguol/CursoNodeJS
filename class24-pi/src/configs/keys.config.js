import dotenv from 'dotenv';
dotenv.config();

const githubConfig = {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
};

export default githubConfig;