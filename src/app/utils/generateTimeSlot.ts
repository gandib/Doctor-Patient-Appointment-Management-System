/* eslint-disable prefer-const */
export function generateTimeSlots(
  timeRange: string,
  intervalMinutes = 30,
): string[] {
  const slots: string[] = [];

  // Validate and split the range
  const parts = timeRange.split('-');
  if (parts.length !== 2) {
    throw new Error(
      "Invalid time range format. Use 'HH:MM AM/PM - HH:MM AM/PM'",
    );
  }

  const [startTime, endTime] = parts.map((t) => t.trim());

  const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}:00`);
  const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}:00`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid time provided.');
  }

  while (start < end) {
    slots.push(
      start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    );
    start.setMinutes(start.getMinutes() + intervalMinutes);
  }

  return slots;
}

function convertTo24Hour(time12h: string): string {
  if (!time12h || typeof time12h !== 'string' || !time12h.includes(' ')) {
    throw new Error("Invalid time format. Expected something like '10:00 AM'");
  }

  const [time, modifier] = time12h.trim().split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
