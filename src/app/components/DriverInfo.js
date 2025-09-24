'use client';

import { useState } from 'react';
import BetModal from './BetModal'; // make sure this path is correct

export default function DriverInfo({ driver, raceId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ border: '1px solid #aaa', padding: '0.5rem', marginBottom: '0.5rem' }}>
      {driver.name} - {driver.team} - Odds: {driver.odd}
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => setIsModalOpen(true)}>Place Bet</button>
      </div>

      {isModalOpen && (
        <BetModal
          driver={driver}
          raceId={raceId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
