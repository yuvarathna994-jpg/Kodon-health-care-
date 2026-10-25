import React, { useState } from 'react';
import { Check, Plus, Eye, ShoppingBag, FileText } from 'lucide-react';
import { HEALTH_PACKAGES } from '../data/testsData';
import { HealthPackage } from '../types';
import { PackageDetailModal } from './PackageDetailModal';

interface PackagesSectionProps {
  onAddToCart: (pkg: HealthPackage) => void;
  onOpenPdfModal?: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onAddToCart, onOpenPdfModal }) => {
  const [inspectingPackage, setInspectingPackage] = useState<HealthPackage | null>(null);

  return (
    <section id="packages" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-wider text-emerald-700">
            Pathologist-Curated Screenings
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Full Body Health Packages
          </h2>
          <p className="text-slate-600 mt-2.5 text-sm sm:text-base leading-relaxed">
            Transparent pricing with zero hidden phlebotomy fees. Verified by senior MD pathologists with doorstep sample pickup across all Hyderabad sectors.
          </p>

          {onOpenPdfModal && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={onOpenPdfModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#087F8C] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Open All Packages in One PDF Viewer</span>
              </button>
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_PACKAGES.map((pkg) => {
            const isFeatured = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl border p-6 bg-white flex flex-col justify-between transition-shadow relative ${
                  isFeatured
                    ? 'border-emerald-600 shadow-md ring-1 ring-emerald-600/30'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Subtle category header */}
                  {pkg.badge && (
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-1">
                      {pkg.badge}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {pkg.name}
                  </h3>

                  {/* Clean unboxed metadata with separators (Anti-Slop Zero-Pill) */}
                  <div className="mt-2 text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-700">
                      {pkg.totalParameters} Parameters
                    </span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span>{pkg.fastingRequirement.replace(' Required', '')}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                      ₹{pkg.price}
                    </span>
                    <span className="text-xs line-through text-slate-400 tabular-nums">
                      ₹{pkg.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 tabular-nums">
                      {pkg.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Key Analyte Highlights */}
                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                      Highlights:
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2">
                      {pkg.categories.slice(0, 4).map((cat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cat.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => setInspectingPackage(pkg)}
                    className="w-full text-xs font-semibold text-slate-600 hover:text-[#087F8C] py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View all {pkg.totalParameters} parameters</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onAddToCart(pkg)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      isFeatured
                        ? 'bg-[#087F8C] hover:bg-[#066570] text-white shadow-md'
                        : 'bg-[#10243A] hover:bg-[#087F8C] text-white'
                    }`}
                  >
                    <span>Book Now</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <PackageDetailModal
        pkg={inspectingPackage}
        onClose={() => setInspectingPackage(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
