import { db } from "@lib/db";
import { races } from "@lib/schema";
import Link from "next/link";

export default async function Home() {
  const allRaces = await db.select().from(races);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>F1 Races</h1>
      <ul>
        {allRaces.map((race) => (
          <li key={race.id} style={{ marginBottom: "1rem" }}>
            <strong>{race.name}</strong> – {race.date} – {race.location}  
            <br />
            <Link href={`/race/${race.id}`}>View Race</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
