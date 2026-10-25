import React, { useState } from 'react';
import { X, Search, CheckCircle, Clock, Truck, FileCheck, ShieldAlert, Thermometer } from 'lucide-react';
import { BookingSubmission } from '../types';

interface BookingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookingId?: string;
  recentBookings?: BookingSubmission[];
}

export const BookingTrackerModal: React.FC<BookingTrackerModalProps> = ({
  isOpen,
  onClose,
  initialBookingId,
  recentBookings = [],
}) => {
  const [searchId, setSearchId] = useState(
    initialBookingId || (recentBookings[0] ? recentBookings[0].bookingId : 'KODON-HYD-8421')
  );
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const currentBooking = recentBookings.find(
    (b) => b.bookingId.toLowerCase() === searchId.trim().toLowerCase()
  );

  const trackerSteps = [
    {
      title: 'Slot Confirmed & Kit Sterilized',
      desc: 'Vacuum collection vials, sterile butterfly needles, and barcode tags packed in insulated kit.',
      time: 'Completed',
      status: 'done',
    },
    {
      title: 'Phlebotomist Assigned & Dispatched',
      desc: 'Technician K. Maheshwar (Vaccinated & Certified) en route with 4°C temperature-regulated container.',
      time: 'In Progress',
      status: 'active',
    },
    {
      title: 'Doorstep Venipuncture Sample Collection',
      desc: 'Painless draw using sterilized vacuum system; patient barcode scanned on-site.',
      time: 'Next',
      status: 'pending',
    },
    {
      title: 'Cold-Chain Transit to Central NABL Lab',
      desc: 'Monitored ice packs preserve serum and whole-blood biochemistry.',
      time: 'Scheduled',
      status: 'pending',
    },
    {
      title: 'Pathology Analysis & MD Verification',
      desc: 'Tested on automated analyzers with dual QC approval by MD Pathologist.',
      time: 'Scheduled',
      status: 'pending',
    },
    {
      title: 'Encrypted Digital Report on WhatsApp',
      desc: 'High-resolution PDF delivered with digital NABL QR seal in 6 to 12 hours.',
      time: 'Final Step',
      status: 'pending',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Live Phlebotomist & Report Tracker
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time cold-chain & diagnostic pipeline status
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Booking ID Bar */}
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Booking ID (e.g. KODON-HYD-8421)..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900"
            />
          </div>
          <button
            onClick={() => setSearched(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer shrink-0"
          >
            Track
          </button>
        </div>

        {/* Booking Card Header */}
        <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[11px] text-slate-500">Active Order ID</div>
            <div className="font-mono font-bold text-slate-900 text-sm">
              {searchId.toUpperCase()}
            </div>
          </div>
          {currentBooking && (
            <div className="text-right">
              <div className="text-[11px] text-slate-500">Patient</div>
              <div className="font-semibold text-slate-900">
                {currentBooking.patientName} ({currentBooking.locality})
              </div>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg">
            <Thermometer className="w-3.5 h-3.5" />
            <span>Cold-Box: 3.8°C Monitored</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-5 space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {trackerSteps.map((step, idx) => {
            const isDone = step.status === 'done';
            const isActive = step.status === 'active';

            return (
              <div key={idx} className="flex items-start gap-3 relative">
                {/* Line */}
                {idx !== trackerSteps.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-7 w-0.5 h-10 ${
                      isDone ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  />
                )}

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isActive
                      ? 'bg-emerald-100 text-emerald-800 ring-4 ring-emerald-50'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isActive ? (
                    <Truck className="w-3.5 h-3.5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 pb-3">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-bold ${
                        isActive ? 'text-emerald-800' : 'text-slate-900'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span
                      className={`text-[11px] font-semibold ${
                        isActive
                          ? 'text-emerald-700'
                          : isDone
                          ? 'text-slate-500'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Need live assistance?</span>
          <a
            href="tel:+919876543210"
            className="text-emerald-700 font-bold hover:underline"
          >
            Call Phlebotomy Desk (+91 98765 43210)
          </a>
        </div>

      </div>
    </div>
  );
};
