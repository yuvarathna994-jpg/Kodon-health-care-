import React, { useState } from 'react';
import { DIAGNOSTIC_LIBRARY } from '../data/diagnosticLibraryData';
import { DiagnosticCategoryLibraryItem, PartnerPriceOffer } from '../types';
import {
  ShieldCheck,
  Clock,
  AlertCircle,
  Eye,
  Check,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';

interface VisualTestLibraryProps {
  onBookItem: (name: string, price: number, parametersCount: number, fasting: string, partner: string) => void;
  onAskAi: (testName: string) => void;
}

export const VisualTestLibrary: React.FC<VisualTestLibraryProps> = ({ onBookItem, onAskAi }) => {
  const [selectedCategory, setSelectedCategory] = useState<DiagnosticCategoryLibraryItem | null>(null);

  // Render authentic medical SVG illustration according to type
  const renderMedicalIllustration = (iconType: string) => {
    switch (iconType) {
      case 'blood_cells':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#FEF2F2" />
            <circle cx="35" cy="40" r="16" fill="#DC2626" fillOpacity="0.85" />
            <circle cx="35" cy="40" r="8" fill="#B91C1C" />
            <circle cx="65" cy="32" r="12" fill="#EF4444" fillOpacity="0.75" />
            <circle cx="65" cy="32" r="6" fill="#DC2626" />
            <circle cx="58" cy="54" r="9" fill="#087F8C" fillOpacity="0.8" />
            <path d="M55 54H61M58 51V57" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="56" r="5" fill="#F87171" />
          </svg>
        );
      case 'glucose_meter':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#ECFDF5" />
            <rect x="30" y="15" width="40" height="52" rx="10" fill="#10243A" />
            <rect x="36" y="22" width="28" height="18" rx="4" fill="#A7F3D0" />
            <text x="50" y="35" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">98</text>
            <circle cx="50" cy="52" r="6" fill="#087F8C" />
            <path d="M50 7v8" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="7" r="2.5" fill="#DC2626" />
          </svg>
        );
      case 'hba1c_rbc':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#F0FDF4" />
            <ellipse cx="50" cy="40" rx="26" ry="18" fill="#DC2626" fillOpacity="0.85" />
            <ellipse cx="50" cy="40" rx="14" ry="9" fill="#B91C1C" />
            <circle cx="34" cy="30" r="4" fill="#FBBF24" />
            <circle cx="64" cy="32" r="4" fill="#FBBF24" />
            <circle cx="48" cy="24" r="3.5" fill="#FBBF24" />
            <circle cx="54" cy="54" r="3.5" fill="#FBBF24" />
            <circle cx="38" cy="48" r="3" fill="#FBBF24" />
          </svg>
        );
      case 'thyroid_gland':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#F5F3FF" />
            <path d="M50 20V60" stroke="#CBD5E1" strokeWidth="12" strokeLinecap="round" />
            <path d="M50 24V56" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
            <path d="M50 38C40 32 25 30 25 46C25 58 42 56 50 48C58 56 75 58 75 46C75 30 60 32 50 38Z" fill="#C084FC" fillOpacity="0.85" stroke="#9333EA" strokeWidth="1.5" />
            <ellipse cx="34" cy="44" rx="4" ry="6" fill="#A855F7" />
            <ellipse cx="66" cy="44" rx="4" ry="6" fill="#A855F7" />
          </svg>
        );
      case 'liver_anatomy':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#FFF7ED" />
            <path d="M22 36C22 25 45 22 72 26C80 28 82 42 74 54C64 62 45 60 30 54C24 50 22 44 22 36Z" fill="#EA580C" fillOpacity="0.85" />
            <path d="M56 46C56 50 50 54 44 52" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
            <circle cx="43" cy="53" r="3.5" fill="#16A34A" />
          </svg>
        );
      case 'two_kidneys':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#F0FDFA" />
            <path d="M36 28C40 28 42 34 38 42C34 50 26 52 24 44C22 36 28 28 36 28Z" fill="#991B1B" fillOpacity="0.85" />
            <path d="M64 28C60 28 58 34 62 42C66 50 74 52 76 44C78 36 72 28 64 28Z" fill="#991B1B" fillOpacity="0.85" />
            <path d="M37 42C44 48 48 55 48 65" stroke="#087F8C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M63 42C56 48 52 55 52 65" stroke="#087F8C" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'cholesterol_vessel':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#FFFBEB" />
            <rect x="15" y="28" width="70" height="24" rx="12" fill="#DC2626" fillOpacity="0.2" stroke="#DC2626" strokeWidth="2" />
            <path d="M35 29C40 36 60 36 65 29" fill="#F59E0B" />
            <path d="M40 51C45 44 55 44 60 51" fill="#F59E0B" />
            <circle cx="28" cy="40" r="4" fill="#DC2626" />
            <circle cx="72" cy="40" r="4" fill="#DC2626" />
          </svg>
        );
      case 'heart_biomarker':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#FEF2F2" />
            <path d="M50 62C50 62 26 48 26 34C26 26 32 22 38 22C44 22 48 26 50 28C52 26 56 22 62 22C68 22 74 26 74 34C74 48 50 62 50 62Z" fill="#E11D48" />
            <path d="M32 40H42L45 34L49 46L53 38L56 40H68" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'vitamin_nerve':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#EFF6FF" />
            <circle cx="50" cy="40" r="22" fill="#3B82F6" fillOpacity="0.2" />
            <path d="M50 22C50 32 35 40 50 58C65 40 50 32 50 22Z" fill="#1D4ED8" />
            <text x="50" y="44" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">B12</text>
          </svg>
        );
      case 'vitamin_bone':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#FEFCE8" />
            <circle cx="50" cy="40" r="24" fill="#FACC15" fillOpacity="0.25" />
            <path d="M34 32C32 30 32 26 35 26C38 26 40 28 42 32L58 48C60 52 62 54 65 54C68 54 68 50 66 48L50 32" stroke="#CA8A04" strokeWidth="4" strokeLinecap="round" />
            <text x="50" y="44" fill="#854D0E" fontSize="12" fontWeight="bold" textAnchor="middle">D3</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="80" rx="12" fill="#F1F5F9" />
            <rect x="36" y="24" width="28" height="32" rx="4" fill="#087F8C" fillOpacity="0.8" />
            <path d="M44 40H56M50 34V46" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <section id="diagnostics" className="py-16 bg-[#F4F8FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#087F8C]">
              Comprehensive Diagnostic Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-1 tracking-tight">
              Visual Diagnostic Test Library & Price Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Explore 17 core pathology categories with verified multi-partner pricing across Tata 1mg, Thyrocare, Healthians, and Apollo Diagnostics. Authorized 15% KODON discount applied once to base test fees.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Home Collection Charges in Hyderabad</span>
          </div>
        </div>

        {/* 17 Cards Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DIAGNOSTIC_LIBRARY.map((item) => {
            const bestOffer = item.partnerOffers[0];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#087F8C] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Visual Illustration */}
                  <div className="h-32 p-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-center">
                    <div className="w-36 h-24">
                      {renderMedicalIllustration(item.iconType)}
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Category Title */}
                    <h3 className="font-bold text-[#10243A] text-base group-hover:text-[#087F8C] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Simple explanation */}
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.simpleExplanation}
                    </p>

                    {/* Unboxed Metadata (Anti-slop) */}
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                      <span className="font-semibold text-slate-700">{item.keyParameters.length} Analytes</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="truncate max-w-[130px]">{item.preparationRequirements.split('.')[0]}</span>
                    </div>

                    {/* Pricing Block with verified 15% discount tag */}
                    {bestOffer && (
                      <div className="mt-4 p-3 bg-[#F4F8FB] rounded-xl border border-slate-200/80">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{bestOffer.partnerName}</span>
                          {bestOffer.kodonDiscountEligible && (
                            <span className="font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                              15% KODON Code
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-[#10243A] tabular-nums">
                            ₹{bestOffer.finalPayable}
                          </span>
                          <span className="text-xs line-through text-slate-400 tabular-nums">
                            ₹{bestOffer.originalPrice}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            + ₹{bestOffer.collectionCharge} Home Fee
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAskAi(`Tell me about ${item.name} and preparation requirements`)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#087F8C]" />
                    <span>Ask AI</span>
                  </button>

                  <button
                    onClick={() =>
                      onBookItem(
                        item.name,
                        bestOffer?.finalPayable || 299,
                        item.keyParameters.length,
                        item.preparationRequirements,
                        'KoDon Health Care'
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Book Now</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

