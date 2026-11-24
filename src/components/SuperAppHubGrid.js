import React, { useState } from 'react';
import Link from 'next/link';

const DIRECT_STUDIOS = [
  {
    id: 'msme-studio',
    icon: '📊',
    badge: 'Instant Bank Justification',
    title: 'MSME & வங்கி திட்ட அறிக்கை (DPR Studio)',
    desc: 'PMEGP, UYEGP, NEEDS, MUDRA கடன்களுக்கான 5-வருட நிதி கணிப்புகள் & A4 PDF அறிக்கை.',
    href: '/msme-project',
    accent: 'border-emerald-500/60 bg-slate-900 text-emerald-300'
  },
  {
    id: 'wholesale-b2b',
    icon: '📦',
    badge: '38 மாவட்டங்கள் • Live AI',
    title: 'A-Z தமிழ்நாடு மொத்த மண்டி & AI B2B',
    desc: 'எந்தப் பொருளையும் தேடுங்கள் — தமிழ்நாட்டின் 38 மாவட்ட மண்டி விலை, GST & நேரடி வாட்ஸ்அப் ஆர்டர்.',
    href: '/wholesale',
    accent: 'border-indigo-500/60 bg-slate-900 text-indigo-300'
  },
  {
    id: 'ai-astrology-legal',
    icon: '🔮',
    badge: '360° Live AI Tools',
    title: 'திருக்கணித AI ஜோதிடம் & சட்ட ஆலோசனை',
    desc: 'துல்லியமான பஞ்சாங்கம், ஜாதகப் பொருத்தம், வாரிசு NOC & சட்ட மனுக்கள் ஒரே இடத்தில்.',
    href: '/#astrology',
    moduleKey: 'astro',
    accent: 'border-amber-500/60 bg-slate-900 text-amber-300'
  },
  {
    id: 'media-promo-studio',
    icon: '🎬',
    badge: 'HD Poster & AI Copy',
    title: 'AI விளம்பர போஸ்டர் & மீடியா ஸ்டுடியோ',
    desc: 'ரியல் எஸ்டேட், கடைகள் & தொழில்களுக்கு நொடியில் HD தமிழ் போஸ்டர் டவுன்லோட், WhatsApp வாசகம் & Reels Prompts.',
    href: '/#media-studio',
    moduleKey: 'media_studio',
    accent: 'border-purple-500/60 bg-slate-900 text-purple-300'
  }
];

const GOVT_PORTALS = [
  {
    sector: '1. நிலம் & 2. பத்திரப்பதிவு',
    icon: '🏞️',
    links: [
      { label: 'பட்டா / சிட்டா / அ-பதிவேடு (TN e-Services)', url: 'https://eservices.tn.gov.in/' },
      { label: 'வில்லங்கச் சான்று (EC) & வழிகாட்டி மதிப்பு (TNREGINET)', url: 'https://tnreginet.gov.in/' },
      { label: 'தமிழ் நிலம் வரைபடம் (Tamil Nilam)', url: 'https://tamilnilam.tn.gov.in/' }
    ]
  },
  {
    sector: '3. விவசாயம் & 4. தோட்டக்கலை',
    icon: '🌾',
    links: [
      { label: 'தமிழ்நாடு வேளாண்மைத் துறை (TNAgrisnet)', url: 'https://www.tnagrisnet.tn.gov.in/' },
      { label: 'தோட்டக்கலை & மானியங்கள் (TN Horticulture)', url: 'https://tnhorticulture.tn.gov.in/' },
      { label: 'பி.எம். கிசான் நிதி உதவி (PM-KISAN)', url: 'https://pmkisan.gov.in/' }
    ]
  },
  {
    sector: '5. MSME தொழில் & 6. வங்கி கடன்',
    icon: '🏭',
    links: [
      { label: 'உத்யம் MSME பதிவு (Udyam Registration)', url: 'https://udyamregistration.gov.in/' },
      { label: 'தமிழ்நாடு MSME மானியக் கடன்கள் (UYEGP / NEEDS)', url: 'https://www.msmeonline.tn.gov.in/' },
      { label: 'PMEGP கடன் விண்ணப்பம் (KVIC Online)', url: 'https://www.kviconline.gov.in/pmegpeportal/' }
    ]
  },
  {
    sector: '7. மொத்த மண்டி & 8. GST வரி',
    icon: '⚖️',
    links: [
      { label: 'தினசரி காய்கறி & மண்டி விலை (Agmarknet)', url: 'https://agmarknet.gov.in/' },
      { label: 'தேசிய வேளாண் சந்தை (e-NAM)', url: 'https://www.enam.gov.in/' },
      { label: 'GST போர்ட்டல் (GST Official)', url: 'https://www.gst.gov.in/' }
    ]
  },
  {
    sector: '9. சட்ட மனுக்கள் & 10. இ-சேவை',
    icon: '🏛️',
    links: [
      { label: 'முதலமைச்சர் தனிப்பிரிவு (CM Helpline)', url: 'https://cmhelpline.tnega.org/' },
      { label: 'தமிழ்நாடு அரசு இ-சேவை (TNeGA e-Sevai)', url: 'https://www.tnesevai.tn.gov.in/' },
      { label: 'இலவச சட்ட உதவி ஆணையம் (TNSLSA)', url: 'https://www.tnlegalservices.tn.gov.in/' }
    ]
  },
  {
    sector: '11. வேலைவாய்ப்பு & 12. உரிமங்கள்',
    icon: '🚀',
    links: [
      { label: 'தமிழ்நாடு அரசு வேலைவாய்ப்பு பதிவு', url: 'https://tnvelaivaaippu.gov.in/' },
      { label: 'உணவு பாதுகாப்பு உரிமம் (FSSAI FoSCoS)', url: 'https://foscos.fssai.gov.in/' },
      { label: 'கட்டிட வரைபட அனுமதி (TN Single Window)', url: 'https://onlineppa.tn.gov.in/' }
    ]
  }
];

export default function SuperAppHubGrid({ onSelectModule }) {
  const [selectedSector, setSelectedSector] = useState('அனைத்தும்');

  const filteredPortals =
    selectedSector === 'அனைத்தும்'
      ? GOVT_PORTALS
      : GOVT_PORTALS.filter((item) => item.sector === selectedSector);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-10 border-t border-slate-200 mt-8">
      {/* 1. Direct AI Studios Launcher (4 Equal Columns) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              ⚡ Namma Boomi 360° Pro Studios
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
              கூடுதல் நேரடி AI வணிகம், மீடியா & மொத்த மண்டி ஸ்டுடியோக்கள்
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            ஒரே கிளிக்கில் முழுமையான கருவிகளைத் திறக்கவும்
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIRECT_STUDIOS.map((studio) => {
            const cardContent = (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{studio.icon}</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-white/10">
                      {studio.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-3 group-hover:underline">
                    {studio.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {studio.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs font-bold flex items-center justify-between">
                  <span>இப்போதே திறக்கவும்</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </>
            );

            if (studio.moduleKey) {
              return (
                <button
                  key={studio.id}
                  type="button"
                  onClick={() => {
                    if (onSelectModule) onSelectModule(studio.moduleKey);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group text-left rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between cursor-pointer ${studio.accent}`}
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <Link
                key={studio.id}
                href={studio.href}
                className={`group rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${studio.accent}`}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. Official Government Portals Directory (12 Sectors in 6 Clean Cards) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-7 space-y-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              🏛️ Verified Official Portals • நம்பகமான அரசு இணையதளங்கள்
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-white mt-1">
              12 துறைகளுக்கான நேரடி அரசு இணையதள இணைப்புகள் (Direct Govt Links)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              பட்டா, EC, உத்யம் பதிவு, வேளாண் மானியம், மண்டி விலை மற்றும் இ-சேவை விண்ணப்பங்களுக்கு அதிகாரப்பூர்வ தளங்களுக்கு நேரடியாகச் செல்லுங்கள்.
            </p>
          </div>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-1 text-xs">
          {['அனைத்தும்', ...GOVT_PORTALS.map((g) => g.sector)].map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setSelectedSector(sec)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-semibold transition cursor-pointer ${
                selectedSector === sec
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortals.map((group) => (
            <div
              key={group.sector}
              className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="text-lg">{group.icon}</span>
                <h4 className="text-sm font-bold text-white">{group.sector}</h4>
              </div>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 text-xs text-slate-300 hover:text-emerald-400 bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 px-3 py-2 rounded-xl transition"
                    >
                      <span className="leading-snug">{link.label}</span>
                      <span className="text-emerald-400 font-bold shrink-0">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}