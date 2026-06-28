import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Download,
  Printer,
  LayoutDashboard,
  CalendarPlus,
  Activity,
  Share2,
} from 'lucide-react';
import { useAppointment } from '../../context/AppointmentContext';
import AppointmentCard from './AppointmentCard';
import TokenCard from './TokenCard';
import QRCodeCard from './QRCodeCard';
import AppointmentReceipt from './AppointmentReceipt';

const DUMMY_APPOINTMENT = {
  id: 'APT-2026-1042',
  token: 'A-015',
  currentToken: 'A-009',
  estimatedWait: '20 Minutes',
  hospital: 'Apollo Hospital',
  doctor: 'Dr. Raj Sharma',
  specialization: 'Cardiology',
  date: '25 June 2026',
  time: '10:30 AM',
  status: 'Confirmed',
  patientName: 'Atharva Ingle',
  patientAge: '21',
  patientPhone: '+91 98765 43210',
  patientGender: 'Male',
  patientAddress: 'Pune, Maharashtra',
  reason: 'Routine cardiology check-up and ECG',
};

// --- Receipt Modal ---
function ReceiptModal({ appointment, onClose }) {
  const receiptRef = useRef(null);

  const handlePrint = () => {
    const printContent = receiptRef.current?.innerHTML;
    if (!printContent) return;
    const win = window.open('', '_blank', 'width=600,height=800');
    win.document.write(`
      <html>
        <head>
          <title>Appointment Receipt – ${appointment.id}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; background: #fff; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Appointment Receipt</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Printer className="h-4 w-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="overflow-y-auto flex-1">
          <AppointmentReceipt ref={receiptRef} appointment={appointment} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AppointmentConfirmation({ onNavigate }) {
  const { bookedAppointment, resetFlow } = useAppointment();
  const appointment = bookedAppointment || DUMMY_APPOINTMENT;

  const [showReceipt, setShowReceipt] = useState(false);

  const handleBookAnother = () => {
    resetFlow();
    onNavigate('/patient/select-appointment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
          <Activity className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CareQueue</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* ======== SUCCESS HEADER ======== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Animated check icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4"
          >
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-2"
          >
            Appointment Confirmed Successfully 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg"
          >
            Your appointment has been booked. See you at the hospital!
          </motion.p>
        </motion.div>

        {/* ======== APPOINTMENT CARD + QR GRID ======== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Appointment Card — spans 2 cols */}
          <div className="lg:col-span-2">
            <AppointmentCard appointment={appointment} />
          </div>

          {/* QR Code */}
          <div className="lg:col-span-1">
            <QRCodeCard />
          </div>
        </div>

        {/* ======== TOKEN CARD ======== */}
        <div className="mb-8">
          <TokenCard
            token={appointment.token}
            currentToken={appointment.currentToken}
            estimatedWait={appointment.estimatedWait}
          />
        </div>

        {/* ======== ACTION BUTTONS ======== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <button
            onClick={() => setShowReceipt(true)}
            className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold text-sm transition-all group shadow-sm hover:shadow-md"
          >
            <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Download
          </button>

          <button
            onClick={() => setShowReceipt(true)}
            className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold text-sm transition-all group shadow-sm hover:shadow-md"
          >
            <Printer className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Print
          </button>

          <button
            onClick={() => onNavigate('/patient/dashboard')}
            className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all group shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
          >
            <LayoutDashboard className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Dashboard
          </button>

          <button
            onClick={handleBookAnother}
            className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl bg-teal-50 border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-100 text-teal-700 font-semibold text-sm transition-all group shadow-sm hover:shadow-md"
          >
            <CalendarPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Book Another
          </button>
        </motion.div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptModal appointment={appointment} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
}
