import { db } from '@lib/db';
import { bets } from '@lib/schema';

export async function POST(req) {
  try {
    const { raceId, driverId, amount } = await req.json();

    if (!raceId || !driverId || !amount) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.insert(bets).values({
      race_id: raceId,
      driver_id: driverId,
      amount,
    });

    return new Response('Bet placed successfully', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}
