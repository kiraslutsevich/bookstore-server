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
  salt: parsedEnv.DB_SALT,
  hashAlgorithm: parsedEnv.DB_HASH_ALGORITHM,
  dbType: parsedEnv.DB_TYPE as 'postgres',
  dbHost: parsedEnv.DB_HOST,
  dbPort: +parsedEnv.DB_PORT,
  dbUserName: parsedEnv.DB_USERNAME,
  dbPassword: parsedEnv.DB_PASSWORD,
  dbDatabase: parsedEnv.DB_DATABASE,
};

export default config;
