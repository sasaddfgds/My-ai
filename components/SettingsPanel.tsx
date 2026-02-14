
import React, { useMemo } from 'react';
import { AISettings, Personality } from '../types';
import { translations } from '../constants/translations';

interface SettingsPanelProps {
  settings: AISettings;
  setSettings: React.Dispatch<React.SetStateAction<AISettings>>;
}

const PERSONALITIES: Personality[] = ['Aggressive', 'Friendly', 'Mysterious', 'Robotic', 'Chaos'];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  const t = useMemo(() => translations[settings.language], [settings.language]);

  return (
    <div className="w-full space-y-10">
      <section>
        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.6em] mb-6 border-l-2 border-[#cc0000] pl-3">
          {t.bladeStance}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {PERSONALITIES.map(p => (
            <button
              key={p}
              onClick={() => setSettings(prev => ({ ...prev, personality: p }))}
              className={`
                text-left text-[9px] py-2 px-3 uppercase tracking-widest border transition-all
                ${settings.personality === p 
                  ? 'border-white text-black bg-white font-black' 
                  : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white'
                }
              `}
            >
              {t.personalities[p]}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.6em] mb-6 border-l-2 border-[#cc0000] pl-3">
          {t.innerEntropy}
        </h3>
        <div className="px-1">
          <input 
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
            className="w-full h-[1px] bg-white/20 appearance-none rounded-none cursor-pointer accent-[#cc0000]"
          />
          <div className="flex justify-between text-[7px] mt-3 opacity-40 uppercase tracking-widest font-mono">
            <span>{t.calm}</span>
            <span className="text-white/10">{settings.temperature.toFixed(1)}</span>
            <span>{t.fury}</span>
          </div>
        </div>
      </section>

      <div className="pt-4 border-t border-white/5">
        <div className="text-[6px] text-white/20 uppercase tracking-[0.5em] mb-1 leading-relaxed">
          {t.voidProtocol}: <span className="text-white/40">RX-992-STRIKE</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
