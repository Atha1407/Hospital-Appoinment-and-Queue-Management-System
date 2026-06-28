import React, { forwardRef } from 'react';
import { Activity, BadgeCheck, Phone, MapPin } from 'lucide-react';

// Dummy QR for receipt (smaller inline version)
function ReceiptQR({ size = 80 }) {
  const modules = 15;
  const cell = size / modules;
  const dots = [
    [3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],
    [4,3],[4,5],[4,7],[4,9],
    [5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],
    [6,5],[6,7],
    [7,3],[7,4],[7,6],[7,8],[7,9],
    [8,3],[8,5],[8,7],[8,9],
    [9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],
    [10,4],[10,6],[10,8],
    [11,3],[11,5],[11,7],[11,9],
    [12,4],[12,6],[12,8],
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <rect width={size} height={size} fill="white" />
      {dots.map(([r, c], i) => (
        <rect key={i} x={c * cell} y={r * cell} width={cell * 0.85} height={cell * 0.85} fill="#1e3a5f" rx={0.5} />
      ))}
    </svg>
  );
}

const AppointmentReceipt = forwardRef(function AppointmentReceipt({ appointment }, ref) {
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
    patientAge = '21',
    patientPhone = '+91 98765 43210',
    patientGender = 'Male',
    patientAddress = 'Pune, Maharashtra',
    reason = 'Routine check-up and ECG',
  } = appointment || {};

  return (
    <div
      ref={ref}
      className="bg-white w-full max-w-md mx-auto"
      style={{ fontFamily: 'sans-serif', fontSize: '13px' }}
    >
      {/* Header */}
      <div
        className="px-8 py-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8, #0891b2)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-7 w-7 text-white" />
            <div>
              <h1 className="text-xl font-black tracking-tight">CareQueue</h1>
              <p className="text-blue-200 text-xs">Hospital Appointment Receipt</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-200">Appointment ID</p>
            <p className="font-bold font-mono text-sm">{id}</p>
          </div>
        </div>
      </div>

      {/* Status Strip */}
      <div className="flex items-center justify-center gap-2 bg-green-50 border-b border-green-100 py-2">
        <BadgeCheck className="h-4 w-4 text-green-600" />
        <span className="text-green-700 font-bold text-sm">{status}</span>
      </div>

      {/* Body */}
      <div className="px-8 py-6 space-y-6">
        {/* Doctor & Hospital */}
        <div className="border border-blue-100 rounded-xl p-4 bg-blue-50">
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-2">Appointment Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400">Doctor</p>
              <p className="font-bold text-gray-900">{doctor}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Department</p>
              <p className="font-bold text-gray-900">{specialization}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Hospital</p>
              <p className="font-bold text-gray-900">{hospital}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Token</p>
              <p className="font-bold text-blue-700 text-lg">{token}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Date</p>
              <p className="font-bold text-gray-900">{date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Time</p>
              <p className="font-bold text-gray-900">{time}</p>
            </div>
          </div>
        </div>

        {/* Patient Details + QR */}
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Patient Details</p>
            <div className="space-y-1">
              <p className="font-bold text-gray-900">{patientName}</p>
              <p className="text-gray-600">{patientAge} years · {patientGender}</p>
              <div className="flex items-center gap-1 text-gray-500">
                <Phone className="h-3 w-3" />
                <span>{patientPhone}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{patientAddress}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-1">
            <div className="border border-gray-200 rounded-lg p-1.5">
              <ReceiptQR size={80} />
            </div>
            <p className="text-xs text-gray-400 text-center">Scan at<br/>Reception</p>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Reason for Visit</p>
          <p className="text-gray-700 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">{reason}</p>
        </div>

        {/* Instructions */}
        <div className="border-t border-dashed border-gray-200 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Instructions</p>
          <ul className="space-y-1 text-xs text-gray-500">
            <li>• Please arrive 15 minutes before your scheduled time.</li>
            <li>• Carry a valid photo ID and this receipt.</li>
            <li>• Show your token number at the reception desk.</li>
            <li>• You will receive an SMS notification before your turn.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          Generated by <span className="font-semibold text-blue-600">CareQueue</span> · {new Date().toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          For support: support@carequeue.in | Toll-free: 1800-XXX-XXXX
        </p>
      </div>
    </div>
  );
});

export default AppointmentReceipt;
