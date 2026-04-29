import { Link } from 'react-router-dom';
import { GlassCard } from '@/shared/ui/GlassCard';
import { ArabicText } from '@/shared/ui/ArabicText';
import { PHENOMENA, CATEGORY_META } from '@/entities/phenomena';
import { ArrowRight, ExternalLink } from 'lucide-react';

/** Archive page — all phenomena with bento layout + horizontal scroller */
export function ArsipPage() {
  return (
    <main className="pt-24 md:pt-32 pb-32 px-page max-w-[1400px] mx-auto w-full">
      {/* Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[15%] -inset-s-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(103,80,164,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="mb-12 md:mb-16 relative">
        <div className="absolute -top-8 -inset-s-4 text-science/5 font-[Space_Grotesk,sans-serif] text-[10rem] leading-none select-none pointer-events-none hidden md:block">
          04
        </div>
        <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(2rem,6vw,5rem)] font-bold tracking-tighter text-text-primary">
          Arsip
        </h1>
        <p className="font-[Newsreader,serif] text-lg text-text-muted max-w-2xl mt-2">
          Kumpulan lengkap fenomena luar angkasa beserta dalil-dalil yang relevan dari Al-Qur'an.
        </p>
      </header>

      {/* ── Bento Grid: All Phenomena ──────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-16">
        {PHENOMENA.map((phenomenon, index) => {
          /* Asymmetric span logic: 7,5 alternating with offset */
          const isWide = index % 2 === 0;
          const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';
          const isFirst = index === 0;

          return (
            <Link
              key={phenomenon.id}
              to={`/eksplorasi?id=${phenomenon.id}`}
              className={`col-span-12 ${colSpan} group scroll-reveal`}
            >
              <GlassCard hover className={`h-full flex flex-col ${isFirst ? 'min-h-[350px]' : ''}`}>
                {/* Image for first/featured card */}
                {isFirst && (
                  <div className="h-48 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 rounded-t-2xl overflow-hidden relative">
                    <img
                      src={phenomenon.heroImage}
                      alt={phenomenon.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                      width={800}
                      height={200}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-space-dark to-transparent" />
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-[Space_Grotesk,sans-serif] uppercase tracking-[0.2em] font-bold ${CATEGORY_META[phenomenon.category].color}`}>
                    {CATEGORY_META[phenomenon.category].label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-science group-hover:translate-x-1 transition-all rtl:-scale-x-100" />
                </div>

                {/* Title & Description */}
                <h3 className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary mb-2 leading-tight">
                  {phenomenon.title}
                </h3>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted line-clamp-3 mb-4 flex-1">
                  {phenomenon.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {phenomenon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono border border-border text-text-dim rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </section>

      {/* ── Quranic Verses Showcase ──────────────── */}
      <section className="mb-16">
        <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-8">
          Ayat-Ayat Kauniyah
        </h2>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 md:gap-6 scrollbar-hide -mx-4 px-4">
          {PHENOMENA.map((p) =>
            p.verses.map((verse, vi) => (
              <div
                key={`${p.id}-${vi}`}
                className="snap-center shrink-0 w-[85vw] md:w-[500px]"
              >
                <GlassCard className="bg-surface-low/60 border-s-4 border-s-reflection/50">
                  <ArabicText verse={verse} size="base" />
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <p className="text-xs font-[Space_Grotesk,sans-serif] text-text-dim uppercase tracking-wider">
                      Terkait: {p.title}
                    </p>
                  </div>
                </GlassCard>
              </div>
            )),
          )}
          <div className="w-4 shrink-0" />
        </div>
      </section>

      {/* ── Metodologi & Teknologi R&D ─────────────── */}
      <section className="mb-16 scroll-reveal">
        <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-8">
          Metodologi & Teknologi
        </h2>
        <GlassCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-science mb-4">
                Research and Development (R&D)
              </h3>
              <p className="font-[Manrope,sans-serif] text-sm text-text-dim leading-relaxed">
                Platform ini adalah hasil dari penelitian R&D dengan pendekatan kuantitatif. Tujuannya adalah mengembangkan prototipe media pembelajaran berbasis AI yang mampu mengaitkan sains antariksa dengan perspektif agama secara otomatis untuk MTs Sains Algebra.
              </p>
            </div>
            <div>
              <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-ai-accent mb-4">
                Machine Learning & AI
              </h3>
              <p className="font-[Manrope,sans-serif] text-sm text-text-dim leading-relaxed">
                Asisten virtual pada platform ini didukung oleh integrasi LLM (Large Language Model) dengan metode pemrosesan bahasa alami (NLP) yang meniru fungsi kognitif. Hal ini memungkinkan sistem menganalisis pertanyaan siswa dan merespons dengan konteks sains dan tafsir Al-Qur'an secara akurat.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ── 5 Rujukan Institusi Utama ──────────────── */}
      <section className="scroll-reveal mt-24">
        <div className="text-center mb-12">
          <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-4xl font-bold text-text-primary mb-4">
            Mitra & Referensi Data
          </h2>
          <p className="font-[Manrope,sans-serif] text-text-muted max-w-2xl mx-auto">
            Platform ini dibangun di atas fondasi data sains yang tervalidasi secara global dan kaidah tafsir Al-Qur'an otoritatif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'NASA',
              desc: 'National Aeronautics and Space Administration. Sumber utama data pengamatan astrofisika dan citra teleskop angkasa.',
              link: 'https://nasa.gov',
              color: 'text-science'
            },
            {
              name: 'ESA',
              desc: 'European Space Agency. Referensi data misi luar angkasa gabungan dan penelitian kosmologi Eropa.',
              link: 'https://esa.int',
              color: 'text-blue-400'
            },
            {
              name: 'JAXA',
              desc: 'Japan Aerospace Exploration Agency. Referensi eksplorasi asteroid dan inovasi robotika antariksa.',
              link: 'https://global.jaxa.jp',
              color: 'text-red-400'
            },
            {
              name: 'BRIN / LAPAN',
              desc: 'Badan Riset dan Inovasi Nasional. Rujukan data astronomi regional dan kalender observasi langit Indonesia.',
              link: 'https://brin.go.id',
              color: 'text-green-400'
            },
            {
              name: 'KEMENAG RI',
              desc: 'Lajnah Pentashihan Mushaf Al-Qur\'an. Sumber validasi utama untuk Ayat Kauniyah dan tafsir resmi Kemenag.',
              link: 'https://kemenag.go.id',
              color: 'text-reflection'
            }
          ].map((inst, i) => (
            <a
              key={inst.name}
              href={inst.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group animate-float ${i % 2 === 0 ? 'animate-float-delayed' : ''}`}
            >
              <GlassCard hover className="h-full flex flex-col items-start gap-4 p-8">
                <div className="flex w-full items-center justify-between">
                  <h3 className={`font-[Space_Grotesk,sans-serif] text-xl font-bold ${inst.color}`}>
                    {inst.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-text-dim group-hover:text-white transition-colors" />
                </div>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed">
                  {inst.desc}
                </p>
              </GlassCard>
            </a>
          ))}
        </div>
      </section>
      {/* ── Glosarium Kosmik (Wow Factor) ─────────── */}
      <section className="mt-24 mb-12 scroll-reveal">
        <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-8 border-b border-white/10 pb-4">
          Glosarium Kosmik
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            { term: 'Aphelion', def: 'Titik terjauh dalam orbit suatu benda langit dari pusat edarnya (biasanya matahari).' },
            { term: 'Ayat Kauniyah', def: 'Ayat-ayat Allah berupa alam semesta dan isinya yang terhampar dan dapat diteliti secara ilmiah.' },
            { term: 'Dark Energy', def: 'Bentuk energi misterius yang mempercepat pengembangan alam semesta.' },
            { term: 'Eksosfer', def: 'Lapisan atmosfer terluar bumi yang berbatasan langsung dengan ruang angkasa.' },
            { term: 'Makrokosmos', def: 'Alam semesta dalam skala besar (makro), mencakup bintang, galaksi, dan tatanan kosmik.' },
            { term: 'Perihelion', def: 'Titik terdekat dalam orbit suatu planet atau benda langit dari matahari.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-science font-[Space_Grotesk,sans-serif] font-bold text-xl leading-none">
                {item.term.charAt(0)}
              </div>
              <div className="border-s border-white/5 ps-4">
                <h4 className="font-[Space_Grotesk,sans-serif] text-base font-bold text-text-primary mb-1">{item.term}</h4>
                <p className="font-[Newsreader,serif] text-sm text-text-muted leading-relaxed">{item.def}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
