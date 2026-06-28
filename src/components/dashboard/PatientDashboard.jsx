import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointment } from '../../context/AppointmentContext';
import { Calendar, Clock, Building2, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import ConfirmationBanner from '../appointment/ConfirmationBanner';
import { 
  WelcomeCard, 
  StatCard, 
  UpcomingAppointment, 
  QueueStatus, 
  QuickActions, 
  RecentAppointments, 
  HealthTips 
} from './DashboardWidgets';

export default function PatientDashboard({ onNavigate }) {
  const { user, logout } = useAuth();
  const { bookedAppointment, showSuccessBanner, dismissBanner } = useAppointment();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        onNavigate={onNavigate}
        currentPath="/patient/dashboard"
        onLogout={() => {
          logout();
          onNavigate('/');
        }} 
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 transition-all duration-300">
        <TopNavbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onNavigate={onNavigate} 
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Confirmation Banner */}
            {showSuccessBanner && (
              <ConfirmationBanner
                onDismiss={dismissBanner}
                onViewAppointment={() => onNavigate('/patient/appointment-confirmation')}
              />
            )}

            {/* Top Section: Welcome & Health Tip */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WelcomeCard userName={user?.name || 'Guest'} />
              </div>
              <div className="lg:col-span-1 h-full">
                <HealthTips />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Visits" 
                value="12" 
                trend="+2 this year"
                icon={Calendar} 
                colorClass="bg-blue-100 text-blue-600" 
              />
              <StatCard 
                title="Pending Labs" 
                value="2" 
                icon={Clock} 
                colorClass="bg-orange-100 text-orange-600" 
              />
              <StatCard 
                title="Preferred Hospital" 
                value={bookedAppointment?.hospital?.split(' ')[0] || 'City Gen'}
                icon={Building2} 
                colorClass="bg-purple-100 text-purple-600" 
              />
              <StatCard 
                title="Queue Token" 
                value={bookedAppointment?.token || '--'} 
                icon={Ticket} 
                colorClass="bg-teal-100 text-teal-600" 
              />
            </div>

            {/* Middle Section: Next Appt, Queue, Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <UpcomingAppointment appointment={bookedAppointment} onNavigate={onNavigate} />
              <QueueStatus appointment={bookedAppointment} />
              <QuickActions />
            </div>

            {/* Bottom Section: Recent Appointments */}
            <div className="grid grid-cols-1 gap-6">
              <RecentAppointments />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
