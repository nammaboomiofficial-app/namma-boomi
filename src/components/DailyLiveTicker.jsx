import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Sprout, Sun, Clock, Radio } from 'lucide-react';

export default function DailyLiveTicker() {
  const [rates, setRates] = useState({
    date: 'புதன், 25 நவம்பர் 2026',
    gold22k: '₹11,715 / கிராம்',
    mandiRate: 'தக்காளி ₹28 • சின்ன வெங்காயம் ₹54',
    nallaNeram: 'காலை 09:15 - 10:15 • மாலை 04:45 - 05:45',
    rahuKalam: 'மதியம் 12:00 - 01:30'
  });

  useEffect(() => {
    fetch('/api/live-rates')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.date) setRates(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto my-4 px-3">
      <div className="bg-slate-900/95 border border-emerald-500/30 rounded-2xl p-3.5 shadow-xl text-white">
        {/* மேல் தலைப்பு */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5 text-xs">
          <span className="flex items-center gap-1.5 font-bold text-rose-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE PULSE
          </span>
          <span className="text-amber-300 font-semibold">📅 {rates.date}</span>
        </div>

        {/* 4 லைவ் தகவல் கார்டுகள் */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-[11px]">22K ஆபரணத் தங்கம்</p>
              <p className="text-amber-400 font-bold text-sm mt-0.5">{rates.gold22k}</p>
            </div>
            <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">LIVE</span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-emerald-500/20 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-[11px]">கோயம்பேடு மண்டி</p>
              <p className="text-emerald-300 font-bold mt-0.5">{rates.mandiRate}</p>
            </div>
            <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-sky-500/20 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-[11px]">இன்றைய நல்ல நேரம்</p>
              <p className="text-sky-300 font-semibold mt-0.5">{rates.nallaNeram}</p>
            </div>
            <Sun className="w-4 h-4 text-amber-300 shrink-0" />
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-rose-500/20 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-[11px]">ராகு காலம்</p>
              <p className="text-rose-300 font-semibold mt-0.5">{rates.rahuKalam}</p>
            </div>
            <Clock className="w-4 h-4 text-rose-400 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}