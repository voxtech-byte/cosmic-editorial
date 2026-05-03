import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageSquare, Archive, Briefcase } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/eksplorasi', label: 'Eksplorasi', icon: Compass },
  { to: '/asisten', label: 'Asisten AI', icon: MessageSquare },
  { to: '/arsip', label: 'Arsip', icon: Archive },
  { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
] as const;

/** Single navigation pattern: Top navbar (desktop) + Bottom dock (mobile) */
export function Navigation() {
  return (
    <>
      {/* ── Desktop: Top Navbar ────────────────────────── */}
      <nav className="fixed top-0 inset-s-0 w-full z-50 hidden md:flex items-center justify-between px-10 py-4 bg-space-void/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex flex-col">
          <div className="font-[Space_Grotesk,sans-serif] text-xl font-black tracking-widest text-text-primary uppercase leading-tight">
            Cosmic Editorial
          </div>
          <span className="text-[10px] text-science font-bold tracking-[0.2em] uppercase opacity-80">
            MTs Sains Algebra R&D
          </span>
        </div>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-[Space_Grotesk,sans-serif] text-sm tracking-tight uppercase px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-science bg-science/10 border-b-2 border-science'
                    : 'text-text-dim hover:text-text-primary hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="w-[180px]" /> {/* Spacer for visual balance */}
      </nav>

      {/* ── Mobile: Floating Bottom Dock ──────────────── */}
      <nav className="fixed bottom-4 inset-s-4 inset-e-4 z-50 flex md:hidden items-center justify-around py-3 px-2 bg-space-void/95 rounded-2xl border border-white/10 shadow-[0_-4px_32px_rgba(0,0,0,0.5)]">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-science bg-science/10'
                  : 'text-text-dim'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-science rounded-full animate-ping opacity-0 group-[.active]:opacity-100" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
