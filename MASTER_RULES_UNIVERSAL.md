# 🎯 UNIVERSAL APP CREATION MASTER SPEC

**Elite Principal Engineer Edition | Zero-Hallucination Mode | v2.0 (Universal Multi-Script • Production-Grade)**

> 📌 **Status:** Ini adalah dokumen **FINAL & SUPER LENGKAP**.  
> Semua file sebelumnya (`New Rules.doc`, `ENHANCED-PROJECT-RULES-v2.docx`, `RULES WAJIB 2.docx`, `ULTIMATE_ARABIC_APP_BLUEPRINT.docx`, `Rules.docx`) → **DEPRECATED**.  
> Gunakan **hanya dokumen ini** sebagai satu-satunya sumber kebenaran.

---

## 0. 🧭 CORE PHILOSOPHY & EXECUTION MODE

> **`Structure serves content. Convention is optional. Asymmetry creates hierarchy.`**

### AI Default Habit (❌ BLOCKED)

```
❌ flex-col untuk seluruh halaman
❌ grid-cols-1 default tanpa intentional break
❌ w-full tanpa container constraint
❌ Pure vertical scroll tanpa spatial rhythm
❌ Forced symmetry "karena rapi"
```

### Professional Standard (✅ REQUIRED)

```
✅ Bento grids dengan asymmetric spans
✅ Container queries untuk component-level responsiveness
✅ Fluid spacing dengan CSS variables + clamp()
✅ Contextual asymmetry untuk visual hierarchy
✅ Writing-mode aware layouts (horizontal-tb, vertical-rl, sideways-lr)
```

### Quality Definition (Universal)

| ✅ Harus Ada | 🚫 Tidak Perlu Day-1 |
|-------------|---------------------|
| End-to-end functional di LTR/RTL/CJK/Vertical | 100% test coverage |
| Maintainable via FSD + strict contracts | Pixel-perfect tanpa user testing |
| Core Web Vitals 2025 pass (LCP, CLS, INP) | Animasi kompleks di setiap interaksi |
| No forced symmetry unless explicitly requested | Admin panel / analytics dashboard |

---

## 1. 🚨 ANTI-HALLUCINATION & SCOPE PROTOCOL (MANDATORY)

### 🔒 Scope Lock & Boundary Lock (WAJIB sebelum coding)

```markdown
🔒 WILL BUILD:
- [Component/Layout A] – business reason (1 kalimat)
- [Component/Layout B] – business reason (1 kalimat)  
- [Hook/Utility C] – purpose (1 kalimat)

🚫 WON'T BUILD:
- [Feature X] – Tier 3+ / scope creep / kompleksitas belum perlu
- [Layout Pattern Y] – unnecessary untuk current phase

📏 SIZE ESTIMATION:
- A: ~XXX lines | B: ~XXX lines | Total artifact: <800 lines
```

### 📏 Size Police (Hard + Soft Buffer)

| Artifact | Hard Limit | Soft Buffer (+10%) | Action if Exceeded |
|----------|-----------|-------------------|-------------------|
| Component File | 400 lines | 440 | Split atau extract sub-component |
| Custom Hook | 250 lines | 280 | Extract focused hooks |
| Page/Route View | 300 lines | 350 | Extract layout composition |
| Tailwind Class String | 30 classes | - | Extract ke `@layer`, constant, atau `cva` |
| Single Output Artifact | 800 lines | - | Chunk into multiple files/routes |

### 🔍 Logic Police (4 Pertanyaan Wajib)

1. **Is this logic strictly required?** (Uncertain → ❌ omit)
2. **>3 conditional branches?** → Extract ke pure function atau custom hook
3. **API/Async operation?** → Mandatory `TanStack Query`/`SWR` + Error Boundary
4. **Testable in isolation?** → Jika no, redesign architecture

### 🛡️ Dependency Policy (Whitelist Only)

| Status | Libraries | Notes |
|--------|-----------|-------|
| ✅ Core (Wajib) | React 18+, Next.js/Vite, Tailwind v3/v4, TypeScript strict | Baseline stack |
| ✅ Recommended | Zustand, TanStack Query, `clsx`/`tailwind-merge`, `react-error-boundary`, `i18next` | State, data, UX |
| ⚠️ Conditional | `dayjs`/`date-fns`, `howler`, `lucide-react`, `zod`/`@hookform/resolvers`, `idb` | Pakai hanya jika solve masalah spesifik |
| 🚫 Banned | `axios` (use fetch/Query), `lodash`, `framer-motion` (use CSS/Tailwind), `moment`, inline `style={{}}` (kecuali dynamic `width/height`), `xstate`, `@dnd-kit` | Bloat / anti-pattern |

### 👃 Code Smell Detector (STOP & REVISI)

```
❌ // TODO tanpa issue/deadline → HALLUCINATION
❌ any type → SECURITY RISK (use proper TS types/generics)
❌ dangerouslySetInnerHTML → XSS VULNERABILITY
❌ Nested ternary >2 level → UNREADABLE (extract ke match()/switch)
❌ >1 component per file → VIOLATION (split immediately)
❌ Props >8 fields → DESIGN SMELL (group into config object)
❌ useCallback/useMemo tanpa measurable re-render impact → PREMATURE OPTIMIZATION
❌ Magic numbers → HALLUCINATION (extract ke constants.ts atau CSS vars)
❌ console.log di kode final → CLEANUP BEFORE SHIPPING
❌ Global window/document tanpa null check → CRASHES ON SSR
```

---

## 2. 🏗️ ARCHITECTURE: FEATURE-SLICED DESIGN (FSD)

```
src/
├── app/                    # Routing, providers, global layout, theme
├── pages/                  # Route compositions (thin, delegates to features)
├── features/               # Domain logic (auth, dashboard, editor, media, etc.)
├── entities/               # Data models (User, Item, Session, Config)
├── shared/                 # Primitives (UI, lib, hooks, types, constants)
│   ├── ui/                 # Atomic components (Button, Card, Input, Skeleton)
│   ├── lib/                # Pure utilities, API wrappers, i18n setup
│   ├── hooks/              # Shared hooks (useLocalStorage, useDebounce)
│   └── constants/          # Magic numbers → named constants
└── core/                   # Cross-cutting (analytics, store slices, env, error boundaries)
```

**Import Rules (Strict):**

```
✅ features/ → imports dari shared/, entities/, core/ only
❌ features/ ↔ features/ → JANGAN (gunakan shared/lib/ untuk cross-domain utilities)
✅ Components = dumb/presentational | Hooks = logic/stateful
✅ One component per file (tiny atoms may share)
📌 Import order: React → External → @/shared → @/features → Relative
```

---

## 3. 🌍 UNIVERSAL MULTI-SCRIPT & DIRECTIONAL ENGINE

### A. Logical Properties (MANDATORY untuk semua layout)

```
❌ NEVER: ml-, mr-, pl-, pr-, left-, right-, rounded-l/r-, flex-row-reverse
✅ ALWAYS: ms-, me-, ps-, pe-, start-, end-, rounded-s/e-, rounded-es/se-
```

### B. Direction & Writing Mode Support Matrix

| Script | Direction | CSS Strategy | Font Stack Recommendation |
|--------|-----------|--------------|---------------------------|
| Latin/Cyrillic/Greek | LTR | `dir="ltr"` (default) | `Inter, SF Pro, system-ui, sans-serif` |
| Arabic/Persian/Urdu/Hebrew | RTL | `dir="rtl"` + logical props | `Readex Pro, Cairo, Tajawal, Noto Sans Arabic` |
| CJK (Chinese/Japanese/Korean) | LTR or Vertical | `writing-mode: horizontal-tb` or `vertical-rl` + `text-orientation: mixed` | `Noto Sans SC/TC/JP/KR, PingFang, Hiragino` |
| Indic (Hindi/Bengali/Tamil) | LTR | `dir="ltr"` + complex text shaping | `Noto Sans Devanagari/Bengali/Tamil, Lohit` |
| Mongolian/Traditional CJK | Top-to-Bottom | `writing-mode: vertical-rl` + `text-combine-upright` for numerals | `Noto Sans Mongolian, Source Han Serif` |
| Thai/Khmer/Lao | LTR | `dir="ltr"` + line-height adjustment | `Noto Sans Thai/Khmer/Lao, Sarabun` |

### C. Bidirectional Isolation (Mixed Content)

```html
<!-- Isolate mixed-direction text to prevent layout breaking -->
<span dir="auto" class="unicode-bidi isolate break-words">
  Mixed content: English + العربية + 中文 + हिंदी
</span>
```

### D. Icon & Media Mirroring Rules

```jsx
// ✅ Auto-flip directional icons in RTL/Vertical contexts
<svg className="directional-icon rtl:-scale-x-100 writing-mode-vertical:rotate-90">
  <ArrowRight />
</svg>

// ❌ NEVER: {isRtl ? <ArrowLeft /> : <ArrowRight />} → Duplikasi kode = hallucination
```

**Mirror (harus flip di RTL/Vertical):**

- Back buttons, progress bars, navigation arrows, breadcrumbs, sliders, timeline indicators

**DO NOT Mirror (tetap same direction):**

- Media controls (Play/Pause/Stop), Clocks/timers, Checkmarks/radio indicators, Numbers (0-9 Western Arabic), Logos/brand marks, Media content (video/image)

---

## 4. 🧩 ADVANCED LAYOUT & GRID SYSTEMS (BEYOND VERTICAL)

### A. Layout Primitives Dictionary

| Pattern | Tailwind/CSS Strategy | Use Case | Example |
|---------|----------------------|----------|---------|
| **Bento Grid** | `grid grid-cols-12 gap-4 md:gap-6` + `col-span-4/8/12` + `row-span-2` | Dashboards, content hubs, feature showcases | `className="grid grid-cols-12 gap-6"` + child `col-span-12 md:col-span-8` |
| **Asymmetric Split** | `grid-cols-[1fr_2fr]` or `md:[&>*:first-child]:col-span-2` | Editorial, product highlights, immersive UI | `className="grid md:grid-cols-3 md:[&>*:first-child]:col-span-2"` |
| **Masonry/Fluid** | `columns-1 md:columns-2 lg:columns-3 gap-4 break-inside-avoid` | Galleries, cards of varying height | `className="columns-2 md:columns-3 gap-6"` |
| **Container Query** | `@container (min-width: 300px) { .card { flex-direction: row; } }` | Component-level responsiveness | `className="@container"` + child `@[300px]:flex-row` |
| **CSS Subgrid** | `display: grid; grid-template-columns: subgrid;` | Nested grids with parent alignment | `className="grid grid-cols-12"` + child `grid grid-cols-subgrid col-span-6` |
| **Sticky/Overlap** | `sticky top-0 z-30` + `-mt-4 z-10` (negative margins) | Scroll-aware navs, layered cards | `className="sticky top-0 z-30 -mt-8"` |
| **Fluid Aspect Ratio** | `aspect-[4/3] md:aspect-[16/9]` | Media containers, cards | `className="aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden"` |

### B. Responsive Breakpoints (Modern Standard)

```
Mobile:  <480px   (px-4, col-1, stack vertical)
Tablet:  480-768  (px-6, col-2/3, intentional asymmetry)
Laptop:  768-1024 (px-8, col-4/6, bento layouts)
Desktop: 1024-1280(px-12, col-8/12, multi-column)
Wide:    >1280    (max-w-7xl mx-auto, asymmetric grids + whitespace)
```

**Rule:** `flex-col` adalah fallback. Default ke `grid` atau `flex-wrap` dengan intentional imbalance.

### C. Layout Anti-Patterns (AI BLOCKLIST)

```
❌ className="flex flex-col space-y-4" untuk entire pages
❌ w-full pada desktop cards tanpa container constraint
❌ Forced text-center untuk body content
❌ Equal-height grids tanpa grid-auto-rows atau aspect-ratio control
❌ Padding/margin hardcoded tanpa logical properties
✅ Replace dengan: grid grid-cols-12, col-span-6, md:col-span-8, items-start, space-y-6
```

---

## 5. 🔤 UNIVERSAL TYPOGRAPHY & FLUID SPACING

### A. Script-Aware Scaling System

| Element | Latin Base | Arabic/Persian | CJK | Indic | Vertical Script | Line Height Multiplier |
|---------|-----------|----------------|-----|-------|-----------------|------------------------|
| Display | `clamp(2rem, 1.5rem + 2vw, 3.5rem)` | `+0.25rem` | `+0.125rem` | `+0.1rem` | `writing-mode: vertical-rl` | 1.0–1.1 |
| H1 | `clamp(1.75rem, 1.25rem + 1.5vw, 2.5rem)` | `+0.25rem` | `+0.125rem` | `+0.1rem` | `text-orientation: upright` | 1.15 |
| H2 | `clamp(1.5rem, 1rem + 1.25vw, 2rem)` | `+0.15rem` | `+0.1rem` | `+0.05rem` | - | 1.25 |
| Body | `clamp(1rem, 0.9rem + 0.5vw, 1.125rem)` | `+0.125rem` | `+0.05rem` | `+0.05rem` | - | 1.5–1.6 |
| Caption | `clamp(0.875rem, 0.8rem + 0.3vw, 1rem)` | `base` | `base` | `base` | - | 1.4 |

**Font Stack (Universal, with fallbacks):**

```css
:root {
  --font-sans: ui-sans-serif, system-ui, -apple-system, 'Inter', 'Noto Sans', 'Readex Pro', sans-serif;
  --font-serif: ui-serif, Georgia, 'Noto Serif', 'Source Han Serif', serif;
  --font-mono: ui-monospace, 'SF Mono', 'Cascadia Code', 'JetBrains Mono', monospace;
  --font-arabic: 'Readex Pro', 'Cairo', 'Tajawal', 'Noto Sans Arabic', sans-serif;
  --font-cjk: 'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR', sans-serif;
  --font-indic: 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Tamil', sans-serif;
}
```

### B. Fluid Spacing System (8pt Base → CSS Variables)

```css
:root {
  --space-xs: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);   /* 8px base */
  --space-sm: clamp(0.75rem, 0.6rem + 0.75vw, 1rem);    /* 12px */
  --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);        /* 16px */
  --space-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);    /* 24px */
  --space-xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);        /* 32px+ */
  --space-2xl: clamp(3rem, 2rem + 4vw, 6rem);           /* 48px+ */
}
```

**Rule:** No hardcoded `p-4`/`m-8` in complex layouts. Gunakan `var(--space-*)` atau `gap-[var(--space-md)]`.

### C. Typography Anti-Patterns

```
❌ text-4xl hardcoded untuk semua script
❌ leading-tight untuk Arabic (harakat akan terpotong)
❌ font-weight bold untuk CJK (bisa blurry di beberapa renderers)
✅ Gunakan clamp() + script-aware scaling + line-height multiplier
```

---

## 6. 🎨 SEMANTIC DESIGN SYSTEM & COMPONENT PATTERNS

### A. Color Tokens (OKLCH/HSL for Perceptual Uniformity)

```css
:root {
  /* Core neutrals */
  --color-surface: oklch(0.98 0.01 250);    /* Slate-50 */
  --color-surface-elevated: oklch(1 0 0);    /* White */
  --color-border: oklch(0.85 0.02 260);      /* Slate-200 */
  --color-text: oklch(0.15 0.02 260);        /* Slate-900 */
  --color-text-muted: oklch(0.5 0.02 260);   /* Slate-500 */
  
  /* Semantic actions */
  --color-primary: oklch(0.65 0.2 150);      /* Emerald-500 */
  --color-primary-hover: oklch(0.6 0.2 150); /* Emerald-600 */
  --color-success: oklch(0.6 0.18 145);
  --color-warning: oklch(0.75 0.18 85);
  --color-error: oklch(0.55 0.25 25);
  --color-info: oklch(0.6 0.2 240);
  
  /* Gamification */
  --color-reward: oklch(0.75 0.18 85);       /* Amber-400 */
  --color-streak: oklch(0.7 0.18 70);        /* Amber-500 */
  
  /* Dark mode (auto via prefers-color-scheme) */
  @media (prefers-color-scheme: dark) {
    --color-surface: oklch(0.15 0.02 260);
    --color-surface-elevated: oklch(0.2 0.02 260);
    --color-border: oklch(0.3 0.02 260);
    --color-text: oklch(0.98 0.01 250);
  }
}
```

**Tailwind Mapping:**

```jsx
className="bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)]"
```

### B. Component Patterns (Non-Monotonous)

| Component | Strategy | Tailwind Example |
|-----------|----------|------------------|
| **Card** | Layered, asymmetric, contextual elevation | `rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all` |
| **Button** | Contextual sizing, no forced full-width | `inline-flex items-center justify-center px-6 h-12 rounded-xl font-medium bg-[var(--color-primary)] text-white hover:brightness-110 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed` |
| **Input** | Adaptive, state-driven | `w-full h-12 px-4 rounded-xl border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-colors` |
| **Media Container** | Aspect-ratio lock, responsive crop | `aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden object-cover` |
| **Badge/Pill** | Compact, contextual color | `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-reward)]/10 text-[var(--color-reward)]` |

### C. Micro-Interactions (Contextual, Not Bloat)

```css
/* Respect reduced motion */
@media (prefers-reduced-motion: no-preference) {
  @starting-style {
    .enter-anim { opacity: 0; transform: translateY(12px) scale(0.98); }
  }
  .enter-anim { transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
  
  /* Button press feedback */
  .btn-press:active { transform: translateY(2px); }
  
  /* Subtle hover lift */
  .hover-lift:hover { transform: translateY(-2px); }
}
```

**Rule:** Feedback harus match action weight. Success = subtle scale + color shift. Error = border + gentle shake. Never block interaction.

---

## 7. 🗄️ STATE, DATA & MEDIA HANDLING

### A. State Separation Matrix

| Type | Tool | Scope | Example |
|------|------|-------|---------|
| UI/Local | `useState`/`useReducer` | Form input, modal, toggle, filter | `const [isOpen, setIsOpen] = useState(false)` |
| Server | `TanStack Query`/`SWR` | API data, pagination, cache, retry | `useQuery({ queryKey: ['users'], queryFn: fetchUsers })` |
| Cross-Feature | `Zustand` (slices) | Auth, theme, locale, cart, progress | `useUserStore((s) => s.xp)` |
| Cache/Persistence | `idb`/`localforage` | Drafts, offline sync, settings | `await db.set('settings', { theme: 'dark' })` |

### B. Data Fetching (Mandatory React Query)

```tsx
const { data, isLoading, error, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
  queryKey: ['items', filter],
  queryFn: ({ pageParam }) => fetchItems({ cursor: pageParam, limit: 20 }),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  staleTime: 1000 * 60 * 5, // 5 minutes
  retry: 2,
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
});
```

### C. Media & Audio/Video Standards

- **Images:** `loading="lazy"`, `decoding="async"`, `srcSet`/`sizes`, `object-cover`, explicit `width`/`height` atau `aspect-ratio`
- **Video/Audio:** `<video controls preload="metadata" />` atau Howler untuk interactive/game audio
- **Preload critical media:** `<link rel="preload" as="image" href="..." />`
- **Fallback:** Always provide `alt` text, poster image, or skeleton

---

## 8. ⚡ PERFORMANCE, ACCESSIBILITY & DEVOPS

### A. Core Web Vitals 2025 Targets

| Metric | Target | Fix Strategy |
|--------|--------|--------------|
| LCP (Largest Contentful Paint) | `< 2.5s` | Preload hero, inline critical CSS, defer non-critical JS |
| CLS (Cumulative Layout Shift) | `< 0.1` | Reserve space, fixed aspect-ratio, font `swap` + size lock |
| INP (Interaction to Next Paint) | `< 200ms` | Debounce inputs, web workers for heavy calc, `transition` over JS animation |
| TBT (Total Blocking Time) | `< 300ms` | Code split, lazy load, minimize main thread work |

### B. Accessibility (WCAG 2.2 AA Minimum)

```
✅ focus-visible:ring-2 pada semua interactive elements
✅ aria-label untuk icon-only buttons
✅ role="status"/aria-live="polite" untuk dynamic updates
✅ Color contrast ≥ 4.5:1 (teks), ≥ 3:1 (large text/UI)
✅ Skip link: <a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>
✅ Test at 200% zoom, keyboard-only, screen reader (NVDA/JAWS/VoiceOver)
✅ Reduced motion support via @media (prefers-reduced-motion)
```

### C. DevOps & Quality Gates

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint        # ESLint + Tailwind plugin
npm run type-check  # TypeScript strict
npm run test:unit   # Vitest unit tests

# Block commit jika ada console.log atau TODO tanpa issue link
! git diff --cached --grep='console\.log\|// TODO' --quiet && \
  echo "❌ Remove console.log and TODO comments before commit" && exit 1 || exit 0
```

```env
# .env.example (JANGAN commit .env)
VITE_API_BASE_URL=https://api.example.com
VITE_SENTRY_DSN=
VITE_FEATURE_OFFLINE=false

# .env.local (gitignored)
VITE_API_BASE_URL=http://localhost:3001
```

---

## 9. ✅ AI EXECUTION CHECKLIST & DEFINITION OF DONE

### 🔍 SELF-CHECK REPORT (MANDATORY BEFORE OUTPUT)

```markdown
## 🧾 SELF-CHECK REPORT

### Scope & Planning
- [ ] Scope lock & boundary lock documented?
- [ ] Layout avoids pure vertical stack? Uses grid/bento/asymmetry?
- [ ] Logical properties used? RTL/CJK/Vertical tested?

### Code Quality
- [ ] Component <400 lines? Hook <250 lines? Page <300 lines?
- [ ] No `any`, `console.log`, `// TODO`, `dangerouslySetInnerHTML`?
- [ ] Magic numbers extracted to constants?
- [ ] Handler naming: handle[Noun][Event]?

### UX & States
- [ ] Loading = skeleton/placeholder? Error = UI + retry?
- [ ] Touch targets minimal 40px?
- [ ] Colors from semantic palette only?

### Performance & A11y
- [ ] Bundle <350KB? INP <200ms? CLS <0.1?
- [ ] Accessibility: focus states, contrast, aria-labels, reduced-motion?
- [ ] Image optimization: .webp + width/height?

### Final
- [ ] Kode bisa dibaca seperti prosa? Comment jelaskan WHY, bukan WHAT?
- [ ] Jika ragu scope/layout → TANYA USER?
```

❌ **Jika ada SATU saja yang tidak tercentang → BATALKAN, REFACTOR, KIRIM ULANG.**

### 🏁 DEFINITION OF DONE (Universal)

```
✅ End-to-end functional di staging
✅ Responsive at 375px, 768px, 1024px, 1440px
✅ LTR/RTL/CJK/Vertical layouts verified
✅ Loading, empty, error states designed
✅ Core Web Vitals pass (LCP <2.5s, CLS <0.1, INP <200ms)
✅ No tech debt untracked
✅ User flow feels intentional, not stacked
✅ Accessibility basics: keyboard nav, contrast, aria-labels
```

---

## 📎 APPENDIX: UNIVERSAL CHEAT SHEET

### 📐 Layout Quick Picks

```
Bento Grid: grid grid-cols-12 gap-4 md:gap-6
Asymmetric: md:[&>*:first-child]:col-span-8 [&>*:last-child]:col-span-4
Fluid Grid: grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]
Container Query: @container (min-width: 400px) { .card { flex-direction: row; } }
Sticky Header: sticky top-0 z-30 bg-white/80 backdrop-blur
```

### 🔤 Typography Quick Picks

```
Display: clamp(2rem, 1.5rem + 2vw, 3.5rem) font-extrabold leading-tight
H1: clamp(1.75rem, 1.25rem + 1.5vw, 2.5rem) font-bold leading-snug
Body: clamp(1rem, 0.9rem + 0.5vw, 1.125rem) font-medium leading-relaxed
Arabic +1 size: text-5xl (vs text-4xl Latin)
Font Stack: system-ui, 'Inter', 'Noto Sans', sans-serif
```

### 🌍 Directional Quick Picks

```
Margin/Padding: ms-, me-, ps-, pe- (NOT ml-, mr-, pl-, pr-)
Positioning: start-, end- (NOT left-, right-)
Radius: rounded-s-, rounded-e-, rounded-es-, rounded-se-
Icon Flip: rtl:-scale-x-100 writing-mode-vertical:rotate-90
```

### 🎨 Color Quick Picks (Semantic)

```
Primary: oklch(0.65 0.2 150) | Success: oklch(0.6 0.18 145)
Warning: oklch(0.75 0.18 85) | Error: oklch(0.55 0.25 25)
Surface: oklch(0.98 0.01 250) | Text: oklch(0.15 0.02 260)
Border: oklch(0.85 0.02 260)
```

### 📦 State/Data Quick Picks

```
Local: useState/useReducer
Server: TanStack Query (useQuery/useInfiniteQuery)
Global: Zustand (sliced per domain)
Persist: idb/localStorage
Error: react-error-boundary per route
```

### 🧪 Testing Quick Picks

```
Unit: Vitest + React Testing Library (hooks, utils)
Integration: Critical flows (auth → main → action)
A11y: axe-core for automated checks
Manual: Keyboard nav, screen reader, RTL switch
```

---

## 🎯 GOLDEN RULES (FINAL)

```
✅ Working > Perfect
✅ Simple > Clever  
✅ Ship > Plan terlalu lama
✅ User feedback > Asumsi
✅ Fix fast > Hide tech debt
✅ Asymmetry > Forced symmetry
✅ Logical properties > Physical properties
✅ Fluid > Fixed (when appropriate)
```

---

> ⚠️ **KONTRAK TERAKHIR:**  
> Dokumen ini adalah **satu-satunya sumber kebenaran** untuk semua generasi kode.  
> Versi sebelumnya dianggap **deprecated**.  
> AI/Engineer yang melanggar → dianggap *hallucination* → output **dibuang**.  
> **Think spatial. Ship intentional. Scale universally.**

**Version: 2.0 (Universal Multi-Script • Production-Grade) | Status: Zero-Hallucination Ready ✅**
