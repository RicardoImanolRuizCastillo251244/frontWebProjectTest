import { describe, expect, it } from 'vitest';
import { filterMatches, sortMatchesByDate } from './mockMatches';

describe('mockMatches helpers', () => {
  const matches = [
    {
      id: 'a',
      sport: 'Futbol',
      homeTeam: { id: '1', name: 'A' },
      awayTeam: { id: '2', name: 'B' },
      date: '2026-04-15T18:00:00.000Z',
      time: '18:00',
      location: { id: '1', name: 'Norte', address: 'x', city: 'Monterrey' },
      participants: 10,
      maxParticipants: 22,
      status: 'scheduled' as const,
    },
    {
      id: 'b',
      sport: 'Basquetbol',
      homeTeam: { id: '3', name: 'C' },
      awayTeam: { id: '4', name: 'D' },
      date: '2026-04-10T18:00:00.000Z',
      time: '20:00',
      location: { id: '2', name: 'Sur', address: 'y', city: 'Guadalajara' },
      participants: 8,
      maxParticipants: 10,
      status: 'ongoing' as const,
    },
  ];

  it('filters by sport and city', () => {
    const filtered = filterMatches(matches, { sport: 'Futbol', city: 'Monterrey' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('a');
  });

  it('sorts by ascending date', () => {
    const sorted = sortMatchesByDate(matches);
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('a');
  });
});
