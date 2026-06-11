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
  Mail
} from 'lucide-react';
import { Pillar } from '../types';

interface SidebarProps {
  activePillar: Pillar;
  setActivePillar: (pillar: Pillar) => void;
}

interface NavItem {
  id: Pillar;
  label: string;
  icon: React.ReactNode;
  description: string;
  category: 'clients' | 'content' | 'products' | 'business';
}

const navItems: NavItem[] = [
  // 1. Prodej & Klienti
  { 
    id: 'reactivation', 
    label: 'Oživovač zákazníků', 
    icon: <RefreshCw className="w-4 h-4 text-emerald-500 font-extrabold" />,
    description: 'Smart Follow-up',
    category: 'clients'
  },
  { 
    id: 'scripts', 
    label: 'Předlohy na konverzaci', 
    icon: <Send className="w-4 h-4 text-emerald-500 font-extrabold" />,
    description: 'Vztahové zprávy',
    category: 'clients'
  },
  { 
    id: 'mailing', 
    label: 'Mailingový asistent', 
    icon: <Mail className="w-4 h-4 text-indigo-500 font-extrabold" />,
    description: 'E-maily & Newslettery',
    category: 'clients'
  },
  { 
    id: 'objections', 
    label: 'Námitky', 
    icon: <MessageCircle className="w-4 h-4 text-slate-500" />,
    description: 'Jak reagovat',
    category: 'clients'
  },

  // 2. Obsah & Sítě
  { 
    id: 'storycookbook', 
    label: 'Příběhy, které prodávají', 
    icon: <Layers className="w-4 h-4 text-pink-500 font-extrabold" />,
    description: 'Vícekrokové scénáře',
    category: 'content'
  },
  { 
    id: 'content', 
    label: 'Materiály', 
    icon: <PenTool className="w-4 h-4 text-slate-500" />,
    description: 'Tvorba obsahu',
    category: 'content'
  },
  { 
    id: 'hooks', 
    label: 'Hooky na sítích', 
    icon: <Flame className="w-4 h-4 text-orange-500 font-extrabold" />,
    description: 'Social Media Hooky',
    category: 'content'
  },

  // 3. Diagnostika & Produkty
  { 
    id: 'diagnosis', 
    label: 'Diagnostika (Kvíz)', 
    icon: <Sparkles className="w-4 h-4 text-pink-500 font-extrabold" />,
    description: 'Bylinný kvíz na míru',
    category: 'products'
  },
  { 
    id: 'products', 
    label: 'Encyklopedie složení', 
    icon: <ShoppingBag className="w-4 h-4 text-slate-500" />,
    description: 'Složky ze sortimentu',
    category: 'products'
  },
  { 
    id: 'recommendations', 
    label: 'Start Nováčka', 
    icon: <Package className="w-4 h-4 text-slate-500" />,
    description: 'Doporučení produktů',
    category: 'products'
  },

  // 4. Byznys & Vzdělávání
  { 
    id: 'calculator', 
    label: 'Kalkulačka marží', 
    icon: <Calculator className="w-4 h-4 text-blue-500 font-extrabold" />,
    description: 'Úspory & Provizeík',
    category: 'business'
  },
  { 
    id: 'education', 
    label: 'Produktové řady', 
    icon: <BookOpen className="w-4 h-4 text-slate-500" />,
    description: 'Produktové řady',
    category: 'business'
  },
  { 
    id: 'videos', 
    label: 'Videotéka lídrů', 
    icon: <Video className="w-4 h-4 text-slate-500" />,
    description: 'Školení a ukázky',
    category: 'business'
  },
];

const categories = [
  { id: 'clients', label: '💬 Prodej & Klienti' },
  { id: 'content', label: '✨ Obsah & Sítě' },
  { id: 'products', label: '🛍️ Kvíz & Produkty' },
  { id: 'business', label: '📊 Vlastní růst & Byznys' }
];

export const Sidebar: React.FC<SidebarProps> = ({ activePillar, setActivePillar }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-tiande-blue text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        id="sidebar-toggle"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
        className="fixed lg:relative z-40 h-screen bg-white border-r border-slate-200 overflow-hidden flex flex-col"
      >
        <div className="w-[280px] h-full flex flex-col">
          <div className="p-8 pl-16 lg:pl-8 pt-20 lg:pt-8 border-b border-slate-100 flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tighter text-tiande-blue">tianDe</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Assistant</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-1">Interní Nástroj</p>
          </div>

          <nav className="flex-1 p-6 space-y-6 overflow-y-auto">
            {categories.map((cat) => {
              const items = navItems.filter(item => item.category === cat.id);
              if (items.length === 0) return null;

              return (
                <div key={cat.id} className="space-y-1.5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400/80 mb-2 pl-2">
                    {cat.label}
                  </h3>
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActivePillar(item.id);
                          if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 pl-3 rounded-lg transition-all duration-200 group relative ${
                          activePillar === item.id 
                            ? 'bg-slate-50 text-tiande-blue font-bold' 
                            : 'text-slate-500 hover:text-tiande-blue hover:bg-slate-50/40'
                        }`}
                        id={`nav-${item.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`transition-colors shrink-0 ${activePillar === item.id ? 'text-tiande-blue' : 'text-slate-400/70 group-hover:text-tiande-blue/50'}`}>
                            {item.icon}
                          </div>
                          <span className={`text-[11px] uppercase tracking-wider ${activePillar === item.id ? 'text-tiande-blue font-extrabold' : 'font-medium'}`}>
                            {item.label}
                          </span>
                        </div>
                        
                        {activePillar === item.id ? (
                          <motion.div 
                            layoutId="active-indicator"
                            className="absolute left-0 w-1 h-5 bg-tiande-blue rounded-r-full"
                          />
                        ) : (
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-100">
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Uživatel</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-[11px] font-black shadow-md shadow-pink-600/20">
                  IN
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Ivana Nohovová</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">TOP Lídr</p>
                  <div className="flex items-center gap-1.5 text-[9px] text-green-500 font-bold uppercase mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
};
