import { useState, useEffect } from 'react';

export function WelcomeSequence() {
  // 0 = Initial, 1 = School, 3 = Referensi, 4 = Done/Hidden
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(() => !sessionStorage.getItem('hasSeenWelcome'));

  useEffect(() => {
    // Jika sudah pernah dilihat, tidak perlu jalankan sequence
    if (!isVisible) return;

    // Sequence Timing
    const s1 = setTimeout(() => setStep(1), 800);   // Mulai animasi perlahan
    const s3 = setTimeout(() => setStep(3), 4500);  // Pindah ke Referensi
    const s4 = setTimeout(() => {
      setStep(4);
      sessionStorage.setItem('hasSeenWelcome', 'true');
      setTimeout(() => setIsVisible(false), 2000); // Tunggu animasi fade-out selesai utuh
    }, 8500);

    return () => {
      clearTimeout(s1);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handleSkip = () => {
    setStep(4);
    sessionStorage.setItem('hasSeenWelcome', 'true');
    setTimeout(() => setIsVisible(false), 500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-space-dark transition-opacity duration-2000 ease-in-out ${
        step === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Skip Button - Always visible */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-4 py-2 text-xs font-bold text-text-dim uppercase tracking-widest bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-text-primary transition-all"
      >
        Lewati
      </button>
      {/* Background Glow - Simplified on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-science/5 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        
        {/* ── Scene 1: School & Team ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1500 ease-in-out ${
            step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-science/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src="/LOGO MTs.png" alt="Logo MTs Sains Algebra" className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10" />
          </div>
          
          <h2 className="font-[Space_Grotesk,sans-serif] text-2xl md:text-4xl font-bold tracking-[0.2em] text-text-primary uppercase mb-12">
            MTs Sains Algebra
          </h2>
          
          <p className="font-[Space_Grotesk,sans-serif] text-sm text-text-dim tracking-[0.4em] uppercase mb-10">
            Tim Peneliti R&D
          </p>
          
          <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-8 md:gap-16 px-4 w-full">
            {[
              { name: 'Alya Syifa A', img: '/Alya.jpeg', pos: 'object-center' },
              { name: 'Nayla Amalia Kirana JR', img: '/nayla amalia.jpeg', pos: 'object-center' },
              { name: 'Michel Avrillia Putri', img: '/Michel.jpeg', pos: 'object-top' }
            ].map((member, i) => (
              <div key={i} className="flex flex-col items-center group/member w-[80px] sm:w-auto flex-1 sm:flex-0 max-w-[120px]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full overflow-hidden mb-3 md:mb-4 border-2 border-white/5 group-hover/member:border-science/50 transition-all duration-500 shadow-2xl mx-auto">
                  <img
                    src={member.img}
                    alt={member.name}
                    className={`w-full h-full object-cover ${member.pos} grayscale group-hover/member:grayscale-0 transition-all duration-700 scale-105 group-hover/member:scale-100`}
                    loading="lazy"
                  />
                </div>
                <span className="font-[Space_Grotesk,sans-serif] text-[10px] md:text-xs font-bold tracking-widest text-text-muted uppercase group-hover/member:text-science transition-colors line-clamp-1 text-center w-full">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scene 3: References ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1500 ease-in-out ${
            step === 3 ? 'opacity-100 scale-100 delay-500' : 'opacity-0 scale-105 pointer-events-none delay-0'
          }`}
        >
          <p className="font-[Space_Grotesk,sans-serif] text-sm text-text-dim tracking-[0.2em] uppercase mb-12">
            Berdasarkan Referensi
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24 mb-12">
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="flex items-center gap-6 md:gap-8">
                <img src="/NASA LOGO.png" alt="NASA" className="h-16 md:h-32 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
                <div className="w-px h-10 md:h-12 bg-white/20" />
                <img src="/ESA LOGO.png" alt="ESA" className="h-14 md:h-20 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
              </div>
              <span className="font-[Space_Grotesk,sans-serif] text-lg md:text-xl font-bold tracking-widest text-text-primary">DATA ASTROFISIKA</span>
            </div>

            <div className="w-px h-20 bg-white/10 hidden md:block" />

            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center group/quran">
                 <img src="/LOGO QURAN.png" alt="Al-Quran" className="w-full h-full object-contain brightness-0 invert opacity-80 group-hover/quran:opacity-100 transition-opacity" loading="lazy" />
              </div>
              <span className="font-[Space_Grotesk,sans-serif] text-lg md:text-xl font-bold tracking-widest text-text-primary uppercase">AL-QUR'AN</span>
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
