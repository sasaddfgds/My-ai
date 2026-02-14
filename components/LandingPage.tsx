
import React, { useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface LandingPageProps {
  onEnter: () => void;
  language: Language;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, language }) => {
  const t = useMemo(() => translations[language], [language]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="enso-circle w-[60vw] h-[60vw] animate-[pulse_4s_infinite] border-white/5"></div>
      <div className="enso-circle w-[90vw] h-[90vw] opacity-20 border-[#cc0000]"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      
      {/* Side Metadata Labels */}
      <div className="absolute top-12 left-12 flex flex-col items-start gap-4 opacity-40">
        <span className="text-[10px] font-mono tracking-[0.5em] text-[#cc0000]">STATUS: ARMED</span>
        <span className="text-[10px] font-mono tracking-[0.5em]">FREQ: 963HZ</span>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-6 opacity-60">
        <div className="w-[1px] h-32 bg-gradient-to-t from-white to-transparent"></div>
        <span className="vertical-scroll text-[10px] tracking-[1.5em] uppercase font-black text-white">
          {language === 'ru' ? 'ПРОТОКОЛ_ПУСТОТЫ' : 'VOID_PROTOCOL'}
        </span>
      </div>

      {/* Main Branding Section */}
      <div className="relative flex flex-col items-center">
        {/* Top Label */}
        <div className="mb-8 text-xs md:text-sm tracking-[2em] uppercase text-white/60 font-black animate-pulse">
          {t.ai}
        </div>
        
        {/* Massive Glitch HIKI */}
        <div className="relative group">
          <h1 
            className="glitch-text text-hiki text-[15rem] md:text-[28rem] leading-[0.8] text-white select-none filter drop-shadow-[0_0_100px_rgba(204,0,0,0.2)] transition-transform duration-700 group-hover:scale-105"
            data-text="HIKI"
          >
            HIKI
          </h1>
        </div>
        
        {/* Bottom Decorative text */}
        <div className="mt-8 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-[#cc0000]"></div>
          <div className="text-sm md:text-xl tracking-[1.5em] uppercase text-[#ff1a1a] font-black italic">
            {t.unseenBlade.replace(/\s+/g, '_').toUpperCase()}
          </div>
          <div className="w-12 h-[1px] bg-[#cc0000]"></div>
        </div>
      </div>

      {/* Primary Trigger */}
      <div className="mt-24 relative group">
        <button 
          onClick={onEnter}
          className="strike-btn"
        >
          {t.unsheathe}
        </button>
        {/* Excessive glow */}
        <div className="absolute -inset-10 bg-[#cc0000] blur-[120px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000"></div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-12 right-12 text-[10px] tracking-[1em] uppercase text-white font-bold opacity-30 flex items-center gap-8">
        <span>EST. RYUKYU_VOID_2025</span>
        <div className="w-24 h-[1px] bg-white/20"></div>
        <span className="font-mono text-[8px]">V.0.9928-ALPHA</span>
      </div>
    </div>
  );
};

export default LandingPage;
