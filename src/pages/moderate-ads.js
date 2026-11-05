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

  const handleAction = async (ad, action) => {
    const ad_id = ad.id;

    if (action === 'approve_payment') {
      if (!window.confirm('வங்கிக் கணக்கில் ₹99 கட்டணம் பெறப்பட்டதை உறுதி செய்து Featured விளம்பரமாக வெளியிடவா?')) return;
    } else if (action === 'reject_payment') {
      if (!window.confirm('கட்டணத்தை நிராகரித்து இதை இலவச (Basic) விளம்பரமாக மாற்றவா?')) return;
    }

    setProcessingId(ad_id);
    try {
      const res = await fetch('/api/admin/moderate-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad_id, action })
      });
      const result = await res.json();
      if (result.success) {
        setAds(prev => prev.filter(item => item.id !== ad_id));

        // Featured விளம்பரம் அங்கீகரிக்கப்பட்டதும் பயனருக்கு WhatsApp செய்தி அனுப்புதல்
        if (action === 'approve_payment' && ad.phone_number) {
          const rawPhone = (ad.whatsapp_number || ad.phone_number).replace(/\D/g, '');
          const targetPhone = rawPhone.startsWith('91') ? rawPhone : `91${rawPhone}`;
          
          const textMsg = encodeURIComponent(
            `வணக்கம் ${ad.contact_person || ad.business_name}!\n\n` +
            `நம்ம பூமி 360 தளத்தில் நீங்கள் சமர்ப்பித்த விளம்பரம்: *${ad.ad_title}*\n\n` +
            `உங்கள் UPI கட்டணம் ₹99 சரிபார்க்கப்பட்டு, உங்கள் விளம்பரம் அடுத்த 30 நாட்களுக்கு *★ Featured* முன்னுரிமையுடன் வெற்றிகரமாக நேரலையாக்கப்பட்டுள்ளது!\n\n` +
            `விளம்பரத்தைக் காண: https://nammaboomiofficial-app.vercel.app\n\n` +
            `நன்றி!\nநம்ம பூமி 360 குழு`
          );

          window.open(`https://api.whatsapp.com/send?phone=${targetPhone}&text=${textMsg}`, '_blank');
        }
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
              ஸ்பேம் வடிகட்டி மற்றும் Featured கட்டணச் சரிபார்ப்புக்குக் காத்திருக்கும் விளம்பரங்களை ஆய்வு செய்யவும்
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
            {ads.map((ad) => {
              const isFeatured = ad.ad_tier === 'featured';

              return (
                <div
                  key={ad.id}
                  className={`bg-slate-800 rounded-xl p-4 md:p-5 flex flex-col md:flex-row justify-between gap-4 shadow-lg border ${
                    isFeatured ? 'border-amber-400/70 bg-gradient-to-br from-slate-800 to-amber-950/20' : 'border-slate-700'
                  }`}
                >
                  <div className="flex-1 space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isFeatured ? (
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                          ★ FEATURED விளம்பரம் (₹99)
                        </span>
                      ) : (
                        <span className="bg-slate-700 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                          இலவச விளம்பரம் (Basic)
                        </span>
                      )}

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

                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 leading-relaxed">
                      {ad.ad_description || 'விளக்க விவரம் இல்லை'}
                    </p>

                    {/* Featured கட்டண சரிபார்ப்பு பெட்டி */}
                    {isFeatured && (
                      <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300">
                            💰 UPI கட்டண விவரம்:
                          </span>
                          <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/40">
                            சரிபார்ப்பு நிலுவை (Pending Verification)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">UTR / Ref எண்:</span>
                          <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                            {ad.transaction_ref || 'UTR எண் உள்ளிடப்படவில்லை'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          வங்கி அல்லது GPay/PhonePe செயலியில் இந்த UTR எண்ணுக்கு ₹99 வந்துள்ளதா எனச் சரிபார்க்கவும்.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>வணிகம்: <strong className="text-slate-200">{ad.business_name}</strong></span>
                      <span>தொடர்புக்கு: <strong className="text-slate-200">{ad.phone_number}</strong></span>
                    </div>
                  </div>

                  {/* நிர்வாகி செயல்பாட்டு பட்டன்கள் */}
                  <div className="flex md:flex-col justify-end gap-2 shrink-0 md:w-44">
                    {isFeatured ? (
                      <>
                        <button
                          disabled={processingId === ad.id}
                          onClick={() => handleAction(ad, 'approve_payment')}
                          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs py-2 px-3 rounded-lg transition text-center shadow"
                        >
                          {processingId === ad.id ? '...' : '✓ பணம் வந்தது (Featured)'}
                        </button>
                        <button
                          disabled={processingId === ad.id}
                          onClick={() => handleAction(ad, 'reject_payment')}
                          className="bg-amber-600/80 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-xs py-2 px-3 rounded-lg transition text-center"
                        >
                          {processingId === ad.id ? '...' : '✕ தவறு (Basic ஆக்கு)'}
                        </button>
                      </>
                    ) : (
                      <button
                        disabled={processingId === ad.id}
                        onClick={() => handleAction(ad, 'approve')}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs py-2 px-3 rounded-lg transition text-center"
                      >
                        {processingId === ad.id ? '...' : '✅ விளம்பரம் அனுமதி'}
                      </button>
                    )}

                    <button
                      disabled={processingId === ad.id}
                      onClick={() => handleAction(ad, 'reject')}
                      className="bg-red-600/80 hover:bg-red-600 disabled:opacity-50 text-white font-semibold text-xs py-2 px-3 rounded-lg transition text-center"
                    >
                      {processingId === ad.id ? '...' : '❌ விளம்பரம் நிராகரி'}
                    </button>

                    <a
                      href={`https://api.whatsapp.com/send?phone=${(ad.whatsapp_number || ad.phone_number || '').replace(/\D/g, '')}&text=${encodeURIComponent(`வணக்கம், உங்கள் விளம்பரம் (${ad.ad_title}) தொடர்பாக நம்ம பூமி 360 நிர்வாகத்திலிருந்து தொடர்பு கொள்கிறோம்.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700/70 hover:bg-emerald-600 text-white text-center text-xs py-1.5 px-3 rounded-lg transition flex items-center justify-center gap-1"
                    >
                      💬 WhatsApp
                    </a>

                    <a
                      href={`tel:${ad.phone_number}`}
                      className="hidden md:block bg-slate-700 hover:bg-slate-600 text-slate-200 text-center text-xs py-1.5 px-3 rounded-lg transition"
                    >
                      📞 அழைக்க
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}