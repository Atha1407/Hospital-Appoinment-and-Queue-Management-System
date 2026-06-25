import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Hospital, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RoleSelection({ onNavigate, mode = 'login' }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'patient',
      title: 'Patient',
      description: 'Book appointments, track queues, and manage your visits.',
      icon: User,
      color: 'from-blue-500 to-sky-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      accentColor: 'text-blue-600',
      hoverBorder: 'hover:border-blue-300',
      ringColor: 'focus-visible:ring-blue-500',
    },
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Manage appointments, schedules, and patient consultations.',
      icon: Stethoscope,
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-100',
      accentColor: 'text-teal-600',
      hoverBorder: 'hover:border-teal-300',
      ringColor: 'focus-visible:ring-teal-500',
    },
    {
      id: 'receptionist',
      title: 'Receptionist',
      description: 'Manage patient queues and hospital appointments.',
      icon: Hospital,
      color: 'from-indigo-500 to-violet-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      accentColor: 'text-indigo-600',
      hoverBorder: 'hover:border-indigo-300',
      ringColor: 'focus-visible:ring-indigo-500',
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onNavigate(`/${selectedRole}/${mode}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6">
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2"
          >
            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Choose Your Role
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600"
          >
            {mode === 'login' ? 'Select how you want to access the system.' : 'Select how you want to register in the system.'}
          </motion.p>
        </div>

        {/* Roles Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <motion.div
                key={role.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedRole(role.id)}
                className={`cursor-pointer bg-white border rounded-2xl p-8 relative overflow-hidden transition-all duration-300 shadow-sm outline-none ring-offset-2 select-none group
                  ${isSelected 
                    ? 'border-primary ring-2 ring-primary shadow-lg scale-[1.02]' 
                    : `${role.borderColor} ${role.hoverBorder} hover:shadow-md hover:scale-[1.01]`
                  }
                `}
              >
                {/* Accent Background Overlay for Selected Card */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full pointer-events-none transition-all duration-300" />
                )}

                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110
                  ${isSelected ? `bg-gradient-to-br ${role.color} text-white` : `${role.bgColor} ${role.accentColor}`}
                `}>
                  <Icon className="h-7 w-7" />
                </div>

                {/* Role Title */}
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-slate-800'}`}>
                  {role.title}
                </h3>

                {/* Role Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {role.description}
                </p>

                {/* Active Indicator Pin */}
                <div className="absolute top-6 right-6">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'}
                  `}>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-scaleIn" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full sm:w-auto sm:flex-1 px-8 py-3.5 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5
              ${selectedRole 
                ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-light cursor-pointer' 
                : 'bg-slate-300 cursor-not-allowed opacity-75 shadow-none hover:transform-none'
              }
            `}
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
