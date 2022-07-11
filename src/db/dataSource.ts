import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUserName,
  password: config.dbPassword,
  database: config.dbDatabase,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entity/*`],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
});

export const connect = () => {
  return AppDataSource.initialize();
};
