import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ExploreDiagnosticCardsProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const ExploreDiagnosticCards: React.FC<ExploreDiagnosticCardsProps> = ({
  onSelectCategory,
}) => {
  const cards = [
    {
      id: 'fever',
      title: 'Complete Blood Count (CBC)',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#FEE2E2" />
          <circle cx="30" cy="38" r="14" fill="#DC2626" fillOpacity="0.85" />
          <circle cx="30" cy="38" r="7" fill="#991B1B" />
          <circle cx="52" cy="32" r="10" fill="#EF4444" fillOpacity="0.75" />
          <circle cx="52" cy="32" r="5" fill="#B91C1C" />
          <circle cx="48" cy="52" r="8" fill="#087F8C" fillOpacity="0.8" />
          <path d="M45 52H51M48 49V55" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'diabetes',
      title: 'Diabetes & Glucose',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#ECFDF5" />
          <rect x="24" y="16" width="32" height="46" rx="8" fill="#10243A" />
          <rect x="29" y="22" width="22" height="15" rx="3" fill="#A7F3D0" />
          <text x="40" y="33" fill="#065F46" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">98</text>
          <circle cx="40" cy="48" r="5" fill="#087F8C" />
          <circle cx="40" cy="11" r="2.5" fill="#DC2626" />
        </svg>
      ),
    },
    {
      id: 'thyroid',
      title: 'Thyroid Profile',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#F5F3FF" />
          <path d="M40 18V62" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
          <path d="M40 34C32 28 20 28 20 42C20 52 34 50 40 44C46 50 60 52 60 42C60 28 48 28 40 34Z" fill="#C084FC" fillOpacity="0.85" stroke="#9333EA" strokeWidth="1.5" />
          <ellipse cx="27" cy="40" rx="3" ry="5" fill="#A855F7" />
          <ellipse cx="53" cy="40" rx="3" ry="5" fill="#A855F7" />
        </svg>
      ),
    },
    {
      id: 'organ',
      title: 'Liver Function',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#FFF7ED" />
          <path d="M18 36C18 25 38 22 62 26C68 28 70 42 62 52C54 60 38 58 24 52C20 48 18 42 18 36Z" fill="#EA580C" fillOpacity="0.85" />
          <path d="M48 44C48 48 42 52 38 50" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="36" cy="50" r="3" fill="#16A34A" />
        </svg>
      ),
    },
    {
      id: 'organ',
      title: 'Kidney Function',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#F0FDFA" />
          <path d="M28 28C32 28 34 34 30 42C26 50 18 52 16 44C14 36 20 28 28 28Z" fill="#991B1B" fillOpacity="0.85" />
          <path d="M52 28C48 28 46 34 50 42C54 50 62 52 64 44C66 36 60 28 52 28Z" fill="#991B1B" fillOpacity="0.85" />
          <path d="M30 42C35 48 38 54 38 62" stroke="#087F8C" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M50 42C45 48 42 54 42 62" stroke="#087F8C" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      id: 'cardiac',
      title: 'Lipid Profile',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#FFFBEB" />
          <rect x="18" y="28" width="44" height="24" rx="12" fill="#FDE047" fillOpacity="0.8" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="32" cy="40" r="6" fill="#EA580C" />
          <circle cx="46" cy="40" r="8" fill="#DC2626" />
          <circle cx="46" cy="40" r="4" fill="#991B1B" />
        </svg>
      ),
    },
    {
      id: 'vitamins',
      title: 'Vitamin & Minerals',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
          <circle cx="34" cy="34" r="14" fill="#3B82F6" fillOpacity="0.8" />
          <text x="34" y="38" fill="white" fontSize="11" fontWeight="black" textAnchor="middle">D3</text>
          <circle cx="50" cy="46" r="13" fill="#10B981" fillOpacity="0.85" />
          <text x="50" y="50" fill="white" fontSize="9" fontWeight="black" textAnchor="middle">B12</text>
        </svg>
      ),
    },
    {
      id: 'hormones',
      title: 'Hormonal Tests',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#FDF2F8" />
          <circle cx="34" cy="36" r="8" fill="#EC4899" fillOpacity="0.8" />
          <circle cx="50" cy="32" r="6" fill="#8B5CF6" fillOpacity="0.8" />
          <circle cx="44" cy="48" r="7" fill="#087F8C" fillOpacity="0.8" />
          <path d="M34 36L50 32M50 32L44 48M44 48L34 36" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      id: 'fever',
      title: 'Fever Profile',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#FEF2F2" />
          <path d="M32 20H48V46C52 49 54 54 52 59C50 64 45 67 40 67C35 67 30 64 28 59C26 54 28 49 32 46V20Z" fill="#EF4444" fillOpacity="0.85" />
          <circle cx="40" cy="57" r="7" fill="#B91C1C" />
          <rect x="38" y="26" width="4" height="26" fill="#FEE2E2" />
        </svg>
      ),
    },
    {
      id: 'package',
      title: 'Preventive Health Checkups',
      illustration: (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#F0FDFA" />
          <path d="M40 18L58 26V42C58 53 50 61 40 64C30 61 22 53 22 42V26L40 18Z" fill="#087F8C" fillOpacity="0.85" />
          <path d="M35 41L39 45L46 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#10243A] tracking-tight">
              Explore Our Diagnostic Tests
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select an organ system or medical category to filter verified tests and book immediate home collection:
            </p>
          </div>
        </div>

        {/* 10-Item Grid matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#087F8C] hover:shadow-md transition-all flex flex-col items-center text-center justify-between group"
            >
              <div className="w-12 h-12 mb-2 group-hover:scale-105 transition-transform flex items-center justify-center">
                {c.illustration}
              </div>

              <div className="text-xs font-bold text-[#10243A] group-hover:text-[#087F8C] leading-snug line-clamp-2 min-h-[32px] flex items-center justify-center">
                {c.title}
              </div>

              <button
                onClick={() => onSelectCategory(c.id)}
                className="mt-2.5 text-[11px] font-bold text-[#087F8C] hover:text-[#066570] flex items-center gap-1 group-hover:underline cursor-pointer"
              >
                <span>View Tests</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
