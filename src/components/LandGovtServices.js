import React from 'react';
import { landGovtServices } from '../data/landServicesData';

export default function LandGovtServices() {
  const handleHelpClick = (service) => {
    const text = encodeURIComponent(`${service.queryTemplate}\n(சேவை: ${service.title})`);
    window.open(`https://wa.me/919962369131?text=${text}`, '_blank');
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-800">
      {/* தலைப்பு பகுதி */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30 mb-2">
            🏛️ தமிழ்நாடு அரசு அதிகாரப்பூர்வ தளங்கள்
          </span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            அரசு நில ஆவண வழிகாட்டல் & சரிபார்ப்பு மையம்
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            பட்டா, சிட்டா, FMB வரைபடம் மற்றும் வில்லங்கச் சான்றுகளை ஆன்லைனில் சரிபார்க்கும் நேரடி உதவி.
          </p>
        </div>
      </div>

      {/* கார்டுகள் கிரிட் */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {landGovtServices.map((service) => (
          <div
            key={service.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-emerald-950/30"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/40">
                  {service.category}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-100">{service.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{service.subtitle}</p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/70 flex items-center gap-2">
              <a
                href={service.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 px-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-medium rounded-xl border border-slate-700 transition"
              >
                {service.actionText} ↗
              </a>
              <button
                type="button"
                onClick={() => handleHelpClick(service)}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl transition"
                title="வாட்ஸ்அப் உதவி பெற"
              >
                உதவி
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}