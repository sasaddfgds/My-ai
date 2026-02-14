
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message, AISettings } from '../types';
import { chatWithHiki } from '../services/hikiApi';
import { translations } from '../constants/translations';

interface ChatInterfaceProps {
  settings: AISettings;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ settings }) => {
  const t = useMemo(() => translations[settings.language], [settings.language]);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: t.initialModelMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await chatWithHiki([...messages, userMessage], settings);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[60vh] md:h-[70vh] w-full border border-white/10 bg-black/90 backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(204,0,0,0.2)] transition-all">
      {/* Статус-бар */}
      <div className="px-4 md:px-8 py-4 flex justify-between items-center border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-[#cc0000] animate-ping"></div>
            <div className="w-2 h-2 bg-white/10"></div>
          </div>
          <span className="text-[9px] md:text-[11px] font-mono tracking-widest uppercase font-black text-white/90">{t.mushinState}</span>
        </div>
        <div className="hidden sm:block text-[8px] font-mono opacity-20 uppercase tracking-[0.5em]">Q&A_LINK_ACTIVE</div>
      </div>

      {/* Окно сообщений */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
          >
            <div className={`
              max-w-[95%] md:max-w-[80%]
              ${m.role === 'user' ? 'text-right' : 'text-left'}
            `}>
              <div className={`text-[7px] md:text-[9px] mb-3 uppercase tracking-[0.5em] font-black ${m.role === 'user' ? 'text-[#cc0000]' : 'text-white/30'}`}>
                {m.role === 'user' ? `[${t.directStrike}]` : `[${t.voidEcho}]`}
              </div>
              <p className={`
                text-sm md:text-xl leading-relaxed break-words font-medium
                ${m.role === 'user' ? 'text-white' : 'text-white/70 italic'}
              `}>
                {m.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-[10px] uppercase tracking-[1.2em] text-[#cc0000] animate-pulse font-black">
              {t.drawingSteel}
            </div>
          </div>
        )}
      </div>

      {/* Поле ввода */}
      <form onSubmit={handleSubmit} className="p-4 md:p-8 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row gap-4">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.enterVoid}
          className="flex-1 bg-transparent border-b-2 border-white/10 p-3 text-white focus:outline-none focus:border-[#cc0000] font-mono text-xs md:text-sm tracking-widest uppercase placeholder:opacity-10 transition-all"
        />
        <button 
          type="submit"
          className="w-full sm:w-auto px-12 py-4 bg-white text-black hover:bg-[#cc0000] hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.6em] disabled:opacity-50"
          disabled={isLoading}
        >
          {t.strike}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
