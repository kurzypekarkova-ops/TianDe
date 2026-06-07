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
  ShoppingBag
} from 'lucide-react';
import { Pillar } from '../types';

interface SidebarProps {
  activePillar: Pillar;
  setActivePillar: (pillar: Pillar) => void;
}

const navItems: { id: Pillar; label: string; icon: React.ReactNode; description: string }[] = [
  { 
    id: 'recommendations', 
    label: 'Nováčci', 
    icon: <Package className="w-5 h-5" />,
    description: 'Doporučení produktů'
  },
  { 
    id: 'products', 
    label: 'Produkty', 
    icon: <ShoppingBag className="w-5 h-5" />,
    description: 'Složky ze sortimentu'
  },
  { 
    id: 'content', 
    label: 'Materiály', 
    icon: <PenTool className="w-5 h-5" />,
    description: 'Tvorba obsahu'
  },
  { 
    id: 'videos', 
    label: 'Videotéka', 
    icon: <Video className="w-5 h-5" />,
    description: 'Školení a ukázky'
  },
  { 
    id: 'objections', 
    label: 'Námitky', 
    icon: <MessageCircle className="w-5 h-5" />,
    description: 'Jak reagovat'
  },
  { 
    id: 'education', 
    label: 'Vzdělávání', 
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Produktové řady'
  },
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

          <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div className="mb-4">
              <h2 className="label-caps mb-4 opacity-50">Hlavní Pilar</h2>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePillar(item.id);
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group relative ${
                      activePillar === item.id 
                        ? 'bg-slate-50 text-tiande-blue' 
                        : 'text-slate-500 hover:text-tiande-blue hover:bg-slate-50/50'
                    }`}
                    id={`nav-${item.id}`}
                  >
                    <div className={`transition-colors ${activePillar === item.id ? 'text-tiande-blue' : 'text-slate-300 group-hover:text-tiande-blue/50'}`}>
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className={`font-bold text-xs uppercase tracking-widest ${activePillar === item.id ? 'text-tiande-blue' : ''}`}>
                        {item.label}
                      </p>
                    </div>
                    {activePillar === item.id && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 w-1 h-6 bg-tiande-blue rounded-r-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-slate-100">
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Uživatel</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-[11px] font-black shadow-md shadow-pink-600/20">
                  IN
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Ivana Nohavová</p>
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
