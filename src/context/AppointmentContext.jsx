import React, { createContext, useContext, useState } from 'react';

export const AppointmentContext = createContext(null);

export function useAppointment() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointment must be used within AppointmentProvider');
  return ctx;
}

export function AppointmentProvider({ children }) {
  // Step 1 selections
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  // Confirmed appointment details
  const [bookedAppointment, setBookedAppointment] = useState(null);

  // Dashboard banner
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const confirmAppointment = (details) => {
    setBookedAppointment(details);
    setShowSuccessBanner(true);
  };

  const dismissBanner = () => setShowSuccessBanner(false);

  const resetFlow = () => {
    setSelectedSpecialization('');
    setSelectedHospital('');
  };

  return (
    <AppointmentContext.Provider
      value={{
        selectedSpecialization,
        setSelectedSpecialization,
        selectedHospital,
        setSelectedHospital,
        bookedAppointment,
        confirmAppointment,
        showSuccessBanner,
        dismissBanner,
        resetFlow,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
