import dotenv from 'dotenv';
import path from 'path';

const localConfig = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultConfig = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed;

if (!localConfig) {
  console.warn('.env file missed');
}

const parsedEnv = {
  ...defaultConfig,
  ...localConfig,
};

const config = {
  port: +parsedEnv.PORT,
  tokenSecretKey: parsedEnv.TOKEN_SECRET_KEY,
  accessExpires: parsedEnv.ACCESS_EXPIRES,
  refreshExpires: parsedEnv.REFRESH_EXPIRES,
  salt: parsedEnv.SALT,
  hashAlgorithm: parsedEnv.HASH_ALGORITHM,
  db: {
    type: parsedEnv.DB_TYPE as 'postgres',
    host: parsedEnv.DB_HOST,
    port: +parsedEnv.DB_PORT,
    userName: parsedEnv.DB_USERNAME,
    password: parsedEnv.DB_PASSWORD,
    database: parsedEnv.DB_DATABASE,
    logging: JSON.parse(parsedEnv.DB_LOGGING),
  },
};

export default config;
