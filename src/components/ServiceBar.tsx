import React from 'react';
import {
  Activity,
  FileSearch,
  Scan,
  Stethoscope,
  Pill,
  Building2,
  Home,
  ShieldAlert,
  Crown,
  BellRing,
} from 'lucide-react';

export type ServiceTab =
  | 'diagnostics'
  | 'report-explainer'
  | 'radiology'
  | 'doctors'
  | 'medicines'
  | 'hospitals'
  | 'home-collection'
  | 'packages'
  | 'vip'
  | 'reminders';

interface ServiceBarProps {
  activeTab: ServiceTab;
  onSelectTab: (tab: ServiceTab) => void;
}

export const ServiceBar: React.FC<ServiceBarProps> = ({ activeTab, onSelectTab }) => {
  const services: { id: ServiceTab; label: string; icon: React.ElementType; tag?: string }[] = [
    { id: 'diagnostics', label: 'Diagnostics', icon: Activity },
    { id: 'report-explainer', label: 'Test Results AI', icon: FileSearch, tag: 'AI' },
    { id: 'radiology', label: 'Radiology', icon: Scan },
    { id: 'doctors', label: 'Doctor Consult', icon: Stethoscope },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'hospitals', label: 'Hospital Visits', icon: Building2 },
    { id: 'home-collection', label: 'Home Collection', icon: Home },
    { id: 'packages', label: 'Health Packages', icon: ShieldAlert },
    { id: 'vip', label: 'VIP Membership', icon: Crown, tag: 'VIP' },
    { id: 'reminders', label: 'Health Reminders', icon: BellRing },
  ];

  return (
    <div className="bg-[#10243A] border-y border-slate-800 sticky top-18 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          role="tablist"
          aria-label="KODON Healthcare Services"
          className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {services.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#087F8C] text-white shadow-sm ring-1 ring-teal-300/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#087F8C]'}`} />
                <span>{item.label}</span>
                {item.tag && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.tag === 'VIP'
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
