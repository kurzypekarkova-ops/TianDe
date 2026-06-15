import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  PenTool, 
  Video, 
  MessageCircle, 
  BookOpen, 
  ChevronRight,
  Menu,
  X,
  ShoppingBag,
  Sparkles,
  Flame,
  Send,
  Layers,
  Calculator,
  RefreshCw,
  Mail,
  Home,
  Briefcase,
  Heart
} from 'lucide-react';
import { Pillar } from '../types';

interface SidebarProps {
  activePillar: Pillar;
  setActivePillar: (pillar: Pillar) => void;
  appMode: 'customer' | 'business';
  setAppMode: (mode: 'customer' | 'business') => void;
}

interface ItemDetail {
  id: Pillar;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface GroupDetail {
  title: string;
  items: ItemDetail[];
}

const customerGroups: GroupDetail[] = [
  {
    title: '🧪 PORADENSTVÍ & KVÍZ',
    items: [
      { id: 'diagnosis', label: 'Bylinný Kvíz (Diagnostika)', icon: <Sparkles className="w-3.5 h-3.5" />, description: 'Bylinný test na míru' },
      { id: 'recommendations', label: 'Start Nováčka', icon: <Package className="w-3.5 h-3.5" />, description: 'Doporučené krabičky' },
    ]
  },
  {
    title: '📖 PRODUKTY & SLOŽENÍ',
    items: [
      { id: 'products', label: 'Encyklopedie složení', icon: <ShoppingBag className="w-3.5 h-3.5" />, description: 'Účinné fytosložky' },
      { id: 'education', label: 'Produktové řady', icon: <BookOpen className="w-3.5 h-3.5" />, description: 'Přehled hlavních řad' },
    ]
  },
  {
    title: '🛍️ VIP NÁKUPY',
    items: [
      { id: 'calculator', label: 'Kalkulačka úspor (VIP)', icon: <Calculator className="w-3.5 h-3.5" />, description: 'Za kolik nakoupíte' }
    ]
  }
];

const businessGroups: GroupDetail[] = [
  {
    title: '💬 PÉČE O KLIENTY',
    items: [
      { id: 'reactivation', label: 'Oživovač zákazníků', icon: <RefreshCw className="w-3.5 h-3.5" />, description: 'Smart Follow-up bodů' },
      { id: 'mailing', label: 'Mailingový asistent', icon: <Mail className="w-3.5 h-3.5" />, description: 'Dopisy pro strukturu' },
    ]
  },
  {
    title: '📣 PRODEJ & NÁMITKY',
    items: [
      { id: 'scripts', label: 'Předlohy konverzace', icon: <Send className="w-3.5 h-3.5" />, description: 'Zprávy zákaznicím' },
      { id: 'objections', label: 'Řešení námitek', icon: <MessageCircle className="w-3.5 h-3.5" />, description: 'Reakce na překážky' },
    ]
  },
  {
    title: '📱 MARKETING & SÍTĚ',
    items: [
      { id: 'storycookbook', label: 'Příběhy na sítě', icon: <Layers className="w-3.5 h-3.5" />, description: 'Stories prodejní scénáře' },
      { id: 'content', label: 'Materiály na sítě', icon: <PenTool className="w-3.5 h-3.5" />, description: 'Tvorba obsahu FB/IG' },
      { id: 'hooks', label: 'Trháky (Hooky)', icon: <Flame className="w-3.5 h-3.5" />, description: 'Hooky pro reels & posty' },
    ]
  },
  {
    title: '💼 STRUKTURA & MLM',
    items: [
      { id: 'videos', label: 'Videotéka lídrů', icon: <Video className="w-3.5 h-3.5" />, description: 'Školení tianDe' },
      { id: 'calculator', label: 'Kalkulačka provizí', icon: <Calculator className="w-3.5 h-3.5" />, description: 'Výpočet MLM odměn' },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ activePillar, setActivePillar, appMode, setAppMode }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleModeSwitch = (mode: 'customer' | 'business') => {
    setAppMode(mode);
    if (mode === 'customer') {
      setActivePillar('portal');
    } else {
      setActivePillar('portal');
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-tiande-blue text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        id="sidebar-toggle"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? 290 : 0, opacity: isOpen ? 1 : 0 }}
        className="fixed lg:relative z-40 h-screen bg-white border-r border-slate-250 overflow-hidden flex flex-col shrink-0"
      >
        <div className="w-[290px] h-full flex flex-col">
          {/* Logo Brand Panel */}
          <div 
            onClick={() => setActivePillar('portal')}
            className="p-6 pl-14 lg:pl-6 pt-16 lg:pt-6 border-b border-slate-100 flex flex-col gap-0.5 cursor-pointer hover:bg-slate-50/50 active:bg-slate-100/50 transition-all select-none group"
            title="Návrat na hlavní rozcestník"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
                <span className="text-emerald-600 font-extrabold font-serif italic group-hover:scale-102 transition-transform">tianDe</span>
                <span className="text-[11px] font-black uppercase text-slate-400 bg-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 px-1.5 py-0.5 rounded tracking-widest leading-none transition-colors">AI Center</span>
              </span>
            </div>
            <p className="text-[8px] font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-[0.2em] mt-0.5 transition-colors">
              ROZCESTNÍK PRODEJE & KRÁSY
            </p>
          </div>

          {/* MAIN CHOOSE A PATH BUTTONS */}
          <div className="p-4 border-b border-slate-100 space-y-2 bg-slate-50/55">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1 block">
              ZVOLTE SVOU ROLI
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleModeSwitch('customer')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center gap-1 group relative cursor-pointer ${
                  appMode === 'customer' 
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-800 shadow-sm font-extrabold' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-350'
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${appMode === 'customer' ? 'text-emerald-500 font-bold animate-pulse' : 'text-slate-400'}`} />
                <span className="text-[10px] font-black uppercase tracking-wider">ZÁKAZNÍK</span>
                {appMode === 'customer' && (
                  <div className="absolute -bottom-1 w-2 h-2 bg-emerald-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => handleModeSwitch('business')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center gap-1 group relative cursor-pointer ${
                  appMode === 'business' 
                    ? 'border-indigo-500 bg-indigo-50/50 text-indigo-850 shadow-sm font-extrabold' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-350'
                }`}
              >
                <Briefcase className={`w-4 h-4 transition-transform group-hover:scale-110 ${appMode === 'business' ? 'text-indigo-500' : 'text-slate-400'}`} />
                <span className="text-[10px] font-black uppercase tracking-wider">BYZNYS</span>
                {appMode === 'business' && (
                  <div className="absolute -bottom-1 w-2 h-2 bg-indigo-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* MAIN ACCORDIONS NAVIGATION AREA */}
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto custom-scroll">
            
            {/* Quick Home / Portal Link */}
            <button
              onClick={() => {
                setActivePillar('portal');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 p-2 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                activePillar === 'portal'
                  ? 'bg-slate-900 border-slate-900 text-white shadow'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>HLAVNÍ ROZCESTNÍK PORTRÉTU</span>
            </button>

            {/* SECTION 1: ZÁKAZNÍK ACCORDION */}
            <div className="border border-slate-200/50 rounded-2xl overflow-hidden bg-white/70">
              <button
                onClick={() => handleModeSwitch('customer')}
                className={`w-full flex items-center justify-between p-3.5 text-left border-b border-slate-100 transition-colors cursor-pointer ${
                  appMode === 'customer'
                    ? 'bg-emerald-50/30 text-emerald-900'
                    : 'text-slate-600 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-black uppercase tracking-wider ${appMode === 'customer' ? 'text-emerald-700' : 'text-slate-700'}`}>
                    🛍️ PRO KLIENTY (Zákazník)
                  </span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform text-slate-400/80 ${appMode === 'customer' ? 'rotate-90 text-emerald-600 font-bold' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {appMode === 'customer' && (
                  <motion.div
                    key="customer-nav"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-slate-50/30 p-2 space-y-3"
                  >
                    {customerGroups.map((group) => (
                      <div key={group.title} className="space-y-1">
                        <span className="text-[8px] font-black tracking-widest text-emerald-600/70 block pl-2 uppercase">
                          {group.title}
                        </span>
                        <div className="space-y-0.5">
                          {group.items.map((item) => {
                            const isPillarActive = activePillar === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setActivePillar(item.id);
                                  if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between p-2 pl-3 rounded-xl transition-all duration-200 group relative cursor-pointer ${
                                  isPillarActive 
                                    ? 'bg-emerald-100/45 text-emerald-900 font-bold shadow-sm border border-emerald-200/40' 
                                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/30'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`transition-colors shrink-0 ${isPillarActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500/60'}`}>
                                    {item.icon}
                                  </div>
                                  <div className="text-left flex flex-col">
                                    <span className={`text-[10.5px] uppercase tracking-wider font-semibold ${isPillarActive ? 'text-emerald-900 font-black' : 'text-slate-700'}`}>
                                      {item.label}
                                    </span>
                                    <span className="text-[8.5px] text-slate-400 font-medium tracking-normal">
                                      {item.description}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600/40" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SECTION 2: BYZNYS ACCORDION */}
            <div className="border border-slate-200/50 rounded-2xl overflow-hidden bg-white/70">
              <button
                onClick={() => handleModeSwitch('business')}
                className={`w-full flex items-center justify-between p-3.5 text-left border-b border-slate-100 transition-colors cursor-pointer ${
                  appMode === 'business'
                    ? 'bg-indigo-50/20 text-indigo-900'
                    : 'text-slate-600 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-black uppercase tracking-wider ${appMode === 'business' ? 'text-indigo-700' : 'text-slate-700'}`}>
                    📊 PRO PARTNERY (Byznys)
                  </span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform text-slate-400/80 ${appMode === 'business' ? 'rotate-90 text-indigo-600 font-bold' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {appMode === 'business' && (
                  <motion.div
                    key="business-nav"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-slate-50/30 p-2 space-y-3.5"
                  >
                    {businessGroups.map((group) => (
                      <div key={group.title} className="space-y-1">
                        <span className="text-[8px] font-black tracking-widest text-indigo-600 block pl-2 uppercase">
                          {group.title}
                        </span>
                        <div className="space-y-0.5">
                          {group.items.map((item) => {
                            const isPillarActive = activePillar === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setActivePillar(item.id);
                                  if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between p-2 pl-3 rounded-xl transition-all duration-200 group relative cursor-pointer ${
                                  isPillarActive 
                                    ? 'bg-indigo-100/40 text-indigo-900 font-bold shadow-sm border border-indigo-200/30' 
                                    : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/20'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`transition-colors shrink-0 ${isPillarActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500/50'}`}>
                                    {item.icon}
                                  </div>
                                  <div className="text-left flex flex-col">
                                    <span className={`text-[10.5px] uppercase tracking-wider font-semibold ${isPillarActive ? 'text-indigo-950 font-black' : 'text-slate-700'}`}>
                                      {item.label}
                                    </span>
                                    <span className="text-[8.5px] text-slate-400 font-medium tracking-normal">
                                      {item.description}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500/40" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          {/* PERSISTENT TOP LEADER STATS CARD */}
          <div className="p-4 border-t border-slate-100 select-none">
            <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/80">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-0.5">NÁŠ TÝMOVÝ MENTOR</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7.5 h-7.5 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-md relative shrink-0">
                  IN
                  <div className="absolute right-0 bottom-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800 leading-none">Ivana Nohavová</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Top lídr tianDe</p>
                  <div className="flex items-center gap-1 text-[8.5px] text-green-500 font-bold uppercase mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Připojena online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay modal background layer for mobile device viewports inside the browser */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
};
