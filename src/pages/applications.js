import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function UniversalApplicationsHub() {
  const [category, setCategory] = useState('revenue'); // revenue, grievance, local_body, banking, rti
  const [selectedForm, setSelectedForm] = useState('patta_transfer');

  // பொதுவான படிவத் தகவல்கள்
  const [formData, setFormData] = useState({
    applicantName: 'மு. சுந்தரபாண்டியன்',
    fatherSpouseName: 'முத்துவேல்',
    doorNoStreet: 'எண். 45, பாரதியார் தெரு',
    villageCity: 'மறைமலை நகர்',
    taluk: 'செங்கல்பட்டு',
    district: 'செங்கல்பட்டு',
    pincode: '603209',
    phone: '9876543210',
    email: 'sundar.tn@email.com',
    
    // குறிப்பிட்ட மனு விவரங்கள் (Dynamic Fields)
    recipientDesignation: 'உயர்திரு வட்டாட்சியர் அவர்கள்',
    recipientOffice: 'வட்டாட்சியர் அலுவலகம்',
    recipientPlace: 'செங்கல்பட்டு வட்டம், செங்கல்பட்டு மாவட்டம்',
    
    subject: 'பட்டா பெயர் மாற்றம் வேண்டி விண்ணப்பம்.',
    surveyNumber: '124/2B',
    landExtent: '1200 சதுர அடி (2.75 சென்ட்)',
    deedDetails: 'கிரையப் பத்திரம் எண்: 1425/2024, சார்பதிவாளர் அலுவலகம்: செங்கல்பட்டு',
    petitionBody: 'மேற்குறிப்பிட்ட முகவரியில் வசித்து வரும் நான், மேற்குறிப்பிட்ட சர்வே எண் கொண்ட மனைப் பிரிவை கிரையம் பெற்றுள்ளேன். மேற்படி நிலத்திற்கான மூல ஆவணங்கள் மற்றும் சார்பதிவகப் பதிவு ஆவணங்களின் நகல்கள் இத்துடன் இணைக்கப்பட்டுள்ளன. எனவே, மேற்படி சொத்திற்கான பட்டாவை எனது பெயருக்கு பெயர் மாற்றம் செய்து தருமாறு பணிவுடன் கேட்டுக்கொள்கிறேன்.',
    enclosures: '1. கிரையப் பத்திர நகல்\n2. முந்தைய தாய் பத்திர நகல்\n3. வில்லங்கச் சான்றிதழ் (EC)\n4. ஆதார் அட்டை நகல்'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // மாதிரி விண்ணப்பங்களை 1-கிளிக்கில் ஏற்றுதல்
  const loadPresetTemplate = (type) => {
    setSelectedForm(type);
    if (type === 'patta_transfer') {
      setCategory('revenue');
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'உயர்திரு வட்டாட்சியர் அவர்கள்',
        recipientOffice: 'வட்டாட்சியர் அலுவலகம்',
        recipientPlace: `${prev.taluk} வட்டம், ${prev.district} மாவட்டம்`,
        subject: 'பட்டா தனிப் பெயர் மாற்றம் வேண்டி விண்ணப்பம்.',
        petitionBody: `மேற்குறிப்பிட்ட சொத்து விவரங்களின்படி, நான் கிரையம் பெற்றுள்ள சர்வே எண்: ${prev.surveyNumber} கொண்ட நிலத்திற்கான வில்லங்கம் மற்றும் அனைத்து ஆவணங்களும் தெளிவாக உள்ளன. மேற்படி நிலத்திற்கு எனது பெயருக்கு பட்டா மாற்றம் செய்து உத்தரவிடுமாறு பணிவுடன் வேண்டுகிறேன்.`,
        enclosures: '1. பதிவு செய்யப்பட்ட கிரையப் பத்திர நகல்\n2. தற்போதைய பட்டா / சிட்டா நகல்\n3. வில்லங்கச் சான்றிதழ் நகல்\n4. மனுதாரரின் ஆதார் அடையாள அட்டை நகல்'
      }));
    } else if (type === 'collector_grievance') {
      setCategory('grievance');
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'உயர்திரு மாவட்ட ஆட்சித் தலைவர் அவர்கள்',
        recipientOffice: 'மாவட்ட ஆட்சியர் அலுவலகம்',
        recipientPlace: `${prev.district} மாவட்டம்`,
        subject: 'மக்கள் குறைதீர்க்கும் நாள் முகாம் - அடிப்படை வசதி வேண்டி மனு.',
        petitionBody: 'எங்கள் பகுதிக்கு உட்பட்ட தெருவில் கடந்த சில மாதங்களாக மழைநீர் வடிகால் மற்றும் முறையான தெருவிளக்கு வசதி இல்லாத காரணத்தினால் முதியவர்களும் பள்ளி குழந்தைகளும் பெரிதும் சிரமப்படுகின்றனர். இது குறித்து உள்ளாட்சி அலுவலகத்தில் முறையிட்டும் தீர்வு கிடைக்கவில்லை. தாங்கள் தலையிட்டு உரிய நடவடிக்கை எடுக்குமாறு பணிவுடன் கேட்டுக்கொள்கிறேன்.',
        enclosures: '1. அப்பகுதி மக்களின் கையொப்பமிட்ட கோரிக்கை மனு\n2. புகைப்பட ஆதாரங்கள்\n3. மனுதாரரின் அடையாள அட்டை நகல்'
      }));
    } else if (type === 'rti_application') {
      setCategory('rti');
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'பொதுத் தகவல் அலுவலர் / பொது தகவல் அதிகாரி அவர்கள்',
        recipientOffice: 'வட்டாட்சியர் / பேரூராட்சி அலுவலகம்',
        recipientPlace: `${prev.taluk}, ${prev.district}`,
        subject: 'தகவல் அறியும் உரிமைச் சட்டம் 2005, பிரிவு 6(1)-ன் கீழ் தகவல் கோருதல்.',
        petitionBody: 'தகவல் அறியும் உரிமைச் சட்டம் 2005-ன் கீழ் கீழ்க்காணும் தகவல்களை சான்றொப்பமிட்டு வழங்குமாறு கேட்டுக்கொள்கிறேன்:\n1. எனது மனு எண் (குறிப்பு எண்: TN2026/0129) மீதான தற்போதைய நிலை குறித்த விவரம்.\n2. மேற்படி கோரிக்கை மீது துறை வாரியாக எடுக்கப்பட்ட நடவடிக்கைகள் மற்றும் கோப்பு நகல்கள்.\n3. இதற்கான கட்டணம் ₹10 நீதிமன்ற வில்லை (Court Fee Stamp) இத்துடன் இணைக்கப்பட்டுள்ளது.',
        enclosures: '1. ₹10 நீதிமன்ற வில்லை (மனுவின் மேல் ஒட்டப்பட்டுள்ளது)\n2. முந்தைய விண்ணப்ப மனு நகல்\n3. மனுதாரரின் அடையாள அட்டை நகல்'
      }));
    } else if (type === 'eb_name_transfer') {
      setCategory('local_body');
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'உயர்திரு உதவி செயற்பொறியாளர் (இயக்கமும் பராமரிப்பும்) அவர்கள்',
        recipientOffice: 'தமிழ்நாடு மின் உற்பத்தி மற்றும் பகிர்மானக் கழகம் (TANGEDCO)',
        recipientPlace: `${prev.taluk} மின் பகிர்மான வட்டம்`,
        subject: 'மின் இணைப்பு பெயர் மாற்றம் வேண்டி விண்ணப்பம்.',
        petitionBody: 'மேற்குறிப்பிட்ட முகவரியில் அமைந்துள்ள கட்டிடத்தினை நான் கிரையம் பெற்று அனுபவித்து வருகிறேன். மேற்படி கட்டிடத்தில் உள்ள மின் இணைப்பு எண் (SC No: 09-123-004-567) தற்போது முந்தைய உரிமையாளர் பெயரில் உள்ளது. அதனை எனது பெயருக்கு பெயர் மாற்றம் செய்து தருமாறு கேட்டுக்கொள்கிறேன்.',
        enclosures: '1. சொத்து வரி ரசீது நகல்\n2. பதிவு பெற்ற கிரையப் பத்திர நகல்\n3. முந்தைய உரிமையாளர் தடையில்லா சான்று / படிவம்\n4. ஆதார் நகல்'
      }));
    } else if (type === 'bank_cibil_dispute') {
      setCategory('banking');
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'தி மேனேஜர் / முதன்மை கிளை மேலாளர் அவர்கள்',
        recipientOffice: 'வங்கி கிளை அலுவலகம்',
        recipientPlace: `${prev.villageCity} கிளை`,
        subject: 'சிபில் (CIBIL) அறிக்கையில் தவறாக உள்ள கடன் விவரத்தை நீக்கக் கோருதல்.',
        petitionBody: 'நான் தங்கள் வங்கியில் பெற்ற கடன் கணக்கு (A/c No: 40129876543) கடந்த 15/01/2025 அன்றே முழுமையாகச் செலுத்தி முடிக்கப்பட்டு தடையில்லாச் சான்றிதழ் (NOC) பெறப்பட்டுவிட்டது. இருப்பினும் எனது CIBIL அறிக்கையில் இக்கடன் இன்னும் நிலுவையில் இருப்பதாக தவறாகக் காட்டப்படுகிறது. இதனால் எனது இதர வங்கிப் பரிவர்த்தனைகள் பாதிக்கப்படுகின்றன. எனவே சிபில் நிறுவனத்திற்குத் தகவல் தெரிவித்து இதனை உடனடியாகச் சரிசெய்யுமாறு கேட்டுக்கொள்கிறேன்.',
        enclosures: '1. கடன் முடித்ததற்கான ரசீது\n2. வங்கி வழங்கிய NOC சான்றிதழ் நகல்\n3. தற்போதைய CIBIL அறிக்கை நகல்'
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Universal Applications & Petitions Studio | நம்ம பூமி 360</title>
        <meta name="description" content="Official Tamil Nadu Government & Banking Applications and Petitions Generator" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * { visibility: hidden; }
              #official-letter-sheet, #official-letter-sheet * { visibility: visible; }
              #official-letter-sheet {
                position: absolute;
                left: 0;
                top: 0;
                width: 100% !important;
                margin: 0 !important;
                padding: 15mm 20mm !important;
                box-shadow: none !important;
                border: none !important;
              }
              @page {
                size: A4 portrait;
                margin: 0mm;
              }
            }
          `
        }} />
      </Head>

      {/* Header */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-sm transition">
              நம்ம பூமி 360
            </Link>
            <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
              அரசு மற்றும் வங்கி அதிகாரப்பூர்வ விண்ணப்ப மையம் (Universal Petitions Studio)
            </span>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
          >
            <span>🖨️</span> PDF மனுவாகப் பதிவிறக்குக
          </button>
        </div>
      </header>

      {/* Main Studio */}
      <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 print:p-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* இடதுபுறம்: படிவம் மற்றும் விருப்பங்கள் */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 print:hidden shadow-xl">
            
            {/* துறை தேர்வு பொத்தான்கள் */}
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">முக்கிய விண்ணப்ப மாதிரி (1-Click Presets):</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('patta_transfer')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'patta_transfer' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  பட்டா பெயர் மாற்றம்
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('collector_grievance')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'collector_grievance' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  ஆட்சியர் குறைதீர்ப்பு மனு
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('rti_application')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'rti_application' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  RTI தகவல் அறியும் மனு
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('eb_name_transfer')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'eb_name_transfer' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  மின் இணைப்பு பெயர் மாற்றம்
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('bank_cibil_dispute')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'bank_cibil_dispute' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  வங்கி CIBIL பிழை மனு
                </button>
              </div>
            </div>

            {/* மனுதாரர் விவரங்கள் */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. மனுதாரர் விவரங்கள் (அனுப்புநர்)</h2>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="மனுதாரர் பெயர்"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="தந்தை / கணவர் பெயர்"
                  value={formData.fatherSpouseName}
                  onChange={(e) => handleInputChange('fatherSpouseName', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="கதவு எண் & தெரு பெயர்"
                  value={formData.doorNoStreet}
                  onChange={(e) => handleInputChange('doorNoStreet', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="ஊர் / நகரம்"
                  value={formData.villageCity}
                  onChange={(e) => handleInputChange('villageCity', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="வட்டம் (தாலுகா)"
                  value={formData.taluk}
                  onChange={(e) => handleInputChange('taluk', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="மாவட்டம்"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="அஞ்சல் குறியீட்டு எண் (Pincode)"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="கைபேசி எண்"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* பெறுநர் விவரங்கள் */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">2. அதிகாரி விவரங்கள் (பெறுநர்)</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="அதிகாரியின் பதவி (எ.கா: வட்டாட்சியர் அவர்கள்)"
                  value={formData.recipientDesignation}
                  onChange={(e) => handleInputChange('recipientDesignation', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="அலுவலகத்தின் பெயர்"
                  value={formData.recipientOffice}
                  onChange={(e) => handleInputChange('recipientOffice', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="அலுவலகம் அமைந்துள்ள இடம் / வட்டம்"
                  value={formData.recipientPlace}
                  onChange={(e) => handleInputChange('recipientPlace', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* மனுவின் பொருள் மற்றும் விளக்கம் */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">3. மனுவின் விவரங்கள்</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">மனுவின் பொருள்:</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">மனுவின் விரிவான விளக்கம்:</label>
                  <textarea
                    rows={5}
                    value={formData.petitionBody}
                    onChange={(e) => handleInputChange('petitionBody', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white leading-relaxed"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-0.5">இணைப்புகள் (ஒவ்வொன்றாக புதிய வரியில் உள்ளிடவும்):</label>
                  <textarea
                    rows={3}
                    value={formData.enclosures}
                    onChange={(e) => handleInputChange('enclosures', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* வலதுபுறம்: A4 தமிழ்நாடு அரசு அதிகாரப்பூர்வ கடித வடிவம் (Letter Sheet) */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="official-letter-sheet"
              className="w-full max-w-[210mm] bg-white text-slate-900 rounded shadow-2xl p-10 text-[13px] leading-relaxed border border-slate-300 font-serif print:shadow-none print:border-none min-h-[297mm] flex flex-col justify-between"
            >
              <div>
                {/* Header Date & Place */}
                <div className="flex justify-between items-center text-xs text-slate-600 border-b border-slate-300 pb-2 mb-6 font-sans">
                  <span>இடம்: <strong>{formData.villageCity || formData.taluk}</strong></span>
                  <span>நாள்: <strong>{new Date().toLocaleDateString('ta-IN')}</strong></span>
                </div>

                {/* அனுப்புநர் (From) */}
                <div className="mb-5">
                  <p className="font-bold text-slate-950 font-sans text-xs underline mb-1">அனுப்புநர்:</p>
                  <div className="pl-4 space-y-0.5 text-slate-800">
                    <p className="font-bold text-slate-950">{formData.applicantName}</p>
                    {formData.fatherSpouseName && <p>த/பெ அல்லது க/பெ: {formData.fatherSpouseName}</p>}
                    <p>{formData.doorNoStreet}</p>
                    <p>{formData.villageCity}, {formData.taluk} வட்டம்</p>
                    <p>{formData.district} மாவட்டம் - {formData.pincode}</p>
                    <p className="font-sans text-xs text-slate-700 mt-1">கைபேசி எண்: <strong>{formData.phone}</strong></p>
                  </div>
                </div>

                {/* பெறுநர் (To) */}
                <div className="mb-6">
                  <p className="font-bold text-slate-950 font-sans text-xs underline mb-1">பெறுநர்:</p>
                  <div className="pl-4 space-y-0.5 text-slate-800">
                    <p className="font-bold text-slate-950">{formData.recipientDesignation}</p>
                    <p>{formData.recipientOffice}</p>
                    <p>{formData.recipientPlace}</p>
                  </div>
                </div>

                {/* பொருள் (Subject) */}
                <div className="my-5 bg-slate-50 p-2.5 rounded border-l-4 border-slate-800">
                  <p className="font-bold text-slate-950">
                    பொருள்: <span className="font-medium underline decoration-slate-400">{formData.subject}</span>
                  </p>
                </div>

                {/* மனுவின் உரைப்பகுதி (Body) */}
                <div className="space-y-3 text-slate-900 leading-relaxed text-justify">
                  <p className="font-bold">மதிப்பிற்குரிய ஐயா / அம்மையீர் வணக்கம்,</p>
                  <p className="whitespace-pre-line pl-2">
                    {formData.petitionBody}
                  </p>
                  <p className="pl-2">
                    எனவே, மேற்படி விவரங்களைப் பரிசீலித்து, எனது கோரிக்கையினை ஏற்று உரிய நடவடிக்கை எடுத்து ஆவண செய்யுமாறு பணிவுடன் வேண்டுகிறேன்.
                  </p>
                </div>

                {/* இணைப்புகள் (Enclosures) */}
                {formData.enclosures && (
                  <div className="mt-6 pt-3 border-t border-slate-200">
                    <p className="font-bold text-xs text-slate-950 mb-1">இணைப்புகள்:</p>
                    <div className="pl-4 whitespace-pre-line text-xs text-slate-700 font-sans leading-normal">
                      {formData.enclosures}
                    </div>
                  </div>
                )}
              </div>

              {/* கையொப்பம் (Footer Signatures) */}
              <div className="mt-12 pt-6 flex justify-between items-end font-sans">
                <div className="text-xs text-slate-500">
                  <p>இணைக்கப்பட்ட ஆவணங்கள் சரிபார்க்கப்பட்டது.</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-700 mb-8">இவண் தங்கள் உண்மையுள்ள,</p>
                  <p className="border-t border-slate-400 pt-1 font-bold text-slate-950 text-xs">
                    ({formData.applicantName})
                  </p>
                  <span className="text-[10px] text-slate-500 block">மனுதாரர் கையொப்பம்</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}