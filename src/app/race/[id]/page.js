import { db } from "@lib/db";
import { drivers, odds } from "@lib/schema";
import DriverInfo from "@components/DriverInfo";
import { eq } from "drizzle-orm";

export default async function RacePage({ params }) {
   const { id } = await params;  
  const raceId = parseInt(id);
  
  if (Number.isNaN(raceId)) return <p>Invalid race ID.</p>;

  
  const raceDrivers = await db
  .select({
    id: drivers.id,
    name: drivers.name,
    team: drivers.team,
    odd: odds.odd,
  })
  .from(drivers)
  .innerJoin(odds, eq(odds.driver_id, drivers.id))
  .where(eq(odds.race_id, raceId));

  // If no drivers found
  if (raceDrivers.length === 0) return <p>No drivers or odds found for this race.</p>;

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Race ID: {raceId}</h2>
      {raceDrivers.map((driver, idx) => (
        <DriverInfo
          key={`${raceId}-${driver.driverId}`} // unique key
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