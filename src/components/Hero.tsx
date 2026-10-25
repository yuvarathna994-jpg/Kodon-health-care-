import React, { useState } from 'react';
import {
  Bot,
  Send,
  Check,
  Search,
  MessageSquare,
  Sparkles,
  Calendar,
  Activity,
  Scan,
  UserCheck,
  Pill,
  Building,
  Heart,
  Crown,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';

interface HeroProps {
  onExplorePackages: () => void;
  onOpenPdfModal?: () => void;
  onOpenReportTrends?: () => void;
  onAskAi: (prompt: string) => void;
  onOpenBooking: () => void;
  onSelectServiceTab: (tab: string) => void;
  onScrollToSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePackages,
  onOpenPdfModal,
  onOpenReportTrends,
  onAskAi,
  onOpenBooking,
  onSelectServiceTab,
  onScrollToSearch,
}) => {
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onAskAi(chatInput.trim());
    setChatInput('');
  };

  const handleQuickPrompt = (prompt: string) => {
    onAskAi(prompt);
  };

  return (
    <section className="relative pt-6 pb-12 bg-gradient-to-b from-[#F4F8FB] via-white to-[#F4F8FB] border-b border-slate-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Layout Matching User Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* COLUMN 1: LEFT WIDGET CARD (AI KODAN - ONLINE)          */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-5 shadow-lg border border-slate-200/80 flex flex-col justify-between">
            <div>
              {/* Header: Avatar + Title + Online Badge */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#087F8C] to-[#10243A] flex items-center justify-center text-white shadow-md">
                    <Bot className="w-7 h-7 text-teal-200" />
                  </div>
                  {/* Glowing online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium leading-none">Hello! I'm</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-extrabold text-base text-[#10243A] tracking-tight">AI KODAN</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Your Personal Health Assistant</div>
                </div>
              </div>

              {/* Assistance capabilities list */}
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-700 mb-2">
                  I'm here to help you with:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Test recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Report analysis & explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Booking & scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Health tips & preventive care</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Direct WhatsApp & Email support</span>
                  </li>
                </ul>
              </div>

              {/* Chat Speech Bubble */}
              <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#087F8C]/15 text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <p className="leading-snug">
                  Hi! How can I help you with your health today?
                </p>
              </div>
            </div>

            {/* Input & Quick Chips */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
              <form onSubmit={handleSendChat} className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your health concern..."
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#087F8C] focus:bg-white"
                />
                <button
                  type="submit"
                  aria-label="Send query to AI Kodan"
                  className="absolute right-1.5 p-1.5 rounded-lg bg-[#087F8C] hover:bg-[#066a75] text-white transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* 3 Quick Chips matching image */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('Check my symptoms and explain possible causes')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-teal-50 hover:text-[#087F8C] hover:border-teal-300 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  Check my symptoms
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('Suggest routine preventive tests for general wellness')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-teal-50 hover:text-[#087F8C] hover:border-teal-300 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  Suggest tests
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('How do I book a consultation with a specialist doctor?')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-teal-50 hover:text-[#087F8C] hover:border-teal-300 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  Book a consultation
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: CENTER HERO BANNER (YOUR COMPLETE HEALTHCARE)   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#eaf4f7] via-[#f0f8fb] to-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200 relative overflow-hidden flex flex-col justify-between">
            {/* Subtle background glow effect */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-teal-200/40 via-cyan-100/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Tagline */}
              <div className="text-xs sm:text-sm font-bold text-[#087F8C] tracking-wide uppercase">
                Smarter Diagnostics. Better Health.
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#10243A] tracking-tight mt-1 leading-tight">
                Your Complete Healthcare Partner
              </h1>

              {/* Sub-Headline */}
              <div className="text-sm sm:text-base font-extrabold text-[#10243A]/90 mt-1">
                Compare. Book. Get Tested. Live Healthier.
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Access top diagnostic labs, radiology services, doctor consultations, medicines, and more — all in one place. Powered by AI. Built for you.
              </p>

              {/* 5 Floating Action Pills matching image */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => onAskAi('Help me analyze my symptoms')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs border border-slate-200 hover:border-[#087F8C] hover:text-[#087F8C] transition-all cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Analyze Symptoms</span>
                </button>

                <button
                  onClick={onScrollToSearch}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs border border-slate-200 hover:border-[#087F8C] hover:text-[#087F8C] transition-all cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Suggest Tests</span>
                </button>

                <button
                  onClick={() => onSelectServiceTab('report-explainer')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs border border-slate-200 hover:border-[#087F8C] hover:text-[#087F8C] transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Explain Results</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs border border-slate-200 hover:border-[#087F8C] hover:text-[#087F8C] transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Book Appointments</span>
                </button>

                <button
                  onClick={() => onSelectServiceTab('reminders')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs border border-slate-200 hover:border-[#087F8C] hover:text-[#087F8C] transition-all cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>Health Reminders</span>
                </button>
              </div>

              {/* Visual Doctor & Holographic AI Badge Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#10243A] via-[#087F8C] to-[#003853] text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center shrink-0">
                    <span className="text-xl">🩺</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-teal-200 uppercase tracking-wider">
                      AI KODAN · Your Health Guide
                    </div>
                    <div className="text-xs text-slate-100 font-medium">
                      Multi-Model Clinical Intelligence with Human Verification
                    </div>
                  </div>
                </div>

                {/* Multi-model provider tag */}
                <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 text-[10px] text-teal-100 flex items-center gap-2 shrink-0">
                  <span className="font-bold">Powered by:</span>
                  <span>Gemini</span>
                  <span>·</span>
                  <span>ChatGPT</span>
                  <span>·</span>
                  <span>Grok</span>
                </div>
              </div>
            </div>

            {/* 3 Main Action Buttons Matching Reference Image */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center gap-3">
              {/* Teal Button: Book a Test */}
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-2xl bg-[#087F8C] hover:bg-[#066570] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Test</span>
              </button>

              {/* White Outlined Button: Search Tests (replaced Compare Prices as requested) */}
              <button
                onClick={onScrollToSearch}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#10243A] hover:text-[#087F8C] border-2 border-slate-300 hover:border-[#087F8C] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-[#087F8C]" />
                <span>Search Tests</span>
              </button>

              {/* Dark Navy Button: Chat with AI Kodan */}
              <button
                onClick={() => onAskAi('')}
                className="px-6 py-3 rounded-2xl bg-[#10243A] hover:bg-[#087F8C] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-teal-300" />
                <span>Chat with AI Kodan</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 3: RIGHT PANEL (YOUR ALL-IN-ONE HEALTH PLATFORM)  */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-5 shadow-lg border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-sm font-extrabold text-[#10243A] tracking-tight mb-3">
                Your All-in-One Health Platform
              </h2>

              {/* 6 Circular Category Icons (2 columns x 3 rows) */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* 1. Diagnostics */}
                <button
                  onClick={() => onSelectServiceTab('diagnostics')}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-none">
                      Diagnostics
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Blood Tests</div>
                  </div>
                </button>

                {/* 2. Radiology */}
                <button
                  onClick={() => onSelectServiceTab('radiology')}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Scan className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-none">
                      Radiology
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Scans & X-Ray</div>
                  </div>
                </button>

                {/* 3. Doctor Consultation */}
                <button
                  onClick={() => onSelectServiceTab('doctors')}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-none">
                      Doctor Consultation
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Online & Clinic</div>
                  </div>
                </button>

                {/* 4. Medicines */}
                <button
                  onClick={() => onSelectServiceTab('medicines')}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-none">
                      Medicines
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Prescriptions</div>
                  </div>
                </button>

                {/* 5. Hospital Visits */}
                <button
                  onClick={() => onSelectServiceTab('doctors')}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-none">
                      Hospital Visits
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Care Centers</div>
                  </div>
                </button>

                {/* 6. Wellness & Health Packages */}
                <button
                  onClick={() => onSelectServiceTab('packages')}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-none">
                      Wellness Packages
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Full Body</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Gold Card: Premium Subscription matching image */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-amber-900 leading-none">
                    Premium Subscription
                  </div>
                  <div className="text-[10px] text-amber-800/80 mt-0.5 leading-tight">
                    Get exclusive benefits, priority booking, extra discounts & more!
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectServiceTab('vip')}
                className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#066570] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-xs"
              >
                View Plans
              </button>
            </div>

            {/* Dark Card: VIP Health Membership matching image */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#10243A] via-[#003853] to-[#10243A] text-white border border-slate-700 flex items-center justify-between gap-2 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-300/30">
                  <Zap className="w-4 h-4 text-teal-300" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white leading-none">
                    VIP Health Membership
                  </div>
                  <div className="text-[10px] text-teal-200 mt-0.5 leading-tight">
                    Exclusive access • Priority support • Special discounts
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectServiceTab('vip')}
                className="px-3 py-1.5 rounded-xl bg-[#13A879] hover:bg-[#0f8a63] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-xs"
              >
                Join Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
