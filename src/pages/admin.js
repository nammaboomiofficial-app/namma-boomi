import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  // உங்கள் அட்மின் ரகசிய PIN (தேவைப்பட்டால் மாற்றிக் கொள்ளலாம்)
  const ADMIN_PIN = '3600'; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('தவறான PIN! மீண்டும் முயற்சிக்கவும்.');
    }
  };

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTIKPIe6K51N3bMfJOQkCzRX6HGjouFZSWlp-hc5WUmnHeTWczGnrMTQmLX7jAa1INq7a8K27mSXopn/pubhtml?widget=true&headers=false";
  const DIRECT_SHEET_LINK = "https://docs.google.com/spreadsheets/d/1ipTQcZ9cli7tYMEN-wdM4cl324694mrk-LQ_EXJL8n8/edit?gid=0";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>Admin CRM | Namma Bhoomi 360</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">360</span>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">நம்ம பூமி 360 - அட்மின் சிஆர்எம்</h1>
            <p className="text-xs text-slate-400">லீட்ஸ் & தணிக்கை மேலாண்மை தளம்</p>
          </div>
        </div>
        <Link href="/" className="text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition-colors">
          ← முகப்புப் பக்கம்
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl w-full mx-auto">
        {!isAuthorized ? (
          // PIN Lock Screen
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl">
                🔒
              </div>
              <h2 className="text-lg font-bold text-white mb-1">அட்மின் உள்நுழைவு</h2>
              <p className="text-xs text-slate-400 mb-6">லீட்களைப் பார்க்க உங்கள் 4 இலக்க PIN உள்ளிடவும்</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN உள்ளிடவும் (3600)"
                  className="w-full text-center text-2xl tracking-widest px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-white placeholder:text-slate-600 font-mono"
                  autoFocus
                />
                {error && <p className="text-rose-400 text-xs font-medium">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
                >
                  திறக்க (Unlock)
                </button>
              </form>
            </div>
          </div>
        ) : (
          // Dashboard & Embedded Google Sheet
          <div className="flex-1 flex flex-col gap-4">
            {/* Action Bar */}
            <div className="flex flex-wrap justify-between items-center bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-semibold text-emerald-400">கூகுள் ஷீட் நேரலை இணைப்பு இயங்குகிறது</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={DIRECT_SHEET_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>முழு ஷீட்டைத் திறக்க ↗</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Sheet Frame */}
            <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 min-h-[550px]">
              <iframe
                src={SHEET_URL}
                className="w-full h-full min-h-[600px] border-none"
                title="Leads CRM Sheet"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}