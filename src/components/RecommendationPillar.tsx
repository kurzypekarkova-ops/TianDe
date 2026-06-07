import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Loader2, 
  Info, 
  CheckCircle2, 
  Package, 
  Heart, 
  MessageSquare, 
  BookOpen, 
  Timer, 
  UserPlus, 
  Rocket, 
  PhoneCall, 
  Calendar, 
  Video, 
  Award, 
  FileText, 
  TrendingUp, 
  Layers, 
  ShoppingBag, 
  CheckCircle,
  Clipboard,
  Check,
  RefreshCw,
  Gift
} from 'lucide-react';

export const RecommendationPillar: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'recommendation' | 'first_month'>('first_month');
  const [activeStep, setActiveStep] = useState<'system' | 'week1' | 'week2' | 'week3'>('system');
  
  // AI Cure Recommendation States
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  // Copy success states for templates
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  // Interactive checklist states stored in localStorage (keyed by week identifier)
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('tiande_newcomer_tasks');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tiande_newcomer_tasks', JSON.stringify(checkedTasks));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [checkedTasks]);

  const toggleTask = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const resetCategoryTasks = (keys: string[]) => {
    setCheckedTasks(prev => {
      const updated = { ...prev };
      keys.forEach(key => {
        delete updated[key];
      });
      return updated;
    });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Následující popis situace vyžaduje doporučení produktového balíčku: ${description}`,
          systemPrompt: `Jsi expertní TianDe průvodce. Tvým úkolem je sestavit 3měsíční balíček produktů na základě popisu situace. Struktura: měsíc 1, měsíc 2, měsíc 3. U každého produktu uveď proč a jak užívat. Na závěr VŽDY uveď varování o nutnosti 3měsíční kúry.`
        })
      });
      const data = await response.json();
      setRecommendation(data.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Defining the detailed tasks parsed from images
  const week1Tasks = [
    { id: 'w1_1', text: 'Informuji o dopravě zdarma ve Facebookové skupině pro první linii sítě' },
    { id: 'w1_2', text: 'Zasílám emailing první linii ohledně blížícího se konce dopravy zdarma' },
    { id: 'w1_3', text: 'Připravuji upoutávku o dopravě zdarma do společného chatu s první linií' },
    { id: 'w1_4', text: 'Otevřu on-line office, vyjedu strukturu podle žebříčku distributorů ke kontrole pozic' },
    { id: 'w1_5', text: 'Kontroluji „limitní“ body (např. lidi s 290 nebo 980 body) a kontaktuji je s radou, ať nenechají propadnout bonus (hranice 300 / 1000 b)' },
    { id: 'w1_6', text: 'Sleduji síť do hloubky, zejména v místech, kde přímý sponzor / lídr nefunguje aktivně' },
    { id: 'w1_7', text: 'Kontaktuji partnery, kteří mají sice splněné pozice, ale doposud jim chybí vlastní osobní nákup' },
    { id: 'w1_8', text: 'Oslovuji síť s informacemi o zcela nových marketingových akcích a letácích' },
    { id: 'w1_9', text: 'Obepíšu klientky s výpočtem konkrétního finančního rozdílu, pokud by dotáhly nákup na vyšší slevu' },
    { id: 'w1_10', text: 'Vygeneruji přehled dlouhodobě neaktivních vypadlíků a obvolám je pro zachování slevy na startu měsíce' },
    { id: 'w1_11', text: 'Uprostřed měsíce posílám SMS nebo e-maily vypadlíkům a sleduji zpětnou vazbu (celkem kontaktuji 3x)' },
    { id: 'w1_12', text: 'Sleduji vypadlíky s De-coiny: volám jim, dělám si poznámky a radím s výběrem věrnostních bodů' },
    { id: 'w1_13', text: 'Prověřím narozeniny klientů, ověřím jejich souhlas s emailingem, ať dostanou narozeninové bonusy' },
    { id: 'w1_14', text: 'Připravuji testery a balím si vzorečky TianDe produktů do sáčků pro osobní setkání' }
  ];

  const week2Tasks = [
    { id: 'w2_1', text: 'Dnes dorazily provize – okamžitě sdílím radost, motivuji partnery a plánuji rozvoj' },
    { id: 'w2_2', text: 'Vypíši si tabulku lidí s nákupem nad 100 bodů za minulý měsíc (sloupek provizí + sloupek De-coinů)' },
    { id: 'w2_3', text: 'Kontaktuji tyto aktivní lidi z první linie (píšu, volám nebo natáčím personalizované video)' },
    { id: 'w2_4', text: 'Posílám osobní inspirativní zprávu o možnostech výběru De-coinů na míru (dle vzoru Mária)' },
    { id: 'w2_5', text: 'Přihlásím se do e-shopu v OBC jako zákaznice a natočím instruktážní video, kam kliknout pro čerpání bodů' },
    { id: 'w2_6', text: 'Ověřím dostupnost zboží na skladě a natočím návod, jak výrobky za De-coiny na eshopu finálně objednat' },
    { id: 'w2_7', text: 'Rozešlu včasné varování ohledně zachování roční 35% slevy u ohrožených zákazníků (dle vzoru Marika)' },
    { id: 'w2_8', text: 'Vyhledávám zajímavé neproduktové články se zdravotními tématy na sdílení na Facebooku' },
    { id: 'w2_9', text: 'Uplatňuji pravidlo obsahu 4+1 (čtyři obecně hodnotné příspěvky na jeden prodejní)' },
    { id: 'w2_10', text: 'Uspořádám domácí party u sebe nebo přímo u zákaznice v obýváku' },
    { id: 'w2_11', text: 'Během domácího setkání rovnou domluvím termín a téma příští schůzky, které klientky zajímá' },
    { id: 'w2_12', text: 'Připravím losování soutěže na schůzce a společně vytvoříme hromadnou objednávku' },
    { id: 'w2_13', text: 'Odpovídám na všechny komentáře na mém FB profilu, posílám autorům žádosti o přátelství a začínám si psát' }
  ];

  const week3Tasks = [
    { id: 'w3_1', text: 'Propaguji komplexní dárkové a rodinné balíčky po výplatním termínu – ideální čas k prodeji' },
    { id: 'w3_2', text: 'Zaměřím se detailně na klienty, kteří nenakoupili už 2–3 měsíce, a oživuji kontakt' },
    { id: 'w3_3', text: 'Telefonuji a aktivně klábosím s nejvěrnějšími „Áčkovými“ zákazníky z mé sítě' },
    { id: 'w3_4', text: 'Točím prodejní video na balíčky v hodnotě kolem 2500 Kč (Velké sady)' },
    { id: 'w3_5', text: 'Vytvořím video recenzi jen s mým hlasem (voiceover) ukazující ruce a detailní aplikaci přípravku' },
    { id: 'w3_6', text: 'Doporučuji k sadám navíc vhodné pomocníky a přístroje (např. k omlazující kůře Photoner)' },
    { id: 'w3_7', text: 'Aktualizuji akční letáky – dopíšu do nich rukou VIP registrační ceny pro názorné srovnání rozdílu' },
    { id: 'w3_8', text: 'Rozesílám nadepsané letáky lidem, kteří nemají nákup déle než 2–3 měsíce' },
    { id: 'w3_9', text: 'Tvořím reklamní a edukativní příspěvky podporující akční balíčky ze sady kampaní' },
    { id: 'w3_10', text: 'Sleduji stav bodů v první linii – včas varuji partnery před ztrátou bonusové provize (nutnost 100 osobních bodů)' },
    { id: 'w3_11', text: 'Zakládám lákavou doplňkovou soutěž pro síť k nahnání a dotáhnutí bodů pro postup v pozicích' },
    { id: 'w3_12', text: 'Naplánuji, sepíši a přednastavím příspěvky do mých zákaznických FB skupin' },
    { id: 'w3_13', text: 'Tvořím originální neprodejní a osobní prožitkový obsah přímo na svůj hlavní osobní profil' },
    { id: 'w3_14', text: 'Vyhrazuji si denně čas pro online akademii, webinars s Elenou Novákovou a osobní rozvoj' },
    { id: 'w3_15', text: 'Domlouvám si osobní setkání a doprovázím klientku přímo do kamenného servisního centra k nákupu na míru' }
  ];

  // Calculate completion percentages
  const getProgress = (tasks: { id: string }[]) => {
    const completed = tasks.filter(t => checkedTasks[t.id]).length;
    return {
      completed,
      total: tasks.length,
      percent: Math.round((completed / tasks.length) * 105) || 0 // Cap or scale beautifully
    };
  };

  const w1Progress = getProgress(week1Tasks);
  const w2Progress = getProgress(week2Tasks);
  const w3Progress = getProgress(week3Tasks);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      <header className="mb-12">
        <p className="text-sm text-tiande-blue font-serif italic mb-2">
          {activeSubTab === 'recommendation' ? 'Prémiová péče tianDe' : 'Edukační startovní modul'}
        </p>
        <h2 className="text-5xl font-light tracking-tight text-slate-800">
          {activeSubTab === 'recommendation' ? (
            <>Doporučení <span className="font-serif italic text-slate-400">kúry</span></>
          ) : (
            <>První měsíc <span className="font-serif italic text-slate-400">v TianDe</span></>
          )}
        </h2>
      </header>

      {/* Primary Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-10 gap-8">
        <button
          onClick={() => setActiveSubTab('first_month')}
          className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeSubTab === 'first_month' ? 'text-tiande-blue font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-first-month"
        >
          <Award className="w-4 h-4 text-tiande-blue" />
          První měsíc v TianDe
          {activeSubTab === 'first_month' && (
            <motion.div layoutId="subtab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tiande-blue" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('recommendation')}
          className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeSubTab === 'recommendation' ? 'text-tiande-blue font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-recommendations"
        >
          <Package className="w-4 h-4" />
          Sestavení kúry (AI)
          {activeSubTab === 'recommendation' && (
            <motion.div layoutId="subtab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tiande-blue" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'first_month' ? (
          <motion.div
            key="first-month"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step Selection Button Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { id: 'system', title: '5-bodový systém', desc: 'Základy úspěchu', icon: <Rocket className="w-4 h-4 text-rose-500" /> },
                { 
                  id: 'week1', 
                  title: '1. Týden', 
                  desc: 'Přehled a doprava', 
                  icon: <span className="text-xs font-serif font-black">{w1Progress.completed}/{w1Progress.total}</span>
                },
                { 
                  id: 'week2', 
                  title: '2. Týden', 
                  desc: 'Provize a De-coiny', 
                  icon: <span className="text-xs font-serif font-black">{w2Progress.completed}/{w2Progress.total}</span>
                },
                { 
                  id: 'week3', 
                  title: '3. Týden', 
                  desc: 'Servis a obchody', 
                  icon: <span className="text-xs font-serif font-black">{w3Progress.completed}/{w3Progress.total}</span>
                },
              ].map(step => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id as any)}
                  className={`p-5 rounded text-left border transition-all flex items-start justify-between ${
                    activeStep === step.id
                      ? 'border-tiande-blue bg-white shadow-xl shadow-blue-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  id={`step-btn-${step.id}`}
                >
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${activeStep === step.id ? 'text-tiande-blue font-bold animate-pulse' : 'text-slate-400'}`}>
                      {step.desc}
                    </p>
                    <p className="text-sm font-bold text-slate-800 mt-2">{step.title}</p>
                  </div>
                  <div className={`p-2 rounded-full ${activeStep === step.id ? 'bg-tiande-blue/5 text-tiande-blue' : 'bg-slate-50 text-slate-400'}`}>
                    {step.icon}
                  </div>
                </button>
              ))}
            </div>

            {/* Step Display Area */}
            <div className="grid lg:grid-cols-12 gap-10">
              
              {/* Main Content Area */}
              <div className="lg:col-span-8">
                
                {/* 5-BODOVY SYSTEM VIEW */}
                {activeStep === 'system' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 border border-slate-200 rounded shadow-sm">
                      <div className="flex gap-4 items-center mb-4">
                        <Rocket className="w-6 h-6 text-rose-500 fill-rose-100" />
                        <h3 className="text-lg font-bold text-slate-800">5-ti bodový systém práce</h3>
                      </div>
                      <p className="text-slate-500 text-xs italic leading-relaxed">
                        Chcete rychlý kariérní růst? Zde je pětice pilířů, které tvoří denní chleba každého tianDe lídra. Všechny procesy v síti se opírají o tyto konkrétní kroky:
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          num: '01',
                          title: 'Oslovení',
                          desc: 'Začněte nenuceným kontaktem. Nezdráhejte se ptát a aktivně vyhledávat potřeby lidí ve vašem okolí nebo na sociálních sítích. Prvotní je upřímný zájem o člověka a jeho zdraví či finance.',
                          tip: '💡 Trénujte pokládání otázek, nesnažte se hned v první minutě sypat parametry produktů.',
                          icon: <MessageSquare className="w-5 h-5 text-tiande-blue" />
                        },
                        {
                          num: '02',
                          title: 'Prezentace',
                          desc: 'Ukažte produkt, sadu či možnosti výdělku v plné kráse. Mluvte stručně, o reálných přínosech a s maximálním nadšením. Vynikající jsou vlastní upřímná videa a osobní zážitky se sadami.',
                          tip: '💡 „Neprodávejte jen krabičky, prodávejte s nimi i jejich užitek a radost.“',
                          icon: <BookOpen className="w-5 h-5 text-emerald-500" />
                        },
                        {
                          num: '03',
                          title: 'Dosledování',
                          desc: 'Pokud jste klientovi dali doporučení či leták, ozvěte se mu zpět do 24–48 hodin. Ptejte se na dojmy, pomozte mu vyřešit váhání. Právě zde se láme úspěch obchodu.',
                          tip: '💡 Spousta nováčků zapomene lidem znovu zavolat. Buďte vytrvalí!',
                          icon: <Timer className="w-5 h-5 text-amber-500" />
                        },
                        {
                          num: '04',
                          title: 'Registrace',
                          desc: 'Ukážeme nováčkovi registraci, která mu okamžitě odemkne nákupy se slevou 35 %. Představíme výhody a radost z přihlášení do vlastního OBC kabinetu.',
                          tip: '💡 Nezapomínejte vysvětlit, jaké dárky a výhody na nově registrovaného čekají.',
                          icon: <UserPlus className="w-5 h-5 text-purple-500" />
                        },
                        {
                          num: '05',
                          title: 'Zaučení a rozjetí nováčka',
                          desc: 'Zapojte nováčka ihněď do našeho akčního plánu tvořeného tímto průvodcem krok za krokem. Předávejte mu své čerstvé zkušenosti a kráčejte s ním k jeho prvním provizím.',
                          tip: '💡 Duplikace je klíčem. Co dokážete vy, naučte hned svého nováčka.',
                          icon: <Award className="w-5 h-5 text-rose-500" />
                        }
                      ].map((step, i) => (
                        <div 
                          key={step.num}
                          className="bg-white p-6 border border-slate-200 rounded hover:border-tiande-blue transition-all group flex items-start gap-4 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-3 text-7xl font-serif font-black italic text-slate-50 opacity-[0.04] select-none pointer-events-none">
                            {step.num}
                          </div>
                          <div className="p-3 rounded-lg bg-slate-50 text-slate-700 group-hover:bg-tiande-blue/5 group-hover:text-tiande-blue transition-all shrink-0">
                            {step.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-serif italic text-rose-500">Krok {step.num}</span>
                              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{step.title}</h4>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed mb-3">{step.desc}</p>
                            <p className="text-[10px] text-slate-400 font-medium italic">{step.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* WEEK 1 CHECKLIST VIEW */}
                {activeStep === 'week1' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 border border-slate-200 rounded shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">1. Týden v TianDe</h3>
                          <p className="text-slate-500 text-xs italic mt-1">Doprava zdarma, přehled sítě a péče o neaktivní účty</p>
                        </div>
                        <button 
                          onClick={() => resetCategoryTasks(week1Tasks.map(t => t.id))}
                          className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1.5">
                          <span>Splněné úkoly</span>
                          <span>{w1Progress.completed} / {w1Progress.total}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                          <div 
                            className="bg-tiande-blue h-full transition-all duration-500" 
                            style={{ width: `${(w1Progress.completed / w1Progress.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded overflow-hidden">
                      <div className="divide-y divide-slate-100">
                        {week1Tasks.map(task => (
                          <div 
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-5 flex items-start gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors ${checkedTasks[task.id] ? 'bg-slate-50/30' : ''}`}
                          >
                            <button className="mt-0.5 shrink-0 transition-transform active:scale-90 bounce">
                              <Heart 
                                className={`w-5 h-5 transition-all ${
                                  checkedTasks[task.id] 
                                    ? 'text-rose-500 fill-rose-500 scale-110 drop-shadow-sm' 
                                    : 'text-slate-200 hover:text-rose-300'
                                }`} 
                              />
                            </button>
                            <span className={`text-xs leading-relaxed text-slate-700 transition-all ${checkedTasks[task.id] ? 'line-through text-slate-400 font-normal italic' : 'font-medium'}`}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* WEEK 2 CHECKLIST VIEW */}
                {activeStep === 'week2' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 border border-slate-200 rounded shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">2. Týden v TianDe</h3>
                          <p className="text-slate-500 text-xs italic mt-1">Provize, De-coiny, slevy a lokální setkání</p>
                        </div>
                        <button 
                          onClick={() => resetCategoryTasks(week2Tasks.map(t => t.id))}
                          className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1.5">
                          <span>Splněné úkoly</span>
                          <span>{w2Progress.completed} / {w2Progress.total}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                          <div 
                            className="bg-tiande-blue h-full transition-all duration-500" 
                            style={{ width: `${(w2Progress.completed / w2Progress.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded overflow-hidden">
                      <div className="divide-y divide-slate-100">
                        {week2Tasks.map(task => (
                          <div 
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-5 flex items-start gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors ${checkedTasks[task.id] ? 'bg-slate-50/30' : ''}`}
                          >
                            <button className="mt-0.5 shrink-0 transition-transform active:scale-90">
                              <Heart 
                                className={`w-5 h-5 transition-all ${
                                  checkedTasks[task.id] 
                                    ? 'text-rose-500 fill-rose-500 scale-110 drop-shadow-sm' 
                                    : 'text-slate-200 hover:text-rose-300'
                                }`} 
                              />
                            </button>
                            <span className={`text-xs leading-relaxed text-slate-700 transition-all ${checkedTasks[task.id] ? 'line-through text-slate-400 font-normal italic' : 'font-medium'}`}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* WEEK 3 CHECKLIST VIEW */}
                {activeStep === 'week3' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 border border-slate-200 rounded shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">3. Týden v TianDe</h3>
                          <p className="text-slate-500 text-xs italic mt-1">Po výplatě: Prodejní akcelerace balíčků a klientský servis</p>
                        </div>
                        <button 
                          onClick={() => resetCategoryTasks(week3Tasks.map(t => t.id))}
                          className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1.5">
                          <span>Splněné úkoly</span>
                          <span>{w3Progress.completed} / {w3Progress.total}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                          <div 
                            className="bg-tiande-blue h-full transition-all duration-500" 
                            style={{ width: `${(w3Progress.completed / w3Progress.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded overflow-hidden">
                      <div className="divide-y divide-slate-100">
                        {week3Tasks.map(task => (
                          <div 
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`p-5 flex items-start gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors ${checkedTasks[task.id] ? 'bg-slate-50/30' : ''}`}
                          >
                            <button className="mt-0.5 shrink-0 transition-transform active:scale-90">
                              <Heart 
                                className={`w-5 h-5 transition-all ${
                                  checkedTasks[task.id] 
                                    ? 'text-rose-500 fill-rose-500 scale-110 drop-shadow-sm' 
                                    : 'text-slate-200 hover:text-rose-300'
                                }`} 
                              />
                            </button>
                            <span className={`text-xs leading-relaxed text-slate-700 transition-all ${checkedTasks[task.id] ? 'line-through text-slate-400 font-normal italic' : 'font-medium'}`}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Sidebar Action Scripts from Leaders */}
              <div className="lg:col-span-4 space-y-8">
                
                <div className="bg-slate-900 text-white p-8 rounded shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Award className="w-24 h-24 text-white" />
                  </div>
                  <div className="relative z-10">
                    <span className="bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-4">
                      Váš start v kapse
                    </span>
                    <h4 className="text-md font-bold mb-3 uppercase tracking-wider">Startovací manuál</h4>
                    <p className="text-slate-300 text-xs leading-relaxed italic mb-4">
                      Tento interaktivní plán je postaven na prověřených materiálech tianDe top lídrů. Odškrtávejte si srdíčka a rozjíždějte své podnikání organizovaně a krok za krokem!
                    </p>
                    <div className="bg-white/10 p-4 rounded text-[11px] text-slate-300 border border-white/10">
                      Celkový progres obsažených úkolů: <strong className="text-white block mt-1 text-sm font-serif italic">
                        {w1Progress.completed + w2Progress.completed + w3Progress.completed} ze {w1Progress.total + w2Progress.total + w3Progress.total} hotovo
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Practical Copyable Templates/Scripts from images */}
                <h3 className="label-caps mb-2 opacity-60">Ověřené skripty Lídrů</h3>

                {/* Mária's De-coiny template */}
                <div className="bg-white p-6 border border-slate-200 rounded relative group shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    💡 Šablona Mária - De-coiny
                  </span>
                  <p className="text-slate-700 text-xs italic leading-relaxed mb-4 border-l-2 border-emerald-400 pl-3">
                    "Píšu nebo volám: milá Maruško, dívala jsem se do našich sestav a máš De-coiny, chci Ti vysvětlit, kde a jak si je vybrat."
                  </p>
                  <button 
                    onClick={() => handleCopyText('Ahoj Maruško, dívala jsem se do našich sestav a vidím, že máš k dispozici De-coiny z věrnostních nákupů. Chci Ti jen v rychlosti vysvětlit, kde přesně je najdeš a jak si je u nás krásně vybereš za dárky. Kdy se Ti to hodí probrat?', 'maria')}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    {copiedTextId === 'maria' ? <Check className="w-3 h-3 text-emerald-500" /> : <Clipboard className="w-3 h-3" />}
                    {copiedTextId === 'maria' ? 'Zkopírováno' : 'Zkopírovat skript'}
                  </button>
                </div>

                {/* Marika's Sale preservation template */}
                <div className="bg-white p-6 border border-slate-200 rounded relative group shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    💡 Šablona Marika - Záchrana slevy
                  </span>
                  <p className="text-slate-700 text-xs italic leading-relaxed mb-4 border-l-2 border-rose-400 pl-3">
                    "Milá Maruško, v červnu Vám končí sleva 35% v tianDe. Stačí si něco malého objednat a zůstane Vám nadále. Máme novinky, nový e-shop, akční balíčky na skladě..."
                  </p>
                  <button 
                    onClick={() => handleCopyText('Milá Maruško, koukám do systému, že Ti brzy končí naše skvělá sleva 35% v tianDe z důvodu delší neaktivity. Stačí si objednat nějakou maličkost a úžasná sleva Ti ihned zůstane na další rok aktivní. Máme plno krásných novinek a akční letáky skladem. Ozvi se, moc ráda Ti pomohu s nákupem! Tvoje sponzorka Marika.', 'marika')}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    {copiedTextId === 'marika' ? <Check className="w-3 h-3 text-emerald-500" /> : <Clipboard className="w-3 h-3" />}
                    {copiedTextId === 'marika' ? 'Zkopírováno' : 'Zkopírovat skript'}
                  </button>
                </div>

                {/* Leader tip on Photoner from Klárka */}
                <div className="bg-slate-50 p-6 border border-slate-100 rounded shadow-sm">
                  <div className="flex gap-2 items-center mb-3 text-tiande-blue">
                    <Gift className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Klárka: Komplexní Sady
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed italic">
                    "Prodávejme k setu například na pleť i kosmetický přístroj Photoner... Nebojte se toho, tvořte balíky celistvé a komplexní!"
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        ) : (
          <motion.div
            key="ai-recommendations"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-12 gap-10"
          >
            {/* AI Core wizard */}
            <div className="lg:col-span-4">
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 sticky top-8">
                <h3 className="label-caps mb-6">Nový požadavek na kúru</h3>
                <textarea
                  className="w-full h-48 p-4 bg-slate-50 border border-slate-100 rounded text-sm focus:ring-1 focus:ring-tiande-blue outline-none transition-all resize-none italic"
                  placeholder="Zákaznice 45 let, řeší vypadávání vlasů a únavu..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  id="recommendation-input"
                />
                <button
                  type="submit"
                  disabled={loading || !description.trim()}
                  className="editorial-btn w-full mt-6"
                  id="recommendation-submit"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? 'Sestavuji...' : 'Sestavit kúru'}
                </button>

                <div className="mt-8 bg-slate-50 p-4 border border-slate-100 rounded">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest leading-none">Rada Experta</p>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    Při analýze zohledňujeme sezónu, věk i energetický stav organismu podle východní medicíny.
                  </p>
                </div>
              </form>
            </div>

            <div className="lg:col-span-8">
              {recommendation ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                  id="recommendation-result"
                >
                  <div className="editorial-card p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <CheckCircle2 className="w-32 h-32 text-tiande-blue" />
                    </div>
                    <div className="markdown-body">
                      <ReactMarkdown>{recommendation}</ReactMarkdown>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-tiande-blue text-white flex items-center justify-between rounded-lg shadow-xl shadow-blue-100">
                    <div className="flex items-center gap-6">
                      <span className="text-3xl">⚠️</span>
                      <p className="text-[11px] font-medium max-w-[500px] leading-relaxed uppercase tracking-wider">
                        Důležité: Produkty TianDe vyžadují trpělivost. Pro viditelné výsledky je nezbytná minimálně 3měsíční pravidelná kúra.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-slate-200 border-dashed text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="label-caps opacity-30 text-[10px]">Čekám na zadání</p>
                  <p className="text-slate-400 text-sm italic mt-2 max-w-[250px]">Zadejte popis potřeb zákazníka pro vygenerování kúry na míru.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
