import React, { useState } from 'react';
import { RADIOLOGY_SERVICES } from '../data/radiologyData';
import { RadiologyService } from '../types';
import {
  Scan,
  MapPin,
  Calendar,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

interface RadiologySectionProps {
  onBookRadiology: (service: RadiologyService) => void;
}

export const RadiologySection: React.FC<RadiologySectionProps> = ({ onBookRadiology }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [inspectingService, setInspectingService] = useState<RadiologyService | null>(null);

  const modalities = ['All', 'CT Scan', 'MRI', 'Ultrasound', '2D Echo', 'X-Ray', 'Mammography', 'Doppler', 'ECG'];

  const filtered = RADIOLOGY_SERVICES.filter(
    (s) => selectedFilter === 'All' || s.modality === selectedFilter
  );

  return (
    <section id="radiology" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#087F8C]">
              Diagnostic Imaging
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-1 tracking-tight">
              Radiology & Advanced Imaging Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Book high-resolution scans with Sprint Diagnostics & certified imaging centers across Jubilee Hills, Madhapur, KPHB, and Secunderabad. Verified pricing with transparent radiation safety disclosures.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#F4F8FB] border border-slate-200 px-3.5 py-2 rounded-xl">
            <Scan className="w-4 h-4 text-[#087F8C]" />
            <span>3.0T MRI & 128-Slice Low-Dose CT</span>
          </div>
        </div>

        {/* Modality Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar mb-8">
          {modalities.map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedFilter(mod)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedFilter === mod
                  ? 'bg-white text-[#10243A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-[#087F8C] hover:shadow-sm transition-all flex flex-col justify-between bg-white"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-[#087F8C]">{item.modality}</span>
                  <span>{item.provider.split('&')[0]}</span>
                </div>

                <h3 className="font-bold text-[#10243A] text-sm mt-2 leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.preparation}
                </p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#10243A] tabular-nums">
                    ₹{item.verifiedPrice}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Verified Clinic Price
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.locations.slice(0, 2).join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{item.radiationNotice.split('.')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setInspectingService(item)}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  title="View full preparation instructions"
                >
                  <Info className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onBookRadiology(item)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#10243A] hover:bg-[#087F8C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Scan Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Details & Preparation Modal */}
      {inspectingService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#10243A]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectingService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-[#087F8C] uppercase tracking-wide">
                  {inspectingService.modality} Preparation Guide
                </span>
                <h3 className="text-lg font-bold text-[#10243A] mt-0.5">
                  {inspectingService.name}
                </h3>
              </div>
              <button
                onClick={() => setInspectingService(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Preparation Protocol:</div>
                <p className="text-slate-600 leading-relaxed">{inspectingService.preparation}</p>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1 text-amber-900">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Radiation & Safety Information:</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {inspectingService.radiationNotice}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Available Hyderabad Centers:</div>
                <div className="flex flex-wrap gap-1.5">
                  {inspectingService.locations.map((loc, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Verified Center Fee</div>
                  <div className="text-lg font-extrabold text-[#10243A] tabular-nums">
                    ₹{inspectingService.verifiedPrice}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onBookRadiology(inspectingService);
                    setInspectingService(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Book Radiology Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
