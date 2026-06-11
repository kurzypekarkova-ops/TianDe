export interface ProductLineDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  targeting: string[];
  ingredients: string[];
  heroProducts: {
    name: string;
    description: string;
    priceEstimate?: string;
  }[];
  protocol: string[];
  proTip: string;
  expertQuote: string;
}

export const PRODUCT_LINES_DETAILS: Record<string, ProductLineDetail> = {
  "Bio Rehab": {
    id: "bio-rehab",
    name: "Bio Rehab",
    tagline: "Tibetský aktivátor růstu a hustoty vlasů",
    description: "Tradiční a mimořádně oblíbená tibetská receptura vyvinutá pro lidi, které trápí nadměrné padání vlasů, oslabení cibulek a plešatění. Funguje na principu mikrocirkulace krve v pokožce, čímž probouzí spící cibulky k životu.",
    category: "Vlasová péče",
    targeting: [
      "Nadměrné sezónní nebo chronické vypadávání vlasů",
      "Pomalý růst nových vlasů a tvorba koutů",
      "Oslabené, jemné a hladovějící vlasové cibulky",
      "Pokožka hlavy ucpaná nánosy silikonů"
    ],
    ingredients: [
      "Extrakt ze zázvorového kořene (prokrvuje a prohřívá)",
      "Ženšen pravý (silná výživa buněk)",
      "Andělika lékařská (hluboká hydratace)",
      "Houba Ling Zhi (působí jako antioxidant a chrání lesk)"
    ],
    heroProducts: [
      { name: "Šampon-aktivátor Bio Rehab", description: "Jemně čistí bez ucpávání pórů silikony, stimuluje prokrvení pokožky." },
      { name: "Maska-aktivátor Bio Rehab", description: "Hloubkově vyživuje vlasové stvoly a urychluje buněčné dělení." },
      { name: "Tonikum-aktivátor růstu", description: "Bezoplachové kapky s nejvyšší koncentrací aktivních bylin." }
    ],
    protocol: [
      "Šamponem důkladně umyjte vlasy, pěnu nechte na pokožce působit 2-3 minuty, poté opláchněte.",
      "Naneste masku Bio Rehab po celé délce vlasů a na pokožku, zabalte do teplého ručníku na 10 minut a opláchněte.",
      "Do vysušené pokožky hlavy jemně vmasírujte tonikum-aktivátor v místech řídnutí vlasů. Neoplachujte! Používejte denně po dobu 30 dní."
    ],
    proTip: "Tonikum aplikujte ideálně večer před spaním. Masáž pokožky prsty nebo speciálním masážním hřebenem tianDe účinek tibetských bylin až zdvojnásobí.",
    expertQuote: "U řady Bio Rehab vzkazuji všem: vytrvejte! První nové vlásky, které zákaznice nadšeně fotí, se objevují obvykle po 4 až 6 týdnech systematické péče."
  },
  "Hadí řada": {
    id: "hadi-rada",
    name: "Hadí řada (Snake Factor & Snake Oil)",
    tagline: "Lifting bez skalpelu a intenzivní regenerace tkání",
    description: "Legendární tianDe produkty s obsahem pravého hadího tuku a oleje Mamushi. Hadí tuk má jedinečnou schopnost pronikat hluboko do pokožky, hojit poškození, navracet pleti pružnost a vytvářet okamžitou ochrannou bariéru.",
    category: "Intenzivní omlazení & Tělo",
    targeting: [
      "Zralá pleť s hlubokými mimickými vráskami (35-40+)",
      "Popraskaná, extrémně suchá pokožka na rukou a patách",
      "Jizvy po akné, strie a pigmentové nerovnosti",
      "Povadlé kontury obličeje"
    ],
    ingredients: [
      "Tuk z hada Mamushi (vysoce výživné nasycené mastné kyseliny)",
      "Retinol a vitamin E (buňková obnova a elasticity)",
      "Kyselina hyaluronová (hluboké vyplnění vrásek vodou)",
      "Panthenol (zklidnění svědění a šupinek)"
    ],
    heroProducts: [
      { name: "Omlazující krém na obličej Snake Factor", description: "Denní a noční péče s liftingovým efektem a obnovou buněk." },
      { name: "Peeling se zmijí kůží", description: "Šetrný exfoliant, který odstraňuje odumřelé buňky a sjednotí tón pleti." },
      { name: "Regenerační krém na ruce a nohy s hadím tukem", description: "Bestseller na popraskané paty a suché ekzematické ruce." }
    ],
    protocol: [
      "Aplikujte hadí tělový peeling 1-2x týdně na suchou nebo vlhkou pokožku a krouživými pohyby masírujte.",
      "Po vyčištění pleti aplikujte malé množství krému Snake Factor podél masážních linií.",
      "Na noc naneste silnější vrstvu hadího krému na ruce nebo paty a natáhněte bavlněné rukavičky/ponožky pro zábal."
    ],
    proTip: "Krém na nohy s hadím tukem je nejlepší aplikovat ihned po sprše nebo teplé koupeli, dokud je kůže změklá a plně otevřená výživnému tuku.",
    expertQuote: "Hadí olej má molekulární strukturu extrémně blízkou našemu kožnímu mazu. Proto ho lidská pokožka doslova vpije a výsledky na vráskách jsou viditelné okamžitě."
  },
  "Master Herb": {
    id: "master-herb",
    name: "Master Herb",
    tagline: "První pomoc na akné a problematickou pleť",
    description: "Bylinný komplex určený pro boj s akné, nadměrnou tvorbou kožního mazu a záněty. Na rozdíl od agresivních drogerkových přípravků na akné pleť nevysušuje, ale harmonizuje její přirozenou kožní bariéru.",
    category: "Problematická pleť",
    targeting: [
      "Akné dětí i dospělých (hormonální výkyvy)",
      "Nadměrný lesk a ucpané černé tečky",
      "Začervenání a bolestivé podkožní boláky",
      "Jizvičky a tmavé skvrny po zánětech"
    ],
    ingredients: [
      "Šalvěj lékařská (přírodní antibakteriální štít)",
      "Tea Tree olej (dezinfekce a zklidnění zánětu)",
      "Aloe vera (rychlé hojení ran bez jizev)",
      "Zimolez japonský (reducuje zčervenání a otok)"
    ],
    heroProducts: [
      { name: "Čisticí gel na obličej Master Herb", description: "Hloubkově čistí póry, aniž by stahoval nebo dráždil pleť." },
      { name: "Pleťový krém na akné a jizvy", description: "Zabraňuje vzniku nových pupínků a vyhlazuje staré stopy a flíčky." },
      { name: "Bylinné detoxikační náplasti na nohy Master Herb", description: "Základ tělesného detoxu přes noc, odvádí toxiny z lymfy." }
    ],
    protocol: [
      "Každé ráno a večer napěňte gel Master Herb v dlaních s trochou vody a masírujte obličej 1 minutu, opláchněte.",
      "Dočistěte pleť protizánětlivým tonikem z řady Master Herb.",
      "Naneste krém na akné. Na aktivní velké záněty naneste krém lokálně v silné vrstvě a nechte působit jako mapičku."
    ],
    proTip: "Pokud se vám udělá bolavý podkožní pupínek, naneste na něj na noc silnou bodovou vrstvu krému Master Herb. Do rána se zánět buď vstřebá, nebo se výrazně zmenší a zklidní.",
    expertQuote: "Nezapomeňte, že akné je odrazem vnitřního stavu těla. S klienty vždy k vnější péči Master Herb doporučuji i naše očistné náplasti nebo čaj Ostropestřec."
  },
  "EcoDeViva": {
    id: "ecodeviva",
    name: "EcoDeViva",
    tagline: "Zdravá ekologická domácnost a zero-waste péče",
    description: "Ekologická řada určená pro bezpečnou čistotu vašeho domova i pro šetrnou péči o tělo bez zbytečné chemie, parabenů, fosfátů a syntetických pěnidel. Ideální pro rodiny s malými dětmi, ekology a lidi s citlivou nebo atopickou pokožkou.",
    category: "Eko domácnost & Tělo",
    targeting: [
      "Praní a úklid bez dráždivých chemických reziduí",
      "Ochrana citlivé pokožky atopiků a dětí před chemií",
      "Šetrná dentální hygiena bez fluoru a SLS pěnidel",
      "Snížení spotřeby jednorázových plastových lahví s chemií"
    ],
    ingredients: [
      "Saponiny z plodů mýdelníku (přírodní pěnivost a čistota)",
      "Mentol a Minerální soli (přirozená ochrana zubní skloviny)",
      "Kokosový olej (vláčnost a šetrné čištění)",
      "Přírodní enzymy (pro odbourávání mastnoty a skvrn)"
    ],
    heroProducts: [
      { name: "Prací proužky s obsahem mýdlových ořechů", description: "Superkoncentrované a biologicky rozložitelné lístky na praní." },
      { name: "Ekologický mycí prostředek na nádobí z mýdelníku", description: "Zcela přírodní úmrtí mastnoty bez chemie, vhodné i na mytí ovoce." },
      { name: "Zubní gel Tekutý vápník", description: "Bestseller na citlivé zubní krčky a opravu mikrotrhlinek skloviny." }
    ],
    protocol: [
      "Při praní vložte 1 prací proužek EcoDeViva přímo do bubnu pračky (na 4 kg prádla). Pro silné skvrny natrhejte kousek proužku, namočte a naneste přímo na skvrnu před praním.",
      "Při čištění zubů gelem Tekutý vápník použijte minimální množství (velikost hrášku) a čistěte bez velkého tlaku 2 minuty."
    ],
    proTip: "Přírodní mycí gel z mýdelníku je tak skvělý a bezpečný, že v něm můžete klidně umýt jablko nebo jahody z obchodu, abyste je zbavili chemických postřiků a vosků.",
    expertQuote: "Ekologie není luxus, je to zdraví našich dětí. Naše prací proužky neobsahují fosfáty ani chlor, takže prádlo nedráždí kůži a voda z pračky nezatěžuje přírodu."
  },
  "Snail Therapy": {
    id: "snail-therapy",
    name: "Snail Therapy",
    tagline: "Zázrak v podobě intenzivního šnečího mucinu",
    description: "Obnovující kosmetika tianDe s vysokým podílem šnečího sekretu (mucinu). Šnečí mucin je známý svými enormními regeneračními, hydratačními a vyhlazujícími schopnostmi. Je nekomedogenní a vyhovuje všem typům pleti včetně té nejcitlivější.",
    category: "Hloubková hydratace & Obnova",
    targeting: [
      "Dehydrovaná, mdlá pleť bez jasu",
      "Drobná poškození, rozšířené póry a nerovný povrch pleti",
      "Prevence prvních vrásek a povadlosti pleti (25-35+)",
      "Pigmentové skvrny a pozánětlivé flíčky"
    ],
    ingredients: [
      "Šnečí mucin neboli filtrát hlemýždího sekretu (alantoin, kolagen, elastin)",
      "Bambucké máslo (bohatá výživa a zklidnění)",
      "Aloe vera (dlouhotrvající zavlhčení)",
      "Vitamin E (ochrana před oxidativním stresem a stárnutím)"
    ],
    heroProducts: [
      { name: "Vícefunkční krém na obličej se šnečím mucinem", description: "Ochranné sáčky s uzávěrem zaručující sterilitu a čerstvost krému." },
      { name: "Oční krém se šnečím mucinem", description: "Redukuje otoky, tmavé kruhy pod očima a jemné mimické vrásky." }
    ],
    protocol: [
      "Po omytí a tonizaci pleti vytlačte malé množství šnečího krému ze sáčku.",
      "Konečky prstů jemně vklepejte krém do pokožky, dokud nevznikne tenká vrstvička. Krém má lehkou táhlou texturu.",
      "Nechte 2 minuty vstřebat před nanesením make-upu."
    ],
    proTip: "Šnečí řadu tianDe balí do praktických sáčků s uzávěrem ze záměrného důvodu. Šnečí mucin je náchylný k oxidaci, toto balení jej chrání před vzduchem i bakteriemi z prstů a krém tak zůstává aktivní až do poslední kapky.",
    expertQuote: "Šnečí řada je náš tajný tip pro nevěsty nebo před důležitou akcí. Udělá během 2 dnů tak hydratovanou a zářivou pleť, že make-up na ní vypadá naprosto bezchybně."
  },
  "Fucoidan": {
    id: "fucoidan",
    name: "Fucoidan",
    tagline: "Mořská energie a omlazení buněk 35+",
    description: "Kosmetika s obsahem fukoidanu – unikátního polysacharidu získaného z mořské řasy Kombu. Fukoidan mobilizuje kmenové buňky pokožky k vlastní regeneraci, nastartuje syntézu kolagenu a poskytuje nadstandardní věkovou péči.",
    category: "Exkluzivní omlazení",
    targeting: [
      "Ztráta pevnosti, elasticity a jasu pokožky (35+)",
      "První hlubší vrásky na čele a kolem úst",
      "Dehydratace způsobená suchým vzduchem, klimatizací",
      "Drobná podráždění a citlivost pleti"
    ],
    ingredients: [
      "Fukoidan z mořských řas (buněčná omlazující injekce)",
      "Kyselina hyaluronová (vázání a udržení vlhkosti)",
      "Beta-glukan (podpora přirozené imunity pokožky)",
      "Kolagen a mravenčí řasa (vypnutí obličejového oválu)"
    ],
    heroProducts: [
      { name: "Čisticí pleťové mléko a tonikum Fucoidan", description: "Odstraňuje nečistoty a současně hydratuje ve dvou krocích." },
      { name: "Omlazující krém na obličej a dekolt", description: "Lehký, luxusní krém, který nezanechává mastný film, vyplňuje kontury." },
      { name: "Tónovací CC krém Fucoidan", description: "Dokonale se přizpůsobí barvě pleti, sjednotí ji a vyživí." }
    ],
    protocol: [
      "Ráno i večer naneste malé množství čisticího mléka Fucoidan na vatový tampon a jemně očistěte obličej.",
      "Naneste krém Fucoidan na obličej, krk i dekolt. Nezapomínejte na dekolt, mívá tenkou kůži nejvíce náchylnou ke stárnutí.",
      "Pro ranní péči naneste CC krém, který funguje jako sjednocující péče s hedvábným texturovaným finišem."
    ],
    proTip: "CC krém z řady Fucoidan neucpává póry a dokáže nahradit těžký make-up. Pleť pod ním volně dýchá a má nádherně přirozený fresh efekt.",
    expertQuote: "Fukoidan je vědecky potvrzená složka, která u řas chrání jejich listy před vyschnutím při odlivu. Totéž dělá pro lidskou pleť – uzamkne vodu pod povrchem."
  },
  "Tibetan Herbs": {
    id: "tibetan-herbs",
    name: "Tibetan Herbs",
    tagline: "Moudrost tibetských klášterů pro pevnost pleti 35+",
    description: "Prémiová bylinná řada založená na tibetské bylinkářské filozofii a receptech sbíraných vysoko v horách. Určena pro pleť, která vykazuje známky únavy, povadlosti a potřebuje komplexní výživu, detox a obranu před smogem.",
    category: "Přírodní omlazení",
    targeting: [
      "Unavená, šedavá a stresovaná pleť (35+)",
      "Lokalizované vrásky a rýhy",
      "Ochabnutí a povadlé kontury v okolí čelistí"
    ],
    ingredients: [
      "Cordyceps / Housenice čínská (legendární adaptogen a zdroj energie)",
      "Šafrán setý (silný přírodní antioxidant, rozjasňuje)",
      "Extrakt z ženšenu (tonizace a prokrvení buněk)",
      "Vilín viržinský (zjemňuje texturu a stahuje póry)"
    ],
    heroProducts: [
      { name: "Vícestupňový vyživující krém proti vráskám", description: "Intenzivní výživa pro obnovu hluboké struktury pleti." },
      { name: "Jemné peelingové mléko Tibetan Herbs", description: "Rozpouští nečistoty a jemně leští šupinky, pleti dodá hedvábnost." },
      { name: "Multiaktivní oční krém Tibetan Herbs", description: "Cílená péče na jemnou zónu s obsahem housenice čínské." }
    ],
    protocol: [
      "Vyčistěte pleť a 1-2x týdně použijte jemné peelingové mléko. Masírujte suše, dokud se peeling nesroluje, pak opláchněte.",
      "Naneste multiactivní oční krém poklepáním bříškem prsteníčku na oční kost.",
      "Rozetřete výživný krém na celý obličej a nechte ho zapůsobit. Skvělý podklad pod minerální pudry."
    ],
    proTip: "Při aplikaci očního krému poklepávejte kůži bříškem prsteníčku. Je to nejslabší prst na ruce, nevyvine přílišný tlak a nezpůsobí vytahování citlivé kůže kolem očí.",
    expertQuote: "Housenice čínská (Cordyceps) v tibetské bylinné řadě působí jako energetická bomba pro zvadlé buňky pleti. Probouzí buněčnou aktivitu do hloubky."
  },
  "Vita Derm": {
    id: "vita-derm",
    name: "Vita Derm",
    tagline: "První pomoc pro přecitlivělou pleť a ekzémy",
    description: "Fytonástroj speciálně vyvinutý pro extrémně citlivou pokožku, která okamžitě reaguje zčervenáním, pálením, pnutím nebo šupinkami. Chrání pleť před nepříznivými vlivy počasí, topením a obnovuje narušenou bariérovou funkci pokožky.",
    category: "Zklidnění & Citlivá pleť",
    targeting: [
      "Projevy rosacey (růžovky) a viditelné červené žilky",
      "Suché, svědivé ekzematické mapy v obličeji",
      "Alergické reakce na běžnou kosmetiku",
      "Podráždění po slunci, mrazu, suchém vzduchu"
    ],
    ingredients: [
      "Patentované zklidňující bylinné komplexy (Heřmánek, lékořice, rozmarýn)",
      "Beta-glukan (obnovuje narušený imunitní film pokožky)",
      "Kyselina hyaluronová (bezpečná, lehce stravitelná hydratace)",
      "Panthenol (okamžitá úleva od svědění, tlumení zánětu)"
    ],
    heroProducts: [
      { name: "Zklidňující čistící pěna Vita Derm", description: "Ultra jemná pěna bez mýdla a parabenů, neštípe a nevysušuje." },
      { name: "Zklidňující toner na obličej", description: "Hustá konzistence, která funguje jako tekutý obvaz na podrážděnou kůži." },
      { name: "Zklidňující krém na obličej", description: "Snižuje hypercitlivost a zabraňuje vzniku zarudnutí." }
    ],
    protocol: [
      "Umyjte obličej chladnější vodou s pumpnutím zklidňující pěny Vita Derm, opláchněte a jemně vysušte přiložením čistého ručníku.",
      "Dlaněmi naneste 2-3 kapky toneru přímo na obličej (bez vatového tamponu, aby nedošlo k mechanickému tření).",
      "Jemně rozetřete zklidňující krém Vita Derm. Používejte ráno i večer."
    ],
    proTip: "Pokud trpíte na červenající tváře (rosacea), nepoužívejte horkou vodu při koupeli a zapomeňte na abrazivní peelingy. Vita Derm toner s beta-glukanem pleti dodá potřebné zklidnění, pokud jej necháte vychladit v ledničce.",
    expertQuote: "Vita Derm je záchrana. Pokud klientka hlásí, že ji pálí ze všeho kůže a bojí se vyzkoušet cokoliv nového, Vita Derm je jediná bezpečná startovací volba!"
  },
  "Active Life": {
    id: "active-life",
    name: "Active Life",
    tagline: "Zdraví z čistých tibetských hor pro aktivní dny",
    description: "Produktový segment zaměřený na udržení vitálního těla, fitness a kloubní úlevu. Vychází z myšlenky, že aktivní životní styl a prevence opotřebení těla tvoří klíč k dlouhověkosti.",
    category: "Zdraví & Tělo",
    targeting: [
      "Ztuhlost zad, šíje a kloubů po celém dni u počítače",
      "Svalová únava po cvičení nebo těžké fyzické práci",
      "Pravidelný pohyb bez bolesti",
      "Tělesná harmonizace žen i mužů"
    ],
    ingredients: [
      "Mentol a kafr (okamžité zchlazení a uvolnění stažených svalů)",
      "Výtažek z jedle sibiřské (podpora regenerace chrupavek)",
      "Rozmarýnový olej (prokrvuje a uvolňuje spazmy)",
      "Altajské byliny (pro celkovou fytoobranu těla)"
    ],
    heroProducts: [
      { name: "Fytodráždicí masážní gel Orthophyt", description: "Bestseller s hřejivým tónem na ztuhlá záda, šíji a klouby." },
      { name: "Kloubní gel tekutá náplast s kafrem", description: "Chladivě-hřejivý zážitek na lokty, ramena, zápěstí a kolena." },
      { name: "Intimní bylinné vložky Energie bylin", description: "Fytomembrány s obsahem 49 bylin pro intimní hygienu a pohodu." }
    ],
    protocol: [
      "Při bolesti nebo ztuhlosti zad naneste a vmasírujte gel Orthophyt krouživými pohyby 2-3x denně.",
      "Kloubní kolena ošetřete natřením gelu tekuté náplasti s obsahem mentolu a přikryjte na 15 minut teplým suchým ručníkem."
    ],
    proTip: "Orthophyt masážní gel je vynikající nahoře na krční páteř, když vás ze sezení začíná bolet hlava. Obsahuje kafr, který velmi rychle prokrví stažené šíjové svaly a uleví tlaku.",
    expertQuote: "Active Life řada ukazuje skutečnou sílu tianDe. Výrobky fungují lokálně a doručí úlevu hned do několika minut, což potvrzuje 9 z 10 sportovců v mém týmu."
  },
  "Altai Sacral": {
    id: "altai-sacral",
    name: "Altai Sacral",
    tagline: "Sacrální bylinná kosmetika s energií čistého Altaje",
    description: "Série výrobků pro péči o ruce, nohy, pokožku těla a bylinné čaje postavená na tradičním altajském léčitelství a sběru divoce rostoucích chráněných bylin z nedotčeného koutu planety.",
    category: "Tělesná harmonie & Čaje",
    targeting: [
      "Únava organismu a přemíra toxinů",
      "Oslabená imunita a zhoršené trávení",
      "Suchá pnoucí kůže celého těla",
      "Otoky nohou a slabé kapiláry"
    ],
    ingredients: [
      "Extrakt ze včelího vosku (vláčnost a hluboká ochrana kůže)",
      "Fytočaje z divokých altajských bylin (Ostropestřec, Šípek, Měsíček)",
      "Prorostlík čínský (přírodní podpora jaterních buněk)",
      "Olej z rakytníku (enormní vitaminový koktejl pro suchou pokožku)"
    ],
    heroProducts: [
      { name: "Bylinné fytočaje Altai Sacral (Játra, Ledviny, Cévy)", description: "Originální balení bylinných porcovaných sáčků ze srdce Altaje." },
      { name: "Altajský krém na ruce s medem a včelím voskem", description: "Hutná, sladce vonící ochrana namáhané pokožky rukou." }
    ],
    protocol: [
      "Uvařte si šálek fytočaje: 1 sáček zalijte 200 ml vroucí vody, nechte 10-15 minut louhovat. Popíjejte teplé, ideálně nalačno nebo mezi jídly.",
      "Bylinné krémy nanášejte v tenké vrstvě na pokožku těla několikrát denně podle pocitu suchosti."
    ],
    proTip: "Bylinné čaje tianDe nikdy nezalévejte právě vroucí vodou (100°C), abyste neponičili citlivé silicové sloučeniny. Nechte uvařenou vodu 2-3 minuty odstát na cca 85°C a pak teprve zalijte.",
    expertQuote: "V altajské přírodě roste množství bylin, které nikde jinde na světě nenajdeme. Řada Altai Sacral otevírá dveře k této čisté energii každé české domácnosti."
  },
  "Dr. Taiga": {
    id: "dr-taiga",
    name: "Dr. Taiga",
    tagline: "Mrazivá síla sibiřské tajgy pro celou rodinu",
    description: "Účinné kosmetické a léčebné produkty s obsahem planě rostoucích tajžských bylin, jehličí, pryskyřice a lesních bobulí. Výrobky jsou vytvořeny pro náročné severské podmínky na základě tisíciletých sibiřských medicínských rad.",
    category: "Rodinná přírodní lékárna",
    targeting: [
      "Krvácející dásně, slabá zubní sklovina, zápach z úst",
      "Suché vlasy, lupy, podrážděná vlasová pokožka",
      "Ztuhlost a otoky pohybového aparátu",
      "Suché a trhlinkové rty a lícní kosti v mrazu"
    ],
    ingredients: [
      "Pryskyřice sibiřské jedle (silné dezinfekční a hojivé účinky)",
      "Bylinný komplex Taiga (dubová kůra, kopřiva, šalvěj)",
      "Olej ze sibiřského cedru (hluboká regenerace, lesk a výživa)",
      "Bobule jalovce (antiseptikum a podpora mikrocirkulace)"
    ],
    heroProducts: [
      { name: "Přírodní fytogel na zuby Dr. Taiga", description: "Zubní gel s pryskyřicí na zpevnění krvácejících dásní a ochranu skloviny." },
      { name: "Sibiřský šampon a balzám Dr. Taiga", description: "Dodává objem, lesk a sílu matným unaveným vlasům." },
      { name: "Hřejivý tělový gel Sibiřský oheň", description: "Zateplující kúra Dr. Taiga na svalové klouby po prochladnutí." }
    ],
    protocol: [
      "Čistěte zuby gelovou pastou Dr. Taiga ráno i večer po dobu minimálně 2 minut s měkkým zubním kartáčkem tianDe.",
      "Sibiřský šampon naneste na mokré vlasy, promasírujte kořínky, nechte 1 minutu působit, smyjte vodou a naneste sibiřský balzám."
    ],
    proTip: "Při nachlazení nebo promrznutí si natřete hřejivý gel Sibiřský oheň na chodidla a navlékněte teplé ponožky. Sibiřské byliny vás okamžitě prohřejí a zabrání rozvoji rýmy.",
    expertQuote: "Dr. Taiga je naše sibiřská lékárnička. Když zkolabuje imunita nebo začnou krvácet dásně, březová kůra a jehličnatá pryskyřice to spraví za pár dní."
  },
  "Collagen Active": {
    id: "collagen-active",
    name: "Collagen Active",
    tagline: "Kolagenový restart a zpevnění obličejového oválu 35+",
    description: "Revoluční liftingová řada založená na hydrolyzovaném kolagenu s nízkou molekulární hmotností. Ten dokáže pronikat skrz svrchní vrstvu pokožky a propojovat povadlá kolagenová vlákna. Výsledkem je výrazné zpevnění kontur a mladistvý tón pleti.",
    category: "Lifting & Vyplnění",
    targeting: [
      "Povadlá pleť, ztráta pevnosti kontur (tzv. syslíky) 35-40+",
      "Hluboké nosonásledné rýhy",
      "Unavená vysušená pleť s mikrovráskami",
      "Nedostatek vlastního kolagenu"
    ],
    ingredients: [
      "Hydrolyzovaný mořský kolagen (stavební kámen, elasticity)",
      "Kyselina hyaluronová (syté provlhčení a struktura)",
      "Aloe vera (hojení a zklidnění, prokrvení buněk)",
      "Výtažek z vilínu (regulace pórů, vyhlazení povrchu)"
    ],
    heroProducts: [
      { name: "Modelující gel na ovál obličeje Collagen Active", description: "Bestseller, který zpevňuje kontury brady a tváří." },
      { name: "Zpevňující oční krém proti vráskám", description: "Vyplňuje jemné linky pod očima, ulevuje od únavy." },
      { name: "Zpevňující liftingový krém na obličej", description: "Denní krém, který tvoří neviditelný stahující korzet pleti." }
    ],
    protocol: [
      "Po omytí pleti naneste malé množství modelujícího gelu na kontury obličeje (brada, spodní čelist, krk) zdola nahoru.",
      "Po vstřebání gelu aplikujte zpevňující liftingový krém Collagen Active lehkými krouživými pohyby.",
      "Oční okolí ošetřete očním krémem z téže řady, pohybujte se od vnějšího koutku očí k vnitřnímu."
    ],
    proTip: "Modelující gel na ovál obličeje nanášejte vždy pevnými tahy směrem nahoru, od klíčních kostí až k čelistem. Tím bojujete proti gravitaci, která kůži stahuje dolů.",
    expertQuote: "Kolagen se po 35. roce věku v těle tvoří o polovinu méně. Dodáním hydrolyzovaného kolagenu v řadě Collagen Active vrátíte pleti pružnost do několika dnů bez drahých jehel."
  }
};
