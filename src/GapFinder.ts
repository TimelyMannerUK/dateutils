import { Interval, DateTime } from 'luxon';
import { DateObject, TimeSlot } from './types';

class GapFinder {
  constructor(private dateRange: TimeSlot[], private options: TimeSlot) {}

  /**
   * Get all available slots for the given range
   * @param {DateObject} configuration
   */
  public getSlots(configuration: DateObject): TimeSlot[] {
    // Create intervals from provided time slots
    const intervals = this.dateRange.map(slot =>
      Interval.fromDateTimes(
        DateTime.fromISO(slot.start),
        DateTime.fromISO(slot.end)
      )
    );
    // Merged timeslots for a smaller array
    const merged = Interval.merge(intervals);
    /**
     * Create a collection of timeslots from the
     * min and max with a slot size provided in configuration
     * i.e. 10 minutes, 1 hour, etc
     */
    const grid = Interval.fromDateTimes(
      DateTime.fromISO(this.options.start),
      DateTime.fromISO(this.options.end)
    ).splitBy({ [configuration.duration]: configuration.size });

    // Determine free slots
    const slots: TimeSlot[] = grid.map(range => {
      const overlaps = merged.some(m => range.overlaps(m));
      return {
        start: range.start.toISO(),
        end: range.end.toISO(),
        free: !overlaps
      };
    });

    return slots;
  }

  /**
   * Get all free slots
   * @param {DateObject} configuration
   */
  public getFreeSlots(configuration: DateObject): TimeSlot[] {
    return this.getSlots(configuration).filter(slot => slot.free);
  }
}

export default GapFinder;
