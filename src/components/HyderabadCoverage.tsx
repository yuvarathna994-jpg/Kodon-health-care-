import React, { useState } from 'react';
import { MapPin, Navigation, Clock, CheckCircle2, Search } from 'lucide-react';
import { HYDERABAD_HUBS } from '../data/hyderabadHubs';
import { HyderabadHub } from '../types';

interface HyderabadCoverageProps {
  onSelectLocalityForBooking?: (hub: HyderabadHub) => void;
}

export const HyderabadCoverage: React.FC<HyderabadCoverageProps> = ({
  onSelectLocalityForBooking,
}) => {
  const [query, setQuery] = useState('');
  const [selectedHub, setSelectedHub] = useState<HyderabadHub>(HYDERABAD_HUBS[0]);

  const handlePincodeSearch = (val: string) => {
    setQuery(val);
    const cleaned = val.trim().toLowerCase();
    if (!cleaned) return;

    const matched = HYDERABAD_HUBS.find(
      (h) => h.pincode.includes(cleaned) || h.name.toLowerCase().includes(cleaned)
    );
    if (matched) {
      setSelectedHub(matched);
    }
  };

  return (
    <section id="coverage" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-wider text-emerald-700">
            Logistics & Cluster Network
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Hyderabad Phlebotomy Coverage Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Our medical sample collection technicians are stationed across 13 strategic cold-chain zones for rapid morning arrival.
          </p>
        </div>

        {/* Checker & Hub Details Interactive Split */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Search & Quick Locality Selector */}
          <div className="lg:col-span-7 space-y-5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => handlePincodeSearch(e.target.value)}
                placeholder="Type your Hyderabad pincode (e.g. 500081) or area name..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            <div>
              <div className="text-xs font-bold text-slate-700 mb-2.5">
                Quick Select Primary Hyderabad Zones:
              </div>
              <div className="flex flex-wrap gap-2">
                {HYDERABAD_HUBS.map((hub) => {
                  const isCurrent = selectedHub.pincode === hub.pincode;
                  return (
                    <button
                      key={hub.pincode}
                      type="button"
                      onClick={() => setSelectedHub(hub)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {hub.name.split('/')[0].trim()} ({hub.pincode})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Selected Hub Live Logistics Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                    {selectedHub.region}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {selectedHub.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Postal Code: <span className="font-semibold text-slate-800">{selectedHub.pincode}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-5 space-y-3 pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Average Technician Dispatch:
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {selectedHub.dispatchTimeMins} Minutes
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-slate-400" /> Assigned Base Station:
                  </span>
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                    {selectedHub.hubName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active Phlebotomists on Shift:
                  </span>
                  <span className="font-bold text-emerald-800 tabular-nums">
                    {selectedHub.activePhlebotomists} Specialists
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                Early morning fasting slots (6:00 AM – 10:00 AM) available for tomorrow in <span className="font-semibold text-slate-900">{selectedHub.name}</span>. Fast sample transit to central NABL processing facility under cold chain.
              </div>

              {onSelectLocalityForBooking && (
                <button
                  type="button"
                  onClick={() => onSelectLocalityForBooking(selectedHub)}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Schedule Collection in {selectedHub.name.split('/')[0]}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
