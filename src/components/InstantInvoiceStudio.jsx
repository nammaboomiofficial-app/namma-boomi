import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, Share2, Receipt, Building2, User, CheckCircle2 } from 'lucide-react';

export default function InstantInvoiceStudio() {
  const [docType, setDocType] = useState('TAX INVOICE'); // 'TAX INVOICE' or 'QUOTATION'
  const [invoiceNo, setInvoiceNo] = useState('NB-' + Math.floor(1000 + Math.random() * 9000));
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);

  const [business, setBusiness] = useState({
    name: 'நம்ம பூமி ரியல் எஸ்டேட் & டிரேடர்ஸ்',
    phone: '98400 12345',
    gstin: '33AABCU9603R1ZM',
    address: 'சாலவாக்கம் மெயின் ரோடு, காஞ்சிபுரம் மாவட்டம்'
  });

  const [customer, setCustomer] = useState({
    name: 'திரு. கார்த்திகேயன்',
    phone: '98410 67890',
    address: 'திருப்போரூர், செங்கல்பட்டு மாவட்டம்'
  });

  const [gstRate, setGstRate] = useState(18);
  const [items, setItems] = useState([
    { id: 1, desc: 'மனை சர்வே & லீகல் ஆவண சரிபார்ப்பு கட்டணம்', qty: 1, rate: 2500 },
    { id: 2, desc: 'பட்டா / சிட்டா / EC ஆன்லைன் சேவை கட்டணம்', qty: 1, rate: 500 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', qty: 1, rate: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: field === 'desc' ? value : Number(value) } : item
      )
    );
  };

  const subTotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const gstAmount = (subTotal * gstRate) / 100;
  const grandTotal = subTotal + gstAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const itemLines = items
      .map((it, idx) => `${idx + 1}. ${it.desc || 'பொருள்'} (${it.qty} x ₹${it.rate}) = ₹${(it.qty * it.rate).toLocaleString('en-IN')}`)
      .join('\n');

    const text = `🧾 *${docType} - ${invoiceNo}*\n📅 தேதி: ${invoiceDate}\n\n🏢 *${business.name}*\n📞 ${business.phone}\n\n👤 *வாடிக்கையாளர்:* ${customer.name}\n\n📋 *விவரங்கள்:*\n${itemLines}\n\n💰 அடிப்படைத் தொகை: ₹${subTotal.toLocaleString('en-IN')}\n📊 GST (${gstRate}%): ₹${gstAmount.toLocaleString('en-IN')}\n✅ *மொத்தத் தொகை: ₹${grandTotal.toLocaleString('en-IN')}*\n\n_நம்ம பூமி 360° டிஜிட்டல் பில்லிங் மூலம் உருவாக்கப்பட்டது_`;

    const cleanPhone = customer.phone.replace(/\D/g, '');
    const waUrl = cleanPhone.length >= 10
      ? `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden my-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 p-5 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/15 p-3 rounded-xl">
            <Receipt className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full">
              FREE BUSINESS TOOL
            </span>
            <h2 className="text-xl md:text-2xl font-bold mt-1">
              🧾 உடனடி GST இன்வாய்ஸ் & கொட்டேஷன் உருவாக்கி
            </h2>
            <p className="text-emerald-100 text-xs md:text-sm">
              சிறு வணிகர்கள் & ரியல் எஸ்டேட் ஏஜென்ட்களுக்கான 10-நொடி டிஜிட்டல் பில் / Quotation கருவி
            </p>
          </div>
        </div>

        {/* Document Type Switcher */}
        <div className="flex bg-emerald-950/60 p-1 rounded-xl border border-emerald-700/50">
          {['TAX INVOICE', 'QUOTATION'].map((type) => (
            <button
              key={type}
              onClick={() => setDocType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                docType === type
                  ? 'bg-amber-400 text-slate-900 shadow'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              {type === 'TAX INVOICE' ? '🧾 GST பில் (Invoice)' : '📋 கொட்டேஷன் (Quotation)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Form | Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 md:p-6">
        {/* Left Input Controls */}
        <div className="lg:col-span-6 space-y-5 print:hidden">
          {/* Business Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" /> உங்கள் நிறுவன விவரம் (From)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="நிறுவனம் / கடை பெயர்"
                value={business.name}
                onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <input
                type="text"
                placeholder="தொலைபேசி எண்"
                value={business.phone}
                onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <input
                type="text"
                placeholder="GSTIN (விருப்பப்பட்டால்)"
                value={business.gstin}
                onChange={(e) => setBusiness({ ...business, gstin: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <input
                type="text"
                placeholder="முகவரி / ஊர்"
                value={business.address}
                onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-700" /> வாடிக்கையாளர் விவரம் (Bill To)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="வாடிக்கையாளர் பெயர்"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <input
                type="text"
                placeholder="வாடிக்கையாளர் WhatsApp எண்"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <input
                type="text"
                placeholder="வாடிக்கையாளர் ஊர் / முகவரி"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className="w-full md:col-span-2 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" /> பொருட்கள் / சேவை விவரம்
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">GST %:</span>
                <select
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="text-xs font-bold border rounded-lg px-2 py-1 bg-white"
                >
                  <option value={0}>0% (No GST)</option>
                  <option value={5}>5% GST</option>
                  <option value={12}>12% GST</option>
                  <option value={18}>18% GST</option>
                  <option value={28}>28% GST</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded-lg border">
                  <input
                    type="text"
                    placeholder={`விவரம் ${index + 1}`}
                    value={item.desc}
                    onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                    className="col-span-6 px-2 py-1.5 text-xs border rounded outline-none"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="அளவு"
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                    className="col-span-2 px-2 py-1.5 text-xs border rounded text-center outline-none"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="விலை ₹"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                    className="col-span-3 px-2 py-1.5 text-xs border rounded text-right outline-none"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="col-span-1 text-red-500 hover:text-red-700 flex justify-center"
                    title="நீக்கு"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addItem}
              className="w-full py-2 border-2 border-dashed border-emerald-400 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-50 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> புதிய வரிசை சேர்க்க (Add Item)
            </button>
          </div>
        </div>

        {/* Right Live Invoice Sheet Preview */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="border-2 border-slate-300 rounded-xl p-5 bg-white shadow-inner">
            {/* Sheet Top */}
            <div className="flex justify-between items-start border-b-2 border-emerald-800 pb-4">
              <div>
                <h4 className="text-lg font-extrabold text-emerald-950">{business.name || 'நிறுவனம் பெயர்'}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{business.address}</p>
                <p className="text-xs text-slate-700 font-medium mt-0.5">📞 {business.phone}</p>
                {business.gstin && (
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">GSTIN: {business.gstin}</p>
                )}
              </div>
              <div className="text-right">
                <span className="inline-block bg-emerald-900 text-white text-xs font-extrabold px-3 py-1 rounded">
                  {docType}
                </span>
                <p className="text-xs font-bold text-slate-700 mt-2">எண்: {invoiceNo}</p>
                <p className="text-xs text-slate-500">தேதி: {invoiceDate}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="my-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <p className="text-[11px] font-bold uppercase text-slate-400">வாடிக்கையாளர் (BILL TO):</p>
              <p className="text-sm font-bold text-slate-900">{customer.name || 'வாடிக்கையாளர் பெயர்'}</p>
              <p className="text-xs text-slate-600">{customer.address} {customer.phone ? `• 📞 ${customer.phone}` : ''}</p>
            </div>

            {/* Table */}
            <table className="w-full text-xs border-collapse my-3">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th className="p-2 text-left rounded-tl">#</th>
                  <th className="p-2 text-left">விவரம்</th>
                  <th className="p-2 text-center">அளவு</th>
                  <th className="p-2 text-right">விலை</th>
                  <th className="p-2 text-right rounded-tr">தொகை</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="p-2 text-slate-500">{idx + 1}</td>
                    <td className="p-2 font-medium text-slate-800">{item.desc || '-'}</td>
                    <td className="p-2 text-center">{item.qty}</td>
                    <td className="p-2 text-right">₹{item.rate.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-right font-bold">₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mt-4">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>அடிப்படைத் தொகை (Subtotal):</span>
                  <span className="font-semibold">₹{subTotal.toLocaleString('en-IN')}</span>
                </div>
                {gstRate > 0 && (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>CGST ({gstRate / 2}%):</span>
                      <span>₹{(gstAmount / 2).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>SGST ({gstRate / 2}%):</span>
                      <span>₹{(gstAmount / 2).toLocaleString('en-IN')}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm font-extrabold text-emerald-950 border-t-2 border-emerald-800 pt-2">
                  <span>மொத்தத் தொகை (Grand Total):</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-5 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> நம்ம பூமி 360° டிஜிட்டல் பில்லிங்
              </span>
              <span>அங்கீகரிக்கப்பட்ட கையொப்பம்</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4 print:hidden">
            <button
              onClick={handlePrint}
              className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow transition"
            >
              <Printer className="w-4 h-4 text-amber-400" /> Print / PDF சேமிக்க
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow transition"
            >
              <Share2 className="w-4 h-4" /> WhatsApp-ல் அனுப்புக
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}