import React from 'react';
import { ShieldCheck, ThermometerSnowflake, Syringe, FileCheck2 } from 'lucide-react';

export const QualityStrip: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'NABL & ICMR Labs',
      subtitle: 'Fully automated Roche & Beckman analyzers with MD pathologist validation',
    },
    {
      icon: ThermometerSnowflake,
      title: '2°C–8°C Cold Chain',
      subtitle: 'Temperature-monitored gel pack transit preserves biochemical integrity',
    },
    {
      icon: Syringe,
      title: 'Certified Phlebotomists',
      subtitle: 'Trained medical professionals using sterilized, single-use vacuum systems',
    },
    {
      icon: FileCheck2,
      title: 'Same-Day Digital Reports',
      subtitle: 'Direct PDF delivery on WhatsApp & email within 6 to 12 hours',
    },
  ];

  return (
    <section className="py-8 bg-slate-900 text-slate-300 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-700">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{pillar.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
