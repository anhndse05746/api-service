import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['src/modules/**/**/*.entity{.ts,.js}'],
  migrations: ['src/modules/database/migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscribers/**/*.ts'],
});
