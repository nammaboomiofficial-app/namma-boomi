import React, { useState } from 'react';
import { ShieldCheck, Info, MessageSquare, CheckCircle2, FileText, X } from 'lucide-react';

export default function FooterTrustHub() {
  const [feedback, setFeedback] = useState({ name: '', district: '', message: '' });
  const [sent, setSent] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'about' | 'privacy' | 'disclaimer'

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.message.trim()) return;

    try {
      await fetch('/api/track-install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'user_feedback',
          ...feedback,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {}

    setSent(true);
    setFeedback({ name: '', district: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-300 mt-10 pb-24 sm:pb-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. நம்மைப் பற்றி (About Us) */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <span>🌱 நம்ம பூமி 360°</span>
            <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-600/40">
              SUPER APP
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            தமிழ்நாடு மக்களுக்கான ஒருங்கிணைந்த நிலம், விவசாயம், அரசு ஆவண வழிகாட்டல், வங்கி கடன் திட்ட அறிக்கை (DPR) மற்றும் AI நிதி வாழ்வியல் டிஜிட்டல் தளம்.
          </p>
          <p className="text-[11px] text-slate-400">
            📍 தலைமையகம்: காஞ்சிபுரம் மாவட்டம், தமிழ்நாடு.<br />
            🤝 நிறுவனர் & நிர்வாகம்: <span className="text-slate-200 font-medium">S. உதயகுமார் (நம்ம பூமி டிஜிட்டல் குழுமம்)</span>
          </p>
        </div>

        {/* 2. சட்ட திட்டம் & வெளிப்படைத்தன்மை (Legal & Compliance) */}
        <div className="space-y-2.5">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> சட்ட திட்டம் & வெளிப்படைத்தன்மை
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-200">பொறுப்புத் துறப்பு (Disclaimer):</strong> இது பொதுமக்கள் பயன்பாட்டிற்கான தனியார் தகவல் மற்றும் வழிகாட்டி தளம் மட்டுமே; எந்த அரசுத் துறையின் அதிகாரப்பூர்வ இணையதளமும் அல்ல.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveLegalModal('about')}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-amber-300 flex items-center gap-1"
            >
              <Info className="w-3 h-3" /> நம்மைப் பற்றி
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-emerald-300 flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" /> தனியுரிமைக் கொள்கை (DPDP)
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('disclaimer')}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300 flex items-center gap-1"
            >
              <FileText className="w-3 h-3" /> விதிமுறைகள்
            </button>
          </div>
        </div>

        {/* 3. மக்கள் கருத்து & ஆலோசனைப் படிவம் (Feedback Form) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" /> உங்கள் கருத்து & ஆலோசனைகள்
          </h4>

          {sent ? (
            <div className="py-4 text-center space-y-1">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
              <p className="text-xs font-semibold text-emerald-300">நன்றி! உங்கள் கருத்து எங்களுக்குக் கிடைத்தது.</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="உங்கள் பெயர்"
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="மாவட்டம்"
                  value={feedback.district}
                  onChange={(e) => setFeedback({ ...feedback, district: e.target.value })}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <textarea
                rows="2"
                required
                placeholder="நம்ம பூமி 360° ஆப் பற்றிய உங்கள் கருத்து அல்லது புதிய சேவைத் தேவையை எழுதுங்கள்..."
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1.5 rounded-lg transition"
              >
                கருத்தை அனுப்புக →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* அடிப்பக்க காப்புரிமை வரி */}
      <div className="border-t border-slate-900 pt-4 px-4 text-center text-[11px] text-slate-500">
        © 2026 நம்ம பூமி 360° (Namma Bhoomi 360°). அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. • இந்திய டிஜிட்டல் தரவு பாதுகாப்புச் சட்டத்திற்கு (DPDP Act 2023) உட்பட்டது.
      </div>

      {/* சட்ட விவரங்கள் பாப்-அப் (Modal) */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 text-white space-y-3 relative shadow-2xl">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {activeLegalModal === 'about' && (
              <>
                <h3 className="text-base font-bold text-amber-400">நம்ம பூமி 360° — எங்களைப் பற்றி</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  தமிழ்நாட்டின் 38 மாவட்ட மக்களும் நில ஆவணங்கள், விவசாய மண்டி விலைகள், அரசு நலத்திட்டங்கள், வங்கி கடன் திட்ட அறிக்கைகள் (DPR) மற்றும் தொழில் வழிகாட்டல்களை ஒரே இடத்தில் எளிய தமிழில் பெற வேண்டும் என்ற நோக்கில் காஞ்சிபுரம் மாவட்டத்தைச் சேர்ந்த S. உதயகுமார் அவர்களால் உருவாக்கப்பட்ட டிஜிட்டல் தளமே <strong>நம்ம பூமி 360°</strong>.
                </p>
              </>
            )}

            {activeLegalModal === 'privacy' && (
              <>
                <h3 className="text-base font-bold text-emerald-400">தனியுரிமைக் கொள்கை (DPDP Act 2023)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. பயனர்களின் வெளிப்படையான சம்மதத்துடன் மட்டுமே பெயர், மாவட்டம் மற்றும் WhatsApp எண் பெறப்படுகிறது.<br />
                  2. உங்கள் தனிப்பட்ட தகவல்கள் எந்த மூன்றாம் தரப்பு நிறுவனங்களுக்கும் விற்கப்படவோ பகிரப்படவோ மாட்டாது.<br />
                  3. எந்த நேரத்திலும் WhatsApp மூலம் உங்கள் தகவல்களை நீக்குமாறு கோரலாம்.
                </p>
              </>
            )}

            {activeLegalModal === 'disclaimer' && (
              <>
                <h3 className="text-base font-bold text-amber-300">பொறுப்புத் துறப்பு & விதிமுறைகள் (Disclaimer)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. நம்ம பூமி 360° ஒரு தனியார் தகவல் மற்றும் AI வழிகாட்டி தளம் மட்டுமே; இது தமிழ்நாடு அல்லது இந்திய அரசின் அதிகாரப்பூர்வ இணையதளம் அல்ல.<br />
                  2. பட்டா, சிட்டா, EC போன்ற அரசுச் சேவைகளுக்கு அந்தந்த அரசு இணையதளங்களின் (eservices.tn.gov.in, tnreginet.gov.in) தகவல்களே இறுதியானவை.<br />
                  3. தங்கம் மற்றும் காய்கறி விலைகள் சந்தை நிலவரத்திற்கு ஏற்ப மாறுபடக்கூடியவை.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}