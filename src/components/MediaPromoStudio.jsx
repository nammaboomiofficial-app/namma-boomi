import React, { useState, useRef, useEffect } from 'react';
import { getWhatsAppUrl } from '../config';

const BUSINESS_CATEGORIES = [
  { id: 'realestate', label: '🏘️ ரியல் எஸ்டேட் / மனைப் பிரிவு', theme: '#065f46', accent: '#fbbf24', badge: 'DTCP / RERA அங்கீகாரம்' },
  { id: 'business', label: '🏪 உள்ளூர் கடை / வணிகம் / சலுகை', theme: '#1e3a8a', accent: '#38bdf8', badge: 'சிறப்புத் தள்ளுபடி' },
  { id: 'agri', label: '🌾 விவசாயம் / இயற்கை விளைபொருட்கள்', theme: '#14532d', accent: '#a3e635', badge: '100% இயற்கை விளைச்சல்' },
  { id: 'jobs', label: '💼 வேலைவாய்ப்பு / ஆட்கள் தேவை', theme: '#312e81', accent: '#c084fc', badge: 'உடனடி பணி நியமனம்' },
  { id: 'heritage', label: '🌿 சித்த மருத்துவம் / பாரம்பரிய உணவு', theme: '#7c2d12', accent: '#fdba74', badge: 'பாரம்பரியத் தரம்' },
  { id: 'tourism', label: '🗺️ சுற்றுலா / ஆன்மீக யாத்திரை', theme: '#581c87', accent: '#f472b6', badge: 'குடும்ப சுற்றுலா பேக்கேஜ்' }
];

const POSTER_TEMPLATES = [
  { id: 'royal_gold', name: '👑 ராயல் கோல்டு & எமரால்டு', bg1: '#064e3b', bg2: '#022c22', accent: '#fbbf24' },
  { id: 'midnight_blue', name: '🌌 மிட்நைட் ப்ளூ & சியான்', bg1: '#1e3a8a', bg2: '#0f172a', accent: '#38bdf8' },
  { id: 'crimson_festive', name: '🔥 திருவிழா சிவப்பு & தங்கம்', bg1: '#7f1d1d', bg2: '#1c1917', accent: '#facc15' },
  { id: 'emerald_nature', name: '🌿 பசுமை விவசாயம் & இயற்கை', bg1: '#14532d', bg2: '#052e16', accent: '#86efac' }
];

export default function MediaPromoStudio({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('poster'); // 'poster' | 'adcopy' | 'aiprompts' | 'visitingcard'
  const [selectedCat, setSelectedCat] = useState(BUSINESS_CATEGORIES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(POSTER_TEMPLATES[0]);

  const [posterData, setPosterData] = useState({
    businessName: 'நம்ம பூமி ரியல் எஸ்டேட் & ப்ராப்பர்ட்டீஸ்',
    headline: 'அருமையான வீட்டுமனைகள் விற்பனைக்கு!',
    offerText: 'சதுர அடி ₹1,499 முதல் • உடனடி பத்திரப்பதிவு & வங்கிக் கடன் வசதி',
    location: 'திருப்போரூர் • சாலவாக்கம் • காஞ்சிபுரம் மாவட்டம்',
    phone: '98400 00000',
    ctaText: 'இன்றே நேரில் பார்வையிட அழைக்கவும்!'
  });

  const [cardData, setCardData] = useState({
    personName: 'S. உதயகுமார்',
    designation: 'நிறுவனர் • ரியல் எஸ்டேட் & தொழில் ஆலோசகர்',
    companyName: 'நம்ம பூமி 360° ப்ராப்பர்ட்டீஸ்',
    phone: '98400 00000',
    email: 'nammaboomiofficial@gmail.com',
    address: 'திருப்போரூர் • சாலவாக்கம் • காஞ்சிபுரம் மாவட்டம்',
    services: 'வீட்டுமனைகள் • விவசாய நிலங்கள் • வங்கிக் கடன் & பத்திரப்பதிவு'
  });

  const [generatedAdCopy, setGeneratedAdCopy] = useState('');
  const [generatedPrompts, setGeneratedPrompts] = useState({ imagePrompt: '', videoPrompt: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef(null);
  const cardCanvasRef = useRef(null);

  // 1. Canvas-ல் நேரடியாக HD போஸ்டர் வரைதல்
  useEffect(() => {
    if (activeTab !== 'poster') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 800;
    const H = 800;
    canvas.width = W;
    canvas.height = H;

    // பின்னணி Gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, selectedTemplate.bg1);
    grad.addColorStop(1, selectedTemplate.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // அலங்கார வட்டங்கள்
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.arc(W - 80, 100, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(80, H - 80, 200, 0, Math.PI * 2);
    ctx.fill();

    // தங்க நிற Border Frame
    ctx.strokeStyle = selectedTemplate.accent;
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, W - 48, H - 48);

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(38, 38, W - 76, H - 76);

    // மேல் Badge
    ctx.fillStyle = selectedTemplate.accent;
    ctx.fillRect(210, 62, 380, 44);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(selectedCat.badge, W / 2, 91);

    // நிறுவனத்தின் பெயர்
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    wrapText(ctx, posterData.businessName || 'நம்ம பூமி 360°', W / 2, 165, 680, 40);

    // பிரிப்புக் கோடு
    ctx.strokeStyle = selectedTemplate.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(180, 225);
    ctx.lineTo(620, 225);
    ctx.stroke();

    // முதன்மைத் தலைப்பு (Headline)
    ctx.fillStyle = selectedTemplate.accent;
    ctx.font = 'bold 42px sans-serif';
    wrapText(ctx, posterData.headline || 'சிறப்பு அறிவிப்பு!', W / 2, 305, 680, 54);

    // சலுகை / சிறப்பம்சம் Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
    ctx.fillRect(70, 430, W - 140, 125);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(70, 430, W - 140, 125);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 24px sans-serif';
    wrapText(ctx, posterData.offerText || 'தரமான சேவை • நியாயமான விலை', W / 2, 480, 620, 36);

    // இடம் / மாவட்டம்
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 22px sans-serif';
    wrapText(ctx, `📍 ${posterData.location || 'தமிழ்நாடு'}`, W / 2, 605, 680, 32);

    // தொடர்பு எண் & CTA பட்டன்
    ctx.fillStyle = selectedTemplate.accent;
    ctx.fillRect(110, 645, W - 220, 68);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`📞 ${posterData.phone || '98400 00000'}`, W / 2, 688);

    // Footer Branding
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = '16px sans-serif';
    ctx.fillText('நம்ம பூமி 360° டிஜிட்டல் விளம்பர ஸ்டுடியோ • தமிழ்நாடு', W / 2, 752);
  }, [activeTab, posterData, selectedTemplate, selectedCat]);

  // 2. 4-வது டேப்: Digital Visiting Card + WhatsApp QR Code வரைதல்
  useEffect(() => {
    if (activeTab !== 'visitingcard') return;
    const canvas = cardCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 900;
    const H = 520;
    canvas.width = W;
    canvas.height = H;

    // பின்னணி Gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, selectedTemplate.bg1);
    grad.addColorStop(1, '#090d16');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // தங்க நிற Border
    ctx.strokeStyle = selectedTemplate.accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(18, 18, W - 36, H - 36);

    // வலதுபுறம் QR Code-க்கான வெள்ளை பெட்டி
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(635, 115, 200, 200);
    ctx.fillStyle = selectedTemplate.accent;
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📲 Scan for WhatsApp', 735, 342);

    // இடதுபுறம் பெயர் & விவரங்கள்
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedTemplate.accent;
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(cardData.companyName || 'நம்ம பூமி 360°', 55, 78);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(cardData.personName || 'உங்கள் பெயர்', 55, 140);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 19px sans-serif';
    ctx.fillText(cardData.designation || 'தொழில் ஆலோசகர்', 55, 178);

    // பிரிப்புக் கோடு
    ctx.strokeStyle = selectedTemplate.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(55, 202);
    ctx.lineTo(580, 202);
    ctx.stroke();

    // சேவைகள்
    ctx.fillStyle = '#f8fafc';
    ctx.font = '18px sans-serif';
    wrapText(ctx, `✨ ${cardData.services}`, 55, 242, 530, 28);

    // தொடர்பு விவரங்கள்
    ctx.fillStyle = selectedTemplate.accent;
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`📞 ${cardData.phone}`, 55, 330);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '18px sans-serif';
    ctx.fillText(`✉️ ${cardData.email}`, 55, 368);
    wrapText(ctx, `📍 ${cardData.address}`, 55, 405, 550, 26);

    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '14px sans-serif';
    ctx.fillText('Powered by நம்ம பூமி 360° Digital Business Suite', 55, 475);

    // நேரடி WhatsApp QR Code படம் ஏற்றுதல்
    const cleanPhone = (cardData.phone || '9840000000').replace(/\D/g, '');
    const waLink = encodeURIComponent(`https://wa.me/91${cleanPhone.slice(-10)}`);
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${waLink}`;
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 645, 125, 180, 180);
    };
  }, [activeTab, cardData, selectedTemplate]);

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  }

  const handleDownloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `NammaBoomi360-Poster-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadCard = () => {
    const canvas = cardCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `NammaBoomi360-VisitingCard-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleGenerateMarketingKit = async () => {
    setIsGenerating(true);

    const fallbackCopy =
      `🔥 ${posterData.headline} 🔥\n\n` +
      `🏢 ${posterData.businessName}\n` +
      `✨ சிறப்பம்சம்: ${posterData.offerText}\n` +
      `📍 இடம்: ${posterData.location}\n\n` +
      `✅ நம்பகமான சேவை & உடனடித் தீர்வு!\n` +
      `📞 தொடர்புக்கு: ${posterData.phone}\n` +
      `👉 ${posterData.ctaText}\n\n` +
      `#NammaBoomi360 #TamilNadu #${selectedCat.id}`;

    const fallbackImgPrompt =
      `Ultra-realistic 8K commercial promotional poster photography for "${posterData.businessName}" in Tamil Nadu, showcasing ${selectedCat.label}, golden hour sunlight, vibrant South Indian cultural and modern aesthetic, clean composition with space for Tamil typography, sharp focus, professional advertising shot --ar 4:5`;

    const fallbackVidPrompt =
      `Cinematic 15-second vertical Instagram Reel / YouTube Short video for "${posterData.businessName}" located in ${posterData.location}. Smooth drone establishing shot transitioning into warm welcoming close-ups of ${selectedCat.label}, uplifting Tamil folk-fusion background music, high contrast 4K resolution, 60fps.`;

    setGeneratedAdCopy(fallbackCopy);
    setGeneratedPrompts({ imagePrompt: fallbackImgPrompt, videoPrompt: fallbackVidPrompt });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch('/api/polish-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formData: {
            applicantName: posterData.businessName,
            taluk: posterData.location,
            district: posterData.location,
            subject: `${posterData.businessName} - ${posterData.headline}`
          },
          selectedForm: '360 AI Social Media Ad Copy Generator',
          applicationMode: 'business',
          customNote: `"${posterData.businessName}" நிறுவனத்தின் "${posterData.headline}" (${posterData.offerText}, இடம்: ${posterData.location}, எண்: ${posterData.phone}) விளம்பரத்திற்கு WhatsApp மற்றும் Instagram-ல் அதிக வாடிக்கையாளர்களை ஈர்க்கும் வகையில் Emoji-களுடன் கூடிய கவர்ச்சிகரமான தமிழ் விளம்பர வாசகம் எழுது.`
        })
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.polishedText) setGeneratedAdCopy(data.polishedText);
      }
    } catch (err) {
      // Fallback already set
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('வெற்றிகரமாக காப்பி (Copy) செய்யப்பட்டது!');
  };

  return (
    <div className="w-full space-y-8 text-left">
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-indigo-950/60 via-slate-900/95 to-slate-950 p-5 md:p-8 shadow-2xl backdrop-blur-md">
        {/* 1. முதன்மை பேனர் */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/40 rounded-full">
              நம்ம பூமி 360° • AI Media & Digital Promo Studio
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2 flex items-center gap-2">
              <span>🎬</span> AI விளம்பர போஸ்டர், வாசகம் & வீடியோ ஸ்டுடியோ
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              உங்கள் ரியல் எஸ்டேட் மனைகள், கடைகள், விவசாயப் பொருட்கள் மற்றும் தொழில்களுக்கு நொடியில் HD போஸ்டர் & Digital Visiting Card உருவாக்கி டவுன்லோட் செய்யுங்கள்!
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-3 rounded-xl border border-purple-500/30">
            <span className="text-3xl">🎨</span>
            <div className="text-xs">
              <span className="text-purple-400 font-bold block">1-Click Poster, Card & AI Copy</span>
              <span className="text-slate-100 text-[11px]">WhatsApp • Instagram • YouTube</span>
            </div>
          </div>
        </div>

        {/* 2. டேப்கள் */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('poster')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'poster' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 border border-slate-800'
            }`}
          >
            🖼️ 1. உடனடி HD போஸ்டர் உருவாக்கி (Download)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('adcopy');
              if (!generatedAdCopy) handleGenerateMarketingKit();
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'adcopy' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 border border-slate-800'
            }`}
          >
            ✍️ 2. AI WhatsApp & Instagram விளம்பர வாசகம்
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('aiprompts');
              if (!generatedPrompts.imagePrompt) handleGenerateMarketingKit();
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'aiprompts' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 border border-slate-800'
            }`}
          >
            🎥 3. AI Image & Reels Video Prompts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('visitingcard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'visitingcard' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-100 border border-slate-800'
            }`}
          >
            🪪 4. Digital Visiting Card + QR
          </button>
        </div>

        {/* 3. உள்ளடக்கம் */}
        <div className="mt-6">
          {activeTab === 'poster' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* இடது பக்கம்: விவரங்கள் உள்ளீடு */}
              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                <h3 className="text-sm font-black text-purple-400">📝 போஸ்டர் விவரங்களை உள்ளிடுங்கள்:</h3>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">1. தொழில் பிரிவு:</label>
                  <select
                    value={selectedCat.id}
                    onChange={(e) => {
                      const found = BUSINESS_CATEGORIES.find((c) => c.id === e.target.value);
                      if (found) setSelectedCat(found);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  >
                    {BUSINESS_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">2. போஸ்டர் நிறம் & தீம்:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {POSTER_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tpl)}
                        className={`px-3 py-2 rounded-lg border text-left font-bold cursor-pointer ${
                          selectedTemplate.id === tpl.id
                            ? 'bg-purple-600 text-white border-purple-400'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        {tpl.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">3. நிறுவனம் / கடை / புராஜெக்ட் பெயர்:</label>
                  <input
                    type="text"
                    value={posterData.businessName}
                    onChange={(e) => setPosterData({ ...posterData, businessName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">4. முதன்மைத் தலைப்பு (Headline):</label>
                  <input
                    type="text"
                    value={posterData.headline}
                    onChange={(e) => setPosterData({ ...posterData, headline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">5. சலுகை / விலை / சிறப்பம்சம்:</label>
                  <textarea
                    rows={2}
                    value={posterData.offerText}
                    onChange={(e) => setPosterData({ ...posterData, offerText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">6. ஊர் / மாவட்டம்:</label>
                    <input
                      type="text"
                      value={posterData.location}
                      onChange={(e) => setPosterData({ ...posterData, location: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">7. தொடர்பு எண்:</label>
                    <input
                      type="text"
                      value={posterData.phone}
                      onChange={(e) => setPosterData({ ...posterData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* வலது பக்கம்: Live HD Poster Preview & Download */}
              <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-purple-500/30 flex flex-col items-center space-y-4">
                <div className="w-full flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400">✨ நேரடி HD போஸ்டர் முன்னோட்டம் (800x800)</span>
                  <button
                    type="button"
                    onClick={handleDownloadPoster}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg cursor-pointer"
                  >
                    ⬇️ போஸ்டர் டவுன்லோட் (PNG)
                  </button>
                </div>

                <div className="w-full max-w-[420px] aspect-square rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  <canvas ref={canvasRef} className="w-full h-full object-contain" />
                </div>

                <div className="flex flex-wrap gap-2 w-full justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      handleGenerateMarketingKit();
                      setActiveTab('adcopy');
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
                  >
                    ✍️ இதற்கான விளம்பர வாசகம் உருவாக்கு ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'adcopy' && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-purple-400">✍️ WhatsApp & Instagram கவர்ச்சிகரமான விளம்பர வாசகம்</h3>
                  <p className="text-xs text-slate-300">உங்கள் போஸ்டர் விவரங்களுக்கு ஏற்ப உருவாக்கப்பட்ட விளம்பர உரை.</p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateMarketingKit}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
                >
                  {isGenerating ? 'உருவாகிறது... ✨' : '🔄 மீண்டும் உருவாக்கு'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 whitespace-pre-line leading-relaxed">
                {generatedAdCopy}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedAdCopy)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                >
                  📋 வாசகத்தை காப்பி செய் (Copy)
                </button>
                <button
                  type="button"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(generatedAdCopy)}`, '_blank')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                >
                  📲 வாட்ஸ்அப்பில் பகிர்க
                </button>
              </div>
            </div>
          )}

          {activeTab === 'aiprompts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* 1. AI Image Prompt பெட்டி + நேரடி இணைப்புகள் */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-sky-500/30 space-y-4">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-sm font-black text-sky-400">🎨 AI Image Prompt (விளம்பரப் படங்கள்)</h4>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedPrompts.imagePrompt)}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold cursor-pointer shrink-0"
                  >
                    📋 Copy Prompt
                  </button>
                </div>
                <p className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                  {generatedPrompts.imagePrompt}
                </p>
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 block">
                    🚀 Copy செய்த பின் நேரடியாகப் படம் உருவாக்கத் திறக்கவும்:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://gemini.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-sky-950 text-sky-300 border border-sky-500/40 font-bold transition"
                    >
                      ✨ Google Gemini ↗
                    </a>
                    <a
                      href="https://ideogram.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-sky-950 text-sky-300 border border-sky-500/40 font-bold transition"
                    >
                      🖼️ Ideogram AI ↗
                    </a>
                    <a
                      href="https://www.canva.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-sky-950 text-sky-300 border border-sky-500/40 font-bold transition"
                    >
                      🎨 Canva AI ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* 2. AI Video Reels Prompt பெட்டி + நேரடி இணைப்புகள் */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-pink-500/30 space-y-4">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-sm font-black text-pink-400">🎬 AI Video Reels Prompt (வீடியோ விளம்பரம்)</h4>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedPrompts.videoPrompt)}
                    className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold cursor-pointer shrink-0"
                  >
                    📋 Copy Prompt
                  </button>
                </div>
                <p className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                  {generatedPrompts.videoPrompt}
                </p>
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 block">
                    🎥 Copy செய்த பின் நேரடியாக Reels வீடியோ உருவாக்கத் திறக்கவும்:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://klingai.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-pink-950 text-pink-300 border border-pink-500/40 font-bold transition"
                    >
                      🎬 Kling AI ↗
                    </a>
                    <a
                      href="https://runwayml.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-pink-950 text-pink-300 border border-pink-500/40 font-bold transition"
                    >
                      🎥 Runway ML ↗
                    </a>
                    <a
                      href="https://hailuoai.video/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-pink-950 text-pink-300 border border-pink-500/40 font-bold transition"
                    >
                      ⚡ Hailuo AI ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visitingcard' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* இடது பக்கம்: விவரங்கள் */}
              <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <h3 className="text-sm font-black text-amber-400">🪪 விசிட்டிங் கார்டு விவரங்கள்:</h3>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">உங்கள் பெயர்:</label>
                  <input
                    type="text"
                    value={cardData.personName}
                    onChange={(e) => setCardData({ ...cardData, personName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">பதவி / தொழில் பிரிவு:</label>
                  <input
                    type="text"
                    value={cardData.designation}
                    onChange={(e) => setCardData({ ...cardData, designation: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">நிறுவனம் பெயர்:</label>
                  <input
                    type="text"
                    value={cardData.companyName}
                    onChange={(e) => setCardData({ ...cardData, companyName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">WhatsApp எண் (QR):</label>
                    <input
                      type="text"
                      value={cardData.phone}
                      onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">மின்னஞ்சல் (Email):</label>
                    <input
                      type="text"
                      value={cardData.email}
                      onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">முக்கிய சேவைகள்:</label>
                  <input
                    type="text"
                    value={cardData.services}
                    onChange={(e) => setCardData({ ...cardData, services: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">முகவரி / ஊர்:</label>
                  <input
                    type="text"
                    value={cardData.address}
                    onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* வலது பக்கம்: Live Digital Card + QR Preview */}
              <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-amber-500/30 flex flex-col items-center space-y-4">
                <div className="w-full flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400">✨ நேரடி Digital Visiting Card + WhatsApp QR</span>
                  <button
                    type="button"
                    onClick={handleDownloadCard}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg cursor-pointer"
                  >
                    ⬇️ விசிட்டிங் கார்டு டவுன்லோட் (PNG)
                  </button>
                </div>

                <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  <canvas ref={cardCanvasRef} className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. நம்ம பூமி 360° விளம்பரப் பிரிவுடன் இணைப்பு */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300">
            🚀 உங்கள் விளம்பரத்தை **நம்ம பூமி 360°** தளத்தில் 38 மாவட்ட மக்களிடமும் கொண்டு சேர்க்க வேண்டுமா?
          </div>
          <button
            type="button"
            onClick={() =>
              window.open(
                getWhatsAppUrl(`வணக்கம் நம்ம பூமி 360! நான் என் தொழிலுக்கான டிஜிட்டல் விளம்பரம் வெளியிட விரும்புகிறேன்.\n\n🏢 நிறுவனம்: ${posterData.businessName}\n📍 இடம்: ${posterData.location}\n📞 எண்: ${posterData.phone}`),
                '_blank'
              )
            }
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg cursor-pointer shrink-0"
          >
            நம்ம பூமி 360°-ல் விளம்பரம் வெளியிட ↗
          </button>
        </div>
      </div>
    </div>
  );
}