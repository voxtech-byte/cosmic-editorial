import { Link } from 'react-router-dom';
import { GlassCard } from '@/shared/ui/GlassCard';
import { PHENOMENA, CATEGORY_META } from '@/entities/phenomena';
import { ArrowRight, Sparkles } from 'lucide-react';

/** Home page — Editorial hero + Asymmetric bento grid of real phenomena */
export function BerandaPage() {
  return (
    <main className="pt-24 md:pt-32 pb-32 px-page max-w-[1400px] mx-auto w-full">
      {/* ── Atmospheric Background Glows ─────────── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] inset-s-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(103,80,164,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-20%] inset-e-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(231,195,101,0.06)_0%,transparent_70%)]" />
      </div>

      {/* ── Hero Section ────────────────────────────── */}
      <header className="min-h-[60vh] flex flex-col justify-center relative mb-16 md:mb-24">
        {/* Background image with opacity blend */}
        <div
          className="absolute inset-e-0 top-0 w-2/3 h-full opacity-15 bg-cover bg-center mix-blend-screen rounded-3xl hidden md:block bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&auto=format')]"
        />

        <div className="relative z-10 max-w-4xl">
          {/* Eyebrow */}
          <span className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.3em] text-science font-bold mb-6 block">
            Prototipe Media Pembelajaran Berbasis STEM<br/>
            <span className="text-text-muted text-[10px] tracking-[0.4em] mt-2 block">MTs Sains Algebra Kota Sorong</span>
          </span>

          {/* Display Title — clamp() fluid scaling */}
          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(2.5rem,8vw+1rem,6rem)] font-bold tracking-tighter leading-[0.9] text-text-primary mb-8">
            Fenomena<br />
            <span className="text-science">Luar Angkasa</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 ms-8 md:ms-12">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
              Proyek Kokulikuler R&D
            </div>
            <div className="hidden md:block w-8 h-px bg-white/20" />
            <p className="font-[Newsreader,serif] text-lg text-text-muted max-w-lg leading-relaxed">
              Sintesis harmoni antara data astrofisika modern dan kedalaman makna Ayat Kauniyah untuk MTs Sains Algebra.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/eksplorasi"
            className="inline-flex items-center gap-3 mt-10 ms-8 md:ms-12 px-8 py-4 bg-science text-space-dark font-[Space_Grotesk,sans-serif] font-bold rounded-2xl shadow-[0_4px_0_0_#4f378a] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all duration-200"
          >
            Mulai Eksplorasi
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* ── Cosmic Scale Numbers (Staggered Asymmetry) ───────── */}
      <section className="mb-24 md:mb-48 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-y border-border py-20 scroll-reveal">
        <div className="text-center md:text-start md:mt-0">
          <span className="font-[Space_Grotesk,sans-serif] text-[clamp(3.5rem,6vw,6rem)] font-bold text-science block leading-none mb-2">
            13.8<span className="text-2xl text-text-dim">M</span>
          </span>
          <p className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.4em] text-text-muted font-black">
            Tahun Umur Semesta
          </p>
        </div>
        <div className="text-center md:text-start md:border-s border-border md:ps-12 md:mt-12">
          <span className="font-[Space_Grotesk,sans-serif] text-[clamp(3.5rem,6vw,6rem)] font-bold text-reflection block leading-none mb-2">
            200<span className="text-2xl text-text-dim">M+</span>
          </span>
          <p className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.4em] text-text-muted font-black">
            Galaksi Teramati
          </p>
        </div>
        <div className="text-center md:text-start md:border-s border-border md:ps-12 md:mt-24">
          <span className="font-[Space_Grotesk,sans-serif] text-[clamp(3.5rem,6vw,6rem)] font-bold text-ai-accent block leading-none mb-2">
            100<span className="text-2xl text-text-dim">%</span>
          </span>
          <p className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-[0.4em] text-text-muted font-black">
            Tunduk Pada Sunnatullah
          </p>
        </div>
      </section>

      {/* ── Bento Grid: Phenomena ────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24 mb-48">
        {/* Featured Card — 7 columns, 2 rows */}
        <Link
          to={`/eksplorasi?id=${PHENOMENA[0].id}`}
          className="col-span-12 md:col-span-7 md:row-span-2 group"
        >
          <GlassCard hover className="h-full min-h-[500px] flex flex-col justify-end relative overflow-hidden">
            {/* Background Image with Parallax-like feel */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000 bg-[image:var(--bg-image)]"
              style={{ '--bg-image': `url('${PHENOMENA[0].heroImage}')` } as React.CSSProperties}
            />
            <div className="absolute inset-0 bg-linear-to-t from-space-dark via-space-dark/80 to-transparent" />
            
            <div className="relative z-10 p-4 md:p-8">
              <span className="inline-flex items-center gap-2 px-4 py-1 text-[10px] font-bold tracking-[0.2em] text-science border border-science/30 rounded-full uppercase mb-6 bg-science/5">
                <Sparkles className="w-3 h-3" />
                Featured Phenomenon
              </span>
              <h2 className="font-[Space_Grotesk,sans-serif] text-4xl md:text-6xl font-bold text-text-primary leading-[0.85] mb-4 tracking-tighter">
                {PHENOMENA[0].title}
              </h2>
              <p className="font-[Manrope,sans-serif] text-sm text-text-muted max-w-md line-clamp-3 leading-relaxed">
                {PHENOMENA[0].description}
              </p>
            </div>
          </GlassCard>
        </Link>

        {/* Supporting Cards */}
        {PHENOMENA.slice(1).map((phenomenon, i) => {
          // i=0 is Index 1, i=1 is Index 2, etc.
          // i=0 and i=1 should be col-5 to fit next to featured (col-7)
          // i >= 2 should be col-6 to fill rows below
          const isSideCard = i < 2;
          const colSpan = isSideCard ? 'md:col-span-5' : 'md:col-span-6';
          const margin = isSideCard 
            ? (i === 0 ? 'md:mt-32' : 'md:-mt-16') 
            : 'md:mt-0';

          return (
            <Link
              key={phenomenon.id}
              to={`/eksplorasi?id=${phenomenon.id}`}
              className={`col-span-12 ${colSpan} group ${margin}`}
            >
              <GlassCard hover className="h-full min-h-[350px] flex flex-col justify-end p-0 overflow-hidden relative border-white/5 hover:border-white/10">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-110 group-hover:opacity-90 transition-all duration-1000 bg-[image:var(--bg-image)]"
                  style={{ '--bg-image': `url('${phenomenon.heroImage}')` } as React.CSSProperties}
                />
                <div className="absolute inset-0 bg-linear-to-t from-space-dark via-space-dark/80 to-transparent" />

                {/* Content Area */}
                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-auto">
                    <div className="flex items-center gap-2 px-3 py-1 bg-space-dark/60 backdrop-blur-md rounded-full border border-white/10">
                      <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_META[phenomenon.category].color}`} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${CATEGORY_META[phenomenon.category].color}`}>
                        {CATEGORY_META[phenomenon.category].label}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-space-dark/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-science group-hover:text-space-dark transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="font-[Space_Grotesk,sans-serif] text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-science transition-colors">
                      {phenomenon.title}
                    </h3>
                    <p className="font-[Manrope,sans-serif] text-sm text-text-muted line-clamp-2 leading-relaxed">
                      {phenomenon.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </section>

      {/* ── Pilar STEM (Asymmetric 5:7) ────────────────── */}
      <section className="mt-48 md:mt-64 scroll-reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
          <div className="md:col-span-4 space-y-12">
            <h2 className="font-[Space_Grotesk,sans-serif] text-4xl md:text-6xl font-bold text-text-primary leading-none tracking-tighter">
              Pilar <br />
              <span className="text-science">STEM</span>
            </h2>
            <div className="space-y-12">
              {[
                { title: 'Sains', desc: 'Hukum fisika semesta sebagai Sunnatullah.' },
                { title: 'Teknologi', desc: 'AI & Observatorium Digital.' }
              ].map((p, i) => (
                <div key={i} className="group border-s-2 border-white/5 ps-6 hover:border-science transition-colors">
                  <h4 className="font-bold text-text-primary text-xl mb-2">{p.title}</h4>
                  <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:mt-12">
              <GlassCard className="h-full min-h-[300px] flex flex-col justify-center p-12 bg-reflection/5 border-reflection/10">
                <h4 className="font-bold text-reflection text-2xl mb-4">Engineering</h4>
                <p className="text-sm text-text-muted leading-relaxed">Desain wahana antariksa dan instrumen observasi sebagai solusi teknis eksplorasi manusia.</p>
              </GlassCard>
            </div>
            <div>
              <GlassCard className="h-full min-h-[300px] flex flex-col justify-center p-12 bg-ai-accent/5 border-ai-accent/10">
                <h4 className="font-bold text-ai-accent text-2xl mb-4">Mathematics</h4>
                <p className="text-sm text-text-muted leading-relaxed">Kalkulasi presisi periode revolusi dan penghitungan jarak dalam skala Tahun Cahaya.</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
      {/* ── Garis Waktu Eksplorasi (Timeline) ───────── */}
      <section className="mt-20 md:mt-32 scroll-reveal">
        <div className="max-w-3xl mb-12">
          <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Garis Waktu Eksplorasi Semesta
          </h2>
          <p className="font-[Manrope,sans-serif] text-text-muted">
            Jejak langkah manusia dalam memahami langit, dari era keemasan Islam hingga peluncuran teleskop angkasa modern.
          </p>
        </div>

        <div className="relative border-s border-white/10 md:ms-6 space-y-12 pb-8">
          {[
            {
              year: 'Abad Ke-9',
              title: 'Era Keemasan Islam (Baitul Hikmah)',
              desc: 'Penerjemahan besar-besaran manuskrip astronomi kuno. Ilmuwan seperti Al-Khawarizmi meletakkan dasar astrolab dan navigasi bintang yang akurat.',
              color: 'text-reflection'
            },
            {
              year: 'Abad Ke-13',
              title: 'Observatorium Maragha',
              desc: 'Didirikan oleh Nasir al-Din al-Tusi. Observatorium paling maju di masanya, menghasilkan tabel planet akurat dan model matematika yang kelak memengaruhi Copernicus.',
              color: 'text-science'
            },
            {
              year: '1990',
              title: 'Teleskop Luar Angkasa Hubble',
              desc: 'Peluncuran Hubble membuka mata manusia terhadap luasnya alam semesta, membuktikan keberadaan miliaran galaksi dan mengukur laju ekspansi semesta (Ayat Kauniyah).',
              color: 'text-blue-400'
            },
            {
              year: '2021',
              title: 'Teleskop James Webb (JWST)',
              desc: 'Teleskop inframerah terbesar diluncurkan. JWST mampu menembus debu kosmik untuk melihat cahaya pertama alam semesta (first light), menyingkap tabir penciptaan.',
              color: 'text-ai-accent'
            }
          ].map((item, i) => (
            <div key={i} className="relative ps-8 md:ps-12 group">
              {/* Timeline Dot */}
              <div className="absolute top-1.5 -inset-s-2 w-4 h-4 rounded-full bg-space-dark border-2 border-white/20 group-hover:border-science transition-colors" />
              <div className={`absolute top-2.5 -inset-s-1 w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-reflection' : 'bg-science'} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="glass-panel p-6 rounded-2xl group-hover:bg-white/5 transition-colors">
                <span className={`font-[Space_Grotesk,sans-serif] text-sm font-bold tracking-widest uppercase mb-2 block ${item.color}`}>
                  {item.year}
                </span>
                <h3 className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── Pilar Pendidikan STEM (Requirement 3) ─────────────── */}
      <section className="mt-20 md:mt-40 scroll-reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <h2 className="font-[Space_Grotesk,sans-serif] text-3xl md:text-5xl font-bold text-text-primary leading-[1.1] mb-8">
              Pilar Pendidikan <span className="text-science underline decoration-science/20 underline-offset-8">STEM</span>
            </h2>
            <div className="space-y-8">
              {[
                { title: 'Science (Sains)', desc: 'Mengkaji hukum fisika semesta—gravitasi, orbit, dan termodinamika bintang—sebagai wujud keteraturan Sunnatullah.' },
                { title: 'Technology (Teknologi)', desc: 'Pemanfaatan AI Machine Learning dan observatorium digital untuk memproses data real-time dari NASA, ESA, dan BRIN.' },
                { title: 'Engineering (Rekayasa)', desc: 'Memahami desain wahana antariksa, perisai panas, dan instrumen observasi sebagai solusi teknis eksplorasi manusia.' },
                { title: 'Mathematics (Matematika)', desc: 'Kalkulasi presisi periode revolusi, konversi waktu (siang-malam), dan penghitungan jarak dalam skala Tahun Cahaya.' }
              ].map((pilar, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-surface-high border border-white/5 flex items-center justify-center font-[Space_Grotesk,sans-serif] font-bold text-science group-hover:bg-science group-hover:text-space-dark transition-all duration-300">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary font-[Space_Grotesk,sans-serif] text-lg mb-1">{pilar.title}</h4>
                    <p className="text-sm text-text-muted font-[Manrope,sans-serif] leading-relaxed max-w-md">{pilar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-7 order-1 md:order-2">
            <GlassCard className="aspect-square md:aspect-4/5 relative overflow-hidden p-0 border-0 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-2000 group-hover:scale-110 bg-[image:var(--bg-image)]" 
                style={{ '--bg-image': `url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?w=1200&auto=format')` } as React.CSSProperties}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-space-dark/90 via-space-dark/40 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 inset-e-8 px-4 py-2 bg-science/20 backdrop-blur-xl border border-science/30 rounded-full">
                <span className="text-[10px] font-bold text-science uppercase tracking-widest">MTs Sains Algebra Exclusive</span>
              </div>

              <div className="absolute bottom-8 inset-s-8 inset-e-8 p-8 bg-surface-high/60 backdrop-blur-2xl rounded-3xl border border-white/10">
                <p className="font-[Newsreader,serif] text-xl md:text-2xl text-white leading-relaxed italic mb-4">
                  "Sains menjelaskan mekanisme, agama menjelaskan tujuan. Keduanya adalah dua sayap bagi peradaban."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-1 rounded-full bg-science" />
                  <span className="text-xs font-[Space_Grotesk,sans-serif] text-text-dim uppercase tracking-[0.2em]">Landasan Filosofis R&D</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── AI Teaser Section ───────────────────────── */}
      <section className="mt-16 md:mt-24 scroll-reveal">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-ai-accent text-4xl mb-4 block">✦</span>
          <h2 className="font-[Space_Grotesk,sans-serif] text-[clamp(1.5rem,4vw,3rem)] font-bold text-text-primary mb-4">
            Didukung Kecerdasan Buatan
          </h2>
          <p className="font-[Newsreader,serif] text-lg text-text-muted max-w-2xl mx-auto mb-8">
            Tanyakan apa saja tentang fenomena antariksa dan integrasinya dengan nilai-nilai Islam. Asisten AI kami siap menjelaskan dengan bahasa yang mudah dipahami.
          </p>
          <Link
            to="/asisten"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-ai-accent/30 text-ai-accent font-[Space_Grotesk,sans-serif] font-semibold rounded-full hover:bg-ai-accent/10 transition-colors"
          >
            Mulai Bertanya
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── The Philosopher's Quote (Wow Factor) ─────── */}
      <section className="mt-32 md:mt-48 mb-20 scroll-reveal">
        <div className="relative py-24 md:py-32 px-8 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Deep Space Background for quote */}
          <div className="absolute inset-0 bg-space-void z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,80,164,0.15)_0%,transparent_70%)] z-0" />
          
          <div className="relative z-10 max-w-4xl">
            <Sparkles className="w-8 h-8 text-science/50 mx-auto mb-8" />
            <blockquote className="font-[Newsreader,serif] text-[clamp(1.5rem,4vw,3rem)] text-text-primary leading-tight italic mb-8">
              "Tidakkah mereka memperhatikan langit di atas mereka, bagaimana Kami meninggikannya dan menghiasinya, dan langit itu tidak mempunyai retak-retak sedikit pun?"
            </blockquote>
            <cite className="font-[Space_Grotesk,sans-serif] text-sm uppercase tracking-[0.3em] text-text-muted not-italic block">
              QS. Qaf: 6
            </cite>
          </div>
        </div>
      </section>

      {/* ── Premium Footer ──────────────────────────── */}
      <footer className="mt-32 border-t border-white/5 pt-16 pb-8 scroll-reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <span className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary tracking-tighter block mb-4">
              Cosmic Editorial<span className="text-science">.</span>
            </span>
            <p className="font-[Manrope,sans-serif] text-sm text-text-muted max-w-xs leading-relaxed">
              Prototipe media pembelajaran R&D untuk mengintegrasikan sains luar angkasa dengan perspektif agama.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col md:flex-row gap-8 md:gap-24 justify-end">
            <div>
              <h4 className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-widest text-text-primary mb-4 font-bold">Navigasi</h4>
              <ul className="space-y-3 font-[Manrope,sans-serif] text-sm text-text-dim">
                <li><Link to="/" className="hover:text-science transition-colors">Beranda</Link></li>
                <li><Link to="/eksplorasi" className="hover:text-science transition-colors">Eksplorasi</Link></li>
                <li><Link to="/arsip" className="hover:text-science transition-colors">Arsip</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-[Space_Grotesk,sans-serif] text-xs uppercase tracking-widest text-text-primary mb-4 font-bold">Proyek</h4>
              <ul className="space-y-3 font-[Manrope,sans-serif] text-sm text-text-dim">
                <li>MTs Sains Algebra</li>
                <li>Kota Sorong, 2026</li>
                <li>Pendekatan STEM</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-[Manrope,sans-serif] text-xs text-text-dim">
          <p>© 2026 R&D Project. Hak Cipta Dilindungi.</p>
          <p>Didukung oleh Kecerdasan Buatan.</p>
        </div>
      </footer>
    </main>
  );
}
