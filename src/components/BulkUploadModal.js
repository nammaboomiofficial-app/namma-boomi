import React, { useState } from 'react';

export default function BulkUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [csvFile, setCsvFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  // எளிய CSV Parser லாஜிக்
  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = lines.slice(1);

    return rows.map(row => {
      const values = row.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return {
        ...obj,
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        is_featured: obj.is_featured === 'true'
      };
    });
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert('தயவுசெய்து ஒரு CSV கோப்பைத் தேர்ந்தெடுக்கவும்!');
      return;
    }

    setIsProcessing(true);
    setStatusMessage('விளம்பரங்கள் பதிவேற்றப்படுகின்றன...');

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const newAds = parseCSV(text);

        if (newAds.length === 0) {
          throw new Error('கோப்பில் தரவுகள் எதுவும் இல்லை!');
        }

        // உள்ளூர் சேமிப்பகத்தில் அல்லது டேட்டாபேஸில் ஏற்றுதல்
        const existingAds = JSON.parse(localStorage.getItem('namma_boomi_ads') || '[]');
        const updatedAds = [...newAds, ...existingAds];
        localStorage.setItem('namma_boomi_ads', JSON.stringify(updatedAds));

        setStatusMessage(`${newAds.length} விளம்பரங்கள் வெற்றிகரமாக ஏற்றப்பட்டன!`);
        setTimeout(() => {
          setIsProcessing(false);
          if (onUploadSuccess) onUploadSuccess(updatedAds);
          onClose();
        }, 1200);
      } catch (err) {
        alert('பிழை: ' + err.message);
        setIsProcessing(false);
        setStatusMessage('');
      }
    };
    reader.readAsText(csvFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-emerald-400">📊 மொத்த விளம்பரங்கள் பதிவேற்றம் (Bulk CSV Upload)</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <p className="text-sm text-slate-300 mb-4">
          Excel அல்லது Google Sheets-ல் தயார் செய்த <strong>.csv</strong> கோப்பைத் தேர்வு செய்து ஒரே கிளிக்கில் 12 மாட்யூல்களிலும் விளம்பரங்களை ஏற்றிவிடுங்கள்.
        </p>

        <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-emerald-500 transition mb-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
          />
          {csvFile && <p className="text-xs text-emerald-400 mt-2">தேர்ந்தெடுக்கப்பட்டது: {csvFile.name}</p>}
        </div>

        {statusMessage && <p className="text-center text-sm font-semibold text-yellow-400 mb-4">{statusMessage}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300"
          >
            ரத்து செய்
          </button>
          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white shadow-lg disabled:opacity-50"
          >
            {isProcessing ? 'ஏற்றப்படுகிறது...' : 'விளம்பரங்களை ஏற்று'}
          </button>
        </div>
      </div>
    </div>
  );
}