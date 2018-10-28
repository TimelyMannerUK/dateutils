# Timely Manner Date Utils

A collection of utilities for working with dates used by Timely Manner

This is a WIP and probably not much use to anyone. Probably buggy too.

<h2 align="center">
Gap Finder
</h2>

### Details

Gap finder is a tool for finding free slots in a given range of Date Times. For example finding free slots for a given day, which don't have any appointments.
Example: On 21st June 2018 a store is open from 09:00 AM to 17:00PM. You the store has appointments all day except between 13:00 PM and 14:30 PM. Appointments can be booked in 30 minute slots.
`GapFinder.getFreeSlots(slotSize:DateObject)` will return 3 slots:

- 13:00 - 13:30
- 13:30 - 14:00
- 14:00 - 14:30

### Code

```typescript
const operatingHours: TimeSlot = {
  start: '2018-06-21T09:00:00',
  end: '2018-06-21T09:00:00'
};

const appointments: TimeSlot[] = [
  // ...appointments
  {
    start: '2018-06-21T12:00:00',
    end: '2018-06-21T12:30:00'
  }
];

const gapFinder = new GapFinder(appointments, operatingHours);

const slotSize: DateObject = { duration: 'minutes', size: 30 };

const freeSlots = gapFinder.getFreeSlots(slotSize);

// freeSlots: [{start:string, end:string, free:true}]
```
