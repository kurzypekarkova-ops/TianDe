import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { RecommendationPillar } from './components/RecommendationPillar';
import { ProductsPillar } from './components/ProductsPillar';
import { ContentCreatorPillar } from './components/ContentCreatorPillar';
import { VideoLibraryPillar } from './components/VideoLibraryPillar';
import { ObjectionsPillar } from './components/ObjectionsPillar';
import { EducationPillar } from './components/EducationPillar';
import { DiagnosisPillar } from './components/DiagnosisPillar';
import { HooksPillar } from './components/HooksPillar';
import { ScriptsPillar } from './components/ScriptsPillar';
import { StoryCookbookPillar } from './components/StoryCookbookPillar';
import { CalculatorPillar } from './components/CalculatorPillar';
import { ReactivationPillar } from './components/ReactivationPillar';
import { MailingAssistantPillar } from './components/MailingAssistantPillar';
import { Pillar } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Briefcase, 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  Package, 
  Calculator, 
  RefreshCw, 
  Mail, 
  Send, 
  MessageCircle, 
  Layers, 
  PenTool, 
  Flame, 
  Video, 
  ArrowRight,
  UserCheck,
  Lock,
  Key,
  Shield,
  User,
  Copy,
  Check,
  Info,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Auth state persistent loading
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('tianDe_authenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<{ registrationId: string; name: string; role: string; roleLabel?: string } | null>(() => {
    const saved = localStorage.getItem('tianDe_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login states
  const [loginTab, setLoginTab] = useState<'login' | 'request'>('login');
  const [regId, setRegId] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Request access states
  const [requestRegId, setRequestRegId] = useState('');
  const [selectedLeader, setSelectedLeader] = useState<'Ivana Nohavová' | 'Zuzana Grygier' | 'Marta Neumannová'>('Ivana Nohavová');
  const [requestSuccess, setRequestSuccess] = useState<{ pin: string; email: string; leaderName: string } | null>(null);
  const [requestError, setRequestError] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [copied, setCopied] = useState(false);

  // General navigation states
  const [activePillar, setActivePillar] = useState<Pillar>('portal');
  const [appMode, setAppMode] = useState<'customer' | 'business'>('customer');
  const [selectedPortalCategory, setSelectedPortalCategory] = useState<'customer' | 'business' | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('tianDe_authenticated');
    localStorage.removeItem('tianDe_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActivePillar('portal');
    setSelectedPortalCategory(null);
    setRegId('');
    setPin('');
    setLoginError('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regId.trim() || !pin.trim()) {
      setLoginError('Prosím vyplňte registrační číslo a PIN kód.');
      return;
    }
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: regId.trim(), pin: pin.trim() })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('tianDe_authenticated', 'true');
        localStorage.setItem('tianDe_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Neplatné přihlašovací údaje.');
      }
    } catch (err) {
      setLoginError('Chyba spojení se serverem. Zkuste to za chvíli.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestRegId.trim()) {
      setRequestError('Zadejte prosím své registrační číslo.');
      return;
    }
    setRequestError('');
    setIsRequesting(true);
    setRequestSuccess(null);

    try {
      const response = await fetch('/api/auth/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: requestRegId.trim(), leaderName: selectedLeader })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setRequestSuccess(data);
        // Prefill login input fields on step success
        setRegId(requestRegId.trim());
        setPin(data.pin);
      } else {
        setRequestError(data.error || 'Žádost se nepodařilo zpracovat.');
      }
    } catch (err) {
      setRequestError('Chyba při komunikaci se serverem.');
    } finally {
      setIsRequesting(false);
    }
  };

  const fillPreset = (rId: string, p: string) => {
    setRegId(rId);
    setPin(p);
    setLoginTab('login');
    setLoginError('');
  };

  const selectPortalTool = (toolId: Pillar, mode: 'customer' | 'business') => {
    setAppMode(mode);
    setActivePillar(toolId);
  };

  const renderPillar = () => {
    switch (activePillar) {
      case 'portal': return renderPortalPage();
      case 'recommendations': return <RecommendationPillar />;
      case 'products': return <ProductsPillar />;
      case 'content': return <ContentCreatorPillar />;
      case 'videos': return <VideoLibraryPillar />;
      case 'objections': return <ObjectionsPillar />;
      case 'education': return <EducationPillar appMode={appMode} />;
      case 'diagnosis': return <DiagnosisPillar />;
      case 'hooks': return <HooksPillar />;
      case 'storycookbook': return <StoryCookbookPillar />;
      case 'scripts': return <ScriptsPillar />;
      case 'calculator': return <CalculatorPillar defaultMode={appMode} />;
      case 'reactivation': return <ReactivationPillar />;
      case 'mailing': return <MailingAssistantPillar />;
      default: return renderPortalPage();
    }
  };

  const renderPortalPage = () => {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl space-y-8 select-none">
        {/* Header Introduction */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3 h-3 text-emerald-500 font-bold" />
            <span>MLM Inteligentní Asistent</span>
          </div>
          <h1 
            onClick={() => setSelectedPortalCategory(null)}
            className="text-2xl md:text-3xl font-light text-slate-800 tracking-tight leading-tight cursor-pointer hover:opacity-90 select-none transition-all active:scale-[0.99] group/title"
            title="Klepnutím vyčistíte výběr zón"
          >
            Vítejte v <span className="font-serif italic font-semibold text-emerald-600 group-hover/title:underline">tianDe</span> AI Asistentovi
          </h1>
        </div>

        {/* The Dual Pillars selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pt-2 max-w-3xl mx-auto">
          
          {/* PATH A: CUSTOMER (ZÁKAZNÍK) */}
          <motion.div 
            onClick={() => {
              setSelectedPortalCategory('customer');
              setAppMode('customer');
            }}
            whileHover={{ y: -2, scale: 1.002 }}
            className={`cursor-pointer bg-white rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden flex flex-col justify-between transition-all group ${
              selectedPortalCategory === 'customer' 
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/5' 
                : 'border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Heart className="w-4.5 h-4.5 font-bold text-emerald-600" />
                </div>
                <span className="text-[8.5px] bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  🛍️ Člen & Zákazník
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                  CHCI KOUPIT & PORADIT
                </h2>
                <p className="text-[10.5px] text-slate-500 leading-normal font-normal">
                  Fytokůry na míru, diagnostika, složení produktů a kalkulace nákupních ceny se slevou 35 %.
                </p>
              </div>

              {selectedPortalCategory === 'customer' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-slate-100 pt-4 space-y-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[8px] font-black text-emerald-600 tracking-widest uppercase block mb-1">
                    Chytré nástroje:
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('diagnosis', 'customer');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-800 uppercase">Kvíz & Diagnostika</h4>
                        <p className="text-[9px] text-slate-400">Automatický fytoplán pro tělo i pleť.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('products', 'customer');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-800 uppercase">Encyklopedie složení</h4>
                        <p className="text-[9px] text-slate-400">Přírodní síla mumia, hadího tuku či ženšenu.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('education', 'customer');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-800 uppercase">Léčivé produktové řady</h4>
                        <p className="text-[9px] text-slate-400">Plány s fytogely, šampony a fytovložkami.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('recommendations', 'customer');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-800 uppercase">Start Nováčka</h4>
                        <p className="text-[9px] text-slate-400">Ověřené balíčky a tipy pro snadnou objednávku.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('calculator', 'customer');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-slate-800 uppercase">Kalkulačka úspor (VIP)</h4>
                        <p className="text-[9px] text-slate-400">Rychlý převod katalogových cen na nákupní slevu 35 %.</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {selectedPortalCategory === 'customer' ? (
              <div className="bg-slate-50/80 p-4 border-t border-slate-100 flex justify-between items-center bg-emerald-50/10" onClick={(e) => e.stopPropagation()}>
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wide">Aktivní zóna</span>
                <button 
                  onClick={() => handleModeSwitch('customer')}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Spustit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-50/30 py-3 border-t border-slate-100 flex justify-center items-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Klepnutím otevřít</span>
              </div>
            )}
          </motion.div>

          {/* PATH B: BUSINESS (BYZNYS) */}
          <motion.div 
            onClick={() => {
              setSelectedPortalCategory('business');
              setAppMode('business');
            }}
            whileHover={{ y: -2, scale: 1.002 }}
            className={`cursor-pointer bg-white rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.015)] overflow-hidden flex flex-col justify-between transition-all group ${
              selectedPortalCategory === 'business' 
                ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/5' 
                : 'border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Briefcase className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <span className="text-[8.5px] bg-indigo-50 text-indigo-800 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  💼 Partner & Lídryně
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                  CHCI PRODÁVAT & TVOŘIT TÝM
                </h2>
                <p className="text-[10.5px] text-slate-500 leading-normal font-normal">
                  Akviziční scénáře, prodejní příběhy, oživovače zákaznic, fytomailingy a provizní MLM kalkulačka.
                </p>
              </div>

              {selectedPortalCategory === 'business' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-slate-100 pt-4 space-y-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[8px] font-black text-indigo-600 tracking-widest uppercase block mb-1">
                    Chytré nástroje:
                  </span>

                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('reactivation', 'business');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-slate-50/30 text-left transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-indigo-800 uppercase">Oživovač zákazníků</h4>
                        <p className="text-[9px] text-slate-400">Připravte zprávy pro neaktivní VIP klientky.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('scripts', 'business');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-indigo-800 uppercase">Předlohy konverzace</h4>
                        <p className="text-[9px] text-slate-400">Scénáře na oslovení z plna i ze sítí.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('storycookbook', 'business');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-indigo-800 uppercase">Příběhy, které prodávají</h4>
                        <p className="text-[9px] text-slate-400">Scénáře s texty pro vaše Facebook stories.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('mailing', 'business');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-indigo-800 uppercase">Mailing pro strukturu</h4>
                        <p className="text-[9px] text-slate-400">Uvítání partnerů i dárky za body struktury.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('calculator', 'business');
                      }}
                      className="flex items-start gap-2.5 p-2 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-black text-indigo-800 uppercase">MLM Provizní kalkulačka</h4>
                        <p className="text-[9px] text-slate-400">Marketingové podíly a výpočty pro lidi v týmu.</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {selectedPortalCategory === 'business' ? (
              <div className="bg-slate-50/80 p-4 border-t border-slate-100 flex justify-between items-center bg-indigo-50/10" onClick={(e) => e.stopPropagation()}>
                <span className="text-[10px] text-indigo-800 font-extrabold uppercase tracking-wide">Aktivní zóna</span>
                <button 
                  onClick={() => handleModeSwitch('business')}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Spustit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-50/30 py-3 border-t border-slate-100 flex justify-center items-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Klepnutím otevřít</span>
              </div>
            )}
          </motion.div>

        </div>

        {/* Header Introduction text moved UNDER the clickable variants */}
        <div className="text-center max-w-2xl mx-auto pt-1">
          <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest select-none leading-relaxed">
            Vyberte si roli na dnešní den a nechte se vést.
          </p>
        </div>

        {/* Coach Advice Block */}
        <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex items-center gap-3.5 max-w-2xl mx-auto select-none shadow-sm/50">
          <div className="w-8 h-8 rounded-full bg-rose-50/50 border border-rose-100 flex items-center justify-center font-bold text-[10px] text-rose-600 shrink-0 select-none">
            TL
          </div>
          <div className="space-y-0.5 text-left flex-1">
            <span className="text-[8.5px] font-black uppercase text-rose-500 tracking-wider block">ROZUMNÁ RADA OD TVÉHO TOP LÍDRA:</span>
            <p className="text-[10.5px] text-slate-500 leading-relaxed italic font-normal">
              "Klíčem k úspěchu v tianDe je rovnováha. Pokud se učíte s produkty, vyzkoušejte sekci ZÁKAZNÍK. Až budete připravena doporučit produkty dál a vydělat si první vážné peníze na kávu nebo auto odměnu, přepněte na sekci BYZNYS. Rozcestníky máte kdykoliv dostupné v bočním menu."
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleModeSwitch = (mode: 'customer' | 'business') => {
    setAppMode(mode);
    if (mode === 'customer') {
      setActivePillar('diagnosis');
    } else {
      setActivePillar('reactivation');
    }
  };

  const getBgColor = () => {
    if (activePillar === 'portal') {
      if (selectedPortalCategory === 'customer') return 'bg-emerald-50/5';
      if (selectedPortalCategory === 'business') return 'bg-indigo-50/5';
      return 'bg-slate-50';
    }
    return appMode === 'customer' ? 'bg-emerald-50/15' : 'bg-indigo-50/10';
  };

  const renderLoginScreen = () => {
    // Mailto preparation
    const mailSubject = requestSuccess ? encodeURIComponent(`Žádost o schválení přístupu do tianDe AI Asistenta - Reg. č. ${requestRegId}`) : '';
    const mailBody = requestSuccess ? encodeURIComponent(`Dobrý den,\n\nžádám o schválení mého přístupu do interního tianDe AI Asistenta.\n\nMoje registrační číslo: ${requestRegId}\nVybraný lídr: ${selectedLeader}\nVygenerovaný ochranný PIN kód: ${requestSuccess.pin}\n\nProsím o schválení přihlášení a uložení tohoto PINu k mému registračnímu číslu (${requestRegId}).\n\nDěkuji!`) : '';
    const mailtoUrl = requestSuccess ? `mailto:${requestSuccess.email}?subject=${mailSubject}&body=${mailBody}` : '#';

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950/5 via-slate-50 to-indigo-950/5 flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
        {/* Abstract Background Patterns */}
        <div className="absolute top-[-20%] left-[-25%] w-[80%] h-[80%] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-25%] w-[80%] h-[80%] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        
        <div className="absolute top-12 right-12 opacity-[0.03] max-w-sm hidden lg:block pointer-events-none">
          <img src="/assets/tiande_pattern.png" className="w-80" alt="tianDe" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl border border-slate-205/65 shadow-[0_20px_50px_rgba(4,120,87,0.06)] overflow-hidden relative z-10"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-slate-900 opacity-90" />
            
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-black uppercase tracking-widest leading-none mb-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Bezpečné MLM centrum</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight font-sans uppercase">tianDe AI Asistent</h1>
              <p className="text-[10px] uppercase font-bold text-slate-300 tracking-[0.2em]">Exkluzivní zabezpečený přístup pro lídry a členy</p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-1">
            <button
              onClick={() => { setLoginTab('login'); setLoginError(''); setRequestError(''); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loginTab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-400 hover:text-slate-650 hover:bg-slate-100/50'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Vstup do centra
            </button>
            <button
              onClick={() => { setLoginTab('request'); setLoginError(''); setRequestError(''); setRequestSuccess(null); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loginTab === 'request'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-400 hover:text-slate-650 hover:bg-slate-100/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Nová žádost (PIN)
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {loginTab === 'login' ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-5"
                >
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed select-text">
                    Zadejte své registrační číslo a čtyřmístný autorizační kód (PIN), který jste získali od svého TOP Lídra při aktivaci či registraci.
                  </p>

                  {loginError && (
                    <motion.div 
                      initial={{ scale: 0.95 }} 
                      animate={{ scale: 1 }}
                      className="p-3.5 rounded-2xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2.5 border border-rose-100"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{loginError}</span>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Registrační číslo (Člen ID)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={regId}
                          onChange={(e) => setRegId(e.target.value)}
                          placeholder="Např. 700700"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold outline-none focus:bg-white focus:border-slate-900 transition-all text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Heslo / Čtyřmístný kód (PIN)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                          <Key className="w-4.5 h-4.5" />
                        </span>
                        <input
                          type="password"
                          required
                          maxLength={16}
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          placeholder="••••"
                          className="w-full bg-slate-50 border border-slate-205 rounded-xl py-3 pl-10 pr-4 text-xs font-bold tracking-[0.25em] outline-none focus:bg-white focus:border-slate-900 transition-all text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-extrabold uppercase py-3.5 px-4 rounded-xl text-xs tracking-widest cursor-pointer transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Ověřuji kód v tianDe...' : 'Vstoupit do AI Asistenta'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Nejste ještě zaregistrovaní / První přihlášení s fotkami leaderů */}
                  <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100/60 text-slate-800">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <h4 className="text-[10px] font-black uppercase text-amber-800 tracking-wider">Přihlašujete se poprvé a nemáte PIN?</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                      Klikněte nahoře na záložku <span className="font-bold text-slate-700">"Nová žádost (PIN)"</span> nebo klikněte přímo na jednoho z našich 3 TOP lídrů níže pro spuštění žádosti:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { 
                          name: 'Ivana Nohavová', 
                          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
                        },
                        { 
                          name: 'Zuzana Grygier', 
                          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
                        },
                        { 
                          name: 'Marta Neumannová', 
                          image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200'
                        }
                      ].map((leader) => (
                        <div 
                          key={leader.name} 
                          onClick={() => {
                            setLoginTab('request');
                            setSelectedLeader(leader.name as any);
                          }}
                          className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200/60 hover:border-emerald-500 cursor-pointer transition-all active:scale-95 text-left group"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-100 group-hover:scale-105 transition-transform">
                            <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[8px] font-black uppercase tracking-wider text-slate-400 leading-none">Lídr</p>
                            <p className="text-[10px] font-bold text-slate-700 truncate leading-tight mt-0.5">{leader.name.split(' ')[0]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VIP Quick-Testing Collapsible Panel */}
                  <div className="pt-2 border-t border-slate-100">
                    <details className="group cursor-pointer">
                      <summary className="list-none flex items-center justify-between text-[10px] font-black uppercase text-slate-450 hover:text-slate-900 transition-colors select-none">
                        <span>💡 Rychlé přihlášení (Lídři & Správce & Testovací účet)</span>
                        <span className="text-xs transition-transform group-open:rotate-180">↓</span>
                      </summary>
                      <div className="grid grid-cols-2 gap-2.5 mt-3 pt-1 select-none">
                        {[
                          { id: '700700', pin: '2026', name: 'Kateřina Pekárková', role: 'Správce' },
                          { id: '800800', pin: '4455', name: 'Ivana Nohavová', role: 'TOP Lídr' },
                          { id: '900900', pin: '5566', name: 'Zuzana Grygier', role: 'TOP Lídr' },
                          { id: '600600', pin: '6677', name: 'Marta Neumannová', role: 'TOP Lídr' },
                          { id: 'test@apkatiande.cz', pin: '1234', name: 'Fiktivní / Testovací profil', role: 'Dočasný Bypass' }
                        ].map((u) => (
                          <div 
                            key={u.id}
                            onClick={() => fillPreset(u.id, u.pin)}
                            className="p-2.5 border border-slate-200 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50/10 text-left transition-all active:scale-95"
                          >
                            <p className="text-[10px] font-extrabold text-slate-800 truncate">{u.name}</p>
                            <p className="text-[8.5px] font-semibold text-slate-400">{u.role}</p>
                            <p className="text-[8.5px] font-black font-mono text-emerald-600 mt-1 uppercase truncate">ID: {u.id} | PIN: {u.pin}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="request-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleRequestSubmit}
                  className="space-y-5"
                >
                  {!requestSuccess ? (
                    <>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Pokud se přihlašujete poprvé, zadejte své registrační číslo a zvolte jednoho ze 3 TOP lídrů. Systém vám vygeneruje přístupový PIN kód a připraví žádost pro lídra.
                      </p>

                      {requestError && (
                        <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2 border border-rose-100">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                          <span>{requestError}</span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Vaše registrační číslo tianDe</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              required
                              value={requestRegId}
                              onChange={(e) => setRequestRegId(e.target.value.replace(/\D/g, ''))}
                              placeholder="Např. 518392"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold outline-none focus:bg-white focus:border-slate-900 transition-all text-slate-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">Zvolte svého TOP lídra pro odeslání žádosti</label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {[
                              { 
                                name: 'Ivana Nohavová', 
                                initials: 'IN', 
                                label: 'Ivana',
                                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
                              },
                              { 
                                name: 'Zuzana Grygier', 
                                initials: 'ZG', 
                                label: 'Zuzana',
                                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
                              },
                              { 
                                name: 'Marta Neumannová', 
                                initials: 'MN', 
                                label: 'Marta',
                                image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200'
                              }
                            ].map((leader) => {
                              const isSelected = selectedLeader === leader.name;
                              return (
                                <button
                                  key={leader.name}
                                  type="button"
                                  onClick={() => setSelectedLeader(leader.name as any)}
                                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center relative active:scale-95 cursor-pointer group ${
                                    isSelected 
                                      ? 'border-emerald-600 bg-emerald-50/10 font-bold ring-2 ring-emerald-600/20' 
                                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50/50'
                                  }`}
                                >
                                  <div className={`w-12 h-12 rounded-full overflow-hidden mb-2 shadow-sm border-2 shrink-0 transition-transform ${
                                    isSelected ? 'border-emerald-500 scale-105' : 'border-slate-100 group-hover:scale-105'
                                  }`}>
                                    <img 
                                      src={leader.image} 
                                      alt={leader.name} 
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <p className="text-[10px] font-black leading-tight text-slate-800">{leader.name}</p>
                                  {isSelected && (
                                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center scale-100 shadow">
                                      <Check className="w-2.5 h-2.5" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isRequesting}
                        className="w-full bg-emerald-650 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-extrabold uppercase py-3.5 px-4 rounded-xl text-xs tracking-widest cursor-pointer transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        {isRequesting ? 'Generuji PIN kód...' : 'Vygenerovat PIN a poslat žádost'}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-5 text-center select-text"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-900 uppercase">Žádost připravena & PIN vygenerován!</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Pro vaše registrační číslo <strong className="text-slate-800">#{requestRegId}</strong> byl vygenerován tento ochranný čtyřmístný kód (PIN):
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <div className="text-3xl font-black font-mono tracking-[0.25em] bg-emerald-50 border border-emerald-250 text-emerald-700 pl-4 py-3 rounded-2xl w-52 text-center shadow-inner">
                          {requestSuccess.pin}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(requestSuccess.pin);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
                          title="Kopírovat PIN"
                        >
                          {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 text-left space-y-2">
                        <div className="flex items-center gap-1.5 text-slate-850 text-xs font-black uppercase">
                          <Mail className="w-4 h-4 text-emerald-500" />
                          <span>Instrukce k odeslání lídrovi</span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">
                          Aby bylo vaše přihlášení dokončeno, je třeba poslat žádost vašemu lídrovi <strong className="text-slate-700">{requestSuccess.leaderName}</strong> na e-mail <strong className="text-slate-700">{requestSuccess.email}</strong>. 
                        </p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Tento kód byl již na serveru napárován na vaše číslo, takže do aplikace se <strong>můžete ihned přihlásit</strong>. Přesto prosím lídrovi zprávu odešlete pro záznam v týmu.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2.5 pt-2">
                        <a
                          href={mailtoUrl}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase py-3.5 px-4 rounded-xl text-xs tracking-widest cursor-pointer transition-all shadow-md text-center flex items-center justify-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Otevřít E-mail pro Lídra
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setRequestSuccess(null);
                            setLoginTab('login');
                          }}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold uppercase py-3 px-4 rounded-xl text-xs tracking-widest cursor-pointer transition-all text-center"
                        >
                          Přejít k přihlášení
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return renderLoginScreen();
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800 font-sans">
      <Sidebar 
        activePillar={activePillar} 
        setActivePillar={(pillar) => {
          setActivePillar(pillar);
          if (pillar === 'portal') {
            setSelectedPortalCategory(null);
          }
        }} 
        appMode={appMode} 
        setAppMode={setAppMode} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className={`flex-1 overflow-y-auto relative pt-16 lg:pt-0 pb-24 lg:pb-0 transition-colors duration-500 ease-in-out ${getBgColor()}`}>
        {/* Absolute Background Pattern */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] overflow-hidden select-none">
          <img src="/assets/tiande_pattern.png" alt="" className="w-96 grayscale shadow-none border-none" onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="min-h-full"
          >
            {activePillar !== 'portal' && (
              <div className="max-w-7xl mx-auto px-6 pt-6 -mb-4 relative z-20">
                <button 
                  onClick={() => {
                    setActivePillar('portal');
                    setSelectedPortalCategory(null);
                  }}
                  className={`flex items-center gap-2 group px-4 py-2.5 bg-white rounded-xl border shadow-sm text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    appMode === 'customer' 
                      ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50/40 hover:text-emerald-850 hover:border-emerald-300 shadow-emerald-100/50' 
                      : 'border-indigo-200 text-indigo-700 hover:bg-indigo-50/40 hover:text-indigo-850 hover:border-indigo-300 shadow-indigo-100/50'
                  }`}
                >
                  <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                  <span>← Zpět na výběr rolí</span>
                </button>
              </div>
            )}
            {renderPillar()}
          </motion.div>
        </AnimatePresence>

        <footer className="h-12 bg-slate-900 text-white flex items-center justify-between px-10 text-[9px] uppercase tracking-[0.2em] shrink-0 font-bold select-none border-t border-t-slate-800">
          <div>&copy; {new Date().getFullYear()} TianDe AI Assistant | Interní Nástroj</div>
          <div className="flex gap-8">
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">Pravidla tianDe</span>
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">Technická podpora</span>
            <span className="opacity-40">Verze 3.2.0</span>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation Bar styled like a premium native bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] z-40 flex items-center justify-around px-2 pb-safe select-none">
        <button
          onClick={() => {
            setAppMode('customer');
            setActivePillar('portal');
            setSelectedPortalCategory('customer');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-all active:scale-95 ${
            appMode === 'customer' 
              ? 'text-emerald-600 font-extrabold' 
              : 'text-slate-400 hover:text-slate-500'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 transition-transform ${appMode === 'customer' ? 'fill-emerald-50 text-emerald-600 scale-105' : 'text-slate-400'}`} />
          <span className="text-[9px] font-black uppercase tracking-wider">🛍️ Zákazník</span>
        </button>

        <button
          onClick={() => {
            setActivePillar('portal');
            setSelectedPortalCategory(null);
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-all active:scale-95 ${
            activePillar === 'portal' && selectedPortalCategory === null
              ? 'text-slate-805 font-extrabold' 
              : 'text-slate-400 hover:text-slate-500'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activePillar === 'portal' && selectedPortalCategory === null ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-slate-100/80 text-slate-400'}`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider">Rozcestí</span>
        </button>

        <button
          onClick={() => {
            setAppMode('business');
            setActivePillar('portal');
            setSelectedPortalCategory('business');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-all active:scale-95 ${
            appMode === 'business' 
              ? 'text-indigo-600 font-extrabold' 
              : 'text-slate-400 hover:text-slate-500'
          }`}
        >
          <Briefcase className={`w-4.5 h-4.5 transition-transform ${appMode === 'business' ? 'fill-indigo-50 text-indigo-600 scale-105' : 'text-slate-400'}`} />
          <span className="text-[9px] font-black uppercase tracking-wider">💼 Byznys</span>
        </button>
      </div>
    </div>
  );
}
