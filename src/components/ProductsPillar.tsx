import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Sparkles, 
  Droplet, 
  HelpCircle, 
  Copy, 
  Check, 
  Gift,
  Scissors,
  Activity,
  Smile,
  Heart
} from 'lucide-react';
import { skinCareMaterials, ProductMaterial } from '../data/skinCareProducts';
import { hairCareMaterials } from '../data/hairCareProducts';
import { healthProductsMaterials } from '../data/healthProducts';
import { healthBodyProductsMaterials } from '../data/healthBodyProducts';
import { dentalProductsMaterials } from '../data/dentalProducts';
import { womensHealthProductsMaterials } from '../data/womensHealthProducts';

const householdMaterials: ProductMaterial[] = [
  {
    id: "dish-soap",
    name: "Mycí prostředek na nádobí na bázi mýdlových ořechů",
    code: "14708 (500 ml)",
    shortDesc: "Přírodní, 100% biologicky rozložitelný saponát na mýdlových oříšcích.",
    markdownContent: `### Přírodní síla mýdlových ořechů pro čistý domov

Tento koncentrovaný přípravek je vytvořen na bázi **saponinů** – přírodních pěnidel obsažených ve skořápkách mýdlových ořechů. Je navržen pro maximálně bezpečné, ekologické a šetrné čištění nádobí, hraček i potravin.

#### 💡 Hlavní přínosy a výhody:
- **Zcela smývatelný:** Nezanechává na nádobí žádný chemický film, který byste následně konzumovali s jídlem.
- **Bezpečný pro celou rodinu:** Ideální na mytí kojeneckých lahví, dětského nádobí i hraček.
- **Vhodný na potraviny:** Můžete s ním bez obav omýt ovoce a zeleninu pro odstranění vosků, pesticidů a nečistot.
- **Šetrný k pokožce:** Nedráždí a nevysušuje ruce. Při mytí nepotřebujete ochranné gumové rukavice! Měsíček a citronová silice navíc pokožku regenerují.
- **100% ekologický:** Ve volné přírodě se zcela rozloží, nezatěžuje spodní vody a je vhodný pro septiky i čističky.

#### 🧪 Složení a účinné látky:
- **Extrakt z mýdlových ořechů:** Přirozený saponin, který účinně rozpouští mastnotu a odstraňuje špínu.
- **Esenciální olej z citronu:** Dodává svěžest, působí antisepticky a zesiluje odmašťovací účinek.
- **Obsahuje kokosový glukosid:** Jemný tenzid rostlinného původu zvyšující stabilitu pěny.

#### 📝 Návod k použití:
1. **Přímé mytí:** Naneste 1–2 kapky prostředku přímo na vlhkou houbičku, umyjte nádobí a opláchněte tekoucí vodou.
2. **Koupel (ekonomická varianta):** Rozpusťte 1 čajovou lžičku prostředku v 5 litrech teplé vody, umyjte v ní nádobí (nebo ovoce) a následně opláchněte čistou vodou.
`,
    copyablePost: `🌿 Hledáte maximálně bezpečný prostředek na nádobí? 🌿

Věděli jste, že běžné saponáty zanechávají na nádobí mikrofilm, který pak denně sníme se svým jídlem? S TianDe se toho bát nemusíte! 😍

Máme pro vás Mycí prostředek na nádobí na bázi MÝDLOVÝCH OŘECHŮ (kód: 14708)!
🌿 100% smývatelný z povrchu nádobí
👶 Bezpečný na dudlíky, kojenecké lahve a dětské hračky
🍎 Perfektní i na omytí koupeného ovoce a zeleniny (odstraní vosky i nečistoty)
👐 Hýčká vaše ruce – konec suché pokožce a ekzémům ze saponátů!

Je zcela přírodní, biologicky odbouratelný a neuvěřitelně koncentrovaný – vydrží měsíce. Chcete jej vyzkoušet s VIP slevou 35 %? Napište mi do zpráv! 📩`,
    expertTip: "Při prezentaci klientům doporučujte zakoupit produkt společně s naší utěrkou na nádobí z mikrovlákna. S tou stačí použít opravdu jen 1 kapku saponátu a napěníte s tím celou dřezovou koupel!"
  },
  {
    id: "laundry-sheets",
    name: "Ekologické prací proužky na spaní a praní",
    code: "14801 (16 ks tvořících 32 polovičních dávek)",
    shortDesc: "Ultrakoncentrovaný biominerální čistič bez fosfátů a syntetických parfémů.",
    markdownContent: `### Budoucnost ekologického praní bez chemie

Prací proužky představují novou éru ekologické drogerie. Jsou to lehké rozpustné proužky z biominerálních přírodních čistících látek. Neobsahují agresivní sulfáty, fosfáty, chlor ani barviva, které dráždí pokožku.

#### 💡 Hlavní přínosy a výhody:
- **Dokonalá rozpustnost:** Nezanechávají v pračce ani na oblečení žádný dráždivý práškový prach ani nerozpuštěný gel.
- **Bez toxinů a alergenů:** Zcela bezpečné pro praní spodního prádla, dětského oblečení i pro osoby s atopickým ekzémem či citlivou pokožkou.
- **Snadné dávkování a lehkost:** Zapomeňte na tahání těžkých krabic s práškem! Balení se vejde do kabelky a váží jen pár gramů.
- **Ochrana barev a textilií:** Chrání barvy před vyblednutím a udržuje vlákna elastická bez nutnosti používat aviváž.
- **Vhodné pro funkční prádlo:** Neucpává póry membránového oblečení (thermo prádlo, softshell).

#### 🧪 Složení a účinné látky:
- **Kokosový esenciální olej:** Šetrný k vláknům, odstraňuje skvrny a dodává přirozenou měkkost.
- **Surové deionizované minerální soli:** Zajišťují šetrné změkčení vody a uvolnění nečistot z hloubky vláken.
- **Extrakt z aloe vera:** Pečuje o jemnost tkanin a zanechává zklidňující stopu pro citlivou pokožku.

#### 📝 Návod k použití:
1. **V automatické pračce:** Vložte proužek přímo do bubnu pračky k prádlu.
   - Pro mírné znečištění / poloviční buben (do 3 kg): stačí **1/2 proužku**.
   - Pro standardní praní (3–5 kg): použijte **1 celý proužek**.
   - Pro silné znečištění / tvrdou vodu: použijte **2 proužky**.
2. **Pro ruční praní:** Rozpusťte 1/2 proužku v misce s teplou vodou, nechte rozpustit a vyperte prádlo obvyklým způsobem.
`,
    copyablePost: `🚫 Konec tahání těžkých krabic na praní a chemického zápachu! 🚫

Každá z nás chce pro svou rodinu to nejzdravější. Klasické prací prášky ale často obsahují fosfáty, které zůstávají ve vláknech oblečení a dráždí naši pokožku.

TianDe vyvinulo úžasné EKOLOGICKÉ PRACÍ PROUŽKY (kód: 14801)! 😍
🍃 Čistě přírodní složení na bázi kokosového oleje a aloe vera.
🚫 ŽÁDNÉ fosfáty, chlor ani dráždivá chemie!
👶 Hypoalergenní – ideální na miminkovské oblečení i pro atopiky.
✈️ Ultra lehké a skladné – perfektní i na cesty, dovolenou nebo chalupu.
👗 Vhodné i na jemné tkaniny a funkční termoprádlo!

Stačí vložit kousek proužku přímo do bubnu pračky. Žádný nepořádek, žádné odměrky. Praní s radostí a v souladu s přírodou! 🌸 Chcete zjistit více? Ozvěte se mi.`,
    expertTip: "Ekologické proužky skvěle fungují i pro ekologický úklid domácnosti! Rozpusťte malý proužek v teplé vodě ve kbelíku a získáte šetrný, voňavý a vysoce bezpečný roztok na vytírání dřevěných i laminátových podlah, který neublíží lezoucím dětem ani domácím mazlíčkům."
  },
  {
    id: "smart-cloths",
    name: "Utěrky z mikrovlákna EcoDeViva (na sklo a nádobí)",
    code: "980165 (Utěrka na sklo) / 980166 (Utěrka na nádobí)",
    shortDesc: "Profesionální utěrky ze superměkkého mikrovlákna pro čištění a leštění pouze s vodou.",
    markdownContent: `### Úklid domácnosti zcela bez chemie pomocí Nano-vláken

Chytré utěrky EcoDeViva jsou utkané ze speciálního štěpeného mikrovlákna. Jejich struktura funguje jako magnet na prach, mastnotu a bakterie. Dokáží vyčistit jakýkoliv povrch pouze s použitím čisté vody – bez saponátů, leštidel či čističů okenních skel.

#### 💡 Hlavní přínosy a výhody:
- **Žádné šmouhy a chloupky:** Speciální vazba utěrky na sklo perfektně leští okna, zrcadla i nerezové baterie do absolutního lesku na jediný krok.
- **Mimořádná absorpce:** Utěrka na nádobí absorbuje obrovské množství vody a mastnoty, aniž by poškrábala citlivý teflon či porcelán.
- **Ekologický a zdravý domov:** Chrání plíce vaší rodiny před vdechováním chemických aerosolů z klasických sprejů na okna a nábytek.
- **Úspora peněz:** Jediná utěrka nahradí desítky lahví drahých čisticích prostředků a vydrží roky opakovaného praní.

#### 🧪 Materiál a vazba:
- **Štěpené mikrovlákno:** Vlákno je 100krát tenčí než lidský vlas, což umožňuje kapilární efekt, který do sebe vtahuje veškerou nečistotu do hloubky utěrky.

#### 📝 Návod k použití:
1. **Okna a zrcadla:** Utěrku navlhčete v čisté vlažné vodě, důkladně vyždímejte (musí být pouze vlhká) a setřete sklo. Během minuty sklo samo doschne do křišťálově lesklého stavu bez jediné šmouhy. Netřeba utírat dosucha!
2. **Mastnota a prach:** Suchou utěrku použijte na stírání prachu (vytváří statický náboj, který prach fixuje), vlhkou utěrku na odstranění otisků prstů, mastnoty a skvrn.
`,
    copyablePost: `✨ Dokonalý lesk oken a zrcadel BEZ CHEMIE a bez námahy? Ano! ✨

Už vás nebaví věčné leštění oken novinami, vdechování štiplavých sprejů a zbylé šmouhy? 😫

Zkuste naši legendární UTĚRKU NA SKLO EcoDeViva (kód: 980165)! 💙
💧 Stačí vám pouhé dva kroky: namočit do obyčejné vody a vyždímat!
🙅‍♀️ ŽÁDNÉ čisticí prostředky, žádné lešticí spreje, žádná chemie!
🧼 Jednoduše otřete jakékoliv zrcadlo, okno, skleněný stůl nebo televizi a za okamžik uvidíte čistý, křišťálový lesk bez šmouh i chloupků.

Šetříte své zdraví, přírodu i peněženku – utěrka vám při správné péči vydrží několik let!
Objednejte si ji ještě dnes přímo u mě v doručení zdarma. Napište komentář pod příspěvek! 👇`,
    expertTip: "Chytré utěrky nikdy neperte za použití aviváže ani nesušte v sušičce! Aviváž obalí mikroskopická nano-vlákna jemným voskovým filmem, což by nenávratně zničilo sací a kapilární schopnosti utěrky. Perte je v rukách s naším pracím proužkem nebo v pračce do 40 °C."
  }
];

// Utility to clean markdown content for the product educational overview.
// Removes stars, bullet hyphens, emojis, and other symbols from the beginning of sentences and headers.
const cleanMarkdownContent = (markdown: string): string => {
  if (!markdown) return '';
  
  const lines = markdown.split('\n');
  const processedLines = lines.map(line => {
    let trimmed = line.trim();
    if (!trimmed) return '';

    // Handle Headings (### and ####)
    if (trimmed.startsWith('###') || trimmed.startsWith('####')) {
      const match = trimmed.match(/^(#{3,4})\s*(.*)$/);
      if (match) {
        const level = match[1];
        let text = match[2];
        
        // Remove leading emojis, symbols, hyphens, and bullet marks from the heading text
        text = text.replace(/^[\s\p{Emoji}\p{Symbol}\-\*•✔💡🧪📝🛡🧼⚡🐚🥛🐼😴🌸🥇🎖🥈🥉]+/gu, '').trim();
        
        // Remove any outer bold stars if the heading had something like ### **Věda o pleti**
        text = text.replace(/^\*\*|^\*|\*\*$|\*$/g, '').trim();

        if (level === '###') {
          return `<h4 class="text-xs font-black uppercase text-slate-800 tracking-wider mt-8 mb-4 border-b border-slate-100 pb-1">${text}</h4>`;
        } else {
          return `<h4 class="text-[11px] font-bold text-slate-700 uppercase tracking-widest mt-6 mb-3 text-tiande-blue">${text}</h4>`;
        }
      }
    }

    // Check if it starts with bullet elements
    const hasBullet = /^[•\-\*✔]\s*/.test(trimmed);
    if (hasBullet) {
      trimmed = trimmed.replace(/^[•\-\*✔]\s*/, '').trim();
    }

    // Remove any leading emojis, symbols, and extra characters from the text beginning, but keep asterisks for bolding parsing below
    trimmed = trimmed.replace(/^[\/\s\p{Emoji}\p{Symbol}\-•✔💡🧪📝🛡🧼⚡🐚🥛🐼😴🌸🥇🎖🥈🥉]+/gu, '').trim();

    // Bold text replacements
    trimmed = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    trimmed = trimmed.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Remove any remaining raw leading star artifacts or dash artifacts
    trimmed = trimmed.replace(/^[\-\*•✔\s]+/, '').trim();

    if (hasBullet) {
      // Render list item with a clean left accent bar but absolutely NO bullet dots or stars
      return `<div class="ml-4 pl-3.5 border-l-2 border-slate-100 my-3 text-slate-600 leading-relaxed text-sm bg-slate-50/50 py-1.5 pr-2 rounded-r">${trimmed}</div>`;
    }

    return `<p class="my-2.5 text-slate-600 leading-relaxed text-sm">${trimmed}</p>`;
  });

  return processedLines.filter(line => line !== '').join('\n');
};

export const ProductsPillar: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState<'domacnost' | 'pleten' | 'vlasy' | 'zdravi' | 'zdravi_telo' | 'zuby' | 'zenske_zdravi'>('domacnost');
  const [activeMaterial, setActiveMaterial] = useState<string>('dish-soap');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeMaterialsList = 
    activeFolder === 'pleten' 
      ? skinCareMaterials 
      : activeFolder === 'vlasy' 
      ? hairCareMaterials 
      : activeFolder === 'zdravi'
      ? healthProductsMaterials
      : activeFolder === 'zdravi_telo'
      ? healthBodyProductsMaterials
      : activeFolder === 'zuby'
      ? dentalProductsMaterials
      : activeFolder === 'zenske_zdravi'
      ? womensHealthProductsMaterials
      : householdMaterials;
  const selectedMaterial = activeMaterialsList.find(m => m.id === activeMaterial) || activeMaterialsList[0];

  const handleFolderChange = (folderId: 'domacnost' | 'pleten' | 'vlasy' | 'zdravi' | 'zdravi_telo' | 'zuby' | 'zenske_zdravi') => {
    setActiveFolder(folderId);
    const textList = 
      folderId === 'pleten' 
        ? skinCareMaterials 
        : folderId === 'vlasy' 
        ? hairCareMaterials 
        : folderId === 'zdravi'
        ? healthProductsMaterials
        : folderId === 'zdravi_telo'
        ? healthBodyProductsMaterials
        : folderId === 'zuby'
        ? dentalProductsMaterials
        : folderId === 'zenske_zdravi'
        ? womensHealthProductsMaterials
        : householdMaterials;
    setActiveMaterial(textList[0].id);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      
      {/* Banner / Header */}
      <header className="mb-12">
        <p className="text-sm text-tiande-blue font-serif italic mb-2">Složky a promo materiály produktů</p>
        <h2 className="text-5xl font-light tracking-tight text-slate-800">
          Knihovna <span className="font-serif italic text-slate-400">Produktů</span>
        </h2>
      </header>

      {/* Subfolder Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-10">
        {[
          { id: 'domacnost', title: 'DOMÁCNOST', desc: 'Ekodomov EcoDeViva', icon: <Home className="w-5 h-5" />, disabled: false },
          { id: 'pleten', title: 'PLEŤ', desc: 'Kosmetická péče', icon: <Sparkles className="w-5 h-5" />, disabled: false },
          { id: 'vlasy', title: 'VLASY & TĚLO', desc: 'Péče o vlasy a tělo', icon: <Scissors className="w-5 h-5" />, disabled: false },
          { id: 'zdravi', title: 'ZDRAVÍ & DOPLŇKY', desc: 'Fytoterapie a doplňky', icon: <Droplet className="w-5 h-5" />, disabled: false },
          { id: 'zdravi_telo', title: 'ZDRAVÍ - TĚLO', desc: 'Aktivní péče o tělo', icon: <Activity className="w-5 h-5 text-emerald-600" />, disabled: false },
          { id: 'zuby', title: 'ZUBY', desc: 'Péče o zuby a dásně', icon: <Smile className="w-5 h-5 text-sky-600" />, disabled: false },
          { id: 'zenske_zdravi', title: 'ŽENSKÉ ZDRAVÍ', desc: 'Fytoterapie pro ženy', icon: <Heart className="w-5 h-5 text-pink-600" />, disabled: false },
        ].map((folder) => (
          <button
            key={folder.id}
            onClick={() => !folder.disabled && handleFolderChange(folder.id as any)}
            className={`p-6 rounded text-left border transition-all relative flex items-start justify-between ${
              folder.disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''
            } ${
              activeFolder === folder.id && !folder.disabled
                ? 'border-tiande-blue bg-white shadow-xl shadow-blue-50/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
            disabled={folder.disabled}
            id={`folder-tab-${folder.id}`}
          >
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest ${activeFolder === folder.id && !folder.disabled ? 'text-tiande-blue font-bold' : 'text-slate-400'}`}>
                {folder.desc}
              </p>
              <p className="text-sm font-bold text-slate-800 mt-2">{folder.title}</p>
            </div>
            <div className={`p-2.5 rounded-full ${activeFolder === folder.id && !folder.disabled ? 'bg-tiande-blue/5 text-tiande-blue' : 'bg-slate-50 text-slate-400'}`}>
              {folder.icon}
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Side: Sub-materials Selectors */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
            <h3 className="label-caps mb-4 opacity-75">
              Podsložka: {activeFolder === 'domacnost' ? 'Domácnost' : activeFolder === 'pleten' ? 'Péče o pleť' : activeFolder === 'vlasy' ? 'Péče o vlasy' : activeFolder === 'zdravi' ? 'Zdraví & doplňky' : activeFolder === 'zdravi_telo' ? 'Zdraví - tělo' : activeFolder === 'zuby' ? 'Zuby & ústní dutina' : 'Ženské zdraví'}
            </h3>
            <div className="space-y-2 h-[450px] overflow-y-auto pr-1">
              {activeMaterialsList.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat.id)}
                  className={`w-full p-4 rounded text-left border transition-all flex flex-col gap-1.5 ${
                    activeMaterial === mat.id
                      ? 'border-tiande-blue bg-blue-50/20 text-slate-800 font-bold'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/30'
                  }`}
                  id={`mat-btn-${mat.id}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-widest uppercase text-slate-400 font-mono">
                      Kód: {mat.code.split(' ')[0]}
                    </span>
                    {activeMaterial === mat.id && (
                      <span className="w-1.5 h-1.5 bg-tiande-blue rounded-full" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-snug">
                    {mat.name}
                  </h4>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Upload Formats */}
          <div className="bg-slate-900 text-white p-8 rounded shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <HelpCircle className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10">
              <span className="bg-tiande-blue text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-4">
                Poradce pro nahrávání
              </span>
              <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">
                Podporované formáty materiálů
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed mb-4">
                Chcete do asistenta nahrát další produktové letáky, tabulky nebo fotky a natrénovat ho na nové řady? Můžete mně (AI asistentovi) nahrávat materiály v těchto běžných formátech:
              </p>
              
              <ul className="text-[10px] text-slate-300 space-y-2 leading-relaxed border-t border-white/10 pt-4">
                <li className="flex items-center gap-2">
                  <span className="text-tiande-accent">✔</span>
                  <strong>Dokumenty:</strong> PDF, DOCX, TXT, XLSX, CSV
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-tiande-accent">✔</span>
                  <strong>Obrázky a letáky:</strong> PNG, JPEG, JPG, WebP, HEIC
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-tiande-accent">✔</span>
                  <strong>Audio & Video:</strong> MP3, WAV, MP4
                </li>
              </ul>
              
              <p className="text-[10px] text-slate-400 italic mt-4 leading-normal bg-white/5 p-3 rounded border border-white/5">
                💡 <strong>Tip pro lídry:</strong> Stačí mi přetáhnout naskenovaný leták nebo vyfocený produkt s popiskem a já z něj okamžitě sestavím prodejní příspěvek nebo ho přidám do doporučovací databáze!
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Material Display Area */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMaterial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Main Product Card */}
              <div className="editorial-card p-8 lg:p-10 relative overflow-hidden bg-white">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] text-tiande-blue font-bold tracking-widest uppercase block mb-1">
                      Edukační přehled / Kód: {selectedMaterial.code}
                    </span>
                    <h3 className="text-2xl font-light tracking-tight text-slate-800">
                      {selectedMaterial.name.split(' ').slice(0, -2).join(' ')}{' '}
                      <span className="font-serif italic text-slate-400">
                        {selectedMaterial.name.split(' ').slice(-2).join(' ')}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="markdown-body text-slate-700">
                  <div className="space-y-6 text-sm leading-relaxed">
                    <p className="text-slate-500 italic text-base border-l-2 border-tiande-blue pl-4 mb-6">
                      {selectedMaterial.shortDesc}
                    </p>
                    
                    <div dangerouslySetInnerHTML={{ 
                      __html: cleanMarkdownContent(selectedMaterial.markdownContent)
                    }} />
                  </div>
                </div>
              </div>

              {/* Leader Copyable Template block */}
              <div className="bg-white border border-slate-200 rounded p-6 lg:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      Facebook / Instagram
                    </span>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Užitečná Šablona pro vaši síť
                    </h4>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedMaterial.copyablePost, selectedMaterial.id)}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-tiande-blue hover:text-tiande-dark transition-all"
                  >
                    {copiedId === selectedMaterial.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Zkopírováno
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Zkopírovat Příspěvek
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600 leading-relaxed italic whitespace-pre-wrap">
                  {selectedMaterial.copyablePost}
                </div>
              </div>

              {/* Leader Video / Training Tip */}
              <div className="bg-blue-50/20 border border-tiande-blue/10 p-6 lg:p-8 rounded flex items-start gap-4">
                <div className="p-3 bg-white text-tiande-blue rounded-full shadow-sm shrink-0">
                  <Gift className="w-5 h-5 text-tiande-blue" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-tiande-blue">
                    TOP Lídr Rada (Prodejní Duplikace)
                  </h4>
                  <p className="text-slate-600 text-xs italic mt-2 leading-relaxed">
                    "{selectedMaterial.expertTip}"
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
