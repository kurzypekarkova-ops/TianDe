import React, { useState, useRef, useEffect } from 'react';
import { 
  Book, 
  ChevronRight, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare, 
  Send, 
  BookOpenText, 
  Target, 
  ShieldAlert, 
  ListTodo, 
  HelpCircle, 
  Activity, 
  X, 
  Flame,
  Info
} from 'lucide-react';
import { PRODUCT_LINES } from '../data';
import { PRODUCT_LINES_DETAILS, ProductLineDetail } from '../data/productLinesData';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface AcademyModule {
  id: string;
  title: string;
  description: string;
  checklist: string[];
  tips: string;
}

const academyModules: AcademyModule[] = [
  {
    id: 'start',
    title: 'Jak začít s tianDe',
    description: 'Rychlý rozcestník a nezbytné základy pro nově registrované členky a budoucí lídry.',
    checklist: [
      'Definujte si své "PROČ" – Kolik chcete vydělávat a kolik hodin denně byznysu tianDe věnujete.',
      'Sama otestujte TOP bestseller (Slaviton, Bio Rehab nebo vložky Energie bylin). Osobní příběh je 80% úspěchu.',
      'Aktivujte si bezplatnou registraci. Vaše ID člena vám automaticky zajistí 35% marži ze všech klientských objednávek.',
      'Uložte si kontakty na svou sponzorku (lídra) a nechte se přidat do uzavřené klientské FB skupiny.'
    ],
    tips: 'Nováčka nezahltit! Zaměřte se v prvních dnech čistě na to, aby dostal/a první balíček a zažil/a onen pověstný "wow" efekt z altajských bylin.'
  },
  {
    id: 'marketing',
    title: 'Marketingový plán v praxi',
    description: 'Jednoduché vysvětlení, odkud plynou peníze v tianDe a jak fungují body a provize.',
    checklist: [
      'Základní okamžitá marže 35% – Nakoupíte za zvýhodněné VIP ceny a prodáte za doporučené katalogové ceny.',
      'Obdržíte provizní Body (skupinový obrat) – Každý produkt má body (cca 1 bod = 30-35 Kč). Přejímají se z celé vybudované sítě.',
      'Lignity Výplatní řád (5-38%) – Měsíční bonus ze skupinového obratu. Vlastní odběr pro výplaty z týmu je nutný ve výši min. 100 bodů (~3000 Kč).',
      'Kariérní bonusy a dárky – Speciální soutěže (Auto-bonus, Dovolená u moře za koruny) a odměny za postup na Manažera a výše.'
    ],
    tips: '100 bodů (cca 3000 Kč) pro měsíční aktivitu snadno nasbíráte z vlastní domácí spotřeby (šampon, gely, zubní pasty, prací proužky), které už nemusíte kupovat v drogerii.'
  },
  {
    id: 'brand',
    title: 'Tvorba osobní značky',
    description: 'Moderní cesta, jak prezentovat produkty na sítích s nulovým spamem a vysokou důvěrou.',
    checklist: [
      'Nekopírujte nudné obrázky z katalogu. Lidé nekupují tianDe z letáku, ale kupují VAŠI péči a autenticitu.',
      'Založte si uzavřenou VIP FB skupinku ("Fanklub") – tam tvořte bezpečné prostředí plné rad, videí z koupelny a soutěží.',
      'Využívejte Stories a Reels – Natočte se s maskou na obličeji nebo jak si masírujete nohy po práci. Pravdivý prožitek zaujme okamžitě.',
      'Oslovujte staré známé s radou, ne s prodejem – Zeptejte se jich, co je trápí (pleť, vlasy) a nabídněte vzoreček.'
    ],
    tips: 'Ukazujte se. Pokud se stydíte mluvit na kameru, foťte aspoň své ruce a hovořte o tom, co vám konkrétní šampon pomohl vyřešit.'
  },
  {
    id: 'duplication',
    title: 'Duplikace v týmu',
    description: 'Jak zaktivovat lidi a naučit je dělat stejné jednoduché kroky pro stabilní růst.',
    checklist: [
      'Zjednodušte postupy – Nový člověk musí být schopen vaše kroky zopakovat. Pokud jsou postupy moc složité, radši nic neudělá.',
      'Pravidlo 48 hodin – Po první registraci pomozte novému členovi provést jeho první objednávku a najít oblíbený produkt.',
      'Tříbříškový rituál kávy – Udělejte si jednou týdně společný zoom/videochat a proberte, co se daří, a ukažte jim naše online nástroje.',
      'Pochvala a motivace – Každý malý úspěch (první prodej, první přihlášený člen) veřejně pochvalte. Pozitivní energie pohání byznys kupředu.'
    ],
    tips: 'Tento asistent (Webová aplikace) je pro duplikaci ideální – ukažte novému partnerovi, jak jedním kliknutím vytvořit zprávu ve složce Oživovač nebo jak si vygenerovat e-mail.'
  }
];

export const EducationPillar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'academy'>('products');
  
  // Product lines states
  const [selectedCategory, setSelectedCategory] = useState<string>('Vše');
  const [selectedLine, setSelectedLine] = useState<string>('Bio Rehab');
  
  // Academy states
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [selectedModule, setSelectedModule] = useState<AcademyModule>(academyModules[0]);

  // AI assistant state inside direct line
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const responseEndRef = useRef<HTMLDivElement>(null);

  // Categories helper filter
  const productLineCategories = ['Vše', 'Pleť', 'Tělo & Zdraví', 'Vlasy', 'Eko Domácnost'];

  const getLineCategoryGroup = (detail: ProductLineDetail): string => {
    switch (detail.category) {
      case 'Vlasová péče': return 'Vlasy';
      case 'Problematická pleť':
      case 'Intenzivní omlazení & Tělo':
      case 'Hloubková hydratace & Obnova':
      case 'Exkluzivní omlazení':
      case 'Přírodní omlazení':
      case 'Zklidnění & Citlivá pleť':
      case 'Lifting & Vyplnění':
        return 'Pleť';
      case 'Zdraví & Tělo':
      case 'Tělesná harmonie & Čaje':
        return 'Tělo & Zdraví';
      case 'Eko domácnost & Tělo':
        return 'Eko Domácnost';
      default: return 'Pleť';
    }
  };

  const currentLineDetail = getLineDetail(selectedLine);

  function getLineDetail(lineName: string): ProductLineDetail {
    if (PRODUCT_LINES_DETAILS[lineName]) {
      return PRODUCT_LINES_DETAILS[lineName];
    }
    // Deep fallback if the line is not in our direct database
    return {
      id: lineName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: lineName,
      tagline: `Tradiční bylinná řada slavné značky tianDe`,
      description: `Oblíbená řada tianDe kombinující starodávnou čínskou recepturu a moderní biotechnologie pro maximální domácí péči.`,
      category: "Péče o tělo & Pleť",
      targeting: [
        "Zvýšení odolnosti a přirozené harmonie buněk",
        "Hydratace a zjemnění ochranného kožního filmu",
        "Každodenní vysoce účinné hýčkání bylinnými silicemi"
      ],
      ingredients: [
        "Bylinné výtažky ze vzácných asijských rostlin",
        "Vitaminové a minerální komplexy",
        "Přírodní esenciální oleje"
      ],
      heroProducts: [
        { name: `Šetrný gel / krém ${lineName}`, description: "Zásadní vyživující krok pro udržení zdravého vzhledu pokožky." }
      ],
      protocol: [
        "Vyčistěte pokožku pomocí vlažné tekoucí vody.",
        `Naneste přiměřené množství přípravku z řady ${lineName} a krouživými pohyby jej vmasírujte do kůže.`,
        "Používejte pravidelně ráno a večer pro dosažení optimálních dlouhodobých výsledků."
      ],
      proTip: "Tento produkt zkombinujte s vhodným tianDe čajem pro dosažení synergie vnitřní a vnější péče.",
      expertQuote: "Byliny tianDe pracují nejlépe, pokud je aplikujete s láskou a pravidelně."
    };
  }

  // Filter lines list based on chosen category
  const filteredLines = PRODUCT_LINES.filter(line => {
    if (selectedCategory === 'Vše') return true;
    const detail = getLineDetail(line);
    return getLineCategoryGroup(detail) === selectedCategory;
  });

  // Handle clicking on preset AI prompts
  const handleAiPromptClick = async (promptText: string) => {
    setAiQuestion(promptText);
    await triggerAiExplain(promptText);
  };

  const triggerAiExplain = async (questionText: string) => {
    const query = questionText || aiQuestion;
    if (!query.trim()) return;

    setAiLoading(true);
    setAiResponse('');

    const message = `
Ahoj! Pomáhám s tianDe prodejem. 
Pracuji s touto řadou tianDe:
- Název řady: ${currentLineDetail.name}
- Slogan: ${currentLineDetail.tagline}
- Popis: ${currentLineDetail.description}
- Klíčové látky: ${currentLineDetail.ingredients.join(', ')}
- Hlavní problémy: ${currentLineDetail.targeting.join(', ')}
- Nejsilnější prodejní trik (Pro-Tip): ${currentLineDetail.proTip}

Uživatel se ptá na tuto konkrétní otázku: "${query}"

Napiš mi špičkovou odpověď v češtině. Používej odstavce, jasné zvýraznění bodů a milý osobní tón profesionálního tianDe lídra (podobně jako mluví Ivana Nohovová). Odpověď udrž strukturovanou, snadno zkopírovatelnou k okamžitému odeslání.
Odpověz v čistém formátu Markdown.
`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          systemPrompt: "Jsi špičkový tianDe mentor a marketingový lídr. Tvým úkolem je pomoci poradkyni s komunikací na sociálních sítích nebo v přímých zprávách ohledně vybrané produktové řady. Odpovídáš vždy s obrovským nadšením, srozumitelně, prakticky, s konkrétními příklady, bez zbytečné omáčky."
        })
      });

      const data = await response.json();
      setAiResponse(data.text);
    } catch (err) {
      console.error(err);
      setAiResponse("Omlouvám se, nepodařilo se mi spojit s AI asistentem. Zkontrolujte prosím připojení nebo zkuste to znovu za okamžik.");
    } finally {
      setAiLoading(false);
      setTimeout(() => {
        responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const toggleChecklistStep = (moduleId: string, stepIndex: number) => {
    const key = `${moduleId}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      {/* Upper header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-100 pb-8">
        <div>
          <span className="bg-rose-100 text-rose-700 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 inline-block">
            Knihovna Vědomostí & Školicí středisko
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            tianDe <span className="serif-italic text-rose-500">Knihovna lídra</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Váš kompletní digitální průvodce tajnými i certifikovanými recepturami altajských bylin a spolehlivým byznys modelem pro růst vaší tianDe struktury.
          </p>
        </div>

        {/* Modular switcher tabs */}
        <div className="bg-slate-100 p-1 rounded-lg flex self-start md:self-auto shrink-0">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'products' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <BookOpenText className="w-3.5 h-3.5 text-rose-500" /> Katalog produktových řad
          </button>
          <button 
            onClick={() => setActiveTab('academy')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'academy' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Book className="w-3.5 h-3.5 text-blue-500" /> Business Akademie
          </button>
        </div>
      </header>

      {/* Main Area */}
      <AnimatePresence mode="wait">

        {/* TAB 1: PRODUCT LINES ENCYCLOPEDIA */}
        {activeTab === 'products' && (
          <motion.div
            key="products-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Category selection bar */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
              {productLineCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    // Automatically select first line of new category
                    const firstOfCat = PRODUCT_LINES.find(line => {
                      if (cat === 'Vše') return true;
                      return getLineCategoryGroup(getLineDetail(line)) === cat;
                    });
                    if (firstOfCat) setSelectedLine(firstOfCat);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-rose-50 text-rose-600 border-rose-200' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Split layout: Selector list (left side) and Profile panel (right side) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Selector Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-2 max-h-[650px] overflow-y-auto pr-2 custom-scroll">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2 pl-1">
                  Zvolte produktovou řadu ({filteredLines.length})
                </span>
                <div className="space-y-1.5">
                  {filteredLines.map((line, idx) => {
                    const detail = getLineDetail(line);
                    const isSelected = selectedLine === line;
                    return (
                      <button
                        key={line}
                        onClick={() => {
                          setSelectedLine(line);
                          setAiResponse('');
                          setAiQuestion('');
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected 
                            ? 'bg-rose-50/50 border-rose-200 shadow-sm' 
                            : 'bg-white border-slate-200/80 hover:bg-slate-50/50 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-serif italic text-slate-300">
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </span>
                            <span className={`text-[12px] font-bold uppercase tracking-wider transition-colors ${
                              isSelected ? 'text-rose-600 font-extrabold' : 'text-slate-700 group-hover:text-slate-900'
                            }`}>
                              {line}
                            </span>
                          </div>
                          <span className="text-[10px] font-normal text-slate-400 block truncate max-w-[200px]">
                            {detail.tagline}
                          </span>
                        </div>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {detail.category.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Detail Card (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLine}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                  >
                    {/* Upper decorative row */}
                    <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="bg-rose-100 text-rose-700 text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full inline-block mb-2">
                          🌱 {currentLineDetail.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-light text-slate-800">
                          {currentLineDetail.name}
                        </h3>
                        <p className="text-slate-400 text-xs italic mt-0.5">{currentLineDetail.tagline}</p>
                      </div>

                      {/* Top Expert advice badge */}
                      <button
                        onClick={() => handleCopy(currentLineDetail.proTip, 'copy-protip')}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0"
                      >
                        {copiedText === 'copy-protip' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-500" /> Zkopírováno
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-rose-400" /> Kopírovat Pro-Tip
                          </>
                        )}
                      </button>
                    </div>

                    {/* Scrollable details */}
                    <div className="p-6 sm:p-8 space-y-8 max-h-[700px] overflow-y-auto">
                      
                      {/* Philosophy Section */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em] block">Popis a filozofie řady</span>
                        <p className="text-slate-600 text-sm leading-relaxed font-normal">
                          {currentLineDetail.description}
                        </p>
                      </div>

                      {/* Core features Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Target problems */}
                        <div className="bg-rose-50/30 border border-rose-100/50 p-5 rounded-2xl space-y-3.5">
                          <span className="text-[9px] font-black uppercase text-rose-700 tracking-wider flex items-center gap-1.5 border-b border-rose-100 pb-2">
                            <Target className="w-3.5 h-3.5 text-rose-500" /> Tuto řadu doporučte na:
                          </span>
                          <ul className="space-y-2">
                            {currentLineDetail.targeting.map((t, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                                <span className="text-rose-500 text-sm leading-none">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-emerald-50/20 border border-emerald-100/50 p-5 rounded-2xl space-y-3.5">
                          <span className="text-[9px] font-black uppercase text-emerald-800 tracking-wider flex items-center gap-1.5 border-b border-emerald-100 pb-2">
                            <Activity className="w-3.5 h-3.5 text-emerald-500" /> Hlavní účinné složky:
                          </span>
                          <ul className="space-y-2">
                            {currentLineDetail.ingredients.map((ing, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                                <span className="text-emerald-500 text-sm leading-none">✓</span>
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Step-by-Step Protocol */}
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em] block">
                          🧪 Certifikovaný postup aplikace (Rituál krásy)
                        </span>
                        <div className="space-y-3 pl-3 border-l-2 border-slate-200">
                          {currentLineDetail.protocol.map((step, idx) => (
                            <div key={idx} className="relative pl-6">
                              <div className="absolute left-0 top-0.5 w-4 h-4 bg-slate-900 border border-slate-700 text-[10px] font-black text-white flex items-center justify-center rounded-full">
                                {idx + 1}
                              </div>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hero products list */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em] block">Vlajkové produkty řady</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {currentLineDetail.heroProducts.map((prod, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1 hover:bg-slate-100/40 transition-colors">
                              <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-black uppercase tracking-wider block w-max mb-1">PRODUKT 0{idx + 1}</span>
                              <h5 className="font-bold text-xs text-slate-800">{prod.name}</h5>
                              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{prod.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real quotation area */}
                      <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1 md:max-w-xl">
                          <span className="text-[9px] font-black uppercase tracking-widest text-rose-400 block">Autentické slovo TOP Lídra:</span>
                          <p className="font-serif italic text-xs leading-relaxed text-slate-300">
                            "{currentLineDetail.expertQuote}"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-[10px] font-bold text-rose-300">TL</div>
                          <span className="text-[10px] font-black uppercase text-rose-300 tracking-wider block">tianDe Lídr</span>
                        </div>
                      </div>

                      {/* Pro-Tip Box */}
                      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                        <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-xs font-bold text-rose-900 block">Prodejní a aplikační Tajemství:</strong>
                          <p className="text-[11px] text-rose-700 leading-relaxed font-normal">{currentLineDetail.proTip}</p>
                        </div>
                      </div>

                      {/* INTEGRATED INSTANT AI ASSISTANT FOR THIS LINE */}
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 mt-4 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-rose-500" />
                            Rychlá tvorba textů pomocí AI asistentky
                          </h4>
                          <span className="text-[9px] bg-rose-100 text-rose-700 font-extrabold px-2 py-0.5 rounded-full uppercase">
                            Napojeno na chat
                          </span>
                        </div>
                        
                        <p className="text-[11px] text-slate-500">
                          Chcete o řadě <strong>{currentLineDetail.name}</strong> něco napsat na Facebook nebo poslat zprávu klientce, ale došla vám inspirace? Zvolte rychlou akci nebo položte vlastní otázku:
                        </p>

                        {/* Action quick helper chips */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAiPromptClick("Napiš mi emotivní a prodejní příspěvek pro Facebook skupinu o této řadě.")}
                            className="bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold py-1.5 px-2.5 rounded-lg border border-slate-200 transition-colors"
                          >
                            📝 FB Příspěvek
                          </button>
                          <button
                            onClick={() => handleAiPromptClick("Dej mi 3 klíčové prodejní argumenty, proč odložit drogerkový krém a pořídit radši tuto řadu.")}
                            className="bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold py-1.5 px-2.5 rounded-lg border border-slate-200 transition-colors"
                          >
                            🔥 3 Prodejní Argumenty
                          </button>
                          <button
                            onClick={() => handleAiPromptClick("Jaké doplňující tianDe produkty, čaje nebo vložky doporučit klientkám v kombinaci s touto řadou?")}
                            className="bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold py-1.5 px-2.5 rounded-lg border border-slate-200 transition-colors"
                          >
                            🔗 Produkty do setu
                          </button>
                        </div>

                        {/* Search input line */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') triggerAiExplain(aiQuestion);
                            }}
                            placeholder="Např.: Jak vysvětlit Bio Rehab někomu, komu zbývá pár vlasů?"
                            className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:border-rose-500 focus:bg-white outline-none"
                          />
                          <button
                            onClick={() => triggerAiExplain(aiQuestion)}
                            disabled={aiLoading || !aiQuestion.trim()}
                            className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white p-2 rounded-lg transition-all"
                            title="Vygenerovat"
                          >
                            {aiLoading ? (
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.14 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* AI response mockup */}
                        {aiResponse && (
                          <div className="bg-white border border-rose-100 rounded-xl p-5 space-y-3 relative">
                            <div className="flex items-center justify-between border-b border-rose-50 pb-1.5">
                              <span className="text-[9px] font-black uppercase text-rose-500 tracking-wider block">AI Návrh odpovědi</span>
                              <button
                                onClick={() => handleCopy(aiResponse, 'copy-ai-resp')}
                                className="text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider"
                              >
                                {copiedText === 'copy-ai-resp' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-green-500" /> Zkopírováno
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" /> Kopírovat text
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="text-xs text-slate-700 leading-relaxed font-sans max-h-72 overflow-y-auto pr-1 markdown-body">
                              <ReactMarkdown>{aiResponse}</ReactMarkdown>
                            </div>
                            <div ref={responseEndRef} />
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: BUSINESS ACADEMY TIMELINE STUDY */}
        {activeTab === 'academy' && (
          <motion.div
            key="academy-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Timeline sidebar cards (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 pl-1 block mb-2">
                4 KROKY K ÚSPĚŠNÉMU MLM BYZNYSU
              </span>

              {academyModules.map((mod, idx) => {
                const isSelected = selectedModule.id === mod.id;
                
                // Count how many steps completed in this module
                const totalSteps = mod.checklist.length;
                let completedCount = 0;
                mod.checklist.forEach((_, stepIdx) => {
                  if (completedSteps[`${mod.id}-${stepIdx}`]) completedCount++;
                });

                const pct = Math.round((completedCount / totalSteps) * 100);

                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col gap-2 ${
                      isSelected 
                        ? 'bg-blue-50/40 border-blue-200 shadow-sm' 
                        : 'bg-white border-slate-200/80 hover:bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          KROK 0{idx + 1}
                        </span>
                        <h4 className={`text-xs font-black uppercase tracking-wider ${
                          isSelected ? 'text-blue-900' : 'text-slate-800'
                        }`}>
                          {mod.title}
                        </h4>
                      </div>

                      {pct === 100 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : pct > 0 ? (
                        <span className="text-[9px] font-bold text-blue-600">{pct}% splněno</span>
                      ) : null}
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                      {mod.description}
                    </p>

                    {/* Simple progress bar */}
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
                      <div 
                        className={`h-full transition-all duration-300 ${pct === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}

              {/* Bonus business stats mockup */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute -right-3 -bottom-3 opacity-10">
                  <Flame className="w-20 h-20 text-orange-500" />
                </div>
                <div className="relative z-10 space-y-2">
                  <span className="bg-orange-500/20 text-orange-400 text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded w-max block">Úspěch se duplikuje</span>
                  <h5 className="font-bold text-xs uppercase tracking-wider">Cesta k titulu LÍDR tianDe</h5>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Lídr má obvykle ve své struktuře <strong>5 spokojených aktivních partnerů</strong>, kteří dělají totéž co vy (duplikace). Měsíční obrat činí 5 000 bodů, což vám poskytne klidný pasivní příjem až 15-25 tisíc korun měsíčně.
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive checkpoints panel (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="bg-blue-100 text-blue-700 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5">
                    🎓 Studijní materiál a úkoly
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 uppercase tracking-tight">
                    {selectedModule.title}
                  </h3>
                  <p className="text-slate-500 text-xs italic mt-0.5">{selectedModule.description}</p>
                </div>

                {/* Checklist instructions */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    Interaktivní úkoly pro vaši praxi (Zaškrtněte po splnění)
                  </span>
                  
                  <div className="space-y-3">
                    {selectedModule.checklist.map((step, idx) => {
                      const isCompleted = !!completedSteps[`${selectedModule.id}-${idx}`];
                      return (
                        <div 
                          key={idx}
                          onClick={() => toggleChecklistStep(selectedModule.id, idx)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            isCompleted 
                              ? 'bg-green-50/30 border-green-200 text-slate-600' 
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-300 hover:border-blue-500" />
                            )}
                          </div>
                          <p className={`text-xs font-semibold leading-relaxed ${isCompleted ? 'line-through text-slate-400 font-normal' : ''}`}>
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Module Lead Strategy / Tip */}
                <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                  <span className="text-[9px] font-black uppercase text-blue-800 tracking-widest block">Strategický tip Ivany Nohovové:</span>
                  <p className="text-[11px] text-blue-700 leading-relaxed font-normal italic">
                    "{selectedModule.tips}"
                  </p>
                </div>

                {/* Completion summary */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-bold text-slate-700">
                  <span>Jak si vedete v tomto modulu?</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500 h-full transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            (selectedModule.checklist.filter((_, idx) => completedSteps[`${selectedModule.id}-${idx}`]).length /
                              selectedModule.checklist.length) * 100
                          )}%`
                        }}
                      />
                    </div>
                    <span className="text-green-600 font-black">
                      {selectedModule.checklist.filter((_, idx) => completedSteps[`${selectedModule.id}-${idx}`]).length} / {selectedModule.checklist.length} splněno
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
