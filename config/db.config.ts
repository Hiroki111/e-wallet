import dotenv from 'dotenv';

dotenv.config();

interface IDbConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: 'postgres';
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const dbConfig: IDbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'postgres',
};

export { dbConfig };
