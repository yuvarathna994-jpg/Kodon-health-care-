import React from 'react';
import { Calendar, Syringe, FileText, CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select Tests or Upload Rx',
      desc: 'Choose from 120+ diagnostic parameters or upload doctor prescription for our medical team to decode.',
      icon: CheckCircle,
    },
    {
      num: '02',
      title: 'Choose Hyderabad Slot',
      desc: 'Pick your preferred date and morning fasting slot (from 6:00 AM) to ensure accurate biochemical baselines.',
      icon: Calendar,
    },
    {
      num: '03',
      title: 'Painless Home Collection',
      desc: 'A certified, vaccinated phlebotomist unseals single-use vacuum vials right before your eyes with strict sterile hygiene.',
      icon: Syringe,
    },
    {
      num: '04',
      title: 'Digital PDF on WhatsApp',
      desc: 'Samples are routed via ice-cooled transit to NABL labs. Encrypted PDF report delivered to your phone in 6-12 hours.',
      icon: FileText,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-wider text-emerald-700">
            Care Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            How Home Sample Collection Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Designed for clinical accuracy, maximum patient comfort, and seamless turnaround.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
