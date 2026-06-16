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
  ListRestart,
  User,
  Clock,
  ClipboardList
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
  symptoms: string[];
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
    symptoms: ['Suchost & pnutí', 'Vrásky & ochabování', 'Akné & černé tečky', 'Citlivá pleť'],
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
    symptoms: ['Padání vlasů', 'Lupy & svědění pokožky', 'Suché & matné délky', 'Třepení konečků'],
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
    symptoms: ['Nepravidelná menstruace', 'Mykózy, kvasinky & výtoky', 'Hormonální nerovnováha', 'Prevence & svěžest'],
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
    symptoms: ['Bolesti kloubů & zad', 'Celulitida & otoky', 'Detoxikace organismu', 'Chronická únava'],
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
    symptoms: ['Krvácející dásně', 'Zápach z úst', 'Zubní plak & kámen', 'Citlivá sklovina'],
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
  const [resultSubTab, setResultSubTab] = useState<'products' | 'report'>('products');

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
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50/40 via-blue-50/20 to-pink-50/20 border border-slate-200/80 p-6 lg:p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex-1 space-y-1">
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Fytoterapeutický asistent tianDe
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-800 mt-2">
                Inteligentní klientská diagnostika
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xl">
                Vyberte specializovanou sekci podle potíží vašeho zákazníka. Během několika kliknutí odhalíte příčiny a vytvoříte cílenou bylinnou kúru s hotovou zprávou k okamžitému odeslání.
              </p>
            </div>

            <div className="w-full md:w-auto p-5 bg-white border border-slate-200/60 rounded-xl shadow-sm shrink-0 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">1. Jméno zákazníka (volitelné):</label>
                <input 
                  type="text" 
                  placeholder="např. paní Alena"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3 py-2 rounded-md w-[180px] outline-none focus:border-emerald-500/50 focus:bg-white transition-all font-semibold"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-emerald-500" />
              <span>2. Vyberte oblast podle příznaků klienta:</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOMAINS.map((domain) => (
                <motion.button
                  whileHover={{ y: -3 }}
                  key={domain.id}
                  onClick={() => handleDomainSelect(domain)}
                  className="bg-white border border-slate-200/85 p-6 rounded-2xl text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all group hover:border-slate-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${domain.bgLightClass} border ${domain.borderColorClass}`}>
                        {domain.icon}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-slate-600">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    <h4 className="font-bold text-[13px] text-slate-800 uppercase tracking-wider mb-1">
                      {domain.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      {domain.subtitle}
                    </p>
                  </div>

                  <div>
                    {/* Highlight symptoms list for instant guidance */}
                    <div className="mt-4 pt-3 border-t border-slate-100/80">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Časté potíže sekce:</p>
                      <div className="flex flex-wrap gap-1">
                        {domain.symptoms.map((symptom, i) => (
                          <span 
                            key={i} 
                            className="text-[9px] font-semibold text-slate-600 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black uppercase text-tiande-blue tracking-wider group-hover:text-blue-700 transition-colors">
                      <span>Spustit diagnostiku</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ) : !showResults ? (
        // ----------------- STEP 2: Running the Quiz -----------------
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 lg:p-10 shadow-sm max-w-2xl mx-auto"
        >
          {/* Active Context Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full ${activeDomain.colorClass.replace('text-', 'bg-')}`} />
              <span className="uppercase tracking-wider text-[11px] text-slate-500">{activeDomain.title}</span>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-800 text-[10px] font-bold">
              <User className="w-3 h-3 text-emerald-600" />
              <span>Profil: {clientName.trim() || 'Nový zákazník'}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Otázka {currentQuestionIndex + 1} z {activeDomain.questions.length}</span>
              <span>{Math.round(((currentQuestionIndex) / activeDomain.questions.length) * 100)}% splněno</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300" 
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
              transition={{ duration: 0.15 }}
            >
              <h3 className="text-lg lg:text-xl font-bold tracking-tight text-slate-800 mb-6 leading-snug">
                {activeDomain.questions[currentQuestionIndex].text}
              </h3>

              <div className="space-y-3">
                {activeDomain.questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(activeDomain.questions[currentQuestionIndex].id, option.id)}
                    className="w-full border border-slate-200/90 hover:border-emerald-500/80 bg-white hover:bg-emerald-50/5 p-4 rounded-xl text-left transition-all hover:scale-[1.005] group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="pr-4">
                        <p className="font-bold text-xs uppercase tracking-wider text-slate-800 group-hover:text-emerald-700 transition-colors">
                          {option.text}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">
                          {option.desc}
                        </p>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-emerald-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <RotateCcw className="w-4 h-4 text-emerald-500" />
              <span>Zpět na výběr sekce</span>
            </button>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-300">tianDe Fytodiagnostika</span>
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
          <div className="bg-gradient-to-r from-emerald-50/30 via-slate-50 to-pink-50/10 border border-slate-200 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  Analýza dokončena
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Metoda: {activeDomain.title}</p>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-800">
                Fytorecept pro: <span className="serif-italic text-emerald-600 font-normal">{clientName.trim() || 'Váženého zákazníka'}</span>
              </h3>
              <p className="text-slate-500 text-xs mt-1 max-w-xl">
                Na základě zadaných indicií jsme sestavili optimální bylinnou kúru tianDe. Níže naleznete detailní přehled produktů a předpřipravenou osobní zprávu pro klienta.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={handleCopyFytorecept}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 border border-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                {copiedRecipe ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-100 animate-bounce" />
                    <span>Zkopírováno!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Zkopírovat celou zprávu</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0"
                title="Sestavit novou diagnostiku"
              >
                <ListRestart className="w-4 h-4" />
                <span className="hidden sm:inline">Nová analýza</span>
              </button>
            </div>
          </div>

          {/* Clean Sub-navigation inside Results to eliminate visually cluttered split columns */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setResultSubTab('products')}
              className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-bold text-xs uppercase tracking-wider transition-all -mb-px ${
                resultSubTab === 'products'
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/10'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>🌿 1. Doporučená fytokúra ({recommendedList.length} přípravky)</span>
            </button>
            <button
              onClick={() => setResultSubTab('report')}
              className={`flex items-center gap-2 px-6 py-3.5 border-b-2 font-bold text-xs uppercase tracking-wider transition-all -mb-px relative ${
                resultSubTab === 'report'
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/10'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>💬 2. Hotová zpráva pro klienta</span>
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            {resultSubTab === 'products' ? (
              // SUB-TAB A: PRODUCT SHEETS
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                    Složení doporučené bylinné kúry na míru
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">Klikněte na detaily pro hlubší edukační kartu</span>
                </div>

                <div className="space-y-4">
                  {recommendedList.map((rec, index) => (
                    <div key={rec.product.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col md:flex-row items-stretch justify-between gap-6 hover:border-slate-300 transition-all">
                      <div className="flex-1 space-y-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">
                              {index + 1}
                            </span>
                            <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">{rec.product.name}</h4>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2 ml-9">
                            <span className="text-[9px] font-bold text-tiande-blue bg-blue-50/50 border border-blue-100/60 px-2 py-0.5 rounded">
                              Kód: {rec.product.code}
                            </span>
                            <span className="text-slate-200 text-xs">|</span>
                            <span className="text-[10px] text-slate-400 font-medium font-mono">Expert doporučení</span>
                          </div>
                        </div>

                        {/* Why we recommend badge */}
                        <div className="bg-gradient-to-br from-emerald-50/20 to-slate-50/50 border border-emerald-100/40 rounded-xl p-4 ml-0 md:ml-9 space-y-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black text-emerald-800 tracking-wider">
                            <Award className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                            <span>Proč doporučujeme na míru:</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {rec.why}
                          </p>
                        </div>

                        <div className="text-xs text-slate-500 font-medium ml-0 md:ml-9 leading-relaxed bg-slate-50/20 p-3 rounded-lg border border-slate-100">
                          <span className="font-black text-[9px] text-slate-400 uppercase tracking-wider block mb-1">Popis přípravku:</span>
                          {rec.product.shortDesc}
                        </div>
                      </div>

                      <div className="md:w-[220px] shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col justify-center gap-2 items-stretch">
                        <button 
                          onClick={() => setSelectedProductDetails(rec.product)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <span>Otevřít detaily</span>
                        </button>
                        <button 
                          onClick={() => handleCopyProductPost(rec.product.copyablePost, rec.product.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                            copiedId === rec.product.id 
                            ? 'bg-green-50 border-green-200 text-green-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/55'
                          }`}
                        >
                          {copiedId === rec.product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-600" />
                              <span>Zkopírováno!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Okopírovat pro sítě</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // SUB-TAB B: CLIENT PERSONAL REPORT (THE LETTER PRESCRIPTION VIEW)
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                      Osobní report k odeslání do chatu
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Tento text je naformátovaný tak, abyste jej mohli rovnou zkopírovat na WhatsApp, Messenger nebo SMS.</p>
                  </div>
                  
                  <button 
                    onClick={handleCopyFytorecept}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-colors whitespace-nowrap"
                  >
                    {copiedRecipe ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-100" />
                        <span>Text zkopírován!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Kopírovat celý text fytoreceptu</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-amber-50/20 border border-amber-100/70 rounded-2xl p-6 lg:p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.015)] relative">
                  <div className="absolute top-4 right-4 text-[10px] text-amber-500 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded border border-amber-100">
                    Náhled zprávy
                  </div>
                  
                  <div className="max-h-[460px] overflow-y-auto pr-2 font-mono text-[11.5px] leading-relaxed text-slate-700 whitespace-pre-wrap bg-white rounded-xl border border-slate-100 p-5 shadow-sm scrollbar-thin">
                    {generateFytoreceptText(clientName)}
                  </div>
                </div>

                {/* Local Storage Auto-saved card notification */}
                <div className="bg-pink-50/30 border border-pink-100/60 p-5 rounded-2xl flex gap-3.5">
                  <Heart className="w-5 h-5 text-pink-500 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-pink-900">Uloženo do paměti aplikace!</h4>
                    <p className="text-[11px] text-pink-700/90 leading-relaxed font-semibold">
                      Tento fytorecept byl automaticky zaznamenán do místního úložiště. Kdykoliv se k němu vrátíte nahoře v sekci <span className="underline cursor-pointer font-bold" onClick={() => setActiveTab('recipes')}>"Uložené Recepty"</span> pro opětovné zkopírování či kontrolu.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
