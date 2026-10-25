import React from 'react';
import {
  Bot,
  Sparkles,
  Check,
  MessageSquare,
  FileText,
  Mail,
  Bell,
  Crown,
  Zap,
  UserCheck,
  Pill,
  Building,
  ArrowRight,
} from 'lucide-react';

interface AiKodanBannerProps {
  onStartChat: () => void;
  onOpenBooking: () => void;
  onSelectServiceTab: (tab: string) => void;
}

export const AiKodanBanner: React.FC<AiKodanBannerProps> = ({
  onStartChat,
  onOpenBooking,
  onSelectServiceTab,
}) => {
  const smartFeatures = [
    {
      title: 'Test Results in Easy Language',
      icon: FileText,
      action: () => onSelectServiceTab('report-explainer'),
    },
    {
      title: 'Direct WhatsApp & Email Support',
      icon: Mail,
      action: () => {
        window.open('https://wa.me/918333821121', '_blank');
      },
    },
    {
      title: 'Monthly Reminders',
      icon: Bell,
      action: () => onSelectServiceTab('reminders'),
    },
    {
      title: 'Premium Subscription',
      icon: Crown,
      action: () => onSelectServiceTab('vip'),
    },
    {
      title: 'VIP Bookings Priority Access',
      icon: Zap,
      action: () => onSelectServiceTab('vip'),
    },
    {
      title: 'Doctor Consultation Video / In-Person',
      icon: UserCheck,
      action: () => onSelectServiceTab('doctors'),
    },
    {
      title: 'Medicine Online & Offline',
      icon: Pill,
      action: () => onSelectServiceTab('medicines'),
    },
    {
      title: 'Hospital Visit Book Assistance',
      icon: Building,
      action: () => onSelectServiceTab('doctors'),
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-[#001e33] via-[#002b49] to-[#087F8C] text-white overflow-hidden relative border-t border-b border-[#003853]">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ======================================================== */}
          {/* LEFT: AI KODAN INTRO (5 COLS)                            */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-400 to-[#087F8C] flex items-center justify-center text-white shadow-xl ring-4 ring-teal-400/30">
                  <Bot className="w-9 h-9 text-slate-900" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-[#002b49] rounded-full"></span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  AI KODAN
                </h3>
                <div className="text-xs font-semibold text-teal-300">
                  Your Advanced AI Health Assistant
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  Powered by Gemini | ChatGPT | Grok | Aragon
                </div>
              </div>
            </div>

            {/* 6 Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Understands your symptoms</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Suggests relevant tests</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Explains test results in simple language</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Recommends health packages</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Provides medical guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                <span>Answers your health queries 24/7</span>
              </div>
            </div>

            {/* Speech bubble & Start Chat Now button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-teal-100 font-medium">
                How can I help you today?
              </div>
              <button
                onClick={onStartChat}
                className="px-5 py-2.5 rounded-full bg-[#13A879] hover:bg-[#0f8c64] text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start Chat Now</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER: SMART HEALTH FEATURES (4 COLS)                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10">
            <h4 className="text-xs font-extrabold text-teal-300 uppercase tracking-wider mb-3">
              Smart Health Features
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {smartFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <button
                    key={idx}
                    onClick={feat.action}
                    className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center gap-2 text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-xl bg-white/20 text-teal-200 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-100 leading-tight group-hover:text-teal-300">
                      {feat.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: HEALTH JOURNEY CTA (3 COLS)                       */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/15 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-400 text-slate-900 flex items-center justify-center text-xl shadow-md mb-3">
                👩‍⚕️
              </div>
              <h4 className="text-base font-extrabold text-white leading-tight">
                Your Health Journey Just Got Smarter!
              </h4>
              <p className="text-xs text-teal-100 mt-2 leading-relaxed">
                Let <span className="font-bold text-white">AI KODAN</span> guide you, book your tests, get your results, and never miss your health goals.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Start Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
