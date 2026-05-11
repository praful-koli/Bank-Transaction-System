require("dotenv").config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in .env file");
}

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in .env file");
}

if (!process.env.JWT_SECRET) {
   throw new Error("JWT_SECRET is not defined in .env file");
}

const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
