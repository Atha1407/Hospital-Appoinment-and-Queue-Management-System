import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ArrowRight } from 'lucide-react';

export default function ConfirmationBanner({ onDismiss, onViewAppointment }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl mb-6"
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
          boxShadow: '0 8px 32px rgba(16,185,129,0.25)',
        }}
      >
        {/* Decorative background blob */}
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />

        <div className="relative z-10 flex items-center justify-between px-6 py-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm md:text-base">
                🎉 Your appointment has been confirmed!
              </p>
              <p className="text-green-100 text-xs md:text-sm">
                Appointment ID: APT-2026-1042 · Token: A-015
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onViewAppointment && (
              <button
                onClick={onViewAppointment}
                className="hidden sm:flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                View <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
