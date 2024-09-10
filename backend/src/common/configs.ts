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

const APPConfig = registerAs(ConfigKey.App, () => ({
  env:
    Environment[process.env.NODE_ENV as keyof typeof Environment] ||
    Environment.Development,
  port: Number(process.env.APP_PORT) || 3000,
  seeds: process.env.RUN_SEED || true,
  appName: process.env.APP_NAME || 'grants-backend',
}));

const DBConfig = registerAs(ConfigKey.Db, () => ({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}));

export const configurations = [APPConfig, DBConfig];
