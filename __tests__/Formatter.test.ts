import { getDateTimeFromDuration } from '../src';
import {
  getDateWithStartAndEndTime,
  normaliseDate,
  getDateRangeWithStartAndEndTime
} from '../src/Formatter';
import { DurationKey } from '../src/types';
describe('Formatter', () => {
  test('should add duration to provided datetime', () => {
    const datetime = '2018-01-01T00:00:00';
    const seconds = 3600; // 1 hour
    const result = getDateTimeFromDuration(datetime, seconds);
    expect(result).toEqual('2018-01-01T01:00:00');
  });
});

describe('getDateWithStartAndEndTime', () => {
  test('should return a start and end value for the specified date', () => {
    const datetime = '2018-01-01T13:00:00';
    const key = 'seconds';
    const startTime = 32400; // 9 am in seconds
    const endTime = 61200; // 5 pm in seconds

    const { start, end } = getDateWithStartAndEndTime(datetime, {
      startTime,
      endTime,
      format: key
    });
    expect(start).toContain('2018-01-01T09:00:00');
    expect(end).toContain('2018-01-01T17:00:00');
  });
  test('should return a start and end value for the specified date hour format', () => {
    const datetime = '2018-01-01T13:00:00';
    const key: DurationKey = 'hours';
    const startTime = 9;
    const endTime = 17;

    const { start, end } = getDateWithStartAndEndTime(datetime, {
      startTime,
      endTime,
      format: key
    });
    expect(start).toContain('2018-01-01T09:00:00');
    expect(end).toContain('2018-01-01T17:00:00');
  });
});

describe('normalizeDate', () => {
  test('should return the start of a given date', () => {
    const datetime = '2018-01-01T13:00:00';
    const result = normaliseDate(datetime).toISO({ includeOffset: false });
    expect(result).toContain('2018-01-01T00:00:00');
  });
});

describe('getDateRangeWithStartAndEndTime', () => {
  test('should return range of dates with time range', () => {
    const startDate = '2018-01-01T00:00:00';
    const endDate = '2018-01-03T00:00:00';
    const key = 'hours';
    const startTime = 9;
    const endTime = 17;

    const range = getDateRangeWithStartAndEndTime(startDate, endDate, {
      startTime,
      endTime,
      format: key
    });

    expect(range).toHaveLength(3);
    expect(range[0].start).toContain('2018-01-01T09:00:00');
    expect(range[0].end).toContain('2018-01-01T17:00:00');
    expect(range[2].start).toContain('2018-01-03T09:00:00');
    expect(range[2].end).toContain('2018-01-03T17:00:00');
  });
});
