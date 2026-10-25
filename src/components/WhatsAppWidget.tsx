import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl =
    'https://wa.me/918333821121?text=Hi%20KODON%20HEALTHCARE,%20I%20want%20to%20book%20a%20doorstep%20blood%20sample%20collection%20or%20inquire%20about%20tests%20in%20Hyderabad';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {showTooltip && (
        <div className="mb-2 bg-[#10243A] text-white text-xs py-2 px-3.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 max-w-xs animate-in fade-in">
          <span>Need rapid assistance in Hyderabad? WhatsApp us at +91 83338 21121!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer ring-2 ring-white/60"
        aria-label="Chat on WhatsApp with KODON HEALTHCARE"
        title="Direct WhatsApp Phlebotomist Dispatch (+91 83338 21121)"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
