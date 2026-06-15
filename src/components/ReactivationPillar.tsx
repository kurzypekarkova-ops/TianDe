import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  Gift, 
  Coins, 
  Clock, 
  Zap, 
  Sparkles,
  RefreshCw,
  BellRing,
  HeartHandshake,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

interface FollowUpTemplate {
  id: string;
  type: 'dormant' | 'birthday' | 'decoins' | 'product_promo' | 'first_purchase';
  situationName: string;
  situationDescription: string;
  badgeColor: string;
  emoji: string;
  suggestedSubject: string;
  text: string;
  psychologyTip: string;
}

const REACTIVATION_TEMPLATES: FollowUpTemplate[] = [
  {
    id: 'dormant-3-months',
    type: 'dormant',
    situationName: 'Klientka neobjednala 3+ měsíce',
    situationDescription: 'Jemné a nevtíravé připomenutí, zjištění její spokojenosti a nenásilné navázání kontaktu.',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    emoji: '🍂',
    suggestedSubject: 'Ozvění se po delší době & dáreček',
    text: 'Ahoj {name}, moc tě zdravím! 😊 Vzpomněla jsem si na tebe, jak se ti daří a jak ti slouží bříško / péče o vlásky? Nedávno jsi u mě brala produkty a chtěla jsem se kamarádsky zeptat, jestli ti vše vyhovuje a jak jsi spokojená s výsledky?\n\nMáme teď s naší TOP lídryní Ivanou Nohovovou novou fytokampaň zaměřenou na letní péči. Kdyby ti doma něco docházelo, ráda ti pomůžu sestavit nový bezplatný fytorecept na míru a přibalit nějaký milý dárek k nákupu! Podívat se na novinky můžeš přes tvůj VIP přístup zde: {link}',
    psychologyTip: 'Vycházejte z čisté péče o zákazníka, nikoliv ze snahy vytlouct další prodej. Otázka na spokojenost je nejlepším otvírákem.'
  },
  {
    id: 'birthday-gift',
    type: 'birthday',
    situationName: 'Narozeninové přání a dárek',
    situationDescription: 'Budování srdcového vztahu. Klienti milují dárky a osobní péči k jejich svátku.',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    emoji: '🎂',
    suggestedSubject: 'Krásné narozeniny! 🥳',
    text: 'Krásné narozeniny, milá {name}! 🌸 Přeji ti hromadu zdraví, energie, spokojenosti a ať si dnes užiješ svůj den přesně podle přání! 🥳\n\nJako poděkování, že jsi moje stálá TianDe zákaznice, pro tebe mám narozeninové překvapení. Při tvé nejbližší objednávce přes tvůj VIP odkaz {link} mi dej vědět – osobně ti k balíčku přihodím naši legendární hojivou masku se šnečím mucinem zdarma jako dárek od srdce! Měj se dnes pohádkově. ❤️🎈',
    psychologyTip: 'Nikdy nedávejte narozeninovou slevu formou nátlaku "platí jen dnes". Dejte klientce pocit exkluzivity, že dárek u vás čeká na její další potřebu.'
  },
  {
    id: 'decoins-expiring',
    type: 'decoins',
    situationName: 'Upozornění na propadající De-coiny',
    situationDescription: 'Využití psychologického efektu ztráty (FOMO). Lidé nesnáší, když přichází o nastřádané body a bonusy.',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    emoji: '🪙',
    suggestedSubject: '⚠️ Pozor na tvé věrnostní De-coiny',
    text: 'Ahoj {name}, posílám jedno rychlé a důležité upozornění! 🚨 Při kontrole klientských účtů u mě v systému tianDe jsem si všimla, že máš nasbírané věrnostní De-coiny (body), kterým se blíží expirace a brzy by ti zbytečně propadly.\n\nByla by to velká škoda, protože si za ně můžeš v e-shopu vyzvednout spoustu kosmetiky a bylinkových dárků úplně zdarma! Stačí udělat jakýkoliv drobný nákup přes tvou VIP slevovou kartičku zde: {link} a body si jednoduše uplatnit. Kdybys potřebovala pomoci s výběrem nebo přihlášením, napiš mi, ráda ti s tím pomůžu! 📲',
    psychologyTip: 'Slovo "propadnou" v lidech spouští okamžitý zájem. Pomáháte jim zachránit hodnotu, kterou již jednou získali, což buduje velkou loajalitu.'
  },
  {
    id: 'favorites-discount',
    type: 'product_promo',
    situationName: 'Akce na její oblíbenou řadu',
    situationDescription: 'Cílené oslovení na základě předchozí nákupní historie (třeba u klientek Bio Rehab / Snake Factor).',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    emoji: '🔥',
    suggestedSubject: 'Tvoje oblíbené TianDe v akci!',
    text: 'Ahoj {name}, mám pro tebe skvělou zprávu! 😍 Vím, jak moc si oblíbila naši bylinnou péči {line}, a zrovna dnes tianDe spustilo mimořádnou akční nabídku přímo na tyhle produkty!\n\nPři nákupu přes tvůj věrnostní VIP kód {link} k nim teď dostaneš další produkt zdarma jako dárek v rámci firemních akcí. Protože se tyto akční sady vyprodávají z centrálního skladu neskutečně rychle, doporučuji na to mrknout co nejdříve. Kdybys chtěla pomoct s naklikáním objednávky, dej vědět, ráda ti to zajistím! 📩',
    psychologyTip: 'Personalizovaná doporučení mají 7x vyšší míru konverze než plošný spam. Klientka vidí, že si pamatujete, co přesně má ráda.'
  },
  {
    id: 'onboarding-followup',
    type: 'first_purchase',
    situationName: 'Péče 3 dny po doručení prvního nákupu',
    situationDescription: 'Zajištění perfektní zákaznické cesty (onboarding). Klientka se nesmí cítit po nákupu opuštěná.',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    emoji: '📦',
    suggestedSubject: 'Dorazilo vše v pořádku? 🌸',
    text: 'Ahoj {name}, podle sledování zásilek ti včera nebo dnes měl dorazit tvůj první balíček z TianDe! 😍 Chci se jen s láskou ujistit – dorazilo vše v pořádku a nerozbilo se po cestě nic?\n\nAby pro tebe produkty měly ten maximální léčivý účinek, nezapomeň, že u bylinek je nejdůležitější pravidelnost. U gelu / vložek doporučuji začít přesně tak, jak nás učí Ivana Nohovová. Kdybys měla jakoukoliv pochybnost, jak přípravky správně zkombinovat, neváhej okamžitě napsat. Jsem tvůj osobní průvodce na cestě ke zdraví a kráse! 💆‍♀️✨',
    psychologyTip: 'Tento krok rozhoduje o tom, zda se z jednorázového kupujícího stane loajální partner a stálý zákazník. Ukazujete tím prémiový servis.'
  }
];

export const ReactivationPillar: React.FC = () => {
  const [activeTemplateId, setActiveTemplateId] = useState<string>('dormant-3-months');
  
  // Placeholders
  const [clientName, setClientName] = useState<string>('Lucie');
  const [vipUrl, setVipUrl] = useState<string>('tiandeshop.cz/vip-lucie');
  const [favoriteLine, setFavoriteLine] = useState<string>('Bio Rehab (proti padání vlasů)');
  const [customSender, setCustomSender] = useState<string>('Ivana Nohovová');
  
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Active template reference
  const currentTemplate = REACTIVATION_TEMPLATES.find(t => t.id === activeTemplateId) || REACTIVATION_TEMPLATES[0];

  const replacePlaceholders = (text: string): string => {
    return text
      .replace(/{name}/g, clientName.trim() || 'Zákazníku')
      .replace(/{link}/g, vipUrl.trim() || '[odkaz]')
      .replace(/{line}/g, favoriteLine.trim() || 'Bio Rehab')
      .replace(/Ivana Nohovová/g, customSender.trim() || 'Ivana Nohovová');
  };

  const handleCopy = () => {
    const finalMsg = replacePlaceholders(currentTemplate.text);
    navigator.clipboard.writeText(finalMsg);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const textStr = replacePlaceholders(currentTemplate.text);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textStr)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Upper Branding Header */}
      <div className="mb-10 border-b border-slate-200 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-4 inline-block">
            Smart Follow-up pomocník
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            Oživovač <span className="serif-italic text-emerald-500">zákazníků</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Až 80 % obratu v úspěšných strukturách tianDe tvoří systematická péče o stávající databázi zákazníků. Tento generátor vám pomůže navázat přirozený a milý kontakt bez prodejního tlaku.
          </p>
        </div>
      </div>

      {/* Visual Steps Progress Bar */}
      <div className="mb-10 max-w-3xl mx-auto select-none">
        <div className="flex items-center justify-between relative">
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200/60 -translate-y-1/2 z-0 rounded-full" />
          {/* Active progress line */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{ 
              width: copiedText ? '100%' : (clientName !== 'Lucie' || vipUrl !== 'tiandeshop.cz/vip-lucie' ? '50%' : '25%')
            }} 
          />
          
          {[
            { step: 1, label: 'Klientská situace', desc: 'Vyberte šablonu' },
            { step: 2, label: 'Úprava proměnných', desc: 'Zadejte jméno & odkaz' },
            { step: 3, label: 'Odeslání zprávy', desc: 'Zkopírujte do schránky' }
          ].map((s) => {
            let isActive = false;
            let isCompleted = false;
            if (s.step === 1) {
              isActive = true;
              isCompleted = true;
            }
            if (s.step === 2) {
              isActive = clientName !== 'Lucie' || vipUrl !== 'tiandeshop.cz/vip-lucie' || favoriteLine !== 'Bio Rehab (proti padání vlasů)';
              isCompleted = clientName.trim() !== '' && vipUrl.trim() !== '';
            }
            if (s.step === 3) {
              isActive = copiedText;
              isCompleted = copiedText;
            }
            return (
              <div key={s.step} className="flex flex-col items-center z-10 relative bg-slate-50/90 px-3 py-1 rounded-xl transition-all">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100' 
                      : isActive 
                        ? 'bg-white border-emerald-500 text-emerald-600 shadow-sm font-extrabold ring-4 ring-emerald-500/10' 
                        : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {s.step}
                </div>
                <span className={`text-[10px] font-black uppercase mt-1.5 tracking-wider ${isActive ? 'text-emerald-700 font-extrabold' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
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

      {/* Grid split */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input form & selection */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Situation selector card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
              1. Vyberte klientskou situaci
            </h3>

            <div className="space-y-2.5">
              {REACTIVATION_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setActiveTemplateId(tmpl.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    activeTemplateId === tmpl.id 
                      ? 'border-emerald-500 bg-emerald-50/15 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <span className="text-2xl pt-0.5" role="img" aria-label="emoji">
                    {tmpl.emoji}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-800 leading-snug">
                      {tmpl.situationName}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 font-medium">
                      {tmpl.situationDescription}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Placeholders Customization Input Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl space-y-4 border border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>2. Přizpůsobit zprávu</span>
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Oslovení zákazníka (v 5. pádě)
                </label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-bold text-slate-200 focus:border-emerald-500 focus:outline-none"
                  placeholder="např. Lucie, Petro"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Osobní VIP registračný odkaz
                </label>
                <input 
                  type="text" 
                  value={vipUrl}
                  onChange={(e) => setVipUrl(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none"
                  placeholder="např. tiandeshop.cz/vaseid"
                />
              </div>

              {currentTemplate.type === 'product_promo' && (
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Oblíbená řada / produkt
                  </label>
                  <input 
                    type="text" 
                    value={favoriteLine}
                    onChange={(e) => setFavoriteLine(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none font-semibold"
                    placeholder="např. Snake Factor"
                  />
                </div>
              )}

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Mentor / TOP Lídr
                </label>
                <input 
                  type="text" 
                  value={customSender}
                  onChange={(e) => setCustomSender(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none font-semibold"
                />
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Output display & psychological explanation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">
              Vygenerovaný text pro schránku
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-full">
              Připraveno k odeslání
            </span>
          </div>

          {/* Rich output box representing messaging client draft */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
            
            {/* Tiny top border accent color relative to template state */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-bold ${currentTemplate.badgeColor}`}>
                  {currentTemplate.emoji} {currentTemplate.situationName}
                </span>
              </div>

              {/* Action bundle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                    copiedText
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4 text-green-200" />
                      <span>Zkopírováno!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Kopírovat zprávu</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
                  title="Poslat ihned přes WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </button>
              </div>
            </div>

            {/* Simulated chat bubble output with customized text */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 font-sans">
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                {replacePlaceholders(currentTemplate.text)}
              </p>
            </div>

            {/* Strategic Psychology behind the specific draft template */}
            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 flex items-start gap-3.5">
              <HelpCircle className="w-5.5 h-5.5 text-tiande-blue shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                  Psychologická zbraň tohoto skriptu:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {currentTemplate.psychologyTip}
                </p>
              </div>
            </div>

            {/* Coach Quote Section */}
            <div className="bg-emerald-50 border border-emerald-100/50 rounded-2xl p-5 flex items-start gap-3">
              <HeartHandshake className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800">
                  Rada k reaktivaci od TOP lídra Ivany Nohovové:
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed font-semibold">
                  "Největší chybou je napsat lidem po půl roce jen tehdy, když zrovna potřebujete body do splnění svého měsíčního plánu. Lidé to vycítí a zablokují se. Když jim ale napíšete s upřímným zájmem o to, jak se jim daří vyřešit jejich dřívější potíže, nebo je upozorníte na propadající De-coiny, vnímají vás jako anděla strážného. Pečujte o svou databázi pravidelně!"
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
