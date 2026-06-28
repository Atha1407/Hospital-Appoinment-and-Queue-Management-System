import React from 'react';
import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';

// Generates a realistic-looking QR code using SVG rectangles
function DummyQRSVG({ size = 160 }) {
  // Deterministic pattern that looks like a real QR
  const modules = 21;
  const cellSize = size / modules;

  // Corner square helper
  const CornerSquare = ({ x, y }) => (
    <>
      {/* Outer border */}
      <rect x={x} y={y} width={7 * cellSize} height={7 * cellSize} fill="none" stroke="#1e3a5f" strokeWidth={cellSize} />
      {/* Inner dot */}
      <rect x={x + 2 * cellSize} y={y + 2 * cellSize} width={3 * cellSize} height={3 * cellSize} fill="#1e3a5f" />
    </>
  );

  // A hand-crafted but realistic inner pattern
  const dots = [
    // Center column strip
    [3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[3,13],
    [5,7],[5,9],[5,11],[5,13],
    [7,3],[7,5],[7,7],[7,9],[7,11],[7,13],[7,15],[7,17],[7,19],
    [8,3],[8,8],[8,10],[8,14],[8,18],
    [9,3],[9,4],[9,7],[9,11],[9,13],[9,16],[9,19],
    [10,5],[10,8],[10,10],[10,12],[10,17],
    [11,3],[11,6],[11,9],[11,11],[11,14],[11,16],[11,19],
    [12,3],[12,5],[12,8],[12,13],[12,15],[12,18],
    [13,3],[13,4],[13,7],[13,9],[13,10],[13,12],[13,19],
    [14,6],[14,10],[14,14],[14,16],
    [15,3],[15,5],[15,8],[15,11],[15,13],[15,17],[15,19],
    [16,4],[16,7],[16,10],[16,12],[16,14],[16,18],
    [17,3],[17,5],[17,9],[17,11],[17,15],[17,17],[17,19],
    [18,4],[18,6],[18,8],[18,12],[18,16],
    [19,3],[19,7],[19,10],[19,13],[19,15],[19,17],[19,19],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" rx="4" />
      {/* Corner squares */}
      <CornerSquare x={cellSize} y={cellSize} />
      <CornerSquare x={(modules - 8) * cellSize} y={cellSize} />
      <CornerSquare x={cellSize} y={(modules - 8) * cellSize} />

      {/* Inner data dots */}
      {dots.map(([row, col], i) => (
        <rect
          key={i}
          x={col * cellSize}
          y={row * cellSize}
          width={cellSize * 0.85}
          height={cellSize * 0.85}
          fill="#1e3a5f"
          rx={1}
        />
      ))}
    </svg>
  );
}

export default function QRCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-white border border-gray-100 shadow-lg h-full"
    >
      <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
        <DummyQRSVG size={160} />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-1.5 text-blue-600">
          <Scan className="h-4 w-4" />
          <p className="text-sm font-semibold">Scan at Hospital Reception</p>
        </div>
        <p className="text-xs text-gray-400">Valid for this appointment only</p>
      </div>
    </motion.div>
  );
}
