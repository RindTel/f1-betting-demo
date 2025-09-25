import { db } from "@lib/db";
import { races, drivers, odds } from "@lib/schema";
import DriverInfo from "@components/DriverInfo";
import { eq } from "drizzle-orm";

export default async function RacePage({ params }) {
  const raceId = parseInt(params.id, 10);
  if (Number.isNaN(raceId)) return <p>Invalid race ID.</p>;

  const race = await db
    .select()
    .from(races)
    .where(eq(races.id, raceId))
    .then((res) => res[0]);

  if (!race) return <p>Race not found.</p>;

  const raceDrivers = await db
    .select({
      driverId: drivers.id,
      name: drivers.name,
      team: drivers.team,
      odd: odds.odd,
    })
    .from(drivers)
    .innerJoin(odds, eq(odds.driver_id, drivers.id))
    .where(eq(odds.race_id, raceId));

  if (raceDrivers.length === 0) return <p>No drivers or odds found for this race.</p>;


  const raceDate =
    race.date instanceof Date
      ? race.date.toLocaleDateString()
      : race.date;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>{race.name}</h2>
      <p>{raceDate} – {race.location}</p>

      {raceDrivers.map((driver) => (
        <DriverInfo
          key={`${raceId}-${driver.driverId}`}
          driver={{
            id: driver.driverId,
            name: driver.name,
            team: driver.team,
            odd: driver.odd,
          }}
          raceId={raceId}
        />
      ))}
    </main>
  );
}