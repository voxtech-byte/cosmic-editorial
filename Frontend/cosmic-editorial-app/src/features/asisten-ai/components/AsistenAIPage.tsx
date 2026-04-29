import { useState, useRef, useEffect, useCallback } from 'react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { MarkdownRenderer } from '@/shared/ui/MarkdownRenderer';
import { streamAIResponse } from '@/shared/lib/ai-gateway';
import { Send, Square, Bot, User, Sparkles, Cpu } from 'lucide-react';

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

/** AI Chat page with Asymmetric 7:5 Editorial Layout */
export function AsistenAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to bottom on new messages */
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  /* Handle message submission */
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

  /* Handle stop generation */
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
    <main className="pt-24 md:pt-32 pb-24 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        
        {/* ── Chat Section (7 Columns) ────────────────── */}
        <section className="md:col-span-7 flex flex-col h-[calc(100vh-200px)]">
          <div className="mb-8 scroll-reveal">
            <h1 className="font-[Space_Grotesk,sans-serif] text-3xl md:text-5xl font-bold text-text-primary tracking-tighter leading-none mb-4">
              Asisten <span className="text-ai-accent">Falak</span>
            </h1>
            <p className="font-[Manrope,sans-serif] text-sm text-text-muted">
              Sintesis kecerdasan buatan terintegrasi kurikulum MTs Sains Algebra.
            </p>
          </div>

          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-ai-accent/10 shadow-[0_0_50px_-12px_rgba(var(--ai-accent-rgb),0.1)]">
            {/* Conversation Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide"
            >
              {messages.length === 0 && !isStreaming && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-3xl bg-ai-accent/10 flex items-center justify-center mb-6 animate-pulse">
                    <Sparkles className="w-8 h-8 text-ai-accent" />
                  </div>
                  <h3 className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary mb-2">
                    Siap Memulai Penyelidikan?
                  </h3>
                  <p className="font-[Manrope,sans-serif] text-sm text-text-muted max-w-xs leading-relaxed">
                    Ajukan pertanyaan seputar keterkaitan ayat Al-Qur'an dengan data sains antariksa terbaru.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                >
                  <div className={`flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-science/20 text-science' : 'bg-ai-accent/20 text-ai-accent'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-surface-high border border-white/5 text-text-primary shadow-lg' 
                        : 'bg-space-void/40 border border-ai-accent/10 text-text-muted shadow-inner'
                    }`}>
                      <MarkdownRenderer content={msg.content} />
                    </div>
                  </div>
                </div>
              ))}

              {isStreaming && streamingContent && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%]">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-ai-accent/20 text-ai-accent flex items-center justify-center animate-pulse">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-space-void/40 border border-ai-accent/10 text-text-muted">
                      <MarkdownRenderer content={streamingContent} />
                      <span className="inline-block w-1.5 h-4 bg-ai-accent ml-1 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface-high/50 border-t border-white/5">
              <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 bg-space-void/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-ai-accent/50 transition-colors"
                />
                {isStreaming ? (
                  <button
                    onClick={handleStop}
                    aria-label="Hentikan generasi"
                    className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Square className="w-5 h-5 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    aria-label="Kirim pertanyaan"
                    className="p-3 rounded-xl bg-ai-accent text-space-dark hover:brightness-110 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    disabled={isStreaming}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-text-muted hover:bg-white/10 hover:text-text-primary transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* ── Research Panel (5 Columns) ──────────────── */}
        <aside className="md:col-span-5 space-y-6 scroll-reveal md:mt-24">
          <GlassCard className="p-8 border-s-4 border-s-ai-accent">
            <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-ai-accent" />
              Metodologi R&D
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-ai-accent/20 rounded-full" />
                <div>
                  <h4 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-1">Infrastruktur Komputasi</h4>
                  <p className="text-sm text-text-primary font-mono">Asus Vivobook (Prototype Environment)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-science/20 rounded-full" />
                <div>
                  <h4 className="text-xs font-bold text-text-dim uppercase tracking-widest mb-1">Algoritma Pemrosesan</h4>
                  <p className="text-sm text-text-primary">TF-IDF & Cosine Similarity Synthesis</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">
                  <span>AI Latency & Reliability</span>
                  <span>98%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-ai-accent shadow-[0_0_15px_rgba(var(--ai-accent-rgb),0.4)]" />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 bg-science/5 border-science/10 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-science/10 rounded-full blur-3xl group-hover:bg-science/20 transition-colors" />
            <h3 className="font-[Space_Grotesk,sans-serif] text-sm font-bold text-science uppercase tracking-widest mb-4">
              Pilar Integratif STEM
            </h3>
            <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed italic mb-6">
              "Asisten Falak dirancang untuk menjembatani observasi empiris lembaga antariksa (NASA/ESA) dengan kedalaman makna spiritual Ayat Kauniyah."
            </p>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-white/5 rounded-md text-[10px] font-bold text-text-dim">MTs Sains Algebra</div>
              <div className="w-1.5 h-1.5 rounded-full bg-science animate-pulse" />
            </div>
          </GlassCard>
        </aside>

      </div>
    </main>
  );
}
