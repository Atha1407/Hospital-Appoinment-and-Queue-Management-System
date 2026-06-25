import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Hospital, Users, ShieldCheck, Stethoscope, ArrowRight, UserPlus, CheckCircle2, Star, Quote, Activity } from 'lucide-react';

export const Hero = ({ onNavigate }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-teal-50/90" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Modernizing Healthcare Access
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Smarter Hospital Appointments. <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Shorter Waiting Times.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your hospital visits with our intelligent digital platform. Book appointments instantly, track your queue status in real-time, and get the care you need without the wait.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => onNavigate('/role-selection/login')}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
              >
                Get Appointment <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a 
                href="#about"
                className="w-full sm:w-auto text-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Learn More
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Doctor with patient" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center space-x-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Queue Status</p>
                <p className="text-lg font-bold text-slate-800">Your turn is next!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Bridging the Gap Between Patients and Care</h3>
          <p className="text-lg text-slate-600">We provide a seamless platform that empowers patients to manage their health journey while optimizing hospital workflows for better service delivery.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "For Patients", desc: "Skip the waiting room. Book appointments online, receive real-time queue updates, and arrive exactly when it's your turn.", icon: <Users className="h-8 w-8 text-blue-500" /> },
            { title: "For Doctors", desc: "Manage your daily schedule efficiently. View upcoming patient details and minimize no-shows with automated reminders.", icon: <Stethoscope className="h-8 w-8 text-teal-500" /> },
            { title: "For Hospitals", desc: "Streamline operations and reduce front-desk congestion. Improve overall patient satisfaction and facility throughput.", icon: <Hospital className="h-8 w-8 text-indigo-500" /> }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-white w-16 h-16 rounded-xl shadow-sm flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  const features = [
    { title: "Online Appointment Booking", desc: "Schedule visits 24/7 with your preferred doctors across multiple departments.", icon: <Calendar className="h-6 w-6" /> },
    { title: "Smart Queue Management", desc: "Real-time tracking of your position in the queue, reducing physical wait times.", icon: <Clock className="h-6 w-6" /> },
    { title: "Multiple Hospital Support", desc: "Access services from a wide network of partner hospitals from a single account.", icon: <Hospital className="h-6 w-6" /> },
    { title: "Secure Patient Records", desc: "Your medical history and prescriptions are encrypted and stored securely.", icon: <ShieldCheck className="h-6 w-6" /> },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Core Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Everything you need for a stress-free hospital visit</h3>
            <p className="text-lg text-slate-600 mb-8">
              Our comprehensive suite of tools is designed to eliminate the friction from healthcare access. From the moment you feel unwell to your doctor consultation.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-primary shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 absolute -inset-4 blur-3xl z-0" />
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical interface" 
              className="relative z-10 rounded-2xl shadow-2xl border border-white/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Register/Login", desc: "Create a free account to get started.", icon: <UserPlus className="h-6 w-6" /> },
    { num: "02", title: "Choose Hospital", desc: "Select from our network of facilities.", icon: <Hospital className="h-6 w-6" /> },
    { num: "03", title: "Book Appointment", desc: "Pick a convenient date and time.", icon: <Calendar className="h-6 w-6" /> },
    { num: "04", title: "Track Queue", desc: "Monitor your turn in real-time.", icon: <Clock className="h-6 w-6" /> },
    { num: "05", title: "Visit Doctor", desc: "Arrive just in time for your consultation.", icon: <Stethoscope className="h-6 w-6" /> },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600">Five simple steps to a better healthcare experience.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-100 z-0"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-md flex items-center justify-center mb-6 relative group transition-all hover:border-primary">
                <div className="text-slate-400 group-hover:text-primary transition-colors">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  {step.num}
                </div>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{step.title}</h4>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Healthcare Management</h3>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 border border-slate-700 hover:border-primary hover:text-primary transition-colors rounded-full text-sm font-medium">
            View All Services
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Appointment Scheduling", desc: "Automated booking system with calendar integration and conflict resolution." },
            { title: "Queue Tracking", desc: "Live display of current serving numbers and estimated wait times." },
            { title: "Hospital Management", desc: "Backend dashboard for administrators to monitor patient flow and staff." },
            { title: "Patient Records", desc: "Centralized database for prescriptions, test results, and medical history." }
          ].map((service, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
              <div className="w-12 h-12 bg-slate-700 rounded-xl mb-6 flex items-center justify-center text-primary">
                <Activity className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">{service.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Statistics = () => {
  const stats = [
    { value: "50+", label: "Hospitals Connected" },
    { value: "500+", label: "Expert Doctors" },
    { value: "100k+", label: "Patients Served" },
    { value: "250k+", label: "Appointments Managed" },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const reviews = [
    { quote: "I used to spend hours waiting to see my cardiologist. With CareQueue, I arrive 10 minutes before my actual turn. It's life-changing.", author: "Sarah Jenkins", role: "Patient" },
    { quote: "The dashboard is incredibly intuitive. It has reduced our front-desk workload by 40% and improved our daily patient throughput significantly.", author: "Dr. Michael Chen", role: "Hospital Administrator" },
    { quote: "I love being able to track my queue status from my phone while having a coffee nearby instead of sitting in a crowded waiting room.", author: "David Thompson", role: "Patient" },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What People Say</h2>
          <p className="text-lg text-slate-600">Trusted by thousands of patients and healthcare providers.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-8 h-8 w-8 text-blue-50" />
              <div className="flex space-x-1 mb-6">
                {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />)}
              </div>
              <p className="text-slate-600 italic mb-6 relative z-10">"{review.quote}"</p>
              <div>
                <h4 className="font-bold text-slate-900">{review.author}</h4>
                <p className="text-sm text-slate-500">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTA = ({ onNavigate }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to simplify your hospital visits?</h2>
        <p className="text-xl text-slate-300 mb-10">Join thousands of users who have transformed their healthcare experience. Register today for free.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={() => onNavigate('/role-selection/register')}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            Get Started Now
          </button>
          <a 
            href="mailto:sales@carequeue.com"
            className="w-full sm:w-auto text-center px-8 py-4 bg-transparent border border-slate-600 hover:border-white text-white rounded-full font-bold text-lg transition-all cursor-pointer"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};
