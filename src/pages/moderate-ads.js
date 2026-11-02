import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ModerateAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchPendingAds = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/module-ads?include_pending=true');
      const data = await res.json();
      if (data.success) {
        const pendingOnly = (data.data || []).filter(item => item.status === 'pending');
        setAds(pendingOnly);
      }
    } catch (err) {
      console.error('Pending விளம்பரங்கள் பெறுவதில் பிழை:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAds();
  }, []);

  const handleAction = async (ad_id, action) => {
    setProcessingId(ad_id);
    try {
      const res = await fetch('/api/admin/moderate-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad_id, action })
      });
      const result = await res.json();
      if (result.success) {
        setAds(prev => prev.filter(ad => ad.id !== ad_id));
      } else {
        alert(result.error || 'செயல்பாட்டில் பிழை ஏற்பட்டது');
      }
    } catch (err) {
      alert('சர்வர் பிழை: ' + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <Head>
        <title>நிர்வாகி விளம்பர ஆய்வு மையம்</title>
      </Head>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-emerald-400">
              🛡️ விளம்பர ஆய்வு மையம் (Admin Moderation)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              ஸ்பேம் வடிகட்டியால் நிறுத்தி வைக்கப்பட்டுள்ள விளம்பரங்களை ஆய்வு செய்து அனுமதியளிக்கவும்
            </p>
          </div>
          <button
            onClick={fetchPendingAds}
            className="text-xs bg-slate-800 border border-slate-600 hover:border-emerald-500 px-3 py-1.5 rounded-lg text-slate-200 transition"
          >
            🔄 புதுப்பி (Refresh)
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 animate-pulse text-sm">
            விளம்பரங்கள் ஏற்றப்படுகின்றன...
          </div>
        ) : ads.length === 0 ? (
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-8 text-center">
            <span className="text-4xl block mb-2">🎉</span>
            <p className="text-emerald-400 font-semibold text-sm">
              ஆய்வுக்குக் காத்திருக்கும் விளம்பரங்கள் ஏதுமில்லை!
            </p>
            <p className="text-xs text-slate-400 mt-1">
              எல்லா விளம்பரங்களும் முறையாக நேரலையாகியுள்ளன.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-slate-800 border border-amber-500/40 rounded-xl p-4 md:p-5 flex flex-col md:flex-row justify-between gap-4 shadow-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                      ⚠️ ஆய்வு தேவை (Pending)
                    </span>
                    <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                      பிரிவு: {ad.module_key}
                    </span>
                    <span className="bg-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                      மாவட்டம்: {ad.district} {ad.taluk ? `(${ad.taluk})` : ''}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base">
                    {ad.ad_title}
                  </h3>

                  <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                    {ad.ad_description || 'விளக்க விவரம் இல்லை'}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span>வணிகம்: <strong className="text-slate-200">{ad.business_name}</strong></span>
                    <span>தொடர்புக்கு: <strong className="text-slate-200">{ad.phone_number}</strong></span>
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-2 shrink-0 md:w-36">
                  <button
                    disabled={processingId === ad.id}
                    onClick={() => handleAction(ad.id, 'approve')}
                    className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs py-2 px-3 rounded-lg transition text-center"
                  >
                    {processingId === ad.id ? '...' : '✅ Approve'}
                  </button>
                  <button
                    disabled={processingId === ad.id}
                    onClick={() => handleAction(ad.id, 'reject')}
                    className="flex-1 md:flex-initial bg-red-600/80 hover:bg-red-600 disabled:opacity-50 text-white font-semibold text-xs py-2 px-3 rounded-lg transition text-center"
                  >
                    {processingId === ad.id ? '...' : '❌ Reject'}
                  </button>
                  <a
                    href={`tel:${ad.phone_number}`}
                    className="hidden md:block bg-slate-700 hover:bg-slate-600 text-slate-200 text-center text-xs py-1.5 px-3 rounded-lg transition"
                  >
                    📞 அழைக்க
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}