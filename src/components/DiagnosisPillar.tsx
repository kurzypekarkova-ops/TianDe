import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Smile, 
  Droplet, 
  Heart, 
  Activity, 
  RotateCcw, 
  Check, 
  Copy, 
  Award, 
  BookOpen, 
  ChevronRight, 
  ArrowRight, 
  FileText, 
  Share2,
  ListRestart
} from 'lucide-react';
import { skinCareMaterials, ProductMaterial } from '../data/skinCareProducts';
import { hairCareMaterials } from '../data/hairCareProducts';
import { healthProductsMaterials } from '../data/healthProducts';
import { healthBodyProductsMaterials } from '../data/healthBodyProducts';
import { dentalProductsMaterials } from '../data/dentalProducts';
import { womensHealthProductsMaterials } from '../data/womensHealthProducts';

// Types for Diagnosis
type DiagnosticDomain = 'pleten' | 'vlasy' | 'zenske_zdravi' | 'zdravi_telo' | 'zuby';

interface DomainConfig {
  id: DiagnosticDomain;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorClass: string;
  bgLightClass: string;
  borderColorClass: string;
  questions: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
      desc: string;
      weights: { [productId: string]: number };
    }[];
  }[];
  fallbackProducts: string[]; // default list of IDs if everything fails
}

const DOMAINS: DomainConfig[] = [
  {
    id: 'pleten',
    title: 'Péče o pleť (Skincare)',
    subtitle: 'Analyzujte svůj typ pleti, vrásky a úroveň hydratace',
    icon: <Sparkles className="w-6 h-6 text-pink-600" />,
    colorClass: 'text-pink-600',
    bgLightClass: 'bg-pink-50/50',
    borderColorClass: 'border-pink-100',
    questions: [
      {
        id: 'skin_type',
        text: 'Jaký je váš hlavní typ a současný stav pleti?',
        options: [
          {
            id: 'dry',
            text: 'Suchá a dehydratovaná',
            desc: 'Pleť pne, objevují se šupinky a drobné suché vrásky.',
            weights: { 'snail-tonic': 3, 'corrective-serum': 2, 'snail-cream': 1 }
          },
          {
            id: 'oily',
            text: 'Mastná nebo aknózní',
            desc: 'Póry jsou rozšířené, pleť se leskne a mívá sklon k pupínkům.',
            weights: { 'snail-cream': 3, 'snail-tonic': 2, 'snail-hand-booster': 0 }
          },
          {
            id: 'mature',
            text: 'Zralá s vráskami',
            desc: 'Dochází k povadání kontur pleti, hlubší vrásky a pigmentace.',
            weights: { 'snake-factor': 3, 'corrective-serum': 2, 'snail-cream': 1 }
          },
          {
            id: 'sensitive',
            text: 'Citlivá a podrážděná',
            desc: 'Snadno zčervená, pálí nebo reaguje na kosmetické změny.',
            weights: { 'snail-cream': 3, 'snail-tonic': 2 }
          }
        ]
      },
      {
        id: 'skin_goal',
        text: 'Co od nové kosmetické péče nejvíce očekáváte?',
        options: [
          {
            id: 'lifting',
            text: 'Okamžitý lifting a zjemnění vrásek',
            desc: 'Chci oživit kolagen a zpevnit spodní čelist a dekolt.',
            weights: { 'snake-factor': 3, 'corrective-serum': 3 }
          },
          {
            id: 'hydration',
            text: 'Bleskový přísun vody (booster)',
            desc: 'Chci hluboké napití pleti, které udrží vlhkost celý den.',
            weights: { 'snail-tonic': 3, 'corrective-serum': 1 }
          },
          {
            id: 'regeneration',
            text: 'Hojení jizviček a zklidnění zánětů',
            desc: 'Hledám složky jako mucin, které zacelí jizvy a mírní akné.',
            weights: { 'snail-cream': 3, 'snail-tonic': 1 }
          }
        ]
      },
      {
        id: 'skin_texture',
        text: 'Jakou konzistenci přípravků preferujete?',
        options: [
          {
            id: 'essence',
            text: 'Lehká, gelová a tekutá séra',
            desc: 'Miluji bleskové vsáknutí bez pocitu mastnoty.',
            weights: { 'snail-tonic': 3, 'corrective-serum': 2 }
          },
          {
            id: 'cream',
            text: 'Tradiční, syté a krémové emulze',
            desc: 'Chci na kůži cítit krémovou ochranu a hluboké ošetření.',
            weights: { 'snail-cream': 3, 'snake-factor': 3 }
          }
        ]
      }
    ],
    fallbackProducts: ['snail-tonic', 'corrective-serum', 'snail-cream']
  },
  {
    id: 'vlasy',
    title: 'Péče o vlasy (Haircare)',
    subtitle: 'Zastavte vypadávání a vdechněte vlasům diamantový lesk',
    icon: <Droplet className="w-6 h-6 text-indigo-600" />,
    colorClass: 'text-indigo-600',
    bgLightClass: 'bg-indigo-50/50',
    borderColorClass: 'border-indigo-100',
    questions: [
      {
        id: 'hair_problem',
        text: 'S čím máte momentálně největší starosti?',
        options: [
          {
            id: 'loss',
            text: 'Vypadávání vlasů a slabé kořínky',
            desc: 'Vlasy řídnou, zůstávají na hřebenu a těžko rostou nové.',
            weights: { 'ginseng-multicomplex': 4 }
          },
          {
            id: 'dryness',
            text: 'Roztřepené konečky a suché, matné délky',
            desc: 'Vlasy jsou krepaté, bez lesku a lámou se.',
            weights: { 'argan-hair-fluid': 4 }
          },
          {
            id: 'scalp',
            text: 'Citlivá pokožka, lupy a svědění',
            desc: 'Hledám zklidnění vlasové pokožky a regulaci mazu.',
            weights: { 'ginseng-multicomplex': 3, 'argan-hair-fluid': 1 }
          }
        ]
      },
      {
        id: 'hair_goal',
        text: 'Jaký efekt na vlasech toužíte vidět nejdříve?',
        options: [
          {
            id: 'density',
            text: 'Probuzení spící cibulky a růst nových vlasů',
            desc: 'Zahuštění vlasového porostu a aktivace folikulů.',
            weights: { 'ginseng-multicomplex': 4 }
          },
          {
            id: 'shine',
            text: 'Krásné, hebké vlasy, které jdou snadno rozčesat',
            desc: 'Efekt jako ze salonu, vyhlazení poškozeného vlasu.',
            weights: { 'argan-hair-fluid': 4 }
          }
        ]
      }
    ],
    fallbackProducts: ['ginseng-multicomplex', 'argan-hair-fluid']
  },
  {
    id: 'zenske_zdravi',
    title: 'Ženské zdraví (Bylinná fytoterapie)',
    subtitle: 'Nativní podpora hormonální rovnováhy a zdraví močových cest',
    icon: <Heart className="w-6 h-6 text-rose-600" />,
    colorClass: 'text-rose-600',
    bgLightClass: 'bg-rose-50/50',
    borderColorClass: 'border-rose-100',
    questions: [
      {
        id: 'womens_focus',
        text: 'Kterou oblast ženského zdraví si přejete zharmonizovat?',
        options: [
          {
            id: 'menstruation',
            text: 'Bolestivá, nepravidelná menstruace a PMS',
            desc: 'Hledám zmírnění děložních křečí a emoční stabilitu.',
            weights: { 'nefritova-svezest-denni': 4, 'nefritova-svezest-nocni': 2 }
          },
          {
            id: 'intimate_hygiene',
            text: 'Prevence zánětů, mykóz a výtoků',
            desc: 'Toužím po spolehlivém celodenním komfortu bez chemických gelů.',
            weights: { 'nefritova-svezest-slipova': 4, 'nefritova-svezest-denni': 1 }
          },
          {
            id: 'night_safety',
            text: 'Klidný spánek a absolutní ochrana bez protečení',
            desc: 'Hledám extra savý fytokompres speciálně pro silnou noc.',
            weights: { 'nefritova-svezest-nocni': 4 }
          }
        ]
      }
    ],
    fallbackProducts: ['nefritova-svezest-denni', 'nefritova-svezest-nocni', 'nefritova-svezest-slipova']
  },
  {
    id: 'zdravi_telo',
    title: 'Zdraví a tělo',
    subtitle: 'Pohyb bez bolesti, detoxikace lymfy a vitalizace celého těla',
    icon: <Activity className="w-6 h-6 text-emerald-600" />,
    colorClass: 'text-emerald-600',
    bgLightClass: 'bg-emerald-50/50',
    borderColorClass: 'border-emerald-100',
    questions: [
      {
        id: 'body_need',
        text: 'Co trápí vaše tělo nebo kde pociťujete oslabení?',
        options: [
          {
            id: 'joints',
            text: 'Bolest kloubů, zad, ztuhlost pohybového aparátu',
            desc: 'Chci obnovit pružnost chrupavek a šlach pro snadný pohyb.',
            weights: { 'active-life-collagen': 4 }
          },
          {
            id: 'skin_body',
            text: 'Celulitida, povadlá kůže na stehnech a zádová drsnost',
            desc: 'Potřebuji hluboký tělový peeling a rozproudění mikrocirkulace.',
            weights: { 'japonsky-rucnik': 4 }
          },
          {
            id: 'fatigue',
            text: 'Únava, stárnutí organismu a oslabená imunita',
            desc: 'Hledám nasycení bílkovinami mládí a prebiotickou detoxikaci.',
            weights: { 'active-life-collagen': 3, 'japonsky-rucnik': 1 }
          }
        ]
      }
    ],
    fallbackProducts: ['active-life-collagen', 'japonsky-rucnik']
  },
  {
    id: 'zuby',
    title: 'Zuby a dásně',
    subtitle: 'Bezpečné fytopasty bez fluoru pro zdravé dásně a silnou sklovinu',
    icon: <Smile className="w-6 h-6 text-sky-600" />,
    colorClass: 'text-sky-600',
    bgLightClass: 'bg-sky-50/50',
    borderColorClass: 'border-sky-100',
    questions: [
      {
        id: 'dental_problem',
        text: 'Jaký je stav vaší ústní dutiny?',
        options: [
          {
            id: 'bleeding',
            text: 'Citlivé dásně s náchylností ke krvácení',
            desc: 'Hledám sílu ženšenu pro rychlé zpevnění dásňových kapes.',
            weights: { 'sanchi-ginseng': 4 }
          },
          {
            id: 'preventive',
            text: 'Touha po ochraně bez chemického fluoru',
            desc: 'Chci sílu zeleného čaje k šetrné likvidaci zubního plaku.',
            weights: { 'sanchi-ginseng': 4 }
          }
        ]
      }
    ],
    fallbackProducts: ['sanchi-ginseng']
  }
];

export const DiagnosisPillar: React.FC = () => {
  // Navigation states
  const [activeDomain, setActiveDomain] = useState<DomainConfig | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [clientName, setClientName] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'quiz' | 'recipes'>('quiz');

  // Copy states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedRecipe, setCopiedRecipe] = useState(false);

  // Modal view for complete product information
  const [selectedProductDetails, setSelectedProductDetails] = useState<ProductMaterial | null>(null);

  // All materials mapped by their IDs for lookup
  const allProductsMap: { [id: string]: ProductMaterial } = {};
  [
    ...skinCareMaterials,
    ...hairCareMaterials,
    ...healthProductsMaterials,
    ...healthBodyProductsMaterials,
    ...dentalProductsMaterials,
    ...womensHealthProductsMaterials
  ].forEach(p => {
    allProductsMap[p.id] = p;
  });

  const handleDomainSelect = (domain: DomainConfig) => {
    setActiveDomain(domain);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    if (activeDomain) {
      if (currentQuestionIndex < activeDomain.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleReset = () => {
    setActiveDomain(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  // Logic to calculate recommendations based on score weights
  const getRecommendedProducts = (): { product: ProductMaterial; score: number; why: string }[] => {
    if (!activeDomain) return [];

    const scores: { [id: string]: number } = {};
    activeDomain.questions.forEach(q => {
      const selectedOptionId = answers[q.id];
      if (selectedOptionId) {
        const option = q.options.find(opt => opt.id === selectedOptionId);
        if (option && option.weights) {
          Object.entries(option.weights).forEach(([prodId, weight]) => {
            scores[prodId] = (scores[prodId] || 0) + weight;
          });
        }
      }
    });

    // Extract sorted products
    const recommendations = Object.entries(scores)
      .map(([id, score]) => {
        const product = allProductsMap[id];
        return { id, score, product };
      })
      .filter(item => item.product !== undefined)
      .sort((a, b) => b.score - a.score);

    // If empty, fallback
    if (recommendations.length === 0) {
      activeDomain.fallbackProducts.forEach(id => {
        const product = allProductsMap[id];
        if (product) {
          recommendations.push({ id, score: 1, product });
        }
      });
    }

    // Build personalized explanations ("proč vám doporučujeme")
    return recommendations.slice(0, 3).map(rec => {
      let why = 'Ideální volba sestavená na základě analýzy vašich hlavních cílů a preferovaných vlastností produktů.';
      
      // Customize based on answers
      if (activeDomain.id === 'pleten') {
        if (answers['skin_type'] === 'dry' && rec.id === 'snail-tonic') {
          why = 'Prémiový booster s hlemýždím mucinem bleskově navrátí hydrataci suché, dehydrované pleti a pne ji ihned po umytí.';
        } else if (answers['skin_type'] === 'dry' && rec.id === 'corrective-serum') {
          why = 'Obsahuje čisté tekuté hedvábí a ceramidy k uzamčení nezbytné vlhkosti a hluboké obnově lipidového pláště suché pleti.';
        } else if (answers['skin_type'] === 'oily' && rec.id === 'snail-cream') {
          why = 'Tlumí záněty, čistí a léčí akné. Mucin hlemýžďů navíc sjednotí barevný tón a zjemní rozšířené póry.';
        } else if (answers['skin_type'] === 'mature' && rec.id === 'snake-factor') {
          why = 'Funguje na principu super rychlé regenerace divokého hada Mamushi. Korektivní retinol srovná hluboké vrásky.';
        } else if (answers['skin_goal'] === 'lifting' && rec.id === 'corrective-serum') {
          why = 'Obsahuje extrémně koncentrovanou porci biologických látek, která okamžitě zpevní celou strukturu oválu obličeje.';
        }
      } else if (activeDomain.id === 'vlasy') {
        if (rec.id === 'ginseng-multicomplex') {
          why = 'Zastavuje vypadávání a stimuluje růst nových vlasů prokrvením pokožky hlavy až o 90 % díky legende o tříletém ženšenu.';
        } else if (rec.id === 'argan-hair-fluid') {
          why = 'Dokonale zacelí třepící se, krepaté a zničené konečky arganovým olejem a hloubkovým lipidovým komplexem.';
        }
      } else if (activeDomain.id === 'zenske_zdravi') {
        if (answers['womens_focus'] === 'menstruation' && rec.id === 'nefritova-svezest-denni') {
          why = 'Patentovaný bylinný fytopolštářek z čínských bylin tlumí menstruační křeče, zklidňuje pH a upravuje cyklus.';
        } else if (rec.id === 'nefritova-svezest-nocni') {
          why = 'Speciálně prodloužený 6vrstvý bylinný obklad s 10 ochrannými bariérami garantuje bezstarostný spánek během vašich dnů.';
        } else if (rec.id === 'nefritova-svezest-slipova') {
          why = 'Funguje po celých 24 hodin jako suchý fytoobklad pro potlačení kvasinek, mírnění zánětů a absolutní denní svěžest.';
        }
      } else if (activeDomain.id === 'zdravi_telo') {
        if (rec.id === 'active-life-collagen') {
          why = 'Vstřebatelný hydrolyzovaný kolagen s přírodním vitamínem C z višní chrání klouby, šlachy a sjednocuje turgor těla zevnitř.';
        } else if (rec.id === 'japonsky-rucnik') {
          why = 'Synteticky tkaná žínka nabízí hlubokým lymphodrenážním peelingem bleskové rozbití pomerančové kůže a odstranění otoků.';
        }
      } else if (activeDomain.id === 'zuby') {
        if (rec.id === 'sanchi-ginseng') {
          why = 'Přírodní pasta bez fluoru chránící před zubním kamenem a plakem. Ženšen Sanchi hojí a zpevňuje citlivé, krvácející dásně.';
        }
      }

      return {
        product: rec.product,
        score: rec.score,
        why
      };
    });
  };

  const recommendedList = getRecommendedProducts();

  // Function to build the complete, structured recommendation output text
  const generateFytoreceptText = (name: string): string => {
    const formattedName = name.trim() || 'Zákazník';
    const domainName = activeDomain ? activeDomain.title : '';
    
    let text = `🌸 FYTORECEPT NA MÍRU (osobní seznam doporučených bylinných fytoproduktů tianDe) OD TOP LÍDRY IVANY NOHOVOVÉ 🌸\n`;
    text += `==================================================\n`;
    text += `Pro: ${formattedName}\n`;
    text += `Kategorie analýzy: ${domainName}\n`;
    text += `Datum: ${new Date().toLocaleDateString('cs-CZ')}\n\n`;
    
    text += `Stručné vyhodnocení z diagnostiky:\n`;
    if (activeDomain) {
      activeDomain.questions.forEach(q => {
        const selId = answers[q.id];
        const opt = q.options.find(o => o.id === selId);
        if (opt) {
          text += `- ${q.text} -> ${opt.text}\n`;
        }
      });
    }
    
    text += `\nDoporučené fytoterapeutické produkty TianDe:\n`;
    recommendedList.forEach((rec, index) => {
      text += `\n${index + 1}. ${rec.product.name}\n`;
      text += `   📦 Kód: ${rec.product.code}\n`;
      text += `   💡 Proč doporučujeme: ${rec.why}\n`;
      text += `   📝 Stručný popis: ${rec.product.shortDesc}\n`;
    });
    
    text += `\n==================================================\n`;
    text += `📢 TIP OD LÍDRA:\n`;
    text += `Chcete tyto produkty vyzkoušet s okamžitou VIP zákaznickou slevou 35 %?\n`;
    text += `Napište mi do zpráv a já vám založím bezplatnou VIP slevovou kartičku a provedu vás prvním nákupem!\n`;
    text += `Krásný den plný energie přeje Ivana Nohovová!\n`;
    
    return text;
  };

  const handleCopyFytorecept = () => {
    const text = generateFytoreceptText(clientName);
    navigator.clipboard.writeText(text);
    setCopiedRecipe(true);
    setTimeout(() => setCopiedRecipe(false), 2000);

    // Save recipe to list
    const newRecipe = {
      id: Date.now().toString(),
      clientName: clientName.trim() || 'Zákazník',
      domain: activeDomain?.title || 'Obecná',
      date: new Date().toLocaleDateString('cs-CZ'),
      text: text,
      products: recommendedList.map(r => r.product.name)
    };
    setSavedRecipes([newRecipe, ...savedRecipes]);
  };

  const handleCopyProductPost = (post: string, id: string) => {
    navigator.clipboard.writeText(post);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cleanMarkdownHtml = (markdown: string): string => {
    if (!markdown) return '';
    // Let's use similar cleaning logic from ProductsPillar
    const lines = markdown.split('\n');
    const processedLines = lines.map(line => {
      let trimmed = line.trim();
      if (!trimmed) return '';

      if (trimmed.startsWith('###') || trimmed.startsWith('####')) {
        const text = trimmed.replace(/^(#{3,4})\s*/, '').trim();
        return `<h4 class="text-sm font-bold text-slate-800 uppercase tracking-wider mt-4 mb-2">${text}</h4>`;
      }
      
      trimmed = trimmed.replace(/^[•\-\*✔]\s*/, '').trim();
      trimmed = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      trimmed = trimmed.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return `<p class="my-2 text-slate-600 leading-relaxed text-sm">${trimmed}</p>`;
    });
    return processedLines.join('\n');
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="label-caps opacity-50 tracking-[0.3em] mb-4">MLM Proklientský Nástroj</p>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            Produktová <span className="serif-italic text-slate-400">Mini-Diagnostika</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl">
            Interaktivní asistent pro rychlé doporučení TianDe produktů. Proveďte klienta jednoduchým kvízem, navrhněte mu recept na míru a získejte hotové příspěvky pro sociální sítě.
          </p>
        </div>

        {/* Tab switcher for Saved Recipes */}
        <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'quiz' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Kvíz a Diagnostika
          </button>
          <button 
            onClick={() => setActiveTab('recipes')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === 'recipes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Uložené Recepty
            {savedRecipes.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black animate-pulse">
                {savedRecipes.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {activeTab === 'quiz' && (
        <div className="mb-8 max-w-3xl mx-auto select-none">
          <div className="flex items-center justify-between relative">
            {/* Background progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200/60 -translate-y-1/2 z-0 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-pink-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
              style={{ 
                width: showResults ? '100%' : (activeDomain ? '50%' : '0%')
              }} 
            />
            
            {[
              { step: 1, label: 'Výběr oblasti', desc: 'Vyberte test' },
              { step: 2, label: 'Bleskový kvíz', desc: 'Odpovězte na dotazy' },
              { step: 3, label: 'Fytorecept', desc: 'Doporučený plán' }
            ].map((s) => {
              const isCompleted = (s.step === 1 && (activeDomain || showResults)) || (s.step === 2 && showResults);
              const isActive = (s.step === 1 && !activeDomain) || (s.step === 2 && activeDomain && !showResults) || (s.step === 3 && showResults);
              
              return (
                <div key={s.step} className="flex flex-col items-center z-10 relative bg-slate-50/90 px-3 py-1 rounded-xl transition-all">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-100' 
                        : isActive 
                          ? 'bg-white border-pink-500 text-pink-600 shadow-sm font-extrabold ring-4 ring-pink-500/10' 
                          : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {s.step}
                  </div>
                  <span className={`text-[10px] font-black uppercase mt-1.5 tracking-wider ${isActive ? 'text-pink-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 hidden sm:inline tracking-normal">
                    {s.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'recipes' ? (
        // Saved Recipes List View
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider">Historie sestavených receptů</h3>
          </div>

          {savedRecipes.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
              <p className="text-slate-400 text-sm">Zatím jste nevytvořili žádný fytorecept (bylinný recept doporučených fytoproduktů na míru).</p>
              <button 
                onClick={() => setActiveTab('quiz')}
                className="mt-4 px-4 py-2 bg-tiande-blue text-white rounded text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity"
              >
                Spustit první kvíz
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedRecipes.map((r) => (
                <div key={r.id} className="border border-slate-100 rounded-lg p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Pro: {r.clientName}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{r.domain} • {r.date}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(r.text);
                        setCopiedId(r.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded hover:border-slate-300 text-xs font-bold text-slate-600 shadow-sm transition-all"
                    >
                      {copiedId === r.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-green-600">Zkopírováno!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Zkopírovat recept</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">Doporučené produkty:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.products.map((p: string, i: number) => (
                        <span key={i} className="text-[10px] uppercase font-bold text-tiande-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <details className="group">
                    <summary className="text-[11px] font-bold text-slate-500 hover:text-slate-700 cursor-pointer list-none flex items-center gap-1">
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-open:rotate-90" />
                      <span>Zobrazit celou textovou šablonu</span>
                    </summary>
                    <pre className="mt-3 p-4 bg-white border border-slate-200 rounded text-[11px] text-slate-600 font-mono overflow-x-auto leading-relaxed max-h-80 overflow-y-auto">
                      {r.text}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ) : !activeDomain ? (
        // ----------------- STEP 1: Select Diagnostic Domain -----------------
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 lg:p-12 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-10">
              <Sparkles className="w-64 h-64 text-white" />
            </div>
            <div className="max-w-xl">
              <span className="bg-blue-600/30 border border-blue-500/20 text-blue-300 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6 inline-block">
                Klientská Péče na míru
              </span>
              <h3 className="text-3xl lg:text-4xl font-extralight tracking-tight mt-2 mb-4 leading-snug">
                Vyberte oblast pro <span className="serif-italic text-blue-300">cílenou diagnostiku</span>
              </h3>
              <p className="text-slate-300 text-xs lg:text-sm leading-relaxed mb-6">
                Chcete-li klientovi navrhnout přesný fytorecept (osobní bylinný recept doporučených produktů na základě analýzy potřeb) tianDe, vyberte jednu ze specializovaných sekcí. Kvíz má jen 1 až 3 intuitivní otázky, se kterými ihned odhalíte pravou příčinu potíží pleti, dásní, vlasů či kloubů.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-auto">
                  <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-1.5">Jméno zákazníka (volitelné):</label>
                  <input 
                    type="text" 
                    placeholder="Např. paní Jana"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white text-xs px-4 py-2.5 rounded-lg w-full sm:w-64 outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain) => (
              <motion.button
                whileHover={{ y: -3 }}
                key={domain.id}
                onClick={() => handleDomainSelect(domain)}
                className="bg-white border border-slate-200 p-6 rounded-xl text-left shadow-sm hover:shadow-lg transition-all group hover:border-slate-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${domain.bgLightClass} border ${domain.borderColorClass}`}>
                    {domain.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
                  </div>
                </div>
                <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-1">
                  {domain.title}
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  {domain.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <span>Spustit test</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : !showResults ? (
        // ----------------- STEP 2: Running the Quiz -----------------
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-10 shadow-sm max-w-2xl mx-auto"
        >
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Sekce: {activeDomain.title}</span>
              <span>Otázka {currentQuestionIndex + 1} z {activeDomain.questions.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-tiande-blue h-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / activeDomain.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl lg:text-2xl font-light tracking-tight text-slate-800 mb-6">
                {activeDomain.questions[currentQuestionIndex].text}
              </h3>

              <div className="space-y-3">
                {activeDomain.questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(activeDomain.questions[currentQuestionIndex].id, option.id)}
                    className="w-full border border-slate-200 hover:border-tiande-blue bg-white/50 hover:bg-slate-50/50 p-4 rounded-xl text-left transition-all hover:scale-[1.005] group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-slate-800 group-hover:text-tiande-blue transition-colors">
                          {option.text}
                        </p>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          {option.desc}
                        </p>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-tiande-blue/50">
                        <div className="w-2 h-2 rounded-full bg-tiande-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 hover:text-slate-800 transition-colors uppercase tracking-wider"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Zpět na výběr</span>
            </button>
            <span>Ivana Nohovová • TianDe Fytorecept (bylinná doporučení na míru)</span>
          </div>
        </motion.div>
      ) : (
        // ----------------- STEP 3: Results & Customized Recipe -----------------
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Result Prescription Hero */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-pink-100 text-pink-700 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  Analýza hotova
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Diagnostika: {activeDomain.title}</p>
              </div>
              <h3 className="text-2xl font-light tracking-tight text-slate-800">
                Připraveno pro: <span className="serif-italic text-pink-500 font-normal">{clientName.trim() || 'Zákazníka'}</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1 max-w-xl">
                Sestavili jsme personalizovaný bylinný recept doporučených fytoterapeutických produktů tianDe. Níže naleznete přesné vysvětlení volby, sítě pro kopírování i hotový report, který můžete rovnou odeslat zákazníkovi!
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={handleCopyFytorecept}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 border border-slate-900 hover:opacity-95 text-white rounded text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                {copiedRecipe ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-white">Zkopírováno!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Zkopírovat report pro klienta</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded text-slate-500 hover:text-slate-700 transition-colors"
                title="Spustit znovu"
              >
                <ListRestart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left box: Prescribed products with customized "Why" and details */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="label-caps !text-slate-800">Doporučené Fyto-Přípravky (nejvyšší skóre)</h3>
              
              <div className="space-y-4">
                {recommendedList.map((rec, index) => (
                  <div key={rec.product.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6 hover:border-slate-300 transition-all">
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                            {index + 1}
                          </span>
                          <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider">{rec.product.name}</h4>
                        </div>
                        <p className="text-[11px] font-bold text-tiande-blue uppercase tracking-widest mt-1.5 ml-9">
                          Kód: {rec.product.code}
                        </p>
                      </div>

                      <div className="bg-slate-50/50 border border-slate-100 rounded p-4 ml-9 space-y-2">
                        <div className="flex items-center gap-1 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                          <Award className="w-3.5 h-3.5 text-pink-500" />
                          <span>Proč doporučujeme na míru:</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {rec.why}
                        </p>
                      </div>

                      <p className="text-xs text-slate-400 font-medium ml-9 leading-relaxed">
                        <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Stručný popis přípravku:</span>
                        {rec.product.shortDesc}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2 ml-9">
                        <button 
                          onClick={() => setSelectedProductDetails(rec.product)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Přečíst edukační kartu</span>
                        </button>
                        <button 
                          onClick={() => handleCopyProductPost(rec.product.copyablePost, rec.product.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-[11px] font-bold uppercase tracking-wider transition-all ${
                            copiedId === rec.product.id 
                            ? 'bg-green-50 border-green-200 text-green-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/55'
                          }`}
                        >
                          {copiedId === rec.product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Hotovo (Zkopírováno vč. tagů)</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Zkopírovat hotový post</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side box: Live Text Report for easy copy/paste */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="label-caps !text-slate-800">Náhled Fytoreceptu (seznam doporučených bylinných fytoproduktů)</h3>
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-xl font-mono relative">
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={handleCopyFytorecept}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                    title="Zkopírovat celoslitový text"
                  >
                    {copiedRecipe ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                <pre className="text-[10px] leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-[420px] overflow-y-auto pr-2 font-mono scrollbar-thin scrollbar-thumb-white/10">
                  {generateFytoreceptText(clientName)}
                </pre>
              </div>
              
              <div className="bg-pink-50/50 border border-pink-100/80 p-5 rounded-lg flex gap-3">
                <Heart className="w-5 h-5 text-pink-600 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-pink-900">Uloženo do paměti aplikace!</h4>
                  <p className="text-[11px] text-pink-700 leading-relaxed font-medium">
                    Tento report je nyní uložen v záložce "Uložené Recepty" nahoře. Můžete se k němu kdykoliv v průběhu dne vrátit, opětovně ho zkopírovat nebo editovat jméno.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Slide-over/Popup Modal for detailed product education card */}
      <AnimatePresence>
        {selectedProductDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductDetails(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Edukační karta tianDe</span>
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mt-0.5">{selectedProductDetails.name}</h4>
                </div>
                <button 
                  onClick={() => setSelectedProductDetails(null)}
                  className="w-8 h-8 rounded-full hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs uppercase font-black tracking-wider text-tiande-blue mb-1">Kód / Balení:</p>
                  <p className="text-xs text-slate-700 font-bold">{selectedProductDetails.code}</p>
                </div>

                <div>
                  <p className="text-xs uppercase font-black tracking-wider text-slate-400 mb-1">Krátká specifikace:</p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedProductDetails.shortDesc}</p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs uppercase font-black tracking-wider text-slate-400 mb-2">Hluboký přehled:</p>
                  <div 
                    className="space-y-4"
                    dangerouslySetInnerHTML={{ __html: cleanMarkdownHtml(selectedProductDetails.markdownContent) }}
                  />
                </div>

                {selectedProductDetails.expertTip && (
                  <div className="bg-blue-50/50 border border-blue-100/80 rounded-lg p-5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-tiande-blue mb-1">Expert tip od Ivany Nohovové:</p>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{selectedProductDetails.expertTip}</p>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-end">
                <button 
                  onClick={() => setSelectedProductDetails(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Zavřít
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
