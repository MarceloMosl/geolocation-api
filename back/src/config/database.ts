import pg, { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let db: Pool | undefined;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

export async function connectDb(): Promise<void> {
   db = new pg.Pool(configDatabase);
   await db.connect();
}

export async function disconnectDb(): Promise<void> {
   if (db) {
      await db.end();
      db = undefined;
   }
}

export { db };
