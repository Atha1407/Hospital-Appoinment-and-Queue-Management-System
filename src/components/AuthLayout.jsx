import React from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Building, ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children, role, title, subtitle, onBack }) {
  const roleDetails = {
    patient: {
      icon: User,
      color: 'text-blue-600 bg-blue-50',
      gradient: 'from-blue-500/5 to-sky-500/5',
    },
    doctor: {
      icon: Stethoscope,
      color: 'text-teal-600 bg-teal-50',
      gradient: 'from-teal-500/5 to-emerald-500/5',
    },
    receptionist: {
      icon: Building,
      color: 'text-indigo-600 bg-indigo-50',
      gradient: 'from-indigo-500/5 to-violet-500/5',
    },
  };

  const currentRole = roleDetails[role] || roleDetails.patient;
  const RoleIcon = currentRole.icon;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative medical background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-teal-100/30 blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
        className="max-w-xl w-full space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl relative z-10"
      >
        {/* Top bar with Back action */}
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors text-sm font-semibold cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>
        )}

        <div className="text-center">
          <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${currentRole.color}`}>
            <RoleIcon className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="mt-2.5 text-sm text-slate-600 max-w-sm mx-auto">{subtitle}</p>}
        </div>

        <div className="mt-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
