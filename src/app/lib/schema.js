import { mysqlTable, serial, text, float, int } from "drizzle-orm/mysql-core";

export const races = mysqlTable("races", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
});

export const drivers = mysqlTable("drivers", {
  id: serial("id").primaryKey(),
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
  id: serial("id").primaryKey(),
  race_id: int("race_id").references(() => races.id),
  driver_id: int("driver_id").references(() => drivers.id),
  amount: float("amount").notNull(),
});
