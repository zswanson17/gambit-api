export const db = {
  type: process.env.DB_TYPE || 'postgres',
  name: process.env.DB_NAME || 'gambit',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '4749'),
  user: process.env.DB_USER || 'gambit-admin',
  password: process.env.DB_PASSWORD || 'aceOfSPADES^^00'
};
