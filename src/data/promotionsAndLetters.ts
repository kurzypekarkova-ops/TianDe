export interface PromotionDetail {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  rules: string[];
  steps: string[];
  proTip: string;
  expertQuote: string;
}

export interface LetterTemplate {
  id: string;
  title: string;
  description: string;
  subject: string;
  text: string;
  tips: string;
  placeholders: string[];
}

export const CORPORATE_PROMOTIONS: Record<string, PromotionDetail> = {
  decoins: {
    id: "decoins",
    title: "Věrnostní program (De-coiny)",
    tagline: "Nakupujte s radostí, sbírejte body a vyměňujte je za dárky zdarma",
    badge: "🎁 Věrnost",
    description: "Věrnostní program tianDe je jedinečný nástroj, který odměňuje každého registrovanéhoVIP zákazníka i partnera za jeho pravidelné nákupy. Za nákupy vybraných produktů získáváte body, takzvané De-coiny, které se ukládají na váš osobní účet. Tyto De-coiny pak můžete přímo v objednávkovém rozhraní vyměnit za plnohodnotné tianDe produkty zcela zdarma.",
    rules: [
      "De-coiny se připisují na VIP účet automaticky po zaplacení objednávky.",
      "Platnost nasbíraných De-coinů je 12 měsíců od jejich připsání.",
      "Body, které do 12 měsíců neuplatníte, nevratně propadnou (expirují).",
      "Své body vidíte přehledně po přihlášení na oficiálním e-shopu v horním menu u své peněženky."
    ],
    steps: [
      "Pravidelně nakupujte své oblíbené produkty (šampony, čaje, krémy, eko prací program).",
      "Sledujte nárůst De-coinů ve své klientské zóně tianDe.",
      "V detailech profilu kontrolujte datum expirace, abyste o své nastřádané De-coiny nepřišli.",
      "Při vytváření další objednávky klikněte na 'Uplatnit De-coiny' a vyberte si své dárky.",
      "Lídři: Pravidelně sledujte ve svých sestavách 'vypadlíky' s De-coiny a pomáhejte jim body včas uplatnit!"
    ],
    proTip: "De-coiny fungují jako perfektní otevírač konverzace pro neaktivní zákaznice. Když jim zavoláte nebo napíšete, že u nich v systému vidíte propadající body, za které mohou mít krém zdarma, získáte okamžitou a vděčnou reakci.",
    expertQuote: "Věrnostní program tianDe je náš tajný trumf. Lidé milují dárky, a když jim pomůžete zachránit jejich De-coiny, vybudujete si u nich dlouhodobou důvěru a loajalitu."
  },
  travel: {
    id: "travel",
    title: "Dovolená za korunu / Cestovní program",
    tagline: "Cestujte do exotických koutů světa a k moři s tianDe",
    badge: "✈️ Cestování",
    description: "Chcete zažít nezapomenutelnou dovolenou u moře nebo v asijských fytocentrech a přitom za cestu zaplatit doslova jen pár korun? tianDe každoročně vyhlašuje prestižní Cestovní promo kampaň (např. 'Dovolená u moře za koruny'). Je to motivační program pro partnery, kteří chtějí růst, doporučovat produkty a pomáhat ostatním k lepším výsledkům.",
    rules: [
      "Do programu se může zapojit každý registrovaný partner od úrovně Konzultant.",
      "Sleduje se nárůst obratu struktury (v bodech) za stanovené období (obvykle 6 až 9 měsíců).",
      "Je nutné udržet minimální osobní obrat 150 bodů (cca 4 500 Kč) v každém sledovaném měsíci.",
      "Při splnění 100 % kritérií hradí společnost tianDe ubytování, letenku, stravu i bohatý program."
    ],
    steps: [
      "Zaregistrujte se a aktivujte svůj osobní profil u tianDe.",
      "Proberte se svým sponzorem a lídrem podmínky aktuálně vyhlášeného cestovního promo programu.",
      "Nastavte si měsíční plán růstu počtu nových členů ve struktuře a navyšování celkových bodů.",
      "Zajistěte, aby vaši noví partneři duplikovali vaše úspěšné kroky (Škola byznysu).",
      "Dosáhněte cílové bodové mety a získejte letenku do luxusního resortu za symbolickou 1 Kč!"
    ],
    proTip: "Cesta za korunu není jen o odpočinku. Je to nejlepší marketingový materiál! Fotky a videa z luxusní dovolené s logy tianDe na sociálních sítích přitáhnou desítky nových zájemců o byznys samy od sebe.",
    expertQuote: "S tianDe jsem procestovala nádherná místa, o kterých se mi dříve ani nesnilo. Ta energie ze setkání s dalšími úspěšnými ženami na pláži je nepopsatelná a nakopne váš byznys na další měsíce."
  },
  autopromotion: {
    id: "autopromotion",
    title: "tianDe Auto-bonus program",
    tagline: "Splňte si sen o novém, moderním a bezpečném autě s logy tianDe",
    badge: "🚗 Autopromotion",
    description: "Reprezentujte tianDe na cestách! Auto-bonus program je určen pro ambiciózní lídry, kteří budují stabilní struktury a chtějí jezdit ve zbrusu novém autě. Společnost tianDe podporuje vaše úsilí měsíčními finančními příspěvky na nákup nebo splátky automobilu navíc k vašim běžným marketingovým provizím.",
    rules: [
      "Program je určen pro partnery, kteří dosáhli a potvrdili status Manažer / Ředitel.",
      "Skupinový obrat struktury musí dosáhnout minimálně 5 000 až 10 000 bodů měsíčně.",
      "Podmínku stabilního obratu je nutné udržet po dobu 3-6 po sobě jdoucích měsíců.",
      "tianDe vyplácí bonusy od 4 000 Kč až do 18 000 Kč měsíčně po dobu až 3 let podle dosažené úrovně."
    ],
    steps: [
      "Stabilizujte svůj měsíční prodej a pomozte alespoň 3-5 lidem v týmu dosáhnout stabilního příjmu.",
      "Sledujte vyhlášení nejbližšího cyklu Auto-bonusu a odešlete přihlášku na centrálu.",
      "Splňte a potvrďte potřebnou manažerskou úroveň podle tabulky.",
      "Pořiďte si vůz, polepte jej elegantními firemními materiály tianDe a zašlete fotodokumentaci.",
      "Užívejte si měsíční vyplácení auto-bonusu přímo na váš účet!"
    ],
    proTip: "Polepené auto funguje jako jezdící billboard. Zelená barva tianDe přitahuje pohledy na parkovištích u nákupních center a v lidech vyvolává zvědavost a otázky: 'Co to je tianDe?'",
    expertQuote: "Když jsem poprvé usedla do vozu s firemním polepem, tekly mi slzy štěstí. Byl to hmatatelný důkaz, že má práce má smysl a že mě firma tianDe dokáže královsky ocenit."
  }
};

export const DECOINS_GIFTS = [
  { threshold: 10, gift: "Hojivá pleťová maska s mumiem / zeleným čajem", valueEst: "cca 60 Kč", decoinsNeeded: 10 },
  { threshold: 25, gift: "Bylinné gelové vložky 'Nefritová svěžest' (denní)", valueEst: "cca 160 Kč", decoinsNeeded: 25 },
  { threshold: 40, gift: "Legendární Slaviton - fytogel na unavené nohy", valueEst: "cca 290 Kč", decoinsNeeded: 40 },
  { threshold: 60, gift: "Šampon-aktivátor růstu vlasů Bio Rehab", valueEst: "cca 420 Kč", decoinsNeeded: 60 },
  { threshold: 90, gift: "Kompletní omlazující kúra nebo regenerační hadí set", valueEst: "cca 750 Kč", decoinsNeeded: 90 },
  { threshold: 120, gift: "Exkluzivní balíček altajských bylinných čajů a fytogelů", valueEst: "cca 1100 Kč", decoinsNeeded: 120 }
];

export const LETTERS_TEMPLATES: LetterTemplate[] = [
  {
    id: "welcome-client",
    title: "1. Uvítání nově registrovaného VIP člena",
    description: "Posílá se ihned po provedení bezplatné registrace. Obsahuje instrukce k přihlášení a vysvětlení 35% slevy.",
    subject: "Krásný den a vítej v tianDe rodině! 🌸 Tvoje VIP karta s 35% slevou je aktivní",
    placeholders: ["{jméno}", "{id_člena}", "{mentor_jméno}", "{mentor_telefon}", "{fb_skupina}"],
    text: `Ahoj {jméno},

moc tě zdravím a s velkým nadšením tě vítám v naší tianDe komunitě! 😍 

Tvá registrace proběhla v pořádku a tvůj osobní VIP profil s okamžitou 35% slevou na všechny nákupy je od této chvíle plně aktivní. 

Zde jsou tvé přístupové údaje pro přihlášení:
➔ Oficiální e-shop: https://tiande.eu (případně tiandeshop.cz)
➔ Tvé ID člena (VIP číslo): {id_člena}
➔ Heslo: (Zvolila jsi při registraci, případně ti přišlo v SMS)

Díky této VIP kartě nakupuješ za velkoobchodní ceny. Nemáš žádné povinné odběry ani registrační poplatky – objednáváš si jednoduše tehdy, když zrovna sama potřebuješ.

Co doporučuji udělat jako první krok:
1. Určitě se přidej do naší uzavřené klientské FB skupinky {fb_skupina}, kde sdílíme reálné fotky před/po, recenze, návody od naší TOP lídryně Ivy Nohavové a tipy k aplikaci altajských bylin.
2. Pokud bys chtěla sestavit léčivou kůru přímo pro sebe (vypadávání vlasů, akné, omlazení, bolesti zad/kloubů), neváhej se mi ozvat na telefon {mentor_telefon} nebo mi napiš na Messenger. Jsem tvůj osobní tianDe průvodce a moc ráda s čímkoliv pomohu!

Užij si své první voňavé objevování a přeji pohádkový den! 🌸

S láskou,
{mentor_jméno}
Tvůj osobní tianDe mentor`,
    tips: "Tento dopis posílejte co nejdříve, ideálně do 2 hodin od registrace. Je důležité nováčka hned na začátku nasměrovat do klientské FB skupiny, kde uvidí reálné recenze."
  },
  {
    id: "thank-you-first-order",
    title: "2. Poděkování za první nákup & Jak začít",
    description: "Budování vztahu po doručení prvního balíčku. Klientka se učí správně používat bylinné produkty.",
    subject: "Tvůj voňavý tianDe balíček je na cestě! 📦 Zde je pár důležitých tipů, jak začít",
    placeholders: ["{jméno}", "{mentor_jméno}", "{mentor_kontakt}", "{hlavni_produkt}"],
    text: `Ahj {jméno},

vidím v systému, že tvůj první tianDe balíček už opustil sklad a brzy bude u tebe doma! 😍 Už teď se moc těším, až ty voňavé bylinkové poklady poprvé rozbalíš a vyzkoušíš.

Bylinné produkty tianDe mají vysokou koncentraci účinných látek z čisté přírody Altaje a Tibetu. Aby ti přinesly ten nejlepší možný výsledek pro {hlavni_produkt}, je důležité dodržet správné zásady aplikace:

🌱 Moje zlatá pravidla pro začátek:
1. Pravidelnost je klíč – Naše bylinky pracují nejlépe, pokud je používáš systematicky každý den podle návodu. Pouhé občasné nanesení nemá takovou sílu.
2. Pitný režim – Pokud jsi si pořídila naše detoxikační fitoplásti nebo bylinné čaje, pij hodně čisté neperlivé vody (aspoň 2 litry denně). Voda pomáhá vyplavovat uvolněné toxiny z těla.
3. Méně je někdy více – tianDe produkty jsou velmi koncentrované. Stačí nanést jen poloviční množství, než na jaké jsi zvyklá u běžné drogerie. Balení ti tak vydrží mnohem déle!

Jakmile ti krabice dorazí, napiš mi na {mentor_kontakt} nebo zavolej. Společně si projít návody a ujistíme se, že přesně víš, co, kdy a jak aplikovat. Chci, abys byla z výsledků stoprocentně nadšená!

Zatím se měj báječně a těším se na tvou první zpětnou vazbu.

S láskou,
{mentor_jméno}
Tvůj tianDe průvodce`,
    tips: "Péče po prodeji rozlišuje průměrného prodejce od profesionálního lídra. Klientka, která ví, že se o ni staráte, se stane stálým zákazníkem."
  },
  {
    id: "sleeping-reactivation",
    title: "3. Restart 'spícího' člena (6+ měsíců)",
    description: "Nenásilné oslovení VIP zákazníka, který už delší dobu neobjednal. Představení novinek.",
    subject: "Chybíš nám v tianDe! ❤️ Zde je malé narozeninové/sezónní překvapení a novinky pro tebe",
    placeholders: ["{jméno}", "{mentor_jméno}", "{mentor_telefon}", "{novinka_line}"],
    text: `Ahoj {jméno},

moc na tebe vzpomínám! Jak se ti v poslední době daří a jak ti slouží zdraví a krása? 😊

Dívala jsem se do našich tianDe sestav a všimla jsem si, že tvá VIP slevová karta už delší dobu nebyla využitá. Chci tě jen ujistit, že tvůj účet je stále plně funkční a tvá sleva 35 % ti samozřejmě dál platí! Nic se neruší ani neplatíš.

Za tu dobu, co jsme se neslyšely, tianDe uvedlo na trh fantastické novinky – zejména novou komplexní řadu {novinka_line}, na kterou máme v klientské skupině neuvěřitelné ohlasy (hlavně na okamžitý lifting a hydrataci pleti).

Ráda bych ti udělala radost: pokud se rozhodneš si svou poličku v koupelně doplnit nebo pořídit zdravé dárky pro své blízké, napiš mi. Osobně ti k objednávce přibalím malý dárek jako poděkování za návrat!

Můžeš se na novinky podívat přes svůj bezplatný přístup zde: https://tiande.eu

Ozvi se mi na Messenger nebo na {mentor_telefon} a probereme, co by ti zrovna nejvíce pomohlo. Budu moc ráda, když se opět uslyšíme!

Krásný den a hodně úsměvů,
{mentor_jméno}`,
    tips: "Zákazníci často neobjednávají jednoduše proto, že zapomněli přihlašovací údaje nebo jsou zahlceni běžným životem. Milé připomenutí s dárkem je spolehlivě probudí."
  },
  {
    id: "customer-to-member",
    title: "4. Přechod z běžného klienta na VIP slevu",
    description: "Pro klienty, kteří u vás nakupují za plné katalogové ceny. Ukazuje jim finanční úsporu při registraci.",
    subject: "Rada od srdce: Jak při nákupu tianDe ušetřit až 35 % z každého produktu 💸",
    placeholders: ["{jméno}", "{mentor_jméno}", "{mentor_telefon}", "{uspora_kc}"],
    text: `Krásný den, milá {jméno},

předně ti chci moc poděkovat za tvůj poslední nákup a za důvěru, kterou k mým bylinkovým doporučením máš. Nesmírně si toho vážím! 🙏❤️

Protože vím, jak ráda tianDe produkty nakupuješ pravidelně, ráda bych ti dala jeden upřímný tip přímo z kuchyně našich lídrů. Když u mě nakupuješ za plné katalogové ceny, zbytečně přeplácíš.

Založením bezplatné VIP slevové kartičky můžeš z každého dalšího nákupu okamžitě ušetřit 35 %. 

Při tvém objemu nákupů bys tak ušetřila už zhruba {uspora_kc} Kč, které by ti zůstaly doma v peněžence!

💡 Jak to funguje a co získáváš:
➔ Registrace je 100% ZDARMA a nezavazuje tě k žádným povinným nákupům.
➔ Okamžitá a trvalá sleva 35 % na úplně všechny tianDe produkty již od první objednávky.
➔ Přístup k dárkovému programu a uplatnění věrnostních De-coinů (dárky zdarma).
➔ Osobní poradenství a uzavřené materiály ode mne a naší TOP lídryně Ivy Nohavové.

Pokud chceš svou další objednávku mít už o celou třetinu levnější, stačí mi odepsat: 'ANO, CHCI kartičku'. Vyřídím ti ji za 2 minuty, pošlu ti přihlašovací údaje a ukážu ti, jak na e-shopu uplatnit slevu.

Kdyby ti bylo cokoli nejasné, klidně mi zavolej na {mentor_telefon}.

Přeji krásný a úsporný den!

S úctou,
{mentor_jméno}`,
    tips: "Mnozí klienti se bojí slova 'registrace' kvůli špatným zkušenostem z jiných MLM firem. Zdůrazněte slovo 'kartička jako v Bille/Tesco' a to, že zde neexistují povinné odběry."
  }
];
