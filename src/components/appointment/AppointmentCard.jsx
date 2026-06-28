import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Stethoscope,
  User,
  Calendar,
  Clock,
  Hash,
  Ticket,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react';

const DetailRow = ({ icon: Icon, label, value, highlight = false }) => (
  <div className="flex items-start gap-3">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${highlight ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <Icon className={`h-4 w-4 ${highlight ? 'text-blue-600' : 'text-gray-500'}`} />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className={`text-sm font-semibold mt-0.5 ${highlight ? 'text-blue-700' : 'text-gray-800'}`}>{value}</p>
    </div>
  </div>
);

export default function AppointmentCard({ appointment }) {
  const {
    id = 'APT-2026-1042',
    token = 'A-015',
    hospital = 'Apollo Hospital',
    doctor = 'Dr. Raj Sharma',
    specialization = 'Cardiology',
    date = '25 June 2026',
    time = '10:30 AM',
    status = 'Confirmed',
    patientName = 'Atharva Ingle',
  } = appointment || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 20px 60px rgba(37,99,235,0.12), 0 4px 20px rgba(0,0,0,0.06)',
      }}
    >
      {/* Top Gradient Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-teal-500" />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
              Appointment ID
            </p>
            <p className="text-lg font-bold text-gray-900 font-mono">{id}</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">{status}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <DetailRow icon={User} label="Patient Name" value={patientName} />
          <DetailRow icon={Stethoscope} label="Doctor" value={doctor} highlight />
          <DetailRow icon={Hash} label="Specialization" value={specialization} />
          <DetailRow icon={Building2} label="Hospital" value={hospital} />
          <DetailRow icon={Calendar} label="Date" value={date} highlight />
          <DetailRow icon={Clock} label="Time" value={time} highlight />
          <DetailRow icon={Ticket} label="Token Number" value={token} highlight />
        </div>
      </div>
    </motion.div>
  );
}
