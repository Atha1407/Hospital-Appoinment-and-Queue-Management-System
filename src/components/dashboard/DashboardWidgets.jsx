import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Activity, 
  FileText, 
  ChevronRight, 
  HeartPulse, 
  Bell, 
  MapPin, 
  Video,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Widget Wrappers & Animations ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Card = ({ children, className = '' }) => (
  <motion.div 
    variants={fadeUp}
    className={`bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-50 ${className}`}
  >
    {children}
  </motion.div>
);

// --- Welcome Card ---
export const WelcomeCard = ({ userName }) => {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <motion.div 
      variants={fadeUp}
      className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2">Good morning, {userName}! 👋</h2>
        <p className="text-blue-100 mb-6">{date}</p>
        <p className="text-sm font-medium bg-white/10 inline-block px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
          You have 1 upcoming appointment today.
        </p>
      </div>
    </motion.div>
  );
};

// --- Stat Card ---
export const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
  <Card className="flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClass} transition-transform group-hover:scale-110`}>
      <Icon className="h-7 w-7" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && <span className="text-xs font-semibold text-teal-500 mb-1">{trend}</span>}
      </div>
    </div>
  </Card>
);

// --- Upcoming Appointment ---
export const UpcomingAppointment = ({ appointment, onNavigate }) => {
  // If there's a real appointment, show it; otherwise show the empty/placeholder state
  if (!appointment) {
    return (
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 text-lg">Next Appointment</h3>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/patient/select-appointment')}
              className="text-sm text-blue-600 font-medium hover:text-blue-700"
            >
              + Book
            </button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-blue-300" />
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">No upcoming appointments</p>
          <p className="text-xs text-gray-400 mb-4">Book your first appointment now</p>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/patient/select-appointment')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-600/20"
            >
              Book Appointment
            </button>
          )}
        </div>
      </Card>
    );
  }

  // Parse date display
  const dateParts = appointment.date ? appointment.date.split(' ') : ['--', '--', '--'];
  const day = dateParts[0] || '--';
  const month = dateParts[1]?.substring(0, 3) || '--';

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Next Appointment</h3>
        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Confirmed
        </span>
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <div className="flex gap-4 border-b border-gray-200 pb-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-blue-100 flex flex-col items-center justify-center text-blue-700 font-bold shrink-0">
            <span className="text-xs uppercase font-semibold">{month}</span>
            <span className="text-xl">{day}</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{appointment.doctor}</h4>
            <p className="text-sm text-gray-500">{appointment.specialization} · {appointment.hospital}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-lg">Token: {appointment.token}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{appointment.hospital}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm shadow-blue-600/20">
            View Details
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2.5 rounded-xl font-medium transition-colors text-sm">
            Reschedule
          </button>
        </div>
      </div>
    </Card>
  );
};

// --- Queue Status ---
export const QueueStatus = ({ appointment }) => {
  const token = appointment?.token || '#--';
  const currentToken = appointment?.currentToken || '#--';
  const waitText = appointment?.estimatedWait || 'N/A';
  const hasAppointment = !!appointment;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Live Queue Status</h3>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
        </span>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 mb-1">Your Token Number</p>
        <div className="text-5xl font-black text-blue-600 tracking-tight">{token}</div>
      </div>
      
      {hasAppointment ? (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-500">Current Serving</span>
              <span className="font-semibold text-gray-900">{currentToken}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 flex items-start gap-3">
            <Clock className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-teal-900">Estimated Wait: ~{waitText}</p>
              <p className="text-xs text-teal-700 mt-1">Please arrive 15 min early with your token.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-gray-400">No active queue. Book an appointment to get a token.</p>
        </div>
      )}
    </Card>
  );
};

// --- Quick Actions ---
const actions = [
  { icon: Calendar, label: 'Book Visit', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Activity, label: 'Lab Results', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: FileText, label: 'Prescriptions', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: MapPin, label: 'Find Clinics', color: 'text-orange-600', bg: 'bg-orange-50' },
];

export const QuickActions = () => (
  <Card>
    <h3 className="font-bold text-gray-900 text-lg mb-6">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, i) => (
        <button 
          key={i}
          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group bg-white"
        >
          <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <action.icon className={`h-6 w-6 ${action.color}`} />
          </div>
          <span className="text-sm font-medium text-gray-700">{action.label}</span>
        </button>
      ))}
    </div>
  </Card>
);

// --- Recent Appointments ---
const recentVisits = [
  { doctor: 'Dr. Emily Chen', dept: 'Dermatology', date: 'Sep 15, 2023', status: 'Completed' },
  { doctor: 'Dr. Michael Brown', dept: 'General Practice', date: 'Aug 02, 2023', status: 'Completed' },
  { doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', date: 'Jul 20, 2023', status: 'Cancelled' },
];

export const RecentAppointments = () => (
  <Card className="col-span-1 lg:col-span-2">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-gray-900 text-lg">Recent Visits</h3>
      <button className="text-sm text-blue-600 font-medium flex items-center hover:text-blue-700">
        See history <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <th className="pb-3 pl-2">Doctor</th>
            <th className="pb-3">Department</th>
            <th className="pb-3">Date</th>
            <th className="pb-3 text-right pr-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {recentVisits.map((visit, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 pl-2">
                <p className="font-semibold text-gray-900 text-sm">{visit.doctor}</p>
              </td>
              <td className="py-4 text-sm text-gray-600">{visit.dept}</td>
              <td className="py-4 text-sm text-gray-600">{visit.date}</td>
              <td className="py-4 text-right pr-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  visit.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {visit.status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {visit.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

// --- Health Tips ---
export const HealthTips = () => (
  <Card className="bg-gradient-to-br from-teal-500 to-teal-700 text-white border-none relative overflow-hidden">
    <HeartPulse className="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-10" />
    <h3 className="font-bold text-lg mb-2 relative z-10">Daily Health Tip</h3>
    <p className="text-teal-50 text-sm mb-4 relative z-10 leading-relaxed">
      Stay hydrated! Drinking at least 8 glasses of water a day helps maintain energy levels and brain function.
    </p>
    <button className="bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg backdrop-blur-sm relative z-10">
      Read more tips
    </button>
  </Card>
);
