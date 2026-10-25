import React, { useState } from 'react';
import { BookingSubmission } from '../types';
import {
  User,
  Calendar,
  FileText,
  Clock,
  Crown,
  Download,
  Shield,
  Trash2,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  TrendingUp,
} from 'lucide-react';
import { HealthTrendsTracker } from './HealthTrendsTracker';

interface CustomerDashboardProps {
  recentBookings: BookingSubmission[];
  onOpenBooking: () => void;
  onNavigateTab: (tab: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  recentBookings,
  onOpenBooking,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'reports' | 'trends' | 'family' | 'membership'>('bookings');
  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: 'Self (Primary)', relation: 'Primary', age: 34, gender: 'Male' },
    { id: '2', name: 'Radha (Spouse)', relation: 'Spouse', age: 31, gender: 'Female' },
    { id: '3', name: 'K. Subba Rao (Father)', relation: 'Father', age: 66, gender: 'Male' },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Mother');

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    setFamilyMembers([
      ...familyMembers,
      {
        id: Date.now().toString(),
        name: newMemberName.trim(),
        relation: newMemberRelation,
        age: 62,
        gender: newMemberRelation === 'Mother' ? 'Female' : 'Male',
      },
    ]);
    setNewMemberName('');
  };

  return (
    <div className="bg-[#F4F8FB] py-12 border-b border-slate-200 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Card Header */}
        <div className="bg-[#10243A] text-white p-6 sm:p-8 rounded-3xl shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#087F8C] to-[#13A879] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">K. Sravan Reddy</h2>
                <span className="text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-300" />
                  <span>KODON VIP Member</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                +91 98480 12345 · Madhapur, Hyderabad · Member since Oct 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="flex-1 sm:flex-initial bg-[#087F8C] hover:bg-[#066570] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule New Test</span>
            </button>
          </div>
        </div>

        {/* Dashboard Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeSubTab === 'bookings'
                ? 'bg-[#10243A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white'
            }`}
          >
            My Bookings ({recentBookings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('reports')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeSubTab === 'reports'
                ? 'bg-[#10243A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white'
            }`}
          >
            Digital Reports (3)
          </button>
          <button
            onClick={() => setActiveSubTab('trends')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeSubTab === 'trends'
                ? 'bg-[#087F8C] text-white shadow-xs'
                : 'text-[#087F8C] hover:text-[#066570] bg-teal-50 border border-teal-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Health Improvement Graph</span>
          </button>
          <button
            onClick={() => setActiveSubTab('family')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeSubTab === 'family'
                ? 'bg-[#10243A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white'
            }`}
          >
            Family Profiles ({familyMembers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('membership')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeSubTab === 'membership'
                ? 'bg-[#10243A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white'
            }`}
          >
            VIP Benefits Active
          </button>
        </div>

        {/* Sub-Tab 1: Bookings */}
        {activeSubTab === 'bookings' && (
          <div className="space-y-4">
            {recentBookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {b.bookingId}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Phlebotomist Dispatched
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mt-2">
                    {b.items.map((i) => i.name).join(' + ') || 'KoDon Pathology Package'}
                  </h3>

                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                    <span>Patient: {b.patientName}</span>
                    <span>·</span>
                    <span>{b.date} ({b.timeSlot.split('(')[0]})</span>
                    <span>·</span>
                    <span>{b.locality}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Payable</div>
                    <div className="text-base font-extrabold text-[#087F8C] tabular-nums">
                      ₹{b.totalAmount}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateTab('report-explainer')}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-[#087F8C] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sub-Tab 2: Reports */}
        {activeSubTab === 'reports' && (
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#087F8C]">NABL Verified PDF</span>
                <span className="text-xs text-slate-400">18 Oct 2026</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">KoDon Platinum Full Body (84 Tests)</h4>
              <p className="text-xs text-slate-500">Includes HbA1c, Liver, Kidney, Thyroid, Vit D & B12</p>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onNavigateTab('report-explainer')}
                  className="text-xs font-bold text-[#087F8C] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain with AI KODAN</span>
                </button>
                <button
                  onClick={() => alert('Downloading verified password-protected PDF...')}
                  className="p-2 text-slate-500 hover:text-slate-900"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#087F8C]">NABL Verified PDF</span>
                <span className="text-xs text-slate-400">04 Sep 2026</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">Thyroid Profile Total (T3, T4, TSH)</h4>
              <p className="text-xs text-slate-500">TSH: 2.8 mIU/L (Within Normal Range)</p>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onNavigateTab('report-explainer')}
                  className="text-xs font-bold text-[#087F8C] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain with AI KODAN</span>
                </button>
                <button
                  onClick={() => alert('Downloading verified password-protected PDF...')}
                  className="p-2 text-slate-500 hover:text-slate-900"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-Tab: Health Trends & Past Reports Improvement Graph */}
        {activeSubTab === 'trends' && (
          <div className="space-y-6">
            <HealthTrendsTracker
              onBookTest={(test) => onNavigateTab('packages')}
              onConsultDoctor={() => onNavigateTab('doctors')}
            />
          </div>
        )}

        {/* Sub-Tab 3: Family Profiles */}
        {activeSubTab === 'family' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {familyMembers.map((fam) => (
                <div key={fam.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {fam.relation}
                    </span>
                    <span className="text-xs text-slate-400">{fam.age} yrs · {fam.gender}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{fam.name}</h4>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={onOpenBooking}
                      className="text-xs font-bold text-[#087F8C] hover:underline"
                    >
                      Book Home Test for {fam.relation}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add member form */}
            <form onSubmit={handleAddFamilyMember} className="bg-white p-5 rounded-2xl border border-slate-200 max-w-xl flex items-center gap-3">
              <input
                type="text"
                required
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Add family member name..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
              />
              <select
                value={newMemberRelation}
                onChange={(e) => setNewMemberRelation(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200"
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-[#087F8C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Add Member
              </button>
            </form>
          </div>
        )}

        {/* Sub-Tab 4: Membership Active */}
        {activeSubTab === 'membership' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                  Active Subscription
                </span>
                <h3 className="text-xl font-extrabold text-[#10243A] mt-0.5">
                  KODON VIP Family Plan
                </h3>
              </div>
              <Crown className="w-8 h-8 text-amber-500" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your VIP plan covers up to 4 family members with zero home collection fees, 2 annual free doctor teleconsultations, 15% discount on partner radiology/pathology, and 45-minute priority dispatch in Hyderabad.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Renews on:</span>
                <span className="font-semibold text-slate-900">25 October 2027</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Status:</span>
                <span className="font-bold text-emerald-700">Active (Auto-Renew)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => alert('Subscription management: To cancel or change renewal preferences, contact support@kodonhealthcare.com')}
                className="text-slate-400 hover:text-slate-700 underline"
              >
                Manage or Cancel Subscription
              </button>
              <button
                onClick={() => onNavigateTab('vip')}
                className="text-[#087F8C] font-bold hover:underline"
              >
                Explore Plan Details
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
