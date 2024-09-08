
import { registerAs } from '@nestjs/config';

export enum ConfigKey {
  App = 'APP',
  Db = 'DB',
}

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Testing = 'testing',
}

const APPConfig = registerAs(
  ConfigKey.App, () => ({
    env:
      Environment[process.env.NODE_ENV as keyof typeof Environment] ||
      Environment.Development,
    port: Number(process.env.APP_PORT) || 3000,
    seeds: process.env.RUN_SEED || true,
    appName: process.env.APP_NAME || 'grants-backend',
  }),
);

const DBConfig = registerAs(
  ConfigKey.Db, () => ({
    host: process.env.DATABASE_HOST || '0.0.0.0', 
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.DATABASE || 'opportunities',
  }),
);

export const configurations = [APPConfig, DBConfig];