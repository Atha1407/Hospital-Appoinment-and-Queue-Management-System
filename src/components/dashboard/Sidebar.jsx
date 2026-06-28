import React from 'react';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  CalendarClock, 
  Activity, 
  FileText, 
  User, 
  LogOut,
  Stethoscope,
  X
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
  { icon: CalendarPlus, label: 'Book Appointment', path: '/patient/select-appointment' },
  { icon: CalendarClock, label: 'My Appointments', path: '#' },
  { icon: Activity, label: 'Queue Status', path: '#' },
  { icon: FileText, label: 'Medical History', path: '#' },
  { icon: User, label: 'Profile', path: '#' },
];

export default function Sidebar({ isOpen, setIsOpen, onLogout, onNavigate, currentPath = '/patient/dashboard' }) {
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (window.innerWidth < 1024) setIsOpen(false);
    if (path !== '#' && onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">MedQueue</h1>
              <p className="text-xs text-gray-500 font-medium">Patient Portal</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col justify-between h-[calc(100vh-5rem)] py-6">
          <nav className="px-4 space-y-1.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={(e) => handleNavClick(e, item.path)}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'} transition-colors`} />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="px-4 border-t border-gray-50 pt-6">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors group"
            >
              <LogOut className="h-5 w-5 text-red-400 group-hover:text-red-600 transition-colors" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
