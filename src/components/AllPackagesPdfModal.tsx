import React, { useRef } from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { HEALTH_PACKAGES } from '../data/testsData';
import { HealthPackage } from '../types';

interface AllPackagesPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackageForBooking?: (pkg: HealthPackage) => void;
}

export const AllPackagesPdfModal: React.FC<AllPackagesPdfModalProps> = ({
  isOpen,
  onClose,
  onSelectPackageForBooking,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* PDF Toolbar */}
        <div className="bg-[#10243A] text-white px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
                <span>KoDon Clinical Formulary & Package Directory</span>
                <span className="hidden sm:inline text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  v2026.10-HYD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Interactive Medical PDF View · All 4 Packages & Parameter Breakdowns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087F8C] hover:bg-[#066570] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close PDF Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Document Container (Stylized Medical Laboratory Document) */}
        <div
          ref={printRef}
          className="p-6 sm:p-10 overflow-y-auto bg-slate-50 text-slate-800 space-y-8 font-sans print:p-0 print:bg-white"
        >
          {/* Printable Document Paper */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 print:border-none print:shadow-none space-y-8">
            
            {/* Document Clinical Header */}
            <div className="border-b-2 border-[#10243A] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 text-2xl font-black text-[#10243A] tracking-tight">
                  <span className="w-9 h-9 rounded-lg bg-[#087F8C] flex items-center justify-center text-white text-lg font-black">
                    K
                  </span>
                  <span>KODON HEALTHCARE</span>
                </div>
                <div className="text-xs font-semibold text-[#087F8C] mt-1">
                  National Pathology & Doorstep Diagnostic Services Network
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Accreditation: NABL Partnered · ICMR Certified · Lupin Diagnostics Co-Network
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Hyderabad Central Hub</div>
                <div className="flex items-center sm:justify-end gap-1.5 text-[11px]">
                  <Phone className="w-3 h-3 text-[#087F8C]" />
                  <span>+91 83338 21121</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5 text-[11px]">
                  <Mail className="w-3 h-3 text-[#087F8C]" />
                  <span>kodonhealthcare@gmail.com</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5 text-[11px]">
                  <MapPin className="w-3 h-3 text-[#087F8C]" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="bg-slate-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h1 className="text-base sm:text-lg font-bold text-[#10243A]">
                  Official Pathology Health Packages Directory & Parameter Formulary
                </h1>
                <p className="text-xs text-slate-600">
                  Effective Oct 2026 · Standardized Diagnostic Fasting & Specimen Collection Protocols
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-lg">
                100% Free Doorstep Collection in Hyderabad
              </div>
            </div>

            {/* Side-by-Side Comparison Matrix of all 4 Packages */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                1. Comprehensive Package Comparison Summary
              </h2>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#10243A] text-white">
                    <tr>
                      <th className="p-3 font-bold">Package Name</th>
                      <th className="p-3 font-bold text-center">Parameters</th>
                      <th className="p-3 font-bold">Recommended For</th>
                      <th className="p-3 font-bold text-center">Fasting Req.</th>
                      <th className="p-3 font-bold text-center">TAT</th>
                      <th className="p-3 font-bold text-right">Package Price</th>
                      <th className="p-3 font-bold text-center print:hidden">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {HEALTH_PACKAGES.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">
                          <div>{pkg.name}</div>
                          {pkg.badge && (
                            <span className="text-[10px] font-semibold text-emerald-700">
                              {pkg.badge}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold text-[#087F8C]">
                          {pkg.totalParameters}
                        </td>
                        <td className="p-3 text-slate-600 max-w-xs">{pkg.recommendedFor}</td>
                        <td className="p-3 text-center text-slate-600">
                          {pkg.fastingRequirement.replace(' Required', '')}
                        </td>
                        <td className="p-3 text-center text-slate-600">{pkg.turnaroundTime}</td>
                        <td className="p-3 text-right">
                          <span className="text-sm font-black text-slate-900 tabular-nums">
                            ₹{pkg.price}
                          </span>
                          <div className="text-[10px] line-through text-slate-400">
                            ₹{pkg.originalPrice}
                          </div>
                        </td>
                        <td className="p-3 text-center print:hidden">
                          {onSelectPackageForBooking && (
                            <button
                              onClick={() => {
                                onSelectPackageForBooking(pkg);
                                onClose();
                              }}
                              className="px-2.5 py-1.5 bg-[#087F8C] hover:bg-[#066570] text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Select</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Parameter Breakdowns for each package */}
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. Detailed Clinical Parameter Inventories
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {HEALTH_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-base text-[#10243A]">{pkg.name}</h3>
                        <p className="text-xs text-slate-500">{pkg.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-black text-[#087F8C]">₹{pkg.price}</span>
                        <div className="text-[10px] text-emerald-700 font-bold">
                          {pkg.totalParameters} Tests
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {pkg.categories.map((cat, idx) => (
                        <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="text-xs font-bold text-[#10243A] flex items-center gap-1.5 mb-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{cat.title}</span>
                          </div>
                          <ul className="text-[11px] text-slate-600 space-y-1 pl-5 list-disc leading-relaxed">
                            {cat.tests.map((testItem, tIdx) => (
                              <li key={tIdx}>{testItem}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Comparative Pricing Benchmark */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                3. Hyderabad Accredited Laboratory Rate Benchmarks
              </h2>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-800">
                    <tr>
                      <th className="p-3 font-bold">Diagnostic Provider</th>
                      <th className="p-3 font-bold">Accreditation</th>
                      <th className="p-3 font-bold text-center">Doorstep Fee</th>
                      <th className="p-3 font-bold text-right">Platinum Full Body</th>
                      <th className="p-3 font-bold text-right">HbA1c Test</th>
                      <th className="p-3 font-bold text-right">Lipid Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-emerald-50/50 font-semibold">
                      <td className="p-3 text-emerald-900 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        KoDon Health Care
                      </td>
                      <td className="p-3 text-emerald-800">NABL & ICMR Partnered</td>
                      <td className="p-3 text-center text-emerald-700 font-bold">FREE (₹0)</td>
                      <td className="p-3 text-right font-black text-emerald-900">₹1,499</td>
                      <td className="p-3 text-right font-black text-emerald-900">₹297</td>
                      <td className="p-3 text-right font-black text-emerald-900">₹382</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Lupin Diagnostics</td>
                      <td className="p-3 text-slate-600">CAP & NABL Accredited</td>
                      <td className="p-3 text-center text-slate-600">₹100</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹1,799</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹470</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹580</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Tata 1mg</td>
                      <td className="p-3 text-slate-600">NABL Certified</td>
                      <td className="p-3 text-center text-slate-600">₹100</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹1,899</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹499</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹599</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Apollo Diagnostics</td>
                      <td className="p-3 text-slate-600">NABL Accredited</td>
                      <td className="p-3 text-center text-slate-600">₹200</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹2,400</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹700</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹750</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Thyrocare Technologies</td>
                      <td className="p-3 text-slate-600">CAP & NABL</td>
                      <td className="p-3 text-center text-slate-600">₹150</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹1,750</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹480</td>
                      <td className="p-3 text-right font-bold text-slate-800">₹570</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Specimen Collection Protocols & Fasting Guidelines */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                4. Phlebotomy & Specimen Integrity Standards
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div>
                  <div className="font-bold text-slate-800">Fasting Protocol</div>
                  <p className="mt-1 leading-relaxed">
                    10-12 hours overnight fasting required for glucose and lipid markers. Plain water is strongly recommended to facilitate smooth venipuncture.
                  </p>
                </div>
                <div>
                  <div className="font-bold text-slate-800">Sterile Vacuum Tubes</div>
                  <p className="mt-1 leading-relaxed">
                    Samples drawn into K2-EDTA (Purple), SST Gel (Gold/Yellow), and Sodium Fluoride (Grey) vacuum tubes opened directly before patient.
                  </p>
                </div>
                <div>
                  <div className="font-bold text-slate-800">Cold-Chain Assurance</div>
                  <p className="mt-1 leading-relaxed">
                    Insulated temperature-logged transport maintained between 2°C and 8°C directly to NABL testing facilities across Hyderabad.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">
                KODON HEALTHCARE · Hyderabad Doorstep Diagnostics & Teleconsultation
              </div>
              <div>
                Helpline: +91 83338 21121 · Email: kodonhealthcare@gmail.com · All rights reserved © 2026
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
