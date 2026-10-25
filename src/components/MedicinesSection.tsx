import React, { useState } from 'react';
import {
  Pill,
  Search,
  UploadCloud,
  FileCheck2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Bell,
} from 'lucide-react';

interface MedicinesSectionProps {
  onOpenPrescriptionModal: () => void;
}

export const MedicinesSection: React.FC<MedicinesSectionProps> = ({
  onOpenPrescriptionModal,
}) => {
  const [search, setSearch] = useState('');
  const [refillSubmitted, setRefillSubmitted] = useState(false);
  const [patientPhone, setPatientPhone] = useState('');
  const [medicineName, setMedicineName] = useState('');

  const commonMaintenanceMeds = [
    {
      name: 'Metformin 500mg SR',
      category: 'Diabetes Maintenance',
      schedule: 'Schedule H (Rx Required)',
      typicalPack: 'Pack of 30 Tablets',
      estimatedPrice: '₹85',
      note: 'Prescription slip required by Indian Pharmacy regulations.',
    },
    {
      name: 'Thyroxine Sodium 50 mcg (Thyronorm)',
      category: 'Thyroid Supplementation',
      schedule: 'Schedule H (Rx Required)',
      typicalPack: 'Bottle of 120 Tablets',
      estimatedPrice: '₹185',
      note: 'Early morning fasting medicine.',
    },
    {
      name: 'Telmisartan 40mg',
      category: 'Hypertension Care',
      schedule: 'Schedule H (Rx Required)',
      typicalPack: 'Strip of 15 Tablets',
      estimatedPrice: '₹95',
      note: 'Blood pressure monitoring recommended.',
    },
    {
      name: 'Atorvastatin 10mg',
      category: 'Lipid Regulation',
      schedule: 'Schedule H (Rx Required)',
      typicalPack: 'Strip of 10 Tablets',
      estimatedPrice: '₹110',
      note: 'Periodic liver function checks advised.',
    },
    {
      name: 'Vitamin D3 60,000 IU Oral Solution',
      category: 'Bone & Immunity Supplement',
      schedule: 'Nutraceutical / OTC',
      typicalPack: 'Pack of 4 Shots (Weekly)',
      estimatedPrice: '₹240',
      note: 'Take with milk after meals.',
    },
    {
      name: 'Methylcobalamin 1500 mcg (B12)',
      category: 'Neurological Support',
      schedule: 'Nutraceutical / OTC',
      typicalPack: 'Strip of 15 Tablets',
      estimatedPrice: '₹190',
      note: 'For peripheral nerve tingling & numbness.',
    },
  ];

  const filteredMeds = commonMaintenanceMeds.filter(
    (m) =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleRefillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName || patientPhone.length < 10) return;
    setRefillSubmitted(true);
  };

  return (
    <section id="medicines" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#087F8C]">
              Authorized Pharmacy Care
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-1 tracking-tight">
              Prescription Medicines & Refill Reminders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Upload your doctor’s prescription for verified pharmacy fulfillment in Hyderabad. We strictly adhere to Drugs & Cosmetics Act regulations—prescription drugs are never dispensed without authentic clinician authorization.
            </p>
          </div>

          <button
            onClick={onOpenPrescriptionModal}
            className="inline-flex items-center gap-2 bg-[#087F8C] hover:bg-[#066570] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Doctor Prescription</span>
          </button>
        </div>

        {/* Regulatory Compliance Alert */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Regulatory Notice:</strong> AI KODAN does not recommend or prescribe prescription medicines based on symptoms. All Schedule H/X drugs require verification by an authorized registered pharmacist.
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold hidden md:inline">
            Drug Controller General of India (DCGI) Aligned
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verified chronic medicines (e.g. Metformin, Thyronorm, Telmisartan)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#087F8C] text-slate-800"
          />
        </div>

        {/* Medicines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredMeds.map((med, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#087F8C] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold text-[#087F8C]">
                    {med.category}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                    {med.schedule}
                  </span>
                </div>

                <h3 className="font-bold text-[#10243A] text-sm mt-2">{med.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{med.typicalPack}</p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-[#10243A] tabular-nums">
                    {med.estimatedPrice}
                  </span>
                  <span className="text-[11px] text-slate-400">Estimated MRP</span>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 italic">{med.note}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={onOpenPrescriptionModal}
                  className="w-full py-2 bg-slate-900 hover:bg-[#087F8C] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Order via Prescription Slip
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Refill Reminder Setup */}
        <div className="bg-[#F4F8FB] rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wide">
              <Bell className="w-4 h-4" />
              <span>Never Run Out of Chronic Medicines</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#10243A] mt-1">
              Set Up Monthly Prescription Refill Reminders
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              We send timely WhatsApp & SMS alerts 5 days before your maintenance tablets finish, with 1-click reorder through our authorized Hyderabad pharmacy partners.
            </p>

            {refillSubmitted ? (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Refill alert set for <strong>{medicineName}</strong>! You will receive reminder messages at +91 {patientPhone}.
                </span>
              </div>
            ) : (
              <form onSubmit={handleRefillSubmit} className="mt-4 grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="Medicine name (e.g. Thyronorm 50mcg)"
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
                />
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="10-digit WhatsApp phone"
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
                />
                <button
                  type="submit"
                  className="bg-[#10243A] hover:bg-[#087F8C] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Enable WhatsApp Refill Alert
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
