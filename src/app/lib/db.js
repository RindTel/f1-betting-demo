
import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@lib/schema"; 
const pool = createPool({
  host: "127.0.0.1",
  user: "your-username",          
  password: "your-password",  
  database: "f1betsdb",
});

export const db = drizzle(pool, { schema, mode: "default" });