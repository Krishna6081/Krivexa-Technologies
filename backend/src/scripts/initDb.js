import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_GuVA2BS4ZWfn@ep-morning-dawn-ayxk72bx-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require';

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  console.log('🔌 Connecting to Neon PostgreSQL database...');
  try {
    const schemaPath = path.resolve(import.meta.dirname, '../../../database/schema.sql');
    const seedPath = path.resolve(import.meta.dirname, '../../../database/seed.sql');

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    console.log('⚙️ Creating database tables and indexes...');
    await pool.query(schemaSql);

    console.log('🌱 Seeding initial admin credentials & data...');
    await pool.query(seedSql);

    console.log('✅ Neon PostgreSQL Database Initialized Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    process.exit(1);
  }
}

initDatabase();
