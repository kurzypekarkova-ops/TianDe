import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  Sparkles, 
  Send, 
  UserPlus, 
  Heart, 
  Lightbulb, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  RotateCcw,
  Clock,
  ThumbsUp,
  UserCheck,
  AlertCircle
} from 'lucide-react';

type ScriptSituation = 'warm_reconnection' | 'story_reaction' | 'product_need' | 'business_pitch' | 'customer_followup';
type ScriptTone = 'friendly' | 'empathetic' | 'direct_casual';

interface ScriptTemplate {
  id: string;
  situation: ScriptSituation;
  tone: ScriptTone;
  title: string;
  description: string;
  triggerHook: string; // Dynamic placeholder context
  steps: {
    label: string;
    text: string; // contains placeholders like {name}, {topic}, {trigger}, {leader}
    tip: string;
  }[];
  expertAdvice: string; // Tip from Ivana Nohovová
}

const SCRIPTS_DATABASE: ScriptTemplate[] = [
  // --- WARM RECONNECTION ---
  {
    id: 'warm-1',
    situation: 'warm_reconnection',
    tone: 'friendly',
    title: 'Oživení vztahu po dlouhé době',
    description: 'Skvělé pro bývalé spolužáky, kolegy nebo lidi, se kterými jste dlouho nemluvili. Bez jakéhokoliv tlačení produktů.',
    triggerHook: 'náhodná vzpomínka nebo zhlédnutí jejich příspěvku',
    steps: [
      {
        label: '1. Krok: Autentický otevírák',
        text: 'Ahoj {name}, jak se máš? 😊 Úplně náhodou mi dneska na Instagramu/FB vyskočila tvoje fotka z té naší společné {trigger} a hned jsem si vzpomněla, jaká to byla sranda. Jak vůbec teď žiješ? Co dělají děti / práce?',
        tip: 'Nikdy v první zprávě nepište o TianDe, MLM ani o obchodu. Cílem je pouze dostat odpověď a obnovit lidský vztah.'
      },
      {
        label: '2. Krok: Rozvinutí a zvědavostní oslí můstek (Po jejich odpovědi)',
        text: 'To je skvělé, moc ti to přeju! Já se teď kromě rodiny dost věnuji online fytoterapii a zdravému životnímu stylu v projektu s Ivanou Nohovovou. Vlastně mě to úplně pohltilo, protože to lidem řeší reálné problémy jako {topic}. Ale o tom ti napíšu jindy! Jak se jinak chystáte na léto/vikend?',
        tip: 'Zmiňte se o své práci lehce, jako o něčem, co vás baví a dává vám smysl. Nechte je se poptat, o co jde.'
      },
      {
        label: '3. Krok: Nabídka bez nátlaku',
        text: 'Hele, mě teď vlastně napadlo – kdybys někdy řešila {topic}, nebo tě zajímalo, jak pečovat o tělo čistou silou bylin, klidně mi řekni. Mám možnost pro kamarády založit VIP kartičku na 35% slevu přímo v e-shopu. Ale úplně nezávazně, jen mě to cvrnklo do nosu. Kdy dáme kafe?',
        tip: 'Zakončení s nabídkou slevy bez nátlaku dává druhému možnost s úsměvem říct "zatím ne", což ochrání vaše přátelství.'
      }
    ],
    expertAdvice: 'Vztahový marketing je o budování mostů. Lidé koupí jen od těch, které mají rádi a kterým věří. První zpráva je 100% o nich, ne o vás.'
  },
  {
    id: 'warm-2',
    situation: 'warm_reconnection',
    tone: 'empathetic',
    title: 'Upřímná pochvala / Ocenění profilu',
    description: 'Vhodné pro lidi, které máte v přátelích, ale osobně se tolik neznáte. Vychází z upřímné pochvaly.',
    triggerHook: 'zajímavá fotka, estetický profil nebo pěkná rodinná fotka',
    steps: [
      {
        label: '1. Krok: Ocenění hodnoty',
        text: 'Krásný den, {name}, už nějakou dobu sleduji tvůj profil a strašně mě baví tvoje fotky z {trigger}. Máš úžasnou estetiku / skvělou energii! Chtěla jsem ti to jen tak napsat a popřát ti krásný den. 😊',
        tip: 'Chvála musí být opravdová. Lidé mají radar na falešné komplimenty, tak si najděte věc, která se vám na nich opravdu líbí.'
      },
      {
        label: '2. Krok: Vztahová otázka na téma',
        text: 'Děkuju moc za odpověď, {name}! Všimla jsem si, že se taky hodně zajímáš o zdravou domácnost/péči. Já zrovna teď v týmu s Ivanou Nohovovou pomáhám ženám nastavit přírodní rutiny, když je trápí {topic}. Jaké ty osobně preferuješ produkty? Spíš přírodní, nebo to v drogérii moc neřešíš?',
        tip: 'Otázka na konci otevírá prostor pro rozhovor. Zjišťujete jejich nákupní návyky a potřeby.'
      },
      {
        label: '3. Krok: Servisní nabídka',
        text: 'Chápu! Kdybys měla někdy chuť podívat se na klinické studie fytoterapie tianDe nebo tě zajímalo, jak vyřešit {topic}, dej vědět. Dělám holkám bezplatné on-line diagnostiky s fytoreceptem na míru (osobní seznam doporučených bylinných fytoproduktů). Kdykoliv napiš, ráda ti s tím pomůžu jako kamarádce.',
        tip: 'Prezentujte se jako průvodce a odborník na řešení problému, nikoliv jako prodejce toužící po provizi.'
      }
    ],
    expertAdvice: 'Lidé milují, když si jich někdo všimne a ocení jejich snahu. Pochvala je nejlepší otvírák srdce i konverzace.'
  },

  // --- STORY REACTION ---
  {
    id: 'story-1',
    situation: 'story_reaction',
    tone: 'friendly',
    title: 'Reakce na zhlédnutí nebo lajk vašeho storíčka',
    description: 'Pokud vám někdo olajkoval storiečko s produktem nebo výsledky, reagujte okamžitě, dokud je téma čerstvé.',
    triggerHook: 'lajk nebo zhlédnutí storíčka ohledně tianDe sady',
    steps: [
      {
        label: '1. Krok: Děkovný otvírák se zvídavostí',
        text: 'Ahoj {name}, moc děkuji za srdíčko/reakci u mého storíčka ohledně {trigger}! Udělalo mi to velkou radost. 😊 Zajímá tě {topic} osobně, nebo tě jen zaujaly ty fotky výsledků?',
        tip: 'Napište přátelsky a hned položte otázku na tělo, ale s úsměvem. Zjistíte, zda má aktivní problém.'
      },
      {
        label: '2. Krok: Sdílení osobní zkušenosti se složkou',
        text: 'Úplně tě chápu! Já sama jsem dřív zkoušela všechno možné a nic nezabíralo. Až když jsem objevila fytoterapii a začala používat {substance}, tak se stal zázrak a po problému bylo veta. Ráda ti k tomu pošlu detailnější informace, zajímá tě to spíš z pohledu péče, nebo bys to chtěla jen prozkoumat?',
        tip: 'Představte řešení skrz vlastní příběh s produktem. Vzbuďte touhu dozvědět se víc.'
      },
      {
        label: '3. Krok: Nabídka bezrizikového kroku (Diagnostika)',
        text: 'Víš co, {name}? Nejlepší bude, když ti udělám rychlou diagnostiku pleti/těla na míru. Mám tu na to skvělý interaktivní test, zabere to minutu a přesně uvidíš, co by ti pomohlo. Je to nezávazné a zdarma. Chceš, abych ti poslala odkaz?',
        tip: 'Odkazujte na náš nový diagnostický kvíz! Je to skvělý profesionální nástroj, který neprodává ihned, ale pomáhá.'
      }
    ],
    expertAdvice: 'Lajk na storíčko je zvednutá ruka s nápisem "zajímá mě to". Pokud na ni neodpovíte do 24 hodin, zájem opadne.'
  },
  {
    id: 'story-2',
    situation: 'story_reaction',
    tone: 'empathetic',
    title: 'Hlasování v anketě na vašem profilu',
    description: 'Když dáte do Stories anketu typu "Chci vědět víc" nebo "Mám suchou pleť" a někdo klikne na ANO.',
    triggerHook: 'kliknutí na "CHCI VĚDĚT VÍC" u ankety k TianDe',
    steps: [
      {
        label: '1. Krok: Splnění slibu',
        text: 'Ahoj {name}, viděla jsem, že jsi v anketě na mém profilu hlasovala, že tě zajímá {trigger}. Sliby plním, takže ti hned běžím napsat podrobnosti! 🌸 Co přesně u tebe v oblasti {topic} momentálně nejvíc řešíš?',
        tip: 'Oslovte je přímo, hlasovali dobrovolně, takže mluvíte s horkým kontaktem, který čeká na info.'
      },
      {
        label: '2. Krok: Nabídka pomoci bez prodejního tlaku',
        text: 'Rozumím ti, s tímhle se potýká spousta mých zákaznic. Hlavní chybou bývá, že lékárenské věci často jen potlačují příznaky, kdežto naše fytoterapie s {substance} jde rovnou k příčině. Ivana Nohovová nás učí dívat se na tělo jako na celek. Ráda ti ukážu fytorecept (seznam doporučených bylinných fytoproduktů) jedné mé klientky s podobným problémem, chceš na to mrknout?',
        tip: 'Požádejte o svolení, než jim pošlete jakýkoliv odkaz, fotky před/po nebo dokument. Buduje to profesionalitu.'
      },
      {
        label: '3. Krok: Odkaz na VIP registraci',
        text: 'Super, tady ti posílám náhled! Jinak se neboj, kdyby ses rozhodla cokoliv zkusit, objednám ti to přímo přes tvůj vlastní VIP účet, kde máš hned slevu 35 % na vše a dárky k nákupu. Registrace je zdarma a k ničemu tě nezavazuje. Založíme ji rovnou, ať nákup nepřeplácíš?',
        tip: 'Sleva 35 % a dárky jsou nejsilnější argumenty. Vždy zdůrazněte, že registrace je zcela bez závazků.'
      }
    ],
    expertAdvice: 'Když lidé kliknou v anketě, dali vám přímou autorizaci k zahájení rozhovoru. Buďte energičtí a připraveni pomoci.'
  },

  // --- PRODUCT NEED ---
  {
    id: 'product-1',
    situation: 'product_need',
    tone: 'empathetic',
    title: 'Když si někdo na svém profilu stěžuje na problém',
    description: 'Šetrné reagování na status či příspěvek známého, který řeší trable se zdravím, ekzémy nebo vypadáváním vlasů.',
    triggerHook: 'příspěvek, kde si stěžují na únavu, stárnutí pleti nebo lupy',
    steps: [
      {
        label: '1. Krok: Empatie a podpora',
        text: 'Ahoj {name}, narazila jsem na tvůj příspěvek, kde píšeš o {trigger}. Je mi moc líto, že tě to trápí, vím, jak neskutečně otravné to dokáže být a jak to člověku bere energii. Držím ti palce, ať se to brzy zlepší! ❤️',
        tip: 'Zde absolutně nic nenabízejte. Vyjádřete čisté lidské pochopení pro jejich situaci.'
      },
      {
        label: '2. Krok: Nenápadné navržení přírodní alternativy (Po jejich reakci)',
        text: 'Děkuju za odpověď! Hele {name}, já nechci vykládat žádná moudra, ale sama se v týmu naší TOP leaderky Ivany Nohovové věnuji celostní fytoterapii a u problému jako {topic} máme naprosto neuvěřitelné klientské výsledky díky {substance}. Kdybys chtěla, můžu ti poslat fotky holky, co řešila totéž a má po starostech. Chceš to zkouknout jen pro inspiraci?',
        tip: 'Spojení "nechci vykládat moudra" a "jen pro inspiraci" odzbrojuje jakoukoliv nákupní obranu.'
      },
      {
        label: '3. Krok: Nabídka VIP servisu',
        text: 'Rádo se stalo! Pokud bys tianDe chtěla vyzkoušet, doporučuji ti nezávaznou registraci VIP kartičky u mě. Dostaneš okamžitou slevu 35 % na celý košík a já budu tvůj osobní fytokonzultant – pohlídám ti dávkování i dárky. Co ty na to, vyzkoušíme to s tou slevou?',
        tip: 'Pozice "osobního konzultanta" dává nákupu prémiový pocit bezpečné péče.'
      }
    ],
    expertAdvice: 'Lidi nezajímá váš produkt, dokud nevidí, že pro ně máte pochopení. Nejprve prodejte svůj soucit a zájem, teprve pak tianDe.'
  },

  // --- BUSINESS PITCH ---
  {
    id: 'biz-pitch-1',
    situation: 'business_pitch',
    tone: 'direct_casual',
    title: 'Oslovení na spolupráci (Byznys příležitost)',
    description: 'Skvělé pro maminky na mateřské, kosmetičky, kadeřnice nebo aktivní ženy na sociálních sítích, které hledají online přivýdělek.',
    triggerHook: 'jejich aktivní / akční působení na sítích nebo touha po nezávislosti',
    steps: [
      {
        label: '1. Krok: Ocenění potenciálu a otevírák',
        text: 'Krásný den, {name}, narážím na tvůj profil a musím říct, že na mě působíš neskutečně akčně a pozitivně! 😊 Pracuji na novém projektu on-line marketingu s kosmetikou a fytoterapií pod vedením Ivany Nohovové. Právě rozšiřujeme tým o šikovné, komunikativní ženy. Hledáš momentálně nějakou možnost přivýdělku na mobilu z domu, nebo jsi spokojená tam, kde jsi?',
        tip: 'Zakončení "nebo jsi spokojená tam, kde jsi" dává druhému bezpečnou únikovou cestu a nepůsobí to jako nátlakový spam.'
      },
      {
        label: '2. Krok: Vysvětlení konceptu (bez složitostí)',
        text: 'Máš pravdu, s dětmi / hlavní prací je čas drahý. Náš systém je úžasný v tom, že nepotřebuješ žádné sklady ani vstupní balíčky. Lidem pouze doporučujeme produkty na {topic} se slevou 35 %. Vše probíhá přes sociální sítě z mobilu a máme hotové šablony a návštěvy do našich on-line akademií. Ráda ti pošlu krátké 3minutové video, kde je to dokonale vysvětlené od Ivany. Můžu ti ho poslat na zkouknutí?',
        tip: 'Nabídka krátkého explainer videa je nejjednodušší krok. Nikdo nechce číst dlouhé texty o byznys plánu.'
      },
      {
        label: '3. Krok: Závazek k hovoru nebo registraci partnera',
        text: 'Super! Tady je to video: [ODKAZ]. Koukni na to v klidu večer a zítra bychom si mohly napsat nebo na 5 minut zavolat a probrat, jestli by tě to bavilo. Nemáš co ztratit, registrace partnera je zdarma a hned získáš přístup k našemu know-how. Kdy se ti zítra hodí krátký pokec?',
        tip: 'Směřujte konverzaci ke krátkému telefonátu. Přes hlas se buduje důvěra k MLM byznysu stokrát rychleji než psaním.'
      }
    ],
    expertAdvice: 'Nehledejte lidi, které musíte přemlouvat. Hledejte akční lidi, kteří už teď podvědomě touží po změně, uznání a svobodě.'
  },

  // --- CUSTOMER FOLLOWUP ---
  {
    id: 'followup-1',
    situation: 'customer_followup',
    tone: 'empathetic',
    title: 'Péče o zákazníka 3 dny po doručení balíčku',
    description: 'Zapečeťte loajalitu klienta. Skvělý proklientský přístup, který odlišuje profesionální MLM od obyčejného e-shopu.',
    triggerHook: 'převzetí balíčku tianDe zákazníkem',
    steps: [
      {
        label: '1. Krok: Kontrola doručení a návod k použití',
        text: 'Ahoj {name}, viděla jsem v systému, že ti před pár dny dorazil tvůj balíček TianDe! Chci se tě jen zeptat, jestli přišlo všechno v pořádku a v pořádku se ti podařilo rozbalit {trigger}? 😊',
        tip: 'Zeptejte se na doručení a vyjádřete osobní péči hned na startu.'
      },
      {
        label: '2. Krok: Připomenutí správného postupu',
        text: 'Skvělé! Jen ti chci pro jistotu připomenout, že u produktů s {substance} je hrozně důležité pro nejlepší efekt na {topic} postupovat přesně tak, jak jsme si říkaly – nejdříve nanést malé množství na vyčištěnou pleť a jemně vklepat. Kdyby tě cokoliv zajímalo k postupu, hned mi napiš, jsem tu pro tebe jako online průvodce!',
        tip: 'Ujistěte se, že produkt používají správně. Špatné použití vede k nespokojenosti, správné k trvalému zákazníkovi.'
      },
      {
        label: '3. Krok: Budování komunitního kruhu (Facebook skupina)',
        text: 'Jo a mimochodem, {name}, ještě jsem tě zapomněla přidat do naší uzavřené klientské skupiny "Bylinná cesta s Ivanou". Denně tam sdílíme tipy, soutěže a reálné proměny ostatních holek. Chceš, abych tě tam přidala, ať ti neutečou žádné akce a dárky příští měsíc?',
        tip: 'Uzavřená Facebook skupina udržuje klienta v "teplém stavu" a inspiruje ho k dalšímu nákupu bez vaší práce.'
      }
    ],
    expertAdvice: 'Pravý MLM byznys nekončí prodejem. Pravý byznys prodejem teprve začíná. Následná péče generuje 80 % opakovaných objednávek.'
  }
];

export const ScriptsPillar: React.FC = () => {
  // Configurator states
  const [selectedSituation, setSelectedSituation] = useState<ScriptSituation>('warm_reconnection');
  const [selectedTone, setSelectedTone] = useState<ScriptTone>('friendly');
  
  // Custom Variables for dynamic replace
  const [contactName, setContactName] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [customTrigger, setCustomTrigger] = useState('');
  const [customSubstance, setCustomSubstance] = useState('');

  // App interaction states
  const [savedUserScripts, setSavedUserScripts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'copier' | 'library' | 'academy'>('copier');
  const [copiedStepIndex, setCopiedStepIndex] = useState<number | null>(null);
  const [copiedFullId, setCopiedFullId] = useState<string | null>(null);

  // Default placeholders helper when changing Situation
  useEffect(() => {
    if (selectedSituation === 'warm_reconnection') {
      setCustomTrigger('dovolené na Šumavě před třemi lety');
      setCustomTopic('suchou a citlivou pleť v zimě');
      setCustomSubstance('hadí tuk mamushi');
      setSelectedTone('friendly');
    } else if (selectedSituation === 'story_reaction') {
      setCustomTrigger('můj Reels s hadím krémem Snake Factor');
      setCustomTopic('ztrátu kolagenu v pleti');
      setCustomSubstance('retinol a hadí olej');
      setSelectedTone('friendly');
    } else if (selectedSituation === 'product_need') {
      setCustomTrigger('příspěvek o vypadávání vlasů po porodu');
      setCustomTopic('aktivaci růstu nových vlasů a kořínků');
      setCustomSubstance('extrakt z tříletého ženšenu');
      setSelectedTone('empathetic');
    } else if (selectedSituation === 'business_pitch') {
      setCustomTrigger('krásné designové posty a tvoji energii');
      setCustomTopic('nedostatek financí na mateřské aneb extra příjem');
      setCustomSubstance('provizní affiliate systém');
      setSelectedTone('direct_casual');
    } else if (selectedSituation === 'customer_followup') {
      setCustomTrigger('Hlemýždí sadu Snail Organics');
      setCustomTopic('hlubokou regeneraci a vrásky');
      setCustomSubstance('hlemýždí mucin a filtrát');
      setSelectedTone('empathetic');
    }
  }, [selectedSituation]);

  // Load saved scripts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tiande_saved_scripts');
    if (saved) {
      try {
        setSavedUserScripts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed parsing saved scripts', e);
      }
    }
  }, []);

  // Filter templates based on situation
  const currentScripts = SCRIPTS_DATABASE.filter(s => s.situation === selectedSituation);
  // Find closest matching tone from the subset
  const activeScript = currentScripts.find(s => s.tone === selectedTone) || currentScripts[0];

  // Helper to dynamically compile a step
  const compileStepText = (rawText: string): string => {
    const nameStr = contactName.trim() || 'Petro';
    const topicStr = customTopic.trim() || '[problém]';
    const triggerStr = customTrigger.trim() || '[zážitku]';
    const substanceStr = customSubstance.trim() || '[účinné látky]';

    return rawText
      .replace(/{name}/g, nameStr)
      .replace(/{topic}/g, topicStr)
      .replace(/{trigger}/g, triggerStr)
      .replace(/{substance}/g, substanceStr);
  };

  const handleCopyStep = (rawText: string, stepIndex: number) => {
    const compiled = compileStepText(rawText);
    navigator.clipboard.writeText(compiled);
    setCopiedStepIndex(stepIndex);
    setTimeout(() => setCopiedStepIndex(null), 1800);
  };

  const handleCopyFullScript = (script: ScriptTemplate, id: string) => {
    let output = `💬 ${script.title.toUpperCase()} (Šablona do zpráv TianDe)\n`;
    output += `==================================================\n`;
    output += `Navrženo pro: ${contactName.trim() || 'Zákazníka'}\n`;
    output += `Tón zpráv: ${selectedTone === 'friendly' ? 'Přátelský' : selectedTone === 'empathetic' ? 'Empatický celostní' : 'Přímý casual'}\n\n`;

    script.steps.forEach(step => {
      output += `${step.label}:\n`;
      output += `"${compileStepText(step.text)}"\n\n`;
    });

    output += `💡 EXPERTNÍ TIP (Ivana Nohovová):\n`;
    output += `"${script.expertAdvice}"\n`;

    navigator.clipboard.writeText(output);
    setCopiedFullId(id);
    setTimeout(() => setCopiedFullId(null), 2000);

    // Save history
    const isSavedAlready = savedUserScripts.some(s => s.title === script.title && s.clientName === (contactName.trim() || 'Zákazníkovi'));
    if (!isSavedAlready) {
      const newSaved = {
        id: Date.now().toString(),
        title: script.title,
        clientName: contactName.trim() || 'Zákazník',
        category: selectedSituation === 'warm_reconnection' ? 'Oživení' : selectedSituation === 'story_reaction' ? 'Reakce' : selectedSituation === 'product_need' ? 'Problém' : selectedSituation === 'business_pitch' ? 'Podnikání' : 'Followup',
        date: new Date().toLocaleDateString('cs-CZ'),
        fullText: output
      };
      const updated = [newSaved, ...savedUserScripts];
      setSavedUserScripts(updated);
      localStorage.setItem('tiande_saved_scripts', JSON.stringify(updated));
    }
  };

  const handleDeleteSaved = (id: string) => {
    const filtered = savedUserScripts.filter(s => s.id !== id);
    setSavedUserScripts(filtered);
    localStorage.setItem('tiande_saved_scripts', JSON.stringify(filtered));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 inline-block">
            Etické MLM bez otravování
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            Předlohy na <span className="serif-italic text-slate-400">konverzaci</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl">
            Sestavte si elegantní konverzační toky, které oživí staré kontakty, promění storíčka v objednávky a získají byznys partnery. Vychází z psychologie etického prodeje s nulovým spamováním.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
          <button 
            onClick={() => setActiveTab('copier')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'copier' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Předlohy zpráv
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === 'library' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Uložené konverzace
            {savedUserScripts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black animate-pulse">
                {savedUserScripts.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('academy')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'academy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Pravidla etické zprávy
          </button>
        </div>
      </header>

      {activeTab === 'academy' ? (
        // Educational Academy
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <UserCheck className="w-5 h-5 text-pink-500" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Desatero Ivany Nohovové: Jak nepsat jako robot</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-red-100 p-5 rounded-xl bg-red-50/30">
              <div className="text-red-600 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>❌ Takhle to NIKDY nedělejte (MLM Spam):</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong>Kopírování a posílání obřích odstavců:</strong> Posílání nevyžádaných odkazů a katalogů lidem do zpráv hned v prvním kontaktu bez zeptání.
                </li>
                <li className="leading-relaxed">
                  <strong>Předstírání zájmu s rychlým prodejem:</strong> "Ahoj, jak se máš? Dlouho jsme se neviděly. Jinak dělám super kosmetiku s hlemýžděm, tady je link." (Most okamžitě shoří).
                </li>
                <li className="leading-relaxed">
                  <strong>Používání umělého a prodejního jazyka:</strong> "Máme revoluční, unikátní patentovaný produkt, který vyléčí vše na světě." Druhá strana ucítí manipulaci.
                </li>
              </ul>
            </div>

            <div className="border border-green-100 p-5 rounded-xl bg-green-50/30">
              <div className="text-green-700 font-bold uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" />
                <span>✅ Takhle se staví stabilní síť (Vztahové MLM):</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="leading-relaxed">
                  <strong>Zeptejte se na povolení (Permission-Based Selling):</strong> Než pošlete jakýkoliv obrázek, referenci před/po nebo odkaz, zeptejte se: <em>"Můžu ti poslat krátký fytorecept (seznam doporučených bylinných fytoproduktů na míru) holčiny, co vyřešila stejný problém?"</em>
                </li>
                <li className="leading-relaxed">
                  <strong>Vždy poděkujte za reakci:</strong> Reakce, lajky, ankety jsou dary. Berte je jako začátek dialogu o nich, ne o vašem byznysu. Rozmotejte klubíčko jejich potřeb.
                </li>
                <li className="leading-relaxed">
                  <strong>Třetina vašeho úspěchu je vaše vlastní konzultování:</strong> Nabuďte v nich pocit, že s produktem tianDe si kupují vás jako mentora a VIP slevu 35 %. To z vás činí profesionálku.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      ) : activeTab === 'library' ? (
        // Saved scripts history list
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <Clock className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider">Moje nedávno sestavené zprávy</h3>
          </div>

          {savedUserScripts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400 text-xs font-medium">Zatím jste nevygenerovali žádné personalizované zprávy.</p>
              <button 
                onClick={() => setActiveTab('copier')}
                className="mt-4 px-4 py-2 bg-tiande-blue text-white rounded text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity"
              >
                Otevřít předlohy
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedUserScripts.map((s) => (
                <div key={s.id} className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-black bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded border border-pink-200">
                          {s.category}
                        </span>
                        <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Pro: {s.clientName}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">{s.title} • {s.date}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(s.fullText);
                          setCopiedFullId(s.id);
                          setTimeout(() => setCopiedFullId(null), 2000);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded hover:border-slate-300 text-xs font-bold text-slate-600 shadow-sm transition-all"
                      >
                        {copiedFullId === s.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-600">Zkopírováno!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Kopírovat celý chat</span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleDeleteSaved(s.id)}
                        className="p-1.5 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 bg-white rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <details className="group">
                    <summary className="text-[11px] font-bold text-slate-500 hover:text-slate-700 cursor-pointer list-none flex items-center gap-1">
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-open:rotate-90" />
                      <span>Zobrazit kompletní strukturu chatu krok za krokem</span>
                    </summary>
                    <pre className="mt-3 p-4 bg-white border border-slate-200 rounded text-[11px] text-slate-600 font-mono tracking-wide overflow-x-auto leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
                      {s.fullText}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        // ----------------- COPIER GENERATOR TAB -----------------
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Inputs Configurator Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>Krok 1: Výběr Konverzační Situace</span>
                </h3>
              </div>

              {/* Situation Picker */}
              <div className="space-y-2">
                {[
                  { id: 'warm_reconnection', label: 'Oživení vztahu (Warming-Up)', desc: 'Obnovení důvěry se známým bez okamžitého prodeje' },
                  { id: 'story_reaction', label: 'Reakce na zájem (Stories/Lajky)', desc: 'Odpovědi na anketní hlasování a lajky v ankietě' },
                  { id: 'product_need', label: 'Hledání řešení (Pain-Point)', desc: 'Empatická odpověď na něčí zranitelný zdravotní status' },
                  { id: 'business_pitch', label: 'Byznys příležitost (MLM)', desc: 'Etické oslovení na on-line spolupráci přímo z mobilu' },
                  { id: 'customer_followup', label: 'Péče po prodeji (Follow-up)', desc: 'Zajištění spokojenosti a zapojení do FB komunity' }
                ].map((sit) => (
                  <button
                    key={sit.id}
                    onClick={() => setSelectedSituation(sit.id as ScriptSituation)}
                    className={`w-full flex flex-col p-3 rounded-lg border text-left transition-all ${
                      selectedSituation === sit.id 
                      ? 'border-tiande-blue bg-blue-50/50 text-slate-900 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${selectedSituation === sit.id ? 'bg-tiande-blue' : 'bg-slate-300'}`} />
                      <span className="text-xs font-black uppercase tracking-wider">{sit.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium mt-1 pl-4 leading-normal">{sit.desc}</span>
                  </button>
                ))}
              </div>

              {/* Step 2 Form Variables */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-4">
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block border-b border-slate-200 pb-1.5">
                  Krok 2: Personalizace Zpráv
                </span>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Oslovení (Jméno v 5. pádě):</label>
                    <input 
                      type="text" 
                      placeholder="např. Petro, Lucie, paní Jano"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:border-tiande-blue outline-none transition-colors font-medium text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Spouštěč konverzace (Trigger):</label>
                    <input 
                      type="text" 
                      value={customTrigger}
                      onChange={(e) => setCustomTrigger(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:border-tiande-blue outline-none transition-colors text-slate-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Téma / Problém (Topic):</label>
                    <input 
                      type="text" 
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:border-tiande-blue outline-none transition-colors text-slate-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Doporučená aktivní složka (Substance):</label>
                    <input 
                      type="text" 
                      value={customSubstance}
                      onChange={(e) => setCustomSubstance(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:border-tiande-blue outline-none transition-colors text-slate-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Tone of message */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Tón Zpráv</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
                  {[
                    { id: 'friendly', label: 'Přátelský / Kamarádský' },
                    { id: 'empathetic', label: 'Empatický / Odborný' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTone(t.id as ScriptTone)}
                      className={`py-1.5 rounded text-center text-xs font-bold transition-all ${
                        selectedTone === t.id 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Preview Conversational Steps Panel */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="label-caps !text-slate-800 flex items-center justify-between">
              <span>Etický konverzační scénář krok za krokem</span>
              <button
                onClick={() => handleCopyFullScript(activeScript, activeScript.id)}
                className="text-[10px] bg-slate-900 text-white font-bold uppercase tracking-widest px-3.5 py-1.5 rounded hover:opacity-95 shadow-sm transition-all flex items-center gap-1"
              >
                {copiedFullId === activeScript.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-300" />
                    <span>Zástavkový report zkopírován</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopírovat kompletní chat</span>
                  </>
                )}
              </button>
            </h3>

            {/* Steps output cards */}
            <div className="space-y-4">
              {activeScript.steps.map((step, index) => {
                const compiledText = compileStepText(step.text);

                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all flex gap-4 relative overflow-hidden"
                  >
                    {/* Left indicator thread line */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-tiande-blue" />

                    <div className="flex-1 space-y-3 pl-1">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-black uppercase text-tiande-blue tracking-wider">{step.label}</span>
                        
                        <button
                          onClick={() => handleCopyStep(step.text, index)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 border rounded text-[10px] font-black uppercase tracking-wider transition-all ${
                            copiedStepIndex === index 
                            ? 'bg-green-50 border-green-200 text-green-600'
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {copiedStepIndex === index ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-500" />
                              <span>Zkopírováno vč. jména</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Kopírovat krok</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-lg relative">
                        {/* Messenger speech bubble aesthetic wrapper */}
                        <p className="text-xs text-slate-800 leading-relaxed font-medium font-sans">
                          {compiledText}
                        </p>
                      </div>

                      <div className="bg-pink-50/20 border border-pink-100/40 p-3 rounded text-[10px] flex gap-2">
                        <Lightbulb className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Psychologie tohoto kroku:</p>
                          <p className="text-slate-600 leading-relaxed font-medium">{step.tip}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Coach audio commentary box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-[0.03]">
                <MessageSquare className="w-48 h-48" />
              </div>

              <div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-pink-200 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-pink-600 animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em]">Strategická audio rada lídra</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  Ivana Nohovová • Jak pracovat s předlohami:
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  "{activeScript.expertAdvice} Když si s někým píšete, buďte přirození a nikdy nepoužívejte zprávu 1:1 jako spamový robot. Pokud vám druhá strana odpoví s obavami, přejděte na náš pilíř <strong>'Pravidla / Námitky'</strong> nahoře, kde máme hotové argumenty na vše od peněz po drahé poštovné. Držíte v ruce zlaté etické MLM!"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
