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
  UserCheck
} from 'lucide-react';

export default function App() {
  const [activePillar, setActivePillar] = useState<Pillar>('portal');
  const [appMode, setAppMode] = useState<'customer' | 'business'>('customer');
  const [selectedPortalCategory, setSelectedPortalCategory] = useState<'customer' | 'business' | null>(null);

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
      <div className="container mx-auto px-6 py-10 md:py-16 max-w-7xl space-y-12 select-none">
        {/* Header Introduction */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 font-bold" />
            <span>EXKLUZIVNÍ MLM CHYTRÝ POMOCNÍK</span>
          </div>
          <h1 
            onClick={() => setSelectedPortalCategory(null)}
            className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight cursor-pointer hover:opacity-90 select-none transition-all active:scale-[0.99] group/title"
            title="Klepnutím vyčistíte výběr zón"
          >
            Vítejte v <span className="font-serif italic font-semibold text-emerald-600 group-hover/title:underline">tianDe</span> AI Asistentovi
          </h1>
        </div>

        {/* The Dual Pillars selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
          
          {/* PATH A: CUSTOMER (ZÁKAZNÍK) */}
          <motion.div 
            onClick={() => {
              setSelectedPortalCategory('customer');
              setAppMode('customer');
            }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`cursor-pointer bg-white rounded-3xl border-2 shadow-sm overflow-hidden flex flex-col justify-between transition-all group ${
              selectedPortalCategory === 'customer' 
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10' 
                : 'border-slate-200/50 hover:border-emerald-300'
            }`}
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Heart className="w-6 h-6 font-bold text-emerald-600 animate-pulse" />
                </div>
                <span className="text-[10px] bg-emerald-150 text-emerald-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  🛍️ Člen & Zákazník
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                  CHCI KOUPIT & PORADIT
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Pro dámy, které zajímá altajské bylinné složení, potřebují diagnostiku těla či pleti, chtějí sestavit kůru, učit se o řadách a vypočítat si nákupní ceny s úsporou 35 %.
                </p>
              </div>

              {selectedPortalCategory === 'customer' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-slate-100 pt-6 space-y-3.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[9px] font-black text-emerald-600 tracking-widest uppercase block">
                    Moje chytré nástroje:
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('diagnosis', 'customer');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase">Kvíz & Diagnostika</h4>
                        <p className="text-[10px] text-slate-400">Automatický fytoplán pro vaše obtíže na těle i pleti.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('products', 'customer');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase">Encyklopedie složení</h4>
                        <p className="text-[10px] text-slate-400">Zjistěte léčivou sílu mumia, hadího tuku či ženšenu.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('education', 'customer');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase">Léčivé produktové řady</h4>
                        <p className="text-[10px] text-slate-400">Detailní plány s fytogely, šampony i vložkami.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('recommendations', 'customer');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <Package className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase">Start Nováčka</h4>
                        <p className="text-[10px] text-slate-400">Ověřené balíčky a tipy, jak objednat tianDe produkty.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('calculator', 'customer');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all cursor-pointer"
                    >
                      <Calculator className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase">Kalkulačka úspor (VIP)</h4>
                        <p className="text-[10px] text-slate-400">Přehledný převod katalogových cen na nákupní slevu 35 %.</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {selectedPortalCategory === 'customer' ? (
              <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center bg-emerald-50/20" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs text-emerald-800 font-bold">Zákaznická zóna aktivní</span>
                <button 
                  onClick={() => handleModeSwitch('customer')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Vstoupit do sekce</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-center items-center">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Klepnutím rozbalíte nástroje</span>
              </div>
            )}
          </motion.div>

          {/* PATH B: BUSINESS (BYZNYS) */}
          <motion.div 
            onClick={() => {
              setSelectedPortalCategory('business');
              setAppMode('business');
            }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`cursor-pointer bg-white rounded-3xl border-2 shadow-sm overflow-hidden flex flex-col justify-between transition-all group ${
              selectedPortalCategory === 'business' 
                ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10' 
                : 'border-slate-200/50 hover:border-indigo-300'
            }`}
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-[10px] bg-indigo-150 text-indigo-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  💼 Partner & Lídryně
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                  CHCI PRODÁVAT & TVOŘIT TÝM
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Pro ambiciózní partnerky registrované u Ivy Nohavové. Obsahuje marketingové texty, šablony kontaktování, oživovače zákaznic, hromadné mailingy a provizní kalkulačku.
                </p>
              </div>

              {selectedPortalCategory === 'business' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-slate-100 pt-6 space-y-3.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[9px] font-black text-indigo-600 tracking-widest uppercase block">
                    Moje profesionální nástroje:
                  </span>

                  <div className="grid grid-cols-1 gap-2.5">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('reactivation', 'business');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-indigo-800 uppercase">Oživovač zákazníků</h4>
                        <p className="text-[10px] text-slate-400">Připravte zprávy pro neaktivní VIP klientky (De-coiny).</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('scripts', 'business');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Send className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-indigo-800 uppercase">Předlohy konverzace</h4>
                        <p className="text-[10px] text-slate-400">Slovo od slova scénáře na oslovení z plna i ze sítí.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('storycookbook', 'business');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Layers className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-indigo-800 uppercase">Příběhy, které prodávají</h4>
                        <p className="text-[10px] text-slate-400">Vícestupňové scénáře s texty pro vaše Facebook stories.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('mailing', 'business');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Mail className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-indigo-800 uppercase">Mailing pro strukturu</h4>
                        <p className="text-[10px] text-slate-400">E-mailové šablony k uvítání partnerů i dárkům za De-coiny.</p>
                      </div>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        selectPortalTool('calculator', 'business');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all cursor-pointer"
                    >
                      <Calculator className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-indigo-800 uppercase">MLM Provizní kalkulačka</h4>
                        <p className="text-[10px] text-slate-400">Spočítejte marketingové podíly za své partnery a lidi v týmu.</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {selectedPortalCategory === 'business' ? (
              <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center bg-indigo-50/15" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs text-indigo-800 font-bold">Byznys zóna aktivní</span>
                <button 
                  onClick={() => handleModeSwitch('business')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Vstoupit do sekce</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-center items-center">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Klepnutím rozbalíte nástroje</span>
              </div>
            )}
          </motion.div>

        </div>

        {/* Header Introduction text moved UNDER the clickable variants */}
        <div className="text-center max-w-3xl mx-auto pt-4 space-y-2">
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
            Vyberte si svou hlavní roli pro dnešní den. Jste nakupující VIP zákaznice hledající bylinné zdraví a slevy, nebo tianDe partnerka budující úspěšnou obchodní síť? Vyberte jeden z portů výše a nechte se vést.
          </p>
        </div>

        {/* Coach Advice Block */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center font-bold text-base text-rose-300 shrink-0">
            IN
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <span className="text-[9px] font-black uppercase text-rose-400 tracking-[0.2em] block">ROZUMNÁ RADA OD IVY NOHAVOVÉ:</span>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Klíčem k úspěchu v tianDe je rovnováha. Pokud se učíte s produkty, vyzkoušejte sekci ZÁKAZNÍK. Až budete připravena dporučit produkty dál a vydělat si první vážné peníze na kávu nebo auto odměnu, přepněte na sekci BYZNYS. Rozcestníky máte kdykoliv dostupné v pravém menu."
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
