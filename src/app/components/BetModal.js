'use client';

import { useState } from 'react';

export default function BetModal({ driver, raceId, onClose }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBet() {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage('Enter a valid amount');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raceId,
          driverId: driver.id,
          amount: parseFloat(amount),
        }),
      });

      if (res.ok) {
        setMessage('Bet placed!');
        setAmount('');
      } else {
        const text = await res.text();
        setMessage(`Error: ${text}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '300px' }}>
        <h3>Place Bet on {driver.name}</h3>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={handleBet} disabled={loading} style={{ width: '100%', marginBottom: '0.5rem' }}>
          {loading ? 'Placing...' : 'Place Bet'}
        </button>
        <button onClick={onClose} style={{ width: '100%' }}>Cancel</button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
}
