import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  RefreshCw, 
  Flame, 
  TrendingUp, 
  HelpCircle, 
  Users, 
  Megaphone, 
  Video, 
  MessageSquare, 
  Heart,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  Search,
  BookOpen
} from 'lucide-react';

// Definitions for Category/Angle
type HookCategory = 'skincare' | 'health' | 'womens_health' | 'eco_home' | 'business' | 'curiosity';
type HookFormat = 'reels' | 'post' | 'stories';
type HookTone = 'controversial' | 'emotional' | 'benefit' | 'story' | 'challenge';

interface HookTemplate {
  id: string;
  category: HookCategory;
  tone: HookTone;
  format: HookFormat;
  hookText: string; // The hook (Placeholders inside like: {substance}, {problem}, {outcome})
  bodyBlueprint: string; // Follow-up script
  ctaText: string; // Call to Action suggestion
  expertNote: string; // Why this works (MLM psychology)
}

// Custom data of proven, high-converting MLM hooks matching TianDe products and business
const HOOK_DATABASE: HookTemplate[] = [
  // --- SKINCARE ---
  {
    id: 'skin-1',
    category: 'skincare',
    tone: 'controversial',
    format: 'reels',
    hookText: 'Přestaňte bezhlavě vyhazovat peníze za kosmetiku z drogerie, pokud máte {problem}!',
    bodyBlueprint: 'Ukažte v prvních vteřinách detail své pleti nebo lahvičku. Vysvětlete, že běžná kosmetika často obsahuje levná plnidla, která kůži ucpou. Představte fytokosmetiku s {substance}, která působí přímo v doplňování lipidů.',
    ctaText: 'Napište slovo "{keyword}" do komentáře a já vám pošlu srovnání, které vám zachrání pleť i peněženku.',
    expertNote: 'Kontroverze zastaví skrolování, protože zpochybňuje běžné nákupní návyky diváka.'
  },
  {
    id: 'skin-2',
    category: 'skincare',
    tone: 'benefit',
    format: 'reels',
    hookText: 'Tohle je přesný důvod, proč korejské ženy nemají {problem} ani v 50 letech.',
    bodyBlueprint: 'Předveďte aplikaci lehkého boosteru nebo tonika. Zmiňte, že klíčem je hydratace v hlubokých vrstvách pomocí {substance}. Ukažte okamžitý šťavnatý lesk své pleti na kameru.',
    ctaText: 'Chcete stejný lesk? Napište pod video "{keyword}" a pošlu vám odkaz na tajné tonikum s VIP 35% slevou.',
    expertNote: 'Reference na korejskou péči a bezchybnou pleť má extrémně vysokou důvěryhodnost a touhu po výsledku.'
  },
  {
    id: 'skin-3',
    category: 'skincare',
    tone: 'story',
    format: 'post',
    hookText: 'Zákaznice mi volala s pláčem, protože po {problem} měla celou kůži zničenou...',
    bodyBlueprint: 'Podělte se o upřímný příběh, jak se klientka styděla chodit mezi lidi. Poté, co vyzkoušela {substance}, se po 10 dnech probudila se zklidněnou a sjednocenou pletí. Ukažte fotky před/po, pokud je máte.',
    ctaText: 'Klikněte na odkaz v mém biu pod názvem "{keyword}" a pojďme vybrat péči k vaší nové sebejistotě.',
    expertNote: 'Lidé milují emoce a reálná klientská svědectví. Příběh buduje hlubokou důvěru a empatii.'
  },
  {
    id: 'skin-4',
    category: 'skincare',
    tone: 'challenge',
    format: 'stories',
    hookText: 'Trápí vás {problem}? Dávám vám 14denní výzvu. Pokud tohle nezafunguje, osobně vám vrátím peníze.',
    bodyBlueprint: 'Vysvětlete pravidla výzvy s {substance}. Ukažte, jak jednoduché je nanést malé množství krému večer před spaním. Vyzvěte sledující, ať se přidají s vámi.',
    ctaText: 'Hlasujte v anketě níže "CHCI ZMĚNU" a ozvu se vám dřív, než výzva odstartuje!',
    expertNote: 'Omezení rizika na nulu (záruka vrácení / garance) dramaticky zvyšuje konverzi a eliminuje obavy.'
  },

  // --- HEALTH / WELLNESS ---
  {
    id: 'health-1',
    category: 'health',
    tone: 'benefit',
    format: 'reels',
    hookText: 'Pijete každé ráno kolagen, ale vaše kolena a záda dál {problem}?',
    bodyBlueprint: 'Vysvětlete rozdíl mezi běžným kolagenem a hydrolyzovaným kolagenem s vitamínem C. Naznačte, že tělo bez správné formy bílkoviny nedokáže chrupavku opravit a kolagen se prostě vyloučí bez užitku.',
    ctaText: 'Komentujte slovem "{keyword}" a pošlu vám video o tom, jak vybrat biologicky aktivní kolagen.',
    expertNote: 'Tento hook cílí na "frustraci z neúčinnosti" u lidí, kteří sice doplňky stravy užívají, ale nevidí změnu.'
  },
  {
    id: 'health-2',
    category: 'health',
    tone: 'emotional',
    format: 'post',
    hookText: 'Už jsem si myslela, že se kvůli bolesti nebudu moci vrátit k {problem}...',
    bodyBlueprint: 'Popište ranní ztuhlost kloubů a pocit, že vaše tělo stárne dvakrát rychleji. Poté popište zlom, kdy jste začala pít fytoterapeutické čaje a užívat aktivní tekutý peptid.',
    ctaText: 'Zajímá vás moje denní fytorutina? Napište do komentáře "{keyword}" a ráda vám poradím.',
    expertNote: 'Zranitelnost a sdílení osobního omezení zvedá engagement, protože mnoho lidí prožívá úplně stejnou únavu.'
  },
  {
    id: 'health-3',
    category: 'health',
    tone: 'controversial',
    format: 'reels',
    hookText: 'Hnusná pravda o doplňcích stravy, kterou vám v lékárně určitě nechtějí {problem}!',
    bodyBlueprint: 'V lékárně často prodávají syntetické vitamíny s minimální vstřebatelností (např. 5-10 %). Představte přírodní prebiotika a fytoterapii tianDe, u které je kladen důraz na synergii bylin a přírodních nosičů.',
    ctaText: 'Získejte kompletní přehled vstřebatelnosti s kódem "{keyword}". Sledujte mě pro další nezkreslené informace.',
    expertNote: 'Odhalování tajemství z pozice experta buduje silný status autority na sociálních sítích.'
  },

  // --- WOMENS HEALTH ---
  {
    id: 'women-1',
    category: 'womens_health',
    tone: 'emotional',
    format: 'reels',
    hookText: 'Už žádné křeče, které vás donutí rušit schůzky nebo trpět v posteli s {problem}!',
    bodyBlueprint: 'Ukažte bylinný fytoobklad na intimní hygienu. Vysvětlete, že suchý obklad z 19 léčivých čínských bylin se vstřebává přes sliznice přímo k děloze a pomáhá harmonizovat ženský cyklus.',
    ctaText: 'Pokud chcete prožít další cyklus v naprosté úlevě a energii, napište do zpráv "{keyword}".',
    expertNote: 'Téma menstruační úlevy je pro ženy extrémně naléhavé. Cílí na touhu po bezbolestném životě.'
  },
  {
    id: 'women-2',
    category: 'womens_health',
    tone: 'controversial',
    format: 'post',
    hookText: 'Běžné chemické vložky jsou bělené chlorem a mohou vám tajně způsobovat {problem}!',
    bodyBlueprint: 'Šokující fakta o tom, co běžně nosíme na nejcitlivějším místě těla. Plast, chlor, parfemace. Kontrastujte to s patentovanou bylinnou řadou Nefritová Svěžest s obsahem máty, kamélie a fytosterolů.',
    ctaText: 'Napište slovo "{keyword}" a já vám pošlu brožurku o přírodním ženském zdraví a cestě k harmonii.',
    expertNote: 'Vytváří okamžitý varovný efekt. Ženy chtějí chránit své zdraví, když se dozví o škodlivosti chemie.'
  },

  // --- ECO HOME ---
  {
    id: 'eco-1',
    category: 'eco_home',
    tone: 'benefit',
    format: 'reels',
    hookText: 'Takhle zatočíte s mastnotou a špínou bez toho, abyste dýchali jedovaté výpary a měli {problem}!',
    bodyBlueprint: 'Ukažte mytí mastné pánve s ekologickým saponátem na nádobí z mýdlových ořechů Sapindus. Ukažte, že se s ním dají mýt i hračky pro miminka a kůže rukou zůstává hebká a hydratovaná.',
    ctaText: 'Pokud chcete mít ekologickou domácnost bez ekzémů, napište pod video komentář "{keyword}"!',
    expertNote: 'Ideální pro maminky s dětmi, ekology a lidi s citlivou pokožkou. Řeší úklid versus zdraví rodiny.'
  },

  // --- BUSINESS / MLM RECRUITING ---
  {
    id: 'biz-1',
    category: 'business',
    tone: 'challenge',
    format: 'reels',
    hookText: 'Vyměňte 2 hodiny bezcílného skrolování na sítích za dodatečný příjem, abyste už nemuseli řešit {problem}!',
    bodyBlueprint: 'Držte v ruce telefon. Řekněte: "Tento telefon vám buď peníze bere, nebo vám je vydělává. Já s ním spravuji svůj online MLM obchod v TianDe přímo z gauče během mateřské." Upřesněte, že nepotřebujete vlastní sklady.',
    ctaText: 'Napište slovo "{keyword}" a já vám pošlu 5minutové video o tom, jak začít od nuly bez poplatků.',
    expertNote: 'Vyzývá k akci a nabízí jasnou alternativu k neproduktivnímu času na sociálních sítích.'
  },
  {
    id: 'biz-2',
    category: 'business',
    tone: 'story',
    format: 'post',
    hookText: 'Když jsem s TianDe začínala, všichni v mém okolí se mi smáli a tvrdili, že {problem}...',
    bodyBlueprint: 'Popište překážky na začátku, pochybnosti rodiny, pocity selhání. Pak přepněte na zvrat: setkání s Ivanou Nohovovou, pochopení systému a první stabilní výplata na účtu. Dnes mi tianDe platí dovolené.',
    ctaText: 'Chcete všem dokázat, že na to máte? Napište mi zprávu "{keyword}" a já vás osobně povedu.',
    expertNote: 'Příspěvky typu "Smáli se mi, ale teď..." mají nejvyšší míru sdílení v MLM historii. Aktivují emoci hrdosti.'
  },
  {
    id: 'biz-3',
    category: 'business',
    tone: 'benefit',
    format: 'stories',
    hookText: 'Tohle je jediný legální způsob, jak si vybudovat pasivní příjem bez miliónů na investování do nemovitostí nebo {problem}.',
    bodyBlueprint: 'Ukažte jednoduchý nákupní košík s běžnou spotřební kosmetikou (šampon, pasta). Řekněte, že lidé si tyhle věci kupovat nepřestanou. Když jim ukážete TianDe s 35% slevou, firma vám platí provize z každého jejich nákupu.',
    ctaText: 'Klikněte na odkaz níže pro zhlédnutí mého bezplatného webináře "{keyword}".',
    expertNote: 'Peníze a pasivní příjem jsou univerzální motivátory. Srovnání s drahým nákupem realit zjednodušuje pochopení síly MLM.'
  },

  // --- CURIOSITY & CONTROVERSY ---
  {
    id: 'curiosity-1',
    category: 'curiosity',
    tone: 'controversial',
    format: 'reels',
    hookText: 'NEKUPUJTE si {substance}, dokud neuvidíte toto šokující video!',
    bodyBlueprint: 'Vzbuďte dramatické napětí. Řekněte: "Nekupujte ho, pokud nechcete, aby se vás lidé ptali, u kterého chirurga jste byli na botoxu." S humorem ukažte fantastické vyrovnání vrásek po nanesení řady Snake Factor.',
    ctaText: 'Chcete mít stejné "nebezpečně rychlé" omlazení? Napište pod video "{keyword}" a pošlu vám odkaz.',
    expertNote: 'Negativní příkaz na začátku ("Nekupujte!") okamžitě upoutá pozornost podvědomým vzdorem diváka.'
  }
];

export const HooksPillar: React.FC = () => {
  // Configurator states
  const [selectedCategory, setSelectedCategory] = useState<HookCategory>('skincare');
  const [selectedTone, setSelectedTone] = useState<HookTone>('benefit');
  const [selectedFormat, setSelectedFormat] = useState<HookFormat>('reels');
  
  // Custom Variables for live dynamic replace
  const [customSubstance, setCustomSubstance] = useState('');
  const [customProblem, setCustomProblem] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');

  // Generated & Saved state
  const [savedHooks, setSavedHooks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'generator' | 'saved' | 'guide'>('generator');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load saved hooks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tiande_saved_hooks');
    if (saved) {
      try {
        setSavedHooks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed parsing saved hooks', e);
      }
    }
  }, []);

  // Set default placeholders based on selected category to make generations look awesome right away!
  useEffect(() => {
    if (selectedCategory === 'skincare') {
      setCustomSubstance('hlemýždí mucin');
      setCustomProblem('hluboké mimické vrásky');
      setCustomKeyword('ŠNEK');
    } else if (selectedCategory === 'health') {
      setCustomSubstance('peptidy kolagenu');
      setCustomProblem('při chůzi do schodů bolí a skřípou');
      setCustomKeyword('KOLAGEN');
    } else if (selectedCategory === 'womens_health') {
      setCustomSubstance('19 léčivých čínských bylin');
      setCustomProblem('silnou bolestí a křečemi břicha');
      setCustomKeyword('HARMONIE');
    } else if (selectedCategory === 'eco_home') {
      setCustomSubstance('mýdlové ořechy Sapindus');
      setCustomProblem('vysušené a podrážděné ruce plné ekzémů');
      setCustomKeyword('EKODOMOV');
    } else if (selectedCategory === 'business') {
      setCustomSubstance('provizní systém TianDe');
      setCustomProblem('neustálé počítání každé koruny před výplatou');
      setCustomKeyword('START');
    } else {
      setCustomSubstance('hadí tuk mamushi');
      setCustomProblem('suchou, popraskanou kůži');
      setCustomKeyword('TAJEMSTVÍ');
    }
  }, [selectedCategory]);

  // Handle saving a generated hook to Favorites
  const handleSaveHook = (hook: HookTemplate, processedText: string) => {
    const isAlreadySaved = savedHooks.some(sh => sh.rawId === hook.id && sh.text === processedText);
    if (isAlreadySaved) return;

    const newSaved = {
      id: Date.now().toString(),
      rawId: hook.id,
      category: hook.category,
      tone: hook.tone,
      format: hook.format,
      text: processedText,
      blueprint: hook.bodyBlueprint,
      cta: hook.ctaText.replace('{keyword}', customKeyword || 'CHCI'),
      savedAt: new Date().toLocaleDateString('cs-CZ')
    };

    const updated = [newSaved, ...savedHooks];
    setSavedHooks(updated);
    localStorage.setItem('tiande_saved_hooks', JSON.stringify(updated));
  };

  const handleDeleteSavedHook = (id: string) => {
    const filtered = savedHooks.filter(sh => sh.id !== id);
    setSavedHooks(filtered);
    localStorage.setItem('tiande_saved_hooks', JSON.stringify(filtered));
  };

  // Replace utility for interpolations
  const processTemplate = (text: string): string => {
    return text
      .replace(/{substance}/g, customSubstance.trim() || '[Složka]')
      .replace(/{problem}/g, customProblem.trim() || '[Problém]')
      .replace(/{keyword}/g, customKeyword.trim() || 'CHCI');
  };

  // Filtering templates based on user choice
  const filteredTemplates = HOOK_DATABASE.filter(h => {
    // If we have an exact match of Category, show those.
    // If empty result for a specific Tone + Format configuration, fallback to matching just Category so the generator always displays great outcomes.
    return h.category === selectedCategory;
  });

  const handleCopyText = (fullText: string, id: string) => {
    navigator.clipboard.writeText(fullText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="bg-pink-100 text-pink-700 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 inline-block">
            Hooky na sítích
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            Generátor <span className="serif-italic text-slate-400">Social Media Hooks</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl">
            Tento nástroj vám navrhne dravé, psychologicky otestované úvodní věty pro vaše Reels, příspěvky i Stories. Zastavte uživatele při bezduchém skrolování a proměňte je v zákazníky TianDe!
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
          <button 
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'generator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Generátor
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === 'saved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Oblíbené Hooky
            {savedHooks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black animate-pulse">
                {savedHooks.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'guide' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Jak Psát Hooky
          </button>
        </div>
      </header>

      {activeTab === 'guide' ? (
        // Educational guide tab
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Flame className="w-5 h-5 text-pink-500" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">3 zlatá pravidla psychologie zastavení prstu</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-100 p-5 rounded-xl bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mb-3">1</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1.5">Efekt "Negative Frame" (Zákazy)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Náš mozek je evolučně naprogramován unikat nebezpečí a chybám. Věty začínající na <strong>"Nedělejte..."</strong>, <strong>"Přestaňte..."</strong>, nebo <strong>"Nikdy si nekupujte..."</strong> fungují až 3x lépe než pozitivní pobídky.
              </p>
            </div>
            <div className="border border-slate-100 p-5 rounded-xl bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mb-3">2</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1.5">Curiosity Gap (Zvědavostní mezera)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nikdy neříkejte celý výsledek v první větě. Hook musí položit otázku nebo nastínit tajemství, které divák vyřeší jedině tak, že zhlédne video do konce nebo si přečte celý popisek (např. <em>"...tajný důvod korejských žen"</em>).
              </p>
            </div>
            <div className="border border-slate-100 p-5 rounded-xl bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mb-3">3</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1.5">Jasná výzva na komentář (CTA Loop)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Algoritmy milují komentáře. Vyzvěte lidi, ať napíší jedno konkrétní slovo (např. <strong>"KOLAGEN"</strong>), a slibte jim, že jim do zpráv doručíte tajný tip nebo odkaz. To dramaticky zvyšuje dosah celého příspěvku.
              </p>
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-100 p-6 rounded-xl flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-pink-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-pink-900">Rada expertky Ivany Nohovové:</h4>
              <p className="text-xs text-pink-700 leading-relaxed font-medium">
                "Když nahráváte Reels video, prvních 2.5 vteřin určuje, zda lidé zůstanou, nebo odejdou. Hook musíte nejen <strong>mít napsaný velkým písmem uprostřed obrazovky</strong>, ale zároveň ho musíte hned na startu nahlas a energicky přečíst. Zkoušejte různé varianty z tohoto generátoru a sledujte, která má nejvíce zhlédnutí!"
              </p>
            </div>
          </div>
        </motion.div>
      ) : activeTab === 'saved' ? (
        // Saved Hooks view
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookmarkCheck className="w-5 h-5 text-pink-500 font-bold" />
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider">Moje oblíbená knihovna hooků</h3>
          </div>

          {savedHooks.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400 text-xs font-medium">Zatím jste si neuložili žádné vygenerované šablony.</p>
              <button 
                onClick={() => setActiveTab('generator')}
                className="mt-4 px-4 py-2 bg-tiande-blue text-white rounded text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity"
              >
                Otevřít generátor
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedHooks.map((sh) => (
                <div key={sh.id} className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[9px] uppercase font-black bg-pink-50 text-pink-700 border border-pink-100 px-2 py-0.5 rounded">
                          {sh.category === 'skincare' ? 'PLEŤ' : sh.category === 'health' ? 'ZDRAVÍ' : sh.category === 'womens_health' ? 'ŽENSKÉ ZDRAVÍ' : sh.category === 'eco_home' ? 'EKODOMOV' : sh.category === 'business' ? 'BYZNYS Opportunity' : 'KONTROVERZE'}
                        </span>
                        <span className="text-[9px] uppercase font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {sh.format === 'reels' ? 'Reels / TikTok' : sh.format === 'post' ? 'Příspěvek FB/IG' : 'Stories'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Uloženo: {sh.savedAt}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={() => handleCopyText(`🔥 ${sh.text}\n\n📝 SCÉNÁŘ / NÁSLEDUJÍCÍ DĚJ:\n${sh.blueprint}\n\n📣 CTA (VÝZVA):\n${sh.cta}`, sh.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded hover:border-slate-300 text-xs font-bold text-slate-600 shadow-sm transition-all"
                      >
                        {copiedId === sh.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-600">Zkopírováno!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Zkopírovat vše</span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleDeleteSavedHook(sh.id)}
                        className="p-1.5 border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 bg-white rounded transition-colors"
                        title="Odstranit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="font-extrabold text-sm text-slate-800 leading-snug mb-3">
                    {sh.text}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white border border-slate-200/60 p-3.5 rounded-lg">
                      <p className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1">Následující děj / Scénář:</p>
                      <p className="text-slate-600 leading-relaxed text-[11px] font-medium">{sh.blueprint}</p>
                    </div>
                    <div className="bg-white border border-slate-200/60 p-3.5 rounded-lg">
                      <p className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1">Výzva k akci (CTA):</p>
                      <p className="text-tiande-blue leading-relaxed text-[11px] font-semibold">{sh.cta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        // ----------------- GENERATOR TAB -----------------
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left panel: Configurator inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>Nakonfigurujte svůj Hook</span>
                </h3>
              </div>

              {/* Step 1: Select Category */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Téma příspěvku (TianDe zaměření)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'skincare', label: 'Kosmetika / Pleť', icon: <Sparkles className="w-3.5 h-3.5" /> },
                    { id: 'health', label: 'Zdraví & Kolagen', icon: <Heart className="w-3.5 h-3.5" /> },
                    { id: 'womens_health', label: 'Ženské zdraví', icon: <Flame className="w-3.5 h-3.5" /> },
                    { id: 'eco_home', label: 'Ekodomov / Úklid', icon: <Lightbulb className="w-3.5 h-3.5" /> },
                    { id: 'business', label: 'Byznys / MLM ruka', icon: <Briefcase className="w-3.5 h-3.5" /> },
                    { id: 'curiosity', label: 'Hadí a šnečí řady', icon: <AlertTriangle className="w-3.5 h-3.5" /> }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as HookCategory)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-all ${
                        selectedCategory === cat.id 
                        ? 'border-tiande-blue bg-blue-50/50 text-tiande-blue font-black' 
                        : 'border-slate-100 hover:border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className={selectedCategory === cat.id ? 'text-tiande-blue' : 'text-slate-400'}>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Custom enrichers form */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3.5">
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest block border-b border-slate-200/50 pb-1.5">
                  Dynamická slova (Dosadí se do šablon)
                </span>

                <div className="grid gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Účinná Bylina/Aktika (Substance):</label>
                    <input 
                      type="text" 
                      placeholder="např. hlemýždí mucin..."
                      value={customSubstance}
                      onChange={(e) => setCustomSubstance(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:border-tiande-blue outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Problém / Frustrace (Problem):</label>
                    <input 
                      type="text" 
                      placeholder="např. akné, suchou pokožku, vrásky..."
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs focus:border-tiande-blue outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Klíčové slovo pro komentář (Keyword):</label>
                    <input 
                      type="text" 
                      placeholder="např. ŠNEK, MLÁDÍ, KOMFORT..."
                      value={customKeyword}
                      onChange={(e) => setCustomKeyword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs font-mono font-bold uppercase tracking-wider focus:border-tiande-blue outline-none text-pink-600 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Výstupní formát</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-lg">
                  {[
                    { id: 'reels', label: 'Reels / Video' },
                    { id: 'post', label: 'FB/IG Post' },
                    { id: 'stories', label: 'Stories / Storka' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFormat(f.id as HookFormat)}
                      className={`py-1.5 rounded text-center text-xs font-bold transition-all ${
                        selectedFormat === f.id 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Instant previews of generated Hooks */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="label-caps !text-slate-800 flex items-center justify-between">
              <span>Vygenerované kombinace stop-scrollu ({filteredTemplates.length})</span>
              <span className="text-[10px] text-slate-400 font-medium">Klikněte na hvězdičku pro uložení</span>
            </h3>

            {filteredTemplates.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 text-xs">
                Pro tuto kombinaci filtrů nemáme nadefinovanou šablonu. Změňte prosím téma nebo tón.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((hook) => {
                  const processedHookText = processTemplate(hook.hookText);
                  const isSaved = savedHooks.some(sh => sh.rawId === hook.id && sh.text === processedHookText);

                  return (
                    <motion.div 
                      key={hook.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all flex gap-4 relative overflow-hidden group"
                    >
                      {/* Left accent bar matching Category */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />

                      <div className="flex-1 space-y-4 pl-2">
                        {/* Tags and save/copy icons */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-pink-50 text-pink-700">
                              {hook.tone === 'controversial' ? '🚨 KONTROVERZNÍ' : hook.tone === 'benefit' ? '💎 BENEFIT' : hook.tone === 'emotional' ? '❤️ EMOCIONÁLNÍ' : hook.tone === 'story' ? '📖 PŘÍBĚH' : '💪 VÝZVA'}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-50 text-slate-500">
                              {hook.format === 'reels' ? 'Reels' : hook.format === 'post' ? 'Post' : 'Story'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleSaveHook(hook, processedHookText)}
                              className={`p-1.5 border rounded-md transition-all ${
                                isSaved 
                                ? 'bg-pink-100 border-pink-200 text-pink-600' 
                                : 'bg-white border-slate-200 text-slate-400 hover:text-pink-500 hover:border-pink-200'
                              }`}
                              title={isSaved ? "Uloženo" : "Uložit do oblíbených"}
                            >
                              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => handleCopyText(`🔥 ${processedHookText}\n\n📝 SCÉNÁŘ / NÁSLEDUJÍCÍ DĚJ:\n${hook.bodyBlueprint}\n\n📣 CTA (VÝZVA):\n${hook.ctaText.replace('{keyword}', customKeyword || 'CHCI')}`, hook.id)}
                              className="p-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 rounded-md transition-all"
                              title="Zkopírovat celý balíček"
                            >
                              {copiedId === hook.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* HOOK BODY */}
                        <div>
                          <p className="text-[9px] uppercase font-black tracking-wider text-pink-500">Háček (Titulek na video):</p>
                          <p className="font-black text-sm text-slate-800 line-clamp-2 mt-0.5 leading-snug">
                            🔥 {processedHookText}
                          </p>
                        </div>

                        {/* Hidden detailed preview that rolls under */}
                        <div className="grid md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                          <div className="space-y-1 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-1 text-[8px] uppercase font-black text-slate-400 tracking-wider">
                              <Video className="w-3 h-3 text-slate-400" />
                              <span>Střih / Akce ve videu:</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-normal font-medium">
                              {hook.bodyBlueprint}
                            </p>
                          </div>

                          <div className="space-y-1 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                            <p className="text-[8px] uppercase font-black text-slate-400 tracking-wider">Výzva k akci (CTA):</p>
                            <p className="text-[11px] text-tiande-blue leading-normal font-semibold">
                              {hook.ctaText.replace('{keyword}', customKeyword || 'CHCI')}
                            </p>
                          </div>
                        </div>

                        {/* Psychology notes */}
                        <div className="flex gap-1.5 items-start text-[10px] text-slate-400 bg-slate-50/30 p-2 rounded">
                          <Lightbulb className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                          <p className="leading-snug font-medium">
                            <span className="font-bold text-slate-500">Psychologický spouštěč:</span> {hook.expertNote}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
