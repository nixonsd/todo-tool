module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT | 3000,
  EMAIL_USER: process.env.EMAIL_USER,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
