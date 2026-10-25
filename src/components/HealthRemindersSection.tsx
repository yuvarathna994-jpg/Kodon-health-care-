import React, { useState } from 'react';
import {
  BellRing,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Shield,
  MessageSquare,
  Sliders,
  AlertCircle,
} from 'lucide-react';

export const HealthRemindersSection: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState<'both' | 'whatsapp' | 'email'>('both');
  const [fastingAlerts, setFastingAlerts] = useState(true);
  const [reportReadyAlerts, setReportReadyAlerts] = useState(true);
  const [monthlyCheckups, setMonthlyCheckups] = useState(true);
  const [refillAlerts, setRefillAlerts] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 5000);
  };

  const handleStopAll = () => {
    setFastingAlerts(false);
    setReportReadyAlerts(false);
    setMonthlyCheckups(false);
    setRefillAlerts(false);
    alert('All non-transactional marketing and wellness reminders have been disabled for your number.');
  };

  return (
    <section id="reminders" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#087F8C]">
              Ethical Healthcare Automation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-1 tracking-tight">
              Health Reminders & WhatsApp Notification Preferences
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Never miss a 12-hour fasting window or annual chronic test. Receive authenticated WhatsApp and Email updates with complete privacy protection and 1-click unsubscribe control.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            <Clock className="w-4 h-4 text-[#087F8C]" />
            <span>Default Scheduling: Asia/Kolkata (IST)</span>
          </div>
        </div>

        {/* Preferences Form Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-[#F4F8FB] p-6 sm:p-8 rounded-3xl border border-slate-200">
            <h3 className="text-base font-bold text-[#10243A] mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#087F8C]" />
              <span>Configure Your Notification Channels</span>
            </h3>

            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 00000"
                      className="w-full pl-12 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fastingAlerts}
                    onChange={(e) => setFastingAlerts(e.target.checked)}
                    className="mt-0.5 text-[#087F8C] rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Pre-Test Fasting Reminders
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Receive an alert 12 hours before your scheduled blood draw to start overnight water fasting.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportReadyAlerts}
                    onChange={(e) => setReportReadyAlerts(e.target.checked)}
                    className="mt-0.5 text-[#087F8C] rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Same-Day Digital Report Alerts
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Receive encrypted PDF report download link on WhatsApp as soon as MD pathologist approves it.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={monthlyCheckups}
                    onChange={(e) => setMonthlyCheckups(e.target.checked)}
                    className="mt-0.5 text-[#087F8C] rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Monthly Diabetes & Chronic Care Follow-Ups
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Quarterly reminders for HbA1c, Thyroid TSH, or Lipid tests (only if opted-in).
                    </div>
                  </div>
                </label>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Preferences saved successfully! You can update or stop them anytime.</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Notification Preferences
                </button>
                <button
                  type="button"
                  onClick={handleStopAll}
                  className="text-xs text-rose-600 hover:underline cursor-pointer"
                >
                  Stop All Promotional Reminders (Opt-Out)
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Column: Privacy & Standards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#10243A] uppercase tracking-wide">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Zero-Spam & Medical Privacy Pledge</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>We never disclose sensitive lab results or disease names in notification preview banners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Reply 'STOP' to any WhatsApp message to pause all automated scheduling alerts immediately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No commercial data sharing with third-party telemarketers or insurers.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white text-xs space-y-2">
              <div className="font-bold text-slate-800">Direct Support Concierge:</div>
              <p className="text-slate-500">
                Need to reschedule an early morning collection or alter address?
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Phone className="w-3.5 h-3.5" />
                <a href="tel:8333821121" className="hover:underline">
                  +91 83338 21121
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5" />
                <span>kodonhealthcare@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
