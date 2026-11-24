// src/pages/wholesale.js
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { wholesaleHubs, wholesaleCategories } from '../data/wholesaleData';
import { getWhatsAppUrl } from '../config';

const TN_DISTRICTS = [
  'அரியலூர்', 'செங்கல்பட்டு', 'சென்னை', 'கோயம்புத்தூர்', 'கடலூர்', 'தருமபுரி',
  'திண்டுக்கல்', 'ஈரோடு', 'கள்ளக்குறிச்சி', 'காஞ்சிபுரம்', 'கன்னியாகுமரி', 'கரூர்',
  'கிருஷ்ணகிரி', 'மதுரை', 'மயிலாடுதுறை', 'நாகப்பட்டினம்', 'நாமக்கல்', 'நீலகிரி',
  'பெரம்பலூர்', 'புதுக்கோட்டை', 'இராமநாதபுரம்', 'இராணிப்பேட்டை', 'சேலம்', 'சிவகங்கை',
  'தென்காசி', 'தஞ்சாவூர்', 'தேனி', 'தூத்துக்குடி', 'திருச்சிராப்பள்ளி', 'திருநெல்வேலி',
  'திருப்பத்தூர்', 'திருப்பூர்', 'திருவள்ளூர்', 'திருவண்ணாமலை', 'திருவாரூர்', 'வேலூர்',
  'விழுப்புரம்', 'விருதுநகர்'
];

const QUICK_POPULAR_PRODUCTS = [
  'பொன்னி அரிசி (Rice)',
  'விரலி மஞ்சள் (Turmeric)',
  'துவரம் பருப்பு & உளுந்து',
  'பனியன் & ஆயத்த ஆடைகள்',
  'மரச்செக்கு நல்லெண்ணெய் & தேங்காய் எண்ணெய்',
  'கட்டுமான இரும்பு கம்பி & சிமெண்ட்',
  'பாக்கு மட்டை & பேக்கேஜிங் பொருட்கள்',
  'சோலார் பேனல் & எலக்ட்ரிக்கல்ஸ்',
  'முட்டை & கோழித் தீவனம்',
  'பட்டாசு & பிரிண்டிங் பாக்ஸ்'
];

export default function WholesalePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Gemini AI A-Z Wholesale Finder State
  const [aiQuery, setAiQuery] = useState('');
  const [aiDistrict, setAiDistrict] = useState('தமிழ்நாடு முழுவதும்');
  const [aiQuantity, setAiQuantity] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Bulk Order & GST Estimator Modal State
  const [activeQuoteHub, setActiveQuoteHub] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    buyerName: '',
    shopName: '',
    quantity: 10,
    unit: 'மூட்டை / Bags (50 Kg)',
    estimatedRate: 2500,
    gstPct: 5,
    deliveryCity: ''
  });

  const handleAskWholesaleAI = async (customProduct = null) => {
    const targetProduct = (customProduct || aiQuery || searchTerm).trim();
    if (!targetProduct) {
      alert('தயவுசெய்து எந்தப் பொருள் மொத்த விலையில் வேண்டும் என்பதைத் தட்டச்சு செய்யவும்.');
      return;
    }
    if (customProduct) setAiQuery(customProduct);

    setAiLoading(true);
    setAiReply('');
    try {
      const res = await fetch('/api/wholesale-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: targetProduct,
          district: aiDistrict,
          quantity: aiQuantity
        })
      });
      const data = await res.json();
      setAiReply(data.reply || 'மண்டி விவரங்கள் பெற முடியவில்லை.');
    } catch (err) {
      console.error('Wholesale AI Fetch Error:', err);
      setAiReply('தகவல் தொடர்பில் சிறிய பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setAiLoading(false);
    }
  };

  const filteredHubs = useMemo(() => {
    return wholesaleHubs.filter((hub) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'rice' && (hub.categoryEn.includes('Rice') || hub.tags.includes('rice'))) ||
        (selectedCategory === 'spices' && (hub.categoryEn.includes('Spices') || hub.tags.includes('turmeric'))) ||
        (selectedCategory === 'pulses' && (hub.categoryEn.includes('Pulses') || hub.tags.includes('dhall'))) ||
        (selectedCategory === 'textiles' && (hub.categoryEn.includes('Textiles') || hub.tags.includes('garments'))) ||
        (selectedCategory === 'organic' && (hub.categoryEn.includes('Organic') || hub.tags.includes('karupatti') || hub.tags.includes('snacks')));

      const matchesDistrict =
        selectedDistrict === 'all' ||
        hub.district.includes(selectedDistrict) ||
        (selectedDistrict === 'திருச்சிராப்பள்ளி' && hub.district.includes('திருச்சி'));

      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory && matchesDistrict;

      const matchesSearch =
        hub.name.toLowerCase().includes(term) ||
        hub.englishName.toLowerCase().includes(term) ||
        hub.district.toLowerCase().includes(term) ||
        hub.districtEn.toLowerCase().includes(term) ||
        hub.hub.toLowerCase().includes(term) ||
        hub.specialty.toLowerCase().includes(term) ||
        hub.tags.some((tag) => tag.toLowerCase().includes(term));

      return matchesCategory && matchesDistrict && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedDistrict]);

  const quoteCalculation = useMemo(() => {
    const baseTotal = (Number(quoteForm.quantity) || 0) * (Number(quoteForm.estimatedRate) || 0);
    const gstAmount = Math.round(baseTotal * ((Number(quoteForm.gstPct) || 0) / 100));
    const grandTotal = baseTotal + gstAmount;
    return { baseTotal, gstAmount, grandTotal };
  }, [quoteForm]);

  const handleSendBulkQuote = (e) => {
    e.preventDefault();
    if (!activeQuoteHub) return;

    const msg = `வணக்கம் ${activeQuoteHub.name} (${activeQuoteHub.district})! நம்ம பூமி 360 B2B சந்தை மூலம் மொத்த கொள்முதல் விலைப் பட்டியல் (Bulk Quotation) கோருகிறேன்.\n\n👤 வாங்குபவர்: ${quoteForm.buyerName || '-'}\n🏪 நிறுவனம் / கடை: ${quoteForm.shopName || '-'}\n📍 டெலிவரி ஊர்: ${quoteForm.deliveryCity || '-'}\n📦 பொருள் / பிரிவு: ${activeQuoteHub.specialty}\n🔢 தேவைப்படும் அளவு: ${quoteForm.quantity} ${quoteForm.unit}\n💰 உத்தேச மதிப்பு (GST ${quoteForm.gstPct}% உடன்): ₹${quoteCalculation.grandTotal.toLocaleString('en-IN')}\n\nதயவுசெய்து இன்றைய மொத்த விற்பனை விலை மற்றும் போக்குவரத்து விவரங்களைப் பகிரவும்.`;
    window.open(getWhatsAppUrl(msg, activeQuoteHub.whatsapp), '_blank');
    setActiveQuoteHub(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors"
          >
            <span className="text-lg">←</span>
            <span>முகப்பு (Home)</span>
          </Link>
          <div className="text-right">
            <h1 className="text-base font-bold text-white">A-Z மொத்த மண்டி & AI B2B</h1>
            <p className="text-[11px] text-slate-400">38 Districts • All Products Live AI Sourcing</p>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* 1. AI A-Z Wholesale Finder Engine (Any Product, Any District) */}
        <section className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-emerald-950/50 border border-indigo-500/40 rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 mb-1.5">
                🤖 AI A-Z மொத்த விற்பனை & மண்டி தேடுபொறி • 38 மாவட்டங்கள்
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                தமிழ்நாட்டில் எந்தப் பொருள் வேண்டுமானாலும் மொத்த விலையில் தேடுங்கள்!
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1">
                அரிசி, மஞ்சள், ஜவுளி, சிமெண்ட், இரும்பு, பிளாஸ்டிக், எலக்ட்ரிக்கல்ஸ், பட்டாசு, காய்கறி என எந்தப் பொருளையும் உள்ளிடுங்கள் — AI உடனே மண்டி, விலை & போக்குவரத்து விவரம் தரும்.
              </p>
            </div>
            <Link
              href="/msme-project"
              className="self-start md:self-auto bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-4 py-2.5 rounded-xl transition whitespace-nowrap"
            >
              📊 வியாபார கடன் DPR →
            </Link>
          </div>

          {/* AI Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">1. தேவைப்படும் பொருள் (A-Z Any Product):</label>
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskWholesaleAI()}
                placeholder="எ.கா: இரும்பு கம்பி, தேங்காய் எண்ணெய், பிளாஸ்டிக் பை..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">2. மாவட்டம் (38 TN Districts):</label>
              <select
                value={aiDistrict}
                onChange={(e) => setAiDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              >
                <option value="தமிழ்நாடு முழுவதும்">📍 தமிழ்நாடு முழுவதும் (All 38 Districts)</option>
                {TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    📍 {dist} மாவட்டம்
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">3. உத்தேச அளவு (Qty):</label>
              <input
                type="text"
                value={aiQuantity}
                onChange={(e) => setAiQuantity(e.target.value)}
                placeholder="எ.கா: 50 மூட்டை / 1 டன்"
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quick Suggestion Chips */}
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
              {QUICK_POPULAR_PRODUCTS.slice(0, 5).map((prod) => (
                <button
                  key={prod}
                  type="button"
                  onClick={() => handleAskWholesaleAI(prod)}
                  className="text-[11px] bg-slate-800/90 hover:bg-indigo-600/40 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
                >
                  ⚡ {prod}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAskWholesaleAI()}
              disabled={aiLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl shadow-lg transition cursor-pointer whitespace-nowrap"
            >
              {aiLoading ? 'AI மண்டி தேடுகிறது... ⚡' : '🔍 AI மொத்த விலை & மண்டி தேடு'}
            </button>
          </div>

          {/* AI Response Box */}
          {aiReply && (
            <div className="mt-4 bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-4 md:p-5 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400">
                  ✅ "{aiQuery}" — தமிழ்நாடு B2B மொத்த மண்டி & விலை ஆய்வு ({aiDistrict})
                </span>
                <button
                  onClick={() => setAiReply('')}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕ மூடு
                </button>
              </div>
              <div className="text-xs md:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                {aiReply}
              </div>
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  நேரடி ஆலை / மொத்த வியாபாரி தொடர்பு எண்ணைப் பெற:
                </span>
                <a
                  href={getWhatsAppUrl(
                    `வணக்கம் நம்ம பூமி 360 B2B பிரிவு! எனக்கு "${aiQuery}" (${aiDistrict}, அளவு: ${aiQuantity || 'மொத்த ஆர்டர்'}) நேரடி ஆலை / மொத்த மண்டி தொடர்பு மற்றும் இன்றைய விலைப்பட்டியல் தேவைப்படுகிறது.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <span>💬</span>
                  <span>நேரடி சப்ளையர் இணைப்பு பெற (WhatsApp) ↗</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 2. Verified Partner Mandis Directory */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-base md:text-lg font-bold text-white">
                சரிபார்க்கப்பட்ட முதன்மை மண்டிகள் (Verified B2B Hubs)
              </h3>
              <p className="text-xs text-slate-400">
                நேரடி வாட்ஸ்அப் ஆர்டர் & GST மதிப்பீடு வசதியுடன் கூடிய மண்டிகள்
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="பட்டியலில் வடிகட்டவும்..."
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="all">📍 அனைத்து மாவட்டங்கள் (38)</option>
                {TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    📍 {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Badges Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {wholesaleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wholesale Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredHubs.map((hub) => (
            <div
              key={hub.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                    📍 {hub.district} • {hub.hub}
                  </span>
                  {hub.verified && (
                    <span className="text-[11px] font-medium text-teal-300 bg-teal-950/80 border border-teal-800 px-2.5 py-0.5 rounded-full">
                      ✓ சரிபார்க்கப்பட்டது
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-white mt-3 leading-snug">
                  {hub.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{hub.englishName}</p>

                <div className="mt-3 bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
                  <p className="text-xs text-slate-200 leading-relaxed">
                    <span className="text-slate-400 font-semibold">சிறப்பு: </span>
                    {hub.specialty}
                  </p>
                  <div className="text-xs text-amber-300 font-semibold pt-1 border-t border-slate-800/80">
                    📦 குறைந்தபட்ச ஆர்டர்: {hub.minOrder}
                  </div>
                </div>
              </div>

              {/* Clean 2-Tier Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <a
                  href={getWhatsAppUrl(
                    `வணக்கம் ${hub.name} (${hub.district}), நம்ம பூமி 360 மூலம் "${hub.specialty}" மொத்த ஆர்டர் (குறைந்தபட்சம்: ${hub.minOrder}) செய்ய விரும்புகிறேன். இன்றைய விலைப்பட்டியல் பகிரவும்.`,
                    hub.whatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span>💬</span>
                  <span>நேரடி வாட்ஸ்அப் ஆர்டர் (WhatsApp Order)</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveQuoteHub(hub)}
                    className="bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold py-2 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    🧾 Bulk GST மதிப்பீடு
                  </button>
                  <a
                    href={`tel:${hub.phone}`}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl transition-colors text-center"
                  >
                    📞 நேரடி அழைப்பு
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State with Instant AI Trigger */}
        {filteredHubs.length === 0 && (
          <div className="text-center py-10 bg-slate-900/60 rounded-2xl border border-dashed border-indigo-500/40 space-y-3 px-4">
            <p className="text-3xl">🤖</p>
            <h3 className="text-base font-bold text-white">
              இந்த மாவட்டத்திற்கான நேரடி மண்டி விவரங்களை AI மூலம் உடனே பெறலாம்!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              மேலே உள்ள AI தேடுபொறியில் எந்தப் பொருள் வேண்டுமானாலும் தட்டச்சு செய்து, {selectedDistrict !== 'all' ? `${selectedDistrict} மாவட்டத்திற்கான` : 'தமிழ்நாடு முழுவதுமான'} மொத்த விலை & சப்ளையர் விவரங்களைப் பெறுங்கள்.
            </p>
            <button
              type="button"
              onClick={() => {
                setAiDistrict(selectedDistrict !== 'all' ? selectedDistrict : 'தமிழ்நாடு முழுவதும்');
                handleAskWholesaleAI(searchTerm || 'பொது மளிகை & வேளாண் பொருட்கள்');
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow cursor-pointer"
            >
              ⚡ AI மூலம் இப்போது தேடு
            </button>
          </div>
        )}
      </main>

      {/* B2B Bulk Quotation & GST Calculator Modal */}
      {activeQuoteHub && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase">B2B Bulk Order & GST Estimator</span>
                <h3 className="text-base font-bold text-white mt-0.5">{activeQuoteHub.name}</h3>
                <p className="text-xs text-slate-400">{activeQuoteHub.district} • குறைந்தபட்சம்: {activeQuoteHub.minOrder}</p>
              </div>
              <button
                onClick={() => setActiveQuoteHub(null)}
                className="text-slate-400 hover:text-white text-sm bg-slate-800 px-2 py-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendBulkQuote} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">உங்கள் பெயர்:</label>
                  <input
                    type="text"
                    required
                    placeholder="எ.கா: உதயகுமார்"
                    value={quoteForm.buyerName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, buyerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">கடை / நிறுவனப் பெயர்:</label>
                  <input
                    type="text"
                    placeholder="எ.கா: ஸ்ரீ முருகன் ஸ்டோர்ஸ்"
                    value={quoteForm.shopName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, shopName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">தேவைப்படும் அளவு (Qty):</label>
                  <input
                    type="number"
                    min="1"
                    value={quoteForm.quantity}
                    onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">அலகு (Unit):</label>
                  <select
                    value={quoteForm.unit}
                    onChange={(e) => setQuoteForm({ ...quoteForm, unit: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="மூட்டை / Bags (50 Kg)">மூட்டை / Bags (50 Kg)</option>
                    <option value="குவிண்டால் (Quintal)">குவிண்டால் (Quintal)</option>
                    <option value="டன் (Metric Ton)">டன் (Metric Ton)</option>
                    <option value="பண்டல் / Boxes">பண்டல் / Boxes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-300 block mb-1">உத்தேச விலை (₹):</label>
                  <input
                    type="number"
                    min="1"
                    value={quoteForm.estimatedRate}
                    onChange={(e) => setQuoteForm({ ...quoteForm, estimatedRate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">GST (%):</label>
                  <select
                    value={quoteForm.gstPct}
                    onChange={(e) => setQuoteForm({ ...quoteForm, gstPct: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value={0}>0% (Exempt)</option>
                    <option value={5}>5% GST</option>
                    <option value={12}>12% GST</option>
                    <option value={18}>18% GST</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">டெலிவரி ஊர்:</label>
                  <input
                    type="text"
                    required
                    placeholder="செங்கல்பட்டு"
                    value={quoteForm.deliveryCity}
                    onChange={(e) => setQuoteForm({ ...quoteForm, deliveryCity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              {/* GST Summary Box */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>அடிப்படை மதிப்பு (Base Value):</span>
                  <span>₹{quoteCalculation.baseTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST ({quoteForm.gstPct}%):</span>
                  <span>₹{quoteCalculation.gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold text-sm pt-1 border-t border-slate-800">
                  <span>மொத்த உத்தேச மதிப்பு:</span>
                  <span>₹{quoteCalculation.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition cursor-pointer"
              >
                💬 WhatsApp-ல் Bulk Quotation அனுப்புக ↗
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}