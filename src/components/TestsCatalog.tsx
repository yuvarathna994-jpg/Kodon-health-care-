import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { INDIVIDUAL_TESTS } from '../data/testsData';
import { PathologyTest } from '../types';

interface TestsCatalogProps {
  onAddTest: (test: PathologyTest) => void;
  addedTestIds: string[];
}

export const TestsCatalog: React.FC<TestsCatalogProps> = ({ onAddTest, addedTestIds }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tests' },
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'thyroid', label: 'Thyroid' },
    { id: 'vitamins', label: 'Vitamins' },
    { id: 'fever', label: 'Fever & Infection' },
    { id: 'organ', label: 'Liver & Kidney' },
    { id: 'cardiac', label: 'Cardiac Health' },
    { id: 'allergy', label: 'Allergy' },
  ];

  const filteredTests = useMemo(() => {
    return INDIVIDUAL_TESTS.filter((test) => {
      const matchesCategory =
        selectedCategory === 'all' || test.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        test.name.toLowerCase().includes(q) ||
        test.description.toLowerCase().includes(q) ||
        test.parametersSummary.toLowerCase().includes(q) ||
        test.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="tests" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-emerald-700">
              Diagnostic Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Individual Pathology Tests
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Book targeted blood panels with same-day digital processing. Single-use sterile vacuum venipuncture kits.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="testCatalogSearchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests (e.g. Thyroid, HbA1c, CBC, Dengue)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-xs text-slate-900"
            />
          </div>
        </div>

        {/* Category Segmented Control (Anti-Slop Functional Tab Buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto mb-8 max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No matching test found</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We process over 150+ specialized pathology parameters in Hyderabad. Send your doctor's prescription or test inquiry to our phlebotomy coordinator on WhatsApp.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hi%20KoDon%20Health%20Care,%20I%20am%20looking%20for%20a%20specific%20blood%20test%20in%20Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire on WhatsApp (+91 98765 43210)</span>
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTests.map((test) => {
              const isAdded = addedTestIds.includes(test.id);
              return (
                <div
                  key={test.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-600/40 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Unboxed metadata line */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{test.fastingRequirement}</span>
                      <span aria-hidden="true">·</span>
                      <span>{test.turnaroundTime}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mt-2 leading-snug line-clamp-2">
                      {test.name}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {test.description}
                    </p>

                    <div className="text-[11px] text-slate-400 mt-2">
                      Includes: {test.parametersSummary}
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900 tabular-nums">
                        ₹{test.price}
                      </span>
                      <span className="text-xs line-through text-slate-400 tabular-nums">
                        ₹{test.originalPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddTest(test)}
                    className="mt-4 w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-[#087F8C] hover:bg-[#066570] text-white shadow-xs"
                  >
                    <span>Book Now</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
