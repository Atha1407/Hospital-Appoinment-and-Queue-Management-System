import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoleSelection from './components/RoleSelection';
import MockLogin from './components/MockLogin';
import MockRegister from './components/MockRegister';
import { Hero, About, Features, HowItWorks, Services, Statistics, Testimonials, CTA } from './components/Sections';
import { AuthProvider } from './context/AuthProvider';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Router logic
  const renderRoute = () => {
    switch (currentPath) {
      case '/role-selection':
      case '/role-selection/login':
        return <RoleSelection mode="login" onNavigate={navigate} />;
      case '/role-selection/register':
        return <RoleSelection mode="register" onNavigate={navigate} />;
      case '/patient/login':
        return <MockLogin role="patient" onNavigate={navigate} />;
      case '/doctor/login':
        return <MockLogin role="doctor" onNavigate={navigate} />;
      case '/receptionist/login':
        return <MockLogin role="receptionist" onNavigate={navigate} />;
      case '/patient/register':
        return <MockRegister role="patient" onNavigate={navigate} />;
      case '/doctor/register':
        return <MockRegister role="doctor" onNavigate={navigate} />;
      case '/receptionist/register':
        return <MockRegister role="receptionist" onNavigate={navigate} />;
      default:
        // Default to landing page
        return (
          <div className="min-h-screen bg-white">
            <Navbar onNavigate={navigate} />
            <main>
              <Hero onNavigate={navigate} />
              <About />
              <Features />
              <HowItWorks />
              <Services />
              <Statistics />
              <Testimonials />
              <CTA onNavigate={navigate} />
            </main>
            <Footer />
          </div>
        );
    }
  };

  return renderRoute();
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


