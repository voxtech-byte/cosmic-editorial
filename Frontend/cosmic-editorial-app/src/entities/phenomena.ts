/* ── Entities: Phenomena Data ──────────────────────────────── */
/* All content strictly from research document + public NASA data */

export interface QuranVerse {
  readonly arabic: string;
  readonly translation: string;
  readonly surah: string;
  readonly ayat: string;
  readonly tafsirBrief: string;
}

export interface Phenomenon {
  readonly id: string;
  readonly title: string;
  readonly titleEn: string;
  readonly category: 'orbit' | 'rotation' | 'expansion' | 'cosmic' | 'stellar';
  readonly heroImage: string;
  readonly description: string;
  readonly scienceExplanation: string;
  readonly stem: {
    readonly science: string;
    readonly technology: string;
    readonly engineering: string;
    readonly mathematics: string;
  };
  readonly verses: readonly QuranVerse[];
  readonly sources: readonly { name: string; url: string }[];
  readonly tags: readonly string[];
}

/**
 * Real phenomena data from the research document:
 * "Pengembangan Media Pembelajaran Fenomena Luar Angkasa
 *  Terintegrasi Sains dan Agama" — MTs Sains Algebra, 2026
 */
export const PHENOMENA: readonly Phenomenon[] = [
  {
    id: 'orbit-tata-surya',
    title: 'Orbit Tata Surya',
    titleEn: 'Solar System Orbits',
    category: 'orbit',
    heroImage: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&auto=format',
    description:
      'Matahari, bulan, dan planet-planet bergerak dalam lintasan orbit yang presisi. Fenomena ini telah disebutkan dalam Al-Qur\'an jauh sebelum ilmu astronomi modern mengkonfirmasikannya. Keteraturan gerak kosmik ini bukan sekadar peristiwa alam mekanis, melainkan manifestasi dari ketetapan (Sunnatullah) yang memungkinkan kehidupan di Bumi berlangsung tanpa tabrakan antar benda langit.',
    scienceExplanation:
      'Setiap objek di tata surya berevolusi dan berotasi secara elips mengelilingi pusatnya masing-masing akibat keseimbangan antara gaya gravitasi dan inersia gerak. Hukum Kepler menjelaskan bahwa planet bergerak dalam orbit elips dengan matahari di salah satu fokusnya, menciptakan lintasan presisi mikroskopis dalam skala makro. Kecepatan orbital bervariasi — lebih cepat saat dekat matahari (perihelion) dan lebih lambat saat jauh (aphelion). NASA\'s Jet Propulsion Laboratory (JPL) secara rutin memantau dan memprediksi orbit ini dengan presisi tinggi menggunakan telemetri wahana antariksa, membuktikan bahwa deviasi sangat kecil pun dapat dideteksi.',
    stem: {
      science: 'Mempelajari hukum gravitasi Newton dan hukum pergerakan planet Kepler.',
      technology: 'SOHO (Solar and Heliospheric Observatory) untuk memantau aktivitas matahari.',
      engineering: 'Perancangan jalur lintasan (trajectory) pesawat luar angkasa agar dapat keluar dari gravitasi bumi.',
      mathematics: 'Penghitungan eksentrisitas orbit (elips) dan periode revolusi planet.',
    },
    verses: [
      {
        arabic: 'وَهُوَ الَّذِيْ خَلَقَ الَّيْلَ وَالنَّهَارَ وَالشَّمْسَ وَالْقَمَرَۗ كُلٌّ فِيْ فَلَكٍ يَّسْبَحُوْنَ',
        translation: '"Dan Dialah yang telah menciptakan malam dan siang, matahari dan bulan. Masing-masing beredar pada garis edarnya."',
        surah: 'Al-Anbiya',
        ayat: '33',
        tafsirBrief:
          'Ayat ini menjelaskan secara eksplisit bahwa matahari dan bulan masing-masing bergerak dalam orbit (falak) tersendiri. Kata "yasbahun" (berenang/beredar) menunjukkan gerakan yang kontinu dan teratur, sesuai dengan observasi astronomi modern tentang orbit celestial.',
      },
    ],
    sources: [
      { name: 'NASA', url: 'https://solarsystem.nasa.gov/solar-system/our-solar-system/overview/' },
      { name: 'ESA', url: 'https://www.esa.int/Science_Exploration/Space_Science/Solar_System' },
      { name: 'BRIN', url: 'https://brin.go.id' }
    ],
    tags: ['Orbit', 'Tata Surya', 'Kepler', 'JPL'],
  },
  {
    id: 'rotasi-bumi',
    title: 'Rotasi Bumi & Pergantian Siang-Malam',
    titleEn: 'Earth Rotation & Day-Night Cycle',
    category: 'rotation',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format',
    description:
      'Bumi berputar pada porosnya setiap 24 jam, menghasilkan pergantian siang dan malam. Al-Qur\'an menggambarkan fenomena ini dengan metafora yang sangat presisi secara ilmiah.',
    scienceExplanation:
      'Rotasi bumi adalah perputaran bumi pada porosnya yang menyebabkan pergantian siang dan malam. Fenomena ini divalidasi oleh observasi astronaut pertama, Yuri Gagarin (1961), yang mengonfirmasi bumi berbentuk bulat sferis. Secara historis, ilmuwan seperti Ch-al-Cois juga menjelaskan bahwa bumi mengalami pergantian gelap dan terang dengan sangat cepat akibat bentuknya yang bulat dan rotasinya yang konstan.',
    stem: {
      science: 'Efek Coriolis dan kemiringan sumbu bumi (axial tilt) 23.5 derajat.',
      technology: 'Sistem navigasi GPS yang sinkron dengan waktu rotasi bumi.',
      engineering: 'Konstruksi satelit geostasioner dengan kecepatan sinkron.',
      mathematics: 'Kecepatan sudut rotasi bumi (15 derajat per jam).',
    },
    verses: [
      {
        arabic: 'يُكَوِّرُ الَّيْلَ عَلَى النَّهَارِ وَيُكَوِّرُ النَّهَارَ عَلَى الَّيْلِ وَسَخَّرَ الشَّمْسَ وَالْقَمَرَۗ كُلٌّ يَّجْرِيْ لِاَجَلٍ مُّسَمًّى',
        translation: '"Dia menutupkan malam atas siang dan menutupkan siang atas malam dan menundukkan matahari dan bulan, masing-masing berjalan menurut waktu yang ditentukan."',
        surah: 'Az-Zumar',
        ayat: '5',
        tafsirBrief:
          'Kata "yukawwiru" (menutupkan/membungkus) berasal dari akar kata yang berarti membalut sesuatu yang bulat — mengindikasikan bahwa siang dan malam saling "membungkus" pada permukaan yang bulat (bumi). Ini menunjukkan pemahaman tentang bentuk bumi yang sferis dan rotasinya.',
      },
    ],
    sources: [
      { name: 'NASA Earth', url: 'https://science.nasa.gov/earth/facts/' },
      { name: 'BRIN LAPAN', url: 'https://pusfatja.lapan.go.id/' },
      { name: 'Kemenag RI', url: 'https://quran.kemenag.go.id/' }
    ],
    tags: ['Rotasi', 'Siang-Malam', 'Gagarin', 'Vostok'],
  },
  {
    id: 'ekspansi-alam-semesta',
    title: 'Ekspansi Alam Semesta',
    titleEn: 'Expansion of the Universe',
    category: 'expansion',
    heroImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&auto=format',
    description:
      'Alam semesta tidak statis — ia terus mengembang sejak Big Bang. Penemuan Edwin Hubble pada 1929 mengkonfirmasi hal yang telah diisyaratkan dalam Al-Qur\'an.',
    scienceExplanation:
      'Edwin Hubble menemukan bahwa galaksi-galaksi saling menjauh satu sama lain, membuktikan bahwa alam semesta mengembang. Penemuan ini menjadi dasar teori Big Bang. Teleskop Hubble Space Telescope dan James Webb Space Telescope (JWST) NASA terus mengobservasi galaksi-galaksi terjauh untuk mempelajari laju ekspansi (Hubble Constant). Data terbaru dari JWST menunjukkan alam semesta berusia sekitar 13.8 miliar tahun dan terus mengembang dengan laju yang semakin cepat akibat dark energy.',
    stem: {
      science: 'Konsep Redshift (pergeseran merah) cahaya galaksi.',
      technology: 'Teleskop inframerah JWST dengan perisai panas seukuran lapangan tenis.',
      engineering: 'Peluncuran ke titik Lagrange 2 (L2) sejauh 1,5 juta km.',
      mathematics: 'Hukum Hubble (v = H0 * d) untuk mengukur jarak galaksi.',
    },
    verses: [
      {
        arabic: 'وَالسَّمَآءَ بَنَيْنٰهَا بِاَيْىدٍ وَاِنَّا لَمُوْسِعُوْنَ',
        translation: '"Dan langit itu Kami bangun dengan kekuasaan (Kami) dan sesungguhnya Kami benar-benar meluaskannya."',
        surah: 'Adz-Dzariyat',
        ayat: '47',
        tafsirBrief:
          'Kata "lamusi\'un" (benar-benar meluaskan) dalam bentuk ism fa\'il menunjukkan proses yang terus berlangsung — sesuai dengan penemuan bahwa alam semesta terus mengembang hingga kini. Ayat ini diturunkan 14 abad sebelum Hubble mengkonfirmasi ekspansi alam semesta.',
      },
    ],
    sources: [
      { name: 'NASA Universe', url: 'https://science.nasa.gov/universe/overview/' },
      { name: 'ESA Hubble', url: 'https://hubblesite.org/' },
      { name: 'JWST Data', url: 'https://webbtelescope.org/' }
    ],
    tags: ['Ekspansi', 'Hubble', 'JWST', 'Big Bang'],
  },
  {
    id: 'struktur-langit-berlapis',
    title: 'Struktur Langit Berlapis',
    titleEn: 'Layered Structure of the Heavens',
    category: 'cosmic',
    heroImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&auto=format',
    description:
      'Atmosfer bumi memiliki lapisan-lapisan yang berbeda fungsi — dari troposfer hingga eksosfer. Konsep "tujuh langit berlapis" dalam Al-Qur\'an memiliki resonansi dengan pemahaman ilmiah modern.',
    scienceExplanation:
      'Atmosfer bumi terdiri dari beberapa lapisan: troposfer (cuaca), stratosfer (ozon), mesosfer, termosfer, dan eksosfer. Setiap lapisan memiliki fungsi perlindungan yang vital. NASA dan ESA terus memonitor lapisan-lapisan ini melalui satelit seperti Aura dan Sentinel-5P. Di luar atmosfer, ruang antar-planet, ruang antar-bintang, dan ruang antar-galaksi membentuk struktur kosmik yang berlapis — dari tata surya hingga superkluster galaksi.',
    stem: {
      science: 'Komposisi kimiawi atmosfer dan fungsi pelindung ozon.',
      technology: 'Satelit Sentinel-5P untuk memantau lubang ozon secara real-time.',
      engineering: 'Perisai panas (heat shield) pesawat untuk menembus atmosfer.',
      mathematics: 'Gradien tekanan atmosfer terhadap ketinggian (altitude).',
    },
    verses: [
      {
        arabic: 'اَلَّذِيْ خَلَقَ سَبْعَ سَمٰوٰتٍ طِبَاقًا ۗ مَا تَرٰى فِيْ خَلْقِ الرَّحْمٰنِ مِنْ تَفٰوُتٍ',
        translation: '"Yang telah menciptakan tujuh langit berlapis-lapis. Kamu sekali-kali tidak melihat pada ciptaan Tuhan Yang Maha Pemurah sesuatu yang tidak seimbang."',
        surah: 'Al-Mulk',
        ayat: '3',
        tafsirBrief:
          'Kata "tibaqan" berarti berlapis-lapis atau bertingkat-tingkat. Ini menunjukkan bahwa langit (ruang angkasa) memiliki struktur yang terorganisir, bukan kekosongan acak. Frasa "min tafawut" (tanpa ketidakseimbangan) menegaskan keselarasan dan presisi desain alam semesta.',
      },
    ],
    sources: [
      { name: 'NASA Atmospheric', url: 'https://science.nasa.gov/earth/earths-atmosphere/' },
      { name: 'Sentinel-5P', url: 'https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-5p' }
    ],
    tags: ['Atmosfer', 'Lapisan', 'Ozon', 'Sentinel'],
  },
  {
    id: 'peredaran-matahari',
    title: 'Peredaran Matahari',
    titleEn: 'Solar Path & Orbit',
    category: 'stellar',
    heroImage: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1200&auto=format',
    description:
      'Matahari tidaklah diam di pusat tata surya secara absolut, ia juga bergerak mengelilingi pusat galaksi Bima Sakti dengan kecepatan yang sangat tinggi.',
    scienceExplanation:
      'Matahari bersama seluruh tata surya bergerak mengorbit pusat galaksi Bima Sakti dengan kecepatan rata-rata 230 km/detik (828.000 km/jam). Satu putaran penuh (Tahun Galaksi) membutuhkan waktu sekitar 230 juta tahun. Fenomena "Mustaqarr" (tempat perhentian/orbit tetap) dalam Al-Qur\'an selaras dengan penemuan bahwa matahari memiliki jalur lintasan spesifik di ruang angkasa.',
    stem: {
      science: 'Dinamika galaksi dan pergerakan relatif dalam ruang angkasa.',
      technology: 'Satelit Gaia milik ESA yang memetakan posisi dan pergerakan satu miliar bintang.',
      engineering: 'Pengembangan sensor pelacak bintang (star trackers) untuk navigasi antariksa.',
      mathematics: 'Penghitungan kecepatan linear matahari berdasarkan radius orbit galaksi.',
    },
    verses: [
      {
        arabic: 'وَالشَّمْسُ تَجْرِيْ لِمُسْتَقَرٍّ لَّهَاۗ ذٰلِكَ تَقْدِيْرُ الْعَزِيْزِ الْعَلِيْمِۗ',
        translation: '"Dan matahari berjalan di tempat peredarannya. Demikianlah ketetapan (Allah) Yang Mahaperkasa, Maha Mengetahui."',
        surah: 'Yasin',
        ayat: '38',
        tafsirBrief:
          'Ayat ini membuktikan bahwa matahari bukan benda statis, melainkan bergerak ("tajri") dalam jalur yang telah ditetapkan ("mustaqarr"). Astronomi modern baru mengkonfirmasi pergerakan matahari mengelilingi pusat galaksi berabad-abad setelah ayat ini turun.',
      },
    ],
    sources: [
      { name: 'NASA Sun', url: 'https://science.nasa.gov/solar-system/sun/facts/' },
      { name: 'ESA Gaia', url: 'https://www.esa.int/Science_Exploration/Space_Science/Gaia' }
    ],
    tags: ['Matahari', 'Galaksi', 'Bima Sakti', 'Gaia'],
  },
  {
    id: 'lubang-hitam',
    title: 'Lubang Hitam (Black Holes)',
    titleEn: 'The Invisible Sweeper',
    category: 'stellar',
    heroImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&auto=format',
    description:
      'Wilayah ruang-waktu dengan gravitasi begitu kuat sehingga cahaya pun tidak bisa lolos. Al-Qur\'an memberikan isyarat tentang objek langit yang tersembunyi namun menyapu sekitarnya.',
    scienceExplanation:
      'Lubang hitam terbentuk dari sisa bintang besar yang runtuh. Teori Relativitas Umum Einstein memprediksi adanya wilayah di mana massa terkonsentrasi dalam satu titik (singularitas). Fenomena ini tidak memancarkan cahaya (Khunnas) namun memiliki pengaruh gravitasi yang menyerap/menyapu segala sesuatu (Kunnas).',
    stem: {
      science: 'Fisika lubang hitam, singularitas, dan cakrawala peristiwa (event horizon).',
      technology: 'Event Horizon Telescope (EHT) yang menggabungkan data dari delapan observatorium radio di seluruh dunia.',
      engineering: 'Algoritma rekonstruksi citra masif untuk menghasilkan foto lubang hitam pertama.',
      mathematics: 'Persamaan Radius Schwarzschild untuk menentukan batas event horizon.',
    },
    verses: [
      {
        arabic: 'فَلَآ اُقْسِمُ بِالْخُنَّسِۙ . الْجَوَارِ الْكُنَّسِۙ',
        translation: '"Aku bersumpah demi bintang-bintang (Al-Khunnas), yang beredar dan terbenam/menyapu (Al-Kunnas)."',
        surah: 'At-Takwir',
        ayat: '15-16',
        tafsirBrief:
          'Karakteristik "Al-Khunnas" (yang tersembunyi/tidak terlihat) dan "Al-Kunnas" (yang menyapu/membersihkan jalannya) identik dengan sifat fisik Black Hole yang tidak terlihat namun menarik objek sekitarnya dengan sangat kuat.',
      },
    ],
    sources: [
      { name: 'NASA Black Holes', url: 'https://science.nasa.gov/universe/black-holes/' },
      { name: 'EHT Collaboration', url: 'https://eventhorizontelescope.org/' }
    ],
    tags: ['Black Hole', 'Relativitas', 'Singularitas', 'EHT'],
  },
] as const;

/**
 * Get a phenomenon by its ID
 */
export function getPhenomenon(id: string): Phenomenon | undefined {
  return PHENOMENA.find((p) => p.id === id);
}

/**
 * Category display metadata
 */
export const CATEGORY_META = {
  orbit: { label: 'Orbit & Revolusi', icon: 'orbit', color: 'text-science' },
  rotation: { label: 'Rotasi & Siklus', icon: 'sync', color: 'text-reflection' },
  expansion: { label: 'Ekspansi Kosmik', icon: 'open_in_full', color: 'text-ai-accent' },
  cosmic: { label: 'Struktur Kosmik', icon: 'layers', color: 'text-science' },
  stellar: { label: 'Evolusi Bintang', icon: 'star', color: 'text-reflection' },
} as const;
