import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/shared/ui/GlassCard';
import { PHENOMENA, CATEGORY_META } from '@/entities/phenomena';
import { ArrowRight, Sparkles } from 'lucide-react';

// Helper untuk optimasi Unsplash URL
function getOptimizedImageUrl(url: string, width: number): string {
  if (url.includes('images.unsplash.com')) {
    return `${url}&w=${width}&q=80&fm=webp`;
  }
  return url;
}

// Data untuk section Fisika Klasik & Modern
const FISIKA_PILLARS = [
  {
    id: 'klasik',
    title: 'Fisika Klasik',
    subtitle: 'Mekanika & Gravitasi',
    icon: '🍎',
    color: 'bg-science',
    textColor: 'text-science',
    desc: 'Fisika klasik mempelajari gerak dan gaya dalam skala makroskopis yang dapat diamati sehari-hari. Hukum Gravitasi Newton menjelaskan mengapa planet mengorbit matahari dan mengapa bulan tidak jatuh ke bumi. Hukum Kepler merumuskan pola matematis orbit elips planet, sementara mekanika fluida dan termodinamika menjadi dasar perancangan roket serta perisai panas pesawat ulang-alik. Semua perhitungan penerbangan antariksa—from peluncuran satelit hingga misi ke Mars—mengandalkan prinsip-prinsip fisika klasik ini.',
    concepts: [
      { name: 'Hukum Gravitasi', desc: 'Gaya tarik antar dua massa berbanding terbalik dengan kuadrat jarak' },
      { name: 'Gerak Parabola', desc: 'Lintasan proyektil di bawah pengaruh gravitasi' },
      { name: 'Orbit Elips', desc: 'Lintasan tertutup dengan dua titik fokus' },
      { name: 'Momentum', desc: 'Hasil kali massa dan kecepatan yang kekal dalam sistem tertutup' }
    ],
    formulas: [
      { eq: 'F = G·(m₁m₂)/r²', name: 'Gravitasi Universal Newton' },
      { eq: 'T² = (4π²/GM)·a³', name: 'Hukum Kepler III' }
    ],
    scientists: [
      { name: 'Isaac Newton', img: '/scientists/Newton.webp', year: '1643-1727', contrib: 'Hukum Gravitasi' },
      { name: 'Johannes Kepler', img: '/scientists/Kepler.webp', year: '1571-1630', contrib: 'Hukum Orbit' },
      { name: 'Galileo Galilei', img: '/scientists/Galileo.webp', year: '1564-1642', contrib: 'Kinematika' }
    ]
  },
  {
    id: 'modern',
    title: 'Fisika Modern',
    subtitle: 'Relativitas & Quantum',
    icon: '⚡',
    color: 'bg-reflection',
    textColor: 'text-reflection',
    desc: 'Fisika modern merevolusi pemahaman kita tentang realitas fundamental alam semesta. Teori Relativitas Umum Einstein mengubah gravitasi dari sekadar "gaya tarik" menjadi kelengkungan geometri ruang-waktu empat dimensi—memprediksi adanya lubang hitam, gelombang gravitasi, dan dilatasi waktu di dekat massa besar. Sementara mekanika quantum mengungkap dunia partikel subatomik yang berperilaku sebagai gelombang dan partikel secara bersamaan, menghasilkan teknologi laser, transistor, dan komputer kuantum masa depan.',
    concepts: [
      { name: 'Ruang-Waktu 4D', desc: 'Fabrik kosmik yang melengkung di sekitar massa' },
      { name: 'Dualitas', desc: 'Partikel dapat berperilaku sebagai gelombang' },
      { name: 'Entanglement', desc: 'Korelasi kuantum antar partikel terpisah' },
      { name: 'Singularitas', desc: 'Titik dengan densitas tak hingga di pusat lubang hitam' }
    ],
    formulas: [
      { eq: 'E² = (pc)² + (mc²)²', name: 'Relativitas Energi-Momentum' },
      { eq: 'E = ℏω', name: 'Energi Foton (Planck)' }
    ],
    scientists: [
      { name: 'Albert Einstein', img: '/scientists/Einstein.webp', year: '1879-1955', contrib: 'Relativitas' },
      { name: 'Max Planck', img: '/scientists/Planck.webp', year: '1858-1947', contrib: 'Quantum' },
      { name: 'Niels Bohr', img: '/scientists/Bohr.webp', year: '1885-1962', contrib: 'Model Atom' }
    ]
  },
  {
    id: 'astronomi',
    title: 'Astronomi',
    subtitle: 'Observasional & Kosmologi',
    icon: '🔭',
    color: 'bg-ai-accent',
    textColor: 'text-ai-accent',
    desc: 'Astronomi adalah studi sistematis tentang segala sesuatu di luar atmosfer bumi—dari fisi nuklir di inti bintang hingga struktur kosmik paling besar. Dengan menganalisis spektrum elektromagnetik dari gelombang radio hingga sinar gamma, astronom dapat menentukan komposisi kimia, temperatur, dan kecepatan objek langit. Kosmologi modern, didukung data dari teleskop James Webb Space Telescope (JWST), mengungkap bahwa alam semesta berusia 13.8 miliar tahun dan terus mengembang dengan percepatan akibat energi gelap yang masih misterius.',
    concepts: [
      { name: 'Redshift Kosmik', desc: 'Pemanjangan gelombang cahaya karena ekspansi alam semesta' },
      { name: 'Tahun Cahaya', desc: 'Jarak yang ditempuh cahaya dalam satu tahun' },
      { name: 'Spektrum EM', desc: 'Rentang radiasi dari radio hingga gamma' },
      { name: 'Horizon Peristiwa', desc: 'Batas tak kembali di sekitar lubang hitam' }
    ],
    formulas: [
      { eq: 'v = H₀ · d', name: 'Hukum Hubble (Ekspansi)' },
      { eq: 'z = (λ_obs - λ_emit)/λ_emit', name: 'Redshift Kosmik' }
    ],
    scientists: [
      { name: 'Edwin Hubble', img: '/scientists/Hubble.webp', year: '1889-1953', contrib: 'Ekspansi Alam' },
      { name: 'Stephen Hawking', img: '/scientists/Hawking.webp', year: '1942-2018', contrib: 'Lubang Hitam' },
      { name: 'Carl Sagan', img: '/scientists/Sagan.webp', year: '1934-1996', contrib: 'Kosmos' }
    ]
  }
] as const;

/** Home page — Editorial hero + Asymmetric bento grid of real phenomena */
export function BerandaPage() {
  // State untuk tab aktif di mobile (Fisika section)
  const [activeFisikaTab, setActiveFisikaTab] = useState<'klasik' | 'modern' | 'astronomi'>('klasik');
  // State untuk expand card (mobile & desktop)
  const [expandedCard, setExpandedCard] = useState<'klasik' | 'modern' | 'astronomi' | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Helper untuk toggle expand
  const toggleExpand = (id: 'klasik' | 'modern' | 'astronomi') => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <main className="pt-24 md:pt-32 pb-32 px-page max-w-[1400px] mx-auto w-full">
      {/* ── Atmospheric Background Glows ─────────── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden md:block">
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
      <section className="mb-48">
        {/* Featured Card — Full width on all devices */}
        <Link
          to={`/eksplorasi?id=${PHENOMENA[0].id}`}
          className="block mb-6 md:mb-0 md:col-span-7 md:row-span-2 group"
        >
          <GlassCard hover className="h-full min-h-[280px] sm:min-h-[350px] md:min-h-[500px] flex flex-col justify-end relative overflow-hidden">
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
              <h2 className="font-[Space_Grotesk,sans-serif] text-3xl sm:text-4xl md:text-6xl font-bold text-text-primary leading-[0.85] mb-4 tracking-tighter">
                {PHENOMENA[0].title}
              </h2>
              <p className="font-[Manrope,sans-serif] text-sm text-text-muted max-w-md line-clamp-3 leading-relaxed">
                {PHENOMENA[0].description}
              </p>
            </div>
          </GlassCard>
        </Link>

        {/* Mobile: Horizontal Scroll Gallery */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory pb-4 gap-4 scrollbar-hide -mx-4 px-4">
          {PHENOMENA.slice(1, 4).map((phenomenon, idx) => (
            <Link
              key={phenomenon.id}
              to={`/eksplorasi?id=${phenomenon.id}`}
              className="snap-center shrink-0 w-[75vw] max-w-[300px] group"
            >
              <GlassCard hover className="h-[280px] flex flex-col justify-end p-0 overflow-hidden relative border-white/5">
                <img
                  src={getOptimizedImageUrl(phenomenon.heroImage, 600)}
                  alt={phenomenon.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-all duration-1000"
                  width={600}
                  height={400}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-space-dark via-space-dark/80 to-transparent" />

                <div className="relative z-10 p-5 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-auto">
                    <div className="flex items-center gap-2 px-2.5 py-1 bg-space-dark/60 backdrop-blur-sm rounded-full border border-white/10">
                      <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_META[phenomenon.category].color}`} />
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${CATEGORY_META[phenomenon.category].color}`}>
                        {CATEGORY_META[phenomenon.category].label}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-[Space_Grotesk,sans-serif] text-xl font-bold text-text-primary mb-2 leading-tight group-hover:text-science transition-colors">
                      {phenomenon.title}
                    </h3>
                    <p className="font-[Manrope,sans-serif] text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {phenomenon.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
          <div className="w-4 shrink-0" />
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 md:gap-8 mt-6">
          {PHENOMENA.slice(1).map((phenomenon, i) => {
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
                  <img
                    src={getOptimizedImageUrl(phenomenon.heroImage, 800)}
                    alt={phenomenon.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-90 transition-all duration-1000"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-space-dark via-space-dark/80 to-transparent" />

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
        </div>
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
                <div key={i} className="group border-s-2 border-white/5 ps-4 md:ps-6 hover:border-science transition-colors">
                  <h4 className="font-bold text-text-primary text-lg md:text-xl mb-2">{p.title}</h4>
                  <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:mt-12">
              <GlassCard className="h-full min-h-[200px] md:min-h-[300px] flex flex-col justify-center p-6 md:p-12 bg-reflection/5 border-reflection/10">
                <h4 className="font-bold text-reflection text-xl md:text-2xl mb-3 md:mb-4">Engineering</h4>
                <p className="text-sm text-text-muted leading-relaxed">Desain wahana antariksa dan instrumen observasi sebagai solusi teknis eksplorasi manusia.</p>
              </GlassCard>
            </div>
            <div>
              <GlassCard className="h-full min-h-[200px] md:min-h-[300px] flex flex-col justify-center p-6 md:p-12 bg-ai-accent/5 border-ai-accent/10">
                <h4 className="font-bold text-ai-accent text-xl md:text-2xl mb-3 md:mb-4">Mathematics</h4>
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
      {/* ── Fisika Klasik & Modern ─────────────────────────────── */}
      <section className="mt-20 md:mt-40 scroll-reveal">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-[Space_Grotesk,sans-serif] text-3xl md:text-5xl font-bold text-text-primary leading-[1.1] mb-4">
            Fisika <span className="text-science">Klasik</span> & <span className="text-reflection">Modern</span>
          </h2>
          <p className="font-[Manrope,sans-serif] text-text-muted max-w-2xl mx-auto text-sm md:text-base">
            Tiga pilar fundamental yang menjelaskan mekanisme alam semesta, dari gerak planet hingga ekspansi galaksi
          </p>
        </div>

        {/* MOBILE: Tab Toggle Navigation */}
        <div className="md:hidden mb-6">
          <div className="flex gap-2 p-2 bg-surface-high/50 rounded-2xl border border-white/5">
            {FISIKA_PILLARS.map((pilar) => (
              <button
                key={pilar.id}
                onClick={() => setActiveFisikaTab(pilar.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFisikaTab === pilar.id
                    ? `${pilar.color} text-space-dark shadow-lg`
                    : 'text-text-dim hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{pilar.icon}</span>
                <span className="text-[9px]">{pilar.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE: Expandable Hybrid Cards */}
        <div className="md:hidden">
          {FISIKA_PILLARS.map((pilar) => {
            const isExpanded = expandedCard === pilar.id;
            const isActive = activeFisikaTab === pilar.id;
            
            return (
              <div
                key={pilar.id}
                className={`transition-all duration-500 ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 hidden'
                }`}
              >
                <GlassCard 
                  className={`relative overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'p-5' : 'p-4'
                  }`}
                >
                  {/* Hero Image Background (visible when expanded) */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded ? 'opacity-10' : 'opacity-0'}`}>
                    <div className={`absolute inset-0 ${pilar.color} mix-blend-overlay`} />
                  </div>

                  {/* Compact View */}
                  <div className={`transition-all duration-500 ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 w-16 h-16 rounded-2xl ${pilar.color}/20 border border-white/10 flex items-center justify-center text-4xl shadow-lg`}>
                        {pilar.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-[Space_Grotesk,sans-serif] font-bold text-text-primary text-xl mb-1">
                          {pilar.title}
                        </h3>
                        <p className="text-xs text-text-dim mb-2">{pilar.subtitle}</p>
                        <p className="text-xs text-text-muted line-clamp-2">
                          {pilar.desc.substring(0, 80)}...
                        </p>
                      </div>
                      {/* Arrow Button - Only clickable element */}
                      <button
                        onClick={() => toggleExpand(pilar.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 z-20 relative ${
                          pilar.id === 'klasik' ? 'bg-science/30 hover:bg-science/50 text-science' : 
                          pilar.id === 'modern' ? 'bg-reflection/30 hover:bg-reflection/50 text-reflection' : 
                          'bg-ai-accent/30 hover:bg-ai-accent/50 text-ai-accent'
                        }`}
                      >
                        <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[10px] text-center text-text-dim mt-3 uppercase tracking-wider">
                      Ketuk panah untuk mempelajari lebih lanjut
                    </p>
                  </div>

                  {/* Expanded View */}
                  <div className={`transition-all duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                    {/* Header with close button */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 w-12 h-12 rounded-xl ${pilar.color}/20 border border-white/10 flex items-center justify-center text-2xl`}>
                          {pilar.icon}
                        </div>
                        <div>
                          <h3 className="font-[Space_Grotesk,sans-serif] font-bold text-text-primary text-lg">{pilar.title}</h3>
                          <p className="text-xs text-text-dim">{pilar.subtitle}</p>
                        </div>
                      </div>
                      {/* Collapse Arrow Button */}
                      <button 
                        onClick={() => toggleExpand(pilar.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 z-20 relative ${
                          pilar.id === 'klasik' ? 'bg-science/30 hover:bg-science/50 text-science' : 
                          pilar.id === 'modern' ? 'bg-reflection/30 hover:bg-reflection/50 text-reflection' : 
                          'bg-ai-accent/30 hover:bg-ai-accent/50 text-ai-accent'
                        }`}
                      >
                        <svg className="w-5 h-5 transition-transform duration-300 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Full Description */}
                    <p className="text-xs text-text-muted font-[Manrope,sans-serif] leading-relaxed mb-4">
                      {pilar.desc}
                    </p>

                    {/* Concepts Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {pilar.concepts.map((concept, j) => (
                        <div key={j} className={`${pilar.color}/5 rounded-lg p-2 border border-white/5`}>
                          <p className="text-[10px] font-bold text-text-primary">{concept.name}</p>
                          <p className="text-[8px] text-text-dim">{concept.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Formulas */}
                    <div className="space-y-2 mb-4">
                      {pilar.formulas.map((formula, j) => (
                        <div key={j} className={`${pilar.color}/10 border border-white/10 rounded-lg p-3`}>
                          <p className={`font-mono text-sm ${pilar.textColor} font-bold text-center mb-1`}>
                            {formula.eq}
                          </p>
                          <p className="text-[9px] text-text-dim text-center">{formula.name}</p>
                        </div>
                      ))}
                    </div>

                    {/* Featured Scientist Quote */}
                    <div className={`${pilar.color}/5 rounded-xl p-3 mb-4 border-l-2 ${pilar.color.replace('bg-', 'border-')}`}>
                      <p className="text-xs text-text-primary italic mb-2">
                        "{pilar.id === 'klasik' ? 'If I have seen further, it is by standing on the shoulders of giants.' : pilar.id === 'modern' ? 'The important thing is not to stop questioning.' : 'Somewhere, something incredible is waiting to be known.'}"
                      </p>
                      <p className="text-[10px] text-text-dim">— {pilar.scientists[0].name}</p>
                    </div>

                    {/* Scientists */}
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-text-dim mb-2">Tokoh Penting</p>
                      {pilar.scientists.map((scientist, j) => (
                        <div key={j} className="flex items-center gap-3 p-2 rounded-lg bg-surface-high/30">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-surface-high flex items-center justify-center">
                            <img 
                              src={scientist.img} 
                              alt={scientist.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = '<span class="text-lg">👤</span>';
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold text-text-primary truncate">{scientist.name}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-[8px] text-text-dim">{scientist.year}</p>
                              <span className={`text-[8px] ${pilar.textColor} font-medium`}>
                                {scientist.contrib}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* DESKTOP: Expandable Hybrid Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {FISIKA_PILLARS.map((pilar) => {
            const isExpanded = expandedCard === pilar.id;
            
            return (
              <GlassCard 
                key={pilar.id} 
                className={`relative overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'md:col-span-2 p-8' : 'p-6'
                }`}
              >
                {/* Background Gradient - pointer-events-none so it doesn't block clicks */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isExpanded ? 'opacity-100 ' + (pilar.id === 'klasik' ? 'bg-science/5' : pilar.id === 'modern' ? 'bg-reflection/5' : 'bg-ai-accent/5') : 'opacity-0'}`} />
                
                {/* Compact View */}
                <div className={`transition-all duration-500 ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-3xl border border-white/10 flex items-center justify-center text-5xl mb-4 shadow-lg transition-transform hover:scale-110 ${pilar.id === 'klasik' ? 'bg-science/20' : pilar.id === 'modern' ? 'bg-reflection/20' : 'bg-ai-accent/20'}`}>
                      {pilar.icon}
                    </div>
                    <h3 className="font-[Space_Grotesk,sans-serif] font-bold text-text-primary text-xl mb-2">
                      {pilar.title}
                    </h3>
                    <p className="text-sm text-text-dim mb-3">{pilar.subtitle}</p>
                    <p className="text-sm text-text-muted line-clamp-3 mb-4">
                      {pilar.desc}
                    </p>
                    
                    {/* Quick Preview */}
                    <div className="w-full space-y-2">
                      <div className={`rounded-lg p-3 ${pilar.id === 'klasik' ? 'bg-science/10' : pilar.id === 'modern' ? 'bg-reflection/10' : 'bg-ai-accent/10'}`}>
                        <p className={`font-mono text-lg font-bold text-center ${pilar.id === 'klasik' ? 'text-science' : pilar.id === 'modern' ? 'text-reflection' : 'text-ai-accent'}`}>
                          {pilar.formulas[0].eq}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-text-dim">
                        <span>+{pilar.concepts.length} konsep</span>
                        <span>•</span>
                        <span>+{pilar.scientists.length} ilmuwan</span>
                      </div>
                    </div>
                    
                    {/* Expand Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(pilar.id); }}
                      className={`mt-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 pointer-events-auto z-10 relative ${
                        pilar.id === 'klasik' ? 'bg-science/30 hover:bg-science/50 text-science' : 
                        pilar.id === 'modern' ? 'bg-reflection/30 hover:bg-reflection/50 text-reflection' : 
                        'bg-ai-accent/30 hover:bg-ai-accent/50 text-ai-accent'
                      }`}
                    >
                      <svg className="w-6 h-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <p className="text-xs text-text-dim mt-2 uppercase tracking-wider">
                      Klik panah untuk detail
                    </p>
                  </div>
                </div>

                {/* Expanded View */}
                <div className={`transition-all duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {/* Header with Collapse Button */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-4xl ${pilar.id === 'klasik' ? 'bg-science/20' : pilar.id === 'modern' ? 'bg-reflection/20' : 'bg-ai-accent/20'}`}>
                        {pilar.icon}
                      </div>
                      <div>
                        <h3 className="font-[Space_Grotesk,sans-serif] font-bold text-text-primary text-2xl">{pilar.title}</h3>
                        <p className="text-sm text-text-dim">{pilar.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(pilar.id); }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 pointer-events-auto z-10 relative ${
                        pilar.id === 'klasik' ? 'bg-science/30 hover:bg-science/50 text-science' : 
                        pilar.id === 'modern' ? 'bg-reflection/30 hover:bg-reflection/50 text-reflection' : 
                        'bg-ai-accent/30 hover:bg-ai-accent/50 text-ai-accent'
                      }`}
                    >
                      <svg className="w-6 h-6 rotate-180 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Description */}
                    <div>
                      
                      <p className="text-sm text-text-muted font-[Manrope,sans-serif] leading-relaxed mb-6">
                        {pilar.desc}
                      </p>

                      {/* Quote */}
                      <div className={`rounded-xl p-4 border-l-4 ${pilar.id === 'klasik' ? 'bg-science/10 border-science' : pilar.id === 'modern' ? 'bg-reflection/10 border-reflection' : 'bg-ai-accent/10 border-ai-accent'}`}>
                        <p className="text-sm text-text-primary italic mb-2">
                          "{pilar.id === 'klasik' ? 'If I have seen further, it is by standing on the shoulders of giants.' : pilar.id === 'modern' ? 'The important thing is not to stop questioning.' : 'Somewhere, something incredible is waiting to be known.'}"
                        </p>
                        <p className="text-xs text-text-dim">— {pilar.scientists[0].name}</p>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div>
                      {/* Concepts */}
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-wider text-text-dim mb-2">Konsep Kunci</p>
                        <div className="grid grid-cols-2 gap-2">
                          {pilar.concepts.map((concept, j) => (
                            <div key={j} className={`rounded-lg p-3 border border-white/5 ${pilar.id === 'klasik' ? 'bg-science/10' : pilar.id === 'modern' ? 'bg-reflection/10' : 'bg-ai-accent/10'}`}>
                              <p className="text-xs font-bold text-text-primary">{concept.name}</p>
                              <p className="text-[10px] text-text-dim">{concept.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formulas */}
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-wider text-text-dim mb-2">Rumus Fundamental</p>
                        <div className="space-y-2">
                          {pilar.formulas.map((formula, j) => (
                            <div key={j} className={`border border-white/10 rounded-lg p-3 ${pilar.id === 'klasik' ? 'bg-science/15' : pilar.id === 'modern' ? 'bg-reflection/15' : 'bg-ai-accent/15'}`}>
                              <p className={`font-mono text-base font-bold text-center ${pilar.id === 'klasik' ? 'text-science' : pilar.id === 'modern' ? 'text-reflection' : 'text-ai-accent'}`}>
                                {formula.eq}
                              </p>
                              <p className="text-[10px] text-text-dim text-center">{formula.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scientists */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-text-dim mb-2">Tokoh Penting</p>
                        <div className="space-y-2">
                          {pilar.scientists.map((scientist, j) => (
                            <div key={j} className="flex items-center gap-3 p-2 rounded-lg bg-surface-high/30">
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-surface-high flex items-center justify-center">
                                <img 
                                  src={scientist.img} 
                                  alt={scientist.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = '<span class="text-lg">👤</span>';
                                  }}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-text-primary truncate">{scientist.name}</p>
                                <div className="flex items-center justify-between">
                                  <p className="text-[10px] text-text-dim">{scientist.year}</p>
                                  <span className={`text-[10px] font-medium ${pilar.id === 'klasik' ? 'text-science' : pilar.id === 'modern' ? 'text-reflection' : 'text-ai-accent'}`}>
                                    {scientist.contrib}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Collapse hint */}
                  <div className="flex flex-col items-center mt-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(pilar.id); }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 pointer-events-auto z-10 relative mb-2 ${
                        pilar.id === 'klasik' ? 'bg-science/30 hover:bg-science/50 text-science' : 
                        pilar.id === 'modern' ? 'bg-reflection/30 hover:bg-reflection/50 text-reflection' : 
                        'bg-ai-accent/30 hover:bg-ai-accent/50 text-ai-accent'
                      }`}
                    >
                      <svg className="w-6 h-6 rotate-180 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <p className="text-xs text-text-dim uppercase tracking-wider">
                      Klik panah untuk menutup
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Integration Quote */}
        <GlassCard className="mt-8 md:mt-12 p-6 md:p-10 text-center">
          <p className="font-[Newsreader,serif] text-lg md:text-2xl text-white leading-relaxed italic mb-4">
            "Sains menjelaskan mekanisme, agama menjelaskan tujuan. Keduanya adalah dua sayap bagi peradaban."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 md:w-16 h-1 rounded-full bg-science" />
            <span className="text-xs md:text-sm font-[Space_Grotesk,sans-serif] text-text-dim uppercase tracking-[0.2em]">Landasan Filosofis R&D MTs Sains Algebra</span>
            <div className="w-8 md:w-16 h-1 rounded-full bg-science" />
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
