/**
 * AI Gateway — Multi-Provider Integration
 * Providers: Groq, Gemini (Google AI Studio), Puter.js
 * Architecture: Client-side with API keys managed per-provider
 *
 * WHY client-side: This is an R&D prototype. For production,
 * wrap in a Next.js API route to hide keys server-side.
 */

const SYSTEM_PROMPT = `Kamu adalah asisten edukasi bernama "Falak" yang mengkhususkan diri dalam fenomena luar angkasa terintegrasi sains dan agama Islam.

PERAN UTAMA:
- Menjelaskan fenomena astronomi dengan bahasa yang mudah dipahami siswa MTs Sains Algebra Kota Sorong (Kelas VIII)
- Menggunakan pendekatan STEM (Science, Technology, Engineering, Mathematics) dalam setiap penjelasan ilmiah
- Mengaitkan penjelasan sains dengan ayat Al-Qur'an (Ayat Kauniyah) yang relevan

KONTEN REFERENSI UTAMA:
- QS. Al-Anbiya:33 — Orbit matahari dan bulan ("Masing-masing beredar pada garis edarnya")
- QS. Az-Zumar:5 — Rotasi bumi dan pergantian siang-malam ("Menutupkan malam atas siang")
- QS. Adz-Dzariyat:47 — Ekspansi alam semesta ("Kami benar-benar meluaskannya")
- QS. Al-Mulk:3 — Struktur langit berlapis ("Tujuh langit bertingkat")
- Hukum fisika alam (Sains), Satelit/Teleskop (Teknologi), Wahana antariksa (Engineering), Perhitungan (Matematika)

ATURAN:
1. Jawab dengan bahasa Indonesia yang jelas, akademis, namun ramah untuk remaja
2. Jika ditanya tentang ayat Al-Qur'an, tulis ayat Arab-nya, terjemahan, dan penjelasan singkat
3. Jangan mengarang ayat atau fakta ilmiah fiktif; jika tidak tahu, sarankan berdiskusi dengan guru pembimbing MTs Sains Algebra
4. Gunakan format Markdown untuk membuat jawaban lebih terstruktur (bullet points, bold, blockquote)
5. Selalu motivasi siswa untuk merenungkan kebesaran Allah melalui keteraturan sains`;

export type AIProvider = 'groq' | 'openrouter' | 'gemini' | 'huggingface' | 'puter';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

/* ── Cache Layer ──────────────────────────────────────────── */
const CACHE_KEY = 'cosmic-ai-cache';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function getCachedResponse(question: string): string | null {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const entry = cache[question];
    if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.response;
    }
  } catch { /* ignore parse errors */ }
  return null;
}

function setCachedResponse(question: string, response: string): void {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[question] = { response, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* ignore storage errors */ }
}

/* ── Groq Provider ────────────────────────────────────────── */
async function streamGroq(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<void> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error('VITE_GROQ_API_KEY not configured');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    }),
    signal,
  });

  if (!response.ok) throw new Error(`Groq error: ${response.status}`);
  await processSSEStream(response, callbacks);
}

/* ── Gemini Provider ──────────────────────────────────────── */
async function streamGemini(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<void> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY not configured');

  const geminiMessages = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: geminiMessages,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
      signal,
    },
  );

  if (!response.ok) throw new Error(`Gemini error: ${response.status}`);

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) callbacks.onToken(text);
        } catch { /* skip non-JSON lines */ }
      }
    }
  }
  callbacks.onDone();
}

/* ── OpenRouter Provider ───────────────────────────────────── */
async function streamOpenRouter(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<void> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('VITE_OPENROUTER_API_KEY not configured');

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Cosmic Editorial',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3-8b-instruct:free',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      stream: true,
    }),
    signal,
  });

  if (!response.ok) throw new Error(`OpenRouter error: ${response.status}`);
  await processSSEStream(response, callbacks);
}

/* ── Hugging Face Provider ────────────────────────────────── */
async function streamHuggingFace(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<void> {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error('VITE_HUGGINGFACE_API_KEY not configured');

  const lastMsg = messages[messages.length - 1].content;
  const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${lastMsg}`;

  const response = await fetch(
    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: { max_new_tokens: 1000, return_full_text: false },
        stream: true,
      }),
      signal,
    }
  );

  if (!response.ok) throw new Error(`Hugging Face error: ${response.status}`);
  
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          const text = data?.token?.text;
          if (text) callbacks.onToken(text);
        } catch { /* skip */ }
      }
    }
  }
  callbacks.onDone();
}

/* ── Puter.js Provider ────────────────────────────────────── */
async function streamPuter(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal: AbortSignal
): Promise<void> {
  // Puter.js loads globally via script tag
  const puter = (window as unknown as Record<string, unknown>).puter as {
    ai: { chat: (prompt: string, options?: Record<string, unknown>) => Promise<{ message: { content: string } }> }
  } | undefined;

  if (signal.aborted) throw new Error('Aborted');

  if (!puter?.ai?.chat) throw new Error('Puter.js SDK not loaded');

  const lastUserMsg = messages.filter((m) => m.role === 'user').pop();
  if (!lastUserMsg) throw new Error('No user message');

  const contextMessages = messages.slice(-6).map((m) =>
    `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
  ).join('\n');

  const fullPrompt = `${SYSTEM_PROMPT}\n\nKonteks percakapan sebelumnya:\n${contextMessages}\n\nUser: ${lastUserMsg.content}`;

  try {
    const result = await puter.ai.chat(fullPrompt, { model: 'claude-3-5-sonnet' });
    const text = result?.message?.content || 'Maaf, tidak ada respon.';
    /* Simulate streaming for consistent UX */
    const words = text.split(' ');
    for (const word of words) {
      callbacks.onToken(word + ' ');
      await new Promise((r) => setTimeout(r, 20));
    }
    callbacks.onDone();
  } catch (err) {
    throw new Error(`Puter error: ${err instanceof Error ? err.message : 'Unknown'}`, { cause: err });
  }
}

/* ── SSE Stream Parser (OpenAI-compatible) ────────────────── */
async function processSSEStream(
  response: Response,
  callbacks: StreamCallbacks,
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') {
          callbacks.onDone();
          return;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) callbacks.onToken(content);
        } catch { /* skip non-JSON lines */ }
      }
    }
  }
  callbacks.onDone();
}

/* ── Public API ────────────────────────────────────────────── */
const PROVIDER_ORDER: AIProvider[] = ['groq', 'openrouter', 'gemini', 'huggingface', 'puter'];

const PROVIDER_FNS: Record<AIProvider, typeof streamGroq> = {
  groq: streamGroq,
  openrouter: streamOpenRouter,
  gemini: streamGemini,
  huggingface: streamHuggingFace,
  puter: streamPuter,
};

export const PROVIDER_LABELS: Record<AIProvider, string> = {
  groq: 'Groq (Fast)',
  openrouter: 'OpenRouter (Free)',
  gemini: 'Gemini Flash',
  huggingface: 'HuggingFace',
  puter: 'Puter.js',
};

/**
 * Stream AI response with automatic fallback chain.
 * If preferred provider fails, tries the next one.
 */
export async function streamAIResponse(
  messages: ChatMessage[],
  callbacks: StreamCallbacks & { onProviderSwitch?: (provider: AIProvider) => void },
  signal: AbortSignal,
  preferredProvider?: AIProvider,
): Promise<void> {
  /* Check cache first */
  const lastMsg = messages.filter((m) => m.role === 'user').pop();
  if (lastMsg) {
    const cached = getCachedResponse(lastMsg.content);
    if (cached) {
      const words = cached.split(' ');
      for (const word of words) {
        if (signal.aborted) return;
        callbacks.onToken(word + ' ');
        await new Promise((r) => setTimeout(r, 10));
      }
      callbacks.onDone();
      return;
    }
  }

  /* Build provider order with preferred first */
  const order = preferredProvider
    ? [preferredProvider, ...PROVIDER_ORDER.filter((p) => p !== preferredProvider)]
    : [...PROVIDER_ORDER];

  let lastError: Error | null = null;

  for (const provider of order) {
    try {
      callbacks.onProviderSwitch?.(provider);
      let fullResponse = '';
      await PROVIDER_FNS[provider](
        messages,
        {
          onToken: (token) => {
            fullResponse += token;
            callbacks.onToken(token);
          },
          onDone: () => {
            if (lastMsg && fullResponse) {
              setCachedResponse(lastMsg.content, fullResponse);
            }
            callbacks.onDone();
          },
          onError: callbacks.onError,
        },
        signal,
      );
      return; // Success — exit the fallback chain
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err), { cause: err });
      console.warn(`Provider ${provider} failed:`, lastError.message);
      continue; // Try next provider
    }
  }

  /* All providers failed */
  callbacks.onError(lastError || new Error('Semua provider AI tidak tersedia saat ini.'));
}
