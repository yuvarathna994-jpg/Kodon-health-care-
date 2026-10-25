import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Scan,
  Activity,
  Package,
  Clock,
  Sparkles,
  PhoneCall,
  Calendar,
  CheckCircle2,
  X,
  FileText,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { INDIVIDUAL_TESTS, HEALTH_PACKAGES } from '../data/testsData';
import { RADIOLOGY_SERVICES } from '../data/radiologyData';
import { PathologyTest, HealthPackage, RadiologyService } from '../types';

export type UnifiedItemType = 'pathology' | 'radiology' | 'package';

export interface UnifiedCatalogItem {
  id: string;
  type: UnifiedItemType;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  turnaroundTime: string;
  requirement: string;
  description: string;
  meta: string;
  rawItem: PathologyTest | RadiologyService | HealthPackage;
}

interface UnifiedTestSearchBarProps {
  onBookNow: (item: UnifiedCatalogItem) => void;
  onGetCallBack: (testName: string) => void;
  externalCategoryFilter?: string | null;
  onClearExternalFilter?: () => void;
}

export const UnifiedTestSearchBar: React.FC<UnifiedTestSearchBarProps> = ({
  onBookNow,
  onGetCallBack,
  externalCategoryFilter,
  onClearExternalFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Sync external filter if passed from organ cards
  useEffect(() => {
    if (externalCategoryFilter) {
      setActiveTab(externalCategoryFilter);
      // scroll smoothly to search bar
      const el = document.getElementById('search-catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [externalCategoryFilter]);

  // Build unified item list
  const allUnifiedItems = useMemo<UnifiedCatalogItem[]>(() => {
    const list: UnifiedCatalogItem[] = [];

    // 1. Pathology tests
    INDIVIDUAL_TESTS.forEach((test) => {
      const discount = Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100);
      list.push({
        id: test.id,
        type: 'pathology',
        name: test.name,
        category: test.category,
        categoryLabel: test.categoryLabel,
        price: test.price,
        originalPrice: test.originalPrice,
        discountPercentage: discount,
        turnaroundTime: test.turnaroundTime,
        requirement: test.fastingRequirement,
        description: test.description,
        meta: `${test.parametersCount} Parameters · ${test.sampleType}`,
        rawItem: test,
      });
    });

    // 2. Radiology scans
    RADIOLOGY_SERVICES.forEach((rad) => {
      const orig = Math.round(rad.verifiedPrice * 1.4);
      const discount = Math.round(((orig - rad.verifiedPrice) / orig) * 100);
      list.push({
        id: rad.id,
        type: 'radiology',
        name: rad.name,
        category: rad.modality.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        categoryLabel: `Radiology · ${rad.modality}`,
        price: rad.verifiedPrice,
        originalPrice: orig,
        discountPercentage: discount,
        turnaroundTime: 'Same Day Digital CD & PACS Report',
        requirement: rad.preparation,
        description: `${rad.radiationNotice} Performed with certified imaging partners across Hyderabad.`,
        meta: `Modality: ${rad.modality} · ${rad.provider}`,
        rawItem: rad,
      });
    });

    // 3. Health packages
    HEALTH_PACKAGES.forEach((pkg) => {
      list.push({
        id: pkg.id,
        type: 'package',
        name: pkg.name,
        category: 'package',
        categoryLabel: 'Preventive Health Package',
        price: pkg.price,
        originalPrice: pkg.originalPrice,
        discountPercentage: pkg.discountPercentage,
        turnaroundTime: pkg.turnaroundTime,
        requirement: pkg.fastingRequirement,
        description: pkg.description,
        meta: `${pkg.totalParameters} Vital Health Parameters Included`,
        rawItem: pkg,
      });
    });

    return list;
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Tests & Scans' },
    { id: 'pathology', label: 'Pathology Blood Tests' },
    { id: 'radiology', label: 'Radiology & Imaging Scans' },
    { id: 'package', label: 'Health Packages' },
    { id: 'fever', label: 'Fever Profile & CBC' },
    { id: 'diabetes', label: 'Diabetes & Sugar' },
    { id: 'thyroid', label: 'Thyroid' },
    { id: 'cardiac', label: 'Cardiac & Lipids' },
    { id: 'organ', label: 'Liver & Kidney' },
    { id: 'vitamins', label: 'Vitamins & Minerals' },
    { id: 'hormones', label: 'Hormones' },
    { id: 'mri', label: 'MRI Scans' },
    { id: 'ct-scan', label: 'CT Scans' },
    { id: 'ultrasound', label: 'Ultrasound' },
    { id: 'x-ray', label: 'Digital X-Ray' },
  ];

  const filteredItems = useMemo(() => {
    return allUnifiedItems.filter((item) => {
      // Type/category match
      let matchesCategory = true;
      if (activeTab === 'all') {
        matchesCategory = true;
      } else if (activeTab === 'pathology') {
        matchesCategory = item.type === 'pathology';
      } else if (activeTab === 'radiology') {
        matchesCategory = item.type === 'radiology';
      } else if (activeTab === 'package') {
        matchesCategory = item.type === 'package';
      } else {
        matchesCategory =
          item.category.includes(activeTab) ||
          item.categoryLabel.toLowerCase().includes(activeTab) ||
          item.name.toLowerCase().includes(activeTab);
      }

      // Query search match
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [allUnifiedItems, activeTab, searchQuery]);

  return (
    <section id="search-catalog-section" className="py-12 bg-[#F4F8FB] border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Highlighted Search Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#087F8C] ring-4 ring-[#087F8C]/15 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#087F8C] border border-teal-200 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search All 120+ Diagnostic Tests & Scans</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] mt-2 tracking-tight">
                Find Any Pathology Blood Test or Radiology Scan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                NABL accredited diagnostic labs & certified imaging centers across Hyderabad. Direct verified rates with phlebotomist home visits or nearby center walk-ins.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl">
              <Activity className="w-4 h-4 text-[#087F8C]" />
              <span>
                Showing <strong className="text-[#10243A]">{filteredItems.length}</strong> of{' '}
                {allUnifiedItems.length} tests & scans
              </span>
            </div>
          </div>

          {/* Highlighted Search Input Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#087F8C]" />
            </div>
            <input
              type="text"
              id="unifiedSearchBarInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by test name, organ, scan (e.g. CBC, HbA1c, Thyroid, MRI, CT Brain, Ultrasound, Vitamin D, Liver)..."
              className="w-full pl-12 sm:pl-14 pr-12 py-4 sm:py-4.5 bg-slate-50 border-2 border-[#087F8C]/50 hover:border-[#087F8C] focus:border-[#087F8C] rounded-2xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#087F8C]/20 focus:bg-white shadow-inner font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (onClearExternalFilter) onClearExternalFilter();
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-[#10243A] text-white border-[#10243A] shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {externalCategoryFilter && (
            <div className="mt-3 flex items-center gap-2 text-xs text-[#087F8C] font-semibold bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 w-fit">
              <span>Filtered by organ category: <strong>{externalCategoryFilter}</strong></span>
              <button
                onClick={() => {
                  setActiveTab('all');
                  if (onClearExternalFilter) onClearExternalFilter();
                }}
                className="underline text-[#10243A] hover:text-red-600 ml-1 cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="mt-8">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#10243A]">No exact test or scan found</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                We coordinate over 250+ specialized pathology biomarkers and multi-slice radiology scans across Hyderabad. Request a quick callback or WhatsApp your doctor's prescription.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onGetCallBack(searchQuery || 'General Diagnostic Inquiry')}
                  className="px-5 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request Instant Call Back</span>
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Show All Tests
                </button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#087F8C] hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            item.type === 'pathology'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : item.type === 'radiology'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {item.type === 'pathology'
                            ? 'Pathology Blood'
                            : item.type === 'radiology'
                            ? 'Radiology Scan'
                            : 'Health Package'}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {item.discountPercentage}% OFF
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-extrabold text-[#10243A] text-sm leading-snug group-hover:text-[#087F8C] transition-colors line-clamp-2">
                        {item.name}
                      </h3>

                      {/* Meta information */}
                      <p className="text-[11px] text-slate-500 font-medium mt-1">
                        {item.meta}
                      </p>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Requirement & TAT */}
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{item.turnaroundTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{item.requirement}</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#10243A] tabular-nums">
                          ₹{item.price}
                        </span>
                        <span className="text-xs line-through text-slate-400 tabular-nums">
                          ₹{item.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* TWO PRIMARY ACTION BUTTONS: BOOK NOW + GET CALL BACK */}
                    <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onBookNow(item)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#087F8C] hover:bg-[#076a75] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Now</span>
                      </button>

                      <button
                        onClick={() => onGetCallBack(item.name)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#10243A] hover:text-[#087F8C] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#087F8C]" />
                        <span>Get Call Back</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
