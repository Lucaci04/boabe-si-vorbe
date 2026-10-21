export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = duminică

export interface OpeningHours {
  open: string; // HH:MM
  close: string; // HH:MM
}

export const cafe = {
  name: 'Boabe & Vorbe',
  tagline: 'Cafenea de cartier cu prăjitorie proprie',
  timeZone: 'Europe/Bucharest',
  // Orar din PLAN §3.1: 07:30 – 20:00. Ziua lipsă = închis.
  hours: {
    0: { open: '07:30', close: '20:00' },
    1: { open: '07:30', close: '20:00' },
    2: { open: '07:30', close: '20:00' },
    3: { open: '07:30', close: '20:00' },
    4: { open: '07:30', close: '20:00' },
    5: { open: '07:30', close: '20:00' },
    6: { open: '07:30', close: '20:00' },
  } as Partial<Record<Weekday, OpeningHours>>,
} as const;

// Date de contact DEMO — înlocuiește cu adresa și telefonul reale înainte de lansare.
export const contact = {
  street: 'Strada Exemplu nr. 12',
  city: 'București, sector 2',
  phone: '+40 700 000 000',
  email: 'salut@exemplu.example',
  mapsQuery: 'Strada Exemplu 12 București',
};

export const facilities = [
  { label: 'Wi-Fi 6', detail: 'gratuit, fără limită de timp' },
  { label: 'Pet friendly', detail: 'apă proaspătă pentru patrupede' },
  { label: 'Prize la fiecare masă', detail: 'în zona workspace' },
  { label: 'Opțiuni vegane', detail: 'lapte vegetal fără cost extra' },
];

export const weekdayNames = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

export const navLinks = [
  { href: '#prajitoria', label: 'Prăjitoria' },
  { href: '#meniu', label: 'Meniu' },
  { href: '#rezervare', label: 'Rezervare' },
  { href: '#locatie', label: 'Unde suntem' },
] as const;
