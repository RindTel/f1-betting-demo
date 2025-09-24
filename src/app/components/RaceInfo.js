import Link from 'next/link';

export default function RaceInfo({ race }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{race.name}</h3>
      <p>{race.date}</p>
      <Link href={`/race/${race.id}`}>View Details</Link>
    </div>
  );
}
