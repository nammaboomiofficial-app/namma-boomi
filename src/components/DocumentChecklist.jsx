'use client';
import { useState } from 'react';
import checklistData from '../data/documentChecklistData.json';

export default function DocumentChecklist() {
  const [selectedLoanId, setSelectedLoanId] = useState(checklistData.loanCategories[0].id);
  const [checkedDocs, setCheckedDocs] = useState({});

  const activeCategory = checklistData.loanCategories.find((cat) => cat.id === selectedLoanId);

  const toggleDoc = (docId) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const totalDocs = activeCategory?.requiredDocs.length || 0;
  const readyDocs = activeCategory?.requiredDocs.filter((doc) => checkedDocs[doc.id]).length || 0;
  const progressPercent = totalDocs > 0 ? Math.round((readyDocs / totalDocs) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 bg-slate-900/80 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl text-slate-100">
      
      {/* தலைப்பு பகுதி */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            📂 ஆவண தயாரிப்பு வழிகாட்டி
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
            கடன் ஒப்புதலுக்கான ஆவணங்கள் சரிபார்ப்புப் பட்டியல்
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            உங்கள் கடனுக்குத் தேவையான ஆவணங்களை முன்கூட்டியே சரிபார்த்து உடனடி ஒப்புதலைப் பெறுங்கள்.
          </p>
        </div>

        {/* முன்னேற்ற நிலை (Progress Bar) */}
        <div className="w-full sm:w-48 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 text-right">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-400">தயார் நிலை:</span>
            <span className="font-bold text-emerald-400">{readyDocs} / {totalDocs}</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* கடன் வகை தேர்வுகள் (Tabs) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {checklistData.loanCategories.map((category) => {
          const isActive = category.id === selectedLoanId;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedLoanId(category.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1.5 inline-block ${
                isActive ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-700/40 border-slate-700 text-slate-400'
              }`}>
                {category.badge}
              </span>
              <div className="font-bold text-xs sm:text-sm">{category.title}</div>
            </button>
          );
        })}
      </div>

      {/* ஆவணங்களின் பட்டியல் */}
      <div className="space-y-3">
        {activeCategory?.requiredDocs.map((doc, idx) => {
          const isDone = !!checkedDocs[doc.id];
          return (
            <div
              key={doc.id}
              onClick={() => toggleDoc(doc.id)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none ${
                isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-white'
                  : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleDoc(doc.id)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold">
                    {idx + 1}. {doc.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      வகை: {doc.type}
                    </span>
                    {doc.mandatory ? (
                      <span className="text-[10px] text-red-400 font-bold">* கட்டாயம்</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">கூடுதல் ஆவணம்</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold">
                {isDone ? (
                  <span className="text-emerald-400 flex items-center gap-1">✓ தயாராக உள்ளது</span>
                ) : (
                  <span className="text-slate-400">நிலுவை</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}