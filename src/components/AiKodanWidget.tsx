import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Globe,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface AiKodanWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenBooking: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isEmergency?: boolean;
  timestamp: string;
  suggestedActions?: { label: string; actionType: string; payload?: string }[];
}

export const AiKodanWidget: React.FC<AiKodanWidgetProps> = ({
  isOpen,
  onToggle,
  onNavigateTab,
  onOpenBooking,
}) => {
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const initialWelcome =
    language === 'te'
      ? 'నమస్కారం! KODON HEALTHCAREకి స్వాగతం. నేను AI KODAN, మీ వ్యక్తిగత ఆరోగ్య గైడ్. డయాగ్నస్టిక్ పరీక్షల వివరాలు, ల్యాబ్ రిపోర్టుల వివరణ, ధృవీకరించిన ధరల పోలిక మరియు హోమ్ కలెక్షన్ బుకింగ్‌లో నేను మీకు సహాయపడగలను. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?'
      : "Namaste! Welcome to KODON HEALTHCARE. I'm AI KODAN, your personal healthcare guide. I can help you understand diagnostic tests, explore available services, compare verified prices, explain laboratory reports, and book appointments. How can I help you today?";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: initialWelcome,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Update initial message when language toggles if user hasn't chatted yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([
        {
          id: 'init-1',
          role: 'assistant',
          content:
            language === 'te'
              ? 'నమస్కారం! KODON HEALTHCAREకి స్వాగతం. నేను AI KODAN, మీ వ్యక్తిగత ఆరోగ్య గైడ్. డయాగ్నస్టిక్ పరీక్షల వివరాలు, ల్యాబ్ రిపోర్టుల వివరణ, ధృవీకరించిన ధరల పోలిక మరియు హోమ్ కలెక్షన్ బుకింగ్‌లో నేను మీకు సహాయపడగలను. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?'
              : "Namaste! Welcome to KODON HEALTHCARE. I'm AI KODAN, your personal healthcare guide. I can help you understand diagnostic tests, explore available services, compare verified prices, explain laboratory reports, and book appointments. How can I help you today?",
          timestamp: 'Just now',
        },
      ]);
    }
  }, [language]);

  const suggestedPrompts = [
    { en: 'Explain my blood test report', te: 'నా రక్త పరీక్ష నివేదికను వివరించండి' },
    { en: 'Which tests should I discuss with my doctor?', te: 'నేను డాక్టర్‌తో ఏ పరీక్షల గురించి చర్చించాలి?' },
    { en: 'Compare CBC test prices', te: 'CBC పరీక్ష ధరలను సరిపోల్చండి' },
    { en: 'Explain kidney function tests', te: 'కిడ్నీ ఫంక్షన్ పరీక్షలను వివరించండి' },
    { en: 'Book a doctor consultation', te: 'డాక్టర్ సంప్రదింపులను బుక్ చేయండి' },
    { en: 'Help me schedule my next test', te: 'హోమ్ బ్లడ్ టెస్ట్ షెడ్యూల్ చేయండి' },
  ];

  // Speech Recognition
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported on your current browser. You can type your question directly.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Text-To-Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || !speechEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        isEmergency: data.isEmergency,
        suggestedActions: data.suggestedActions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (speechEnabled) {
        speakText(data.reply);
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content:
          language === 'te'
            ? 'క్షమించండి, సర్వర్ కనెక్టివిటీలో తాత్కాలిక సమస్య ఉంది. మా మెడికల్ హెల్ప్‌లైన్ +91 8333821121 లో నేరుగా సంప్రదించవచ్చు.'
            : 'Temporary connectivity delay. You can also reach our Hyderabad medical desk directly at +91 83338 21121 or kodonhealthcare@gmail.com.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action: { label: string; actionType: string; payload?: string }) => {
    if (action.actionType === 'emergency_call') {
      window.location.href = `tel:${action.payload || '108'}`;
    } else if (action.actionType === 'open_booking') {
      onOpenBooking();
    } else if (action.actionType === 'navigate' && action.payload) {
      onNavigateTab(action.payload);
    } else if (action.actionType === 'add_test' && action.payload) {
      onNavigateTab('diagnostics');
    } else if (action.actionType === 'view_package') {
      onNavigateTab('packages');
    }
  };

  return (
    <>
      {/* Floating Concierge Button */}
      <div className="fixed bottom-6 right-22 z-40">
        <button
          onClick={onToggle}
          className="relative flex items-center gap-2 bg-[#087F8C] hover:bg-[#066570] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer ring-2 ring-white/60"
          aria-label="Open AI KODAN Healthcare Guide"
        >
          <Bot className="w-5 h-5" />
          <span className="text-xs font-bold whitespace-nowrap">AI KODAN</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      </div>

      {/* Slide-Up / Floating Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-105 h-[620px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-[#10243A] p-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#087F8C] to-[#13A879] flex items-center justify-center text-white font-bold shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm tracking-tight">AI KODAN</h3>
                  <span className="text-[10px] bg-[#087F8C] px-1.5 py-0.2 rounded font-semibold">
                    Clinical Guide
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Hyderabad Healthcare Guide · Not a Doctor</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage((prev) => (prev === 'en' ? 'te' : 'en'))}
                title="Switch Language (English / Telugu)"
                className="px-2 py-1 text-[11px] font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'EN | తె' : 'తె | EN'}</span>
              </button>

              {/* Text-To-Speech Toggle */}
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                title={speechEnabled ? 'Mute AI Voice' : 'Enable AI Voice (TTS)'}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                {speechEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close button */}
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close AI KODAN"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Safety Banner */}
          <div className="bg-slate-50 px-3.5 py-1.5 border-b border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Educational guidance only · Not a replacement for a clinician</span>
            <a href="tel:8333821121" className="text-[#087F8C] font-bold hover:underline">
              8333821121
            </a>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F4F8FB]/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isAssistant
                        ? 'bg-[#087F8C] text-white shadow-xs'
                        : 'bg-[#10243A] text-white'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[85%] space-y-2`}>
                    {msg.isEmergency && (
                      <div className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-900 text-xs flex items-start gap-2 shadow-xs">
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">URGENT MEDICAL NOTICE</p>
                          <p className="text-[11px] mt-0.5 leading-snug">{msg.content}</p>
                          <a
                            href="tel:108"
                            className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-rose-600 text-white rounded-lg text-[11px] font-bold shadow-xs hover:bg-rose-700"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Call 108 Ambulance</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {!msg.isEmergency && (
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isAssistant
                            ? 'bg-white text-slate-800 border border-slate-200/80 shadow-xs'
                            : 'bg-[#10243A] text-white'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    )}

                    {/* Action buttons if available */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(action)}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{action.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-[10px] text-slate-400 ${
                        isAssistant ? 'text-left' : 'text-right'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 max-w-[70%] text-xs text-slate-500">
                <RefreshCw className="w-4 h-4 text-[#087F8C] animate-spin" />
                <span>AI KODAN is synthesizing medical guidance...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Strip */}
          <div className="p-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {suggestedPrompts.map((sp, idx) => {
              const label = language === 'te' ? sp.te : sp.en;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(label)}
                  className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium border border-slate-200/80 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-[#087F8C] focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    language === 'te'
                      ? 'మీ ఆరోగ్య సమస్య లేదా రక్త పరీక్ష గురించి అడగండి...'
                      : 'Ask about tests, symptoms, reports, or Hyderabad booking...'
                  }
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs text-slate-800 bg-transparent focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleVoiceInput}
                  title="Voice input"
                  className={`absolute right-2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-2xl bg-[#087F8C] hover:bg-[#066570] disabled:bg-slate-200 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Verified AI Medical Guide · Hyderabad</span>
              <a href="tel:8333821121" className="hover:text-slate-600">
                Support: 8333821121
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
