import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  User,
  ChevronDown,
  Sparkles,
  Bot,
  FileText,
  Calendar,
  Activity,
  Heart,
  Stethoscope,
  X,
  Menu,
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart?: () => void;
  onOpenPrescription: () => void;
  onOpenTracker: () => void;
  onOpenAiKodan: () => void;
  onOpenDashboard: () => void;
  onOpenPdfModal: () => void;
  onSelectNavTab: (tab: string) => void;
  activeNavTab?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenPrescription,
  onOpenTracker,
  onOpenAiKodan,
  onOpenDashboard,
  onOpenPdfModal,
  onSelectNavTab,
  activeNavTab = 'home',
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#002b49] text-white shadow-md border-b border-[#003853]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo matching image */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectNavTab('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Heart / Cross icon badge */}
            <div className="w-9 h-9 rounded-xl bg-[#087F8C] flex items-center justify-center text-white shadow-sm ring-1 ring-teal-300/30 group-hover:bg-[#13A879] transition-colors">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white font-sans leading-none flex items-center gap-1">
                KODON <span className="text-teal-400 font-extrabold">HEALTHCARE</span>
              </span>
              <span className="text-[10px] text-teal-200 tracking-wide font-medium mt-1">
                Your Health. Our Priority.
              </span>
            </div>
          </a>
        </div>

        {/* Center Navigation Links matching image */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-slate-200">
          <button
            onClick={() => onSelectNavTab('home')}
            className={`transition-colors cursor-pointer py-1 ${
              activeNavTab === 'home'
                ? 'text-teal-400 border-b-2 border-teal-400 font-bold'
                : 'hover:text-teal-300'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onSelectNavTab('tests')}
            className={`transition-colors cursor-pointer py-1 ${
              activeNavTab === 'tests'
                ? 'text-teal-400 border-b-2 border-teal-400 font-bold'
                : 'hover:text-teal-300'
            }`}
          >
            Tests
          </button>

          <button
            onClick={() => onSelectNavTab('packages')}
            className={`transition-colors cursor-pointer py-1 ${
              activeNavTab === 'packages'
                ? 'text-teal-400 border-b-2 border-teal-400 font-bold'
                : 'hover:text-teal-300'
            }`}
          >
            Packages
          </button>

          <button
            onClick={() => onSelectNavTab('radiology')}
            className={`transition-colors cursor-pointer py-1 ${
              activeNavTab === 'radiology'
                ? 'text-teal-400 border-b-2 border-teal-400 font-bold'
                : 'hover:text-teal-300'
            }`}
          >
            Radiology
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('partners-strip-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onSelectNavTab('partners');
            }}
            className="hover:text-teal-300 transition-colors cursor-pointer py-1"
          >
            Partners
          </button>

          <button
            onClick={onOpenAiKodan}
            className="hover:text-teal-300 transition-colors cursor-pointer py-1 flex items-center gap-1.5 text-teal-300"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={() => onSelectNavTab('doctors')}
            className="hover:text-teal-300 transition-colors cursor-pointer py-1"
          >
            Consultation
          </button>

          <button
            onClick={onOpenTracker}
            className="hover:text-teal-300 transition-colors cursor-pointer py-1"
          >
            Bookings
          </button>

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center gap-1 hover:text-teal-300 transition-colors cursor-pointer py-1"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isMoreOpen && (
              <div
                className="absolute top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 text-slate-800 z-50 text-xs font-semibold animate-fadeIn"
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenPdfModal();
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-teal-50 hover:text-[#087F8C] flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#087F8C]" />
                  <span>All Packages PDF Directory</span>
                </button>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onSelectNavTab('report-explainer');
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-teal-50 hover:text-[#087F8C] flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#087F8C]" />
                  <span>AI Report Explainer & Trends</span>
                </button>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenPrescription();
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-teal-50 hover:text-[#087F8C] flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-[#087F8C]" />
                  <span>Upload Doctor Prescription</span>
                </button>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onSelectNavTab('medicines');
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-teal-50 hover:text-[#087F8C] flex items-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-[#087F8C]" />
                  <span>Pharmacy & Medicines</span>
                </button>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onSelectNavTab('vip');
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-teal-50 hover:text-[#087F8C] flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-amber-500 font-bold">★</span>
                  <span>VIP Health Membership</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Info Section matching image */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          
          {/* Location Hyderabad */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-medium">Hyderabad</span>
          </div>

          {/* Phone */}
          <a
            href="tel:8333821121"
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-teal-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold font-mono">8333821121</span>
          </a>

          {/* Email */}
          <a
            href="mailto:kodonhealthcare@gmail.com"
            className="hidden 2xl:flex items-center gap-1.5 text-slate-300 hover:text-teal-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-medium">kodonhealthcare@gmail.com</span>
          </a>

          {/* PDF Viewer Quick Button */}
          <button
            onClick={onOpenPdfModal}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-100 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer border border-white/10"
            title="Digital PDF of all health packages"
          >
            <FileText className="w-3.5 h-3.5 text-teal-300" />
            <span>PDF Packages</span>
          </button>

          {/* Login / Register Button matching image */}
          <button
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#087F8C] hover:bg-[#076f7a] text-white font-bold text-xs tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login / Register</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg cursor-pointer"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#001e33] border-t border-[#003853] px-4 py-4 space-y-2 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-slate-700/50 text-xs text-teal-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Hyderabad
            </span>
            <a href="tel:8333821121" className="font-mono">
              8333821121
            </a>
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSelectNavTab('home');
            }}
            className="w-full text-left py-2 font-semibold text-slate-200 hover:text-teal-400"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSelectNavTab('tests');
            }}
            className="w-full text-left py-2 font-semibold text-slate-200 hover:text-teal-400"
          >
            Tests (120+ Pathology & Radiology)
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSelectNavTab('packages');
            }}
            className="w-full text-left py-2 font-semibold text-slate-200 hover:text-teal-400"
          >
            Health Packages
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSelectNavTab('radiology');
            }}
            className="w-full text-left py-2 font-semibold text-slate-200 hover:text-teal-400"
          >
            Radiology & Scans
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenAiKodan();
            }}
            className="w-full text-left py-2 font-semibold text-teal-400 flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>AI Assistant (AI KODAN)</span>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSelectNavTab('doctors');
            }}
            className="w-full text-left py-2 font-semibold text-slate-200 hover:text-teal-400"
          >
            Doctor Consultation
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full text-left py-2 font-semibold text-slate-200 hover:text-teal-400"
          >
            Track Phlebotomist & Bookings
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenPdfModal();
            }}
            className="w-full text-left py-2 font-semibold text-teal-300 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>All Packages PDF Directory</span>
          </button>
        </div>
      )}
    </header>
  );
};
