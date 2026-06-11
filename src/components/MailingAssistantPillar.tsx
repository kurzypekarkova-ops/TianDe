import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  FileText, 
  Info, 
  ThumbsUp, 
  AlertCircle,
  Sparkle
} from 'lucide-react';

interface Template {
  id: string;
  title: string;
  badge: string;
  subject: string;
  preheader: string;
  body: string;
  tips: string;
}

const customTopics = [
  { label: 'Padání vlasů (Bio Rehab)', value: 'Bio Rehab řada pro růst vlasů a zastavení vypadávání' },
  { label: 'Těžké nohy (Slaviton)', value: 'Slaviton fytogel pro úlevu unaveným a těžkým nohám' },
  { label: 'Vrásky (Hadí řada Snake Factor)', value: 'Hadí tuk a řada Snake Factor pro lifting pleti' },
  { label: 'Ženské bylinné vložky (Energie bylin)', value: 'Bylinné vložky a fytomembrány pro ženské zdraví a harmonii' },
  { label: 'Akné & jizvičky (Master Herb)', value: 'Master Herb protizánětlivá péče o problematickou pleť' },
  { label: 'Akční dárky k objednávce', value: 'Vyjádření vděku stávajícím zákazníkům + dárky za nákup k aktuální akci' }
];

const prebuiltTemplates: Template[] = [
  {
    id: 'pas-formula',
    title: 'Problém - Zhoršení - Řešení (P.A.S. vzorec)',
    badge: 'Nejúčinnější na prodej',
    subject: 'Proč vlasy padají právě na jaře a na podzim? 🍂',
    preheader: 'Zastavte nadměrné vypadávání díky tibetským bylinám se slevou.',
    body: `Krásný den, moje milá,

často se mě v tomto období ptáte na jednu a tu samou věc: „Ivi, mně neuvěřitelně padají vlasy! Co mám dělat? Bojím se, že mi v koupelně brzy nezůstane vůbec nic.“ 

Úplně vám rozumím. Ten pocit, když po sprchování čistíte ucpaný odtok, je hrozně nepříjemný. Ale chci vás uklidnit. Nemusíte hned kupovat drahé doplňky stravy z lékáren, které slibují zázraky na počkání, ale v žaludku udělají spíš neplechu.

**Kde je skutečný problém?**
Časté mytí obyčejnými drogerkovými šampony plnými silikonů vlasové cibulky jen ucpává a ty pak „hladoví“. Vlasy slábnou a vypadávají, protože pokožka hlavy nedýchá a nemá výživu.

**Mám pro vás vyzkoušené řešení.**
Naše legendární tibetská řada **Bio Rehab**. Pracuje přímo v pokožce na aktivaci spící cibulky. 
Co tato řada dokáže?
1. Šampon-aktivátor šetrně očistí a zbaví pokožku silikonového nánosu.
2. Maska s unikátními proteiny vyživí vlas po celé délce.
3. Aktivátor v kapkách (tonikum) vmasírujete přímo ke kořínkům – prokrví pokožku a probudí k životu i ty nejvíc unavené cibulky.

Sama tuto řadu používám pokaždé, když cítím unavené vlasy, a výsledkem je hříva plná nových „baby“ vlásků!

👉 **[Zobrazit akční balíček Bio Rehab na e-shopu]**

P.S. Pokud si nejste jistá, jak tonikum správně vmasírovat, stačí odepsat na tento e-mail! Ráda s vámi projdu správný postup krok za krokem.

Krásný den a radost z hustých vlasů vám přeje,
[Vaše Jméno]`,
    tips: 'Skvěle funguje pro cílení na zákazníky, kteří již řeší konkrétní estetický nebo zdravotní problém. Vždy napište cenu balíčku nebo přidejte link přímo na konkrétní produkt.'
  },
  {
    id: 'promo-gift',
    title: 'Akční e-mail s dárkem k nákupu',
    badge: 'Vysoký konverzní poměr',
    subject: 'Záchrana pro vaše nohy zdarma? Jen tento týden! 🎁',
    preheader: 'Získejte ikonický Slaviton jako dárek k vaší objednávce.',
    body: `Milá tianDe rodino,

léto (nebo náročný týden v práci) nám dává pořádně zabrat. Celý den na nohou, v teple, v nepohodlných botách... Výsledkem jsou večer oteklé nohy, nepříjemné brnění a pocit, jako byste na každém kotníku měla kilečko závaží.

Vím, jak moc to bolí a jak těžké je po celém dni ještě fungovat doma. 

Mám pro vás skvělou zprávu! Tento týden jsme pro vás připravili mimořádnou akci, která vám přinese okamžitou úlevu:

🌿 **Získejte fytogel Slaviton jako DÁREK k vašemu nákupu nad 1 500 Kč!** 

Slaviton je náš absolutní bestseller z altajské přírody. Obsahuje extrakt z jírovce maďalu, chmele a vilínu. Okamžitě chladí, podporuje cirkulaci krve, zmírňuje otoky a vrací pocit „lehkých nohou“. Mnoho mých zákaznic mu říká „zázrak v tubě“ a nosí ho u sebe i v kabelce.

**Jak dárek získat?**
1. Klikněte na odkaz níže a vyberte si své oblíbené tianDe produkty (třeba pleťové masky, čaje nebo doplňky).
2. Jakmile váš nákupní košík přesáhne 1 500 Kč, Slaviton se vám do něj přidá automaticky za 0 Kč!
3. Akce platí pouze do nedělní půlnoci nebo do vyprodání zásob dárků.

👉 **[Kliknout sem a vybrat si tianDe radosti s dárkem]**

Udělejte si radost, doplňte zásoby a nechte altajské bylinky pracovat pro vaše zdraví.

Krásný zbytek týdne,
[Vaše Jméno]`,
    tips: 'Akční e-maily posílejte v úterý nebo ve čtvrtek ráno. V neděli večer (kolem 19:00 - 20:00) můžete poslat krátkou připomínku „Posledních pár hodin na získání dárku“, která mívá obrovskou úspěšnost.'
  },
  {
    id: 'story-transformation',
    title: 'Osobní příběh & Proměna (Hadí řada)',
    badge: 'Buduje silnou důvěru',
    subject: 'Pravda o mých vráskách (bez cenzury) 🫣',
    preheader: 'Jak mi obyčejný hadí tuk z Altaje změnil ráno před zrcadlem.',
    body: `Krásný den,

nebudu vám nic nalhávat. Když mi bylo čtyřicet, myslela jsem si, že vrásky prostě vyřeší dražší krém z drogerie. Jenže rána před zrcadlem začínala být čím dál smutnější. Unavená pleť bez jasu, hluboké linky kolem očí a pocit povadlosti...

Cítila jsem se starší, než jsem se reálně cítila uvnitř. Zkoušela jsem různé olejíčky i drahá séra, ale výsledky byly nulové. Připadala jsem si jako v pasti marketingu.

Pak mi kamarádka doporučila tianDe a naši ikonickou řadu s hadím tukem - **Snake Factor**. Přiznám se, že jsem byla nejdřív skeptická. Hadí tuk? Zní to divoce!

Ale zkusila jsem to. A po 3 týdnech pravidelného používání se stalo něco neskutečného:
✨ Pleť se neuvěřitelně vypnula a získala nádherně zdravou barvu.
✨ Mimické vrásky kolem očí se viditelně zjemnily (skoro jako po jemném botoxu).
✨ Kontury obličeje jsou pevnější a já se do zrcadla už zase usmívám!

Hadí olej totiž obsahuje mastné kyseliny, které jsou velmi podobné lidskému kožnímu tuku. Pleť ho doslova vymete a okamžitě začne s regenerací buněk. Je to přírodní lifting bez jediné jehly.

Pokud taky toužíte vrátit své pleti šťavnatost a mladistvý jas, hadí řada je přesně to, čím musíte začít. Napsala jsem o celém svém rituálu krátký průvodce:

👉 **[Přečíst si můj hadí rituál krásy & pořídit omlazení]**

Chcete se mě na cokoliv ohledně hadí péče zeptat? Neváhejte, napište mi. Jsem tu pro vás.

S vděčností za bylinky,
[Vaše Jméno]`,
    tips: 'Osobní příběh prodává nejlépe. Ukažte svou zranitelnost a upřímnost. Pokud máte fotku „před a po“, nezapomeňte ji do e-mailu vložit (buď jako obrázek, nebo odkaz na vaši FB skupinu).'
  },
  {
    id: 'activation-survey',
    title: 'Pravidelný vzdělávací newsletter (Tipy na detox)',
    badge: 'Dlouhodobá péče',
    subject: '3 tiché signály, že vaše tělo volá o pomoc 🍋',
    preheader: 'Snadné bylinné očistné tipy z tibetské medicíny pro více energie.',
    body: `Ahoj moje milá,

probouzíte se ráno unavená, i když jste spala 8 hodin? Máte šedavou pleť bez jasu, nebo vás trápí neustálá chuť na sladké a nafouklé bříško?

To nejsou známky stárnutí. Jsou to tiché vztyčené ukazováčky vašeho těla, které říkají: „Mám v sobě příliš mnoho toxického odpadu a nestíhám ho vylučovat.“

V tibetské medicíně se říká, že čisté tělo nepotřebuje léky, protože má obrovskou samoregenerační schopnost. Jak tělu bezpečně a jemně pomoci každý den?

Zde jsou **3 jednoduché kroky pro domácí rituál**:

1. **Ranní teplá voda s citronem:** Nastartuje žlučník a játra do nového dne. Banální, ale nesmírně účinné.
2. **Náš ledvinový čaj Tibetský sběr:** Ledviny čistí naši krev. Tento čaj jemně odvodňuje přebytečnou vodu z tkání, takže zmizí i ranní otoky v obličeji.
3. **Detoxikační náplasti Master Herb na chodidla:** Přilepíte na noc na chodidla. Výtažky z bambusového octa a bylin skrze reflexní zóny vytahují toxiny přímo z lymfatického systému. Ráno budete překvapená (a možná i trochu zděšená), jak vložka zčerná – to jsou odplavené nečistoty!

Tento detoxikační trojlístek vřele doporučuji každému, kdo chce znovu pocítit ten příval čisté energie a mít zářící pokožku.

Všechny bylinné pomocníky pro váš detox najdete v uceleném balíčku u mě na webu:

👉 **[Prozkoumat tibetský detoxikační balíček]**

Budu moc ráda, když mi napíšete, jak se po detoxu cítíte!

Mějte se krásně a hýčkejte své tělo,
[Vaše Jméno]`,
    tips: 'U vzdělávacích e-mailů dbejte na to, aby obsahovaly 80 % hodnoty (rady, návody) a pouze 20 % prodeje na konci. Zákazníci si na tyto maily zvyknou a budou je otevírat mnohem raději.'
  }
];

export const MailingAssistantPillar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'templates' | 'guide'>('ai');
  const [emailType, setEmailType] = useState<string>('newsletter-educational');
  const [selectedPresetTopic, setSelectedPresetTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [actionBenefit, setActionBenefit] = useState<string>('');
  const [ctaGoal, setCtaGoal] = useState<string>('Přejít do e-shopu');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // AI Generated output state
  const [generatedEmail, setGeneratedEmail] = useState<{
    subject1: string;
    subject2: string;
    subject3: string;
    preheader: string;
    body: string;
    expertTip: string;
  } | null>(null);

  const handleSelectPreset = (val: string) => {
    setSelectedPresetTopic(val);
    setCustomTopic(val);
  };

  const handleGenerateAI = async () => {
    const topicToUse = customTopic || selectedPresetTopic;
    if (!topicToUse) {
      alert('Prosím, zadejte nebo vyberte téma a produkt e-mailu.');
      return;
    }

    setLoading(true);
    setGeneratedEmail(null);

    const typeLabels: Record<string, string> = {
      'newsletter-educational': 'Vzdělávací newsletter (hodnota, tipy, složení produktů)',
      'promo-action': 'Akční nebo slevová nabídka s pocitem naléhavosti a dárky',
      'product-launch': 'Představení nového produktu nebo hitu tianDe',
      'storytelling': 'Osobní příběh proměny se záměrem vybudovat důvěru a jemně prodat',
      'relationship': 'Vztahový e-mail (poděkování, přání k narozeninám nebo reaktivace neaktivních)'
    };

    const typeLabel = typeLabels[emailType] || emailType;

    const message = `
Napiš mi profesionální e-mail pro mé zákaznice tianDe.
- Typ e-mailu: ${typeLabel}
- Hlavní téma a produkty: ${topicToUse}
- Hlavní lákadlo / akční nabídka / dárek: ${actionBenefit || 'Není specifikováno'}
- Cíl výzvy k akci (CTA tlačítko): ${ctaGoal}
- Další specifické detaily, které chci zmínit: ${additionalDetails || 'Nebyly specifikovány'}

Vytvoř odpověď ve formátu JSON s přesně těmito klíči (struktura):
{
  "subject1": "Atraktivní, zprostředkující zvědavost předmět č. 1",
  "subject2": "Užitkový, přímý předmět č. 2",
  "subject3": "Emocionální, příběhový předmět č. 3 s emotikonem",
  "preheader": "Lákavý preheader (věta doplňující předmět v doručené poště, max 100 znaků)",
  "body": "Kompletní tělo e-mailu napsané v češtině, s milým a přirozeným tónem od Ivany (nebo jiné tianDe poradkyně). Používej formátování odstavců, odrážek a zvýrazni důležité body hvězdičkami. Přidej jasné označení, kam vložit CTA odkaz ve tvaru [CTA ODKAZ: text tlačítka]. E-mail musí plynout eticky, bez nátlaku.",
  "expertTip": "Jeden konkrétní tip (max 2 věty), kdy tento konkrétní e-mail nejlépe poslat a na jakou skupinu ho cílit."
}
Odpověz POUZE validním JSON objektem, bez jakéhokoliv doplňujícího textu okolo.
`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          systemPrompt: `Jsi špičkový copywriter specializující se na e-mail marketing a etické MLM (zejména TianDe). Tvůj styl psaní je moderní, vřelý, srozumitelný a nesmírně čtivý. Dokážeš mluvit přímo k ženám a řešit jejich každodenní starosti o pleť, tělo a zdraví. Nikdy nepoužíváš agresivní marketingové fráze ("KUPTE TYTO ÚŽASNÉ PRODUKTY HNED PROTI padání vlasů", apod.). Místo toho stavíš na vzdělávání, přírodě, altajských a tibetských receptech a osobní zkušenosti s láskou a respektem k tianDe hodnotám.`
        })
      });

      const data = await response.json();
      
      // Attempt to clean JSON in case of markdown block wrap
      let jsonText = data.text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.substring(7);
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.substring(0, jsonText.length - 3);
      }
      
      const parsed = JSON.parse(jsonText.trim());
      setGeneratedEmail(parsed);
    } catch (error) {
      console.error('Došlo k chybě při generování e-mailu:', error);
      // Fallback draft in case of failure or non-json reply
      setGeneratedEmail({
        subject1: `Záchrana pro vaše tělo a mysl s tianDe ✨`,
        subject2: `Jak na unavené a oteklé tělo přirozenou cestou`,
        subject3: `Moje osobní tajemství pro lehčí dny... 🌿`,
        preheader: `Vyzkoušejte sílu bylin z Altaje s exkluzivním dárkem.`,
        body: `Krásný den, moje milá,\n\nčasto se potkáváme s tím, že nestíháme pečovat samy o sebe tak, jak bychom si zasloužily. Dnešní doba na nás klade obrovské nároky.\n\nPrávě proto jsem si pro vás připravila toto shrnutí péče o: ${topicToUse}.\n\nPokud vás trápí každodenní únava, obavy nebo estetické potíže, řešení spočívá v návratu k přírodě. V tianDe využíváme ty nejvzácnější byliny z čistého Altaje a Tibetu.\n\n**Co doporučuji vyzkoušet?**\n- Pravidelný pitný režim s našimi fytočaji.\n- Cílenou péči, která prokrvuje pokožku a obnovuje buňky.\n- Jemný rituál, který vám nezabere víc než 5 minut večer.\n\n${actionBenefit ? `Navíc mám pro vás skvělou zprávu: ${actionBenefit}` : ''}\n\n👉 **[CTA ODKAZ: Přejít na podrobnosti o nabídce]**\n\nBudu moc ráda, když mi odpovíte na tento e-mail a napíšete, jak se dnes máte a co vás nejvíc těší.\n\nS láskou a úctou,\nVaše tianDe průvodkyně`,
        expertTip: `Tento e-mail odešlete v úterý dopoledne. Výborně funguje na celou vaši databázi kontaktů.`
      });
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-indigo-100 pb-8">
        <div>
          <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 inline-block">
            Mailing & Newslettery
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-slate-800">
            E-mailový <span className="serif-italic text-indigo-500">asistent</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Nemáte ráda psaní e-mailů? S tímto asistentem napíšete newsletter, akční nabídku s dárkem i osobní příběh během pár kliknutí. Eticky, poutavě a s vysokou otevíratelností.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="bg-slate-100 p-1 rounded-lg flex self-start md:self-auto shrink-0">
          <button 
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'ai' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Kreator
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'templates' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <FileText className="w-3.5 h-3.5" /> Knihovna Šablon
          </button>
          <button 
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === 'guide' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Info className="w-3.5 h-3.5" /> Škola Mailingu
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {/* Tab 1: AI Email Generator */}
        {activeTab === 'ai' && (
          <motion.div
            key="ai-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Control Panel (left side, 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Sparkle className="w-4 h-4 text-indigo-500" />
                  Nastavení kampaně
                </h3>

                {/* 1. Typ e-mailu */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Typ e-mailové kampaně</label>
                  <select 
                    value={emailType}
                    onChange={(e) => setEmailType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 font-medium focus:border-indigo-500 focus:bg-white outline-none"
                  >
                    <option value="newsletter-educational">Pravidelný vzdělávací newsletter (Rady & Hity)</option>
                    <option value="promo-action">Sleva, akční nabídka nebo dárky k objednávce 🎁</option>
                    <option value="product-launch">Představení novinky / nový hit tianDe 🚀</option>
                    <option value="storytelling">Osobní příběh, zkušenost s tianDe, proměna 💖</option>
                    <option value="relationship">Vztahový mail (Poděkování, svátky, přání)</option>
                  </select>
                </div>

                {/* 2. Preset Topics (Saves typing!) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Rychlá témata tianDe (Klikněte pro vyplnění)</label>
                  <div className="flex flex-wrap gap-1.5">
                    {customTopics.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPreset(item.value)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition-all ${
                          customTopic === item.value 
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-sm' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Custom Topic Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Hlavní produkty, potíže nebo téma</label>
                  <textarea
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Např.: Ikonický krém s hadím tukem Snake Factor na vyhlazení hlubokých vrásek..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:border-indigo-500 focus:bg-white outline-none"
                  />
                </div>

                {/* 4. Action Benefit */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Mimořádný benefit / akce (volitelné)</label>
                  <input
                    type="text"
                    value={actionBenefit}
                    onChange={(e) => setActionBenefit(e.target.value)}
                    placeholder="Např.: Slaviton zdarma při nákupu nad 1200 Kč / sleva 15%"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:border-indigo-500 focus:bg-white outline-none"
                  />
                </div>

                {/* 5. CTA Goal */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Co má zákazník po přečtení udělat?</label>
                  <select
                    value={ctaGoal}
                    onChange={(e) => setCtaGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 font-medium focus:border-indigo-500 focus:bg-white outline-none"
                  >
                    <option value="Přejít do e-shopu a nakoupit">Přejít do e-shopu k nákupu</option>
                    <option value="Odpovědět na tento e-mail (osobní poradenství)">Odpovědět na e-mail (navázat kontakt)</option>
                    <option value="Získat akční balíček se slevou">Získat akční balíček se slevou</option>
                    <option value="Připojit se do naší uzavřené FB skupiny">Připojit se do FB skupiny</option>
                  </select>
                </div>

                {/* 6. Additional details */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Doplňující detaily a tajné triky (volitelné)</label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Např.: Chci tón laděný velmi osobně, zmínit rychlý návod k použití fytogelů na otoky."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:border-indigo-500 focus:bg-white outline-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  onClick={handleGenerateAI}
                  disabled={loading || !customTopic.trim()}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.14 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Asistent píše e-mail...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Vygenerovat prodejní e-mail
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Email Mockup Viewer (right side, 7 cols) */}
            <div className="lg:col-span-7">
              {generatedEmail ? (
                <div className="space-y-6">
                  {/* Subject lines options */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                    <span className="bg-indigo-500/20 text-indigo-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                      Horké Předměty e-mailu (Zvolte jeden)
                    </span>
                    <p className="text-[11px] text-slate-400">Tyto variace doručí nejvyšší míru otevření. Zkopírujte tu, která vás nejvíc zahřeje u srdce:</p>
                    <div className="space-y-2">
                      {[
                        { text: generatedEmail.subject1, label: 'Zvědavost' },
                        { text: generatedEmail.subject2, label: 'Přímý přínos' },
                        { text: generatedEmail.subject3, label: 'Emocionální' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                          <div className="flex gap-2 items-baseline">
                            <span className="text-[8px] bg-indigo-500/30 text-indigo-300 font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider">
                              {item.label}
                            </span>
                            <span className="text-xs font-semibold text-slate-200">{item.text}</span>
                          </div>
                          <button
                            onClick={() => copyText(item.text, `sub-${idx}`)}
                            className="bg-slate-700 hover:bg-slate-600 p-1.5 rounded transition-transform text-slate-300"
                            title="Zkopírovat předmět"
                          >
                            {copiedSection === `sub-${idx}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between gap-3 bg-slate-950 p-3 rounded-lg">
                      <div>
                        <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest block">Doplňující preheader</span>
                        <p className="text-[11px] font-normal text-slate-300 italic">"{generatedEmail.preheader}"</p>
                      </div>
                      <button
                        onClick={() => copyText(generatedEmail.preheader, 'preheader')}
                        className="bg-slate-800 hover:bg-slate-700 p-1.5 rounded text-slate-400 shrink-0 self-center"
                        title="Zkopírovat preheader"
                      >
                        {copiedSection === 'preheader' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Complete Email Inbox Mockup */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
                    {/* Inbox Header Mockup */}
                    <div className="bg-slate-50 border-b border-slate-100 p-4 shrink-0 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        <span className="text-[10px] text-slate-400 font-bold ml-2">Náhled e-mailového klienta</span>
                      </div>
                      <button
                        onClick={() => copyText(generatedEmail.body, 'body')}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-xs font-bold"
                      >
                        {copiedSection === 'body' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-600" /> Zkopírováno!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Zkopírovat tělo e-mailu
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-5 border-b border-slate-100 text-xs text-slate-500 font-normal space-y-1">
                      <div>
                        <strong className="text-slate-700">Od:</strong> Ivana Nohovová &lt;info@tianDe-tym.cz&gt;
                      </div>
                      <div>
                        <strong className="text-slate-700">Pro:</strong> vaše-zakaznice@seznam.cz
                      </div>
                      <div>
                        <strong className="text-slate-700">Předmět:</strong> <span className="text-slate-800 font-medium">{generatedEmail.subject1}</span>
                      </div>
                    </div>

                    {/* Email body */}
                    <div className="p-8 max-h-[480px] overflow-y-auto font-sans leading-relaxed text-slate-700 text-sm whitespace-pre-wrap select-text">
                      {generatedEmail.body}
                    </div>

                    {/* Lead Strategist Tip */}
                    {generatedEmail.expertTip && (
                      <div className="bg-indigo-50 border-t border-indigo-100/50 p-4 flex items-start gap-3">
                        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-xs font-bold text-indigo-900 block">Rada pro odeslání:</strong>
                          <p className="text-[11px] text-indigo-700 leading-relaxed font-normal">{generatedEmail.expertTip}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl py-24 px-10 text-center flex flex-col items-center justify-center space-y-3 h-full">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Kreativní asistent čeká na zadání</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Vyplňte nastavení v levém panelu, stiskněte „Vygenerovat prodejní e-mail“ a náš AI asistent vám sestaví šablonu přímo pro tianDe.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Copywriting Templates (Instant Copy) */}
        {activeTab === 'templates' && (
          <motion.div
            key="templates-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Quick explanation tag */}
            <div className="bg-white border border-pink-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-pink-50 text-pink-500 rounded-xl shrink-0 mt-0.5 md:mt-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-bold text-sm">Prověřené receptury šablon od Lídrů</h4>
                  <p className="text-slate-400 text-xs max-w-xl leading-relaxed mt-1">
                    Tyto šablony vychází z letitých zkušeností s prodejem tianDe produktů. Nechcete-li generovat pomocí AI, stačí kliknout na "Zkopírovat" u kterékoli šablony dole, nahradit údaje v hranatých závorkách a odeslat.
                  </p>
                </div>
              </div>
            </div>

            {/* Templates loop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prebuiltTemplates.map((tpl) => (
                <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 transition-all overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-pink-600 bg-pink-100 px-2.5 py-1 rounded-full mb-1 inline-block">
                        {tpl.badge}
                      </span>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">{tpl.title}</h4>
                    </div>
                    <button
                      onClick={() => copyText(tpl.body, tpl.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[10px] uppercase tracking-wider font-extrabold hover:bg-slate-50 transition-colors"
                    >
                      {copiedSection === tpl.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" /> Hotovo
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" /> Zkopírovat
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 flex-1 space-y-3.5 text-xs">
                    <div className="bg-slate-900 text-white rounded-xl p-3.5 space-y-2">
                      <div>
                        <strong className="text-slate-400 text-[9px] uppercase tracking-wider block">Vyzkoušený Předmět</strong>
                        <span className="font-bold text-slate-200">{tpl.subject}</span>
                      </div>
                      <div className="border-t border-slate-800 pt-1.5">
                        <strong className="text-slate-400 text-[9px] uppercase tracking-wider block">Preheader</strong>
                        <span className="text-slate-300 italic">{tpl.preheader}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-48 overflow-y-auto whitespace-pre-wrap text-slate-600 leading-relaxed font-sans text-[11px]">
                      {tpl.body}
                    </div>

                    <div className="flex items-start gap-2 text-[10px] text-pink-700 bg-pink-50/50 p-3 rounded-lg border border-pink-100/50">
                      <ThumbsUp className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                      <span>{tpl.tips}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Mailing Lead Strategy */}
        {activeTab === 'guide' && (
          <motion.div
            key="guide-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Guide Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Kdy mailing posílat?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Podle statistik v tianDe nejlépe fungují dny **úterý** a **čtvrtek** dopoledne (mezi 9:00 a 11:00) nebo **středa** večer (19:00 - 20:30). 
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Víkendové maily mívají nízkou otevíratelnost s výjimkou neděle večer, kdy jsou lidé doma a plánují nadcházející týden. Tehdy skvěle funguje rychlá připomínka končících akcí.
              </p>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Pravidlo 80 / 20 u newsletterů</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nezahlcujte zákazníky pouze akčními slevovými letáky. Pokud budete stále jen volat: „KUPTE SI, MÁME SLEVU!“, lidé se z odběru odhlásí nebo spadnete do složky Hromadné.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dodržujte balanc: **80 % hodnotných rad** (jak pečovat o pleť, jak na lupy, tibetské přírodní rituály) a **20 % prodeje** (krátká zmínka v balíčku a odkaz na konci e-mailu). Zákaznice pak budou maily číst jako milé časopisové tipy od kamarádky.
              </p>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Jak psát předměty, co lidi otevřou?</h4>
              <ul className="text-xs text-slate-500 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-500">✓</span>
                  <span><strong>Zájem/Zvědavost:</strong> „Tajemství hadího tuku se provalilo...“ (Neklaďte hned karty na stůl).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-500">✓</span>
                  <span><strong>Konkrétní otázka:</strong> „Trápí vás ráno oteklé unavené oči?“</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-500">✓</span>
                  <span><strong>Bezpečné doručení:</strong> Nikdy nepište velká písmena ("AKCE!") ani neopakujte vykřičníky, antispamové filtry by vás zablokovaly.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
