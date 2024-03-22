"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var env = {
  AUTHOR: process.env.AUTHOR,
  APP_NAME: process.env.APP_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  // jsonwebtoken
  JWT_SECRET_TOKEN_KEY: process.env.JWT_SECRET_TOKEN_KEY,
  JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
  // mongodb
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  // gmail service
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  // firebase-admin
  TYPE: process.env.TYPE,
  PROJECT_ID: process.env.PROJECT_ID,
  PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
  PRIVATE_KEY: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
  CLIENT_EMAIL: process.env.CLIENT_EMAIL,
  CLIENT_ID: process.env.CLIENT_ID,
  AUTH_URI: process.env.AUTH_URI,
  TOKEN_URI: process.env.TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL: process.env.AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL: process.env.CLIENT_X509_CERT_URL,
  UNIVERSE_DOMAIN: process.env.UNIVERSE_DOMAIN
};
var _default = exports["default"] = env;