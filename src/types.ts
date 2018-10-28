import { DateTime } from 'luxon';

export type DateObject = {
  size: number;
  duration:
    | 'years'
    | 'months'
    | 'weeks'
    | 'days'
    | 'hours'
    | 'minutes'
    | 'seconds'
    | 'milliseconds';
};

export type TimeSlot = {
  start: string;
  end: string;
  free?: boolean;
};
