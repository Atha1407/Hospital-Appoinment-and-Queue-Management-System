import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, MapPin, 
  Briefcase, Award, GraduationCap, FileText, 
  Calendar, ShieldCheck, Users 
} from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from './AuthLayout';
import FormInput from './FormInput';
import { useAuth } from '../context/AuthContext.jsx';

export default function MockRegister({ role, onNavigate }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Patient specific
    age: '',
    gender: '',
    address: '',
    // Doctor specific
    specialization: '',
    experience: '',
    qualification: '',
    // Receptionist specific
    staffId: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roleConfigs = {
    patient: {
      title: 'Patient Registration',
      subtitle: 'Create your patient account to book appointments and track your visits.',
    },
    doctor: {
      title: 'Doctor Registration',
      subtitle: 'Register as a doctor to manage appointments and consultations.',
    },
    receptionist: {
      title: 'Receptionist Registration',
      subtitle: 'Create a receptionist account to manage appointments and patient queues.',
    },
  };

  const config = roleConfigs[role] || roleConfigs.patient;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    
    // Common fields validation
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!formData.email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validation
    if (role === 'patient') {
      if (!formData.age) {
        tempErrors.age = 'Age is required';
      } else if (Number(formData.age) <= 0 || Number(formData.age) > 120) {
        tempErrors.age = 'Please enter a valid age';
      }
      if (!formData.gender) tempErrors.gender = 'Gender selection is required';
      if (!formData.address.trim()) tempErrors.address = 'Address is required';
    }

    if (role === 'doctor') {
      if (!formData.specialization.trim()) tempErrors.specialization = 'Specialization is required';
      if (!formData.experience) {
        tempErrors.experience = 'Experience is required';
      } else if (Number(formData.experience) < 0) {
        tempErrors.experience = 'Experience cannot be negative';
      }
      if (!formData.qualification.trim()) tempErrors.qualification = 'Qualification is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login({ name: formData.fullName, email: formData.email, role });
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
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Registration Successful!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Your <strong className="text-slate-800 capitalize">{role}</strong> account has been created successfully. In a production system, you would be redirected to complete your profile.
          </p>
          <button
            onClick={() => onNavigate(`/${role}/login`)}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 px-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Go to Login
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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Common Fields */}
          <FormInput
            label="Full Name"
            id="fullName"
            name="fullName"
            required
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            icon={User}
            error={errors.fullName}
          />

          <FormInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            error={errors.email}
          />

          <FormInput
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+1 234 567 890"
            value={formData.phone}
            onChange={handleChange}
            icon={Phone}
            error={errors.phone}
            className="sm:col-span-2"
          />

          {/* Patient Specific Fields */}
          {role === 'patient' && (
            <>
              <FormInput
                label="Age"
                id="age"
                name="age"
                type="number"
                required
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                icon={Calendar}
                error={errors.age}
              />

              <FormInput
                label="Gender"
                id="gender"
                name="gender"
                type="select"
                required
                placeholder="Select Gender"
                value={formData.gender}
                onChange={handleChange}
                icon={Users}
                error={errors.gender}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ]}
              />

              <FormInput
                label="Address"
                id="address"
                name="address"
                required
                placeholder="123 Health Ave, Suite 4"
                value={formData.address}
                onChange={handleChange}
                icon={MapPin}
                error={errors.address}
                className="sm:col-span-2"
              />
            </>
          )}

          {/* Doctor Specific Fields */}
          {role === 'doctor' && (
            <>
              <FormInput
                label="Specialization"
                id="specialization"
                name="specialization"
                required
                placeholder="e.g. Cardiology"
                value={formData.specialization}
                onChange={handleChange}
                icon={Briefcase}
                error={errors.specialization}
              />

              <FormInput
                label="Years of Experience"
                id="experience"
                name="experience"
                type="number"
                required
                placeholder="e.g. 5"
                value={formData.experience}
                onChange={handleChange}
                icon={Award}
                error={errors.experience}
              />

              <FormInput
                label="Qualification"
                id="qualification"
                name="qualification"
                required
                placeholder="e.g. MBBS, MD"
                value={formData.qualification}
                onChange={handleChange}
                icon={GraduationCap}
                error={errors.qualification}
                className="sm:col-span-2"
              />
            </>
          )}

          {/* Receptionist Specific Fields */}
          {role === 'receptionist' && (
            <FormInput
              label="Hospital Staff ID (Optional)"
              id="staffId"
              name="staffId"
              placeholder="e.g. HOSP-REC-45"
              value={formData.staffId}
              onChange={handleChange}
              icon={FileText}
              error={errors.staffId}
              className="sm:col-span-2"
            />
          )}

          {/* Password Fields */}
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            error={errors.password}
          />

          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={Lock}
            error={errors.confirmPassword}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-light text-white py-3.5 px-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-8 text-center text-sm border-t border-slate-100 pt-6">
        <span className="text-slate-500">Already have an account? </span>
        <button
          onClick={() => onNavigate(`/${role}/login`)}
          className="font-bold text-primary hover:text-primary-dark transition-colors hover:underline cursor-pointer"
        >
          Login
        </button>
      </div>
    </AuthLayout>
  );
}
