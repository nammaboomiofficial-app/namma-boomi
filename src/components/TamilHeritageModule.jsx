import React, { useState, useRef } from 'react';
import heritageData from '../data/heritageData.json';

export default function TamilHeritageModule() {
  const [selectedId, setSelectedId] = useState(heritageData[0]?.id || 'thinai');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef(null);

  const activeSection = heritageData.find((item) => item.id === selectedId) || heritageData[0];
  const currentCard = activeSection?.subCards?.[activeCardIndex] || activeSection?.subCards?.[0];

  const handleSectionChange = (id) => {
    setSelectedId(id);
    setActiveCardIndex(0);
  };

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredData = heritageData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subCards?.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // இலக்கிய நூல்களுக்கும் மற்ற திணைப் பிரிவுகளுக்கும் ஏற்ப டைனமிக் தலைப்புகள்
  const isLiterature = activeSection?.id === 'world_tamil_literature';
  const labelMuthal = isLiterature ? 'நூலின் அமைப்பு & காலக்களம்' : 'முதற்பொருள் (நிலமும் பொழுதும்)';
  const labelKaru = isLiterature ? 'மையக் கருத்து & மாந்தர்கள்' : 'கருப்பொருள் (இயற்கைக் கூறுகள்)';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 text-slate-100">
      
      {/* பிரம்மாண்ட வரலாற்றுத் தலைப்பு அட்டை (Hero Banner) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-emerald-950/90 border border-amber-500/30 p-6 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider">
              <span>🏛️ தமிழர் தொல் அறிவியல் & நில நாகரிக ஆவணம்</span>
              <span>•</span>
              <span>தலைமுறை கடந்து வாழும் வாழ்வியல் தர்மம்</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-emerald-300">
              தமிழர் மரபுசார் வாழ்வியல் & பூமி மேலாண்மை
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              தமிழன் இயற்கையை வெல்ல நினைக்கவில்லை; இயற்கையோடு இணைந்து வாழ்ந்து உலகிற்கே அறிவியல் கற்பித்தான்.
            </p>
          </div>
          <div className="hidden lg:block text-right border-l border-amber-500/20 pl-6 shrink-0">
            <span className="text-xs text-amber-300/80 font-mono block">ஐம்பூத சமநிலை</span>
            <span className="text-base font-bold text-amber-200">நிலம் • நீர் • தீ • வளி • விசும்பு</span>
          </div>
        </div>
      </div>

      {/* மேலே: உடனடித் தேடல் & நேர்த்தியான நகர்வு பட்டன்கள் (Search & Modern Controls) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <span>✨</span> மரபுத் தூண்கள்
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-medium">
              {heritageData.length} தலைப்புகள்
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="மரபு, இலக்கியம் தேடுக..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 md:w-72 px-3.5 py-2 pl-8 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-amber-400 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
              />
              <span className="absolute left-2.5 top-2.5 text-xs text-slate-500">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* அம்பு நகர்வு பொத்தான்கள் */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => scrollTabs('left')}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition-colors shadow-sm"
                title="முந்தையவை"
              >
                ◀
              </button>
              <button
                onClick={() => scrollTabs('right')}
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition-colors shadow-sm"
                title="அடுத்தவை"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* கிடைமட்டமாக உருளும் நவீன ஸ்வைப் பட்டன்கள் (No Visible Scrollbar) */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredData.map((item) => {
            const isActive = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition-all duration-300 border shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/25 scale-[1.03]'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* கீழே: முழுத் திரை பிரம்மாண்ட காட்சி அரங்கம் (Bottom Showcase Canvas) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-7 shadow-2xl backdrop-blur-md">
        
        {/* தலைப்பு & சங்க இலக்கிய மேற்கோள் பலகை */}
        <div className="border-b border-slate-800 pb-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-inner">
                {activeSection?.icon}
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-amber-300 tracking-wide">
                  {activeSection?.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  {activeSection?.description}
                </p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300/90 w-fit self-start sm:self-center font-medium">
              {activeSection?.subtitle}
            </span>
          </div>

          {activeSection?.quote && (
            <div className="mt-3 p-4 rounded-2xl bg-amber-500/5 border-l-4 border-amber-500 text-amber-200/95 text-xs md:text-sm font-medium italic">
              "{activeSection.quote}"
            </div>
          )}
        </div>

        {/* முக்காலப் பகுப்பாய்வு (Past, Present, Future Timeline) */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <span>⏳</span> முக்கால வாழ்வியல் பார்வை (Then ➔ Now ➔ Tomorrow)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>📜</span> இறந்த காலம் (மரபு)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSection?.timeline?.past}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> நிகழ்காலம் (நடப்பு சவால்)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSection?.timeline?.present}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🌱</span> எதிர்காலம் (தொலைநோக்கு)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSection?.timeline?.future}
              </p>
            </div>
          </div>
        </div>

        {/* உட்பிரிவுகள் தேர்வு மற்றும் விரிவான ஆவணம் (Sub-Topics & Deep Dive) */}
        {activeSection?.subCards && activeSection.subCards.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span>🌾</span> விரிவான அறிவியல் & வாழ்வியல் கூறுகளுக்கான தேர்வு
              </h3>
              <span className="text-[11px] text-slate-400">
                கிளிக் செய்து ஆழமான விவரங்களைக் காண்க
              </span>
            </div>

            {/* துணை அட்டைகள் தேர்வுப் பொத்தான்கள் */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeSection.subCards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    activeCardIndex === idx
                      ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-extrabold scale-105'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
                  }`}
                >
                  {card.name}
                </button>
              ))}
            </div>

            {/* தேர்ந்தெடுக்கப்பட்ட உட்பிரிவின் முழு ஆவணப் பலகை */}
            {currentCard && (
              <div className="p-5 md:p-7 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 space-y-6 shadow-2xl">
                
                {/* உட்பிரிவின் தலைப்பு & உரிப்பொருள் / மையச் செய்தி */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-800/80 pb-4">
                  <div>
                    <h4 className="text-xl font-bold text-amber-200">
                      {currentCard.name}
                    </h4>
                    <span className="text-xs text-slate-400 mt-0.5 block">{currentCard.type}</span>
                  </div>
                  {currentCard.uri && (
                    <span className="text-xs px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium w-fit">
                      {isLiterature ? 'மைய அறம்: ' : 'உரிப்பொருள்: '} {currentCard.uri}
                    </span>
                  )}
                </div>

                {/* டைனமிக் கட்டமைப்பு (முதற்பொருள் & கருப்பொருள் / நூல் அமைப்பு & கருத்து) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* பிரிவு 1: நிலமும் பொழுதும் / அமைப்பு */}
                  {currentCard.muthal && (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2.5">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                        <span>🗺️</span> {labelMuthal}
                      </span>
                      <div className="text-xs space-y-1.5 text-slate-300 leading-relaxed">
                        <div><strong className="text-slate-400">{isLiterature ? 'கட்டமைப்பு / இயல்கள்:' : 'நிலம்:'}</strong> {currentCard.muthal.land}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'வரலாற்றுக் காலம்:' : 'பருவம்:'}</strong> {currentCard.muthal.season}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'பயன்பாட்டு நெறி:' : 'பொழுது:'}</strong> {currentCard.muthal.time}</div>
                      </div>
                    </div>
                  )}

                  {/* பிரிவு 2: இயற்கைக் கூறுகள் / மாந்தர்கள் */}
                  {currentCard.karu && (
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2.5">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                        <span>🌱</span> {labelKaru}
                      </span>
                      <div className="text-xs space-y-1.5 text-slate-300 leading-relaxed">
                        <div><strong className="text-slate-400">{isLiterature ? 'ஆசிரியர் / மரபு:' : 'தெய்வம் / மரபு:'}</strong> {currentCard.karu.deity}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'கதாபாத்திரங்கள் / குடிமக்கள்:' : 'மக்கள் & தொழில்:'}</strong> {currentCard.karu.people} {currentCard.karu.profession ? `• ${currentCard.karu.profession}` : ''}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'விருந்தோம்பல் / உணவு:' : 'உணவு & பயிர்கள்:'}</strong> {currentCard.karu.food}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'மரபு அடையாளங்கள்:' : 'மரம் & பூ:'}</strong> {currentCard.karu.flora}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'உயிர்ச்சூழல் / விலங்கு:' : 'விலங்கு & பறவை:'}</strong> {currentCard.karu.fauna}</div>
                        <div><strong className="text-slate-400">{isLiterature ? 'நீர் மேலாண்மை:' : 'நீர்நிலை:'}</strong> {currentCard.karu.water}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* நவீன அறிவியல் ஒப்பீடு & பூமிப் பயன்பாடு */}
                {currentCard.modernScience && (
                  <div className="p-4 md:p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                      <span>🔬</span> தமிழன் அறிவியல் ➔ இன்றைய தலைமுறைக்கான பூமிப் பயன்பாடு
                    </span>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {currentCard.modernScience}
                    </p>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}