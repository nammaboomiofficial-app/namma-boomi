// src/pages/wholesale.js
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { wholesaleHubs, wholesaleCategories } from '../data/wholesaleData';

export default function WholesalePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // இருமொழித் தேடல் & வகை வடிகட்டுதல் (Dual-Language Filter)
  const filteredHubs = useMemo(() => {
    return wholesaleHubs.filter((hub) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'rice' && (hub.categoryEn.includes('Rice') || hub.tags.includes('rice'))) ||
        (selectedCategory === 'spices' && (hub.categoryEn.includes('Spices') || hub.tags.includes('turmeric'))) ||
        (selectedCategory === 'pulses' && (hub.categoryEn.includes('Pulses') || hub.tags.includes('dhall'))) ||
        (selectedCategory === 'textiles' && (hub.categoryEn.includes('Textiles') || hub.tags.includes('garments'))) ||
        (selectedCategory === 'organic' && (hub.categoryEn.includes('Organic') || hub.tags.includes('karupatti') || hub.tags.includes('snacks')));

      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesSearch =
        hub.name.toLowerCase().includes(term) ||
        hub.englishName.toLowerCase().includes(term) ||
        hub.district.toLowerCase().includes(term) ||
        hub.districtEn.toLowerCase().includes(term) ||
        hub.hub.toLowerCase().includes(term) ||
        hub.specialty.toLowerCase().includes(term) ||
        hub.tags.some((tag) => tag.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
          >
            <span className="text-lg">←</span>
            <span>முகப்பு (Home)</span>
          </Link>
          <div className="text-right">
            <h1 className="text-base font-bold text-slate-100">A-Z மொத்த மண்டி</h1>
            <p className="text-xs text-slate-400">Wholesale Market Hub</p>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-emerald-900/50 via-teal-900/30 to-slate-800/50 border border-emerald-500/30 rounded-2xl p-5 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30 mb-2">
                நேரடி மொத்த வர்த்தகம் • Direct B2B
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                தமிழ்நாட்டின் முதன்மை மொத்த மண்டிகள்
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                மணச்சநல்லூர் பொன்னி, ஆரணி அரிசி, ஈரோடு மஞ்சள், விருதுநகர் பருப்பு ஆலைகளின் நேரடித் தொடர்பு.
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="mt-5 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="பொருளின் பெயர் அல்லது ஊர் தேடவும்... (எ.கா: அரிசி, Rice, Erode, Manachanallur)"
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <span className="absolute left-4 top-3.5 text-slate-400 text-base">🔍</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded-md"
              >
                அழி (Clear)
              </button>
            )}
          </div>

          {/* Category Badges Filter */}
          <div className="flex gap-2 overflow-x-auto pt-4 pb-1 scrollbar-none text-xs">
            {wholesaleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>காட்டப்படும் மண்டிகள்: <strong className="text-emerald-400">{filteredHubs.length}</strong></span>
          {searchTerm && <span>தேடல் சொல்: &ldquo;{searchTerm}&rdquo;</span>}
        </div>

        {/* Wholesale Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHubs.map((hub) => (
            <div
              key={hub.id}
              className="bg-slate-800/60 border border-slate-700/70 hover:border-emerald-500/50 rounded-xl p-4 transition-all hover:bg-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-md">
                    {hub.district} • {hub.hub}
                  </span>
                  {hub.verified && (
                    <span className="text-[11px] text-teal-300 bg-teal-950/80 border border-teal-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      ✓ சரிபார்க்கப்பட்டது
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mt-2.5 leading-snug">
                  {hub.name}
                </h3>
                <p className="text-xs text-slate-400">{hub.englishName}</p>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                  <strong className="text-slate-200">சிறப்பு:</strong> {hub.specialty}
                </p>

                <div className="mt-3 inline-block bg-slate-900/60 px-2.5 py-1 rounded text-[11px] text-amber-300 border border-slate-700/50">
                  📦 குறைந்தபட்ச ஆர்டர்: {hub.minOrder}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2">
                <a
                  href={`https://wa.me/${hub.whatsapp}?text=${encodeURIComponent(`வணக்கம், நம்ம பூமி 360 தளம் மூலம் தொடர்பு கொள்கிறேன். உங்கள் ${hub.name} மொத்த விலை விவரங்கள் மற்றும் இருப்பு விவரம் தேவை.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>💬</span>
                  <span>வாட்ஸ்அப் ஆர்டர்</span>
                </a>
                <a
                  href={`tel:${hub.phone}`}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  📞 அழைக்க
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHubs.length === 0 && (
          <div className="text-center py-12 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
            <p className="text-3xl mb-2">🔍</p>
            <h3 className="text-base font-bold text-slate-200">மண்டி விவரங்கள் கிடைக்கவில்லை</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              வேறு வார்த்தைகளைத் தட்டச்சு செய்து தேடவும் அல்லது கீழே உள்ள நேரடி உதவிச் சேவையைப் பயன்படுத்தவும்.
            </p>
          </div>
        )}

        {/* Concierge "Do It For Me" Feature Card */}
        <section className="bg-gradient-to-r from-amber-950/40 via-slate-800 to-amber-950/20 border border-amber-500/40 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                🌟 நேரடி உதவி சேவை (Concierge Support)
              </span>
              <h3 className="text-base font-bold text-white">
                குறிப்பிட்ட மண்டி அல்லது ஆலை விவரங்கள் கிடைக்கவில்லையா?
              </h3>
              <p className="text-xs text-slate-300">
                எங்கள் வாடிக்கையாளர் பிரதிநிதியிடம் சொல்லுங்கள்; தமிழ்நாடு முழுவதும் உள்ள 500+ ஆலைகளின் நேரடி விலைப் பட்டியலை உங்களுக்கு எடுத்துத் தருகிறோம்.
              </p>
            </div>
            <a
              href={`https://wa.me/919443123456?text=${encodeURIComponent('வணக்கம் நம்ம பூமி 360 நிர்வாகி, எனக்குத் தேவையான குறிப்பிட்ட மண்டி விவரங்கள் மற்றும் கொள்முதல் உதவி தேவைப்படுகிறது.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>🤝</span>
              <span>எங்களிடம் கேளுங்கள்</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}