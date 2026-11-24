import React from 'react';

const modules = [
  { name: 'பூமி & நிலம்', icon: '🌍', angle: 0 },
  { name: 'நிதி & கடன்கள்', icon: '💰', angle: 30 },
  { name: 'காப்பீடு', icon: '🛡️', angle: 60 },
  { name: 'விவசாயம்', icon: '🌾', angle: 90 },
  { name: 'கல்வி & படிப்பு', icon: '🎓', angle: 120 },
  { name: 'வேலைவாய்ப்பு', icon: '💼', angle: 150 },
  { name: 'தொழில் & MSME', icon: '🏭', angle: 180 },
  { name: 'மொத்த விற்பனை', icon: '📦', angle: 210 },
  { name: 'ஆன்மிகம்', icon: '🛕', angle: 240 },
  { name: 'சுற்றுலா', icon: '✈️', angle: 270 },
  { name: 'AI ஜோதிடம்', icon: '✨', angle: 300 },
  { name: 'தமிழர் மரபு', icon: '🏛️', angle: 330 },
];

export default function HeroOrbitBanner({ onSelectModule }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0f172a] p-6 md:p-10 text-white shadow-2xl border border-emerald-400/20">
      {/* பின்னணி ஒளி வட்டம் */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* இடது பக்கம்: தலைப்பு & சிறப்பம்சங்கள் */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs md:text-sm font-medium text-emerald-200 border border-white/15">
            <span>✨</span>
            <span>தமிழ்நாடு முழுமைக்குமான 12 முதன்மை வாழ்வியல் & டிஜிட்டல் சேவைகள்</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            நம்ம பூமி <span className="text-amber-400">360</span>
            <span className="block text-xl md:text-2xl font-bold text-emerald-300 mt-2">
              உழவும் நிலமும் தமிழரின் வாழ்வியலும்
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed">
            பாரம்பரிய இயற்கை விவசாயம், பாதுகாப்பான நிலப் பரிவர்த்தனை வழிகாட்டல்கள், அரசு சேவைகள் மற்றும் அதிநவீன AI தொழில்நுட்ப வழிகாட்டல்களை ஒரே இடத்தில் இணைக்கும் உலகத்தரம் வாய்ந்த டிஜிட்டல் தளம்.
          </p>

          {/* 4 நம்பிக்கை கார்டுகள் */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 text-center border border-white/10">
              <div className="text-lg mb-1">🛡️</div>
              <div className="text-xs font-semibold text-emerald-100">பாதுகாப்பான பரிவர்த்தனை</div>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 text-center border border-white/10">
              <div className="text-lg mb-1">🤖</div>
              <div className="text-xs font-semibold text-emerald-100">சரியான AI மதிப்பீடு</div>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 text-center border border-white/10">
              <div className="text-lg mb-1">⚡</div>
              <div className="text-xs font-semibold text-emerald-100">வேகமான சேவைகள்</div>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3 text-center border border-white/10">
              <div className="text-lg mb-1">🎧</div>
              <div className="text-xs font-semibold text-emerald-100">24x7 தமிழ் ஆதரவு</div>
            </div>
          </div>
        </div>

        {/* வலது பக்கம்: நடுவில் பூமி + சுற்றி 12 மாடல்கள் Orbit */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center py-6">
          <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
            {/* வெளிப்புற சுற்றுப்பாதை வளையம் */}
            <div className="absolute inset-2 rounded-full border border-dashed border-emerald-300/30 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-12 rounded-full border border-emerald-400/20" />

            {/* மையத்தில் ஒளிரும் பூமி */}
            <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-sky-400 via-emerald-500 to-blue-900 shadow-[0_0_50px_rgba(16,185,129,0.65)] border-2 border-emerald-200/50">
              <span className="text-4xl sm:text-5xl animate-pulse">🌏</span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-wider text-white mt-1 bg-slate-950/60 px-2 py-0.5 rounded-full">
                பூமி 360°
              </span>
            </div>

            {/* 12 மாடல்களும் பூமியைச் சுற்றி வட்டமாக அமைதல் */}
            {modules.map((mod, index) => {
              const radius = 132;
              const rad = (mod.angle * Math.PI) / 180;
              const x = Math.round(radius * Math.cos(rad));
              const y = Math.round(radius * Math.sin(rad));

              return (
                <button
                  key={index}
                  onClick={() => onSelectModule && onSelectModule(mod.name)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  title={mod.name}
                  className="group absolute z-30 flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/90 hover:bg-emerald-600 text-white border border-emerald-400/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-125 cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{mod.icon}</span>
                  <span className="text-[8px] font-bold leading-tight text-center px-1 truncate w-full text-emerald-100 group-hover:text-white">
                    {mod.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-full bg-slate-950/60 border border-emerald-400/30 px-5 py-1.5 text-xs font-semibold text-emerald-200 tracking-wide">
            நிலம் • விவசாயம் • AI • நிதி சொத்து (360° ஒருங்கிணைப்பு)
          </div>
        </div>
      </div>
    </div>
  );
}