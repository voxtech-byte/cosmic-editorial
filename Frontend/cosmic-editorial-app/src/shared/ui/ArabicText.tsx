import type { QuranVerse } from '@/entities/phenomena';

interface ArabicTextProps {
  verse: QuranVerse;
  size?: 'base' | 'lg' | 'xl';
}

const SIZE_MAP = {
  base: 'text-xl md:text-2xl',
  lg: 'text-2xl md:text-4xl',
  xl: 'text-3xl md:text-5xl',
} as const;

/** Renders Arabic Quranic text with proper Readex Pro font, RTL, and translation */
export function ArabicText({ verse, size = 'lg' }: ArabicTextProps) {
  return (
    <div className="space-y-4">
      {/* Arabic Verse */}
      <p
        dir="rtl"
        lang="ar"
        className={`font-[Readex_Pro,'Noto_Kufi_Arabic',sans-serif] ${SIZE_MAP[size]} leading-[1.8] text-reflection text-end`}
      >
        {verse.arabic}
      </p>

      {/* Divider */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-reflection/30 to-transparent" />

      {/* Translation */}
      <p className="font-[Newsreader,serif] text-base md:text-lg italic text-text-muted leading-relaxed">
        {verse.translation}
      </p>

      {/* Reference */}
      <p className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.2em] text-text-dim">
        QS. {verse.surah}: {verse.ayat}
      </p>
    </div>
  );
}
