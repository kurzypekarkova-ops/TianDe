import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  HelpCircle, 
  Check, 
  Info,
  Gift,
  Coins,
  ArrowRight,
  TrendingDown,
  Percent,
  Wallet
} from 'lucide-react';

export const CalculatorPillar: React.FC = () => {
  // Tabs: 'customer' (Zákazník) or 'distributor' (Začínající distributor)
  const [activeTab, setActiveTab] = useState<'customer' | 'distributor'>('customer');

  // --- ZÁKAZNÍK (CUSTOMER) CALCULATIONS ---
  const [catalogPrice, setCatalogPrice] = useState<number>(3000); // in CZK
  
  // TianDe standard rules: VIP registration gives an instant 35% discount off the catalogue prices.
  // VIP Price = Catalog Price * 0.65
  // Savings = Catalog Price * 0.35
  const vipPrice = Math.round(catalogPrice * 0.65);
  const savings = Math.round(catalogPrice * 0.35);
  const yearlySavings = savings * 12; // if buying monthly

  // What you can buy with yearly savings:
  const potentialProducts = Math.floor(yearlySavings / 450); // average product price 450 Kč

  // --- DISTRIBUTOR CALCULATIONS ---
  const [teamMembersCount, setTeamMembersCount] = useState<number>(15); // Number of people with 100 points
  const pointsPerPerson = 100;
  
  // Total points including own 100 points purchases
  const myPoints = 100;
  const totalPoints = (teamMembersCount * pointsPerPerson) + myPoints;

  // Let's model a realistic, beautiful path representing TianDe marketing plan levels:
  // Points -> Title (Pozice), Commission Percentage (Provizní %), Average Commission (Kč), De-coins bonus
  const getCareerLevel = (pts: number) => {
    if (pts < 100) {
      return { title: 'Zákazník', percent: 0, minCommission: 0, maxCommission: 0, deCoins: 0, description: 'Zpracováváte první nákupy.' };
    } else if (pts >= 100 && pts < 400) {
      return { title: 'VIP Konzultant', percent: 5, minCommission: 150, maxCommission: 450, deCoins: 20, description: 'První úspěchy a vlastní levnější spotřeba.' };
    } else if (pts >= 400 && pts < 1000) {
      return { title: 'Instruktor', percent: 10, minCommission: 600, maxCommission: 2400, deCoins: 50, description: 'Začínáte stavět stabilní základy týmu.' };
    } else if (pts >= 1000 && pts < 2000) {
      return { title: 'Manažer', percent: 15, minCommission: 3000, maxCommission: 6500, deCoins: 150, description: 'Velmi rychlá duplikace. První stálý příjem na ruku.' };
    } else if (pts >= 2000 && pts < 3000) {
      return { title: 'Mistr', percent: 19, minCommission: 8500, maxCommission: 14000, deCoins: 300, description: 'Respektovaná pozice. Skvělý parťák pro vedení lidí.' };
    } else if (pts >= 3000 && pts < 5000) {
      return { title: 'Managing Mistr', percent: 23, minCommission: 16000, maxCommission: 28000, deCoins: 500, description: 'Krok od ředitelských bonusů. Svoboda na dosah.' };
    } else {
      return { title: 'Ředitel (Director)', percent: 30, minCommission: 35000, maxCommission: 65000, deCoins: 1000, description: 'Zlatý vrchol etického MLM pod křídly Ivany Nohovové!' };
    }
  };

  const levelInfo = getCareerLevel(totalPoints);
  
  // Calculate specific estimated commission dynamically based on totalPoints for better visual flow
  const computedCommission = Math.round(
    levelInfo.percent === 0 ? 0 : (totalPoints * 4.2 * (levelInfo.percent / 100)) + (levelInfo.percent * 80)
  );

  // Bonus points (De-coins) scale
  const computedDeCoins = Math.round(teamMembersCount * 15 + (totalPoints * 0.05));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Branding Header */}
      <div className="mb-10 border-b border-slate-200 pb-8">
        <span className="bg-blue-100 text-tiande-blue text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-4 inline-block">
          Kalkulačka Úspor & Provizí
        </span>
        <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
          Duplikační a <span className="serif-italic text-tiande-blue">vizualizační panel</span>
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl">
          Vidět čísla jednoduše a v reálném čase je ten nejlepší přirozený motor k úspěchu. Vypočítejte okamžité úspory VIP zákazníků nebo namotivujte partnery jasným kariérním růstem!
        </p>
      </div>

      {/* Main Pillars Navigation tab list */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex max-w-xl w-full gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('customer')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'customer'
                ? 'bg-white text-slate-800 shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-tiande-blue" />
            <span>Chytrý Zákazník (Úspory)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('distributor')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'distributor'
                ? 'bg-white text-slate-800 shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-pink-500" />
            <span>Začínající Distributor</span>
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Input & Sliders */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          
          {activeTab === 'customer' ? (
            // --- CUSTOMER CALCULATOR VIEW ---
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 bg-blue-50 text-tiande-blue rounded-lg">
                    <Wallet className="w-5 h-5" />
                  </span>
                  <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wide">
                    Spočítejte okamžité úspory
                  </h3>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">
                  Zadejte celkovou hodnotu nákupu v katalogových cenách. Registrace do TianDe je zcela zdarma a okamžitě vám odemkne VIP slevu ve výši 35 % na úplně celý sortiment!
                </p>
                
                {/* Numeric Input & Interactive Slider */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Běžný katalogový nákup:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number" 
                        value={catalogPrice}
                        onChange={(e) => setCatalogPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-24 text-right bg-white border border-slate-200 rounded-lg p-1.5 text-sm font-mono font-bold text-slate-800 focus:border-tiande-blue focus:outline-none"
                      />
                      <span className="text-xs font-bold text-slate-400">Kč</span>
                    </div>
                  </div>

                  <input 
                    type="range" 
                    min="500" 
                    max="15000" 
                    step="100"
                    value={catalogPrice} 
                    onChange={(e) => setCatalogPrice(parseInt(e.target.value))}
                    className="w-full accent-tiande-blue cursor-pointer"
                  />
                  
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>500 Kč</span>
                    <span>5 000 Kč</span>
                    <span>10 000 Kč</span>
                    <span>15 000 Kč</span>
                  </div>
                </div>
              </div>

              {/* Dynamic comparison micro-grid */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
                    Cena bez VIP registrace
                  </span>
                  <span className="text-base text-slate-500 line-through font-mono font-bold">
                    {catalogPrice.toLocaleString()} Kč
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-1">Plná katalogová částka</span>
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-tiande-blue block mb-1">
                    Vaše VIP exkluzivní cena (-35%)
                  </span>
                  <span className="text-lg text-tiande-blue font-mono font-black">
                    {vipPrice.toLocaleString()} Kč
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-1">Ušetříte {savings.toLocaleString()} Kč!</span>
                </div>
              </div>

              {/* Coach Advisory from Ivana Nohovová */}
              <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 mt-6 relative overflow-hidden">
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[9px] uppercase font-black text-pink-400 tracking-widest block">
                    Strategický nákupní tip • Ivana Nohovová
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-300 font-medium font-sans">
                    "Za nákup ve výši cca 3 500 Kč (což odpovídá 100 bodům) na e-shopu TianDe nejenže ušetříte okamžitě přes 1 200 Kč na úsporách, ale ihned získáte zdarma luxusní dárky v rámci akcí Stabilní prodeje, dárkový poukaz a osobní konzultaci s fytoreceptem na míru ode mě!"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // --- DISTRIBUTOR CALC VIEW ---
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 bg-pink-50 text-pink-500 rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wide">
                    Namodelujte si růst týmu
                  </h3>
                </div>

                <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">
                  Zadejte, kolik lidí ve svém týmu chcete mít s průměrným měsíčním nákupem 100 bodů (cca 3 500 Kč, což je standard pro celistvou péči o rodinu). Každý takový nákup buduje vaši pozici.
                </p>

                {/* Team size slider */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Počet aktivních partnerů (100b):
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number" 
                        value={teamMembersCount}
                        onChange={(e) => setTeamMembersCount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 text-right bg-white border border-slate-200 rounded-lg p-1.5 text-sm font-mono font-bold text-slate-800 focus:border-pink-500 focus:outline-none"
                      />
                      <span className="text-xs font-bold text-slate-400">lidí</span>
                    </div>
                  </div>

                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={teamMembersCount} 
                    onChange={(e) => setTeamMembersCount(parseInt(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>0 partnerů</span>
                    <span>25 lidí</span>
                    <span>50 lidí</span>
                    <span>100 lidí</span>
                  </div>
                </div>
              </div>

              {/* Accumulation report */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
                    Aktuální objem bodů (Obchod)
                  </span>
                  <span className="text-base text-slate-800 font-mono font-bold">
                    {totalPoints.toLocaleString()} b.
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-1">
                    Zahrnuje i vašich {myPoints} b.
                  </span>
                </div>

                <div className="p-4 bg-pink-50/45 border border-pink-100/50 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-pink-600 block mb-1">
                    Marketingová pozice (Úroveň)
                  </span>
                  <span className="text-base text-pink-600 font-mono font-black block leading-snug">
                    {levelInfo.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 block">
                    Sazba provize: {levelInfo.percent} %
                  </span>
                </div>
              </div>

              {/* Dynamic mini-bar explaining duplicity */}
              <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 mt-6 relative overflow-hidden">
                <div className="relative z-10 space-y-1">
                  <span className="text-[9px] uppercase font-black text-blue-300 tracking-widest block">
                    Klíč k udržitelným financím
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-300 font-medium">
                    "MLM není o prodávání kamionů kosmetiky. Je o <strong>duplikaci</strong>. Pomozte několika lidem přepnout nákup z běžné chemické drogerie na čerstvé léčivé bylinky TianDe. Jakmile to zopakují, generujete stálý nekonečný pasivní příjem!"
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Results Dashboard with visual rewards */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {activeTab === 'customer' ? (
            // --- CUSTOMER RESULTS ---
            <>
              {/* Card 1: Immediate Savings */}
              <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03]">
                  <Calculator className="w-48 h-48" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-pink-400 tracking-widest border-b border-slate-700 pb-1">
                      Vyhodnocení VIP Přínosů
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold">Ušetřené peníze za tento jeden nákup:</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-light tracking-tight text-white font-mono">
                        {savings.toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-slate-400 font-mono">Kč</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4 border-t border-slate-800 pt-6">
                  {/* Monthly prediction metric */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Při pravidelném měsíčním nákupu ušetříte za rok:</span>
                    <span className="font-mono font-black text-pink-400 text-sm">
                      {yearlySavings.toLocaleString()} Kč
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">VIP nákupní sleva s okamžitým kódem zdarma:</span>
                    <span className="font-bold text-green-400 tracking-wider">
                      UŠETŘÍTE 35 %
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Interactive value mapping (What you actually save) */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider mb-2">
                    Co představuje vaše roční úspora?
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    S VIP kartičkou ty peníze nenecháte v obchodech, ale zůstanou u vás v peněžence. Za ušetřené peníze můžete mít od TianDe například:
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 bg-blue-50/30 border border-blue-100/50 p-4 rounded-xl">
                    <Gift className="w-5 h-5 text-tiande-blue shrink-0 animate-bounce" />
                    <div>
                      <p className="text-xs font-black text-slate-800">
                        Až {potentialProducts} prémiových produktů ZDARMA
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        (Při průměrné ceně šamponu, masky či krému s mucinem cca 450 Kč)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <Percent className="w-5 h-5 text-pink-500 shrink-0" />
                    <div>
                      <p className="text-xs font-black text-slate-800">
                        Permanentní celoživotní přístup k velkoobchodním cenám
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Žádné skryté paušály, žádný nucený odběr. Nakupujete pouze když potřebujete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // --- DISTRIBUTOR RESULTS ---
            <>
              {/* Card 1: Estimated Income & De-coins */}
              <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03]">
                  <Coins className="w-48 h-48" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-pink-400 tracking-widest border-b border-slate-700 pb-1">
                      Kariéra & Měsíční odměna
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold">Odhadovaná provize (Měsíční pasivní bonus):</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-light tracking-tight text-pink-400 font-mono">
                        ~{computedCommission.toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-slate-400 font-mono">Kč</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4 border-t border-slate-800 pt-6">
                  {/* De-coins mapping as requested */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>Hodnota získaných De-coinů (Bodů):</span>
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      {computedDeCoins.toLocaleString()} De-coinů
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Bylinná řada a certifikované rady lídra:</span>
                    <span className="font-bold text-green-400 uppercase text-[10px] tracking-wider">
                      Zajištěno u Ivany Nohovové
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Interactive visual steps mapping */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                  Profil vybrané kariérní úrovně
                </h4>

                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Krok kariéry:</span>
                    <span className="font-black text-slate-800">{levelInfo.title}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Vaše sazba:</span>
                    <span className="font-black text-tiande-blue">{levelInfo.percent} %</span>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-lg leading-relaxed font-semibold">
                    {levelInfo.description}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
