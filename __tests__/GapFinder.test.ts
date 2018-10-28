import { GapFinder } from '../src';
import { TimeSlot } from '../src/types';

describe('GapFinder', () => {
  let config: TimeSlot;
  beforeAll(() => {
    config = {
      start: '2018-01-01T00:00:00Z',
      end: '2018-01-01T02:00:00Z'
    };
  });
  test('should find correct amount of gaps in a range of dates 10 minute gaps', () => {
    const range = [
      { start: '2018-01-01T00:00:00Z', end: '2018-01-01T00:30:00Z' },
      { start: '2018-01-01T01:00:00Z', end: '2018-01-01T01:30:00Z' }
    ];

    const gapFinder = new GapFinder(range, config);
    const result = gapFinder.getFreeSlots({ size: 10, duration: 'minutes' });
    expect(result).toHaveLength(6);
  });
  test('should find correct amount of gaps in a range of dates 30 minute gaps', () => {
    const range = [
      { start: '2018-01-01T00:00:00Z', end: '2018-01-01T00:30:00Z' },
      { start: '2018-01-01T01:00:00Z', end: '2018-01-01T01:30:00Z' }
    ];

    const gapFinder = new GapFinder(range, config);
    const result = gapFinder.getFreeSlots({ size: 30, duration: 'minutes' });
    expect(result).toHaveLength(2);
  });

  test('should find return correct amount of slots', () => {
    const range = [
      { start: '2018-01-01T00:00:00Z', end: '2018-01-01T00:30:00Z' },
      { start: '2018-01-01T01:00:00Z', end: '2018-01-01T01:30:00Z' }
    ];

    const gapFinder = new GapFinder(range, config);
    const result = gapFinder.getSlots({ size: 30, duration: 'minutes' });
    expect(result).toHaveLength(4);
  });
  test('should find no gaps when all slots are filled', () => {
    const range = [
      { start: '2018-01-01T00:00:00Z', end: '2018-01-01T00:30:00Z' },
      { start: '2018-01-01T00:30:00Z', end: '2018-01-01T01:00:00Z' },
      { start: '2018-01-01T01:00:00Z', end: '2018-01-01T01:30:00Z' },
      { start: '2018-01-01T01:30:00Z', end: '2018-01-01T02:00:00Z' }
    ];

    const gapFinder = new GapFinder(range, config);
    const result = gapFinder.getFreeSlots({ size: 30, duration: 'minutes' });
    expect(result).toHaveLength(0);
  });
});
