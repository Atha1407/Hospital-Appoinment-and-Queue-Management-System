import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from './AuthLayout';
import FormInput from './FormInput';
import { useAuth } from '../context/AuthContext.jsx';

export default function MockLogin({ role, onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roleConfigs = {
    patient: {
      title: 'Patient Login',
      subtitle: 'Access your appointments and check-in status',
    },
    doctor: {
      title: 'Doctor Portal',
      subtitle: 'Manage your daily consultations and schedules',
    },
    receptionist: {
      title: 'Receptionist Login',
      subtitle: 'Monitor patient queues and hospital scheduling',
    },
  };

  const config = roleConfigs[role] || roleConfigs.patient;

  const validate = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login({ name: 'Atharva Ingle', email, role });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center"
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Login Successful!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Successfully authenticated as <strong className="text-slate-800 capitalize">{role}</strong>. In a complete production system, this would redirect to your dashboard.
          </p>
          <button
            onClick={() => onNavigate('/')}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 px-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthLayout
      role={role}
      title={config.title}
      subtitle={config.subtitle}
      onBack={() => onNavigate('/role-selection')}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email Address"
          id="email"
          name="email"
          type="email"
          required
          placeholder="name@hospital.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: null });
          }}
          icon={Mail}
          error={errors.email}
        />

        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: null });
          }}
          icon={Lock}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-slate-700 cursor-pointer select-none">
              Remember me
            </label>
          </div>
          <a href="#" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-light text-white py-3.5 px-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center text-sm border-t border-slate-100 pt-6">
        <span className="text-slate-500">Don't have an account? </span>
        <button
          onClick={() => onNavigate(`/${role}/register`)}
          className="font-bold text-primary hover:text-primary-dark transition-colors hover:underline cursor-pointer"
        >
          Register
        </button>
      </div>
    </AuthLayout>
  );
}
