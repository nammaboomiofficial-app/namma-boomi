import React, { useState, useEffect } from 'react';
import { TrendingUp, Sprout, Sun, Clock, Sparkles } from 'lucide-react';

export default function DailyLiveTicker({ setCurrentModule }) {
  const [todayStr, setTodayStr] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    setTodayStr(now.toLocaleDateString('ta-IN', options));
  }, []);

  const liveItems = [
    {
      id: 'gold',
      icon: <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />,
      label: '22K ஆபரணத் தங்கம்',
      value: '₹7,480 / கிராம்',
      badge: 'LIVE',
      module: 'finance'
    },
    {
      id: 'mandi',
      icon: <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />,
      label: 'கோயம்பேடு மண்டி',
      value: 'தக்காளி ₹28 • சின்ன வெங்காயம் ₹54 / கிலோ',
      badge: 'TODAY',
      module: 'agri'
    },
    {
      id: 'panchangam',
      icon: <Sun className="w-4 h-4 text-orange-400 shrink-0" />,
      label: 'இன்றைய நல்ல நேரம்',
      value: 'காலை 09:15 – 10:15 • மாலை 04:45 – 05:45',
      badge: 'பஞ்சாங்கம்',
      module: 'astrology'
    },
    {
      id: 'rahukalam',
      icon: <Clock className="w-4 h-4 text-rose-400 shrink-0" />,
      label: 'ராகு காலம்',
      value: 'மதியம் 12:00 – 01:30',
      badge: 'கவனம்',
      module: 'astrology'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-y border-emerald-800/60 text-white py-2.5 px-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Left Date & Live Tag */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE PULSE
          </span>
          <span className="text-xs font-semibold text-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {todayStr || 'இன்றைய நிலவரம்'}
          </span>
        </div>

        {/* Scrollable / Grid Live Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 flex-1">
          {liveItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentModule && setCurrentModule(item.module)}
              className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-left transition group"
            >
              <div className="p-1.5 bg-slate-800/90 rounded-lg group-hover:scale-105 transition">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-slate-300 truncate">{item.label}</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-white truncate mt-0.5">{item.value}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}