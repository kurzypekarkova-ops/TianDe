import { Video } from "./types";

export const PRODUCT_LINES = [
  "Active Life",
  "Altai Sacral",
  "Bio Rehab",
  "Botoluxe",
  "Collagen Active",
  "Dr. Taiga",
  "EcoDeViva",
  "Fucoidan",
  "Hadí řada",
  "Ling Zhi",
  "Master Herb",
  "My Family Care",
  "Phyto Code",
  "Snail Therapy",
  "Tibetan Herbs",
  "Vita Derm"
];

export const VIDEOS: Video[] = [
  {
    id: "1",
    title: "TianDe - Byznys příležitost",
    description: "Základní představení obchodního modelu TianDe.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
    category: "Byznys"
  },
  {
    id: "2",
    title: "Produktové školení: Detoxikace",
    description: "Jak správně používat detoxikační náplasti a čaje.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
    category: "Produkty"
  },
  {
    id: "3",
    title: "Péče o pleť s řadou Fucoidan",
    description: "Detailní pohled na omlazující účinky řady Fucoidan.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
    category: "Péče o pleť"
  }
];

export const SYSTEM_PROMPT = `
# IDENTITA A ROLE
Jsi **TianDe AI Asistent** – interní pomocník pro TOP lídry, spolupracovníky a nové členy sítě TianDe. Jednáš jako zkušený, empatický průvodce světem TianDe produktů a byznysu. Komunikuješ vždy v češtině, přátelsky, ale profesionálně.
Barvy a vizuální identita TianDe: bílá a modrá. Tvůj tón je pozitivní, motivující, podložený znalostmi.

# PILÍŘE APLIKACE ŠPECIFIKÁCIA
... (tu bude celý systémový prompt zo zadania)
`;

export const OBJECTIONS = [
  {
    id: "price",
    title: "Je to drahé",
    response: "Rozumím. Podívejme se na to z jiného úhlu – TianDe produkty jsou koncentrované a vysoce účinné. Jedno balení vydrží déle než běžná drogérie. Navíc jako člen získáváte slevu X %. Investice do zdraví se vyplatí víc než léky a lékaři…"
  },
  {
    id: "time",
    title: "Nemám čas",
    response: "Péče s TianDe zabere doslova 2–5 minut denně. Produkty jsou navrženy pro reálný život – rychlé aplikace, jednoduché protokoly..."
  },
  {
    id: "results",
    title: "Nevím, jestli to funguje",
    response: "Skvělá otázka! TianDe existuje přes 20 let a má miliony spokojených zákazníků. Ráda vám ukážu reference nebo doporučím startovací balíček, aby jste si mohli/a vyzkoušet..."
  },
  {
    id: "mlm",
    title: "Nemám zájem o MLM",
    response: "Rozumím vašim obavám. TianDe lze využívat čistě jako zákazník se slevou – není nutné nikoho oslovovat ani budovat síť. Mnozí členové jsou jen spokojení uživatelé produktů..."
  }
];
