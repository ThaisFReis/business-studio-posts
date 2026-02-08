import { useEffect, useState } from 'react';
import { Building2, LayoutDashboard } from 'lucide-react';
import BrandIdentityPage from './components/BrandIdentityPage';
import StudioShell from './components/StudioShell';
import type { AppView, BrandIdentity } from './types/studio';

const BRAND_IDENTITY_STORAGE_KEY = 'business-studio.brand-identity.v1';

const DEFAULT_BRAND_IDENTITY: BrandIdentity = {
  studioTitle: 'Business Studio',
  shortName: 'brand',
  shortNameWithDot: 'brand.',
  fullName: 'Brand Company',
  slogan:
    'Empowering your business identity with consistent visual storytelling across social channels.',
  footerText: 'Brand Company',
  logoUrl: null,
};

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('studio');
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity>(() => {
    try {
      const stored = localStorage.getItem(BRAND_IDENTITY_STORAGE_KEY);
      if (!stored) return DEFAULT_BRAND_IDENTITY;
      return { ...DEFAULT_BRAND_IDENTITY, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_BRAND_IDENTITY;
    }
  });

  useEffect(() => {
    localStorage.setItem(BRAND_IDENTITY_STORAGE_KEY, JSON.stringify(brandIdentity));
  }, [brandIdentity]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <aside className="w-[84px] bg-[#090909] border-r border-white/10 p-3 flex flex-col items-center gap-2">
        <button
          onClick={() => setActiveView('studio')}
          className={`w-full h-14 rounded-xl border flex flex-col items-center justify-center gap-1 text-[9px] uppercase tracking-wide transition-all ${
            activeView === 'studio'
              ? 'bg-purple-900/30 border-purple-500 text-white'
              : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
          }`}
        >
          <LayoutDashboard size={16} />
          Studio
        </button>
        <button
          onClick={() => setActiveView('brand-identity')}
          className={`w-full h-14 rounded-xl border flex flex-col items-center justify-center gap-1 text-[9px] uppercase tracking-wide transition-all ${
            activeView === 'brand-identity'
              ? 'bg-purple-900/30 border-purple-500 text-white'
              : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
          }`}
        >
          <Building2 size={16} />
          Brand
        </button>
      </aside>

      {activeView === 'studio' ? (
        <StudioShell
          brandIdentity={brandIdentity}
          onBrandIdentityChange={(updates) => setBrandIdentity((prev) => ({ ...prev, ...updates }))}
        />
      ) : (
        <BrandIdentityPage
          brandIdentity={brandIdentity}
          onChange={(updates) => setBrandIdentity((prev) => ({ ...prev, ...updates }))}
          onReset={() => setBrandIdentity(DEFAULT_BRAND_IDENTITY)}
        />
      )}
    </div>
  );
}
