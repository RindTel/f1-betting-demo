
import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@lib/schema"; 


export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',           // placeholder username
  password: 'password',   // placeholder password
  database: 'f1bets',
});
 
export const db = drizzle(pool, { schema, mode: "default" });
