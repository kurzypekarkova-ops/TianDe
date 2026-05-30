import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { FileText, Instagram, Mail, Layout, MessageSquare, Copy, Check, Loader2, Pen } from 'lucide-react';

type MaterialType = 'flyer' | 'social' | 'email' | 'presentation' | 'objection';

interface MaterialOption {
  id: MaterialType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const materialOptions: MaterialOption[] = [
  { id: 'social', label: 'Sociální sítě', icon: <Instagram className="w-5 h-5" />, description: 'FB/IG příspěvky' },
  { id: 'flyer', label: 'Leták / A4', icon: <FileText className="w-5 h-5" />, description: 'Strukturovaný leták' },
  { id: 'email', label: 'E-mail', icon: <Mail className="w-5 h-5" />, description: 'Oslovení zájemce' },
  { id: 'presentation', label: 'Prezentace', icon: <Layout className="w-5 h-5" />, description: 'Text pro schůzku' },
  { id: 'objection', label: 'Námitka', icon: <MessageSquare className="w-5 h-5" />, description: 'Odpověď na míru' },
];

export const ContentCreatorPillar: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MaterialType>('social');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Vytvoř ${selectedType} pro TianDe na základě tohoto kontextu: ${context}`,
          systemPrompt: `Jsi kreativní ředitel TianDe. Tvým úkolem je vytvářet propagační a vzdělávací materiály. Tón: vřelý, profesionální, autentický. Vždy zdůrazňuj přírodu a unikátní Altajské složení. Nepřeháněj zdravotní tvrzení.`
        })
      });
      const data = await response.json();
      setResult(data.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      <header className="mb-12 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-tiande-blue mb-4 leading-none">Pilar 02</p>
        <h2 className="text-5xl font-light tracking-tight text-slate-800">
          Tvorba <span className="font-serif italic text-slate-400">materiálů</span>
        </h2>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="label-caps mb-6">1. Formát</h3>
            <div className="space-y-1">
              {materialOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedType(opt.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded transition-all text-left group ${
                    selectedType === opt.id 
                      ? 'bg-slate-50 text-tiande-blue' 
                      : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-800'
                  }`}
                  id={`type-${opt.id}`}
                >
                  <div className={`transition-colors ${selectedType === opt.id ? 'text-tiande-blue' : 'text-slate-300 group-hover:text-tiande-blue/50'}`}>
                    {opt.icon}
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-widest">{opt.label}</p>
                  </div>
                  {selectedType === opt.id && (
                    <motion.div layoutId="type-active" className="ml-auto w-1 h-4 bg-tiande-blue rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="label-caps mb-6">2. Kontext</h3>
            <textarea
              className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded text-sm focus:ring-1 focus:ring-tiande-blue outline-none transition-all resize-none italic"
              placeholder="O čem to má být? Např. Nová řada Master Herb, výhody pro aknózní pleť..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              id="content-context"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !context.trim()}
              className="editorial-btn w-full mt-6"
              id="content-generate"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pen className="w-4 h-4" />}
              {loading ? 'Generuji...' : 'Generovat materiál'}
            </button>
          </section>
        </div>

        <div className="lg:col-span-8">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden"
              id="content-result"
            >
              <div className="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center justify-between">
                <span className="label-caps opacity-50">Výsledek generování</span>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-tiande-blue hover:text-tiande-dark transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Uloženo' : 'Kopírovat'}
                </button>
              </div>
              <div className="p-10 max-h-[700px] overflow-y-auto markdown-body">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-slate-200 border-dashed">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                <Pen className="w-6 h-6" />
              </div>
              <p className="label-caps opacity-20 text-[10px]">Připraven k tvorbě</p>
              <p className="text-slate-400 text-sm italic mt-2">Zvolte formát a zadejte kontext pro váš příspěvek nebo leták.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
