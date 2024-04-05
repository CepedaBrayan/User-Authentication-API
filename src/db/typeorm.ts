import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

export const dbDataSource: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dbDataSource);
export default dataSource;
