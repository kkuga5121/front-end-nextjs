import { Duration, intervalToDuration } from 'date-fns';

export function formatShortDistanceToNow(date:any) {
  const duration:Duration = intervalToDuration({ start: new Date(date), end: new Date() });

  // Define an array of time units to check in order of priority
   const timeUnits: { unit: keyof Duration; suffix: string }[] = [
    { unit: 'years', suffix: 'y' },
    { unit: 'months', suffix: 'mo' },
    { unit: 'days', suffix: 'd' },
    { unit: 'hours', suffix: 'h' },
    { unit: 'minutes', suffix: 'm' },
  ];

   // Iterate over time units to find the first one with a non-zero value
   for (const { unit, suffix } of timeUnits) {
    if (duration[unit] && duration[unit]! > 0) {
      return `${duration[unit]}${suffix} ago`;
    }
  }

  // Fallback if all units are zero
  return 'Just now';
}