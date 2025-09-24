import { db } from "@lib/db";
import { races, drivers, odds } from "@lib/schema";

async function main() {
  
  await db.insert(races).values([
    { name: "Monaco GP", date: "2025-05-25", location: "Monaco" },
    { name: "Silverstone GP", date: "2025-07-07", location: "UK" },
  ]);

 
  await db.insert(drivers).values([
    { name: "Max Verstappen", team: "Red Bull" },
    { name: "Lewis Hamilton", team: "Ferrari" },
    { name: "Charles Leclerc", team: "Ferrari" },
    { name: "Lando Norris", team: "McLaren" },
  ]);

  
  await db.insert(odds).values([
    { race_id: 1, driver_id: 1, odd: 2.1 },
    { race_id: 1, driver_id: 2, odd: 3.5 },
    { race_id: 2, driver_id: 3, odd: 2.8 },
    { race_id: 2, driver_id: 4, odd: 4.2 },
  ]);

  console.log("Database seeded!");
}

main()
  .catch(console.error)
  .finally(() => process.exit());
