import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function TamilVoiceAssistant({ onSelectModule }) {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleVoiceCommand = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert('உங்கள் பிரவுசர் தமிழ் குரல் தேடலை ஆதரிக்கவில்லை. Google Chrome பயன்படுத்தவும்.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ta-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setTranscript('');
    setStatusMsg('🎙️ தமிழில் பேசுங்கள்... (எ.கா: "நிலம்", "மண்டி விலை", "போஸ்டர்", "கடன்")');

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      routeByTamilSpeech(spokenText.toLowerCase());
    };

    recognition.onerror = () => {
      setIsListening(false);
      setStatusMsg('⚠️ குரல் தெளிவாகக் கேட்கவில்லை. மீண்டும் மைக் பட்டனை அழுத்திப் பேசவும்.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const routeByTamilSpeech = (text) => {
    // 1. தனிப் பக்கங்கள் (Pages)
    if (text.includes('மண்டி') || text.includes('மொத்த') || text.includes('காய்கறி') || text.includes('wholesale')) {
      setStatusMsg('✅ A-Z மொத்த மண்டி & B2B பிரிவிற்குச் செல்கிறது...');
      router.push('/wholesale');
      return;
    }
    if (text.includes('dpr') || text.includes('திட்ட அறிக்கை') || text.includes('msme') || text.includes('மானியம்')) {
      setStatusMsg('✅ MSME வங்கி திட்ட அறிக்கை ஸ்டுடியோ திறக்கிறது...');
      router.push('/msme-project');
      return;
    }

    // 2. முகப்புப் பக்க மாடல்கள் (Modules)
    let targetModule = null;
    let moduleLabel = '';

    if (text.includes('நிலம்') || text.includes('மனை') || text.includes('ரியல்') || text.includes('வீடு') || text.includes('land')) {
      targetModule = 'land';
      moduleLabel = 'ரியல் எஸ்டேட் & நிலம் பிரிவு';
    } else if (text.includes('பட்டா') || text.includes('சிட்டா') || text.includes('வில்லங்க') || text.includes('அரசு')) {
      targetModule = 'patta';
      moduleLabel = 'பட்டா / சிட்டா & அரசு சேவைகள்';
    } else if (text.includes('விவசாய') || text.includes('பயிர்') || text.includes('தோட்ட')) {
      targetModule = 'agri';
      moduleLabel = 'விவசாயம் & தோட்டக்கலை பிரிவு';
    } else if (text.includes('கடன்') || text.includes('வங்கி') || text.includes('லோன்') || text.includes('finance')) {
      targetModule = 'finance';
      moduleLabel = 'வங்கிக் கடன் & நிதி ஆலோசனை';
    } else if (text.includes('வேலை') || text.includes('பணி') || text.includes('job')) {
      targetModule = 'jobs';
      moduleLabel = 'வேலைவாய்ப்புப் பிரிவு';
    } else if (text.includes('ஜோதிட') || text.includes('பஞ்சாங்க') || text.includes('ஜாதக')) {
      targetModule = 'astro';
      moduleLabel = 'திருக்கணித AI ஜோதிடம்';
    } else if (text.includes('போஸ்டர்') || text.includes('விளம்பர') || text.includes('கார்டு') || text.includes('வீடியோ')) {
      targetModule = 'media_studio';
      moduleLabel = 'AI விளம்பர போஸ்டர் & மீடியா ஸ்டுடியோ';
    } else if (text.includes('தொழில்') || text.includes('வணிக') || text.includes('கடை')) {
      targetModule = 'business';
      moduleLabel = 'வணிகம் & தொழில் பிரிவு';
    } else if (text.includes('சுற்றுலா') || text.includes('கோவில்') || text.includes('ஆன்மீக')) {
      targetModule = 'spiritual';
      moduleLabel = 'ஆன்மீகம் & சுற்றுலா பிரிவு';
    }

    if (targetModule && onSelectModule) {
      setStatusMsg(`✅ "${moduleLabel}" திறக்கப்படுகிறது...`);
      onSelectModule(targetModule);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatusMsg(`🗣️ நீங்கள் சொன்னது: "${text}" — கீழே உள்ள பிரிவுகளில் ஒன்றைத் தேர்ந்தெடுக்கவும்.`);
    }
  };

  return (
    <div className="fixed bottom-52 sm:bottom-40 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {(isListening || statusMsg) && (
        <div className="max-w-xs bg-slate-900/95 border border-purple-500/50 text-white p-3 rounded-2xl shadow-2xl text-xs space-y-1 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-purple-300">🎙️ தமிழ் குரல் உதவியாளர்</span>
            <button
              type="button"
              onClick={() => {
                setStatusMsg('');
                setTranscript('');
              }}
              className="text-slate-400 hover:text-white font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          {transcript && (
            <p className="text-amber-300 font-semibold">"{transcript}"</p>
          )}
          <p className="text-slate-200 leading-snug">{statusMsg}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleVoiceCommand}
        title="தமிழில் பேசித் தேட அழுத்தவும்"
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-bold text-xs shadow-2xl border transition-all cursor-pointer ${
          isListening
            ? 'bg-red-600 text-white border-red-300 animate-pulse scale-105'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-purple-400/50'
        }`}
      >
        <span className="text-base">{isListening ? '🛑' : '🎙️'}</span>
        <span className="hidden sm:inline">{isListening ? 'கேட்கிறது...' : 'தமிழில் பேசுக'}</span>
      </button>
    </div>
  );
}