import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function UniversalApplicationsHub() {
  const [selectedForm, setSelectedForm] = useState('patta_transfer');
  // 'direct' = நேரடி விண்ணப்பம், 'legal_heir' = வாரிசுரிமை மனு, 'noc_affidavit' = வாரிசுகளின் NOC பிரமாணப் பத்திரம்
  const [applicationMode, setApplicationMode] = useState('direct');

  // முதன்மைத் தரவுகள் (100% Dynamic)
  const [formData, setFormData] = useState({
    // பிரதான மனுதாரர் (பெயர் மாற்றிக் கொள்ளும் வாரிசு)
    applicantName: 'மு. சுந்தரபாண்டியன்',
    fatherSpouseName: 'முத்துவேல்',
    relationshipWithDeceased: 'மகன்',
    doorNoStreet: 'எண். 45, பாரதியார் தெரு',
    villageCity: 'மறைமலை நகர்',
    taluk: 'செங்கல்பட்டு',
    district: 'செங்கல்பட்டு',
    pincode: '603209',
    phone: '9876543210',
    email: 'sundar.tn@email.com',

    // காலஞ்சென்ற உரிமையாளர் விவரங்கள்
    deceasedName: 'முத்துவேல்',
    dateOfDeath: '12/11/2024',
    deathCertNo: 'TN-DC-2024-984321',
    legalHeirCertNo: 'TN-LH-2025-451209 (செங்கல்பட்டு வட்டாட்சியர்)',

    // NOC அளிக்கும் பிற வாரிசுகளின் விவரங்கள்
    otherHeirsList: '1. மு. லட்சுமி (மனைவி, வயது 58)\n2. மு. ராஜேஸ்வரி (மகள், வயது 32)',

    // அதிகாரி விவரங்கள்
    recipientDesignation: 'உயர்திரு வட்டாட்சியர் அவர்கள்',
    recipientOffice: 'வட்டாட்சியர் அலுவலகம்',
    recipientPlace: 'செங்கல்பட்டு வட்டம், செங்கல்பட்டு மாவட்டம்',

    // 1. பட்டா விவரங்கள்
    surveyNumber: '124/2B',
    plotNumber: 'மனை எண். 12',
    revenueVillage: 'மறைமலை நகர் கிராமம்',
    deedDetails: 'கிரையப் பத்திரம் எண்: 1425/2024 (செங்கல்பட்டு சார்பதிவகம்)',
    landExtent: '1200 சதுர அடி (2.75 சென்ட்)',

    // 2. EB மின் இணைப்பு விவரங்கள்
    ebConsumerNo: '09-123-004-567',
    ebTariffCategory: 'வீட்டு மின் இணைப்பு (Tariff 1A)',
    previousOwnerName: 'எஸ். ராமகிருஷ்ணன்',

    // 3. வங்கி விவரங்கள்
    bankName: 'பாரத ஸ்டேட் வங்கி (SBI)',
    bankBranchName: 'மறைமலை நகர் கிளை',
    bankLoanAccNo: '40129876543',
    bankSavingAccNo: '20491827361',
    deceasedBankBalance: '₹1,85,000',
    loanClosedDate: '15/01/2025',
    cibilScoreIssue: 'முழுமையாகச் செலுத்திய பிறகும் நிலுவை எனக் காட்டப்படுவது',

    // 4. RTI விவரங்கள்
    rtiPrevPetitionNo: 'TN2026/0129/REV',
    rtiFeeStampValue: '₹10 நீதிமன்ற வில்லை (Court Fee Stamp)',
    rtiSpecificQuery: '1. எனது மனு மீதான தினசரி நடவடிக்கை அறிக்கை நகல்.\n2. மேற்படி கோப்பில் தொடர்புடைய அதிகாரிகளின் குறிப்புகள் மற்றும் உத்தரவு நகல்.',

    // 5. ஆட்சியர் குறைதீர்ப்பு முகாம் விவரங்கள்
    grievanceWardNo: 'வார்டு எண்: 04, பாரதியார் தெரு',
    grievanceNature: 'மழைநீர் வடிகால் அடைப்பு மற்றும் சேதமடைந்த தெருவிளக்குகளைச் சீரமைத்தல்',

    // பொதுத் தகவல்கள்
    subject: '',
    enclosures: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // துறை சார்ந்த டெம்ப்ளேட்களை மாற்றுதல்
  const loadPresetTemplate = (type, mode = applicationMode) => {
    setSelectedForm(type);

    if (type === 'patta_transfer') {
      const isNoc = mode === 'noc_affidavit';
      const isHeir = mode === 'legal_heir';
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'உயர்திரு வட்டாட்சியர் அவர்கள்',
        recipientOffice: 'வட்டாட்சியர் அலுவலகம்',
        recipientPlace: `${prev.taluk} வட்டம், ${prev.district} மாவட்டம்`,
        subject: isNoc
          ? `புல எண்: ${prev.surveyNumber}-ல் உள்ள காலஞ்சென்ற ${prev.deceasedName} அவர்களின் நிலத்தை ${prev.applicantName} பெயருக்குப் பட்டா மாற்றம் செய்ய இதர வாரிசுகளின் ஆட்சேபனையின்மை இசைவுக் கடிதம் (NOC).`
          : isHeir 
          ? `${prev.taluk} வட்டம், ${prev.revenueVillage}, சர்வே எண்: ${prev.surveyNumber}-ல் உள்ள சொத்திற்கு உரிமையாளர் ${prev.deceasedName} மறைவிற்குப் பின் வாரிசுரிமை பட்டா பெயர் மாற்றம் செய்யக் கோருதல்.`
          : `${prev.taluk} வட்டம், ${prev.revenueVillage}, சர்வே எண்: ${prev.surveyNumber} நிலத்திற்கு கிரையப் பட்டா பெயர் மாற்றம் வேண்டி விண்ணப்பம்.`,
        enclosures: isNoc
          ? '1. இறப்புச் சான்றிதழ் மற்றும் வாரிசுச் சான்றிதழ் நகல்கள்\n2. ஆட்சேபனையின்மை தெரிவிக்கும் அனைத்து வாரிசுகளின் ஆதார் அடையாள அட்டை நகல்கள்\n3. குடும்ப அட்டை நகல்'
          : isHeir
          ? '1. உரிமையாளரின் அரசு இறப்புச் சான்றிதழ் நகல்\n2. வட்டாட்சியர் வழங்கிய சட்டப்பூர்வ வாரிசுச் சான்றிதழ் (Legal Heir)\n3. இதர வாரிசுகளின் ஆட்சேபனையின்மை உறுதிமொழிப் பத்திரம் (NOC Affidavit)\n4. அசல் கிரையப் பத்திர நகல் & மூலப் பட்டா நகல்\n5. மனுதாரர் மற்றும் குடும்பத்தாரின் ஆதார் நகல்கள்'
          : '1. பதிவு செய்யப்பட்ட கிரையப் பத்திர நகல்\n2. முந்தைய பட்டா / சிட்டா நகல்\n3. வில்லங்கச் சான்றிதழ் (EC) நகல்\n4. மனை வரைபட நகல்\n5. மனுதாரரின் ஆதார் அடையாள அட்டை நகல்'
      }));
    } else if (type === 'eb_name_transfer') {
      const isNoc = mode === 'noc_affidavit';
      const isHeir = mode === 'legal_heir';
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'உயர்திரு உதவி செயற்பொறியாளர் (இயக்கமும் பராமரிப்பும்) அவர்கள்',
        recipientOffice: 'தமிழ்நாடு மின் உற்பத்தி மற்றும் பகிர்மானக் கழகம் (TANGEDCO)',
        recipientPlace: `${prev.taluk} மின் பகிர்மான வட்டம்`,
        subject: isNoc
          ? `மின் இணைப்பு எண்: ${prev.ebConsumerNo}-ஐ ${prev.applicantName} பெயருக்கு மாற்ற ஏனைய வாரிசுகளின் ஆட்சேபனையின்மை ஒப்புதல் (NOC).`
          : isHeir
          ? `மின் நுகர்வோர் எண்: ${prev.ebConsumerNo}-ன் உரிமையாளர் மறைவிற்குப் பின் வாரிசு அடிப்படையில் பெயர் மாற்றம் செய்யக் கோருதல்.`
          : `மின் இணைப்பு நுகர்வோர் எண்: ${prev.ebConsumerNo}-ஐ மனுதாரர் பெயருக்கு பெயர் மாற்றம் செய்யக் கோருதல்.`,
        enclosures: isNoc
          ? '1. வாரிசுச் சான்றிதழ் நகல்\n2. இறப்புச் சான்றிதழ் நகல்\n3. ஒப்புதல் அளிக்கும் வாரிசுகளின் அடையாள அட்டை நகல்கள்'
          : isHeir
          ? '1. இறப்புச் சான்றிதழ் & வாரிசுச் சான்றிதழ் நகல்கள்\n2. இதர வாரிசுகளின் NOC ஒப்புதல் படிவம்\n3. தற்போதைய சொத்து வரி ரசீது நகல்\n4. மனுதாரரின் ஆதார் அட்டை நகல்'
          : '1. தற்போதைய சொத்து வரி ரசீது நகல்\n2. பதிவு பெற்ற கிரையப் பத்திர நகல்\n3. முந்தைய உரிமையாளர் இசைவுக் கடிதம்\n4. மனுதாரரின் ஆதார் அடையாள அட்டை நகல்'
      }));
    } else if (type === 'bank_settlement') {
      const isNoc = mode === 'noc_affidavit';
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'முதன்மை கிளை மேலாளர் அவர்கள்',
        recipientOffice: prev.bankName,
        recipientPlace: `${prev.villageCity} கிளை`,
        subject: isNoc
          ? `காலஞ்சென்ற ${prev.deceasedName} அவர்களின் கணக்கு (A/c No: ${prev.bankSavingAccNo}) தொகையை ${prev.applicantName} பெறுவதற்கு இதர வாரிசுகளின் NOC இசைவுப் பத்திரம்.`
          : `காலஞ்சென்ற ${prev.deceasedName} அவர்களின் வங்கிக் கணக்கு (A/c No: ${prev.bankSavingAccNo}) நிலுவைத் தொகையை சட்டப்பூர்வ வாரிசுதாரருக்கு விடுவிக்கக் கோருதல்.`,
        enclosures: '1. கணக்கு வைத்திருந்தவரின் அரசு இறப்புச் சான்றிதழ் நகல்\n2. வட்டாட்சியர் வழங்கிய வாரிசுச் சான்றிதழ் (Legal Heir Certificate)\n3. இதர வாரிசுகளின் ஆட்சேபனையின்மை ஒப்புதல் படிவம் (NOC)\n4. வங்கி பாஸ்புக் மற்றும் வாரிசுகளின் KYC / ஆதார் நகல்கள்'
      }));
    } else if (type === 'bank_cibil_dispute') {
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'முதன்மை கிளை மேலாளர் அவர்கள்',
        recipientOffice: prev.bankName,
        recipientPlace: `${prev.villageCity} கிளை`,
        subject: `வங்கி கடன் கணக்கு எண்: ${prev.bankLoanAccNo} மீதான CIBIL தரவுப் பிழையினை நீக்கிச் சரிசெய்யக் கோருதல்.`,
        enclosures: '1. முழுக் கடனும் செலுத்தி முடிக்கப்பட்டதற்கான வங்கி செலுத்துச் சீட்டு\n2. வங்கி நிர்வாகம் வழங்கிய தடையில்லாச் சான்றிதழ் (NOC) நகல்\n3. தற்போதைய CIBIL கிரெடிட் அறிக்கை நகல்'
      }));
    } else if (type === 'rti_application') {
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'பொதுத் தகவல் அலுவலர் / தகவல் அதிகாரி அவர்கள்',
        recipientOffice: 'வட்டாட்சியர் அலுவலகம்',
        recipientPlace: `${prev.taluk}, ${prev.district}`,
        subject: `தகவல் அறியும் உரிமைச் சட்டம் 2005, பிரிவு 6(1)-ன் கீழ் மனு எண்: ${prev.rtiPrevPetitionNo} மீது தகவல் கோருதல்.`,
        enclosures: `1. ${prev.rtiFeeStampValue} (மனுவின் மேல் ஒட்டப்பட்டுள்ளது)\n2. முந்தைய விண்ணப்ப மனுவின் ஒப்புதல் அட்டை நகல்\n3. மனுதாரரின் அடையாள அட்டை நகல்`
      }));
    } else if (type === 'collector_grievance') {
      setFormData(prev => ({
        ...prev,
        recipientDesignation: 'உயர்திரு மாவட்ட ஆட்சித் தலைவர் அவர்கள்',
        recipientOffice: 'மாவட்ட ஆட்சியர் அலுவலகம்',
        recipientPlace: `${prev.district} மாவட்டம்`,
        subject: `மக்கள் குறைதீர்க்கும் நாள் முகாம் - ${prev.villageCity} பகுதிக்கு உட்பட்ட பொதுக் கோரிக்கை மனு.`,
        enclosures: '1. பாதிக்கப்பட்ட அப்பகுதி மக்களின் கூட்டு கையொப்ப மனு\n2. கள நிலவர புகைப்பட ஆதாரங்கள்\n3. மனுதாரரின் அடையாள அட்டை நகல்'
      }));
    }
  };

  const handleModeChange = (mode) => {
    setApplicationMode(mode);
    loadPresetTemplate(selectedForm, mode);
  };

  return (
    <>
      <Head>
        <title>Universal Applications & Petitions Studio | நம்ம பூமி 360</title>
        <meta name="description" content="Department-wise Official Applications, Petitions and Legal Heir NOC Generator for Tamil Nadu" />
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
                padding: 12mm 18mm !important;
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
              அரசு & வங்கி அதிகாரப்பூர்வ மனுக்கள் மையம் (Universal Petitions Studio)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>🖨️</span> {applicationMode === 'noc_affidavit' ? 'NOC பத்திரம் பதிவிறக்குக (PDF)' : 'PDF மனுவாகப் பதிவிறக்குக'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 print:p-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* இடதுபுறக் கட்டுப்பாட்டுப் பலகை */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 print:hidden shadow-xl max-h-[88vh] overflow-y-auto">

            {/* 🌟 3 வழிகள்: நேரடி விண்ணப்பம் vs வாரிசுரிமை மனு vs வாரிசுகளின் NOC பத்திரம் */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-3 rounded-lg border border-indigo-500/40 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-300 block">விண்ணப்ப முறை (Application Mode):</span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <button
                  type="button"
                  onClick={() => handleModeChange('direct')}
                  className={`text-[11px] py-1.5 px-1 rounded-lg font-bold transition ${
                    applicationMode === 'direct'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  நேரடி மனு
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('legal_heir')}
                  className={`text-[11px] py-1.5 px-1 rounded-lg font-bold transition ${
                    applicationMode === 'legal_heir'
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  வாரிசுரிமை மனு
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('noc_affidavit')}
                  className={`text-[11px] py-1.5 px-1 rounded-lg font-bold transition ${
                    applicationMode === 'noc_affidavit'
                      ? 'bg-purple-600 text-white shadow ring-2 ring-purple-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  🤝 வாரிசுகள் NOC
                </button>
              </div>
            </div>

            {/* துறை தேர்வு பொத்தான்கள் */}
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">துறை சார்ந்த விண்ணப்பத் தேர்வு:</span>
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
                  onClick={() => loadPresetTemplate('eb_name_transfer')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'eb_name_transfer' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  EB மின் இணைப்பு மாற்றம்
                </button>
                {(applicationMode === 'legal_heir' || applicationMode === 'noc_affidavit') && (
                  <button
                    type="button"
                    onClick={() => loadPresetTemplate('bank_settlement')}
                    className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'bank_settlement' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    வங்கி வாரிசுத் தொகை விடுவிப்பு
                  </button>
                )}
                {applicationMode === 'direct' && (
                  <button
                    type="button"
                    onClick={() => loadPresetTemplate('bank_cibil_dispute')}
                    className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'bank_cibil_dispute' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    வங்கி CIBIL திருத்த மனு
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('rti_application')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'rti_application' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  RTI தகவல் அறியும் மனு
                </button>
                <button
                  type="button"
                  onClick={() => loadPresetTemplate('collector_grievance')}
                  className={`text-xs px-2.5 py-1 rounded transition ${selectedForm === 'collector_grievance' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  ஆட்சியர் குறைதீர்ப்பு முகாம் மனு
                </button>
              </div>
            </div>

            {/* NOC மற்றும் வாரிசுதாரர் விவரப் பிரிவு */}
            {(applicationMode === 'legal_heir' || applicationMode === 'noc_affidavit') && (
              <div className="bg-amber-950/40 p-3 rounded-lg border border-amber-500/40 space-y-2">
                <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  காலஞ்சென்ற உரிமையாளர் & வாரிசு விவரங்கள்
                </h2>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">மறைந்த உரிமையாளர் பெயர்:</label>
                    <input
                      type="text"
                      value={formData.deceasedName}
                      onChange={(e) => handleInputChange('deceasedName', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-bold text-amber-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">மறைந்த தேதி:</label>
                    <input
                      type="text"
                      value={formData.dateOfDeath}
                      onChange={(e) => handleInputChange('dateOfDeath', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">இறப்புச் சான்றிதழ் எண்:</label>
                    <input
                      type="text"
                      value={formData.deathCertNo}
                      onChange={(e) => handleInputChange('deathCertNo', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">வாரிசுச் சான்றிதழ் எண்:</label>
                    <input
                      type="text"
                      value={formData.legalHeirCertNo}
                      onChange={(e) => handleInputChange('legalHeirCertNo', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  {applicationMode === 'noc_affidavit' && (
                    <div className="col-span-2">
                      <label className="text-[10px] text-purple-300 block mb-0.5 font-bold">
                        ஒப்புதல் அளிக்கும் ஏனைய வாரிசுகளின் பெயர், உறவு & வயது:
                      </label>
                      <textarea
                        rows={2}
                        value={formData.otherHeirsList}
                        onChange={(e) => handleInputChange('otherHeirsList', e.target.value)}
                        className="w-full bg-slate-800 border border-purple-500/40 rounded p-1.5 text-white text-[11px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* துறை சார்ந்த பிரத்யேகப் புலங்கள் */}
            <div className="bg-slate-800/60 p-3 rounded-lg border border-emerald-500/30 space-y-2.5">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {selectedForm === 'patta_transfer' && 'நிலம் & சர்வே விவரங்கள் (வருவாய்த் துறை)'}
                {selectedForm === 'eb_name_transfer' && 'மின் இணைப்பு & நுகர்வோர் விவரங்கள்'}
                {selectedForm === 'bank_settlement' && 'வங்கிக் கணக்கு விவரங்கள்'}
                {selectedForm === 'bank_cibil_dispute' && 'வங்கி கடன் & CIBIL விவரங்கள்'}
                {selectedForm === 'rti_application' && 'RTI மனு விவரங்கள்'}
                {selectedForm === 'collector_grievance' && 'வார்டு & பொதுப் பிரச்சினை விவரங்கள்'}
              </h2>

              {selectedForm === 'patta_transfer' && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">சர்வே எண்:</label>
                    <input
                      type="text"
                      value={formData.surveyNumber}
                      onChange={(e) => handleInputChange('surveyNumber', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-bold text-emerald-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">மனை எண்:</label>
                    <input
                      type="text"
                      value={formData.plotNumber}
                      onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">வருவாய் கிராமம்:</label>
                    <input
                      type="text"
                      value={formData.revenueVillage}
                      onChange={(e) => handleInputChange('revenueVillage', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">நிலத்தின் அளவு:</label>
                    <input
                      type="text"
                      value={formData.landExtent}
                      onChange={(e) => handleInputChange('landExtent', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-300 block mb-0.5">அசல் பத்திரம் & சார்பதிவகம்:</label>
                    <input
                      type="text"
                      value={formData.deedDetails}
                      onChange={(e) => handleInputChange('deedDetails', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                </div>
              )}

              {selectedForm === 'eb_name_transfer' && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">மின் நுகர்வோர் எண் (SC No):</label>
                    <input
                      type="text"
                      value={formData.ebConsumerNo}
                      onChange={(e) => handleInputChange('ebConsumerNo', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-bold text-amber-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">மின் கட்டணப் பிரிவு:</label>
                    <input
                      type="text"
                      value={formData.ebTariffCategory}
                      onChange={(e) => handleInputChange('ebTariffCategory', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                </div>
              )}

              {selectedForm === 'bank_settlement' && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">வங்கியின் பெயர்:</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-300 block mb-0.5">சேமிப்புக் கணக்கு எண்:</label>
                    <input
                      type="text"
                      value={formData.bankSavingAccNo}
                      onChange={(e) => handleInputChange('bankSavingAccNo', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* பிரதான மனுதாரர் (உரிமை பெறுபவர்) விவரங்கள் */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {applicationMode === 'noc_affidavit' ? 'பெயர் மாற்றம் பெறுபவர் விவரங்கள் (பயனாளர்)' : 'மனுதாரர் & அதிகாரி முகவரிகள்'}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="பெயர்"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                />
                <input
                  type="text"
                  placeholder="உறவுமுறை (எ.கா: மகன்)"
                  value={formData.relationshipWithDeceased}
                  onChange={(e) => handleInputChange('relationshipWithDeceased', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                />
                <input
                  type="text"
                  placeholder="தெரு & கதவு எண்"
                  value={formData.doorNoStreet}
                  onChange={(e) => handleInputChange('doorNoStreet', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                />
                <input
                  type="text"
                  placeholder="ஊர் / நகரம்"
                  value={formData.villageCity}
                  onChange={(e) => handleInputChange('villageCity', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                />
                <input
                  type="text"
                  placeholder="அதிகாரியின் பதவி"
                  value={formData.recipientDesignation}
                  onChange={(e) => handleInputChange('recipientDesignation', e.target.value)}
                  className="col-span-2 bg-slate-800 border border-slate-700 rounded p-1.5 text-white"
                />
              </div>
            </div>

          </div>

          {/* வலதுபுறம்: A4 தாள் (நேரடி மனு / வாரிசு மனு / NOC பிரமாணப் பத்திரம்) */}
          <div className="lg:col-span-7 flex justify-center w-full overflow-x-auto">
            <div
              id="official-letter-sheet"
              className="w-full max-w-[210mm] bg-white text-slate-900 rounded shadow-2xl p-10 text-[13px] leading-relaxed border border-slate-300 font-serif print:shadow-none print:border-none min-h-[297mm] flex flex-col justify-between"
            >
              {applicationMode === 'noc_affidavit' ? (
                /* ======================== 🤝 வாரிசுகளின் NOC பிரமாணப் பத்திரம் ======================== */
                <div>
                  <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
                    <h1 className="text-xl font-bold uppercase tracking-tight text-slate-950 font-sans">
                      சட்டப்பூர்வ வாரிசுகளின் ஆட்சேபனையின்மை உறுதிமொழிப் பத்திரம் (NOC AFFIDAVIT)
                    </h1>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 border-b border-slate-200 pb-2 mb-4 font-sans">
                    <span>இடம்: <strong>{formData.villageCity || formData.taluk}</strong></span>
                    <span>நாள்: <strong>{new Date().toLocaleDateString('ta-IN')}</strong></span>
                  </div>

                  {/* பெறுநர் */}
                  <div className="mb-4">
                    <p className="font-bold text-slate-950 font-sans text-xs underline mb-1">பெறுநர்:</p>
                    <div className="pl-4 space-y-0.5 text-slate-800">
                      <p className="font-bold text-slate-950">{formData.recipientDesignation}</p>
                      <p>{formData.recipientOffice}</p>
                      <p>{formData.recipientPlace}</p>
                    </div>
                  </div>

                  {/* பொருள் */}
                  <div className="my-4 bg-purple-50 p-2.5 rounded border-l-4 border-purple-800">
                    <p className="font-bold text-slate-950 text-xs">
                      பொருள்: <span className="font-medium underline decoration-purple-400">{formData.subject}</span>
                    </p>
                  </div>

                  {/* NOC உரைப்பகுதி */}
                  <div className="space-y-3 text-slate-900 leading-relaxed text-justify text-xs">
                    <p className="font-bold text-sm">உறுதிமொழிப் பிரமாணம்:</p>
                    <p>
                      <strong>{formData.taluk}</strong> வட்டம், <strong>{formData.villageCity}</strong> முகவரியில் வசித்து வந்த மறைந்த திரு. <strong>{formData.deceasedName}</strong> அவர்களின் சட்டப்பூர்வ வாரிசுகளான நாங்கள் மனப்பூர்வமாக அளிக்கும் ஆட்சேபனையின்மை உறுதிமொழிப் பத்திரம்:
                    </p>

                    <div className="bg-slate-50 p-3 rounded border border-slate-300 font-sans my-2">
                      <p className="font-bold text-slate-900 mb-1 border-b border-slate-200 pb-1">1. ஆட்சேபனையின்மை ஒப்புதல் அளிக்கும் ஏனைய வாரிசுகள் விபரம்:</p>
                      <p className="whitespace-pre-line text-slate-800 font-medium pl-2">{formData.otherHeirsList}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded border border-slate-300 font-sans my-2">
                      <p className="font-bold text-slate-900 mb-1 border-b border-slate-200 pb-1">2. பெயர் மாற்றம் செய்யக் கோரும் சொத்து / இணைப்பு விபரம்:</p>
                      {selectedForm === 'patta_transfer' && (
                        <div className="grid grid-cols-2 gap-1 text-[11.5px]">
                          <div>• புல எண்: <strong>{formData.surveyNumber}</strong></div>
                          <div>• மனை எண்: <strong>{formData.plotNumber}</strong></div>
                          <div>• வருவாய் கிராமம்: <strong>{formData.revenueVillage}</strong></div>
                          <div>• அளவு: <strong>{formData.landExtent}</strong></div>
                        </div>
                      )}
                      {selectedForm === 'eb_name_transfer' && (
                        <div className="grid grid-cols-2 gap-1 text-[11.5px]">
                          <div>• மின் நுகர்வோர் எண் (SC No): <strong>{formData.ebConsumerNo}</strong></div>
                          <div>• மின்கட்டணப் பிரிவு: <strong>{formData.ebTariffCategory}</strong></div>
                        </div>
                      )}
                      {selectedForm === 'bank_settlement' && (
                        <div className="grid grid-cols-2 gap-1 text-[11.5px]">
                          <div>• வங்கி சேமிப்புக் கணக்கு எண்: <strong>{formData.bankSavingAccNo}</strong></div>
                          <div>• வங்கியின் பெயர்: <strong>{formData.bankName}</strong></div>
                        </div>
                      )}
                    </div>

                    <p>
                      3. மறைந்த திரு. <strong>{formData.deceasedName}</strong> அவர்களின் இறப்புச் சான்றிதழ் எண்: <strong>{formData.deathCertNo}</strong> மற்றும் வட்டாட்சியர் வழங்கிய சட்டப்பூர்வ வாரிசுச் சான்றிதழ் எண்: <strong>{formData.legalHeirCertNo}</strong>-ன் படி நாங்கள் அனைவரும் வாரிசுதாரர்கள் ஆவோம்.
                    </p>
                    <p>
                      4. மேற்படி சொத்து / கணக்கு / மின் இணைப்பினை, எங்கள் குடும்பத்தைச் சேர்ந்த திரு/திருமதி. <strong>{formData.applicantName}</strong> (உறவுமுறை: {formData.relationshipWithDeceased}) அவர்களின் தனிப்பட்ட பெயருக்குப் பெயர் மாற்றம் செய்து கொள்வதில், <strong>வாரிசுகளான எங்களுக்கு எவ்வித ஆட்சேபனையும் (No Objection) இல்லை</strong> என்று உளமாரச் சான்றளிக்கிறோம்.
                    </p>
                    <p>
                      5. இதனால் எதிர்காலத்தில் எங்களால் எவ்வித உரிமைகளோ, இழப்பீடோ கோரப்பட மாட்டாது என்றும், இம்மாற்றத்தை முழு மனதுடன் ஏற்றுக்கொள்கிறோம் என்றும் இதன் மூலம் உறுதியளிக்கிறோம்.
                    </p>
                  </div>

                  {/* வாரிசுகளின் கையொப்பப் பகுதி */}
                  <div className="mt-8 pt-4 border-t border-slate-300 font-sans text-xs">
                    <p className="font-bold text-slate-950 mb-4 underline">ஆட்சேபனையின்மை தெரிவிக்கும் அனைத்து வாரிசுகளின் கையொப்பங்கள்:</p>
                    <div className="grid grid-cols-2 gap-y-6 text-slate-800">
                      <div>
                        <div className="h-6"></div>
                        <p className="border-t border-slate-400 w-4/5 pt-1 font-semibold">1. வாரிசு கையொப்பம்</p>
                      </div>
                      <div>
                        <div className="h-6"></div>
                        <p className="border-t border-slate-400 w-4/5 pt-1 font-semibold">2. வாரிசு கையொப்பம்</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ======================== நேரடி மற்றும் வாரிசுரிமை மனு தாள் ======================== */
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-600 border-b border-slate-300 pb-2 mb-6 font-sans">
                    <span>இடம்: <strong>{formData.villageCity || formData.taluk}</strong></span>
                    <span>நாள்: <strong>{new Date().toLocaleDateString('ta-IN')}</strong></span>
                  </div>

                  {/* அனுப்புநர் */}
                  <div className="mb-5">
                    <p className="font-bold text-slate-950 font-sans text-xs underline mb-1">அனுப்புநர்:</p>
                    <div className="pl-4 space-y-0.5 text-slate-800">
                      <p className="font-bold text-slate-950">{formData.applicantName}</p>
                      {applicationMode === 'legal_heir' ? (
                        <p className="text-slate-900 font-medium">
                          (காலஞ்சென்ற <strong>{formData.deceasedName}</strong> அவர்களின் சட்டப்பூர்வ வாரிசு / <strong>{formData.relationshipWithDeceased}</strong>)
                        </p>
                      ) : (
                        formData.fatherSpouseName && <p>த/பெ அல்லது க/பெ: {formData.fatherSpouseName}</p>
                      )}
                      <p>{formData.doorNoStreet}</p>
                      <p>{formData.villageCity}, {formData.taluk} வட்டம்</p>
                      <p>{formData.district} மாவட்டம் - {formData.pincode}</p>
                      <p className="font-sans text-xs text-slate-700 mt-1">கைபேசி எண்: <strong>{formData.phone}</strong></p>
                    </div>
                  </div>

                  {/* பெறுநர் */}
                  <div className="mb-6">
                    <p className="font-bold text-slate-950 font-sans text-xs underline mb-1">பெறுநர்:</p>
                    <div className="pl-4 space-y-0.5 text-slate-800">
                      <p className="font-bold text-slate-950">{formData.recipientDesignation}</p>
                      <p>{formData.recipientOffice}</p>
                      <p>{formData.recipientPlace}</p>
                    </div>
                  </div>

                  {/* பொருள் */}
                  <div className="my-5 bg-slate-50 p-2.5 rounded border-l-4 border-slate-800">
                    <p className="font-bold text-slate-950">
                      பொருள்:{' '}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleInputChange('subject', e.currentTarget.textContent)}
                        className="font-medium underline decoration-slate-400 outline-none hover:bg-amber-50 cursor-text"
                      >
                        {formData.subject}
                      </span>
                    </p>
                  </div>

                  {/* மனு உரை */}
                  <div className="space-y-3 text-slate-900 leading-relaxed text-justify">
                    <p className="font-bold">மதிப்பிற்குரிய ஐயா / அம்மையீர் வணக்கம்,</p>

                    {selectedForm === 'patta_transfer' && (
                      <div className="pl-2 space-y-2.5">
                        {applicationMode === 'legal_heir' ? (
                          <>
                            <p>
                              மேற்குறிப்பிட்ட முகவரியில் வசித்து வந்த எனது தந்தை/உரிமையாளர் திரு. <strong>{formData.deceasedName}</strong> அவர்கள் கடந்த <strong>{formData.dateOfDeath}</strong> அன்று காலமானார் என்பதைத் தெரிவித்துக் கொள்கிறேன். 
                            </p>
                            <div className="bg-slate-50 p-3 rounded border border-slate-300 font-sans text-xs my-2">
                              <p className="font-bold text-slate-900 mb-1.5 border-b border-slate-300 pb-1">சொத்து மற்றும் வாரிசுரிமை விபரங்கள்:</p>
                              <div className="grid grid-cols-2 gap-y-1.5 text-slate-800">
                                <div>• புல எண் (Survey No): <strong className="text-slate-950 font-mono text-sm">{formData.surveyNumber}</strong></div>
                                <div>• மனை எண்: <strong className="text-slate-950">{formData.plotNumber}</strong></div>
                                <div>• வருவாய் கிராமம்: <strong className="text-slate-950">{formData.revenueVillage}</strong></div>
                                <div>• நிலத்தின் அளவு: <strong className="text-slate-950">{formData.landExtent}</strong></div>
                                <div>• இறப்புச் சான்றிதழ் எண்: <strong>{formData.deathCertNo}</strong></div>
                                <div>• வாரிசுச் சான்றிதழ் எண்: <strong>{formData.legalHeirCertNo}</strong></div>
                              </div>
                            </div>
                            <p>
                              மறைந்த அன்னாரின் நேரடி சட்டப்பூர்வ வாரிசான (மனுதாரர்: <strong>{formData.applicantName}</strong>) எனது பெயருக்கு பட்டா மாற்றம் செய்ய ஏனைய அனைத்து குடும்ப வாரிசுதாரர்களும் தங்களின் முழு சம்மதத்தையும் ஆட்சேபனையின்மை உறுதிமொழிப் பத்திரத்தையும் (NOC Affidavit) அளித்துள்ளனர்.
                            </p>
                            <p>
                              எனவே, புல எண் <strong>{formData.surveyNumber}</strong> கொண்ட நிலத்திற்குரிய பட்டாவை வாரிசு அடிப்படையில் எனது பெயருக்குப் பெயர் மாற்றம் செய்து உத்தரவிடுமாறு பணிவுடன் வேண்டுகிறேன்.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              மேற்குறிப்பிட்ட முகவரியில் வசித்து வரும் நான், <strong>{formData.taluk}</strong> வட்டம், <strong>{formData.revenueVillage}</strong>-ல் அமைந்துள்ள கீழ்க்கண்ட விஸ்தீரணம் கொண்ட மனைப் பிரிவை கிரையம் பெற்று அனுபவித்து வருகிறேன்.
                            </p>
                            <div className="bg-slate-50 p-3 rounded border border-slate-300 font-sans text-xs my-2">
                              <div className="grid grid-cols-2 gap-y-1.5 text-slate-800">
                                <div>• புல எண்: <strong className="text-slate-950">{formData.surveyNumber}</strong></div>
                                <div>• மனை எண்: <strong className="text-slate-950">{formData.plotNumber}</strong></div>
                                <div>• வருவாய் கிராமம்: <strong className="text-slate-950">{formData.revenueVillage}</strong></div>
                                <div>• அளவு: <strong className="text-slate-950">{formData.landExtent}</strong></div>
                              </div>
                            </div>
                            <p>
                              எனவே, தாங்கள் தயவுகூர்ந்து புல எண் <strong>{formData.surveyNumber}</strong> கொண்ட நிலத்திற்குரிய பட்டாவை எனது பெயருக்குத் தனிப் பெயர் மாற்றம் செய்து உத்தரவிடுமாறு வேண்டுகிறேன்.
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    {selectedForm === 'eb_name_transfer' && (
                      <div className="pl-2 space-y-2.5">
                        <p>
                          மேற்குறிப்பிட்ட முகவரியில் உள்ள மின் நுகர்வோர் எண் <strong>{formData.ebConsumerNo}</strong>-ஐ மனுதாரர் பெயருக்குப் பெயர் மாற்றம் செய்து தருமாறு பணிவுடன் கேட்டுக்கொள்கிறேன்.
                        </p>
                      </div>
                    )}

                    {selectedForm === 'bank_settlement' && (
                      <div className="pl-2 space-y-2.5">
                        <p>
                          காலஞ்சென்ற <strong>{formData.deceasedName}</strong> அவர்களின் சேமிப்புக் கணக்கு எண்: <strong>{formData.bankSavingAccNo}</strong> நிலுவைத் தொகையை சட்டப்பூர்வ வாரிசுதாரருக்கு விடுவித்துத் தருமாறு பணிவுடன் வேண்டுகிறேன்.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* இணைப்புகள் */}
                  {formData.enclosures && (
                    <div className="mt-6 pt-3 border-t border-slate-200">
                      <p className="font-bold text-xs text-slate-950 mb-1">இணைப்புகள் (Enclosures):</p>
                      <div className="pl-4 whitespace-pre-line text-xs text-slate-700 font-sans leading-normal">
                        {formData.enclosures}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* மனுதாரர் கையொப்பப் பகுதி */}
              {applicationMode !== 'noc_affidavit' && (
                <div className="mt-10 pt-6 flex justify-between items-end font-sans">
                  <div className="text-xs text-slate-500">
                    <p>இணைக்கப்பட்ட ஆவணங்கள் சரிபார்க்கப்பட்டது.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-700 mb-8">இவண் தங்கள் உண்மையுள்ள,</p>
                    <p className="border-t border-slate-400 pt-1 font-bold text-slate-950 text-xs">
                      ({formData.applicantName})
                    </p>
                    <span className="text-[10px] text-slate-500 block">
                      {applicationMode === 'legal_heir' ? 'சட்டப்பூர்வ வாரிசுதாரர் கையொப்பம்' : 'மனுதாரர் கையொப்பம்'}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </>
  );
}