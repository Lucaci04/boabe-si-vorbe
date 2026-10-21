// Catalog demo „Boabe & Vorbe” (PLAN §3.2–3.3).
// ATENȚIE: originile, valorile nutriționale și alergenii sunt date de exemplu.
// Înainte de lansare trebuie validate cu bucătăria (alergenii sunt obligatorii legal, Reg. UE 1169/2011).

export type Category = 'espresso' | 'brew' | 'patiserie';
export type Tag = 'VEGAN' | 'ORIGINE CONTROLATĂ' | 'LAPTE DE OVĂZ DISPONIBIL' | 'SEZONIER';

export interface Coffee {
  name: string;
  country: string;
  countryCode: string;
  farm: string;
  altitude: string;
  variety: string;
  process: string;
  sca: string;
  roast: string;
}

export interface MilkOption {
  id: string;
  label: string;
  surcharge: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  notes?: string[];
  tags: Tag[];
  featured?: { order: number; caption: string };
  coffee?: keyof typeof coffees;
  ingredients?: string;
  milk?: boolean;
  allergens: string[];
  nutrition: { kcal: number; portion: string };
}

export const categories: { id: Category; label: string; column: 1 | 2 }[] = [
  { id: 'espresso', label: 'Espresso & lapte', column: 1 },
  { id: 'brew', label: 'Brew', column: 2 },
  { id: 'patiserie', label: 'Patiserie', column: 2 },
];

export const columns = [
  { column: 1, title: 'Espresso & Milk' },
  { column: 2, title: 'Brew & Patiserie' },
] as const;

export const milkOptions: MilkOption[] = [
  { id: 'clasic', label: 'Lapte clasic', surcharge: 0 },
  { id: 'ovaz', label: 'Lapte de ovăz Oatly', surcharge: 0 },
  { id: 'mazare', label: 'Lapte de mazăre Sproud', surcharge: 2 },
];

export const coffees = {
  'ethiopia-guji': {
    name: 'Etiopia Guji',
    country: 'Etiopia',
    countryCode: 'ET',
    farm: 'Hambela Estate',
    altitude: '1.950 – 2.150 m',
    variety: 'Heirloom indigen',
    process: 'Naturală (uscată la soare pe paturi africane)',
    sca: '88.25 puncte',
    roast: 'Omniroast (ideal filtru & espresso modern)',
  },
  'kenya-nyeri': {
    name: 'Kenya Nyeri',
    country: 'Kenya',
    countryCode: 'KE',
    farm: 'Cooperativa Gatomboya',
    altitude: '1.750 – 1.850 m',
    variety: 'SL28, SL34',
    process: 'Spălată, fermentare dublă',
    sca: '87.5 puncte',
    roast: 'Light (filtru)',
  },
  'casa-blend': {
    name: 'Blend Casa „Vorbe”',
    country: 'Brazilia & Columbia',
    countryCode: 'BR · CO',
    farm: 'Fazenda Rainha & Finca La Esperanza',
    altitude: '1.100 – 1.800 m',
    variety: 'Yellow Bourbon, Castillo',
    process: 'Naturală & spălată',
    sca: '85 puncte',
    roast: 'Medium (espresso)',
  },
} satisfies Record<string, Coffee>;

export const products: Product[] = [
  // ── Coloana 1: Espresso & Milk ──
  {
    id: 'espresso-dublu',
    name: 'Espresso Dublu',
    category: 'espresso',
    price: 12,
    description: 'Note de cacao și alune de pădure',
    notes: ['cacao', 'alune de pădure', 'caramel'],
    tags: ['ORIGINE CONTROLATĂ'],
    coffee: 'casa-blend',
    allergens: [],
    nutrition: { kcal: 4, portion: '40 ml' },
  },
  {
    id: 'cortado',
    name: 'Cortado',
    category: 'espresso',
    price: 15,
    description: 'Raport 1:1 espresso și lapte dulce',
    tags: ['LAPTE DE OVĂZ DISPONIBIL'],
    coffee: 'casa-blend',
    milk: true,
    allergens: ['lapte'],
    nutrition: { kcal: 45, portion: '120 ml' },
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'espresso',
    price: 18,
    description: 'Espresso dublu, microspumă mătăsoasă',
    notes: ['ciocolată cu lapte', 'biscuit'],
    tags: ['LAPTE DE OVĂZ DISPONIBIL'],
    featured: { order: 1, caption: 'Lapte de ovăz disponibil' },
    coffee: 'casa-blend',
    milk: true,
    allergens: ['lapte'],
    nutrition: { kcal: 110, portion: '180 ml' },
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'espresso',
    price: 16,
    description: 'Spumă generoasă, ceașcă de porțelan cald',
    tags: ['LAPTE DE OVĂZ DISPONIBIL'],
    coffee: 'casa-blend',
    milk: true,
    allergens: ['lapte'],
    nutrition: { kcal: 95, portion: '180 ml' },
  },
  {
    id: 'latte',
    name: 'Caffè Latte',
    category: 'espresso',
    price: 17,
    description: 'Lapte mult, espresso blând, pentru dimineți lungi',
    tags: ['LAPTE DE OVĂZ DISPONIBIL'],
    coffee: 'casa-blend',
    milk: true,
    allergens: ['lapte'],
    nutrition: { kcal: 150, portion: '300 ml' },
  },
  {
    id: 'latte-lavanda',
    name: 'Latte cu miere și lavandă',
    category: 'espresso',
    price: 21,
    description: 'Miere de salcâm și sirop de lavandă făcut în casă',
    tags: ['SEZONIER', 'LAPTE DE OVĂZ DISPONIBIL'],
    coffee: 'casa-blend',
    milk: true,
    allergens: ['lapte'],
    nutrition: { kcal: 210, portion: '300 ml' },
  },
  {
    id: 'mocha',
    name: 'Mocha',
    category: 'espresso',
    price: 19,
    description: 'Ciocolată neagră 70% topită în espresso',
    tags: ['LAPTE DE OVĂZ DISPONIBIL'],
    coffee: 'casa-blend',
    milk: true,
    allergens: ['lapte', 'soia (urme)'],
    nutrition: { kcal: 240, portion: '300 ml' },
  },

  // ── Coloana 2: Brew & Patiserie ──
  {
    id: 'v60-ethiopia',
    name: 'V60 Etiopia Guji',
    category: 'brew',
    price: 24,
    description: 'Iasomie, bergamotă și caise uscate',
    notes: ['iasomie', 'bergamotă', 'caise uscate'],
    tags: ['ORIGINE CONTROLATĂ', 'VEGAN'],
    featured: { order: 2, caption: 'Iasomie · bergamotă · caise uscate' },
    coffee: 'ethiopia-guji',
    allergens: [],
    nutrition: { kcal: 5, portion: '250 ml' },
  },
  {
    id: 'aeropress-kenya',
    name: 'AeroPress Kenya Nyeri',
    category: 'brew',
    price: 22,
    description: 'Coacăze negre, grapefruit, corp suculent',
    notes: ['coacăze negre', 'grapefruit', 'tomate cherry'],
    tags: ['ORIGINE CONTROLATĂ', 'VEGAN'],
    coffee: 'kenya-nyeri',
    allergens: [],
    nutrition: { kcal: 5, portion: '220 ml' },
  },
  {
    id: 'cold-brew-tonic',
    name: 'Cold Brew Tonic',
    category: 'brew',
    price: 20,
    description: 'Infuzat la rece 16 ore, tonic artizanal',
    tags: ['VEGAN'],
    coffee: 'ethiopia-guji',
    allergens: [],
    nutrition: { kcal: 60, portion: '300 ml' },
  },
  {
    id: 'batch-brew',
    name: 'Batch Brew al zilei',
    category: 'brew',
    price: 13,
    description: 'Filtru proaspăt la fiecare oră, origine rotativă',
    tags: ['VEGAN'],
    coffee: 'kenya-nyeri',
    allergens: [],
    nutrition: { kcal: 5, portion: '250 ml' },
  },
  {
    id: 'croissant',
    name: 'Croissant cu unt',
    category: 'patiserie',
    price: 14,
    description: 'Aluat franțuzesc, 72 de straturi',
    tags: [],
    ingredients: 'Făină de grâu, unt 82%, lapte, ouă, zahăr, drojdie, sare.',
    allergens: ['gluten', 'lapte', 'ouă'],
    nutrition: { kcal: 310, portion: '75 g' },
  },
  {
    id: 'cardamom-bun',
    name: 'Cardamom & Cinnamon Bun',
    category: 'patiserie',
    price: 16,
    description: 'Patiserie scandinavă, aluat fermentat lent',
    tags: [],
    featured: { order: 3, caption: 'Aluat fermentat lent, 18 ore' },
    ingredients: 'Făină de grâu, unt, lapte, zahăr brun, cardamom verde, scorțișoară Ceylon, drojdie, sare.',
    allergens: ['gluten', 'lapte', 'ouă'],
    nutrition: { kcal: 340, portion: '90 g' },
  },
  {
    id: 'banana-bread',
    name: 'Banana bread vegan',
    category: 'patiserie',
    price: 15,
    description: 'Banane coapte, nuci, fără lactate sau ouă',
    tags: ['VEGAN'],
    ingredients: 'Banane, făină de grâu, zahăr de cocos, ulei de floarea-soarelui, nuci, bicarbonat, scorțișoară.',
    allergens: ['gluten', 'nuci'],
    nutrition: { kcal: 290, portion: '100 g' },
  },
];

export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => a.featured!.order - b.featured!.order);

export const columnOf = (category: Category) => categories.find((c) => c.id === category)!.column;

export const formatPrice = (value: number) => `${value} RON`;
