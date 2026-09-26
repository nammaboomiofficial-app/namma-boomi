import React, { useState } from 'react';
import circuitsData from '../data/circuitsData.json';
import districtsDirectory from '../data/districtsData.json';
export default function TourismModule({ setCurrentModule }) {
  const [activeTab, setActiveTab] = useState('highway'); // நேரடி பார்வைக்காக 'highway' டேப்
  const [selectedCircuit, setSelectedCircuit] = useState('navagraha');
  const [selectedDistrict, setSelectedDistrict] = useState('சென்னை');
  const [selectedHighway, setSelectedHighway] = useState('nh45');
  const [travelersCount, setTravelersCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('அனைத்தும்');

  

 
  

  // 3. நெடுஞ்சாலை பிட்ஸ்டாப் & உணவுகள் தரவுத்தளம் (Highway Master Directory)
  const highwayDirectory = {
    nh45: {
      name: 'NH 45 (GST சாலை) - சென்னை ➔ திருச்சி ➔ மதுரை ➔ தென் தமிழகம்',
      subtitle: 'தமிழ்நாட்டின் மிக பரபரப்பான முதன்மை நெடுஞ்சாலை (4 & 6 வழிச்சாலை)',
      distance: '~460 கி.மீ',
      stops: [
        {
          km: 'கி.மீ 65',
          spot: 'செங்கல்பட்டு / மறைமலைநகர் பிட்ஸ்டாப்',
          restrooms: '🟢 மிக சுத்தமான கழிப்பறைகள் (Clean Washrooms)',
          food: 'ஆனந்த பவன் (A2B), வசந்த பவன், மெக்டொனால்ட்ஸ்.',
          fuel: 'IOCL & Tata Power 60kW EV Fast Charger',
          mapQuery: 'Chengalpattu+Highway+Food'
        },
        {
          km: 'கி.மீ 125',
          spot: 'திண்டிவனம் & விக்கிரவாண்டி டோல்கேட் பிளாசா',
          restrooms: '🟢 ஏசி உணவகத்துடன் கூடிய சுத்தமான ஓய்வறைகள்',
          food: 'ஹோட்டல் ஹைவே கிராண்ட், மெர்க்குரி ஹோட்டல் (பாரம்பரிய டிபன் & டிகிரி காபி).',
          fuel: 'BPCL Ghar Outlet (24x7) & Jio-BP EV Charger',
          mapQuery: 'Vikravandi+Highway+Food'
        },
        {
          km: 'கி.மீ 165',
          spot: 'விழுப்புரம் & உளுந்தூர்பேட்டை பைபாஸ்',
          restrooms: '🟢 குடும்ப ஓய்வறைகள் & குழந்தைகள் விளையாட்டு பூங்கா',
          food: 'ஹோட்டல் ஆர்யாஸ், உளுந்தூர்பேட்டை அனந்தாஸ், சூடான வடகறி & பொங்கல்.',
          fuel: 'HPCL Auto Care & Shell Petrol Pump',
          mapQuery: 'Ulundurpet+Highway+Food'
        },
        {
          km: 'கி.மீ 320',
          spot: 'திருச்சிராப்பள்ளி பைபாஸ் & சமயபுரம் முனை',
          restrooms: '🟢 அதிநவீன பிட்ஸ்டாப் வசதிகள்',
          food: 'மணப்பாறை அசல் கைமுறுக்கு ஸ்டால், ஸ்ரீ சங்கீதாஸ் சைவ உணவகம்.',
          fuel: 'IOCL Swagat Plaza & Zeon EV Supercharger',
          mapQuery: 'Trichy+Bypass+Food+Court'
        },
        {
          km: 'கி.மீ 420',
          spot: 'திண்டுக்கல் - மதுரை அணுகுசாலை',
          restrooms: '🟢 சுத்தமான உணவு வளாக கழிப்பறைகள்',
          food: 'திண்டுக்கல் தலப்பாகட்டி / வேணு பிரியாணி, மதுரை பாரம்பரிய ஜிகர்தண்டா.',
          fuel: 'BPCL Company Owned Pump (24x7)',
          mapQuery: 'Dindigul+Bypass+Biryani'
        }
      ]
    },
    nh32: {
      name: 'NH 32 (ECR & சோழ மண்டல கடற்கரை சாலை)',
      subtitle: 'சென்னை ➔ புதுச்சேரி ➔ கடலூர் ➔ சிதம்பரம் ➔ காரைக்கால் ➔ நாகை',
      distance: '~340 கி.மீ',
      stops: [
        {
          km: 'கி.மீ 55',
          spot: 'மாமல்லபுரம் ECR சந்திப்பு',
          restrooms: '🟢 ரிசார்ட் தர கழிப்பறைகள்',
          food: 'சிங்கிள் டீ கடை, கடல் உணவு ரெஸ்டாரன்ட்கள், பிரெஷ் இளநீர்.',
          fuel: 'Shell Petrol Pump & Statiq EV Charger',
          mapQuery: 'Mahabalipuram+ECR+Food'
        },
        {
          km: 'கி.மீ 145',
          spot: 'புதுச்சேரி (Puducherry) பைபாஸ்',
          restrooms: '🟢 நவீன டூரிஸ்ட் பிட்ஸ்டாப்கள்',
          food: 'பிரெஞ்சு பேக்கரி க்ரோசண்ட்ஸ் (Croissants), பில்டர் காபி & இத்தாலியன் பிட்சா.',
          fuel: 'IOCL Outlet & Tata Power EV',
          mapQuery: 'Pondicherry+Bypass+Food'
        },
        {
          km: 'கி.மீ 220',
          spot: 'சிதம்பரம் - சீர்காழி பைபாஸ்',
          restrooms: '🟢 கோவில் யாத்ரீகர் வசதிகள்',
          food: 'மயிலாடுதுறை காளியாகுடி வாழை இலை சாப்பாடு, பண்ருட்டி முந்திரி & பலகாரங்கள்.',
          fuel: 'HPCL Fuel Station',
          mapQuery: 'Chidambaram+Highway+Food'
        }
      ]
    },
    nh44_544: {
      name: 'NH 44 / NH 544 (கொங்கு மண்டல அதிவேக விரைவுச்சாலை)',
      subtitle: 'கிருஷ்ணகிரி ➔ தர்மபுரி ➔ சேலம் ➔ ஈரோடு ➔ கோயம்புத்தூர்',
      distance: '~380 கி.மீ',
      stops: [
        {
          km: 'கி.மீ 90',
          spot: 'கிருஷ்ணகிரி - தர்மபுரி தொப்பூர் கணவாய்',
          restrooms: '🟢 மலையடிவார பிளாசா ஓய்வறைகள்',
          food: 'ஹோட்டல் சரவணா பவன், தர்மபுரி தட்டப்பயிர் வடை, ராகி கூழ்.',
          fuel: 'BPCL Ghar Outlet (Heavy Vehicle & Car Park)',
          mapQuery: 'Thoppur+Highway+Food'
        },
        {
          km: 'கி.மீ 190',
          spot: 'சேலம் புறவழிச்சாலை (Salem Bypass)',
          restrooms: '🟢 மாடர்ன் ஹைவே ரெஸ்ட்ரூம்ஸ்',
          food: 'சேலம் தட்டுவடை செட், கோல்டன் பேலஸ் அசைவ உணவகம், பில்டர் காபி.',
          fuel: 'IOCL Swagat Fuel & Relux EV Fast Charger',
          mapQuery: 'Salem+Bypass+Food'
        },
        {
          km: 'கி.மீ 280',
          spot: 'பெருந்துறை - ஈரோடு பைபாஸ்',
          restrooms: '🟢 சுத்தமான குடும்ப ஓய்வறைகள்',
          food: 'பள்ளிபாளையம் சிக்கன் ஸ்டால்ஸ், ஊத்துக்குளி வெண்ணெய் தோசை.',
          fuel: 'HPCL 24x7 Outlet',
          mapQuery: 'Perundurai+Highway+Food'
        }
      ]
    },
    nh48: {
      name: 'NH 48 (சென்னை ➔ காஞ்சிபுரம் ➔ வேலூர் ➔ பெங்களூரு வழி)',
      subtitle: 'தொழில்துறை & ஆன்மீக முக்கியத்துவம் வாய்ந்த 6 வழிச்சாலை',
      distance: '~330 கி.மீ',
      stops: [
        {
          km: 'கி.மீ 70',
          spot: 'ஸ்ரீபெரும்புதூர் - காஞ்சிபுரம் டோல்கேட்',
          restrooms: '🟢 சர்வதேச தர கழிப்பறைகள்',
          food: 'மெக்டொனால்ட்ஸ், ஸ்டார்பக்ஸ், அசல் காஞ்சிபுரம் சுக்கு இட்லி.',
          fuel: 'Shell Petrol Station & Tata Power Fast Charger',
          mapQuery: 'Sriperumbudur+Highway+Food'
        },
        {
          km: 'கி.மீ 135',
          spot: 'வேலூர் & ஆம்பூர் பைபாஸ்',
          restrooms: '🟢 உணவக வளாக ஓய்வறைகள்',
          food: 'உலகப் புகழ்பெற்ற ஆம்பூர் ஸ்டார் பிரியாணி, ஆற்காடு மக்கன் பேடா.',
          fuel: 'IOCL Coco Outlet',
          mapQuery: 'Ambur+Star+Biryani+Highway'
        }
      ]
    }
  };

  const currentCircuit = circuitsData.find(c => c.id === selectedCircuit) || circuitsData[0];
 const grandTotalBudget = ((currentCircuit?.budget?.fuel || 0) + (currentCircuit?.budget?.toll || 0) + (currentCircuit?.budget?.food || 0) + (currentCircuit?.budget?.stay || 0));

  // செலவுப் பட்டியல்
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'எரிபொருள் (Fuel - தோராய மதிப்பு)', amount: currentCircuit?.budget?.fuel || 0 },
    { id: 2, title: 'டோல்கேட் கட்டணம்', amount: currentCircuit?.budget?.toll || 0 },
    { id: 3, title: 'ஹோட்டல் / தங்குமிடம்', amount: currentCircuit?.budget?.stay || 0 }
  ]);
  const [newExp, setNewExp] = useState({ title: '', amount: '', paidBy: '' });

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExp.title || !newExp.amount) return;
    setExpenses([...expenses, { id: Date.now(), title: newExp.title, amount: Number(newExp.amount), paidBy: newExp.paidBy || 'பொது' }]);
    setNewExp({ title: '', amount: '', paidBy: '' });
  };

  const handleWhatsAppShare = () => {
    const text = `🌟 *நம்ம பூமி 360° சுற்றுலா திட்டம்: ${currentCircuit.title}*\n\n` +
      `📍 *வழித்தடம்:* ${currentCircuit.subtitle}\n` +
      `⏱️ *கால அளவு:* ${currentCircuit.badge} | தூரம்: ${currentCircuit.distance}\n\n` +
      `💰 *மொத்த திட்ட மதிப்பீடு:* ₹${grandTotalBudget.toLocaleString()} (${travelersCount} நபர்கள்)\n` +
      `👤 *ஒரு நபருக்கான பங்கு:* ₹${Math.round(grandTotalBudget / travelersCount).toLocaleString()}\n\n` +
      `நம்ம பூமி தமிழ்நாடு முழுமையான சுற்றுலா வழிகாட்டி மூலம் உருவாக்கப்பட்டது! 🌿🚗`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

 const handleGoogleMapsRoute = () => {
    const routeUrls = {
      navagraha: 'https://www.google.com/maps/dir/Chennai,+Tamil+Nadu/Sooriyanar+Kovil,+Thanjavur/Kailasanathar+Temple,+Thingalur/Vaitheeswarankoil/Thiruvengadu+Budhan+Temple/Alangudi+Guru+Temple/Agneeswarar+Temple+Kanjanur/Thirunallar+Saneeswaran+Temple/Thirunageswaram+Rahu+Temple/Keezhaperumpallam+Kethu+Temple',
      arupadai: 'https://www.google.com/maps/dir/Chennai,+Tamil+Nadu/Swaminathaswamy+Temple,+Swamimalai/Thiruparankundram+Murugan+Temple,+Madurai/Pazhamudircholai+Murugan+Temple/Subramaniya+Swamy+Temple,+Tiruchendur/Arulmigu+Dhandayuthapani+Swamy+Temple,+Palani/Tiruttani+Murugan+Temple/Chennai,+Tamil+Nadu',
      hills_falls: 'https://www.google.com/maps/dir/Chennai,+Tamil+Nadu/Kodaikanal+Lake,+Tamil+Nadu/Pillar+Rocks,+Kodaikanal/Courtallam+Main+Falls,+Tenkasi/Old+Courtallam+Waterfalls/Chennai,+Tamil+Nadu',
      agri: 'https://www.google.com/maps/dir/Chennai,+Tamil+Nadu/Pollachi,+Tamil+Nadu/Sethumadai,+Tamil+Nadu/Aliyar+Dam+Park/Masani+Amman+Temple/Chennai,+Tamil+Nadu',
    };
    const url = routeUrls[selectedCircuit] || routeUrls.navagraha;
    window.open(url, '_blank');
  };

  const activeDistrictData = districtsDirectory[selectedDistrict] || districtsDirectory['சென்னை'];
  const activeHighwayData = highwayDirectory[selectedHighway];

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #0f172a 0%, #030712 100%)', color: '#f8fafc', padding: '16px 12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* TOP APP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setCurrentModule && setCurrentModule('home')}
              style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', color: '#38bdf8', border: '1px solid #334155', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
            >
              ⬅ முகப்புத் திரை
            </button>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#facc15', letterSpacing: '0.5px' }}>நம்ம பூமி 360° சுற்றுலா OS</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>தமிழ்நாடு முழுமையான ஆன்மீகம், மலைகள், அருவிகள், அக்ரி, 38 மாவட்டங்கள் & நெடுஞ்சாலை கையேடு</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>பயணிகள்:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={travelersCount}
              onChange={(e) => setTravelersCount(Math.max(1, Number(e.target.value)))}
              style={{ width: '55px', padding: '6px 8px', background: '#1e293b', border: '1px solid #0284c7', color: '#fff', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* PRIMARY NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
          {[
            { id: 'planner', label: '🎯 AI டூர் பிளானர் & சுற்றுகள்' },
            { id: 'districts', label: '📍 38 மாவட்ட கையேடு & தலங்கள்' },
            { id: 'highway', label: '🚗 ஹைவே பிட்ஸ்டாப் & உணவுகள்' },
            { id: 'expenses', label: '💰 நேரடி பட்ஜெட் கணக்கீடு' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : '#1e293b',
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === tab.id ? '0 4px 14px rgba(2, 132, 199, 0.4)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 3: HIGHWAY PITSTOPS & LEGENDARY FOODS (புதிய முழுமையான பிரிவு) */}
        {activeTab === 'highway' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>🚗 நெடுஞ்சாலை பிட்ஸ்டாப் & உணவு வழிகாட்டி (Highway Pitstops)</h3>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>சுத்தமான கழிப்பறை வசதிகள், 24 மணி நேர பெட்ரோல் / EV பாயிண்ட்கள் & வரலாற்றுச் சிறப்புமிக்க உணவகங்கள்</div>
              </div>
              <div>
                <select
                  value={selectedHighway}
                  onChange={(e) => setSelectedHighway(e.target.value)}
                  style={{ background: '#1e293b', color: '#facc15', border: '1px solid #0284c7', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', maxWidth: '300px' }}
                >
                  <option value="nh45">NH 45 (GST சாலை - தென் தமிழகம்)</option>
                  <option value="nh32">NH 32 (ECR & சோழ மண்டலம்)</option>
                  <option value="nh44_544">NH 44 / 544 (கொங்கு மண்டலம்)</option>
                  <option value="nh48">NH 48 (சென்னை - பெங்களூரு வழி)</option>
                </select>
              </div>
            </div>

            {/* Highway Overview Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#facc15', margin: '0 0 4px 0' }}>{activeHighwayData.name}</h4>
                  <div style={{ fontSize: '13px', color: '#38bdf8' }}>🛣️ {activeHighwayData.subtitle}</div>
                </div>
                <div style={{ background: 'rgba(2, 132, 199, 0.2)', border: '1px solid #0284c7', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>
                  தூரம்: {activeHighwayData.distance}
                </div>
              </div>

              {/* Highway Safety Warning */}
              <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', border: '1px dashed #475569', fontSize: '12px', color: '#cbd5e1' }}>
                <span style={{ color: '#4ade80', fontWeight: 'bold' }}>💡 குடும்பப் பயணிகள் குறிப்பு: </span> 
                கீழே குறிப்பிடப்பட்டுள்ள அனைத்து பிட்ஸ்டாப்களும் பெண்கள் மற்றும் முதியோர்களுக்கான **சுத்தமான கழிப்பறை வசதி (Clean Washrooms)**, போதுமான கார் பார்க்கிங் மற்றும் 24 மணி நேரமும் செயல்படும் எரிபொருள் நிலையங்களைக் கொண்டவை.
              </div>
            </div>

            {/* Pitstops Grid */}
            <div style={{ display: 'grid', gap: '14px' }}>
              {activeHighwayData.stops.map((stop, idx) => (
                <div key={idx} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ background: '#0284c7', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                        {stop.km}
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc' }}>
                        {stop.spot}
                      </span>
                    </div>

                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/${stop.mapQuery}`, '_blank')}
                      style={{ padding: '6px 12px', background: '#334155', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      🗺️ இந்த பிட்ஸ்டாப் மேப் &gt;
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '12px', color: '#cbd5e1' }}>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                      <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '4px' }}>🚻 கழிப்பறை தரம்:</div>
                      <div>{stop.restrooms}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                      <div style={{ color: '#fb923c', fontWeight: 'bold', marginBottom: '4px' }}>🍲 பிரசித்தி பெற்ற உணவகங்கள்:</div>
                      <div>{stop.food}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                      <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '4px' }}>⛽ பெட்ரோல் & EV சார்ஜிங்:</div>
                      <div>{stop.fuel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: AI TOUR PLANNER & CIRCUITS */}
        {activeTab === 'planner' && (
          <div>
            {/* 4 GRAND CIRCUITS SELECTOR */}
            <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px', fontWeight: 'bold' }}>தமிழ்நாடு முதன்மை சுற்றுலா சுற்றுகள் (Choose Your Circuit):</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div
                  onClick={() => setSelectedCircuit('navagraha')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: selectedCircuit === 'navagraha' ? 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' : '#1e293b',
                    border: selectedCircuit === 'navagraha' ? '2px solid #38bdf8' : '1px solid #334155'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🛕 ☀️</div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>நவகிரக 9 தலங்கள் சுற்று</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>2 நாட்கள் • கும்பகோணம் மையம் • பரிகார யாத்திரை</div>
                </div>

                <div
                  onClick={() => setSelectedCircuit('arupadai')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: selectedCircuit === 'arupadai' ? 'linear-gradient(135deg, #854d0e 0%, #0f172a 100%)' : '#1e293b',
                    border: selectedCircuit === 'arupadai' ? '2px solid #facc15' : '1px solid #334155'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔱 ⛰️</div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>முருகன் அறுபடை வீடுகள் சுற்று</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>4 நாட்கள் • தமிழ்நாடு முழுதும் • மகா யாத்திரை</div>
                </div>

                <div
                  onClick={() => setSelectedCircuit('hills_falls')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: selectedCircuit === 'hills_falls' ? 'linear-gradient(135deg, #065f46 0%, #0f172a 100%)' : '#1e293b',
                    border: selectedCircuit === 'hills_falls' ? '2px solid #34d399' : '1px solid #334155'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🏔️ 🌊</div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>கொடைக்கானல் & குற்றால அருவிகள்</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>3 நாட்கள் • மலை வாசஸ்தலம் • மூலிகை நீர்வீழ்ச்சி</div>
                </div>

                <div
                  onClick={() => setSelectedCircuit('agri')}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: selectedCircuit === 'agri' ? 'linear-gradient(135deg, #14532d 0%, #0f172a 100%)' : '#1e293b',
                    border: selectedCircuit === 'agri' ? '2px solid #4ade80' : '1px solid #334155'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🌾 🐄</div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>பொள்ளாச்சி - ஆனைமலை அக்ரி சுற்றுலா</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>2 நாட்கள் • தென்னஞ்சோலை • இயற்கை பண்ணை தங்குமிடம்</div>
                </div>
              </div>
            </div>

            {/* CIRCUIT HERO BANNER */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', border: `1px solid ${currentCircuit.accentColor}`, borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: currentCircuit.accentColor, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {currentCircuit.heroTag}
                  </span>
                  <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', margin: '8px 0 4px 0' }}>{currentCircuit.title}</h2>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>📍 {currentCircuit.subtitle}</div>
                </div>

                <div style={{ textAlign: 'right', background: 'rgba(0, 0, 0, 0.4)', padding: '12px 18px', borderRadius: '12px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>மொத்த திட்ட மதிப்பீடு ({travelersCount} நபர்)</div>
                  <div style={{ fontSize: '22px', fontWeight: '900', color: '#4ade80' }}>₹{grandTotalBudget.toLocaleString()}</div>
                  <div style={{ fontSize: '11px', color: '#facc15' }}>தனிநபர் பங்கு: ₹{Math.round(grandTotalBudget / travelersCount).toLocaleString()}</div>
                </div>
              </div>

              {/* ACTION TOOLBAR */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleWhatsAppShare}
                  style={{ flex: 1, minWidth: '180px', padding: '12px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', fontSize: '13px' }}
                >
                  <span>📲</span> வாட்ஸ்அப்பில் பயணத் திட்டம் பகிர்க
                </button>
                <button
                  onClick={handleGoogleMapsRoute}
                  style={{ flex: 1, minWidth: '180px', padding: '12px 18px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', fontSize: '13px' }}
                >
                  <span>🗺️</span> கூகுள் மேப் முழு வழித்தடம்
                </button>
              </div>
            </div>

            {/* VISUAL METRO TIMELINE */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🛤️</span> நிமிட வாரியான மெட்ரோ டிராவல் டைம்லைன் (Live Step-by-Step Route)
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
               {currentCircuit?.itinerary?.map((dayPlan, dIdx) => (
                  <div key={dIdx} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#facc15' }}>{dayPlan.day}</div>
                      <div style={{ fontSize: '12px', color: currentCircuit.accentColor }}>{dayPlan.zone}</div>
                    </div>

                    <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px dashed #334155', display: 'grid', gap: '16px' }}>
                      {dayPlan?.steps?.map((step, sIdx) => (
                        <div key={sIdx} style={{ position: 'relative' }}>
                          <div style={{
                            position: 'absolute',
                            left: '-31px',
                            top: '4px',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: step.type === 'temple' ? '#f59e0b' : step.type === 'waterfall' ? '#38bdf8' : step.type === 'farm' ? '#4ade80' : step.type === 'food' ? '#10b981' : step.type === 'stay' ? '#8b5cf6' : '#94a3b8',
                            boxShadow: '0 0 10px currentColor'
                          }}></div>

                          <div style={{ background: '#1e293b', padding: '12px 14px', borderRadius: '10px', border: '1px solid #334155' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px' }}>{step.icon}</span>
                                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>{step.title}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: currentCircuit.accentColor, fontWeight: 'bold' }}>{step.time}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>{step.desc}</div>

                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                              {step.crowd && (
                                <span style={{ fontSize: '11px', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>
                                  👥 {step.crowd}
                                </span>
                              )}
                              {step.alert && (
                                <span style={{ fontSize: '11px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                                  ⚠️ {step.alert}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SPECIAL GUIDELINES CARDS */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💡</span> அத்தியாவசிய வழிகாட்டி & சிறப்பு குறிப்புகள்
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                {currentCircuit?.tips?.map((tip, tIdx) => (
                  <div key={tIdx} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ color: '#facc15', fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>{tip.title}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5' }}>{tip.desc}</div>
                  </div>
                ))}
              </div>
            </div>
{/* சுற்றுலா & தங்குமிடம் நடத்துவோருக்கான பார்ட்னர்ஷிப் கார்டு */}
      <div style={{
        marginTop: '24px',
        marginBottom: '24px',
        padding: '20px 24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.3rem' }}>🤝</span>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600', color: '#38bdf8' }}>
              சுற்றுலா & தங்குமிடம் நடத்துவோரா நீங்கள்?
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5' }}>
            உங்கள் ஹோட்டல், இயற்கை பண்ணை இல்லம் (Farmstay) அல்லது சுற்றுலா வாகனங்களை 'நம்ம பூமி' தளத்தில் இணைத்து பயணிகளை நேரடியாகச் சென்றடைய எங்களைத் தொடர்பு கொள்ளவும்.
          </p>
        </div>

        <div>
          <a
            href="https://wa.me/919962369131?text=வணக்கம்,%20நம்ம%20பூமி%20சுற்றுலா%20தளத்தில்%20எங்கள்%20ஹோட்டல்%20/%20வாகனங்களை%20இணைக்க%20விரும்புகிறோம்."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              backgroundColor: '#25D366',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
            }}
          >
            <span>💬</span>
            <span>வாட்ஸ்அப்பில் இணைய</span>
          </a>
        </div>
      </div>
            {/* SEARCH & DISCOVER CHIPS */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '10px' }}>🔍 பிற சுற்றுலா & இயற்கை தலங்களைத் தேடுங்கள்</div>
              <input
                type="text"
                placeholder="எ.கா: குற்றாலம், ஊட்டி, பழனி, பொள்ளாச்சி, கொல்லிமலை..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '13px', marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                {['அனைத்தும்', 'ஆன்மீகம் & நவகிரகம்', 'அறுபடை வீடுகள்', 'மலைகள் & அருவிகள்', 'அக்ரி & பண்ணை சுற்றுலா'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedFilter(cat);
                      if (cat === 'மலைகள் & அருவிகள்') setSelectedCircuit('hills_falls');
                      if (cat === 'அக்ரி & பண்ணை சுற்றுலா') setSelectedCircuit('agri');
                      if (cat === 'அறுபடை வீடுகள்') setSelectedCircuit('arupadai');
                      if (cat === 'ஆன்மீகம் & நவகிரகம்') setSelectedCircuit('navagraha');
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '16px',
                      border: 'none',
                      background: selectedFilter === cat ? '#0284c7' : '#1e293b',
                      color: selectedFilter === cat ? '#ffffff' : '#94a3b8',
                      fontSize: '12px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    ★ {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DISTRICT EXPLORER (38 முழுமையான மாவட்டங்கள்) */}
        {activeTab === 'districts' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>📍 தமிழ்நாடு 38 மாவட்ட சுற்றுலா & ஆன்மீகக் கையேடு</h3>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>மாவட்டத்தைத் தேர்ந்தெடுத்து அங்குள்ள முக்கிய தலங்கள், உணவுகள் மற்றும் வழிகளைப் பாருங்கள்</div>
              </div>
              <div>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  style={{ background: '#1e293b', color: '#facc15', border: '1px solid #0284c7', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', maxWidth: '280px' }}
                >
                  {Object.keys(districtsDirectory).map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected District Profile Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', margin: '0 0 4px 0' }}>{selectedDistrict}</h4>
                  <div style={{ fontSize: '13px', color: '#38bdf8' }}>✨ {activeDistrictData.tag}</div>
                </div>
                <div>
                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/${activeDistrictData.mapQuery}`, '_blank')}
                    style={{ padding: '8px 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    🗺️ இந்த மாவட்டத்தின் மேப்
                  </button>
                </div>
              </div>

              {/* Famous Food Strip */}
              <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', border: '1px dashed #475569' }}>
                <span style={{ fontSize: '12px', color: '#fb923c', fontWeight: 'bold' }}>🍲 புகழ்பெற்ற உள்ளூர் உணவுகள் & ஸ்பெஷல்: </span>
                <span style={{ fontSize: '12px', color: '#e2e8f0' }}>{activeDistrictData.famousFood}</span>
              </div>
            </div>

            {/* Spots Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {activeDistrictData.spots.map((spot, idx) => (
                <div key={idx} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#f8fafc' }}>{spot.name}</span>
                      <span style={{ fontSize: '10px', background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                        {spot.type}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '10px' }}>{spot.desc}</div>
                  </div>

                  <div style={{ borderTop: '1px solid #334155', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#4ade80' }}>🕒 உகந்த நேரம்: {spot.bestTime}</span>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(spot.name + ' ' + selectedDistrict)}`, '_blank')}
                      style={{ padding: '4px 10px', background: '#334155', color: '#f8fafc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}
                    >
                      வழி &gt;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXPENSES & SPLIT CALCULATOR */}
        {activeTab === 'expenses' && (
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>💰 டூர் நேரடி பட்ஜெட் & செலவு கணக்கீட்டுக் கருவி ({currentCircuit.title})</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>மொத்த உத்தேச மதிப்பீடு</div>
                <div style={{ fontSize: '22px', fontWeight: '900', color: '#38bdf8' }}>₹{grandTotalBudget.toLocaleString()}</div>
              </div>
              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>பயணிகள் எண்ணிக்கை</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>{travelersCount} நபர்கள்</div>
              </div>
              <div style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>1 நபருக்கான பங்கு</div>
                <div style={{ fontSize: '22px', fontWeight: '900', color: '#facc15' }}>
                  ₹{Math.round(grandTotalBudget / travelersCount).toLocaleString()}
                </div>
              </div>
            </div>

            {/* EXPENSE FORM */}
            <form onSubmit={handleAddExpense} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="செலவு விபரம் (எ.கா: மதிய உணவு / டிக்கெட்)"
                value={newExp.title}
                onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                style={{ flex: '2', minWidth: '160px', padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '13px' }}
              />
              <input
                type="number"
                placeholder="தொகை ₹"
                value={newExp.amount}
                onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                style={{ flex: '1', minWidth: '100px', padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '13px' }}
              />
              <input
                type="text"
                placeholder="கட்டியவர் பெயர்"
                value={newExp.paidBy}
                onChange={(e) => setNewExp({ ...newExp, paidBy: e.target.value })}
                style={{ flex: '1', minWidth: '100px', padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '13px' }}
              />
              <button type="submit" style={{ padding: '10px 20px', background: '#22c55e', color: '#052e16', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                + செலவைச் சேர்
              </button>
            </form>

            {/* EXPENSE CARDS LIST */}
            <div style={{ display: 'grid', gap: '8px' }}>
              {expenses.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div>
                    <span style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 'bold', display: 'block' }}>{item.title}</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>செலவு செய்தவர்: {item.paidBy}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', color: '#facc15', fontSize: '15px' }}>₹{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}