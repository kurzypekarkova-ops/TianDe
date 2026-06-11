import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Layers, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Lightbulb, 
  ShoppingBag, 
  ChevronRight, 
  ChevronLeft, 
  Send,
  MessageCircle,
  HelpCircle,
  Sliders,
  UserCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface StoryStep {
  slideNumber: number;
  type: 'problem' | 'curiosity' | 'solution' | 'cta';
  typeLabel: string;
  name: string;
  text: string;
  stickerText?: string;
  visualTip: string;
}

interface StoryScenario {
  id: string;
  category: 'skincare' | 'hair' | 'womens_health';
  title: string;
  lineName: string;
  difficulty: 'Jednoduchá' | 'Mírně pokročilá' | 'Profi';
  estimatedTime: string;
  hookDescription: string;
  steps: StoryStep[];
}

const TEMPLATES_DATABASE: StoryScenario[] = [
  // --- HAIR CARE ---
  {
    id: 'story-hair-1',
    category: 'hair',
    title: 'Bio Rehab: Konec línání a dravý růst nového vlasového porostu',
    lineName: 'Bio Rehab',
    difficulty: 'Jednoduchá',
    estimatedTime: '2 minuty',
    hookDescription: 'Cílí na ženy trpící masivním vypadáváním vlasů (po porodu, ze stresu, sezónní řídnutí).',
    steps: [
      {
        slideNumber: 1,
        type: 'problem',
        typeLabel: '1. Snímek: Háček & Problém',
        name: 'Šokující realita v koupelně',
        text: 'Chomáče vlasů v odtoku po každém sprchování? A na hřebeni celá další druhá hrst? 😭💔 Už vás nebaví sbírat vlasy ze svetru i polštáře?',
        stickerText: 'Taky to znáš? (ANO / NASTĚSTÍ NE)',
        visualTip: 'Ukažte buď fotku plného hřebene (autentickou, žádný vyretušovaný model) nebo si rukou projeďte vlasy a smutně se podívejte do kamery.'
      },
      {
        slideNumber: 2,
        type: 'curiosity',
        typeLabel: '2. Snímek: Emotivní zvrat & Zvědavost',
        name: 'Cesta k probuzení cibulek',
        text: 'Zkoušela jsem drahé lékárenské vitamíny, zinek, kofein... Všechno bez úspěchu. Ztrácela jsem naději. Pak mi ale v týmu naší TOP leaderky Ivany Nohovové doporučili celostní fytoterapii tianDe. Konkrétně horský zázvor, který probouzí doslova i "spící" vlasové cibulky!',
        stickerText: 'Chceš vědět, co to bylo za zázrak?',
        visualTip: 'Natočte detailní záběr šamponu a masky Bio Rehab, ideálně ukažte texturu, přičichněte k tomu s nadšením, ukažte čerstvost vlasů po umytí.'
      },
      {
        slideNumber: 3,
        type: 'solution',
        typeLabel: '3. Snímek: Řešení na míru',
        name: 'Aktivní řada Bio Rehab',
        text: 'Tahle řada Bio Rehab (šampon, maska, aktivátor) obsahuje klinicky testovaný extrakt z horského zázvoru a ženšenu. Nejenže zastavuje vypadávání do 14 dnů, ale roste s ním nová hříva plná baby-vlasů! 😍🦁 Za zlomek ceny salonních procedur.',
        stickerText: 'Podívej se na ty baby-vlasy! 👶',
        visualTip: 'Ukažte na své hlavě odrosty, ty kraťoučké "baby" vlásky, které vám začínají trčet u čela. To je ten nejsilnější důkaz pro vaše sledující.'
      },
      {
        slideNumber: 4,
        type: 'cta',
        typeLabel: '4. Snímek: Výzva k akci (CTA)',
        name: 'Uzavření prodeje',
        text: 'Chceš mít znovu hustou a zdravou hřívu bez strachu z česání? Napiš mi do zpráv slovo "{keyword}" a já ti obratem pošlu bezplatný fytorecept na míru a VIP kartičku s trvalou slevou 35 % přímo u TianDe! 🎟️👇',
        stickerText: 'Napiš "{keyword}" do DM!',
        visualTip: 'Ukažte usměvavou fotku sebe s krásnými čerstvě vyfoukanými vlasy. Přidejte anketní interaktivní samolepku s textem "Chci VIP slevu" nebo "Napiš {keyword}".'
      }
    ]
  },
  {
    id: 'story-hair-2',
    category: 'hair',
    title: 'Arganový Rituál: Proměna chemlonu v tekuté zrcadlo',
    lineName: 'Arganový olej',
    difficulty: 'Mírně pokročilá',
    estimatedTime: '3 minuty',
    hookDescription: 'Cílí na majitelky suchých, matných vlasů s roztřepenými konečky.',
    steps: [
      {
        slideNumber: 1,
        type: 'problem',
        typeLabel: '1. Snímek: Háček & Problém',
        name: 'Chemlonové utrpení',
        text: 'Vlasy suché jako sláma, konečky se třepí a lesk zmizel někde v loňském roce? 🌾 Hřeben se v nich zasekává a po vyfoukání vypadáte jako lvíče? Pomoc!',
        stickerText: 'Trápí tě to taky? (Mě taky! / Mám lesk)',
        visualTip: 'Ukažte konečky svých suchých vlasů na světle, nebo vyfoťte vlasy těsně po probuzení před učesáním.'
      },
      {
        slideNumber: 2,
        type: 'curiosity',
        typeLabel: '2. Snímek: Odhalení tajemství',
        name: 'Rozdíl mezi silikonem a výživou',
        text: 'Dřív jsem kupovala masky plné levných těžkých silikonů. Ty vlasy na chvíli obalily, ale pod tím dál vysychaly a lámaly se. Pak jsem ale pochopila rozdíl celistvé péče s prémiovým arganovým olejem a tekutým tekutým hedvábím od tianDe.',
        stickerText: 'Můj rituál odhalen 🤫',
        visualTip: 'Natočte kratičké 3sekundové video, jak nanášíte olejový fluid do dlaní, třete je o sebe a jemně vmačkáváte do spodní třetiny vlasů.'
      },
      {
        slideNumber: 3,
        type: 'solution',
        typeLabel: '3. Snímek: Uzdravení & Lesk',
        name: 'Arganové zlato TianDe',
        text: 'Náš šampon a balzám s arganovým olejem proniká hluboko pod šupinky, dodává lipidovou výživu a zaceluje roztřepenou strukturu. Výsledek? Vlasy jsou těžké, hladké a lesknou se jako zrcadlo bez krepatění! ✨',
        stickerText: 'Chceš je vidět v pohybu? 💃',
        visualTip: 'Předveďte vlasy v pohybu pod světlem – otočte hlavu, nechte je sklouznout po rameni, aby se na slunci odrazilo to "tekuté zrcadlo".'
      },
      {
        slideNumber: 4,
        type: 'cta',
        typeLabel: '4. Snímek: Výzva k akci (CTA)',
        name: 'Jednoduché objednání',
        text: 'Získej luxusní vlasový rituál za VIP cenu s trvalou slevou 35 %. Napiš mi do zpráv "{keyword}" a obratem ti zařídím VIP vstup do e-shopu a doporučím přesný fytorecept od naší expertky Ivany Nohovové zdarma! 📲',
        stickerText: 'Napiš "{keyword}" pro VIP slevu!',
        visualTip: 'Vložte text s jasnými instrukcemi, kam kliknout (např. odkaz v BIU, nebo přímo zaslání DM) s anketou "Chci VIP slevu".'
      }
    ]
  },

  // --- SKIN CARE ---
  {
    id: 'story-skin-1',
    category: 'skincare',
    title: 'Snake Factor: Hadí vyhlazovák mrásek do 2,5 minuty',
    lineName: 'Snake Factor',
    difficulty: 'Mírně pokročilá',
    estimatedTime: '3 minuty',
    hookDescription: 'Fenomenální vráskový vyhlazovák s hadím tukem Mamushi. Obrovský prodejní hit.',
    steps: [
      {
        slideNumber: 1,
        type: 'problem',
        typeLabel: '1. Snímek: Šokující začátek',
        name: 'Zastavení vrásek',
        text: '„Chystáš se na botox, nebo co děláš s těmi vráskami kolem očí a čela?“ 💉😱 Tohle se mě minulý týden zeptala kamarádka u kafe. S úsměvem jsem jí řekla, že jehlic se děsím a že můj chirurg bydlí v malé nenápadné tubě...',
        stickerText: 'Taky se bojíš jehel? (Bojím / Nebojím)',
        visualTip: 'Natočte se, jak se díváte zblízka do zrcadla nebo kamery, ukážete na vrásky kolem očí (mračivky) a zakroutíte hlavou na znamení nesouhlasu s botoxem.'
      },
      {
        slideNumber: 2,
        type: 'curiosity',
        typeLabel: '2. Snímek: Hadí tajemství',
        name: 'Hadí tuk Mamushi',
        text: 'Moje tajemství se jmenuje Snake Factor s antioxidanty a vysoce rafinovaným tukem hada Mamushi. Tenhle přírodní elixír se chová jako jemný přírodní uvolňovač napětí – uvolní mimické svaly, takže kůže se vyhladí sama a vy nebudete vypadat jako maska!',
        stickerText: 'Chceš vědět, jak hadí krém působí? 🌟',
        visualTip: 'Ukažte detail krému a očního gelu ze série Snake Factor. Ukažte nanášení jedné kapky na prsteníček a jak ji jemně vklepáváte do vrásky.'
      },
      {
        slideNumber: 3,
        type: 'solution',
        typeLabel: '3. Snímek: Představení výsledku',
        name: 'Znovuzrození pleti',
        text: 'Není to zázrak na počkání, ale poctivá regenerace. Během 2 týdnů se mimické vrásky zkratí, pleť se zpevní a získá neuvěřitelně svěží šťavnatost. Navíc celá řada vyjde levněji než jedna jediná ampule v salonu!',
        stickerText: 'Před a Po (Kouknout / Chci taky)',
        visualTip: 'Pokud máte fotky před a po z vaší klientské databáze, vložte je sem na split-screen obrazovce. Případně ukažte svou rozzářenou pleť po ranní aplikaci.'
      },
      {
        slideNumber: 4,
        type: 'cta',
        typeLabel: '4. Snímek: VIP Akce',
        name: 'Výzva ke slevě',
        text: 'Chceš to taky vyzkoušet na vlastní kůži a ušetřit hned 35 %? Napiš mi do zpráv slovo "{keyword}" a já ti obratem zřídím VIP nakupování zdarma a pošlu návod, jak hadí rituál správně používat. 🎟️👇',
        stickerText: 'Napíš "{keyword}" sem',
        visualTip: 'Vložte anketní samolepku s odkazem nebo výzvou "Komentuj {keyword}".'
      }
    ]
  },
  {
    id: 'story-skin-2',
    category: 'skincare',
    title: 'Snail Secret: Když potřebuješ vymazat jizvičky, skvrny a akné',
    lineName: 'Snail Secret',
    difficulty: 'Jednoduchá',
    estimatedTime: '2 minuty',
    hookDescription: 'Zaměřeno na problematickou pleť, stopy po akné a nejednotný tón.',
    steps: [
      {
        slideNumber: 1,
        type: 'problem',
        typeLabel: '1. Snímek: Estetická tíseň',
        name: 'Začarovaný kruh akné',
        text: 'Červené flíčky, jizvičky po akné, ucpané póry a pocit, že musíte nanést tunu makeupu, abyste vůbec mohla vyjít mezi lidi? 😭 Pokusy maskovat to často pleť ještě víc podráždí.',
        stickerText: 'Maskuješ to taky? (Ano / Naštěstí ne)',
        visualTip: 'Ukažte svou pleť bez filtru nebo ukažte krabičku plnou korektorů a makeupů s povzdechem.'
      },
      {
        slideNumber: 2,
        type: 'curiosity',
        typeLabel: '2. Snímek: Šnečí mucin',
        name: 'Faktor buněčné obnovy',
        text: 'Hledala jsem záchranu, až jsem v tianDe objevila řadu Snail Secret se 120mg čistého hlemýždího mucinu v každé tubě! Mucin je biologicky neskutečně nabitý – obsahuje přírodní alantoin, kolagen a peptidy, které doslova nutí kožní buňky k bleskovému hojení zevnitř.',
        stickerText: 'Hlemýžď? Cože? 🐌',
        visualTip: 'Ukažte detail krému s mucinem. Ukažte jeho zajímavou, lehce se "tahnoucí" proteinovou texturu, která dokládá vysoký podíl opravdového mucinu.'
      },
      {
        slideNumber: 3,
        type: 'solution',
        typeLabel: '3. Snímek: Zázračné zklidnění',
        name: 'Konec jizvičkám',
        text: 'Tento gel a krém pleť okamžitě "napije", stáhne zánětlivé pupínky a během pár dní vyhladí ty nepříjemné flíčky po akné. Pleť začíná dýchat a vy konečně můžete makeup nechat v poličce! 🥰',
        stickerText: 'Výsledky mluví za vše 📈',
        visualTip: 'Ukažte svou čistou, klidnou tvář zblízka na denním světle s úsměvem a radostí bez tuny líčení.'
      },
      {
        slideNumber: 4,
        type: 'cta',
        typeLabel: '4. Snímek: Výzva s fytoreceptem',
        name: 'CTA na VIP kartu',
        text: 'Dost bylo utrpení a drahých neúčinných experimentů s drogerií. Napiš mi slovo "{keyword}" a já ti pomohu nastavit tianDe šnečí rutinu s trvalou VIP slevou 35 % přímo od výrobce! Napiš, poradím ráda.',
        stickerText: 'Chci VIP kód "{keyword}"',
        visualTip: 'Anketní widget s možnostmi "Chci pomoci s akné" nebo "Napiš {keyword}".'
      }
    ]
  },

  // --- WOMENS HEALTH ---
  {
    id: 'story-women-1',
    category: 'womens_health',
    title: 'Nefritová svěžest: Tajná bylina, co vyřeší menstruační bolesti',
    lineName: 'Nefritová svěžest',
    difficulty: 'Mírně pokročilá',
    estimatedTime: '3 minuty',
    hookDescription: 'Velmi emotivní scénář o tabuizovaném tématu menstruačních bolestí, výtoků a cyst.',
    steps: [
      {
        slideNumber: 1,
        type: 'problem',
        typeLabel: '1. Snímek: Intimní výpověď',
        name: 'Menstruační peklo',
        text: 'Trpíte každý měsíc tak, že musíte rušit schůzky, tlumit se silnými růžovými pilulkami a proležet víkend v křečích v posteli s termoforem? 😫🤰 Mnoho z nás si myslí, že je to normální. Ale věřte mi, NENÍ!',
        stickerText: 'Máš to taky tak? (Bohužel ano / Jsem v pohodě)',
        visualTip: 'Můžete ukázat zahřívací láhev na břiše, smutný výraz v klubíčku pod peřinou, případně růžové prášky na nočním stolku.'
      },
      {
        slideNumber: 2,
        type: 'curiosity',
        typeLabel: '2. Snímek: Bylinný suchý obklad',
        name: 'Patentovaná síla bylin',
        text: 'Běžné menstruační vložky jsou plné běleného plastu a chemie, což intimní sliznice dusí a zhoršuje záněty. Řešením, které mě a stovkám mých zákaznic změnilo život, jsou bylinné fytovložky Nefritová svěžest z tianDe. Mají v sobě patentovaný suchý koncentrát z 19 tibetských léčivých bylin!',
        stickerText: 'O co přesně jde? 🌿',
        visualTip: 'Ukažte neotevřené balení vložek Nefritová svěžest s popisem bylinek. Zmiňte, že bylinný suchý obklad se přes sliznice vstřebává přímo k orgánům a harmonizuje cyklus.'
      },
      {
        slideNumber: 3,
        type: 'solution',
        typeLabel: '3. Snímek: Úleva a komfort',
        name: 'Chladivá bylinná úleva',
        text: 'Díky obsahu máty, kamélie a fytosterolů vložky uvolňují křeče, harmonizují pH, eliminují zápach a působí jako permanentní přírodní zábal. Moje další menstruace proběhla bez jediného prášku a s plnou energií! 😍 Chodila jsem sportovat a užívala si dny naplno.',
        stickerText: 'Moje úleva byla okamžitá',
        visualTip: 'Ukažte svou usměvavou, energickou fotku z outdoorové aktivity, procházky přírodou nebo sportu pro zdůraznění "plné síly i v těchto dnech".'
      },
      {
        slideNumber: 4,
        type: 'cta',
        typeLabel: '4. Snímek: VIP karta',
        name: 'CTA na VIP kartu',
        text: 'Napište mi do zpráv slovo "{keyword}" a já vám pošlu brožurku o přírodním ženském zdraví tianDe zdarma. Pomohu vám vybrat správný startovací bylinný balíček se slevou 35 %, kterou vám u tianDe ráda zajistím! Hýčkejme se, zasloužíme si to. 🌸',
        stickerText: 'Komentuj "{keyword}" pro úlevu',
        visualTip: 'Vložte anketu s textem "Chci vyzkoušet s 35% slevou" a šipkou směřující dolů.'
      }
    ]
  },
  {
    id: 'story-women-2',
    category: 'womens_health',
    title: 'Energie bylin: Celoroční štít proti otravným zánětům a močáku',
    lineName: 'Energie bylin',
    difficulty: 'Profi',
    estimatedTime: '4 minuty',
    hookDescription: 'Zaměřeno na chronické záněty močových cest, kvasinky a nepohodlí.',
    steps: [
      {
        slideNumber: 1,
        type: 'problem',
        typeLabel: '1. Snímek: Skrytý nepřítel',
        name: 'Chronický močák',
        text: 'Cítíte to nepříjemné pálení, řezání a neustálé běhání na toaletu, sotva trochu ofouknete nebo si sednete na studené? 🧊😫 Chronické záněty močových cest a intimní kvasinky dokážou totálně zničit ženské sebevědomí.',
        stickerText: 'Znáš to řezání? (Bohužel ano / Neznám)',
        visualTip: 'Ukáže smutnou momentku u šálku horkého čaje, zachumlaná v deku se zkříženýma nohama.'
      },
      {
        slideNumber: 2,
        type: 'curiosity',
        typeLabel: '2. Snímek: Síla 39 tibetských bylin',
        name: 'Přírodní imunostimulátor',
        text: 'Klasická léčba u lékaře často řeší jen akutní stav antibiotiky, což ale narušuje celou naši mikroflóru a zánět se brzy vrátí. My v tianDe nasazujeme Energie bylin – sérii fytovložek napuštěnou extrakty z 39 tibetských bylin. Fungují jako poctivý, suchý bylinný detox pro ženy.',
        stickerText: 'Bylinný suchý obklad 🛡️',
        visualTip: 'Ukažte řez sáčkem Energie bylin (nebo jen balení), s nadšením popište vůni máty, heřmánku a anděliky, které se uvolní po otevření.'
      },
      {
        slideNumber: 3,
        type: 'solution',
        typeLabel: '3. Snímek: Trvalé stabilní zdraví',
        name: 'Přírodní harmonizace',
        text: 'Tyto bylinné kúry posilují lokální imunitu, zklidňují sliznice, odplavují škodlivé bakterie a navrací tělu přirozenou harmonii. Klientky hlásí, že se konečně zbavily letitých kvasinkových obtíží a močového měchýře mají jako nový! 🧼👑',
        stickerText: 'Písek v ledvinách a močák vyřešen',
        visualTip: 'Předveďte spokojenou, radostnou fotku s kytkou, čajem nebo prostě jen na sluníčku, abyste vyjádřila pocit úlevy.'
      },
      {
        slideNumber: 4,
        type: 'cta',
        typeLabel: '4. Snímek: Tajná zpráva',
        name: 'Cesta k uzdravení',
        text: 'Nenechte se dál trápit a neničte své tělo chemií. Napište mi slovo "{keyword}" a já vám podrobně vysvětlím, jak naši kúru Energie bylin s VIP slevou 35 % správně projít. Vaše tělo vám poděkuje! 🌸',
        stickerText: 'Chci bezpečný kód "{keyword}"',
        visualTip: 'Přidejte interaktivní pole nebo anketní samolepku pro rychlou stoprocentně diskrétní komunikaci.'
      }
    ]
  }
];

export const StoryCookbookPillar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'skincare' | 'hair' | 'womens_health'>('hair');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('story-hair-1');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  
  // Custom interactive text variables
  const [customKeyword, setCustomKeyword] = useState<string>('CHCI_HUSTE_VLASY');
  const [contactLink, setContactLink] = useState<string>('m.me/ivanatiane');
  const [customLeader, setCustomLeader] = useState<string>('Ivana Nohovová');
  
  const [copiedSlideIndex, setCopiedSlideIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedSticker, setCopiedSticker] = useState<boolean>(false);

  // Filter templates based on product line category
  const filteredScenarios = TEMPLATES_DATABASE.filter(s => s.category === selectedCategory);

  // Active scenario reference
  const activeScenario = TEMPLATES_DATABASE.find(s => s.id === activeScenarioId) || TEMPLATES_DATABASE[0];

  // Auto fallback when switching categories
  useEffect(() => {
    if (filteredScenarios.length > 0) {
      setActiveScenarioId(filteredScenarios[0].id);
      setActiveSlideIndex(0);
    }
  }, [selectedCategory]);

  const replacePlaceholders = (text: string): string => {
    return text
      .replace(/{keyword}/g, customKeyword.trim() || 'CHCI')
      .replace(/{link}/g, contactLink.trim() || '[odkaz]')
      .replace(/Ivana Nohovová/g, customLeader.trim() || 'Ivana Nohovová');
  };

  const handleCopySlideText = (text: string, index: number) => {
    navigator.clipboard.writeText(replacePlaceholders(text));
    setCopiedSlideIndex(index);
    setTimeout(() => setCopiedSlideIndex(null), 2000);
  };

  const handleCopySticker = (stickerText: string) => {
    navigator.clipboard.writeText(replacePlaceholders(stickerText));
    setCopiedSticker(true);
    setTimeout(() => setCopiedSticker(false), 2000);
  };

  const handleCopyEntireScenario = () => {
    let fullText = `📱 VÍCEKROKOVÝ STORY SCÉNÁŘ: ${activeScenario.title}\n`;
    fullText += `===============================================\n\n`;
    activeScenario.steps.forEach((step) => {
      fullText += `📸 SNÍMEK ${step.slideNumber} [${step.type.toUpperCase()} - ${step.name}]\n`;
      fullText += `-----------------------------------------------\n`;
      fullText += `${replacePlaceholders(step.text)}\n\n`;
      if (step.stickerText) {
        fullText += `🏷️ DOPORUČENÝ TEXT NA SAMOLEPKU / ANKETU:\n"${replacePlaceholders(step.stickerText)}"\n\n`;
      }
      fullText += `💡 VIZUÁLNÍ TIP / NÁVOD K AKCI NA KAMERU:\n${step.visualTip}\n\n`;
      fullText += `===============================================\n\n`;
    });
    fullText += `💡 Sdílejte krok za krokem do Stories každé 2-3 hodiny pro maximalizaci zvědavosti! Krásný den přeje ${customLeader}.`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  // Safe navigation inside the active mockup slides
  const nextSlide = () => {
    if (activeSlideIndex < activeScenario.steps.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    } else {
      setActiveSlideIndex(0); // loop
    }
  };

  const prevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    } else {
      setActiveSlideIndex(activeScenario.steps.length - 1); // loop back
    }
  };

  const handleShareWhatsApp = (text: string) => {
    const formatted = replacePlaceholders(text);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Upper branding section */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <span className="bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-4 inline-block">
            Příběhy, které prodávají (Story Scénáře)
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            Příběhy, které <span className="serif-italic text-pink-500">prodávají</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Největším problémem nováčků v MLM je, že píší nudné produktové spamy, které nikdo nečte. Tento interaktivní trenažér nabízí hotové, certifikované **vícekrokové Story scénáře** rozdělené podle hlavních produktových řad. 
          </p>
        </div>

        {/* Global Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopyEntireScenario}
            className={`px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all ${
              copiedAll 
                ? 'bg-green-600 border-green-600 text-white' 
                : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {copiedAll ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Celá kuchařka zkopírována' : 'Kopírovat kompletní scénář'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Controls & Dynamic Variable Binder */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section 1: Selector Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
              1. Vyberte Produktovou Řadu
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedCategory('hair')}
                className={`py-3 px-2 rounded-xl border text-center transition-all ${
                  selectedCategory === 'hair'
                    ? 'border-tiande-blue bg-blue-50/50 text-tiande-blue font-black shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500 text-xs font-bold'
                }`}
              >
                <ShoppingBag className="w-4 h-4 mx-auto mb-1 opacity-70" />
                <span className="text-[10px] uppercase font-bold block tracking-wider">Vlasy</span>
              </button>

              <button
                onClick={() => setSelectedCategory('skincare')}
                className={`py-3 px-2 rounded-xl border text-center transition-all ${
                  selectedCategory === 'skincare'
                    ? 'border-tiande-blue bg-blue-50/50 text-tiande-blue font-black shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500 text-xs font-bold'
                }`}
              >
                <Sparkles className="w-4 h-4 mx-auto mb-1 opacity-70" />
                <span className="text-[10px] uppercase font-bold block tracking-wider">Pokožka</span>
              </button>

              <button
                onClick={() => setSelectedCategory('womens_health')}
                className={`py-3 px-2 rounded-xl border text-center transition-all ${
                  selectedCategory === 'womens_health'
                    ? 'border-tiande-blue bg-blue-50/50 text-tiande-blue font-black shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500 text-xs font-bold'
                }`}
              >
                <Zap className="w-4 h-4 mx-auto mb-1 opacity-70" />
                <span className="text-[10px] uppercase font-bold block tracking-wider">Ženské Zdraví</span>
              </button>
            </div>
          </div>

          {/* Section 2: Scenarios list matching selected Tab */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                2. Vyberte Scénář
              </h3>
              <span className="bg-pink-100 text-pink-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                {filteredScenarios.length} scénáře
              </span>
            </div>

            <div className="space-y-2">
              {filteredScenarios.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => {
                    setActiveScenarioId(scen.id);
                    setActiveSlideIndex(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                    activeScenarioId === scen.id 
                      ? 'border-pink-500 bg-pink-50/20 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[9px] uppercase font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {scen.lineName}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400">
                      ⏱️ {scen.estimatedTime}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-800 leading-snug">
                    {scen.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <span className={`font-bold uppercase ${
                      scen.difficulty === 'Jednoduchá' ? 'text-green-600' : scen.difficulty === 'Mírně pokročilá' ? 'text-amber-500' : 'text-pink-600'
                    }`}>
                      {scen.difficulty}
                    </span>
                    <span>•</span>
                    <span>{scen.steps.length} snímků</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Dynamic Variable Binder Inputs */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4.5 h-4.5 text-pink-400 shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
                3. Přizpůsobení na míru
              </h3>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Vložte své údaje a text v mobilním simulátoru i v šablonách se okamžitě a živě přizpůsobí pro perfektní zkopírování!
            </p>

            <div className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Klíčové slovo pro komentáře (Keyword)
                </label>
                <input 
                  type="text" 
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs font-mono font-bold uppercase tracking-wider text-pink-400 focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="např. VLASY, ŠNEK, VIP"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Mentor / TOP Lídr
                </label>
                <input 
                  type="text" 
                  value={customLeader}
                  onChange={(e) => setCustomLeader(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-pink-500 focus:outline-none transition-colors font-semibold"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Rychlý odkaz pro kontakt
                </label>
                <input 
                  type="text" 
                  value={contactLink}
                  onChange={(e) => setContactLink(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-300 focus:border-pink-500 focus:outline-none transition-colors font-mono"
                  placeholder="např. m.me/vasejmeno"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN & RIGHT COLUMN COMBINED: INTERACTIVE WORKBENCH */}
        <div className="lg:col-span-8 grid md:grid-cols-12 gap-6 items-start">
          
          {/* Column A: Interactive Live Mobile Phone Mockup */}
          <div className="md:col-span-5 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <span>Živý mobilní simulátor</span>
            </span>

            {/* Simulated Phone Frame */}
            <div className="w-[280px] h-[540px] bg-slate-900 rounded-[40px] p-3 shadow-2xl relative border-[4px] border-slate-800 flex flex-col overflow-hidden">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-20 flex items-center justify-around px-4">
                <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Simulated Screen Inner Container */}
              <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 rounded-[32px] overflow-hidden relative flex flex-col p-4 pt-8 text-white">
                
                {/* Simulated Segment indicators at the top */}
                <div className="absolute top-3 left-4 right-4 flex gap-1.5 z-20">
                  {activeScenario.steps.map((step, idx) => (
                    <div 
                      key={step.slideNumber} 
                      className={`h-0.5 rounded-full flex-1 transition-all duration-300 ${
                        idx === activeSlideIndex ? 'bg-pink-500 scale-y-125' : idx < activeSlideIndex ? 'bg-white/90' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Profile indicator overlay */}
                <div className="flex items-center justify-between w-full z-20 mb-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 rounded-full bg-pink-600 border border-pink-400 flex items-center justify-center text-[9px] font-extrabold text-white">
                      IN
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black tracking-wide">tianDe_bylinky</span>
                      <span className="text-[7px] text-white/50 font-semibold tracking-wider">Moje Historie</span>
                    </div>
                  </div>
                  <span className="text-[8px] text-white/40 tracking-wider">před 4 H</span>
                </div>

                {/* Slide content viewport with transitions */}
                <div className="flex-1 flex flex-col justify-between py-2 z-10 select-none">
                  
                  {/* Category outline badge */}
                  <div>
                    <span className="inline-block text-[8px] uppercase font-black px-1.5 py-0.5 rounded bg-white/10 text-pink-300 border border-white/5 tracking-wider">
                      Snímek {activeScenario.steps[activeSlideIndex].slideNumber}: {activeScenario.steps[activeSlideIndex].type.toUpperCase()}
                    </span>
                  </div>

                  {/* Active Slide text with custom dynamic replacements */}
                  <div className="my-auto py-2">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${activeScenarioId}-${activeSlideIndex}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs sm:text-xs text-slate-100 font-extrabold leading-relaxed text-center drop-shadow-md whitespace-pre-line tracking-wide"
                      >
                        {replacePlaceholders(activeScenario.steps[activeSlideIndex].text)}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Simulated interactive elements (Stickers) */}
                  <div className="space-y-4 pt-2">
                    
                    {/* Dynamic sticker representing Instagram Poll / QA */}
                    {activeScenario.steps[activeSlideIndex].stickerText && (
                      <motion.div 
                        initial={{ rotate: -2 }}
                        animate={{ rotate: 1 }}
                        className="bg-white text-slate-950 font-black text-[10px] px-3.5 py-2.5 rounded-2xl shadow-xl max-w-[190px] mx-auto text-center border-2 border-slate-100 flex flex-col gap-1 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                        onClick={() => handleCopySticker(activeScenario.steps[activeSlideIndex].stickerText || '')}
                      >
                        <span className="text-slate-500 uppercase tracking-widest text-[7px] font-semibold">Insta Samolepka:</span>
                        <div className="text-[10px] uppercase font-black px-1 py-0.5 tracking-tight flex items-center justify-center gap-1 text-slate-800">
                          {copiedSticker ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-500" />
                              <span className="text-green-600">Zkopírováno</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse shrink-0" />
                              <span className="line-clamp-2">{replacePlaceholders(activeScenario.steps[activeSlideIndex].stickerText || '')}</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Bottom visual guide notice to help the user shoot the content */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/5">
                      <p className="text-[8px] uppercase tracking-widest font-black text-white/40 mb-1">
                        🎬 Jak natočit snímek na kameru:
                      </p>
                      <p className="text-[9px] text-slate-300 font-medium leading-tight">
                        {activeScenario.steps[activeSlideIndex].visualTip}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Handheld slider controllers representing swiping / scrolling */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                  <button 
                    onClick={prevSlide}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1">
                    {activeScenario.steps.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === activeSlideIndex ? 'bg-pink-500 w-3' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={nextSlide}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Column B: Large Interactive Cookbook Stepper */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-widest">
                Detail scénáře & Kopírovatelné kroky
              </span>
              <span className="text-xs text-slate-500 font-bold">
                Aktivní: {activeScenario.steps.length} kroků
              </span>
            </div>

            <div className="space-y-4">
              {activeScenario.steps.map((step, idx) => {
                const isSelectedInMobile = idx === activeSlideIndex;
                const processed = replacePlaceholders(step.text);
                const hasSticker = !!step.stickerText;

                return (
                  <div 
                    key={step.slideNumber}
                    className={`border rounded-2xl p-5 bg-white transition-all relative overflow-hidden flex flex-col gap-3.5 hover:shadow-md ${
                      isSelectedInMobile 
                        ? 'border-pink-500 ring-2 ring-pink-500/20' 
                        : 'border-slate-200'
                    }`}
                  >
                    {/* Step indicator header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white ${
                          isSelectedInMobile ? 'bg-pink-500' : 'bg-slate-800'
                        }`}>
                          {step.slideNumber}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                          {step.typeLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveSlideIndex(idx)}
                          className="px-2 py-1 text-[9px] font-bold text-slate-400 hover:text-slate-800 transition-colors uppercase"
                        >
                          Zobrazit v mobilu
                        </button>
                        <div className="h-4 w-px bg-slate-100" />
                        <button
                          onClick={() => handleCopySlideText(step.text, idx)}
                          className={`flex items-center gap-1 px-3 py-1.5 border rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                            copiedSlideIndex === idx
                              ? 'bg-green-50 border-green-200 text-green-600'
                              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {copiedSlideIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-500" />
                              <span>Zkopírováno</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Kopírovat text</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Rich copy text container */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 relative group/body">
                      <p className="text-xs text-slate-800 leading-relaxed font-semibold font-sans whitespace-pre-line">
                        {processed}
                      </p>
                      
                      {/* Social sharing direct shortcuts */}
                      <div className="absolute right-3.5 bottom-3 opacity-0 group-hover/body:opacity-100 transition-opacity flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm">
                        <button
                          onClick={() => handleShareWhatsApp(step.text)}
                          className="p-1 text-slate-400 hover:text-green-600 transition-colors"
                          title="Sdílet na WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Mini card: Sticker outline */}
                    {hasSticker && (
                      <div className="bg-pink-50/10 border border-pink-100/30 p-3 rounded-xl flex items-center justify-between text-xs font-semibold gap-3">
                        <div className="flex gap-2 items-center">
                          <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                          <div className="space-y-0.5">
                            <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">
                              Předpřipravený text samolepky:
                            </p>
                            <p className="text-slate-700 text-[11px] font-bold">
                              {replacePlaceholders(step.stickerText || '')}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopySticker(step.stickerText || '')}
                          className="px-2.5 py-1.5 border border-pink-200 text-pink-700 bg-pink-50/50 hover:bg-pink-50 rounded-lg text-[9px] uppercase font-black tracking-wider shrink-0"
                        >
                          Kopírovat nálepku
                        </button>
                      </div>
                    )}

                    {/* Educational / Shoot Action instruction */}
                    <div className="flex gap-2.5 items-start bg-slate-50/20 rounded-xl p-3 border border-slate-100/50">
                      <Lightbulb className="w-4.5 h-4.5 text-pink-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Psychologie & Nápověda k natáčení:
                        </p>
                        <p className="text-[11px] text-slate-600 leading-normal font-medium">
                          {step.visualTip}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Strategic Coaching Box from Leaders */}
            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm mt-6">
              <UserCheck className="w-6 h-6 text-pink-600 shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-pink-900 flex items-center gap-1.5">
                  <span>Doporučení od Ivany Nohovové k tvoření Stories:</span>
                </h4>
                <p className="text-xs text-pink-700 leading-relaxed font-medium">
                  "Nikdy nesdílejte všechny tyto snímky najednou v jedné vteřině! Lidé by to unaveně přeskákali. Doporučuji sdílet <strong>Snímek 1 dopoledne kolem 9:00</strong> (vytvoříte problém), <strong>Snímek 2 kolem oběda ve 12:00</strong> (vzbudíte ohromnou zvědavost) a <strong>Snímky 3 a 4 v podvečer kolem 18:00</strong> (kdy lidé leží na gauči a jsou připraveni nakupovat). Tímhle rozfázováním udržíte v napětí stovky diváků a vaše konverze vystřelí nahoru!"
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
