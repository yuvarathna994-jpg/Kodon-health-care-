import React, { useState } from 'react';
import { MEMBERSHIP_PLANS } from '../data/membershipsData';
import { MembershipPlan } from '../types';
import { Crown, Check, ShieldAlert, Sparkles, Phone, HelpCircle } from 'lucide-react';

interface VipMembershipSectionProps {
  onSelectPlan: (plan: MembershipPlan, billingCycle: 'monthly' | 'annual') => void;
}

export const VipMembershipSection: React.FC<VipMembershipSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="vip" className="py-16 bg-[#10243A] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>KODON Privilege Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            VIP & Premium Health Memberships
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Proactive healthcare subscriptions for individuals and families in Hyderabad with zero-fee home sample pickup, automated fasting scheduling, and diagnostic discounts.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-[#087F8C] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-amber-400/30 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isVip = plan.id === 'vip';
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const period = billingCycle === 'annual' ? '/year' : '/month';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 flex flex-col justify-between relative transition-all ${
                  isVip
                    ? 'bg-slate-900 border-2 border-amber-400/80 shadow-2xl ring-1 ring-amber-400/40'
                    : 'bg-slate-900/90 border border-slate-800'
                }`}
              >
                {isVip && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] px-4 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Most Popular for Families
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wide">
                        {plan.badge}
                      </span>
                      <h3 className="text-2xl font-extrabold text-white mt-0.5">{plan.name}</h3>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isVip ? 'bg-amber-400/20 text-amber-300' : 'bg-[#087F8C]/20 text-teal-300'
                      }`}
                    >
                      <Crown className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{plan.highlight}</p>

                  <div className="mt-5 flex items-baseline gap-1.5 pb-6 border-b border-slate-800">
                    <span className="text-4xl font-black text-white tabular-nums">₹{price}</span>
                    <span className="text-xs text-slate-400">{period}</span>
                    <span className="text-[11px] text-emerald-400 ml-2 font-semibold">
                      {billingCycle === 'annual' ? 'Billed annually' : 'Cancel anytime'}
                    </span>
                  </div>

                  {/* Benefits List */}
                  <div className="mt-6 space-y-3">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                      Included Privileges:
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {plan.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-800">
                  <button
                    onClick={() => onSelectPlan(plan, billingCycle)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                      isVip
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold'
                        : 'bg-[#087F8C] hover:bg-[#066570] text-white'
                    }`}
                  >
                    <span>Activate {plan.name}</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Transparent terms · 100% money-back guarantee within 7 days if unutilized
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Safety Disclosure */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1 text-center">
          <p className="font-semibold text-slate-300">Clinical Transparency Disclosure</p>
          <p>
            VIP or Premium membership does NOT guarantee clinical priority in hospital emergency queues or alter medical protocols. Medical decisions, scan validations, and prescriptions are determined exclusively by licensed healthcare providers.
          </p>
        </div>

      </div>
    </section>
  );
};
