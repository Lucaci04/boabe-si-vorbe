// Lotul zilei — DATE DEMONSTRATIVE. Profilul de prăjire e construit de mână pentru demo,
// nu e înregistrat de pe un prăjitor real.
import { coffees } from './menu';

export interface RoastSample {
  t: number; // secunde de la încărcare
  bt: number; // temperatura boabelor, °C
  ror: number | null; // rata de creștere, °C/min (nedefinită înainte de punctul de întoarcere)
}

export interface RoastEvent {
  t: number;
  label: string;
}

export interface RoastPhase {
  name: string;
  from: number;
  to: number;
  text: string;
}

export const lot = {
  number: '0418',
  weightKg: 12,
  roastedAt: '07:12',
  coffee: coffees['ethiopia-guji'],
};

export const samples: RoastSample[] = [
  { t: 0, bt: 200, ror: null },
  { t: 30, bt: 141, ror: null },
  { t: 60, bt: 101, ror: null },
  { t: 70, bt: 92, ror: null },
  { t: 90, bt: 95, ror: 22 },
  { t: 120, bt: 105, ror: 20.5 },
  { t: 150, bt: 115, ror: 19 },
  { t: 180, bt: 124, ror: 17.5 },
  { t: 210, bt: 132, ror: 16 },
  { t: 240, bt: 140, ror: 15 },
  { t: 270, bt: 147, ror: 14 },
  { t: 300, bt: 155, ror: 13 },
  { t: 330, bt: 161, ror: 12.2 },
  { t: 360, bt: 167, ror: 11.4 },
  { t: 390, bt: 172, ror: 10.7 },
  { t: 420, bt: 177, ror: 10 },
  { t: 450, bt: 182, ror: 9.4 },
  { t: 480, bt: 187, ror: 8.8 },
  { t: 510, bt: 192, ror: 8.2 },
  { t: 522, bt: 196, ror: 7.9 },
  { t: 540, bt: 199, ror: 7.6 },
  { t: 570, bt: 203, ror: 7 },
  { t: 600, bt: 207, ror: 6.4 },
  { t: 630, bt: 211, ror: 5.8 },
];

export const events: RoastEvent[] = [
  { t: 0, label: 'Încărcare' },
  { t: 70, label: 'Punct de întoarcere' },
  { t: 300, label: 'Sfârșitul uscării' },
  { t: 522, label: 'Primul crack' },
  { t: 630, label: 'Scoatere' },
];

export const phases: RoastPhase[] = [
  {
    name: 'Uscare',
    from: 0,
    to: 300,
    text: 'Boabele verzi pierd apa. Dacă grăbim pasul ăsta, gustul iese tulbure.',
  },
  {
    name: 'Maillard',
    from: 300,
    to: 522,
    text: 'Se formează dulceața și corpul: caramel, cacao, coajă de pâine.',
  },
  {
    name: 'Dezvoltare',
    from: 522,
    to: 630,
    text: 'După primul crack contează fiecare secundă. Scoatem devreme, ca aroma să rămână florală.',
  },
];

export const ROAST_END = 630;
export const BT_MIN = 80;
export const BT_MAX = 220;

export const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export const phaseAt = (t: number) => phases.find((p) => t >= p.from && t <= p.to)?.name ?? '';

export const developmentRatio = () => {
  const crack = events.find((e) => e.label === 'Primul crack')!.t;
  return Math.round(((ROAST_END - crack) / ROAST_END) * 100);
};
