import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'வணக்கம்! நம்ம பூமி 360-ல் நான் உங்களுக்கு எப்படி உதவ முடியும்?', user: false }
  ]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    const newMessages = [...messages, { text: userText, user: true }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();
      setMessages([...newMessages, { text: data.reply || 'பதில் கிடைக்கவில்லை.', user: false }]);
    } catch (err) {
      setMessages([...newMessages, { text: 'சர்வர் இணைப்புத் துண்டிக்கப்பட்டது.', user: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white p-4 rounded-full shadow-2xl hover:bg-blue-800 transition-all flex items-center justify-center text-xl font-bold border-2 border-white"
        >
          💬 AI
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white border-2 border-blue-900 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-blue-900 text-white p-3 font-bold flex justify-between items-center">
            <span>AI உதவியாளர் - நம்ம பூமி 360</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 font-bold text-lg px-2"
            >
              ✕
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.user ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg text-sm ${m.user ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}>
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left mb-2">
                <span className="inline-block p-2 rounded-lg text-xs bg-gray-200 text-gray-600 animate-pulse">
                  பதில் தயாராகிறது...
                </span>
              </div>
            )}
          </div>
          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
              className="w-full p-2 outline-none text-sm disabled:bg-gray-100"
              placeholder="கேள்வியைத் தட்டச்சு செய்க..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-900 text-white px-4 text-sm hover:bg-blue-800 disabled:bg-blue-400"
            >
              {loading ? '...' : 'அனுப்பு'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}