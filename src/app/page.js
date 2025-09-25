import { db } from "@lib/db";
import { races } from "@lib/schema";
import Link from "next/link";

export default async function Home() {
  let allRaces = [];
  try {
    allRaces = await db.select().from(races);
  } catch (err) {
    console.error("Failed to fetch races:", err);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>F1 Races</h1>

      {allRaces.length === 0 ? (
        <p>No races found.</p>
      ) : (
        <ul>
          {allRaces.map((race) => {
            
            const raceDate = race.date instanceof Date
              ? race.date.toLocaleDateString()
              : race.date;

            return (
              <li key={race.id} style={{ marginBottom: "1rem" }}>
                <strong>{race.name}</strong> – {raceDate} – {race.location}  
                <br />
                <Link href={`/race/${race.id}`}>View Race</Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
