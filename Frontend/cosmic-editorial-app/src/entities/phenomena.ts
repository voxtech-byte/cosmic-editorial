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
  readonly category: 'orbit' | 'rotation' | 'expansion' | 'cosmic';
  readonly heroImage: string;
  readonly description: string;
  readonly scienceExplanation: string;
  readonly verses: readonly QuranVerse[];
  readonly nasaRef?: string;
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
    nasaRef: 'https://solarsystem.nasa.gov/solar-system/our-solar-system/overview/',
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
      'Rotasi bumi pada sumbunya yang miring 23.5° menghasilkan siklus siang dan malam. Kecepatan rotasi di khatulistiwa mencapai 1.670 km/jam. Yuri Gagarin, angkasawan Uni Soviet, menjadi manusia pertama yang menyaksikan pergantian siang-malam dari luar angkasa pada tahun 1961 saat mengorbit bumi dengan pesawat Vostok 1. Ia mendeskripsikan bumi berbentuk bulat dengan pergantian gelap dan terang yang cepat — mengkonfirmasi apa yang telah disebutkan dalam Al-Qur\'an.',
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
    nasaRef: 'https://science.nasa.gov/earth/facts/',
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
    nasaRef: 'https://science.nasa.gov/universe/overview/',
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
    nasaRef: 'https://science.nasa.gov/earth/earths-atmosphere/',
    tags: ['Atmosfer', 'Lapisan', 'Ozon', 'Sentinel'],
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
} as const;
