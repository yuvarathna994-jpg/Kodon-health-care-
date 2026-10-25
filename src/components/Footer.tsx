import React from 'react';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  onSelectNavTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNavTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001e33] text-slate-300 pt-12 pb-8 text-xs border-t border-[#003853]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer info columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#087F8C] flex items-center justify-center text-white shadow-xs">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white">
                  KODON <span className="text-teal-400">HEALTHCARE</span>
                </span>
                <p className="text-[10px] text-teal-200">Your Health. Our Priority.</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hyderabad's unified digital healthcare network. Access certified diagnostic labs, high-precision radiology scans, and verified phlebotomist home visits across Telangana.
            </p>
            <div className="flex items-center gap-2 text-teal-300 font-medium text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>NABL Partnered · ICMR Quality Verified</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Core Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onSelectNavTab('tests')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Pathology & Blood Tests (120+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('radiology')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Radiology & Scans (MRI, CT, USG)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('packages')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Preventive Health Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('report-explainer')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  AI Report Explainer & Trends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('doctors')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Doctor Consultations (Online / OPD)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hyderabad Hubs */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Hyderabad Service Hubs
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>Hitec City & Madhapur (500081)</li>
              <li>Gachibowli & Financial District (500032)</li>
              <li>Jubilee Hills & Banjara Hills (500033)</li>
              <li>Kukatpally & KPHB Colony (500072)</li>
              <li>Secunderabad & Begumpet (500003)</li>
              <li>Kondapur, Miyapur & Chandanagar</li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Hyderabad Contact Desk
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:8333821121"
                className="flex items-center gap-2 text-white hover:text-teal-300 transition-colors font-mono font-semibold"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>8333821121</span>
              </a>
              <a
                href="mailto:kodonhealthcare@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>kodonhealthcare@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Bar matching the reference screenshot */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          
          {/* Logo brand snippet */}
          <div className="flex items-center gap-2 text-white font-bold">
            <Heart className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
            <span>KODON HEALTHCARE</span>
            <span className="text-slate-500 font-normal">· Your Health. Our Priority.</span>
          </div>

          {/* Legal Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-400">
            <button
              onClick={() => onSelectNavTab('home')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>|</span>
            <button
              onClick={() => onSelectNavTab('home')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span>|</span>
            <a href="tel:8333821121" className="hover:text-teal-300 transition-colors">
              Contact
            </a>
            <span>|</span>
            <button
              onClick={() => onSelectNavTab('faq')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <span>|</span>
            <span className="hover:text-teal-300 cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-teal-300 cursor-pointer">Terms & Conditions</span>
            <span>|</span>
            <span className="hover:text-teal-300 cursor-pointer">Cancellation & Refund Policy</span>
            <span>|</span>
            <span className="hover:text-teal-300 cursor-pointer">Sitemap</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors text-white font-bold text-xs">
                f
              </span>
              <span className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors text-white font-bold text-xs">
                ig
              </span>
              <span className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors text-white font-bold text-xs">
                yt
              </span>
              <span className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors text-white font-bold text-xs">
                𝕏
              </span>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-xl bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
