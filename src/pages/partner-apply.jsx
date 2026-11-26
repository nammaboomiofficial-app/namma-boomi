import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Sparkles, CheckCircle2, MapPin, Briefcase, Phone, User, ArrowLeft } from 'lucide-react';

const TN_DISTRICTS_TALUKS = {
  Ariyalur: ['Ariyalur', 'Sendurai', 'Udayarpalayam', 'Andimadam'],
  Chengalpattu: ['Chengalpattu', 'Thiruporur', 'Tirukalukundram', 'Madurantakam', 'Cheyyur', 'Vandalur', 'Tambaram', 'Pallavaram'],
  Chennai: ['Alandur', 'Ambattur', 'Aminjikarai', 'Ayanavaram', 'Egmore', 'Guindy', 'Madhavaram', 'Maduravoyal', 'Mambalam', 'Mylapore', 'Perambur', 'Purasawalkam', 'Sholinganallur', 'Tiruvottiyur', 'Tondiarpet', 'Velachery'],
  Coimbatore: ['Coimbatore North', 'Coimbatore South', 'Pollachi', 'Valparai', 'Mettupalayam', 'Sulur', 'Annur', 'Kinathukadavu', 'Madukkarai', 'Perur'],
  Cuddalore: ['Cuddalore', 'Chidambaram', 'Panruti', 'Kurinjipadi', 'Bhuvanagiri', 'Kattumannarkoil', 'Tittakudi', 'Veppur', 'Virudhachalam', 'Srimushnam'],
  Dharmapuri: ['Dharmapuri', 'Harur', 'Pappireddipatti', 'Palacode', 'Pennagaram', 'Karimangalam', 'Nallampalli'],
  Dindigul: ['Dindigul East', 'Dindigul West', 'Palani', 'Kodaikanal', 'Oddanchatram', 'Athoor', 'Natham', 'Nilakottai', 'Vedasandur', 'Gujiliamparai'],
  Erode: ['Erode', 'Gobichettipalayam', 'Bhavani', 'Perundurai', 'Sathyamangalam', 'Anthiyur', 'Kodumudi', 'Modakurichi', 'Nambiyur', 'Thalavadi'],
  Kallakurichi: ['Kallakurichi', 'Chinnasalem', 'Kalvarayan Hills', 'Sankarapuram', 'Tirukoilur', 'Ulundurpet'],
  Kancheepuram: ['Kancheepuram', 'Sriperumbudur', 'Uthiramerur', 'Walajabad', 'Kundrathur'],
  Kanniyakumari: ['Agastheeswaram', 'Thovalai', 'Kalkulam', 'Vilavancode', 'Killiyoor', 'Thiruvattar'],
  Karur: ['Karur', 'Kulithalai', 'Aravakurichi', 'Kadavur', 'Krishnarayapuram', 'Manmangalam', 'Pugalur'],
  Krishnagiri: ['Krishnagiri', 'Hosur', 'Denkanikottai', 'Pochampalli', 'Uthangarai', 'Bargur', 'Shoolagiri', 'Anchetty'],
  Madurai: ['Madurai North', 'Madurai South', 'Madurai East', 'Madurai West', 'Melur', 'Thirumangalam', 'Usilampatti', 'Vadipatti', 'Peraiyur', 'Kallikudi'],
  Mayiladuthurai: ['Mayiladuthurai', 'Sirkazhi', 'Tarangambadi', 'Kuthalam'],
  Nagapattinam: ['Nagapattinam', 'Kilvelur', 'Thirukkuvalai', 'Vedaranyam'],
  Namakkal: ['Namakkal', 'Tiruchengode', 'Rasipuram', 'Paramathi Velur', 'Kumarapalayam', 'Mohanur', 'Kolli Hills', 'Sendamangalam'],
  Nilgiris: ['Udhagamandalam', 'Coonoor', 'Gudalur', 'Kotagiri', 'Kundah', 'Pandalur'],
  Perambalur: ['Perambalur', 'Kunnam', 'Alathur', 'Veppanthattai'],
  Pudukkottai: ['Pudukkottai', 'Alangudi', 'Aranthangi', 'Avadaiyarkoil', 'Gandarvakottai', 'Illuppur', 'Karambakudi', 'Kulathur', 'Manamelkudi', 'Ponnamaravathi', 'Thirumayam', 'Viralimalai'],
  Ramanathapuram: ['Ramanathapuram', 'Paramakudi', 'Rameswaram', 'Kilakarai', 'Mudukulathur', 'Kadaladi', 'Kamuthi', 'Rajasingamangalam', 'Tiruvadanai'],
  Ranipet: ['Ranipet', 'Arakkonam', 'Arcot', 'Nemili', 'Sholinghur', 'Walajah'],
  Salem: ['Salem', 'Salem South', 'Salem West', 'Attur', 'Mettur', 'Omalur', 'Sankari', 'Edappadi', 'Gangavalli', 'Valapady', 'Yercaud', 'Kadaiyampatti', 'Pethanaickenpalayam'],
  Sivaganga: ['Sivaganga', 'Karaikudi', 'Devakottai', 'Manamadurai', 'Ilayangudi', 'Kalayarkoil', 'Singampunari', 'Tiruppathur'],
  Tenkasi: ['Tenkasi', 'Sankarankovil', 'Shencottai', 'Alangulam', 'Kadayanallur', 'Veerakeralampudur', 'Tiruvengadam', 'Sivagiri'],
  Thanjavur: ['Thanjavur', 'Kumbakonam', 'Pattukkottai', 'Orathanadu', 'Thiruvaiyaru', 'Papanasam', 'Peravurani', 'Budalur', 'Thiruvidaimarudur'],
  Theni: ['Theni', 'Periyakulam', 'Uthamapalayam', 'Bodinayakanur', 'Andipatti'],
  Thoothukudi: ['Thoothukudi', 'Tiruchendur', 'Kovilpatti', 'Srivaikuntam', 'Ottapidaram', 'Vilathikulam', 'Kayathar', 'Eral', 'Ettayapuram', 'Sathankulam'],
  Tiruchirappalli: ['Tiruchirappalli West', 'Tiruchirappalli East', 'Srirangam', 'Lalgudi', 'Manachanallur', 'Manapparai', 'Musiri', 'Thuraiyur', 'Marungapuri', 'Thottiyam', 'Srirangam North'],
  Tirunelveli: ['Tirunelveli', 'Palayamkottai', 'Ambasamudram', 'Cheranmahadevi', 'Nanguneri', 'Radhapuram', 'Tisayanvilai', 'Manur'],
  Tirupathur: ['Tirupathur', 'Ambur', 'Vaniyambadi', 'Natrampalli'],
  Tiruppur: ['Tiruppur North', 'Tiruppur South', 'Avinashi', 'Dharapuram', 'Kangeyam', 'Palladam', 'Udumalaipettai', 'Madathukulam', 'Uthukuli'],
  Tiruvallur: ['Tiruvallur', 'Avadi', 'Poonamallee', 'Ambattur (West)', 'Gummidipoondi', 'Ponneri', 'Tiruttani', 'Pallipattu', 'Uthukottai', 'R.K. Pet'],
  Tiruvannamalai: ['Tiruvannamalai', 'Arni', 'Cheyyar', 'Polur', 'Chengam', 'Vandavasi', 'Kalasapakkam', 'Kilpennathur', 'Thanipadi', 'Thandarampattu', 'Jamunamarathur', 'Chetpet'],
  Tiruvarur: ['Tiruvarur', 'Mannargudi', 'Nannilam', 'Thiruthuraipoondi', 'Kodavasal', 'Koothanallur', 'Needamangalam', 'Valangaiman'],
  Vellore: ['Vellore', 'Katpadi', 'Gudiyatham', 'Pernambut', 'Anaicut', 'K.V. Kuppam'],
  Villupuram: ['Villupuram', 'Tindivanam', 'Vikravandi', 'Gingee', 'Vanur', 'Marakkanam', 'Melmalayanur', 'Kandachipuram', 'Thiruvennainallur'],
  Virudhunagar: ['Virudhunagar', 'Sivakasi', 'Rajapalayam', 'Srivilliputtur', 'Aruppukkottai', 'Sattur', 'Kariapatti', 'Tiruchuli', 'Watrap', 'Vembakottai'],
};

const DISTRICT_LIST = Object.keys(TN_DISTRICTS_TALUKS).sort();

export default function PartnerApplyPage() {
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    district: '',
    taluk: '',
    occupation: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const availableTaluks = form.district ? TN_DISTRICTS_TALUKS[form.district] || [] : [];

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setForm((prev) => ({
      ...prev,
      district: selectedDistrict,
      taluk: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/submit-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          offerType: 'Founding Taluk Partner (75% First Month Offer)',
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'விண்ணப்பத்தை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg('இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4 sm:px-6">
      <Head>
        <title>Founding Taluk Partner விண்ணப்பம் - நம்ம பூமி 360°</title>
        <meta
          name="description"
          content="தமிழ்நாட்டின் 38 மாவட்டங்கள் மற்றும் அனைத்து தாலுகாக்களுக்கும் Founding Taluk Partner விண்ணப்பம். முதல் மாதம் 75% விளம்பர வருமானப் பங்கு."
        />
      </Head>

      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> முகப்புப் பக்கத்திற்குச் செல்ல
        </Link>

        {/* Hero Offer Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950/40 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> முதல் மாதம் 75% விளம்பர வருமானப் பங்கு
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            Founding Taluk Partner – 38 மாவட்ட விண்ணப்பம்
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            உங்கள் தாலுகாவில் உள்ள உள்ளூர் வணிகங்கள், ரியல் எஸ்டேட் மற்றும் சேவை விளம்பரங்களை இணைத்து, முதல் மாதத்திலேயே{' '}
            <span className="text-amber-300 font-bold">₹25,000 முதல் ₹60,000+</span> வரை சம்பாதிக்கலாம். ஒவ்வொரு தாலுகாவுக்கும் முதலில் தகுதி பெறும் ஒருவருக்கே Exclusive வாய்ப்பு.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <p className="font-bold text-emerald-400">1-ஆம் மாதம்: 75% பங்கு</p>
              <p className="text-slate-400 mt-0.5">2-வது மாதம் முதல் 50% தொடர் பங்கு</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <p className="font-bold text-amber-300">Exclusive தாலுகா</p>
              <p className="text-slate-400 mt-0.5">ஒரு தாலுகாவுக்கு ஒரு பார்ட்னர் மட்டுமே</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <p className="font-bold text-indigo-300">ID & Badge</p>
              <p className="text-slate-400 mt-0.5">QR ID கார்டு & Verified Profile</p>
            </div>
          </div>
        </div>

        {/* Form or Success Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h2 className="text-lg sm:text-xl font-extrabold text-amber-300">
                விண்ணப்பம் வெற்றிகரமாகப் பதிவானது!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                நன்றி <span className="font-bold text-white">{form.name}</span>! உங்கள்{' '}
                <span className="text-emerald-400 font-semibold">
                  {form.district} – {form.taluk}
                </span>{' '}
                தாலுகா பார்ட்னர் விண்ணப்பம் பெறப்பட்டது. 1-on-1 பரிசீலனைக்குப் பிறகு விரைவில் தொடர்பு கொள்வோம்.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: '',
                    whatsapp: '',
                    district: '',
                    taluk: '',
                    occupation: '',
                    notes: '',
                  });
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
              >
                மற்றொரு விண்ணப்பம் பதிவு செய்க
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-extrabold text-amber-300">பார்ட்னர் விண்ணப்பப் படிவம்</h2>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" /> முழுப் பெயர் *
                </label>
                <input
                  type="text"
                  required
                  placeholder="உங்கள் பெயரை உள்ளிடவும்"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp / மொபைல் எண் *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10 இலக்க மொபைல் எண்"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> மாவட்டம் (38 மாவட்டங்கள்) *
                  </label>
                  <select
                    required
                    value={form.district}
                    onChange={handleDistrictChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">மாவட்டத்தைத் தேர்ந்தெடுக்கவும்</option>
                    {DISTRICT_LIST.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> தாலுகா *
                  </label>
                  <select
                    required
                    disabled={!form.district}
                    value={form.taluk}
                    onChange={(e) => setForm({ ...form, taluk: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                  >
                    <option value="">
                      {form.district ? 'தாலுகாவைத் தேர்ந்தெடுக்கவும்' : 'முதலில் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்'}
                    </option>
                    {availableTaluks.map((tlk) => (
                      <option key={tlk} value={tlk}>
                        {tlk}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> தற்போதைய தொழில் / அனுபவம் *
                </label>
                <input
                  type="text"
                  required
                  placeholder="உதாரணம்: Real Estate, Sales/Marketing, Civil/Business, Self-employed"
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  கூடுதல் குறிப்பு (விரும்பினால்)
                </label>
                <textarea
                  rows={2}
                  placeholder="உங்கள் தாலுகாவில் உள்ள தொடர்புகள் அல்லது அனுபவம் குறித்துச் சுருக்கமாக..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {errorMsg && <p className="text-xs text-red-400 font-semibold">{errorMsg}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3 rounded-xl transition cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'சமர்ப்பிக்கப்படுகிறது...' : 'Founding Partner விண்ணப்பத்தை அனுப்பு'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}