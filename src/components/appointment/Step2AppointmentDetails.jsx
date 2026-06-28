import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  FileText,
  ChevronLeft,
  CheckCircle2,
  Activity,
  Stethoscope,
  Building2,
  X,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointment } from '../../context/AppointmentContext';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM',
];

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

// Floating label input component
function FloatingInput({ id, label, type = 'text', value, onChange, icon: Icon, error, required, disabled, min }) {
  const hasValue = value && value.length > 0;
  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon className={`h-4 w-4 transition-colors ${error ? 'text-red-400' : hasValue ? 'text-blue-500' : 'text-gray-300'}`} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          min={min}
          placeholder=" "
          className={`peer w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 pt-5 pb-2 rounded-xl border-2 text-sm font-medium transition-all outline-none bg-white
            ${error
              ? 'border-red-300 focus:border-red-500'
              : hasValue
                ? 'border-blue-300 focus:border-blue-500 shadow-sm shadow-blue-500/10'
                : 'border-gray-200 focus:border-blue-400'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-80' : ''}
            text-gray-900
          `}
        />
        <label
          htmlFor={id}
          className={`absolute ${Icon ? 'left-10' : 'left-4'} transition-all duration-200 pointer-events-none font-medium
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-500
            ${hasValue ? 'top-1.5 text-xs text-blue-500' : ''}
          `}
        >
          {label}{required && ' *'}
        </label>
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3 text-red-500" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}

function FloatingSelect({ id, label, value, onChange, options, icon: Icon, error, required }) {
  const hasValue = value && value.length > 0;
  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon className={`h-4 w-4 transition-colors ${hasValue ? 'text-blue-500' : 'text-gray-300'}`} />
          </div>
        )}
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full appearance-none ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all outline-none bg-white cursor-pointer
            ${error
              ? 'border-red-300 focus:border-red-500'
              : hasValue
                ? 'border-blue-300 focus:border-blue-500 shadow-sm shadow-blue-500/10 text-gray-900'
                : 'border-gray-200 focus:border-blue-400 text-gray-400'
            }
          `}
        >
          <option value="">{label}{required ? ' *' : ''}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-gray-900">{opt}</option>
          ))}
        </select>
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3 text-red-500" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}

export default function Step2AppointmentDetails({ onNavigate }) {
  const { user } = useAuth();
  const { selectedSpecialization, selectedHospital, confirmAppointment } = useAppointment();

  // Pre-fill from auth user
  const [form, setForm] = useState({
    fullName: user?.name || '',
    age: user?.age || '21',
    phone: user?.phone || '+91 98765 43210',
    gender: user?.gender || 'Male',
    address: user?.address || 'Pune, Maharashtra',
    preferredDate: '',
    timeSlot: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 120) errs.age = 'Please enter a valid age';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.gender) errs.gender = 'Please select gender';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.preferredDate) errs.preferredDate = 'Please select a date';
    if (!form.timeSlot) errs.timeSlot = 'Please select a time slot';
    if (!form.reason.trim()) errs.reason = 'Please briefly describe your reason for visit';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const appointment = {
        id: 'APT-2026-1042',
        token: 'A-015',
        currentToken: 'A-009',
        estimatedWait: '20 Minutes',
        hospital: selectedHospital || 'Apollo Hospital',
        doctor: 'Dr. Raj Sharma',
        specialization: selectedSpecialization || 'Cardiology',
        date: form.preferredDate
          ? new Date(form.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
          : '25 June 2026',
        time: form.timeSlot || '10:30 AM',
        status: 'Confirmed',
        patientName: form.fullName,
        patientAge: form.age,
        patientPhone: form.phone,
        patientGender: form.gender,
        patientAddress: form.address,
        reason: form.reason,
      };
      confirmAppointment(appointment);
      setIsSubmitting(false);
      onNavigate('/patient/appointment-confirmation');
    }, 1000);
  };

  // Minimum date: today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
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

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-green-600 hidden sm:block">Select</span>
          </div>
          <div className="flex-1 h-0.5 bg-blue-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">2</div>
            <span className="text-sm font-semibold text-blue-600 hidden sm:block">Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 text-sm font-bold flex items-center justify-center">3</div>
            <span className="text-sm font-medium text-gray-400 hidden sm:block">Confirm</span>
          </div>
        </motion.div>

        {/* Selected Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
            <Stethoscope className="h-4 w-4" />
            {selectedSpecialization || 'Cardiology'}
          </div>
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium px-4 py-2 rounded-full">
            <Building2 className="h-4 w-4" />
            {selectedHospital || 'Apollo Hospital'}
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-xl shadow-blue-900/8 border border-gray-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Appointment Details</h1>
            <p className="text-gray-500 text-sm">
              Please verify your details before confirming.
            </p>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Section: Patient Information */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-blue-600 rounded-full" />
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Patient Information</h2>
                <span className="ml-1 text-xs text-gray-400 font-normal normal-case">(pre-filled from your profile)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FloatingInput
                    id="fullName"
                    label="Full Name"
                    value={form.fullName}
                    onChange={update('fullName')}
                    icon={User}
                    error={errors.fullName}
                    required
                  />
                </div>
                <FloatingInput
                  id="age"
                  label="Age"
                  type="number"
                  value={form.age}
                  onChange={update('age')}
                  icon={User}
                  error={errors.age}
                  required
                />
                <FloatingInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  icon={Phone}
                  error={errors.phone}
                  required
                />
                <FloatingSelect
                  id="gender"
                  label="Gender"
                  value={form.gender}
                  onChange={update('gender')}
                  options={GENDERS}
                  icon={User}
                  error={errors.gender}
                  required
                />
                <FloatingInput
                  id="address"
                  label="Address / City"
                  value={form.address}
                  onChange={update('address')}
                  icon={MapPin}
                  error={errors.address}
                  required
                />
              </div>
            </div>

            {/* Section: Appointment Preferences */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-teal-500 rounded-full" />
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Appointment Preferences</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput
                  id="preferredDate"
                  label="Preferred Date"
                  type="date"
                  value={form.preferredDate}
                  onChange={update('preferredDate')}
                  icon={Calendar}
                  error={errors.preferredDate}
                  min={today}
                  required
                />
                <FloatingSelect
                  id="timeSlot"
                  label="Preferred Time Slot"
                  value={form.timeSlot}
                  onChange={update('timeSlot')}
                  options={TIME_SLOTS}
                  icon={Clock}
                  error={errors.timeSlot}
                  required
                />
                <div className="sm:col-span-2">
                  <div className="relative">
                    <div className="absolute left-3.5 top-4 pointer-events-none">
                      <FileText className={`h-4 w-4 ${form.reason ? 'text-blue-500' : 'text-gray-300'}`} />
                    </div>
                    <textarea
                      id="reason"
                      rows={3}
                      value={form.reason}
                      onChange={update('reason')}
                      placeholder="Reason for Visit *  (e.g., chest pain, routine check-up, follow-up...)"
                      className={`w-full pl-10 pr-4 pt-3 pb-3 rounded-xl border-2 text-sm font-medium transition-all outline-none resize-none bg-white
                        ${errors.reason
                          ? 'border-red-300 focus:border-red-500'
                          : form.reason
                            ? 'border-blue-300 focus:border-blue-500 shadow-sm shadow-blue-500/10'
                            : 'border-gray-200 focus:border-blue-400'
                        }
                        text-gray-900 placeholder:text-gray-400
                      `}
                    />
                    {errors.reason && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <p className="text-xs text-red-500">{errors.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Info Preview */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                RS
              </div>
              <div>
                <p className="font-bold text-gray-900">Dr. Raj Sharma</p>
                <p className="text-sm text-gray-500">{selectedSpecialization || 'Cardiologist'} · {selectedHospital || 'Apollo Hospital'}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.9 · 12 yrs experience</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => onNavigate('/patient/select-appointment')}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <ChevronLeft className="h-5 w-5" /> Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Confirm Appointment
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
