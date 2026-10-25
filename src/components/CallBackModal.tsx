import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle2, Clock, ShieldCheck, MapPin, User, Phone } from 'lucide-react';

interface CallBackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTestName?: string;
  defaultLocality?: string;
}

export const CallBackModal: React.FC<CallBackModalProps> = ({
  isOpen,
  onClose,
  defaultTestName = '',
  defaultLocality = 'Hyderabad',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [testConcern, setTestConcern] = useState(defaultTestName);
  const [preferredSlot, setPreferredSlot] = useState('Within 15 minutes (Immediate)');
  const [locality, setLocality] = useState(defaultLocality);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10243A] to-[#003853] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#087F8C]/30 flex items-center justify-center border border-[#087F8C]/40 text-[#13A879]">
              <PhoneCall className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Request an Instant Call Back</h3>
              <p className="text-xs text-teal-200">KODON Healthcare Coordination Team · Hyderabad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-extrabold text-[#10243A]">Call Back Confirmed!</h4>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{name}</span>. Our senior medical coordinator will call you on{' '}
              <span className="font-semibold text-emerald-700 font-mono">
                {phone.startsWith('+91') ? phone : `+91 ${phone}`}
              </span>{' '}
              ({preferredSlot.toLowerCase()}) to assist with your booking for{' '}
              <span className="font-semibold text-slate-900">{testConcern || 'your requested test'}</span>.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-teal-50 border border-teal-100 text-left w-full text-xs text-teal-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#087F8C]">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-Spam & Medical Privacy Assurance</span>
              </div>
              <p className="text-teal-800">
                Your contact details are strictly used for your healthcare appointment and sample collection assistance. Need immediate help? You can also call us directly at{' '}
                <a href="tel:8333821121" className="font-bold underline text-[#10243A]">
                  8333821121
                </a>.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Prefer speaking with a human coordinator? Leave your phone number and we will call you back in{' '}
              <span className="font-bold text-[#087F8C]">under 15 minutes</span> to discuss test details, fasting instructions, and schedule your appointment.
            </p>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (WhatsApp Preferred) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 8333821121)"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Test / Inquiry
                </label>
                <input
                  type="text"
                  value={testConcern}
                  onChange={(e) => setTestConcern(e.target.value)}
                  placeholder="e.g. CBC, MRI, Full Body"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Locality in Hyderabad
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Madhapur, Jubilee Hills"
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Call Back Time
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:bg-white cursor-pointer"
                >
                  <option value="Within 15 minutes (Immediate)">Within 15 minutes (Immediate)</option>
                  <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087F8C] to-[#13A879] hover:from-[#076f7a] hover:to-[#109369] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Me Back</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              Direct Hyderabad Desk: <span className="font-semibold text-slate-600">8333821121</span> · kodonhealthcare@gmail.com
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
