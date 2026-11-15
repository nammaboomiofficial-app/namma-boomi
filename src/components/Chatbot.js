import { useState } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ text: 'வணக்கம்! நம்ம பூமி 360-ல் நான் உங்களுக்கு எப்படி உதவ முடியும்?', user: false }]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, user: true }];
    setMessages(newMessages);
    setInput('');
    
    const res = await fetch('/api/bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    
    const data = await res.json();
    setMessages([...newMessages, { text: data.reply, user: false }]);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white border-2 border-blue-900 rounded-lg shadow-2xl z-50">
      <div className="bg-blue-900 text-white p-3 rounded-t-md font-bold">AI உதவியாளர்</div>
      <div className="h-64 overflow-y-auto p-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.user ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg text-sm ${m.user ? "bg-blue-100 text-blue-900" : "bg-green-100 text-green-900"}`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full p-2 outline-none text-sm" 
          placeholder="கேள்வியைத் தட்டச்சு செய்க..." 
        />
        <button onClick={sendMessage} className="bg-blue-900 text-white px-4 text-sm">அனுப்பு</button>
      </div>
    </div>
  );
}