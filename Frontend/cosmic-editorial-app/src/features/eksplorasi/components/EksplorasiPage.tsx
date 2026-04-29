import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { GlassCard } from '@/shared/ui/GlassCard';
import { ArabicText } from '@/shared/ui/ArabicText';
import { PHENOMENA, getPhenomenon } from '@/entities/phenomena';
import { ArrowLeft, ExternalLink, BookOpen, FlaskConical, Rocket, Cpu, Calculator, Sparkles } from 'lucide-react';

/** Deep-dive editorial page: Science → Religion → Context */
export function EksplorasiPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || PHENOMENA[0].id;
  const phenomenon = getPhenomenon(id) || PHENOMENA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <main className="pt-24 md:pt-32 pb-32 px-page max-w-[1400px] mx-auto w-full relative">
      {/* Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] inset-e-[-10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(103,80,164,0.1)_0%,transparent_70%)]" />
        <div className="absolute bottom-[10%] inset-s-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(231,195,101,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-text-dim hover:text-science transition-colors mb-8 font-[Space_Grotesk,sans-serif] text-sm tracking-wide"
      >
        <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
        Kembali ke Beranda
      </Link>

      {/* ── Hero Header ─────────────────────────────── */}
      <header className="mb-12 md:mb-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.3em] text-science font-bold mb-4 block">
              {phenomenon.titleEn}
            </span>
            <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(2rem,5vw+1rem,4rem)] font-bold tracking-tighter leading-[0.95] text-text-primary">
              {phenomenon.title}
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="font-[Newsreader,serif] text-base md:text-lg text-text-muted leading-relaxed">
              {phenomenon.description}
            </p>
          </div>
        </div>
      </header>

      {/* ── Hero Image ──────────────────────────────── */}
      <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-12 md:mb-16 relative scroll-reveal">
        <img
          src={phenomenon.heroImage}
          alt={phenomenon.title}
          className="w-full h-full object-cover"
          width={1200}
          height={450}
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-t from-space-dark/60 to-transparent" />
      </div>

      {/* ── Broken Grid: Science (7) + Religion (5) ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
        {/* Science Panel — 7 columns */}
        <div className="md:col-span-7 scroll-reveal">
          <GlassCard className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical className="w-5 h-5 text-science" />
              <span className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.2em] text-science font-bold">
                Tinjauan Sains
              </span>
            </div>

            <h2 className="font-[Space_Grotesk,sans-serif] text-xl md:text-2xl font-bold text-text-primary mb-6 leading-tight">
              Penjelasan Ilmiah
            </h2>

            <div className="font-[Newsreader,serif] text-base text-text-muted leading-relaxed space-y-4">
              {phenomenon.scienceExplanation.split('. ').reduce((acc: string[][], sentence, i) => {
                const chunkIndex = Math.floor(i / 3);
                if (!acc[chunkIndex]) acc[chunkIndex] = [];
                acc[chunkIndex].push(sentence);
                return acc;
              }, []).map((chunk, i) => (
                <p key={i}>{chunk.join('. ')}{chunk[chunk.length - 1].endsWith('.') ? '' : '.'}</p>
              ))}
            </div>

            {/* Institutional Sources */}
            <div className="flex flex-wrap gap-4 mt-8">
              {phenomenon.sources.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-science hover:text-white transition-colors font-[Space_Grotesk,sans-serif] px-3 py-1.5 bg-science/10 border border-science/20 rounded-lg"
                >
                  <ExternalLink className="w-3 h-3" />
                  Sumber: {source.name}
                </a>
              ))}
            </div>

            {/* ── Dynamic STEM Dashboard (R&D Requirement) ── */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-science/20 border border-science/30 flex items-center justify-center backdrop-blur-sm">
                    <FlaskConical className="w-4 h-4 text-science" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-ai-accent/20 border border-ai-accent/30 flex items-center justify-center backdrop-blur-sm">
                    <Cpu className="w-4 h-4 text-ai-accent" />
                  </div>
                </div>
                <h3 className="font-[Space_Grotesk,sans-serif] text-sm font-bold text-text-primary uppercase tracking-[0.2em]">
                  Laboratorium STEM
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Science', icon: FlaskConical, val: phenomenon.stem.science, color: 'text-science', bg: 'bg-science/5' },
                  { label: 'Technology', icon: Cpu, val: phenomenon.stem.technology, color: 'text-ai-accent', bg: 'bg-ai-accent/5' },
                  { label: 'Engineering', icon: Rocket, val: phenomenon.stem.engineering, color: 'text-reflection', bg: 'bg-reflection/5' },
                  { label: 'Mathematics', icon: Calculator, val: phenomenon.stem.mathematics, color: 'text-blue-400', bg: 'bg-blue-400/5' }
                ].map((item, idx) => (
                  <div key={idx} className={`${item.bg} p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group`}>
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="font-[Space_Grotesk,sans-serif] text-[10px] uppercase tracking-widest font-bold text-text-dim">
                        {item.label}
                      </span>
                    </div>
                    <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed">
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Prinsip Tawhid (Research Requirement) ── */}
            <div className="mt-12 p-8 rounded-3xl bg-reflection/5 border border-reflection/20 scroll-reveal">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-reflection" />
                <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-reflection">
                  Prinsip Tawhid & Integrasi
                </h3>
              </div>
              <p className="font-[Newsreader,serif] text-lg text-text-muted leading-relaxed">
                Integrasi antara ilmu pengetahuan dan agama Islam ini berlandaskan pada <strong>Prinsip Tawhid</strong>, yang menegaskan bahwa kebenaran hakiki adalah satu kesatuan yang utuh. Antara teks suci dan data empiris tidaklah bertentangan, melainkan saling melengkapi dalam menjelaskan mekanisme (Sains) dan tujuan (Agama) dari penciptaan alam semesta.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Religion Panel — 5 columns, overlapping with negative margin */}
        <div className="md:col-span-5 md:-ms-8 md:mt-16 z-10 scroll-reveal">
          <GlassCard className="bg-surface-low/80 border-s-4 border-s-reflection">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-reflection" />
              <span className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.2em] text-reflection font-bold">
                Refleksi Teologis
              </span>
            </div>

            {/* Arabic Verse(s) */}
            {phenomenon.verses.map((verse, i) => (
              <div key={i} className="mb-8">
                <ArabicText verse={verse} size="lg" />

                {/* Tafsir Brief */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="font-[Newsreader,serif] text-sm text-text-muted leading-relaxed italic">
                    {verse.tafsirBrief}
                  </p>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* ── Skala Interaktif / Fakta Cepat (Wow Factor) ── */}
      <section className="mb-24 scroll-reveal">
        <h2 className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ai-accent" />
          Fakta Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Skala', value: 'Makrokosmos' },
            { label: 'Metode Kajian', value: 'Astrofisika' },
            { label: 'Tingkat Presisi', value: 'Sangat Tinggi' },
            { label: 'Status Al-Qur\'an', value: 'Ayat Kauniyah' }
          ].map((fact, i) => (
            <GlassCard key={i} className="p-4 flex flex-col justify-between border-t-2 border-t-transparent hover:border-t-ai-accent transition-all">
              <span className="font-[Space_Grotesk,sans-serif] text-xs text-text-dim uppercase tracking-wider mb-2">{fact.label}</span>
              <span className="font-[Manrope,sans-serif] text-lg font-bold text-text-primary">{fact.value}</span>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── Galeri Visual Asimetris (Wow Factor) ──────── */}
      <section className="mb-32 scroll-reveal">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary">Galeri Kosmik</h2>
            <p className="font-[Manrope,sans-serif] text-sm text-text-muted mt-2">Visualisasi keagungan ciptaan</p>
          </div>
        </div>
        
        {/* Masonry-style asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px]">
          <div className="md:col-span-8 h-full rounded-2xl overflow-hidden relative group">
            <img src={phenomenon.heroImage} alt="Visual utama" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-space-dark/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="md:col-span-4 flex flex-col gap-4 h-full">
            <div className="h-2/5 rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format" alt="Visual 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
            </div>
            <div className="h-3/5 rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format" alt="Visual 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-linear-to-t from-space-dark/80 to-transparent flex items-end p-6">
                <p className="font-[Newsreader,serif] text-sm text-white italic">"Dan tidakkah mereka melihat langit..."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Arsitektur Data R&D (Metodologi) ────────── */}
      <section className="mb-32 scroll-reveal">
        <GlassCard className="p-8 md:p-12 border-t-4 border-science overflow-hidden relative group">
          <div className="absolute top-0 inset-e-0 w-64 h-64 bg-science/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:bg-science/10 transition-colors duration-1000" />
          
          <div className="max-w-4xl relative z-10">
            <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-6">
              Arsitektur Data Metodologi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-science/20 flex items-center justify-center text-science font-bold mb-4">1</div>
                <h4 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-text-primary">Observasi Empiris</h4>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed">
                  Pengumpulan data mentah dari teleskop angkasa dan observatorium internasional (NASA JPL, ESA, ISS, BRIN) mengenai anomali dan struktur kosmik terukur.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-reflection/20 flex items-center justify-center text-reflection font-bold mb-4">2</div>
                <h4 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-text-primary">Sintesis Teologis</h4>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed">
                  Pencocokan fenomena astronomi dengan Ayat Kauniyah melalui algoritma <strong>TF-IDF</strong> dan <strong>Cosine Similarity</strong> untuk menjamin akurasi rujukan tafsir Kemenag RI.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-ai-accent/20 flex items-center justify-center text-ai-accent font-bold mb-4">3</div>
                <h4 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-text-primary">Kurasi STEM</h4>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed">
                  Pengemasan data menjadi prototipe media pembelajaran interaktif yang merangsang nalar kritis (Science, Tech, Engineering, Math) para siswa MTs Sains Algebra.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ── Horizontal Scroller: Other Phenomena ──── */}
      <section className="scroll-reveal">
        <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-8">
          Fenomena Lainnya
        </h2>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 md:gap-6 scrollbar-hide -mx-4 px-4">
          {PHENOMENA.filter((p) => p.id !== phenomenon.id).map((p) => (
            <Link
              key={p.id}
              to={`/eksplorasi?id=${p.id}`}
              className="snap-center shrink-0 w-[80vw] md:w-[400px] group"
            >
              <GlassCard hover className="h-full">
                <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    width={400}
                    height={160}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-text-primary mb-2">
                  {p.title}
                </h3>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted line-clamp-2">
                  {p.description}
                </p>
              </GlassCard>
            </Link>
          ))}
          <div className="w-4 shrink-0" /> {/* End spacer */}
        </div>
      </section>
    </main>
  );
}
