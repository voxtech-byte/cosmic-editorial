import { useState, useEffect } from 'react';
import { School, Globe2, Sparkles } from 'lucide-react';

export function WelcomeSequence() {
  // 0 = Initial, 1 = School, 2 = Creator, 3 = Referensi, 4 = Done/Hidden
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(() => !sessionStorage.getItem('hasSeenWelcome'));

  useEffect(() => {
    // Jika sudah pernah dilihat, tidak perlu jalankan sequence
    if (!isVisible) return;

    // Sequence Timing
    const s1 = setTimeout(() => setStep(1), 800);   // Mulai animasi perlahan
    const s2 = setTimeout(() => setStep(2), 4500);  // Pindah ke Kreator
    const s3 = setTimeout(() => setStep(3), 8500);  // Pindah ke Referensi
    const s4 = setTimeout(() => {
      setStep(4);
      sessionStorage.setItem('hasSeenWelcome', 'true');
      setTimeout(() => setIsVisible(false), 2000); // Tunggu animasi fade-out selesai utuh
    }, 12500);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-space-dark ${
        step === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 2s ease-in-out' }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-science/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        
        {/* ── Scene 1: School & Team ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center ${
            step === 1 ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105 pointer-events-none'
          }`}
          style={{ transition: 'all 1.5s ease-in-out' }}
        >
          <div className="w-20 h-20 rounded-2xl bg-surface-high border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
            <School className="w-10 h-10 text-science" />
          </div>
          <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-4xl font-bold tracking-widest text-text-primary uppercase mb-12">
            MTs Sains Algebra
          </h2>
          
          <p className="font-[Space_Grotesk,sans-serif] text-sm text-text-dim tracking-[0.2em] uppercase mb-8">
            Tim Peneliti R&D
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { name: 'Alya Syifa A', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
              { name: 'Nayla Amalia Kirana JR', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' },
              { name: 'Michel Avrillia Putri', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop' }
            ].map((member, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={member.img} alt={member.name} className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover mb-4 border-2 border-white/10 grayscale" />
                <span className="font-[Manrope,sans-serif] text-sm md:text-base text-text-muted">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scene 2: Creator ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center ${
            step === 2 ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105 pointer-events-none'
          }`}
          style={{ transition: 'all 1.5s ease-in-out', transitionDelay: step === 2 ? '500ms' : '0ms' }}
        >
          <div className="w-24 h-24 rounded-full bg-surface-high border border-white/10 flex items-center justify-center mb-8 shadow-2xl overflow-hidden relative">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" alt="Muhammad Nizar" className="w-full h-full object-cover grayscale" />
             <div className="absolute inset-0 bg-science/20 mix-blend-overlay" />
          </div>
          
          <p className="font-[Space_Grotesk,sans-serif] text-sm text-text-dim tracking-[0.2em] uppercase mb-4">
            Dikembangkan Oleh
          </p>
          <h2 className="font-[Space_Grotesk,sans-serif] text-3xl md:text-5xl font-bold text-text-primary mb-4">
            Muhammad Nizar
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-low border border-white/5">
            <Sparkles className="w-4 h-4 text-ai-accent" />
            <span className="font-[Manrope,sans-serif] text-sm text-text-muted">AI Builder and Staff In BUDS</span>
          </div>
        </div>

        {/* ── Scene 3: References ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center ${
            step === 3 ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105 pointer-events-none'
          }`}
          style={{ transition: 'all 1.5s ease-in-out', transitionDelay: step === 3 ? '500ms' : '0ms' }}
        >
          <p className="font-[Space_Grotesk,sans-serif] text-sm text-text-dim tracking-[0.2em] uppercase mb-12">
            Berdasarkan Referensi
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-12">
            <div className="flex flex-col items-center gap-4">
              <Globe2 className="w-16 h-16 text-science/80" />
              <span className="font-[Space_Grotesk,sans-serif] text-xl font-bold tracking-widest text-text-primary">NASA & ESA</span>
              <span className="text-xs text-text-muted font-[Manrope,sans-serif]">Data Astrofisika</span>
            </div>
            
            <div className="w-px h-20 bg-white/10 hidden md:block" />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-reflection/10 flex items-center justify-center">
                 <span className="font-serif text-3xl text-reflection">📖</span>
              </div>
              <span className="font-[Space_Grotesk,sans-serif] text-xl font-bold tracking-widest text-text-primary">AL-QUR'AN</span>
              <span className="text-xs text-text-muted font-[Manrope,sans-serif]">Ayat Kauniyah</span>
            </div>
          </div>
          
          <p className="font-[Newsreader,serif] italic text-lg text-text-muted max-w-lg mx-auto">
            "Sintesis harmoni antara ilmu pengetahuan empiris dan cahaya wahyu Ilahi."
          </p>
        </div>

      </div>
    </div>
  );
}
