import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Send, Loader2, Info, CheckCircle2, Package } from 'lucide-react';

export const RecommendationPillar: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

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

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      <header className="mb-12">
        <p className="text-sm text-tiande-blue font-serif italic mb-2">Prémiová péče tianDe</p>
        <h2 className="text-5xl font-light tracking-tight text-slate-800">
          Doporučení <span className="font-serif italic font-normal text-slate-400">kúry</span>
        </h2>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 sticky top-8">
            <h3 className="label-caps mb-6">Nový požadavek</h3>
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
      </div>
    </div>
  );
};
