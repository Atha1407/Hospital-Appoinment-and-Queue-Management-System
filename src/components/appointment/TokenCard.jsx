import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

export default function TokenCard({ token = 'A-015', currentToken = 'A-009', estimatedWait = '20 Minutes' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative overflow-hidden rounded-3xl p-8 text-white"
      style={{
        background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #0891b2 100%)',
        boxShadow: '0 24px 60px rgba(37,99,235,0.35)',
      }}
    >
      {/* Decorative bubbles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="relative z-10">
        {/* Live indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400" />
          </span>
          <span className="text-xs font-semibold text-blue-100 uppercase tracking-widest">Live Queue</span>
        </div>

        {/* YOUR TOKEN */}
        <p className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-1">Your Token</p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 120 }}
          className="text-7xl md:text-8xl font-black tracking-tight mb-6 leading-none"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
        >
          {token}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-5" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-blue-200 font-medium mb-1">Current Token</p>
            <p className="text-2xl font-black">{currentToken}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-blue-200" />
              <p className="text-xs text-blue-200 font-medium">Est. Wait</p>
            </div>
            <p className="text-2xl font-black">{estimatedWait}</p>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-5 flex items-start gap-2.5 bg-white/10 rounded-xl p-3.5 border border-white/10">
          <Zap className="h-4 w-4 text-yellow-300 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-100 leading-relaxed">
            Head to the hospital reception and show this token number. You'll receive an SMS notification before your turn.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
