import { mysqlTable, serial, text, float, int, date } from "drizzle-orm/mysql-core";


export const races = mysqlTable("races", {
  id: serial("race_id").primaryKey(), // MySQL column is race_id
  name: text("name").notNull(),
  date: date("date").notNull(),
  circuit: text("circuit").notNull(),
});


export const drivers = mysqlTable("drivers", {
  id: serial("driver_id").primaryKey(),
  name: text("name").notNull(),
  team: text("team").notNull(),
});


export const odds = mysqlTable("odds", {
  id: serial("id").primaryKey(),
  race_id: int("race_id").references(() => races.id),
  driver_id: int("driver_id").references(() => drivers.id),
  odd: float("odd").notNull(),
});


export const bets = mysqlTable("bets", {
  id: serial("bet_id").primaryKey(), // map Drizzle `id` to MySQL `bet_id`
  race_id: int("race_id").references(() => races.id),
  driver_id: int("driver_id").references(() => drivers.id),
  amount: float("amount").notNull(),
});
