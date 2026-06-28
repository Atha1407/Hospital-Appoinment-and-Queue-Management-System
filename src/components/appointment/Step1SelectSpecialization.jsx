import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Building2,
  ChevronDown,
  ArrowRight,
  Activity,
  X,
} from 'lucide-react';
import { useAppointment } from '../../context/AppointmentContext';
import { useAuth } from '../../context/AuthContext';

const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Orthopedic',
  'Neurologist',
  'Pediatrician',
  'ENT Specialist',
  'Ophthalmologist',
  'Gynecologist',
  'Dentist',
];

const HOSPITALS = [
  'Apollo Hospital',
  'Ruby Hall Clinic',
  'Sahyadri Hospital',
  'City Care Hospital',
  'KEM Hospital',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

function StyledSelect({ id, label, icon: Icon, options, value, onChange, placeholder }) {
  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none pl-12 pr-12 py-4 rounded-2xl border-2 text-sm font-medium transition-all outline-none bg-white cursor-pointer
            ${value
              ? 'border-blue-500 text-gray-900 shadow-md shadow-blue-500/10'
              : 'border-gray-200 text-gray-400 hover:border-gray-300'
            }
            focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/10
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className={`h-5 w-5 transition-colors ${value ? 'text-blue-500' : 'text-gray-300'}`} />
        </div>
      </div>
    </div>
  );
}

export default function Step1SelectSpecialization({ onNavigate }) {
  const { user } = useAuth();
  const {
    selectedSpecialization,
    setSelectedSpecialization,
    selectedHospital,
    setSelectedHospital,
  } = useAppointment();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const canContinue = selectedSpecialization && selectedHospital;

  const handleContinue = () => {
    if (!canContinue) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('/patient/book-appointment');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
          <Activity className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CareQueue</span>
        </div>
        <button
          onClick={() => onNavigate('/patient/dashboard')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl"
        >
          {/* Step indicator */}
          <motion.div custom={0} variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">1</div>
              <span className="text-sm font-semibold text-blue-600">Select</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 text-sm font-bold flex items-center justify-center">2</div>
              <span className="text-sm font-medium text-gray-400">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 text-sm font-bold flex items-center justify-center">3</div>
              <span className="text-sm font-medium text-gray-400">Confirm</span>
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            className="bg-white rounded-3xl shadow-xl shadow-blue-900/8 border border-gray-100 overflow-hidden"
          >
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-50">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <Stethoscope className="h-7 w-7 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Book an Appointment</h1>
              <p className="text-gray-500 text-sm">
                Choose your preferred specialization and hospital.
              </p>
              {user && (
                <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Booking as {user.name}
                </div>
              )}
            </div>

            {/* Form */}
            <div className="px-8 py-8 space-y-6">
              <StyledSelect
                id="specialization"
                label="Medical Specialization"
                icon={Stethoscope}
                options={SPECIALIZATIONS}
                value={selectedSpecialization}
                onChange={setSelectedSpecialization}
                placeholder="Select a specialization..."
              />

              <StyledSelect
                id="hospital"
                label="Preferred Hospital"
                icon={Building2}
                options={HOSPITALS}
                value={selectedHospital}
                onChange={setSelectedHospital}
                placeholder="Select a hospital..."
              />

              {/* Info cards when both selected */}
              {canContinue && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 flex items-center gap-2.5">
                    <Stethoscope className="h-5 w-5 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-xs text-blue-500 font-medium">Specialization</p>
                      <p className="text-sm font-bold text-blue-900">{selectedSpecialization}</p>
                    </div>
                  </div>
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3 flex items-center gap-2.5">
                    <Building2 className="h-5 w-5 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-xs text-teal-500 font-medium">Hospital</p>
                      <p className="text-sm font-bold text-teal-900">{selectedHospital}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleContinue}
                disabled={!canContinue || isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                  canContinue
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    Find Available Appointment
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {!canContinue && (
                <p className="text-center text-xs text-gray-400">
                  Please select both specialization and hospital to continue.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
