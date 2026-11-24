import React, { useState, useEffect } from 'react';
import { Smartphone, Download, CheckCircle2, Users, X } from 'lucide-react';

export default function PwaInstallTracker() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installCount, setInstallCount] = useState(128); // ஆரம்ப அடிப்படை எண்ணிக்கை + நேரடி பதிவு

  useEffect(() => {
    // சேமிக்கப்பட்ட இன்ஸ்டால் எண்ணிக்கையைப் படித்தல்
    const savedCount = localStorage.getItem('nb_pwa_install_count');
    if (savedCount) {
      setInstallCount(Number(savedCount));
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      const updated = (Number(localStorage.getItem('nb_pwa_install_count')) || 128) + 1;
      localStorage.setItem('nb_pwa_install_count', String(updated));
      setInstallCount(updated);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Live App Install Counter Strip (Footer-க்கு மேல் தெரியும்) */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-emerald-950/90 border border-emerald-700/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400/20 rounded-xl border border-amber-400/40">
              <Smartphone className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                📲 நம்ம பூமி 360° மொபைல் ஆப் (Play Store தேவையில்லை!)
              </h4>
              <p className="text-xs text-emerald-200">
                உங்கள் போன் முகப்புத் திரையில் (Home Screen) நேரடியாக இன்ஸ்டால் செய்து அதிவேகமாகப் பயன்படுத்துங்கள்.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-emerald-600/50 px-3.5 py-2 rounded-xl flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-semibold">ஆப் இன்ஸ்டால் எண்ணிக்கை</p>
                <p className="text-sm font-extrabold text-amber-300">{installCount.toLocaleString('en-IN')}+ பயனர்கள்</p>
              </div>
            </div>

            {isInstalled ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" /> இன்ஸ்டால் செய்யப்பட்டது
              </span>
            ) : (
              deferredPrompt && (
                <button
                  onClick={triggerInstall}
                  className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow transition"
                >
                  <Download className="w-4 h-4" /> இப்போதே இன்ஸ்டால் செய்க
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Floating Mobile Install Popup Banner */}
      {showBanner && !isInstalled && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 bg-slate-900 border-2 border-amber-400 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl shrink-0">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-amber-300">நம்ம பூமி 360° App</p>
              <p className="text-[11px] text-slate-200">1-கிளிக்கில் உங்கள் போனில் ஆப்பாக சேமிக்கவும்!</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={triggerInstall}
              className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-lg hover:bg-amber-300 transition"
            >
              Install
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 text-slate-400 hover:text-white"
              aria-label="மூடு"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}