import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/app/Navigation';
import { BerandaPage } from '@/features/beranda/components/BerandaPage';
import { EksplorasiPage } from '@/features/eksplorasi/components/EksplorasiPage';
import { AsistenAIPage } from '@/features/asisten-ai/components/AsistenAIPage';
import { ArsipPage } from '@/features/arsip/components/ArsipPage';
import { PortfolioProjects } from '@/features/portfolio/components/PortfolioProjects';
import { WelcomeSequence } from '@/shared/ui/WelcomeSequence';

export default function App() {
  return (
    <BrowserRouter>
      <WelcomeSequence />
      <div className="min-h-screen bg-space-dark text-text-primary">
        <Navigation />
        <Routes>
          <Route path="/" element={<BerandaPage />} />
          <Route path="/eksplorasi" element={<EksplorasiPage />} />
          <Route path="/asisten" element={<AsistenAIPage />} />
          <Route path="/arsip" element={<ArsipPage />} />
          <Route path="/portfolio" element={<PortfolioProjects />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
