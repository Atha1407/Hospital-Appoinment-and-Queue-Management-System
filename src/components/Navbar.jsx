import React, { useState, useEffect, useRef } from 'react';
import { Activity, Menu, X, ChevronDown, User, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar({ onNavigate }) {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initials generator
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('/')}>
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-slate-800 tracking-tight">CareQueue</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-600 hover:text-primary transition-colors font-medium">Home</a>
            <a href="#about" className="text-slate-600 hover:text-primary transition-colors font-medium">About Us</a>
            <a href="#services" className="text-slate-600 hover:text-primary transition-colors font-medium">Services</a>
            <a href="#contact" className="text-slate-600 hover:text-primary transition-colors font-medium">Contact</a>
          </div>

          {/* Right Action buttons / Profile Dropdown */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center shadow-sm border-2 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                    {getInitials(user.name)}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 origin-top-right"
                    >
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize mt-0.5 font-medium">{user.role}</p>
                      </div>
                      <div className="py-1.5">
                        <button
                          onClick={() => { setIsDropdownOpen(false); onNavigate('/profile'); }}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left font-medium"
                        >
                          <User className="h-4 w-4 mr-3 text-slate-400" />
                          My Profile
                        </button>
                        <button
                          onClick={() => { setIsDropdownOpen(false); onNavigate(`/${user.role}/dashboard`); }}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left font-medium"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-3 text-slate-400" />
                          <span className="capitalize">{user.role} Dashboard</span>
                        </button>
                        <button
                          onClick={() => { setIsDropdownOpen(false); onNavigate('/settings'); }}
                          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-left font-medium"
                        >
                          <Settings className="h-4 w-4 mr-3 text-slate-400" />
                          Settings
                        </button>
                      </div>
                      <div className="border-t border-slate-50 pt-1.5 mt-1.5">
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            logout();
                            onNavigate('/');
                          }}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-semibold cursor-pointer"
                        >
                          <LogOut className="h-4 w-4 mr-3 text-red-500" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onNavigate('/role-selection/login')}
                  className="text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigate('/role-selection/register')}
                  className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-3">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-md font-medium">Home</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-md font-medium">About Us</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-md font-medium">Services</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-md font-medium">Contact</a>
            
            <div className="border-t pt-4 mt-2">
              {user ? (
                <div className="px-3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary text-white font-bold flex items-center justify-center shadow-md">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate('/profile');
                      }}
                      className="flex items-center w-full px-3 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg text-left text-sm font-medium transition-colors"
                    >
                      <User className="h-4 w-4 mr-3 text-slate-400" />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate(`/${user.role}/dashboard`);
                      }}
                      className="flex items-center w-full px-3 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg text-left text-sm font-medium transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-3 text-slate-400" />
                      <span className="capitalize">{user.role} Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate('/settings');
                      }}
                      className="flex items-center w-full px-3 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg text-left text-sm font-medium transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-3 text-slate-400" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                        onNavigate('/');
                      }}
                      className="flex items-center w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-left text-sm font-bold transition-colors mt-2 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-3 text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 px-3">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('/role-selection/login');
                    }}
                    className="w-full text-center text-primary font-medium py-2 cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate('/role-selection/register');
                    }}
                    className="w-full bg-primary text-white px-5 py-3 rounded-md font-medium cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
