# Cosmic Editorial — MTs Sains Algebra R&D Platform

Platform media pembelajaran interaktif berbasis web yang menyintesis observasi astrofisika modern dengan teks teologis (Al-Qur'an). Proyek R&D ini dikembangkan khusus untuk MTs Sains Algebra Kota Sorong (2026).

## Teknologi Utama
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (konsep), CSS murni.
- **AI Gateway**: Groq, OpenRouter (Llama 3), Hugging Face (Mistral), Puter.js, Gemini.

## Menjalankan Secara Lokal (Development)

1. Pastikan Node.js terinstal.
2. Clone repository dan masuk ke direktori proyek.
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Buat file `.env.local` di *root directory* dan isi dengan API Key Anda (lihat bagian Konfigurasi API Keys).
5. Jalankan server:
   ```bash
   npm run dev
   ```

## Persiapan Deployment ke Vercel

Proyek ini telah dikonfigurasi untuk siap rilis ke [Vercel](https://vercel.com).
Terdapat file `vercel.json` yang akan memastikan *routing* (perpindahan halaman) berjalan mulus tanpa masalah "404 Not Found" saat di-*refresh*.

### Langkah Deployment:
1. Push kode ini ke repositori **GitHub** Anda.
2. Buka dashboard **Vercel** dan buat *New Project*.
3. Pilih repositori GitHub Anda.
4. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
5. **SANGAT PENTING**: Buka menu **Environment Variables** di Vercel, lalu masukkan semua API Keys berikut sebelum klik *Deploy*.

### Konfigurasi API Keys (Environment Variables)

Masukkan kunci-kunci berikut di `.env.local` (untuk lokal) dan di Vercel (untuk *production*):

```env
# Groq (Llama3 / Mixtral)
VITE_GROQ_API_KEY="gsk_..."

# Gemini (Google)
VITE_GEMINI_API_KEY="AIza..."

# OpenRouter (Akses model gratis Llama3 dll)
VITE_OPENROUTER_API_KEY="sk-or-v1-..."

# Hugging Face (Inference API)
VITE_HUGGINGFACE_API_KEY="hf_..."
```

## Arsitektur FSD (Feature-Sliced Design)
Proyek ini mengadopsi standar arsitektur FSD untuk *maintainability* tinggi:
- `src/app/` — Inisialisasi global, styles, routing.
- `src/features/` — Fitur utama (Beranda, Eksplorasi, Arsip, Asisten AI).
- `src/entities/` — Logika bisnis & data (*phenomena data*).
- `src/shared/` — Komponen UI *reusable*, API utilitas.
