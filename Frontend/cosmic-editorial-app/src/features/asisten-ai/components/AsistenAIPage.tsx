import { useState, useRef, useEffect, useCallback } from 'react';
import { GlassCard } from '@/shared/ui/GlassCard';
import { MarkdownRenderer } from '@/shared/ui/MarkdownRenderer';
import { streamAIResponse } from '@/shared/lib/ai-gateway';
import { Send, Square, Bot, User, ChevronDown, Sparkles } from 'lucide-react';

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

/** AI Chat page with fixed-height scrollable conversation container */
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
              content: `⚠️ **Tidak dapat terhubung ke AI.**\n\n${error.message}\n\nSilakan periksa API key Anda di file \`.env.local\` atau coba provider lain.`,
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
    <main className="pt-24 md:pt-32 pb-32 px-page max-w-[1000px] mx-auto w-full">
      {/* Atmospheric Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] inset-s-[30%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="mb-6 md:mb-8">
        <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
          Asisten AI
        </h1>
        <p className="font-[Manrope,sans-serif] text-sm text-text-muted mt-1">
          Tanyakan tentang fenomena antariksa & integrasinya dengan nilai Islam
        </p>
      </header>

      {/* ── Chat Container (FIXED HEIGHT, SCROLLABLE) ── */}
      <GlassCard className="p-0 flex flex-col h-[60vh] md:h-[65vh]">
        {/* Message Area — scrollable */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto chat-scroll p-4 md:p-6 space-y-4"
        >
          {/* Empty State */}
          {messages.length === 0 && !streamingContent && (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-science/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-science" />
              </div>
              <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-text-primary mb-2">
                Falak — Asisten Sains & Agama
              </h3>
              <p className="font-[Manrope,sans-serif] text-sm text-text-muted max-w-md mb-6">
                Halo! Saya Falak, asisten cerdas untuk siswa Kelas VIII <strong>MTs Sains Algebra</strong>. Mari eksplorasi antariksa menggunakan pendekatan STEM dan Ayat Kauniyah.
              </p>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="px-4 py-2 text-xs font-[Manrope,sans-serif] text-text-muted border border-border rounded-full hover:border-science/30 hover:text-science transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-science/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-science" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-science/15 text-text-primary rounded-ee-sm'
                    : 'bg-surface-high/50 rounded-es-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <MarkdownRenderer content={msg.content} />
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-reflection/10 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-reflection" />
                </div>
              )}
            </div>
          ))}

          {/* Streaming Bubble */}
          {isStreaming && streamingContent && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-science/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-science animate-pulse-glow" />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-es-sm px-4 py-3 bg-surface-high/50">
                <MarkdownRenderer content={streamingContent} />
              </div>
            </div>
          )}

          {/* Thinking Skeleton */}
          {isStreaming && !streamingContent && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-science/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-science animate-pulse-glow" />
              </div>
              <div className="rounded-2xl rounded-es-sm px-4 py-3 bg-surface-high/50">
                <div className="flex items-center gap-2 text-sm text-text-dim">
                  <span className="inline-block w-2 h-2 rounded-full bg-science animate-bounce [animation-delay:0ms]" />
                  <span className="inline-block w-2 h-2 rounded-full bg-science animate-bounce [animation-delay:150ms]" />
                  <span className="inline-block w-2 h-2 rounded-full bg-science animate-bounce [animation-delay:300ms]" />
                  <span className="ms-2 text-xs font-[Space_Grotesk,sans-serif]">
                    Falak sedang meramu jawaban...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll-to-bottom button */}
        {messages.length > 3 && (
          <button
            onClick={scrollToBottom}
            title="Scroll ke bawah"
            aria-label="Scroll ke bawah"
            className="absolute bottom-20 inset-s-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-surface-high border border-border flex items-center justify-center hover:bg-surface-bright transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-text-dim" />
          </button>
        )}

        {/* ── Input Bar ─────────────────────────────── */}
        <div className="border-t border-white/5 p-3 md:p-4">
          <div className="flex items-center gap-2 bg-surface/60 rounded-xl border border-border focus-within:border-science/50 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanyakan tentang fenomena antariksa..."
              disabled={isStreaming}
              className="flex-1 bg-transparent px-4 py-3.5 text-sm text-text-primary placeholder:text-text-dim/50 outline-none disabled:opacity-50"
            />

            {isStreaming ? (
              <button
                onClick={handleStop}
                className="me-2 w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                aria-label="Hentikan generasi"
              >
                <Square className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="me-2 w-10 h-10 rounded-xl bg-science text-space-dark flex items-center justify-center hover:brightness-110 active:translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </GlassCard>
    </main>
  );
}
