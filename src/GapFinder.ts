import { Interval, DateTime } from 'luxon';
import flatMap from 'lodash.flatmap';
import { DateObject, TimeSlot } from './types';
class GapFinder {
  constructor(private dateRange: TimeSlot[], private options: TimeSlot) {}

  /**
   * Get all available slots for the given range
   * @param {DateObject} configuration
   */
  public getSlots(configuration: DateObject, ranges?: TimeSlot[]): TimeSlot[] {
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
    const grid =
      typeof ranges === 'undefined'
        ? this.getGrid(this.options.start, this.options.end, configuration)
        : flatMap(ranges, ({ start, end }: TimeSlot) =>
            this.getGrid(start, end, configuration)
          );

    // Determine free slots
    const slots: TimeSlot[] = grid.map((range: Interval) => {
      const overlaps = merged.some(m => range.overlaps(m));
      return {
        start: range.start.toISO(),
        end: range.end.toISO(),
        free: !overlaps
      };
    });

    return slots;
  }
  //   [ { start: '2018-10-28T08:00:00.000',
  //   end: '2018-10-28T16:00:00.000' },
  // { start: '2018-10-29T09:00:00.000',
  //   end: '2018-10-29T17:00:00.000' },
  // { start: '2018-10-30T09:00:00.000',
  //   end: '2018-10-30T17:00:00.000' } ]
  private getGrid(start: string, end: string, configuration: DateObject) {
    return Interval.fromDateTimes(
      DateTime.fromISO(start),
      DateTime.fromISO(end)
    ).splitBy({ [configuration.duration]: configuration.size });
  }

  /**
   * Get all free slots
   * @param {DateObject} configuration
   */
  public getFreeSlots(
    configuration: DateObject,
    ranges?: TimeSlot[]
  ): TimeSlot[] {
    return this.getSlots(configuration, ranges).filter(slot => slot.free);
  }
}

export default GapFinder;
