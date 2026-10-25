import React from 'react';
import { X, Check, Clock, AlertCircle, ShoppingBag } from 'lucide-react';
import { HealthPackage } from '../types';

interface PackageDetailModalProps {
  pkg: HealthPackage | null;
  onClose: () => void;
  onAddToCart: (pkg: HealthPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onAddToCart,
}) => {
  if (!pkg) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 relative border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-emerald-700">
              {pkg.totalParameters} Clinical Parameters Covered
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {pkg.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {pkg.recommendedFor}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preparation & Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
            <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">{pkg.fastingRequirement}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-700 font-medium">Digital Report: {pkg.turnaroundTime}</span>
          </div>
        </div>

        {/* Parameters Categorized List */}
        <div className="py-4 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Test Breakdown & Analyte Groups:
          </div>
          <div className="space-y-4">
            {pkg.categories.map((cat, idx) => (
              <div key={idx} className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-900 mb-2">{cat.title}</h4>
                <ul className="space-y-1.5">
                  {cat.tests.map((testName, tIdx) => (
                    <li key={tIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{testName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer / Add to Cart CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              ₹{pkg.price}
            </span>
            <span className="text-sm line-through text-slate-400 tabular-nums">
              ₹{pkg.originalPrice}
            </span>
            <span className="text-xs font-bold text-emerald-700">
              Save {pkg.discountPercentage}%
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                onAddToCart(pkg);
                onClose();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Package to Tray</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
