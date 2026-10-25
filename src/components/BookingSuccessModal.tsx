import React from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Printer, Shield, Navigation, X } from 'lucide-react';
import { BookingSubmission } from '../types';

interface BookingSuccessModalProps {
  booking: BookingSubmission | null;
  onClose: () => void;
  onTrackBooking: (id: string) => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onClose,
  onTrackBooking,
}) => {
  if (!booking) return null;

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Booking Confirmed
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Phlebotomist Scheduled!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Reference ID:{' '}
            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              {booking.bookingId}
            </span>
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Patient:</span>
            <span className="font-semibold text-slate-900">
              {booking.patientName} ({booking.age}y / {booking.gender})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">WhatsApp Notification:</span>
            <span className="font-semibold text-slate-900">+91 {booking.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date & Slot:</span>
            <span className="font-semibold text-slate-900">
              {booking.date} · {booking.timeSlot.split('(')[0]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Locality & Pincode:</span>
            <span className="font-semibold text-slate-900">
              {booking.locality} ({booking.pincode})
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200">
            <span className="text-slate-500">Payment Due:</span>
            <span className="font-extrabold text-emerald-700 tabular-nums text-sm">
              ₹{booking.totalAmount} ({booking.paymentMethod === 'pay_on_collection' ? 'Pay to Technician' : 'Online Pre-paid'})
            </span>
          </div>
        </div>

        {/* Preparation Instructions */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-700" />
            <span>Fasting Preparation Checklist</span>
          </div>
          <ul className="text-[11px] text-amber-800 list-disc list-inside space-y-0.5">
            <li>Observe 10-12 hours overnight fasting (only plain drinking water allowed).</li>
            <li>Drink 1-2 glasses of water in the morning to keep veins hydrated for painless draw.</li>
            <li>Phlebotomist will carry sealed sterile vacuum kit and cold storage box.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onClose();
              onTrackBooking(booking.bookingId);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Track Phlebotomist Status</span>
          </button>

          <button
            onClick={handlePrintSlip}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
