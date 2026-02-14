
import React, { useState, useMemo } from 'react';
import StarField from './components/StarField';
import SakuraField from './components/SakuraField';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';
import { AISettings, Language } from './types';
import { translations } from './constants/translations';

const App: React.FC = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [language, setLanguage] = useState<Language>('ru'); // По умолчанию русский
  
  const t = useMemo(() => translations[language], [language]);

  const [settings, setSettings] = useState<AISettings>({
    personality: 'Mysterious',
    temperature: 0.8,
    maxTokens: 1024,
    systemInstruction: translations[language].systemBase,
    language: language
  });

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ru' : 'en';
    setLanguage(nextLang);
    setSettings(prev => ({ 
      ...prev, 
      language: nextLang,
      systemInstruction: translations[nextLang].systemBase 
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white overflow-x-hidden selection:bg-[#cc0000] selection:text-white">
      <StarField active={isEntered} />
      <SakuraField />

      {/* Переключатель языка */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="flex gap-2">
          {['EN', 'RU'].map(l => (
            <button 
              key={l}
              onClick={() => l.toLowerCase() !== language && toggleLanguage()}
              className={`text-[10px] font-black px-3 py-1 border transition-all ${language === l.toLowerCase() ? 'border-white bg-white text-black' : 'border-white/10 text-white/30 hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {!isEntered ? (
        <LandingPage onEnter={() => setIsEntered(true)} language={language} />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen items-center p-4 md:p-12 max-w-[1500px] mx-auto animate-in fade-in duration-1000">
          
          <header className="w-full flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-white/10 pb-8 gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-[9px] tracking-[1.2em] uppercase text-[#cc0000] font-black mb-3 animate-pulse">SYSTEM_RYUKYU: ARMED</div>
              <h1 className="text-hiki text-7xl md:text-9xl leading-none">HIKI</h1>
            </div>
            
            <button 
              onClick={() => setIsEntered(false)}
              className="group flex flex-col items-center md:items-end gap-3"
            >
              <span className="text-[10px] uppercase tracking-[0.6em] font-black opacity-40 group-hover:opacity-100 transition-opacity">{t.sheathe}</span>
              <div className="w-20 h-[2px] bg-white/20 group-hover:bg-[#cc0000] group-hover:w-40 transition-all duration-500"></div>
            </button>
          </header>

          <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 flex-1">
            <div className="lg:col-span-8 xl:col-span-9 order-1">
              <ChatInterface settings={settings} />
            </div>
            <aside className="lg:col-span-4 xl:col-span-3 order-2 space-y-10">
              <div className="p-8 border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-2xl">
                <SettingsPanel settings={settings} setSettings={setSettings} />
              </div>
              
              <div className="hidden lg:block space-y-4 opacity-10 font-mono text-[7px] tracking-[0.5em] uppercase leading-relaxed">
                <p># Security: VOID_CRYPTO_V2</p>
                <p># Kernel: NEURAL_HIKI_0.9</p>
                <p># State: MUSHIN_ACTIVE</p>
                <div className="h-[1px] w-full bg-white/20"></div>
                <p>Connection: SECURE_GROQ_TUNNEL</p>
              </div>
            </aside>
          </main>

          <footer className="mt-16 w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[9px] font-black tracking-[1.5em] uppercase pb-12">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-[#cc0000] animate-ping"></div>
              <span>{t.bushidoApplied}</span>
            </div>
            <span>{t.estYear}</span>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
