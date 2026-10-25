import React from 'react';
import {
  ShieldCheck,
  Percent,
  Home,
  Bot,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';

interface PartnersAndWhySectionProps {
  onOpenBooking: () => void;
  onAskAi: (prompt: string) => void;
}

export const PartnersAndWhySection: React.FC<PartnersAndWhySectionProps> = ({
  onOpenBooking,
  onAskAi,
}) => {
  const partners = [
    {
      name: 'TATA 1mg',
      tagline: 'Reliable Diagnostics',
      badge: 'NABL Certified',
      logoText: 'TATA 1mg',
      color: 'text-rose-600',
    },
    {
      name: 'Thyrocare',
      tagline: 'Tests you can trust',
      badge: 'CAP & NABL Accredited',
      logoText: 'Thyrocare',
      color: 'text-red-700',
    },
    {
      name: 'Healthians',
      tagline: 'Personalized Health',
      badge: 'Cold-Chain Assured',
      logoText: 'Healthians',
      color: 'text-teal-600',
    },
    {
      name: 'Apollo Diagnostics',
      tagline: 'Accurate. Trusted.',
      badge: 'Clinical Excellence',
      logoText: 'Apollo Diagnostics',
      color: 'text-blue-700',
    },
    {
      name: 'Sprint Diagnostics',
      tagline: 'Advanced Imaging & More',
      badge: '3.0T MRI & 128 Slice CT',
      logoText: 'SPRINT Diagnostics',
      color: 'text-cyan-700',
    },
    {
      name: 'Lupin Diagnostics',
      tagline: 'Pan-India Laboratory Network',
      badge: '100% Quality Assured',
      logoText: 'Lupin Diagnostics',
      color: 'text-emerald-700',
    },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Verified Quality',
      subtitle: 'Across top labs & partners',
    },
    {
      icon: Percent,
      title: 'Extra 15% Discount',
      subtitle: 'On eligible tests & packages',
    },
    {
      icon: Home,
      title: 'Home Sample Collection',
      subtitle: 'Convenient & safe doorstep service',
    },
    {
      icon: Bot,
      title: 'AI Health Assistant',
      subtitle: 'Personalized guidance 24/7',
    },
    {
      icon: CheckCircle2,
      title: 'Verified Partners',
      subtitle: 'Trusted & authorized centers',
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      subtitle: 'In minutes with no hidden fees',
    },
  ];

  return (
    <section id="partners-strip-section" className="py-10 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Our Trusted Diagnostic Partners */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#10243A] tracking-tight">
                Our Trusted Diagnostic Partners
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Work with the best. Trusted quality for your health and accurate clinical reports:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#087F8C] bg-white hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`font-black text-base sm:text-lg tracking-tight ${p.color}`}>
                    {p.logoText}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-1">
                    {p.tagline}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{p.badge}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Why Choose KODON Healthcare + Get in Touch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Why Choose KODON Healthcare? (8 cols) */}
          <div className="lg:col-span-8 bg-[#F4F8FB] rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">
                Excellence in Healthcare Delivery
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#10243A] tracking-tight mt-1 mb-6">
                Why Choose KODON Healthcare?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3.5 hover:border-[#087F8C] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#087F8C]/10 text-[#087F8C] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#10243A] leading-snug">
                          {b.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {b.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span>Standardized NABL quality control across all Hyderabad zones.</span>
              <button
                onClick={onOpenBooking}
                className="font-bold text-[#087F8C] hover:underline cursor-pointer"
              >
                Schedule Doorstep Sample Collection →
              </button>
            </div>
          </div>

          {/* Get in Touch (4 cols) matching reference image */}
          <div className="lg:col-span-4 bg-[#10243A] text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Immediate Assistance
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1 mb-4">
                Get in Touch
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Have questions about tests, fasting rules, or appointment slots? Our Hyderabad coordination desk is ready to assist.
              </p>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <a
                  href="tel:8333821121"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Direct Call / Helpline</div>
                    <div className="text-sm font-bold font-mono text-white">8333821121</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:kodonhealthcare@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Official Healthcare Email</div>
                    <div className="text-xs font-semibold text-white">kodonhealthcare@gmail.com</div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Operational Hub</div>
                    <div className="text-xs font-semibold text-white">Hyderabad, Telangana, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Us Button matching image */}
            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <a
                href="https://wa.me/918333821121?text=Hi%20KODON%20HEALTHCARE,%20I%20would%20like%20to%20inquire%20about%20diagnostic%20tests%20and%20booking"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-[#13A879] hover:bg-[#0f8c64] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
