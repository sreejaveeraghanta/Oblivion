import dotenv from 'dotenv';
dotenv.config();

export default {
  "dev": {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'oblivion_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as const,
  }
};