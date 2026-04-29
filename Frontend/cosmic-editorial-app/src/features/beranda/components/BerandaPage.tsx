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
        <div className="absolute -top-[20%] -inset-s-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(103,80,164,0.12)_0%,transparent_70%)]" />
        <div className="absolute -bottom-[20%] -inset-e-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(231,195,101,0.06)_0%,transparent_70%)]" />
      </div>

      {/* ── Hero Section ────────────────────────────── */}
      <header className="min-h-[60vh] flex flex-col justify-center relative mb-16 md:mb-24">
        {/* Background image with opacity blend */}
        <div
          className="absolute inset-e-0 top-0 w-2/3 h-full opacity-15 bg-cover bg-center mix-blend-screen rounded-3xl hidden md:block"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&auto=format')` }}
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

          {/* Subheadline with border accent */}
          <p className="font-[Newsreader,serif] text-lg md:text-xl text-text-muted max-w-2xl ms-8 md:ms-12 border-s-2 border-border ps-6 leading-relaxed">
            Sintesis antara sains empiris dan refleksi teologis. Menjelajahi kebesaran alam semesta melalui lensa ilmu pengetahuan dan cahaya wahyu Al-Qur'an.
          </p>

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

      {/* ── Cosmic Scale Numbers (Wow Factor) ───────── */}
      <section className="mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-y border-border py-12 scroll-reveal">
        <div className="text-center md:text-start">
          <span className="font-[Space_Grotesk,sans-serif] text-[clamp(3rem,5vw,5rem)] font-bold text-science block leading-none mb-2">
            13.8<span className="text-2xl text-text-dim">M</span>
          </span>
          <p className="font-[Space_Grotesk,sans-serif] text-sm uppercase tracking-widest text-text-muted font-bold">
            Tahun Umur Semesta
          </p>
        </div>
        <div className="text-center md:text-start md:border-s border-border md:ps-12">
          <span className="font-[Space_Grotesk,sans-serif] text-[clamp(3rem,5vw,5rem)] font-bold text-reflection block leading-none mb-2">
            200<span className="text-2xl text-text-dim">M+</span>
          </span>
          <p className="font-[Space_Grotesk,sans-serif] text-sm uppercase tracking-widest text-text-muted font-bold">
            Galaksi Teramati
          </p>
        </div>
        <div className="text-center md:text-start md:border-s border-border md:ps-12">
          <span className="font-[Space_Grotesk,sans-serif] text-[clamp(3rem,5vw,5rem)] font-bold text-ai-accent block leading-none mb-2">
            100<span className="text-2xl text-text-dim">%</span>
          </span>
          <p className="font-[Space_Grotesk,sans-serif] text-sm uppercase tracking-widest text-text-muted font-bold">
            Tunduk Pada Sunnatullah
          </p>
        </div>
      </section>

      {/* ── Bento Grid: Phenomena (7/5 Asymmetric Split) ── */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Featured Card — 7 columns, 2 rows */}
        <Link
          to={`/eksplorasi?id=${PHENOMENA[0].id}`}
          className="col-span-12 md:col-span-7 md:row-span-2 group"
        >
          <GlassCard hover className="h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-end relative">
            {/* Background Image */}
            <div
              className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"
              style={{ backgroundImage: `url('${PHENOMENA[0].heroImage}')` }}
            />
            <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-space-dark via-space-dark/60 to-transparent" />

            {/* Nebula Accent */}
            <span className="absolute -top-12 -inset-e-12 w-40 h-40 bg-science/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-[Space_Grotesk,sans-serif] tracking-widest text-science border border-science/30 rounded-full uppercase mb-4">
                <Sparkles className="w-3 h-3" />
                {CATEGORY_META[PHENOMENA[0].category].label}
              </span>
              <h2 className="font-[Space_Grotesk,sans-serif] text-[clamp(1.5rem,3vw+1rem,2.5rem)] font-bold text-text-primary leading-tight mb-3">
                {PHENOMENA[0].title}
              </h2>
              <p className="font-[Manrope,sans-serif] text-sm text-text-muted max-w-lg line-clamp-3">
                {PHENOMENA[0].description}
              </p>
            </div>
          </GlassCard>
        </Link>

        {/* Supporting Cards — 5 columns */}
        {PHENOMENA.slice(1).map((phenomenon) => (
          <Link
            key={phenomenon.id}
            to={`/eksplorasi?id=${phenomenon.id}`}
            className="col-span-12 md:col-span-5 group"
          >
            <GlassCard hover className="h-full min-h-[200px] flex flex-col justify-between">
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-[Space_Grotesk,sans-serif] uppercase tracking-[0.2em] font-bold ${CATEGORY_META[phenomenon.category].color}`}>
                  {CATEGORY_META[phenomenon.category].label}
                </span>
                <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-science group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary mb-2 leading-tight">
                  {phenomenon.title}
                </h3>
                <p className="font-[Manrope,sans-serif] text-sm text-text-muted line-clamp-2">
                  {phenomenon.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {phenomenon.tags.slice(0, 3).map((tag) => (
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
        ))}
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
              <div className="absolute top-1.5 -start-2 w-4 h-4 rounded-full bg-space-dark border-2 border-white/20 group-hover:border-science transition-colors" />
              <div className={`absolute top-2.5 -start-1 w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-reflection' : 'bg-science'} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
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
      {/* ── Landasan Proyek Section ─────────────────── */}
      <section className="mt-20 md:mt-32 scroll-reveal">
        <GlassCard className="p-8 md:p-12 relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 end-0 w-[40vw] h-[40vw] bg-reflection/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-3xl font-bold text-text-primary mb-6">
              Mengapa Proyek Ini Penting?
            </h2>
            <div className="space-y-4 font-[Manrope,sans-serif] text-text-muted leading-relaxed">
              <p>
                Penelitian R&D (Research and Development) ini dilatarbelakangi oleh kurang terintegrasinya pemahaman sains luar angkasa dengan nilai-nilai agama di sekolah berbasis Islam. Hal ini menyebabkan generasi muda sering memisahkan sains empiris dengan keyakinan spiritual mereka.
              </p>
              <p>
                Di <strong>MTs Sains Algebra Kota Sorong</strong>, kami mengembangkan prototipe media pembelajaran menggunakan pendekatan <strong>STEM</strong> (Science, Technology, Engineering, Mathematics). Tujuannya adalah membekali siswa dengan keterampilan abad ke-21 melalui integrasi data eksplorasi luar angkasa (seperti NASA/ESA) dan perenungan ayat-ayat Kauniyah.
              </p>
              <p className="font-[Newsreader,serif] italic text-reflection/90 text-lg border-s border-reflection/30 ps-4 mt-6">
                "Apabila terjadi perbedaan antara temuan sains dan teks agama, hal itu umumnya disebabkan oleh keterbatasan media tersaji, bukan pertentangan yang sebenarnya. Sains menjelaskan mekanisme, agama menjelaskan tujuan."
              </p>
            </div>
          </div>
        </GlassCard>
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
