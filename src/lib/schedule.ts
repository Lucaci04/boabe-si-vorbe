import { cafe, type OpeningHours, type Weekday } from '../data/cafe-config';

export interface OpenStatus {
  isOpen: boolean;
  afterClose: boolean;
  today: OpeningHours | undefined;
  label: string;
}

const WEEKDAYS: Record<string, Weekday> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Ziua și minutul curent în fusul orar al cafenelei, indiferent de fusul vizitatorului. */
export function localTime(now: Date, timeZone: string = cafe.timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    weekday: WEEKDAYS[get('weekday')],
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { weekday, minutes } = localTime(now);
  const today = cafe.hours[weekday];
  const isOpen = !!today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close);
  const afterClose = !!today && minutes >= toMinutes(today.close);
  const label = isOpen ? 'Deschis acum' : 'Închis acum';
  return { isOpen, afterClose, today, label };
}
