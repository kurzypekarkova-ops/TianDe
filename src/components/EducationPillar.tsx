import React from 'react';
import { Book, ChevronRight, Star } from 'lucide-react';
import { PRODUCT_LINES } from '../data';
import { motion } from 'motion/react';

export const EducationPillar: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      <header className="mb-12">
        <p className="label-caps opacity-50 tracking-[0.3em] mb-4">Edukační modul</p>
        <h2 className="text-5xl font-light tracking-tight text-slate-800">
          TianDe <span className="serif-italic text-slate-400">Library</span>
        </h2>
      </header>

      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8">
          <h3 className="label-caps mb-8 !text-slate-800">Produktové segmenty</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {PRODUCT_LINES.map((line, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={line}
                className="bg-white p-6 border border-slate-200 group hover:border-tiande-blue transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl font-serif italic text-slate-200 group-hover:text-tiande-blue transition-colors">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest text-slate-600 group-hover:text-slate-900 transition-colors">{line}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight className="w-4 h-4 text-tiande-blue" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 space-y-10">
          <section className="bg-white border-t-4 border-tiande-blue p-8 shadow-sm">
            <h3 className="label-caps mb-8">Business Academy</h3>
            <div className="space-y-6">
              {[
                "Jak začít s TianDe",
                "Marketingový plán v praxi",
                "Tvorba osobní značky",
                "Duplikace v týmu"
              ].map((topic, i) => (
                <div key={topic} className="flex flex-col gap-1 group cursor-pointer">
                  <p className="text-[10px] font-black text-tiande-blue/40 group-hover:text-tiande-blue">MODUL 0{i + 1}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-700 group-hover:text-tiande-blue transition-colors">{topic}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-white p-10 rounded-lg relative overflow-hidden shadow-2xl">
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <Star className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="bg-tiande-blue px-3 py-1 text-[9px] font-black tracking-widest uppercase inline-block mb-6 rounded">Expert Tip</div>
              <p className="text-sm font-serif italic leading-relaxed text-slate-300 mb-6">
                "Při prezentaci řady EcoDeViva zdůrazňujte úsporu času a ochranu životního prostředí. Jsou to dva nejsilnější argumenty pro moderního zákazníka."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold">EN</div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Elena Nováková, TOP Lídr</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
