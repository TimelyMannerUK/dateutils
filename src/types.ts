export type DurationKey =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds';

export type DateObject = {
  size: number;
  duration: DurationKey;
};

export type TimeSlot = {
  start: string;
  end: string;
  free?: boolean;
};
