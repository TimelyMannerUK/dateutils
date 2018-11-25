import { DateTime, Duration } from 'luxon';
import { DurationKey } from './types';
/**
 * Get date time from duration
 * @param {number} duration - Duration in seconds
 */
export const getDateTimeFromDuration = (datetime: string, duration: number) => {
  const dateObj = DateTime.fromISO(datetime);
  const durationObj = Duration.fromObject({ seconds: duration });
  return dateObj
    .plus(durationObj)
    .toISO({ includeOffset: false, suppressMilliseconds: true });
};

export interface TimeRange {
  startTime: number;
  endTime: number;
  format: DurationKey;
}

/**
 * Mutates a date with the specified time range
 *  e.g. For a given date, return a stores opening and closing hours
 * @param date
 * @param timeRange
 */
export function getDateWithStartAndEndTime(date: string, timeRange: TimeRange) {
  const startDuration = Duration.fromObject({
    [timeRange.format]: timeRange.startTime
  });
  const endDuration = Duration.fromObject({
    [timeRange.format]: timeRange.endTime
  });
  const start = normaliseDate(date)
    .plus(startDuration)
    .toISO({ includeOffset: false });
  const end = normaliseDate(date)
    .plus(endDuration)
    .toISO({ includeOffset: false });
  return { start, end };
}

/**
 * Generates a range of dates mutated with a start and end date
 * @param startDate Start date ISO string
 * @param endDate End Date ISO string
 * @param timeRange
 */

export function getDateRangeWithStartAndEndTime(
  startDate: string,
  endDate: string,
  timeRange: TimeRange
) {
  const normalisedStart = normaliseDate(startDate);
  const normalisedEnd = normaliseDate(endDate);
  const dates = [];
  let cursor = normalisedStart;
  while (cursor <= normalisedEnd) {
    dates.push(cursor);
    cursor = cursor.plus({ days: 1 });
  }

  return dates.map((date: DateTime) => {
    return getDateWithStartAndEndTime(
      date.toISO({ includeOffset: false }),
      timeRange
    );
  });
}

/**
 * Returns the start of day for a specified ISO date
 * @param date - ISO Date
 */
export function normaliseDate(date: string) {
  return DateTime.fromISO(date).startOf('day');
}
