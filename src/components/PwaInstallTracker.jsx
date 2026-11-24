import React, { useState, useEffect } from 'react';
import { Download, X, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PwaInstallTracker() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showWelcomeLead, setShowWelcomeLead] = useState(false);
  const [installCount, setInstallCount] = useState(128);
  const [leadData, setLeadData] = useState({ name: '', district: '', whatsapp: '', consent: true });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // 1. ஏற்கனவே இன்ஸ்டால் எண்ணிக்கை இருந்தால் எடுத்தல்
    const savedCount = localStorage.getItem('nb360_install_count');
    if (savedCount) setInstallCount(Number(savedCount));

    // 2. PWA Install Prompt-ஐப் பிடித்தல்
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem('nb360_banner_dismissed');
      if (!dismissed) setShowBanner(true);
    };

    // 3. பயனர் உண்மையிலேயே ஆப்பை Install செய்தவுடன் நடக்கும் நிகழ்வு
    const handleAppInstalled = async () => {
      setShowBanner(false);
      setDeferredPrompt(null);
      const newCount = installCount + 1;
      setInstallCount(newCount);
      localStorage.setItem('nb360_install_count', String(newCount));

      // சட்டப்பூர்வ சம்மதப் பதிவுப் படிவத்தைக் காட்டுதல்
      setShowWelcomeLead(true);

      // Firebase / API வழியாக இன்ஸ்டால் எண்ணிக்கையைப் பதிவு செய்தல்
      try {
        await fetch('/api/track-install', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'app_installed', timestamp: new Date().toISOString() })
        });
      } catch (err) {}
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [installCount]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('உங்கள் பிரவுசர் மெனுவில் (⋮) "Add to Home Screen" அல்லது "Install App" என்பதை அழுத்தி இன்ஸ்டால் செய்யவும்.');
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.consent) return;

    try {
      await fetch('/api/track-install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'vip_user_registered',
          ...leadData,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {}

    setSubmitted(true);
    setTimeout(() => {
      setShowWelcomeLead(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      {/* 1. மிதக்கும் இன்ஸ்டால் பேனர் */}
      {showBanner && (
        <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 bg-slate-900/95 border border-amber-500/40 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 font-bold text-lg">
              📱
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300">நம்ம பூமி 360° App</p>
              <p className="text-[11px] text-slate-300">1-கிளிக்கில் உங்கள் போனில் ஆப்பாகச் சேமிக்கவும்!</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg transition"
            >
              Install
            </button>
            <button
              onClick={() => {
                setShowBanner(false);
                sessionStorage.setItem('nb360_banner_dismissed', '1');
              }}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. ஆப் இன்ஸ்டால் செய்தவுடன் தோன்றும் DPDP சட்டப்பூர்வ VIP வரவேற்புப் படிவம் */}
      {showWelcomeLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-md w-full p-5 text-white shadow-2xl relative">
            <button
              onClick={() => setShowWelcomeLead(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-300">நன்றி! உங்கள் பதிவு வெற்றிகரமாக முடிந்தது</h3>
                <p className="text-xs text-slate-300">தினசரி தங்கம், மண்டி விலை & அரசுத் திட்ட தகவல்கள் உங்களுக்குக் கிடைக்கும்.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" /> நம்ம பூமி 360° வரவேற்பு (இலவச VIP பதிவு)
                </div>
                <h3 className="text-base font-bold text-white">ஆப் இன்ஸ்டால் செய்ததற்கு நன்றி! 🎉</h3>
                <p className="text-xs text-slate-300">
                  உங்கள் மாவட்டத்தின் நிலம், விவசாயம் & மண்டி விலை அறிவிப்புகளை இலவசமாகப் பெற விவரங்களைப் பதிவு செய்யவும் (விருப்பத் தேர்வு):
                </p>

                <input
                  type="text"
                  required
                  placeholder="உங்கள் பெயர்"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />

                <input
                  type="text"
                  required
                  placeholder="உங்கள் மாவட்டம் (எ.கா: காஞ்சிபுரம்)"
                  value={leadData.district}
                  onChange={(e) => setLeadData({ ...leadData, district: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />

                <input
                  type="tel"
                  required
                  placeholder="WhatsApp எண் (10 இலக்கம்)"
                  value={leadData.whatsapp}
                  onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />

                {/* DPDP Act 2023 சட்டப்பூர்வ சம்மத டிக் பாக்ஸ் */}
                <label className="flex items-start gap-2 text-[11px] text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={leadData.consent}
                    onChange={(e) => setLeadData({ ...leadData, consent: e.target.checked })}
                    className="mt-0.5 accent-emerald-500"
                  />
                  <span>
                    நம்ம பூமி 360° சேவை அறிவிப்புகள் மற்றும் முக்கியத் தகவல்களை எனது WhatsApp எண்ணிற்கு அனுப்பச் சம்மதிக்கிறேன். (தனியுரிமைக் கொள்கைக்கு உட்பட்டது)
                  </span>
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition"
                  >
                    இலவசமாகப் பதிவு செய்க
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWelcomeLead(false)}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                  >
                    பிறகு
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. கீழே உள்ள நிரந்தர PWA இன்ஸ்டால் கார்டு */}
      <div className="w-full max-w-5xl mx-auto my-6 px-3">
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-amber-300">
              📲 நம்ம பூமி 360° மொபைல் ஆப் (Play Store தேவையில்லை!)
            </h4>
            <p className="text-xs text-slate-300">
              உங்கள் போன் முகப்புத் திரையில் (Home Screen) நேரடியாக இன்ஸ்டால் செய்து அதிவேகமாகப் பயன்படுத்துங்கள்.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-2 rounded-xl text-center">
              <p className="text-[10px] text-slate-400">ஆப் இன்ஸ்டால் எண்ணிக்கை</p>
              <p className="text-sm font-extrabold text-amber-400">👥 {installCount}+ பயனர்கள்</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> இப்போதே இன்ஸ்டால் செய்க
            </button>
          </div>
        </div>
      </div>
    </>
  );
}