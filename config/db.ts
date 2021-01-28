import dotenv from 'dotenv';

dotenv.config();

interface IDbConfig {
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  dialect: 'postgres';
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

export const dbConfig: IDbConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  dialect: 'postgres',
};
