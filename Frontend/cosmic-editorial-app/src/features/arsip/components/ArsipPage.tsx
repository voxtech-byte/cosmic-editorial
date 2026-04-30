import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/shared/ui/GlassCard';
import { ArabicText } from '@/shared/ui/ArabicText';
import { PHENOMENA, CATEGORY_META } from '@/entities/phenomena';
import { ArrowRight, ExternalLink, FlaskConical } from 'lucide-react';

/** Archive page — all phenomena with bento layout + horizontal scroller */
export function ArsipPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="pt-24 md:pt-32 pb-32 px-page max-w-[1400px] mx-auto w-full">
      {/* Atmospheric Glows - hidden on mobile for performance */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden md:block">
        <div className="absolute top-[-15%] inset-s-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(103,80,164,0.1)_0%,transparent_70%)]" />
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

      {/* ── Phenomena Archive Grid ────────────────── */}
      {/* Mobile: 2-column masonry | Desktop: Featured 8col + others 4col */}
      <section className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-8 mb-32">
        {PHENOMENA.map((phenomenon, index) => {
          // Mobile: All items take 1 column (col-span-1 = half width)
          // Desktop: First item takes 8 columns, others take 4
          const mobileSpan = 'col-span-1';
          const desktopSpan = index === 0 ? 'md:col-span-8' : 'md:col-span-4';
          // Alternate heights for masonry feel on mobile
          const mobileHeight = index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]';
          
          return (
            <Link
              key={phenomenon.id}
              to={`/eksplorasi?id=${phenomenon.id}`}
              className={`${mobileSpan} ${desktopSpan} group scroll-reveal`}
            >
              <GlassCard hover className="h-full flex flex-col p-0 overflow-hidden transition-all duration-500 hover:border-science/30">
                {/* Card Image Banner */}
                <div className={`md:${index === 0 ? 'h-80' : 'h-48'} ${mobileHeight} w-full relative overflow-hidden`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 bg-[image:var(--bg-image)]"
                    style={{ '--bg-image': `url('${phenomenon.heroImage}')` } as React.CSSProperties}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-surface-high via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 md:top-4 inset-x-2 md:inset-x-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 md:gap-2 px-1.5 md:px-2 py-0.5 md:py-1 bg-space-dark/60 backdrop-blur-md rounded-full border border-white/10">
                      <div className={`w-1 h-1 rounded-full ${CATEGORY_META[phenomenon.category].color}`} />
                      <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] ${CATEGORY_META[phenomenon.category].color}`}>
                        {CATEGORY_META[phenomenon.category].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-3 md:p-6 flex-1 flex flex-col">
                  <h3 className={`font-[Space_Grotesk,sans-serif] ${index === 0 ? 'md:text-4xl' : 'md:text-xl'} text-sm md:text-xl font-bold text-text-primary mb-2 md:mb-3 leading-tight group-hover:text-science transition-colors line-clamp-2 md:line-clamp-none`}>
                    {phenomenon.title}
                  </h3>
                  
                  <p className="font-[Manrope,sans-serif] text-[11px] md:text-sm text-text-muted leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 md:mb-6 flex-1 hidden md:block">
                    {phenomenon.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-white/5 mt-auto">
                    <div className="flex gap-1.5 md:gap-2">
                      {phenomenon.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[8px] md:text-[9px] font-mono text-text-dim/40 uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-text-dim group-hover:text-science group-hover:translate-x-1 transition-all" />
                  </div>
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
                className="snap-center shrink-0 w-[90vw] max-w-[500px]"
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

      {/* ── Laporan Teknis & Metodologi R&D (Detail Paper) ── */}
      <section className="mb-24 scroll-reveal">
        <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
          <span className="w-10 h-px bg-science" />
          Metodologi & Parameter Teknis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Methodology Card */}
          <GlassCard className="col-span-12 md:col-span-8 p-8 border-s-4 border-s-science">
            <h3 className="font-[Space_Grotesk,sans-serif] text-lg font-bold text-science mb-6 flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Research and Development (R&D)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-[Manrope,sans-serif] text-sm text-text-dim leading-relaxed">
              <div className="space-y-4">
                <p>
                  Prototipe ini dikembangkan menggunakan library <strong>Scikit-learn</strong> dengan implementasi algoritma <strong>TF-IDF</strong> dan <strong>Cosine Similarity</strong> untuk pemrosesan teks terintegrasi.
                </p>
                <p>
                  <strong>Lingkungan Pengembangan:</strong> Sistem dibangun di atas infrastruktur komputasi <em>Vivobook Series</em> selama kurun waktu 4 bulan (Januari - April 2026).
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <strong>Afiliasi Internasional:</strong> Pengembangan ini selaras dengan dorongan <strong>UNESCO</strong> dan <strong>UNOOSA</strong> dalam pemanfaatan data luar angkasa (seperti dari <em>International Space Station</em>) sebagai instrumen pendidikan abad ke-21.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Purposive Sampling Card */}
          <GlassCard className="col-span-12 md:col-span-4 p-8 bg-surface-high/20 border-ai-accent/20">
            <h3 className="font-[Space_Grotesk,sans-serif] text-sm font-bold text-ai-accent uppercase tracking-widest mb-4">
              Status Pengujian (UAT)
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Metode Sampling</span>
                <span className="text-xs font-bold text-white">Purposive Sampling</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Responden Terpilih</span>
                <span className="text-xs font-bold text-white">5 Siswa (Kelas VIII)</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                <div className="w-full h-full bg-ai-accent" />
              </div>
              <p className="text-[10px] text-text-dim italic leading-relaxed">
                *Responden dipilih berdasarkan tingkat efektivitas dan produktivitas belajar tinggi untuk validasi teknis algoritma.
              </p>
            </div>
          </GlassCard>
        </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
