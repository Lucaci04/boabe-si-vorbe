// Reguli de rezervare comune pentru wizard (client) și endpoint (server) — PLAN §3.4 și §4.
import { cafe } from '../data/cafe-config';
import { localTime } from './schedule';

export const zones = [
  { id: 'interior', label: 'Interior cald', description: 'Canapele moi, cărți și întâlniri calde' },
  { id: 'terasa', label: 'Terasă acoperită', description: 'Verdeață și aer curat de cartier' },
  { id: 'workspace', label: 'Bar workspace', description: 'Prize, Wi-Fi 6, lumină optimă de lucru' },
] as const;

export type ZoneId = (typeof zones)[number]['id'];

// guests_count salvat în DB = limita superioară a intervalului; „Grup 7+” se confirmă telefonic.
export const guestOptions = [
  { id: '1', label: '1', count: 1 },
  { id: '2', label: '2', count: 2 },
  { id: '3-4', label: '3-4', count: 4 },
  { id: '5-6', label: '5-6', count: 6 },
  { id: '7+', label: 'Grup 7+', count: 7 },
] as const;

export const timeSlots = ['09:00', '10:30', '14:00', '16:30', '18:30'] as const;

export const BOOKING_WINDOW_DAYS = 30;
export const SLOT_DURATION_MINUTES = 90;

export interface ReservationInput {
  zone: string;
  guests: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

export type FieldErrors = Partial<Record<keyof ReservationInput, string>>;

/** Data de azi (YYYY-MM-DD) în fusul orar al cafenelei. */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: cafe.timeZone }).format(now);
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Slot trecut (doar pentru ziua de azi) sau în afara orarului zilei. */
export function isSlotUnavailable(date: string, time: string, now: Date = new Date()): boolean {
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay() as keyof typeof cafe.hours;
  const hours = cafe.hours[weekday];
  if (!hours) return true;
  const slot = toMinutes(time);
  if (slot < toMinutes(hours.open) || slot + SLOT_DURATION_MINUTES > toMinutes(hours.close)) return true;
  if (date === todayISO(now)) return slot <= localTime(now).minutes;
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()./-]{8,25}$/;

export function validateContact(input: Pick<ReservationInput, 'name' | 'phone' | 'email' | 'notes'>): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  if (name.length < 3) errors.name = 'Scrie numele complet (minimum 3 caractere).';
  else if (name.length > 100) errors.name = 'Numele poate avea cel mult 100 de caractere.';
  if (!PHONE_RE.test(input.phone.trim()) || input.phone.replace(/\D/g, '').length < 8)
    errors.phone = 'Introdu un număr de telefon valid, de exemplu 0700 000 000.';
  const email = input.email.trim();
  if (!EMAIL_RE.test(email) || email.length > 120) errors.email = 'Introdu o adresă de e-mail validă, de exemplu nume@exemplu.example.';
  if ((input.notes ?? '').length > 500) errors.notes = 'Mențiunile pot avea cel mult 500 de caractere.';
  return errors;
}

export function validateReservation(input: ReservationInput, now: Date = new Date()): FieldErrors {
  const errors: FieldErrors = {};
  if (!zones.some((z) => z.id === input.zone)) errors.zone = 'Alege o zonă.';
  if (!guestOptions.some((g) => g.id === input.guests)) errors.guests = 'Alege numărul de oaspeți.';

  const today = todayISO(now);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || input.date < today || input.date > addDaysISO(today, BOOKING_WINDOW_DAYS))
    errors.date = `Alege o dată între azi și următoarele ${BOOKING_WINDOW_DAYS} de zile.`;

  if (!(timeSlots as readonly string[]).includes(input.time)) errors.time = 'Alege un interval orar.';
  else if (!errors.date && isSlotUnavailable(input.date, input.time, now)) errors.time = 'Intervalul ales nu mai este disponibil.';

  return { ...errors, ...validateContact(input) };
}

export function zoneLabel(id: string) {
  return zones.find((z) => z.id === id)?.label ?? id;
}

export function guestsLabel(id: string) {
  const option = guestOptions.find((g) => g.id === id);
  if (!option) return id;
  return option.id === '7+' ? 'grup de 7+ persoane' : `${option.label} ${option.count === 1 ? 'persoană' : 'persoane'}`;
}

export function formatDateRo(iso: string) {
  return new Intl.DateTimeFormat('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T12:00:00Z`));
}
