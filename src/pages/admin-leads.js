import React, { useState } from 'react';
import Head from 'next/head';
import {
  ShieldCheck,
  Download,
  Users,
  Smartphone,
  MessageCircle,
  RefreshCw,
  Lock,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';

export default function AdminLeadsDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [vipUsers, setVipUsers] = useState([]);
  const [installLogs, setInstallLogs] = useState([]);
  const [partnerApplications, setPartnerApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('partners'); // 'partners' | 'vip'
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeads = async (pwd) => {
    setLoading(true);
    setErrorMsg('');
    setWarningMsg('');
    try {
      const res = await fetch('/api/get-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'அணுகல் மறுக்கப்பட்டது');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setVipUsers(data.vipUsers || []);
        setInstallLogs(data.installLogs || []);
        setPartnerApplications(data.partnerApplications || []);
        setWarningMsg(data.warning || '');
      }
    } catch (err) {
      setErrorMsg('இணைய இணைப்பைச் சரிபார்க்கவும்.');
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchLeads(password);
  };

  const formatDate = (iso) => {
    if (!iso) return '-';
    try {
      return new Date(iso).toLocaleString('ta-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const q = searchQuery.toLowerCase().trim();

  const filteredPartners = partnerApplications.filter(
    (p) =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.district || '').toLowerCase().includes(q) ||
      (p.taluk || '').toLowerCase().includes(q) ||
      (p.occupation || '').toLowerCase().includes(q) ||
      (p.whatsapp || '').includes(q)
  );

  const filteredUsers = vipUsers.filter(
    (u) =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.district || '').toLowerCase().includes(q) ||
      (u.whatsapp || '').includes(q)
  );

  const exportCSV = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    let csvRows = [];
    let fileName = '';

    if (activeTab === 'partners') {
      const headers = ['Name,District,Taluk,WhatsApp,Occupation,Notes,OfferType,Submitted Time'];
      const rows = filteredPartners.map(
        (p) =>
          `"${p.name || ''}","${p.district || ''}","${p.taluk || ''}","${p.whatsapp || ''}","${(
            p.occupation || ''
          ).replace(/"/g, '""')}","${(p.notes || '').replace(/"/g, '""')}","${
            p.offerType || ''
          }","${formatDate(p.submittedAt || p.timestamp)}"`
      );
      csvRows = [headers, ...rows];
      fileName = `NammaBoomi360_TalukPartners_${dateStr}.csv`;
    } else {
      const headers = ['Name,District,WhatsApp,Registered Time'];
      const rows = filteredUsers.map(
        (u) => `"${u.name || ''}","${u.district || ''}","${u.whatsapp || ''}","${formatDate(u.timestamp)}"`
      );
      csvRows = [headers, ...rows];
      fileName = `NammaBoomi360_VIPUsers_${dateStr}.csv`;
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <Head>
        <title>Admin Dashboard - நம்ம பூமி 360</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {!isAuthenticated ? (
        <div className="max-w-sm mx-auto mt-20 bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
            <Lock className="w-4 h-4" /> நிர்வாகி உள்நுழைவு (Admin Only)
          </div>
          <h1 className="text-lg font-extrabold text-amber-300 mb-4">நம்ம பூமி 360° - Admin Control</h1>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              required
              placeholder="Admin கடவுச்சொல் உள்ளிடவும்..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-2.5 rounded-xl transition cursor-pointer"
            >
              {loading ? 'சரிபார்க்கிறது...' : 'உள்நுழைக'}
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" /> நம்ம பூமி 360° Admin Control
              </div>
              <h1 className="text-xl font-extrabold text-amber-300 mt-1">
                வணிக & பயனர் நிர்வாக மையம்
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchLeads(password)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> புதுப்பி
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Download className="w-4 h-4" /> Excel (CSV)
              </button>
            </div>
          </div>

          {warningMsg && (
            <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 text-amber-200 px-4 py-3 rounded-xl text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{warningMsg}</span>
            </div>
          )}

          {/* 3 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveTab('partners')}
              className={`cursor-pointer bg-gradient-to-br from-amber-950/80 to-slate-900 border p-4 rounded-2xl transition ${
                activeTab === 'partners' ? 'border-amber-400 ring-1 ring-amber-400/50' : 'border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Briefcase className="w-4 h-4" /> தாலுகா பார்ட்னர் விண்ணப்பங்கள்
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {partnerApplications.length}
              </p>
            </div>

            <div
              onClick={() => setActiveTab('vip')}
              className={`cursor-pointer bg-gradient-to-br from-indigo-950 to-slate-900 border p-4 rounded-2xl transition ${
                activeTab === 'vip' ? 'border-indigo-400 ring-1 ring-indigo-400/50' : 'border-indigo-500/30'
              }`}
            >
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
                <Users className="w-4 h-4" /> விவரம் பதிந்த VIP பயனர்கள்
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-2">{vipUsers.length}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/30 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Smartphone className="w-4 h-4" /> மொத்த ஆப் இன்ஸ்டால்கள்
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{installLogs.length}</p>
            </div>
          </div>

          {/* Navigation Tabs & Search */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('partners');
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'partners'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  தாலுகா பார்ட்னர்கள் ({partnerApplications.length})
                </button>
                <button
                  onClick={() => {
                    setActiveTab('vip');
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'vip'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  VIP பயனர்கள் ({vipUsers.length})
                </button>
              </div>

              <input
                type="text"
                placeholder={
                  activeTab === 'partners'
                    ? 'பெயர், மாவட்டம், தாலுகா அல்லது தொழில் தேடவும்...'
                    : 'பெயர், மாவட்டம் அல்லது மொபைல் எண் தேடவும்...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Table Content */}
            {activeTab === 'partners' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-2">#</th>
                      <th className="py-3 px-2">பெயர்</th>
                      <th className="py-3 px-2">மாவட்டம் & தாலுகா</th>
                      <th className="py-3 px-2">WhatsApp எண்</th>
                      <th className="py-3 px-2">தொழில் / அனுபவம்</th>
                      <th className="py-3 px-2">கூடுதல் குறிப்பு</th>
                      <th className="py-3 px-2">விண்ணப்பித்த நேரம்</th>
                      <th className="py-3 px-2">தொடர்பு</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredPartners.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-slate-400">
                          இதுவரை தாலுகா பார்ட்னர் விண்ணப்பங்கள் இல்லை.
                        </td>
                      </tr>
                    ) : (
                      filteredPartners.map((partner, idx) => {
                        const cleanPhone = (partner.whatsapp || '').replace(/\D/g, '');
                        const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                        const waMessage = `வணக்கம் ${partner.name || ''}, நம்ம பூமி 360° (${
                          partner.district || ''
                        } - ${
                          partner.taluk || ''
                        } தாலுகா) Founding Partner விண்ணப்பம் கிடைத்தது. 1-on-1 அழைப்பிற்கு எப்போது பேசலாம்?`;
                        return (
                          <tr key={partner.id || idx} className="hover:bg-slate-800/40">
                            <td className="py-3 px-2 text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-2 font-bold text-white">{partner.name || '-'}</td>
                            <td className="py-3 px-2">
                              <span className="text-emerald-300 font-semibold">{partner.district || '-'}</span>
                              <span className="block text-slate-400 text-[11px]">{partner.taluk || '-'}</span>
                            </td>
                            <td className="py-3 px-2 font-mono text-amber-300">{partner.whatsapp || '-'}</td>
                            <td className="py-3 px-2 text-slate-200">{partner.occupation || '-'}</td>
                            <td className="py-3 px-2 text-slate-300 max-w-[180px] truncate" title={partner.notes}>
                              {partner.notes || '-'}
                            </td>
                            <td className="py-3 px-2 text-slate-400">
                              {formatDate(partner.submittedAt || partner.timestamp)}
                            </td>
                            <td className="py-3 px-2">
                              {waNumber && (
                                <a
                                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold whitespace-nowrap"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-3 px-2">#</th>
                      <th className="py-3 px-2">பெயர்</th>
                      <th className="py-3 px-2">மாவட்டம்</th>
                      <th className="py-3 px-2">WhatsApp எண்</th>
                      <th className="py-3 px-2">பதிவு நேரம்</th>
                      <th className="py-3 px-2">தொடர்பு</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-400">
                          இதுவரை VIP பயனர் பதிவுகள் இல்லை.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user, idx) => {
                        const cleanPhone = (user.whatsapp || '').replace(/\D/g, '');
                        const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                        return (
                          <tr key={user.id || idx} className="hover:bg-slate-800/40">
                            <td className="py-3 px-2 text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-2 font-bold text-white">{user.name || '-'}</td>
                            <td className="py-3 px-2 text-emerald-300">{user.district || '-'}</td>
                            <td className="py-3 px-2 font-mono text-amber-300">{user.whatsapp || '-'}</td>
                            <td className="py-3 px-2 text-slate-400">{formatDate(user.timestamp)}</td>
                            <td className="py-3 px-2">
                              {waNumber && (
                                <a
                                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                                    `வணக்கம் ${user.name || ''}, நம்ம பூமி 360° ஆப் இன்ஸ்டால் செய்ததற்கு நன்றி!`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}