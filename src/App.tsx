/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { RecommendationPillar } from './components/RecommendationPillar';
import { ProductsPillar } from './components/ProductsPillar';
import { ContentCreatorPillar } from './components/ContentCreatorPillar';
import { VideoLibraryPillar } from './components/VideoLibraryPillar';
import { ObjectionsPillar } from './components/ObjectionsPillar';
import { EducationPillar } from './components/EducationPillar';
import { Pillar } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePillar, setActivePillar] = useState<Pillar>('recommendations');

  const renderPillar = () => {
    switch (activePillar) {
      case 'recommendations': return <RecommendationPillar />;
      case 'products': return <ProductsPillar />;
      case 'content': return <ContentCreatorPillar />;
      case 'videos': return <VideoLibraryPillar />;
      case 'objections': return <ObjectionsPillar />;
      case 'education': return <EducationPillar />;
      default: return <RecommendationPillar />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activePillar={activePillar} setActivePillar={setActivePillar} />
      
      <main className="flex-1 overflow-y-auto relative pt-16 lg:pt-0">
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] overflow-hidden">
          <img src="/assets/tiande_pattern.png" alt="" className="w-96 grayscale" onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="min-h-full"
          >
            {renderPillar()}
          </motion.div>
        </AnimatePresence>

        <footer className="h-12 bg-slate-900 text-white flex items-center justify-between px-10 text-[9px] uppercase tracking-[0.2em] shrink-0 font-bold">
          <div>&copy; {new Date().getFullYear()} TianDe AI Assistant | Interní Nástroj</div>
          <div className="flex gap-8">
            <span className="hover:text-tiande-blue cursor-pointer transition-colors">Pravidla tianDe</span>
            <span className="hover:text-tiande-blue cursor-pointer transition-colors">Technická podpora</span>
            <span className="opacity-40">Verze 3.1.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

