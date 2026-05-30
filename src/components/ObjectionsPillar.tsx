import React from 'react';
import { MessageSquare, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { OBJECTIONS } from '../data';
import { motion } from 'motion/react';

export const ObjectionsPillar: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 lg:px-10">
      <header className="mb-12 text-center">
        <h2 className="text-5xl font-light tracking-tight text-slate-800 mb-2">
          Psychologie <span className="font-serif italic text-slate-400">prodeje</span>
        </h2>
        <p className="label-caps opacity-50 tracking-[0.3em]">Boj s námitkami</p>
      </header>

      <div className="grid gap-10">
        {OBJECTIONS.map((obj, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={obj.id}
            className="bg-white border-t-4 border-tiande-blue p-10 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-serif italic text-slate-100 leading-none">0{index + 1}</span>
                  <h3 className="label-caps !text-slate-800">Námitka: "{obj.title}"</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4">Analýza obavy</h4>
                    <p className="text-sm text-slate-500 leading-relaxed italic">
                      Klient v tuto chvíli nevidí hodnotu, nebo má špatnou zkušenost z minulosti. Naším cílem je ukázat fakta.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 border border-slate-100 rounded relative">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-tiande-blue text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-lg">
                      Odpověď
                    </div>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed italic pt-2">
                      {obj.response}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 border border-slate-200 p-12 text-center rounded relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-tiande-blue" />
        <h3 className="text-2xl font-light mb-8 text-slate-800">Zlatá pravidla <span className="serif-italic">komunikace</span></h3>
        <div className="grid sm:grid-cols-4 gap-8">
          {[
            { n: "01", t: "Empatie", d: "Nikdy neodporujte." },
            { n: "02", t: "Otázky", d: "Zjišťujte jádro pudla." },
            { n: "03", t: "Benefit", d: "Mluvte o řešení." },
            { n: "04", t: "Klid", d: "Váš postoj prodává." }
          ].map(p => (
            <div key={p.n}>
              <p className="text-2xl font-serif italic text-tiande-blue mb-2">{p.n}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">{p.t}</p>
              <p className="text-[10px] text-slate-400 leading-tight uppercase font-bold">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
