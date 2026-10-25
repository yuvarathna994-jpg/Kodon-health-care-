import React, { useState } from 'react';
import {
  Scan,
  Heart,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { RADIOLOGY_SERVICES } from '../data/radiologyData';
import { HEALTH_PACKAGES } from '../data/testsData';
import { RadiologyService, HealthPackage } from '../types';

interface RadiologyAndPackagesShowcaseProps {
  onBookRadiology: (service: RadiologyService) => void;
  onBookPackage: (pkg: HealthPackage) => void;
  onGetCallBack: (testName: string) => void;
  onViewAllRadiology: () => void;
}

export const RadiologyAndPackagesShowcase: React.FC<RadiologyAndPackagesShowcaseProps> = ({
  onBookRadiology,
  onBookPackage,
  onGetCallBack,
  onViewAllRadiology,
}) => {
  const [selectedPackageModal, setSelectedPackageModal] = useState<HealthPackage | null>(null);
  const [selectedRadiologyModal, setSelectedRadiologyModal] = useState<RadiologyService | null>(null);

  // 8 Radiology Scans matching screenshot
  const radiologyItems = [
    {
      id: 'rad-xray-chest',
      name: 'X-Ray',
      fullName: 'Digital Chest X-Ray (PA View)',
      icon: '🦴',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-xray-chest') || RADIOLOGY_SERVICES[0],
    },
    {
      id: 'rad-usg-abdomen',
      name: 'Ultrasound (USG)',
      fullName: 'Ultrasound Whole Abdomen & Pelvis',
      icon: '🌊',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-usg-abdomen') || RADIOLOGY_SERVICES[1],
    },
    {
      id: 'rad-ct-brain',
      name: 'CT Scan',
      fullName: 'High-Resolution 128-Slice CT Brain / Chest',
      icon: '⭕',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-ct-brain') || RADIOLOGY_SERVICES[2],
    },
    {
      id: 'rad-mri-spine',
      name: 'MRI',
      fullName: '3.0T High-Field Silent MRI Scan',
      icon: '🧲',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-mri-spine') || RADIOLOGY_SERVICES[3],
    },
    {
      id: 'rad-mammography',
      name: 'Mammography',
      fullName: 'Digital Bilateral 3D Mammography',
      icon: '🎀',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-mammography') || RADIOLOGY_SERVICES[6],
    },
    {
      id: 'rad-doppler-carotid',
      name: 'Doppler Study',
      fullName: 'Carotid & Peripheral Color Doppler',
      icon: '🩸',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-doppler-carotid') || RADIOLOGY_SERVICES[7],
    },
    {
      id: 'rad-ecg',
      name: 'ECG',
      fullName: '12-Lead Electrocardiogram',
      icon: '📈',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-ecg') || RADIOLOGY_SERVICES[5],
    },
    {
      id: 'rad-2d-echo',
      name: '2D Echo',
      fullName: '2D Echocardiography with Color Doppler',
      icon: '🫀',
      service: RADIOLOGY_SERVICES.find((s) => s.id === 'rad-2d-echo') || RADIOLOGY_SERVICES[4],
    },
  ];

  // 4 Special Health Packages matching screenshot
  const specialPackages = [
    {
      id: 'pkg-basic-checkup',
      name: 'Basic Health Checkup',
      price: 1999,
      originalPrice: 3999,
      badge: 'Family Baseline',
      icon: '🩺',
      pkg: HEALTH_PACKAGES.find((p) => p.id === 'pkg-basic-checkup') || HEALTH_PACKAGES[0],
    },
    {
      id: 'pkg-executive-checkup',
      name: 'Executive Health Checkup',
      price: 4999,
      originalPrice: 8999,
      badge: 'Executive & Comprehensive',
      icon: '💼',
      pkg: HEALTH_PACKAGES.find((p) => p.id === 'pkg-executive-checkup') || HEALTH_PACKAGES[1],
    },
    {
      id: 'pkg-heart-package',
      name: 'Heart Health Package',
      price: 7999,
      originalPrice: 12999,
      badge: 'Advanced Cardio Screen',
      icon: '❤️',
      pkg: HEALTH_PACKAGES.find((p) => p.id === 'pkg-heart-package') || HEALTH_PACKAGES[2],
    },
    {
      id: 'pkg-diabetes-care',
      name: 'Diabetes Care Package',
      price: 3499,
      originalPrice: 5999,
      badge: 'Targeted Glycemic Control',
      icon: '🩸',
      pkg: HEALTH_PACKAGES.find((p) => p.id === 'pkg-diabetes-care') || HEALTH_PACKAGES[3],
    },
  ];

  return (
    <section className="py-12 bg-[#F4F8FB] border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT: RADIOLOGY & IMAGING (6 COLS)                       */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#10243A] tracking-tight">
                    Radiology & Imaging
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Book your scan with <span className="font-semibold text-[#087F8C]">trusted partners</span> across Hyderabad
                  </p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-teal-50 text-[#087F8C] flex items-center justify-center border border-teal-200">
                  <Scan className="w-5 h-5" />
                </div>
              </div>

              {/* 8 Scan Cards (2 rows of 4) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                {radiologyItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedRadiologyModal(item.service)}
                    className="p-3 rounded-2xl bg-[#F4F8FB] hover:bg-teal-50/60 border border-slate-200 hover:border-[#087F8C] transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="text-xs font-extrabold text-[#10243A] group-hover:text-[#087F8C] mt-2 leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-teal-600 font-semibold mt-0.5">
                      From ₹{item.service.verifiedPrice}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* View All Radiology Services Button */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={onViewAllRadiology}
                className="w-full py-3 rounded-2xl bg-[#087F8C] hover:bg-[#076a75] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View All Radiology Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: SPECIAL HEALTH PACKAGES (6 COLS)                  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#10243A] tracking-tight">
                    Special Health Packages
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Complete Health Checkups for a Healthier You
                  </p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-teal-50 text-[#087F8C] flex items-center justify-center border border-teal-200">
                  <Heart className="w-5 h-5" />
                </div>
              </div>

              {/* 4 Packages Grid (2 rows of 2) matching screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                {specialPackages.map((sp) => (
                  <div
                    key={sp.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#087F8C] bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl">{sp.icon}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {Math.round(((sp.originalPrice - sp.price) / sp.originalPrice) * 100)}% OFF
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm text-[#10243A] group-hover:text-[#087F8C] transition-colors mt-2 leading-snug">
                        {sp.name}
                      </h4>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-black text-[#10243A] tabular-nums">
                          ₹{sp.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs line-through text-slate-400 tabular-nums">
                          ₹{sp.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedPackageModal(sp.pkg)}
                        className="text-xs font-bold text-[#087F8C] hover:text-[#066570] flex items-center gap-1 cursor-pointer group-hover:underline"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onBookPackage(sp.pkg)}
                        className="px-3 py-1.5 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NABL Accredited Labs · Free Doorstep Phlebotomist</span>
              </span>
              <button
                onClick={() => onGetCallBack('Special Health Packages Inquiry')}
                className="font-bold text-[#087F8C] hover:underline cursor-pointer flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Get Call Back</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Package Detail Modal */}
      {selectedPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">
                  Health Package Inclusions
                </span>
                <h3 className="text-lg font-extrabold text-[#10243A] mt-0.5">
                  {selectedPackageModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPackageModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#10243A]">
                  ₹{selectedPackageModal.price}
                </span>
                <span className="text-sm line-through text-slate-400">
                  ₹{selectedPackageModal.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {selectedPackageModal.discountPercentage}% OFF
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedPackageModal.description}
              </p>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Turnaround: {selectedPackageModal.turnaroundTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Fasting: {selectedPackageModal.fastingRequirement}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Included Parameter Categories ({selectedPackageModal.totalParameters} total)
                </div>
                {selectedPackageModal.categories.map((cat, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-xs text-[#10243A] mb-1">{cat.title}</div>
                    <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                      {cat.tests.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Book Now + Get Call Back */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onBookPackage(selectedPackageModal);
                  setSelectedPackageModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>

              <button
                onClick={() => {
                  onGetCallBack(selectedPackageModal.name);
                  setSelectedPackageModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#10243A] text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-[#087F8C]" />
                <span>Get Call Back</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Radiology Detail Modal */}
      {selectedRadiologyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">
                  Radiology & Scan Detail
                </span>
                <h3 className="text-lg font-extrabold text-[#10243A] mt-0.5">
                  {selectedRadiologyModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRadiologyModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#10243A]">
                  ₹{selectedRadiologyModal.verifiedPrice}
                </span>
                <span className="text-xs text-slate-500">Verified Center Price</span>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100 space-y-1 text-xs text-teal-900">
                <div className="font-bold">Provider: {selectedRadiologyModal.provider}</div>
                <div>Locations: {selectedRadiologyModal.locations.join(', ')}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div>
                  <strong className="text-slate-800">Preparation:</strong> {selectedRadiologyModal.preparation}
                </div>
                <div>
                  <strong className="text-slate-800">Radiation Notice:</strong> {selectedRadiologyModal.radiationNotice}
                </div>
              </div>
            </div>

            {/* Actions: Book Now + Get Call Back */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onBookRadiology(selectedRadiologyModal);
                  setSelectedRadiologyModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Scan Now</span>
              </button>

              <button
                onClick={() => {
                  onGetCallBack(selectedRadiologyModal.name);
                  setSelectedRadiologyModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#10243A] text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-[#087F8C]" />
                <span>Get Call Back</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
