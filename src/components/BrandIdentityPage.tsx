import { Image, RefreshCcw, Save } from 'lucide-react';
import type { BrandIdentity } from '../types/studio';

type BrandIdentityPageProps = {
  brandIdentity: BrandIdentity;
  onChange: (updates: Partial<BrandIdentity>) => void;
  onReset: () => void;
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export default function BrandIdentityPage({ brandIdentity, onChange, onReset }: BrandIdentityPageProps) {
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    onChange({ logoUrl: dataUrl });
  };

  const patternBackground =
    brandIdentity.pattern === 'dots'
      ? 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)'
      : brandIdentity.pattern === 'diagonal'
        ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 10px)'
        : brandIdentity.pattern === 'grid'
          ? 'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)'
          : 'none';

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0e100f] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Brand Identity</h2>
          <p className="text-xs text-neutral-400">Configure the brand information used by the studio.</p>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-neutral-500">Studio Title</label>
            <input
              value={brandIdentity.studioTitle}
              onChange={(e) => onChange({ studioTitle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
              placeholder="Business Studio"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-neutral-500">Short Name</label>
              <input
                value={brandIdentity.shortName}
                onChange={(e) => onChange({ shortName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
                placeholder="brand"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-neutral-500">Short Name (Dot)</label>
              <input
                value={brandIdentity.shortNameWithDot}
                onChange={(e) => onChange({ shortNameWithDot: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
                placeholder="brand."
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-neutral-500">Full Name</label>
            <input
              value={brandIdentity.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
              placeholder="Brand Company"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-neutral-500">Default Footer Text</label>
            <input
              value={brandIdentity.footerText}
              onChange={(e) => onChange({ footerText: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
              placeholder="Brand Company"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-neutral-500">Slogan</label>
            <textarea
              rows={4}
              value={brandIdentity.slogan}
              onChange={(e) => onChange({ slogan: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500 resize-none"
              placeholder="Add your brand slogan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-neutral-500">Primary Color</label>
              <input
                type="color"
                value={brandIdentity.primaryColor}
                onChange={(e) => onChange({ primaryColor: e.target.value })}
                className="w-full h-10 bg-white/5 border border-white/10 rounded-lg p-1"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-neutral-500">Secondary Color</label>
              <input
                type="color"
                value={brandIdentity.secondaryColor}
                onChange={(e) => onChange({ secondaryColor: e.target.value })}
                className="w-full h-10 bg-white/5 border border-white/10 rounded-lg p-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500">Use Brand Colors</span>
            <button
              onClick={() => onChange({ useBrandColors: !brandIdentity.useBrandColors })}
              className={`relative w-10 h-5 rounded-full transition-all ${brandIdentity.useBrandColors ? 'bg-purple-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${brandIdentity.useBrandColors ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-neutral-500">Pattern</label>
            <select
              value={brandIdentity.pattern}
              onChange={(e) => onChange({ pattern: e.target.value as BrandIdentity['pattern'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="none">None</option>
              <option value="grid">Grid</option>
              <option value="dots">Dots</option>
              <option value="diagonal">Diagonal</option>
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>Pattern Opacity</span>
              <span>{brandIdentity.patternOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={brandIdentity.patternOpacity}
              onChange={(e) => onChange({ patternOpacity: parseInt(e.target.value, 10) })}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-wider text-neutral-500">Brand Logo</label>
            <label className="h-28 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-sm text-neutral-300">
              <Image size={18} />
              Upload logo image
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCcw size={14} /> Reset
            </button>
            <div className="px-4 py-2 rounded-lg bg-purple-500/15 border border-purple-500/40 text-sm text-purple-200 inline-flex items-center gap-2">
              <Save size={14} /> Saved automatically
            </div>
          </div>
        </div>

        <div className="bg-[#0e100f] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">Preview</h3>
          <div
            className="rounded-xl border border-white/10 p-6 min-h-[420px] flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{
              backgroundColor: '#0d0d0d',
              backgroundImage: brandIdentity.useBrandColors
                ? `linear-gradient(145deg, ${brandIdentity.primaryColor}33, ${brandIdentity.secondaryColor}22)`
                : undefined,
            }}
          >
            {brandIdentity.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: patternBackground,
                  backgroundSize: brandIdentity.pattern === 'dots' ? '14px 14px' : brandIdentity.pattern === 'grid' ? '26px 26px' : 'auto',
                  opacity: brandIdentity.patternOpacity / 100,
                }}
              />
            )}
            {brandIdentity.logoUrl ? (
              <img src={brandIdentity.logoUrl} alt="Brand logo" className="w-24 h-24 object-contain mb-4 relative z-10" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative z-10">
                <Image className="text-neutral-500" size={28} />
              </div>
            )}

            <h4 className="text-2xl font-serif mb-1 relative z-10">{brandIdentity.fullName || 'Brand Company'}</h4>
            <p className="text-xs text-neutral-400 mb-5 relative z-10">{brandIdentity.shortNameWithDot || 'brand.'}</p>
            <p className="text-sm leading-relaxed max-w-[280px] text-neutral-300 relative z-10">{brandIdentity.slogan || 'Your slogan will appear here.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
