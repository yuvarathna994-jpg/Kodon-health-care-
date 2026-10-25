import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Phone, AlertCircle } from 'lucide-react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please attach an image or PDF file of your doctor prescription.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFile(null);
    setPatientName('');
    setPhone('');
    setNotes('');
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Upload Doctor's Prescription
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              KoDon medical coordinators will decode the tests and call you
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

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">
                Prescription Received!
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Thank you, {patientName || 'Patient'}. Our Hyderabad medical team is analyzing your prescription slip now. You will receive a call and WhatsApp confirmation at <span className="font-semibold text-slate-900">+91 {phone}</span> within 10 minutes.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* File Dropzone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Prescription Photo or PDF *
              </label>
              <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-5 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition-colors block">
                {file ? (
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="text-slate-400 hover:text-rose-600 text-[11px] underline ml-2"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-slate-700">
                      Click to browse or drag file here
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      JPEG, PNG, or PDF up to 15MB
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Full Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Priyanthi Rao"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
              />
            </div>

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
                  className="w-full pl-12 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need fasting blood sugar and cholesterol test before 8 AM in Madhapur"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50/50"
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Submit for Free Pathologist Review</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
