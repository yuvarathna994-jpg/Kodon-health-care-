import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { CartItem, BookingSubmission } from '../types';
import { HYDERABAD_HUBS } from '../data/hyderabadHubs';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  defaultLocality?: string;
  onBookingConfirmed: (booking: BookingSubmission) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  cart,
  defaultLocality,
  onBookingConfirmed,
}) => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('500081');
  const [locality, setLocality] = useState(defaultLocality || 'Hitec City / Madhapur');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('06:00 AM - 07:00 AM (Recommended for Fasting)');
  const [paymentMethod, setPaymentMethod] = useState<'pay_on_collection' | 'online_upi'>('pay_on_collection');
  const [error, setError] = useState('');

  // Set default date to tomorrow
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (defaultLocality) {
      setLocality(defaultLocality);
      const hub = HYDERABAD_HUBS.find((h) => h.name.includes(defaultLocality) || defaultLocality.includes(h.name));
      if (hub) {
        setPincode(hub.pincode);
      }
    }
  }, [defaultLocality]);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePincodeChange = (pin: string) => {
    setPincode(pin);
    const matched = HYDERABAD_HUBS.find((h) => h.pincode === pin.trim());
    if (matched) {
      setLocality(matched.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Please provide patient full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number for WhatsApp delivery.');
      return;
    }
    if (!address.trim()) {
      setError('Please provide complete house address for phlebotomist visit.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingSubmission = {
      bookingId: `KODON-HYD-${randomSuffix}`,
      patientName: patientName.trim(),
      age: age.trim() || '32',
      gender,
      phone: cleanPhone,
      email: email.trim(),
      address: address.trim(),
      landmark: landmark.trim(),
      pincode: pincode.trim(),
      locality,
      date,
      timeSlot,
      paymentMethod,
      items: [...cart],
      totalAmount,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setError('');
    onBookingConfirmed(newBooking);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl my-6 relative border border-slate-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Schedule Hyderabad Home Pickup
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Certified medical technician visits with sterilized single-use vacuum kit
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

        {/* Selected Items Mini Strip */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex justify-between font-bold text-slate-800">
            <span>Tests in Booking ({cart.length})</span>
            <span className="text-emerald-700 tabular-nums">Total: ₹{totalAmount}</span>
          </div>
          <p className="text-slate-500 text-[11px] mt-1 truncate">
            {cart.map((i) => i.name).join(', ')}
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Full Name *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Sravan Reddy"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-slate-50/50 cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Phone Number *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 00000"
                  className="w-full pl-12 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (For PDF Backup)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hyderabad Pincode *
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                placeholder="e.g. 500081"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hyderabad Area / Locality *
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-slate-50/50 cursor-pointer"
              >
                {HYDERABAD_HUBS.map((hub) => (
                  <option key={hub.pincode} value={hub.name}>
                    {hub.name} ({hub.pincode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Complete Home Address (Flat #, Apartment / Villa, Street) *
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Flat 504, Tower B, My Home Bhooja, Silpa Gram Craft Village"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nearest Landmark
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Opposite Knowledge City / Near Inorbit Mall"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                min={todayStr}
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Morning Fasting Time Slot *
              </label>
              <select
                required
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-slate-50/50 cursor-pointer"
              >
                <option value="06:00 AM - 07:00 AM (Recommended for Fasting)">
                  06:00 AM - 07:00 AM (Early Fasting)
                </option>
                <option value="07:00 AM - 08:00 AM (Recommended for Fasting)">
                  07:00 AM - 08:00 AM (Ideal Fasting)
                </option>
                <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="04:00 PM - 07:00 PM (Post-Prandial / Non-Fasting)">
                  04:00 PM - 07:00 PM (Evening Non-Fasting)
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Payment Preference
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setPaymentMethod('pay_on_collection')}
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'pay_on_collection'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={paymentMethod === 'pay_on_collection'}
                  onChange={() => setPaymentMethod('pay_on_collection')}
                  className="mt-0.5 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-slate-900">Pay on Collection</div>
                  <div className="text-[11px] text-slate-500">
                    Scan Phlebotomist UPI QR or Cash
                  </div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('online_upi')}
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'online_upi'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={paymentMethod === 'online_upi'}
                  onChange={() => setPaymentMethod('online_upi')}
                  className="mt-0.5 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-slate-900">Pre-Pay Online</div>
                  <div className="text-[11px] text-slate-500">
                    UPI, Google Pay, Cards
                  </div>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm Hyderabad Home Collection (₹{totalAmount})</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            NABL certified sample handling · Free home collection · 100% painless vacuum tubes
          </div>

        </form>

      </div>
    </div>
  );
};
