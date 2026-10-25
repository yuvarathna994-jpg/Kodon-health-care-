import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToBooking: () => void;
  onExploreTests: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  onProceedToBooking,
  onExploreTests,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalParameters = cart.reduce((sum, item) => sum + item.parametersCount, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Selected Tests & Packages ({cart.length})
                </h3>
                {cart.length > 0 && (
                  <p className="text-[11px] text-slate-500">
                    Total {totalParameters} clinical analytes
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
                <p className="text-sm font-semibold text-slate-700">
                  Your diagnostic tray is empty
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Add full body health packages or individual blood tests to schedule a home sample collection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreTests();
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Browse Tests Catalog</span>
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span>Tests in Tray</span>
                  <button
                    onClick={onClearCart}
                    className="text-rose-600 hover:underline cursor-pointer text-[11px]"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-900 leading-snug">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                          <span>{item.parametersCount} Parameters</span>
                          <span>·</span>
                          <span className="truncate max-w-[140px]">
                            {item.fastingRequirement}
                          </span>
                        </div>
                        <div className="text-xs font-extrabold text-emerald-700 mt-2 tabular-nums">
                          ₹{item.price}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/90 space-y-4">
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Doorstep Collection Fee (Hyderabad)
                  </span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-emerald-700 text-base tabular-nums">
                    ₹{subtotal}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToBooking}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Schedule Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-400">
                Pay cash or UPI directly to technician on sample collection
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
