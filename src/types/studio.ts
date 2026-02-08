export interface ContentState {
  eyebrow: string;
  title: string;
  body: string;
  listItems: string[];
  cta: string;
  date: string;
}

export interface MediaWrapper {
  id: string;
  url: string | null;
  type: 'image' | 'video' | null;
  scale: number;
  position: { x: number; y: number };
  opacity: number;
}

export interface BrandIdentity {
  studioTitle: string;
  shortName: string;
  shortNameWithDot: string;
  fullName: string;
  slogan: string;
  footerText: string;
  logoUrl: string | null;
}

export type LayoutType = 'single' | 'split-h' | 'split-v' | 'grid-2x2';
export type PostType = 'quote' | 'list' | 'announcement';
export type Theme = 'purple' | 'orange' | 'mixed';
export type ImageFormat = 'post' | 'story' | 'square' | 'profile' | 'banner';
export type AssetCategory = 'content' | 'branding';
export type NameVariant = 'karn' | 'karn.' | 'instituto karn';
export type OverlayStyle = 'none' | 'classic' | 'modern' | 'footer-modern' | 'bold';
export type FontSize = 'sm' | 'md' | 'lg';
export type ExportQuality = 'medium' | 'high' | 'super-high';
export type AppView = 'studio' | 'brand-identity';
