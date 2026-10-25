import React, { useState } from 'react';
import { VERIFIED_DOCTORS, HYDERABAD_HOSPITALS } from '../data/doctorsData';
import { DoctorProfile } from '../types';
import {
  Stethoscope,
  Video,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  AlertTriangle,
  Search,
  Filter,
} from 'lucide-react';

interface DoctorConsultationSectionProps {
  onBookConsultation: (doctor: DoctorProfile, mode: 'teleconsult' | 'in_person') => void;
}

export const DoctorConsultationSection: React.FC<DoctorConsultationSectionProps> = ({
  onBookConsultation,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'doctors' | 'hospitals'>('doctors');

  const specialties = [
    'All',
    'Internal Medicine & Diabetology',
    'Endocrinology & Thyroid Specialist',
    'Interventional Cardiology',
    'Obstetrics & Women’s Health',
    'Nephrology & Renal Care',
  ];

  const filteredDoctors = VERIFIED_DOCTORS.filter((doc) => {
    const matchesSpec = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const q = searchQuery.toLowerCase().trim();
    const matchesQ =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.hospitalAffiliation.toLowerCase().includes(q) ||
      doc.location.toLowerCase().includes(q);
    return matchesSpec && matchesQ;
  });

  return (
    <section id="doctors" className="py-16 bg-[#F4F8FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#087F8C]">
              Clinical Telehealth & Hospital Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-1 tracking-tight">
              Doctor Consultations & Hospital Visits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Connect with verified senior physicians and specialists across Hyderabad. Schedule confidential video teleconsultations or request in-person priority hospital OPD slots.
            </p>
          </div>

          {/* Toggle Doctors vs Hospitals */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Verified Doctors ({VERIFIED_DOCTORS.length})
            </button>
            <button
              onClick={() => setActiveTab('hospitals')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'hospitals'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hyderabad Hospitals ({HYDERABAD_HOSPITALS.length})
            </button>
          </div>
        </div>

        {/* Urgent Emergency Warning Banner */}
        <div className="mb-8 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Emergency Care Notice:</strong> If you are experiencing sudden chest pressure, acute shortness of breath, loss of speech, or severe injury, do not wait for an online appointment. Call 108 or visit an emergency room immediately.
            </span>
          </div>
          <a
            href="tel:108"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-xs shrink-0 hover:bg-rose-700"
          >
            <Phone className="w-3 h-3" />
            <span>108 Helpline</span>
          </a>
        </div>

        {activeTab === 'doctors' ? (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctor by name, specialty, or hospital (e.g. Diabetology, AIG, Care)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
                />
              </div>

              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-white rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 cursor-pointer"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#087F8C] hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#087F8C] uppercase tracking-wide">
                          {doc.specialty}
                        </span>
                        <h3 className="font-extrabold text-base text-[#10243A] mt-0.5">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{doc.qualification}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#087F8C] flex items-center justify-center font-bold text-xs shrink-0">
                        {doc.experienceYears}y+
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Reg. Number:</span>
                        <span className="font-mono font-semibold text-slate-800">{doc.registrationNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Affiliation:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                          {doc.hospitalAffiliation}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Languages:</span>
                        <span>{doc.languages.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Next Slot:
                        </span>
                        <span>{doc.nextAvailableSlot}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onBookConsultation(doc, 'teleconsult')}
                        className="py-2.5 px-3 rounded-xl bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Video (₹{doc.teleconsultationFee})</span>
                      </button>

                      <button
                        onClick={() => onBookConsultation(doc, 'in_person')}
                        className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>In-Person (₹{doc.inPersonFee})</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400">
                      Doctor verifies lab investigations & provides valid digital prescription
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Hyderabad Partner Hospitals Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HYDERABAD_HOSPITALS.map((hosp) => (
              <div
                key={hosp.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#087F8C] hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {hosp.accreditation}
                    </span>
                    <Building2 className="w-5 h-5 text-[#087F8C]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#10243A] mt-3">
                    {hosp.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{hosp.location}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-2">
                      Key Centers of Excellence:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {hosp.specialties.map((spec, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{hosp.phone}</span>
                  <a
                    href={`tel:${hosp.phone.replace(/\s/g, '')}`}
                    className="px-4 py-2 bg-[#10243A] hover:bg-[#087F8C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    OPD Desk Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
