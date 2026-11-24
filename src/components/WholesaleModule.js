import React, { useState, useMemo } from 'react';
import wholesaleData from '../data/wholesaleData.json';
import { getWhatsAppUrl } from '../config';

const {
  farmLots: FARM_LOTS = [],
  groceryMills: GROCERY_MILLS = [],
  buyerRequirements: BUYER_REQUIREMENTS = []
} = wholesaleData;

const B2B_GOVT_PORTALS = [
  { label: 'e-NAM தேசிய வேளாண் சந்தை (Live Mandi)', url: 'https://www.enam.gov.in/' },
  { label: 'தமிழ்நாடு தினசரி மண்டி விலை (TNAU Agritech)', url: 'https://agritech.tnau.ac.in/' },
  { label: 'FSSAI உணவு உரிமம் (FoSCoS Portal)', url: 'https://foscos.fssai.gov.in/' },
  { label: 'GST & e-Way Bill போர்ட்டல்', url: 'https://ewaybillgst.gov.in/' },
  { label: 'APEDA வேளாண் ஏற்றுமதி பதிவு', url: 'https://apeda.gov.in/' },
  { label: 'GeM அரசு கொள்முதல் தளம் (B2G)', url: 'https://gem.gov.in/' }
];

export default function WholesaleModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('agri_lots'); // 'agri_lots' | 'rice_grocery' | 'buyer_board' | 'margin_calc' | 'logistics_calc' | 'compliance'
  const [searchQuery, setSearchQuery] = useState('');

  // சரக்கு கால்குலேட்டர்
  const [cargoWeight, setCargoWeight] = useState(3);
  const [distanceKm, setDistanceKm] = useState(120);

  // மொத்த விற்பனை லாபக் கணிப்பான் (Wholesale Margin Calculator)
  const [buyPrice, setBuyPrice] = useState(1450);
  const [transportPerUnit, setTransportPerUnit] = useState(40);
  const [sellPrice, setSellPrice] = useState(1720);
  const [orderQty, setOrderQty] = useState(50);

  // லீட் படிவம்
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    district: '',
    intent: 'விளைபொருட்கள் மொத்த கொள்முதல்',
    details: 'ஆரணி அரிசி 50 மூட்டை தேவை'
  });
  const [loading, setLoading] = useState(false);

  // தேடல் ஃபில்டர்
  const filteredFarmLots = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return FARM_LOTS;
    return FARM_LOTS.filter(
      (lot) =>
        lot.name?.toLowerCase().includes(q) ||
        lot.location?.toLowerCase().includes(q) ||
        lot.tag?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredMills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return GROCERY_MILLS;
    return GROCERY_MILLS.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // சரக்கு வாகனம் & வாடகை உத்தேசக் கணக்கீடு
  const freightEstimate = useMemo(() => {
    let vehicle = 'டாடா ஏஸ் / பொலிரோ பிக்கப் (2 டன் வரை)';
    let baseRate = 28;
    if (cargoWeight > 2 && cargoWeight <= 6) {
      vehicle = 'ஐச்சர் / 14 அடி மினி லாரி (6 டன் வரை)';
      baseRate = 42;
    } else if (cargoWeight > 6) {
      vehicle = '10 சக்கர / 16 டன் கனரக லாரி';
      baseRate = 65;
    }
    const totalFreight = distanceKm * baseRate + 1200;
    const returnTruckSaving = Math.round(totalFreight * 0.28);
    return { vehicle, totalFreight, returnTruckSaving };
  }, [cargoWeight, distanceKm]);

  // லாபக் கணக்கீடு
  const marginStats = useMemo(() => {
    const landedCost = (Number(buyPrice) || 0) + (Number(transportPerUnit) || 0);
    const unitProfit = (Number(sellPrice) || 0) - landedCost;
    const totalProfit = unitProfit * (Number(orderQty) || 0);
    const totalInvestment = landedCost * (Number(orderQty) || 0);
    const marginPercent = landedCost > 0 ? ((unitProfit / landedCost) * 100).toFixed(1) : '0.0';
    return { landedCost, unitProfit, totalProfit, totalInvestment, marginPercent };
  }, [buyPrice, transportPerUnit, sellPrice, orderQty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.phone || leadForm.phone.length < 10) {
      alert('சரியான 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்.');
      return;
    }

    setLoading(true);

    try {
      fetch(
        'https://script.google.com/macros/s/AKfycbyxE0I9sjVKMTU21gHXZB0YKKbWNIKD7CzSh0M0qvfkHhORCw53YMBZX1nKCB1AcSAu/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadForm.name || 'மொத்த வணிகர்',
            phone: leadForm.phone,
            village: leadForm.district || 'தமிழ்நாடு',
            taluk: leadForm.intent,
            surveyNo: `விவரம்: ${leadForm.details} | பிரிவு: ${activeTab.toUpperCase()}`,
            feeStatus: 'B2B Wholesale Verified Inquiry',
            status: 'Wholesale B2B Order'
          })
        }
      );
    } catch (err) {
      console.log('CRM Syncing...');
    }

    const msg = `வணக்கம் நம்ம பூமி 360! நான் 360° B2B மொத்த வர்த்தக மையத்தில் இணைய விரும்புகிறேன்.\n\n👤 பெயர்: ${leadForm.name || '-'}\n📱 எண்: ${leadForm.phone}\n📍 மாவட்டம்: ${leadForm.district || '-'}\n🎯 நோக்கம்: ${leadForm.intent}\n📦 தேவை/விற்பனை விவரம்: ${leadForm.details}\n\nவிலைப்பட்டியல், தர்மகாண்டா எடை சரிபார்ப்பு மற்றும் மாதிரி பார்சல் (Sample Bag) விவரங்களை அனுப்பவும்.`;
    const waUrl = getWhatsAppUrl(msg);

    setTimeout(() => {
      setLoading(false);
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* 1. முதன்மை பேனர் */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/50 via-slate-900/90 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 rounded-full">
              360° B2B கமாடிட்டி எக்ஸ்சேஞ்ச் • 0% இடைத்தரகர் கமிஷன்
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              மொத்த விற்பனை, நேரடி ஆலை & மண்டி B2B மையம்
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              பண்ணை வாசல் விளைபொருட்கள், நேரடி அரிசி & பருப்பு ஆலைகள், வாங்குவோர் தேவைகள் பலகை, B2B லாபக் கணிப்பான் மற்றும் ரிட்டர்ன் லாரி நெட்வொர்க்.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-amber-500/30">
            <span className="text-3xl">⚖️</span>
            <div className="text-xs">
              <span className="text-amber-400 font-bold block">100% தர்மகாண்டா எடை</span>
              <span className="text-slate-100 text-[11px]">FSSAI & GST e-Way சட்டமுறை பாதுகாப்பு</span>
            </div>
          </div>
        </div>

        {/* 2. 6-பிரிவு 360° நேவிகேஷன் டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('agri_lots')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'agri_lots'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🌾 1. பண்ணை வாசல் லாட்கள் ({FARM_LOTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rice_grocery')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rice_grocery'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏪 2. நேரடி ஆலை அரிசி & மளிகை ({GROCERY_MILLS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('buyer_board')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'buyer_board'
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            📢 3. வாங்குவோர் தேவைகள் ({BUYER_REQUIREMENTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('margin_calc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'margin_calc'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            💰 4. B2B லாபக் கணிப்பான்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logistics_calc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logistics_calc'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🚛 5. லாரி வாடகை கணிப்பான்
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compliance')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'compliance'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-100 hover:text-white border border-slate-800'
            }`}
          >
            🏛️ 6. FSSAI, GST & அரசு மண்டி
          </button>
        </div>

        {/* தேடல் பார் (Tab 1 & 2-க்கு மட்டும்) */}
        {(activeTab === 'agri_lots' || activeTab === 'rice_grocery') && (
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 பொருள் அல்லது ஊர் பெயரைத் தேடுக (எ.கா: தேங்காய், ஆரணி, பொன்னி, விருதுநகர்)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-200 hover:text-white shrink-0 cursor-pointer"
              >
                ✕ அழி
              </button>
            )}
          </div>
        )}

        {/* 3. டேப் வாரியான உள்ளடக்கங்கள் */}
        <div className="mt-6">
          {/* TAB 1: பண்ணை வாசல் நேரடி விளைபொருட்கள் */}
          {activeTab === 'agri_lots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">தோட்டத்திலிருந்து நேரடியாக மொத்த கொள்முதல்</span>
                <span className="text-[11px] text-slate-100">இடைத்தரகர் கமிஷன்: 0%</span>
              </div>

              {filteredFarmLots.length === 0 ? (
                <div className="p-6 text-center bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  தேடிய பொருள் இல்லை. கீழே உள்ள படிவத்தில் உங்கள் தேவையைப் பதிவு செய்தால் 2 மணி நேரத்தில் ஏற்பாடு செய்கிறோம்.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFarmLots.map((lot) => (
                    <div
                      key={lot.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30 rounded">
                            {lot.tag}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1.5">{lot.name}</h4>
                          <span className="text-[11px] text-slate-100">📍 {lot.location}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-amber-400 block">{lot.price}</span>
                          <span className="text-[10px] text-slate-200">MOQ: {lot.moq}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                        <div>
                          <span className="text-[10px] text-slate-100 block">கையிருப்பு அளவு:</span>
                          <span className="font-bold text-white">{lot.qty}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-100 block">தரம் & ஈரப்பதம்:</span>
                          <span className="font-bold text-emerald-400">{lot.moisture}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="text-slate-100 truncate max-w-[180px]">🤝 {lot.fpo}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setLeadForm({
                              ...leadForm,
                              intent: 'விளைபொருட்கள் மொத்த கொள்முதல்',
                              details: `${lot.name} - ${lot.qty} (${lot.location})`
                            });
                            document.getElementById('wholesale-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all cursor-pointer"
                        >
                          விலை பேசி வாங்க ↗
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: நேரடி ஆலை அரிசி & மொத்த மளிகை */}
          {activeTab === 'rice_grocery' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-xs text-slate-300">
                💡 <strong>மளிகைக் கடைகள் & ஹோட்டல்களுக்கு:</strong> உள்ளூர் சில்லறை மண்டிகளை விட ஆலைகளில் நேரடியாக 25 முதல் 50 மூட்டைகள் வாங்கும் போது ஒரு மூட்டைக்கு ₹150 முதல் ₹300 வரை மிச்சமாகிறது.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMills.map((item) => (
                  <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-emerald-400">FSSAI: {item.fssai}</span>
                        <h4 className="text-sm font-bold text-white mt-1">{item.name}</h4>
                        <span className="text-[11px] text-slate-100">🏭 {item.location} ({item.bagSize})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-100 block">நேரடி ஆலை விலை:</span>
                        <span className="text-sm font-bold text-amber-400">{item.millPrice}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-100 block">உள்ளூர் மண்டி:</span>
                        <span className="text-xs font-semibold text-slate-100 line-through">{item.localMarket}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-100 block">குறைந்தபட்சம் (MOQ):</span>
                        <span className="text-xs font-bold text-white">{item.moq}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-100">📦 மாதிரி பார்சல் (Sample Pack) வழங்கப்படும்</span>
                      <button
                        type="button"
                        onClick={() => {
                          setLeadForm({
                            ...leadForm,
                            intent: 'நேரடி ஆலை அரிசி & பருப்பு கொள்முதல்',
                            details: `${item.name} (${item.bagSize}) - ${item.location}`
                          });
                          document.getElementById('wholesale-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer"
                      >
                        நேரடி ஆலை ஆர்டர் ↗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: வாங்குவோர் தேவைகள் பலகை */}
          {activeTab === 'buyer_board' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">பெரிய வணிக நிறுவனங்கள் & ஏற்றுமதியாளர்களின் நேரடித் தேவைகள்</span>
                <span className="text-[11px] text-slate-100">உடனடி விநியோகம் செய்பவர்கள் தொடர்பு கொள்ளலாம்</span>
              </div>

              <div className="space-y-3">
                {BUYER_REQUIREMENTS.map((req) => (
                  <div
                    key={req.id}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{req.buyer}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">
                          Escrow தயார்
                        </span>
                      </div>
                      <div className="text-xs text-amber-400 font-semibold">
                        தேவைப்படும் பொருள்: {req.item} — <span className="text-white">{req.needQty}</span>
                      </div>
                      <div className="text-[11px] text-slate-100">
                        📍 டெலிவரி இடம்: {req.location} | காலம்: {req.timeline}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                      <div className="text-right">
                        <span className="text-xs text-slate-100 block">கொள்முதல் பட்ஜெட்:</span>
                        <span className="text-sm font-black text-white">{req.targetPrice}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLeadForm({
                            ...leadForm,
                            intent: 'எனது விளைபொருளை பல்க்காக விற்க விரும்புகிறேன்',
                            details: `சப்ளை: ${req.item} (${req.needQty}) -> வாங்குபவர்: ${req.buyer}`
                          });
                          document.getElementById('wholesale-crm-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer"
                      >
                        நான் சப்ளை செய்கிறேன் ↗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: B2B மொத்த விற்பனை லாப & மார்ஜின் கணிப்பான் */}
          {activeTab === 'margin_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-emerald-400">
                  💰 வியாபாரிகள் & கடைக்காரர்களுக்கான B2B லாபக் கணிப்பான்
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">ஆலை கொள்முதல் விலை (₹ / மூட்டை):</label>
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">வண்டி வாடகை & கூலி (₹ / மூட்டை):</label>
                    <input
                      type="number"
                      value={transportPerUnit}
                      onChange={(e) => setTransportPerUnit(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">உங்கள் விற்பனை விலை (₹ / மூட்டை):</label>
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">கொள்முதல் அளவு (மூட்டைகள்):</label>
                    <input
                      type="number"
                      value={orderQty}
                      onChange={(e) => setOrderQty(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/50 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400">நிகர வியாபார லாப மதிப்பீடு</span>
                  <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">மொத்த முதலீடு:</span>
                      <span className="text-base font-black text-white">
                        ₹{marginStats.totalInvestment.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">1 மூட்டை நிகர லாபம்:</span>
                      <span className="text-base font-black text-amber-400">
                        ₹{marginStats.unitProfit.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30">
                      <span className="text-emerald-300 block text-[10px]">மொத்த நிகர லாபம்:</span>
                      <span className="text-lg font-black text-emerald-400">
                        ₹{marginStats.totalProfit.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">லாப சதவீதம் (ROI):</span>
                      <span className="text-lg font-black text-cyan-400">{marginStats.marginPercent}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300">
                  💡 நேரடி ஆலை கொள்முதல் மூலம் இடைத்தரகர் கமிஷன் இல்லாமல் உங்கள் லாப வரம்பை அதிகரிக்கலாம்.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: சரக்கு & லாரி வாடகை கணிப்பான் */}
          {activeTab === 'logistics_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    சரக்கின் உத்தேச எடை: {cargoWeight} டன்
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={cargoWeight}
                    onChange={(e) => setCargoWeight(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-900"
                  />
                  <div className="flex justify-between text-[10px] text-slate-200">
                    <span>1 டன் (மினி பிக்கப்)</span>
                    <span>6 டன் (வேன்)</span>
                    <span>15 டன் (லாரி)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    பயண தூரம்: {distanceKm} கி.மீ
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="10"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-900"
                  />
                  <div className="flex justify-between text-[10px] text-slate-200">
                    <span>20 கி.மீ</span>
                    <span>300 கி.மீ</span>
                    <span>600 கி.மீ</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-amber-400">பரிந்துரைக்கப்படும் சரக்கு வாகனம்</span>
                  <h3 className="text-base font-black text-white mt-1">{freightEstimate.vehicle}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-100 block text-[10px]">உத்தேச லாரி வாடகை:</span>
                    <span className="text-base font-black text-white">
                      ₹ {freightEstimate.totalFreight.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-100 block text-[10px]">ரிட்டர்ன் லாரி சேமிப்பு:</span>
                    <span className="text-base font-black text-emerald-400">
                      ₹ {freightEstimate.returnTruckSaving.toLocaleString('en-IN')} மிச்சம்
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-slate-300">
                  🚛 <strong>நம்ம பூமி Jobs Hub இணைப்பு:</strong> உங்கள் சரக்கை ஏற்ற உள்ளூர் சரிபார்க்கப்பட்ட சரக்கு ஓட்டுநர்களை நொடியில் இணைக்கிறோம்.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: அரசு நெறிமுறைகள் & அதிகாரப்பூர்வ மண்டி/GST இணைப்புகள் */}
          {activeTab === 'compliance' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block">1. FSSAI & சட்டமுறை எடையியல்</span>
                  <p className="text-slate-300 leading-relaxed">
                    பதப்படுத்தப்பட்ட எண்ணெய், அரிசி, மசாலா பொருட்களுக்கு 14 இலக்க FSSAI எண் கட்டாயம். பைகளில் நிகர எடை (Net Wt) மற்றும் பேக்கிங் தேதி அச்சிடப்பட்டிருக்க வேண்டும்.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block">2. GST & e-Way Bill விதி</span>
                  <p className="text-slate-300 leading-relaxed">
                    முத்திரையிடப்படாத அசல் விவசாய விளைபொருட்களுக்கு 0% ஜிஎஸ்டி (வரிவிலக்கு). சரக்கின் மதிப்பு ₹50,000 தாண்டினால் வணிக வரித்துறை e-Way Bill கட்டாயம்.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">3. தர்மகாண்டா எடை & ஈரப்பதம்</span>
                  <p className="text-slate-300 leading-relaxed">
                    களத்தில் ஏற்றும்போதும், இறங்கும் இடத்திலும் அரசு சான்றளிக்கப்பட்ட கணினி எடை ரசீது (Weighbridge Slip) மற்றும் ஈரப்பத அளவு 12% உள்ளதா எனச் சரிபார்க்கப்படுகிறது.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">4. கிட்டங்கி ரசீது கடன் (e-NWR)</span>
                  <p className="text-slate-300 leading-relaxed">
                    அறுவடை காலத்தில் விலை வீழ்ச்சி ஏற்பட்டால், ஒழுங்குமுறை விற்பனைக்கூட குடோனில் பொருளை வைத்துவிட்டு வங்கியிலிருந்து 70% வரை அடமானக் கடன் பெறலாம்.
                  </p>
                </div>
              </div>

              {/* 6 அதிகாரப்பூர்வ அரசு மண்டி & வர்த்தக இணையதளங்கள் */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
                <span className="text-xs font-bold text-emerald-400 block">
                  🏛️ அதிகாரப்பூர்வ அரசு மண்டி, FSSAI, GST & ஏற்றுமதி இணையதளங்கள்:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {B2B_GOVT_PORTALS.map((portal) => (
                    <a
                      key={portal.url}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 px-3 py-2 rounded-lg text-[11px] text-slate-200 hover:text-emerald-300 transition"
                    >
                      <span>{portal.label}</span>
                      <span className="text-emerald-400 font-bold shrink-0">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. B2B சிஆர்எம் படிவம் */}
        <form id="wholesale-crm-form" onSubmit={handleSubmit} className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <span>📦</span> B2B நேரடி கொள்முதல் / விற்பனை ஆணைக்கு பதிவு செய்யவும்:
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold cursor-pointer"
            >
              🖨️ A4 விலைப்பட்டியல் பிரிண்ட்
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="உங்கள் பெயர் / நிறுவனம்"
              value={leadForm.name}
              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="வாட்ஸ்அப் எண் *"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value.replace(/\D/g, '') })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="மாவட்டம் (எ.கா: கோவை / சென்னை)"
              value={leadForm.district}
              onChange={(e) => setLeadForm({ ...leadForm, district: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <select
              value={leadForm.intent}
              onChange={(e) => setLeadForm({ ...leadForm, intent: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="விளைபொருட்கள் மொத்த கொள்முதல்">🌾 விளைபொருட்கள் மொத்த கொள்முதல்</option>
              <option value="நேரடி ஆலை அரிசி & பருப்பு கொள்முதல்">🏪 நேரடி ஆலை மளிகை ஆர்டர்</option>
              <option value="எனது விளைபொருளை பல்க்காக விற்க விரும்புகிறேன்">📢 விளைபொருளை விற்க பதிவு</option>
              <option value="மாதிரி பார்சல் பெற விரும்புகிறேன் (Sample Kit)">📦 தரப் பரிசோதனைக்கு மாதிரி பார்சல் பெற</option>
              <option value="சரக்கு லாரி முன்பதிவு">🚛 சரக்கு லாரி முன்பதிவு</option>
            </select>
          </div>

          <div className="mt-2">
            <input
              type="text"
              placeholder="தேவைப்படும் அளவு & கூடுதல் விவரங்கள் (எ.கா: பொன்னி அரிசி 50 மூட்டை அல்லது தேங்காய் 5000 காய்கள்)"
              value={leadForm.details}
              onChange={(e) => setLeadForm({ ...leadForm, details: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? 'தயாராகிறது...' : 'B2B ஆணை அனுப்ப (WhatsApp) ↗'}
            </button>
          </div>
        </form>
      </div>

      {/* 5. 360° எகோசிஸ்டம் பாலங்கள் */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('finance');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-amber-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🏦</span>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">B2B வணிகக் கடன் & வரவு செலவு</h4>
          <p className="text-xs text-slate-100">கொள்முதல் செய்வதற்குத் தேவையான பிணையமில்லா MSME மூலதனக் கடன்கள்.</p>
          <span className="text-[11px] text-amber-400 font-bold block pt-1 underline">நிதி & கடன்கள் பிரிவு செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('agri');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🌱</span>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">விவசாய விளைச்சல் & பண்ணை மேலாண்மை</h4>
          <p className="text-xs text-slate-100">மண் பரிசோதனை, பயிர் லாப ரேடார் மற்றும் 100% சொட்டுநீர் மானிய வழிகாட்டல்.</p>
          <span className="text-[11px] text-emerald-400 font-bold block pt-1 underline">Agri Hub செல்ல ↗</span>
        </div>

        <div
          onClick={() => {
            if (setCurrentModule) setCurrentModule('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/50 p-4 space-y-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] group shadow-lg"
        >
          <span className="text-2xl block group-hover:scale-110 transition-transform">🚛</span>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">லாரி ஓட்டுநர்கள் & சுமை ஆட்கள்</h4>
          <p className="text-xs text-slate-100">பொருட்களை ஏற்றி இறக்க உள்ளூர் சுமை தொழிலாளர்கள் மற்றும் சரக்கு ஓட்டுநர்கள்.</p>
          <span className="text-[11px] text-blue-400 font-bold block pt-1 underline">வேலைவாய்ப்பு மையம் செல்ல ↗</span>
        </div>
      </div>
    </div>
  );
}