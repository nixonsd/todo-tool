module.exports = {
  MONGODB_URI: "mongodb://localhost:27017/todo-tool",
  SESSION_SECRET: "some secret value",
  BASE_URL: "http://localhost:8081",
  PORT: 3000,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
