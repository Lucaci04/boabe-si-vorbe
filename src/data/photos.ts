// Fotografii de pe Unsplash, toate verificate „Free to use under the Unsplash License” (nu Unsplash+).
// Licența nu cere atribuire, dar creditele apar în footer din respect pentru autori.
// https://unsplash.com/license

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  author: string;
  url: string;
}

export const photos = {
  roaster: {
    src: '/images/roaster.webp',
    alt: 'Boabe proaspăt prăjite care cad din tamburul prăjitorului în tava de răcire',
    width: 1100,
    height: 825,
    author: 'Yanapi Senaud',
    url: 'https://unsplash.com/photos/person-pouring-coffee-beans-on-a-machine-6HR8vpjYUHo',
  },
  hero: {
    src: '/images/hero-coffee.webp',
    alt: 'Cafea de filtru turnată dintr-un vas de sticlă într-o ceașcă de ceramică albă pătată',
    width: 1600,
    height: 1000,
    author: 'Gerson Cifuentes',
    url: 'https://unsplash.com/photos/person-pouring-water-on-white-ceramic-mug-irQsqR3vm8c',
  },
  'flat-white': {
    src: '/images/flat-white.webp',
    alt: 'Ceașcă albă de flat white cu latte art, ținută în palmă de barista',
    width: 640,
    height: 800,
    author: 'Di Bella Coffee',
    url: 'https://unsplash.com/photos/white-ceramic-coffee-cup-with-latte-art-s1-VmA26BIc',
  },
  'v60-ethiopia': {
    src: '/images/v60-ethiopia.webp',
    alt: 'Barista turnând apă din ibric peste un dripper V60, pe un blat de lemn deschis',
    width: 640,
    height: 800,
    author: 'Emma Smith',
    url: 'https://unsplash.com/photos/person-pouring-water-in-cup-GmEgxfWo8po',
  },
  'cardamom-bun': {
    src: '/images/cardamom-bun.webp',
    alt: 'Tavă cu chifle scandinave împletite, proaspăt coapte',
    width: 640,
    height: 800,
    author: 'Kamilla Isalieva',
    url: 'https://unsplash.com/photos/3IZq0613Llw',
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

export const photoFor = (id: string): Photo | undefined => (photos as Record<string, Photo>)[id];
