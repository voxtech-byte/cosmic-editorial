import { useState, useRef, useEffect, useCallback } from 'react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { MarkdownRenderer } from '@/shared/ui/MarkdownRenderer';
import { streamAIResponse } from '@/shared/lib/ai-gateway';
import { Send, Square, Bot, User, Sparkles, Cpu, Info } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTION_CHIPS = [
  'Apa itu orbit planet?',
  'Jelaskan rotasi bumi dalam Al-Qur\'an',
  'Bagaimana alam semesta mengembang?',
  'Apa hubungan sains dan agama?',
] as const;

/** AI Chat page - Fully Responsive Layout */
export function AsistenAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const handleSend = useCallback(async (text?: string) => {
    const userMessage = text || input.trim();
    if (!userMessage || isStreaming) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);
    setStreamingContent('');

    const controller = new AbortController();
    abortRef.current = controller;

    let fullResponse = '';

    await streamAIResponse(
      newMessages.map((m) => ({ role: m.role, content: m.content })),
      {
        onToken: (token) => {
          fullResponse += token;
          setStreamingContent(fullResponse);
        },
        onDone: () => {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: fullResponse },
          ]);
          setStreamingContent('');
          setIsStreaming(false);
          abortRef.current = null;
        },
        onError: (error) => {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: `⚠️ **Tidak dapat terhubung ke AI.**\n\n${error.message}\n\nSilakan periksa API key Anda.`,
            },
          ]);
          setStreamingContent('');
          setIsStreaming(false);
          abortRef.current = null;
        },
      },
      controller.signal
    );
  }, [input, isStreaming, messages]);

  const handleStop = useCallback(() => {
    abortRef.current?.abort();
    if (streamingContent) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: streamingContent + '\n\n*[Generasi dihentikan]*' },
      ]);
    }
    setStreamingContent('');
    setIsStreaming(false);
  }, [streamingContent]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="fixed inset-0 pt-16 md:pt-20 pb-0 bg-space-dark overflow-hidden">
      {/* Container: Full viewport, centered content area */}
      <div className="h-full w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row">
        
        {/* ── Main Chat Area ────────────────── */}
        <section className="flex-1 min-w-0 flex flex-col h-full relative">
          {/* Header - compact on mobile */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-[Space_Grotesk,sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tighter leading-none mb-2">
                  Asisten <span className="text-ai-accent">Falak</span>
                </h1>
                <p className="font-[Manrope,sans-serif] text-xs sm:text-sm text-text-muted hidden sm:block">
                  Sintesis AI terintegrasi kurikulum MTs Sains Algebra.
                </p>
              </div>
              {/* Toggle sidebar button - mobile/tablet only */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-text-primary transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <GlassCard className="flex-1 flex flex-col mx-2 sm:mx-4 lg:mx-6 mb-2 sm:mb-4 overflow-hidden border-ai-accent/10 md:shadow-[0_0_50px_-12px_rgba(var(--ai-accent-rgb),0.1)] min-h-0">
            {/* Messages Area - Scrollable */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 scrollbar-hide min-h-0"
            >
              {messages.length === 0 && !isStreaming && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-ai-accent/10 flex items-center justify-center mb-4 sm:mb-6 animate-pulse">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-ai-accent" />
                  </div>
                  <h3 className="font-[Space_Grotesk,sans-serif] text-lg sm:text-xl font-bold text-text-primary mb-2">
                    Siap Memulai Penyelidikan?
                  </h3>
                  <p className="font-[Manrope,sans-serif] text-xs sm:text-sm text-text-muted max-w-[260px] sm:max-w-xs leading-relaxed">
                    Ajukan pertanyaan seputar keterkaitan ayat Al-Qur'an dengan data sains antariksa.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`flex gap-2 sm:gap-3 w-auto max-w-[96%] sm:max-w-[88%] lg:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-science/20 text-science' : 'bg-ai-accent/20 text-ai-accent'
                    }`}>
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </div>
                    <div className={`px-3.5 py-3 sm:p-4 rounded-2xl break-words min-w-0 ${
                      msg.role === 'user' 
                        ? 'bg-surface-high border border-white/10 text-text-primary shadow-lg' 
                        : 'bg-surface-high/30 border border-ai-accent/20 text-text-primary/90'
                    }`}>
                      <div className="prose prose-invert prose-sm sm:prose-base max-w-none leading-relaxed text-[15px] sm:text-base">
                        <MarkdownRenderer content={msg.content} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isStreaming && streamingContent && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex gap-2 sm:gap-3 w-auto max-w-[96%] sm:max-w-[88%] lg:max-w-[80%]">
                    <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ai-accent/20 text-ai-accent flex items-center justify-center animate-pulse">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="px-3.5 py-3 sm:p-4 rounded-2xl bg-surface-high/30 border border-ai-accent/20 text-text-primary/90 break-words min-w-0">
                      <div className="prose prose-invert prose-sm sm:prose-base max-w-none leading-relaxed text-[15px] sm:text-base">
                        <MarkdownRenderer content={streamingContent} />
                      </div>
                      <span className="inline-block w-1.5 h-4 bg-ai-accent ml-1 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="p-3 sm:p-4 bg-surface-high/50 border-t border-white/5 flex-shrink-0">
              <div className="flex gap-2 sm:gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 min-w-0 bg-space-void/50 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-ai-accent/50 transition-colors"
                />
                {isStreaming ? (
                  <button
                    onClick={handleStop}
                    aria-label="Hentikan generasi"
                    className="shrink-0 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    aria-label="Kirim pertanyaan"
                    className="shrink-0 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-ai-accent text-space-dark hover:brightness-110 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
              
              {/* Suggestion Chips - Horizontal scroll on mobile if needed */}
              <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    disabled={isStreaming}
                    className="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-md sm:rounded-lg bg-white/5 border border-white/5 text-[10px] sm:text-xs text-text-muted hover:bg-white/10 hover:text-text-primary transition-all whitespace-nowrap"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* ── Sidebar ──────────────── */}
        {/* Desktop: Always visible. Mobile/Tablet: Toggleable overlay */}
        <aside className={`
          ${showSidebar ? 'fixed inset-0 z-50 lg:static lg:z-auto bg-space-dark/95 lg:bg-transparent' : 'hidden lg:block'}
          lg:w-[320px] xl:w-[360px] lg:flex-shrink-0 lg:sticky lg:top-20
          h-full lg:h-auto overflow-y-auto lg:overflow-visible overscroll-contain
        `}>
          <div className="min-h-full lg:min-h-0 p-4 sm:p-6 lg:p-4 lg:pr-6 lg:pt-6 space-y-4 lg:space-y-6 pb-20 lg:pb-0">
            {/* Close button - mobile/tablet only */}
            <div className="flex justify-end lg:hidden mb-2">
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-text-primary"
              >
                Tutup
              </button>
            </div>

            <GlassCard className="p-4 sm:p-6 lg:p-5 border-s-4 border-s-ai-accent">
              <h3 className="font-[Space_Grotesk,sans-serif] text-base lg:text-lg font-bold text-text-primary mb-4 lg:mb-5 flex items-center gap-2">
                <Cpu className="w-4 h-4 lg:w-5 lg:h-5 text-ai-accent" />
                Metodologi R&D
              </h3>
              
              <div className="space-y-4 lg:space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-10 lg:h-12 bg-ai-accent/20 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[10px] lg:text-xs font-bold text-text-dim uppercase tracking-wider mb-1">Infrastruktur</h4>
                    <p className="text-xs lg:text-sm text-text-primary font-mono truncate">Asus Vivobook (Prototype)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1 h-10 lg:h-12 bg-science/20 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[10px] lg:text-xs font-bold text-text-dim uppercase tracking-wider mb-1">Algoritma</h4>
                    <p className="text-xs lg:text-sm text-text-primary truncate">TF-IDF & Cosine Similarity</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-text-muted mb-2">
                    <span>AI Latency</span>
                    <span>98%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-ai-accent shadow-[0_0_15px_rgba(var(--ai-accent-rgb),0.4)]" />
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 lg:p-5 bg-science/5 border-science/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-24 h-24 lg:w-32 lg:h-32 bg-science/10 rounded-full blur-3xl group-hover:bg-science/20 transition-colors" />
              <h3 className="font-[Space_Grotesk,sans-serif] text-xs lg:text-sm font-bold text-science uppercase tracking-wider mb-3">
                Pilar Integratif STEM
              </h3>
              <p className="font-[Manrope,sans-serif] text-xs lg:text-sm text-text-muted leading-relaxed italic mb-4">
                "Menjembatani observasi empiris lembaga antariksa dengan kedalaman makna spiritual Ayat Kauniyah."
              </p>
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 bg-white/5 rounded text-[10px] font-bold text-text-dim">MTs Sains Algebra</div>
                <div className="w-1.5 h-1.5 rounded-full bg-science animate-pulse" />
              </div>
            </GlassCard>
          </div>
        </aside>

      </div>
    </main>
  );
}
